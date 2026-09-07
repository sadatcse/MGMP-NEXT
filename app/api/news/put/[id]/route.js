import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import News from '../../../../../src/models/News';
import { requireAdmin, unauthorizedResponse } from '../../../../../src/lib/auth-guard';

import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function PUT(req, { params }) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();

    const { _id, __v, createdAt, updatedAt, ...updateFields } = data;

    if (updateFields.date) {
      const parsedDate = new Date(updateFields.date);
      if (!isNaN(parsedDate.getTime())) {
        updateFields.date = parsedDate;
      }
    }

    if (typeof updateFields.tags === 'string') {
      updateFields.tags = updateFields.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const updatedPost = await News.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
    if (!updatedPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }

    try {
      revalidatePath('/blog');
      revalidatePath('/');
      revalidatePath(`/blog/${id}`);
      revalidatePath('/blog/[id]', 'page');
      revalidatePath('/dashboard/blog_view');
    } catch (revError) {
      console.warn('Revalidate error:', revError.message);
    }

    return NextResponse.json({ modifiedCount: 1, post: updatedPost }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      }
    });
  } catch (error) {
    console.error('News PUT Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
