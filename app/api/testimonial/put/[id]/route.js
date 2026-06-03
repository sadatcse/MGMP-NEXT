import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Testimonial from '../../../../../src/models/Testimonial';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true });
    if (!updatedTestimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ modifiedCount: 1, testimonial: updatedTestimonial }, { status: 200 });
  } catch (error) {
    console.error('Testimonial PUT Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
