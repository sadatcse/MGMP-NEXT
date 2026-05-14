import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import News from '../../../../src/models/News';

export async function GET() {
  try {
    await connectDB();
    const news = await News.find({});
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    console.error('News GET Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
