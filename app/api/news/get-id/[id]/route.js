import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import News from '../../../../../src/models/News';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const post = await News.findById(id);
    if (!post) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('News GET by ID Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
