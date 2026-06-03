import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import News from '../../../../../src/models/News';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedPost = await News.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Blog post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('News DELETE Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
