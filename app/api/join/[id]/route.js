import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import JoinApplication from '../../../../src/models/JoinApplication';
import { requireAdmin, unauthorizedResponse } from '@/src/lib/auth-guard';

export async function PATCH(req, { params }) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    const updated = await JoinApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Status updated successfully', data: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error('Join PATCH Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update status' },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await JoinApplication.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Application deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Join DELETE Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete application' },
      { status: 500 }
    );
  }
}
