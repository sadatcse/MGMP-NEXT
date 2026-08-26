import { NextResponse } from 'next/server';
import connectDB from '../../../src/lib/db';
import JoinApplication from '../../../src/models/JoinApplication';
import { sendJoinNotificationEmail } from '../../../src/lib/sendJoinNotificationEmail';

export async function POST(req) {
  try {
    await connectDB();
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

    const resolvedHeight = height || `${feet || ''} ${inch || ''}`.trim();

    const application = await JoinApplication.create({
      full_name,
      feet: feet || '',
      inch: inch || '',
      height: resolvedHeight,
      weight,
      age,
      address,
      email,
      telephone_number,
      package_name,
      package_price: package_price || '',
      package_note: package_note || '',
      status: 'Pending',
    });

    // Send automated email to multigympremiumpowerfit@gmail.com with pre-filled PDF attached
    sendJoinNotificationEmail(application.toObject ? application.toObject() : application).catch((err) => {
      console.error('Background email notification error:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Join application submitted successfully',
        data: application,
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
