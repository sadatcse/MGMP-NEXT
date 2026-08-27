import { NextResponse } from 'next/server';
import connectDB from '../../../src/lib/db';
import JoinApplication from '../../../src/models/JoinApplication';
import { sendJoinNotificationEmail } from '../../../src/lib/sendJoinNotificationEmail';
import { findRecentDuplicate } from '../../../src/lib/dedupe-guard';
import { requireAdmin, unauthorizedResponse } from '../../../src/lib/auth-guard';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      full_name,
      feet,
      inch,
      height,
      weight,
      age,
      address,
      email,
      telephone_number,
      package_name,
      package_price,
      package_note,
    } = body;

    if (!full_name || !telephone_number || !email || !package_name) {
      return NextResponse.json(
        { success: false, message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    const resolvedHeight = height || `${feet || ''} ${inch || ''}`.trim() || 'N/A';

    let application = null;
    try {
      await connectDB();

      const existing = await findRecentDuplicate(JoinApplication, { email, telephone_number }).catch(() => null);
      if (existing) {
        return NextResponse.json(
          {
            success: true,
            message: 'We already received your application a moment ago — our team will contact you shortly.',
            data: existing,
          },
          { status: 200 }
        );
      }

      application = await JoinApplication.create({
        full_name,
        feet: feet || '',
        inch: inch || '',
        height: resolvedHeight,
        weight: weight || 'N/A',
        age: age || 'N/A',
        address: address || 'N/A',
        email,
        telephone_number,
        package_name,
        package_price: package_price || '',
        package_note: package_note || '',
        status: 'Pending',
      });
    } catch (dbErr) {
      console.error('MongoDB database connection/creation error in /api/join:', dbErr);
    }

    // Trigger background email notification safely
    try {
      const emailPayload = application
        ? (application.toObject ? application.toObject() : application)
        : {
            full_name,
            feet: feet || '',
            inch: inch || '',
            height: resolvedHeight,
            weight: weight || 'N/A',
            age: age || 'N/A',
            address: address || 'N/A',
            email,
            telephone_number,
            package_name,
            package_price: package_price || '',
            package_note: package_note || '',
          };
      sendJoinNotificationEmail(emailPayload).catch((err) => {
        console.error('Background email notification error:', err);
      });
    } catch (emailErr) {
      console.error('Failed to trigger sendJoinNotificationEmail:', emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Join application submitted successfully',
        data: application || body,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Join Application POST error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to submit application' },
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
        { telephone_number: searchRegex },
        { address: searchRegex },
        { package_name: searchRegex },
      ];
    }

    const applications = await JoinApplication.find(filter)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    return NextResponse.json(
      { success: true, data: applications },
      { status: 200 }
    );
  } catch (error) {
    console.error('Join Application GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
