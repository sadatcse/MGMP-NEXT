import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Trainers from '../../../../../src/models/Trainers';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const trainer = await Trainers.findById(id);
    if (!trainer) {
      return NextResponse.json({ message: 'Trainer not found' }, { status: 404 });
    }
    return NextResponse.json(trainer, { status: 200 });
  } catch (error) {
    console.error('Trainer GET by ID Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
