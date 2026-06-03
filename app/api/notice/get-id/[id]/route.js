import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Notices from '../../../../../src/models/Notices';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const notice = await Notices.findById(id);
    
    if (!notice) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }
    
    return NextResponse.json(notice, { status: 200 });
  } catch (error) {
    console.error('Notice GET by ID Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
