import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Trainers from '../../../../src/models/Trainers';

export async function GET() {
  try {
    await connectDB();
    const trainers = await Trainers.find({});
    return NextResponse.json(trainers, { status: 200 });
  } catch (error) {
    console.error('Trainer GET Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
