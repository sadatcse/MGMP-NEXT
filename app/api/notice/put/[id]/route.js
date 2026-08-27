import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Notices from '../../../../../src/models/Notices';
import { requireAdmin, unauthorizedResponse } from '@/src/lib/auth-guard';

export async function PUT(req, { params }) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();

    const updatedNotice = await Notices.findByIdAndUpdate(id, data, { new: true });
    
    if (!updatedNotice) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }
    
    return NextResponse.json({ modifiedCount: 1, notice: updatedNotice }, { status: 200 });
  } catch (error) {
    console.error('Notice PUT Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
