import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import News from '../../../../src/models/News';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    await connectDB();
    const news = await News.find({}).sort({ date: -1 }).limit(200);
    return NextResponse.json(news, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('News GET Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
