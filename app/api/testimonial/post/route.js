import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Testimonial from '../../../../src/models/Testimonial';
import { requireAdmin, unauthorizedResponse } from '../../../../src/lib/auth-guard';

export async function POST(req) {
  if (!requireAdmin(req)) return unauthorizedResponse();
  try {
    await connectDB();
    const data = await req.json();
    const newTestimonial = await Testimonial.create(data);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error('Testimonial POST Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
