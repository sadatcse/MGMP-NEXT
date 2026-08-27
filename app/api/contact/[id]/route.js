import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import ContactMessage from '../../../../src/models/ContactMessage';
import { requireAdmin, unauthorizedResponse } from '@/src/lib/auth-guard';

export async function PATCH(req, { params }) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!['unread', 'read', 'replied'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status provided.' },
        { status: 400 }
      );
    }

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Contact message not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Status updated successfully.', data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact PATCH Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Contact message not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Contact message deleted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact DELETE Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
