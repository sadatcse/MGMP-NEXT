import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Notices from '../../../../src/models/Notices';

export async function GET() {
  try {
    await connectDB();
    const notices = await Notices.find({}).sort({ date: -1 });
    return NextResponse.json(notices, { status: 200 });
  } catch (error) {
    console.error('Notices GET Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
