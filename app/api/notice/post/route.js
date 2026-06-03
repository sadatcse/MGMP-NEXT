import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Notices from '../../../../src/models/Notices';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newNotice = await Notices.create(data);
    return NextResponse.json(newNotice, { status: 201 });
  } catch (error) {
    console.error('Notices POST Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
