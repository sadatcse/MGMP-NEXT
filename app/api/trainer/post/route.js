import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Trainers from '../../../../src/models/Trainers';

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newTrainer = await Trainers.create(data);
    return NextResponse.json(newTrainer, { status: 201 });
  } catch (error) {
    console.error('Trainer POST Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
