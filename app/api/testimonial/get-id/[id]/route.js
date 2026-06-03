import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Testimonial from '../../../../../src/models/Testimonial';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    console.error('Testimonial GET by ID Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
