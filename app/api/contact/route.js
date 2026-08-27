import { NextResponse } from 'next/server';
import connectDB from '../../../src/lib/db';
import ContactMessage from '../../../src/models/ContactMessage';
import { findRecentDuplicate } from '@/src/lib/dedupe-guard';
import { requireAdmin, unauthorizedResponse } from '@/src/lib/auth-guard';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullName, firstName, lastName, email, phone, branch, comments } = body;

    const resolvedFullName = (fullName || `${firstName || ''} ${lastName || ''}`).trim();

    if (!resolvedFullName || !phone) {
      return NextResponse.json(
        { success: false, message: 'Full name and phone number are mandatory fields.' },
        { status: 400 }
      );
    }

    const existing = await findRecentDuplicate(ContactMessage, { phone, email: email || '' });
    if (existing) {
      return NextResponse.json(
        { success: true, message: 'We already received your message a moment ago — our team will get back to you shortly.', data: existing },
        { status: 200 }
      );
    }

    const newMessage = await ContactMessage.create({
      fullName: resolvedFullName,
      firstName: firstName || resolvedFullName.split(' ')[0],
      lastName: lastName || resolvedFullName.split(' ').slice(1).join(' ') || '',
      email: email || '',
      phone,
      branch: branch || 'Shiya Masjid Branch',
      comments: comments || '',
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
  if (!requireAdmin(req)) return unauthorizedResponse();
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
        { fullName: searchRegex },
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { comments: searchRegex }
      ];
    }

    const messages = await ContactMessage.find(filter).sort({ createdAt: -1 }).limit(200).lean();
    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error) {
    console.error('Contact GET Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
