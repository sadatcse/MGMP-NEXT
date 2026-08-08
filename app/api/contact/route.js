import { NextResponse } from 'next/server';
import connectDB from '../../../src/lib/db';
import ContactMessage from '../../../src/models/ContactMessage';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { firstName, lastName, email, phone, branch, comments } = body;

    if (!firstName || !lastName || !email || !phone || !comments) {
      return NextResponse.json(
        { success: false, message: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const newMessage = await ContactMessage.create({
      firstName,
      lastName,
      email,
      phone,
      branch: branch || 'Shiya Masjid Branch',
      comments,
      status: 'unread',
      createdAt: new Date()
    });

    return NextResponse.json(
      { success: true, message: 'Contact message saved successfully.', data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact POST Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact message.' },
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
    const branch = searchParams.get('branch');

    const filter = {};
    if (status && status !== 'all') {
      filter.status = status;
    }
    if (branch && branch !== 'all') {
      filter.branch = branch;
    }
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { comments: searchRegex }
      ];
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error) {
    console.error('Contact GET Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
