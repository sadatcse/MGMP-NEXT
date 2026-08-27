import { NextResponse } from 'next/server';
import connectDB from '../../../src/lib/db';
import NutritionConsultation from '../../../src/models/NutritionConsultation';
import { findRecentDuplicate } from '@/src/lib/dedupe-guard';
import { requireAdmin, unauthorizedResponse } from '@/src/lib/auth-guard';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { full_name, mobile_number, email } = body;

    if (!full_name || !mobile_number || !email) {
      return NextResponse.json(
        { success: false, message: 'Name, Mobile Number, and Email are required' },
        { status: 400 }
      );
    }

    const existing = await findRecentDuplicate(NutritionConsultation, {
      mobile_number: mobile_number.trim(),
      email: email.trim().toLowerCase(),
    });
    if (existing) {
      return NextResponse.json(
        {
          success: true,
          message: 'We already received your request a moment ago — our team will contact you shortly.',
          data: existing,
        },
        { status: 200 }
      );
    }

    const consultation = await NutritionConsultation.create({
      full_name: full_name.trim(),
      mobile_number: mobile_number.trim(),
      email: email.trim().toLowerCase(),
      status: 'Pending',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Nutrition consultation request submitted successfully',
        data: consultation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Nutrition Consultation POST error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit consultation request' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { full_name: searchRegex },
        { email: searchRegex },
        { mobile_number: searchRegex },
      ];
    }

    const consultations = await NutritionConsultation.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return NextResponse.json(
      { success: true, data: consultations },
      { status: 200 }
    );
  } catch (error) {
    console.error('Nutrition Consultation GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error fetching nutrition leads' },
      { status: 500 }
    );
  }
}
