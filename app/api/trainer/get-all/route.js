import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Trainers from '../../../../src/models/Trainers';
import { sortTrainers } from '../../../../src/lib/teamSort';

export async function GET() {
  try {
    await connectDB();
    const rawTrainers = await Trainers.find({}).lean();
    const sortedTrainers = sortTrainers(rawTrainers);
    return NextResponse.json(sortedTrainers, { status: 200 });
  } catch (error) {
    console.error('Trainer GET Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
