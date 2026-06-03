import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import News from '../../../../../src/models/News';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();
    const updatedPost = await News.findByIdAndUpdate(id, data, { new: true });
    if (!updatedPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json({ modifiedCount: 1, post: updatedPost }, { status: 200 });
  } catch (error) {
    console.error('News PUT Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
