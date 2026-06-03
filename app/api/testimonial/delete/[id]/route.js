import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Testimonial from '../../../../../src/models/Testimonial';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);
    if (!deletedTestimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Testimonial deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Testimonial DELETE Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
