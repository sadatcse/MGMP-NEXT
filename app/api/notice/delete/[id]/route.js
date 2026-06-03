import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Notices from '../../../../../src/models/Notices';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    
    const deletedNotice = await Notices.findByIdAndDelete(id);
    
    if (!deletedNotice) {
      return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Notice deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Notice DELETE Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
