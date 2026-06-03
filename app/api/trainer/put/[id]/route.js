import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Trainers from '../../../../../src/models/Trainers';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await req.json();
    const updatedTrainer = await Trainers.findByIdAndUpdate(id, data, { new: true });
    if (!updatedTrainer) {
      return NextResponse.json({ message: 'Trainer not found' }, { status: 404 });
    }
    return NextResponse.json({ modifiedCount: 1, trainer: updatedTrainer }, { status: 200 });
  } catch (error) {
    console.error('Trainer PUT Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
