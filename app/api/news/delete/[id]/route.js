import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import News from '../../../../../src/models/News';
import { requireAdmin, unauthorizedResponse } from '../../../../../src/lib/auth-guard';

import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function DELETE(req, { params }) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const { id } = await params;
    const deletedPost = await News.findByIdAndDelete(id);
    if (!deletedPost) {
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

    return NextResponse.json({ 
      message: 'Blog post deleted successfully' 
    }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      }
    });
  } catch (error) {
    console.error('News DELETE Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
