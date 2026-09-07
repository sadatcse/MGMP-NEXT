import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '../../../../../src/lib/db';
import News from '../../../../../src/models/News';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    let post = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await News.findById(id);
    }
    if (!post) {
      post = await News.findOne({ slug: id });
    }

    if (!post) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json(post, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('News GET by ID/Slug Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
