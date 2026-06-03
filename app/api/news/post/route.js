import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import News from '../../../../src/models/News';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newPost = await News.create(data);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('News POST Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
