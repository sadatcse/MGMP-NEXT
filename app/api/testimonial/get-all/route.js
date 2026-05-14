import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Testimonial from '../../../../src/models/Testimonial';

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({});
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('Testimonial GET Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
