import { NextResponse } from 'next/server';
import connectDB from '../../../../../src/lib/db';
import Trainers from '../../../../../src/models/Trainers';

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedTrainer = await Trainers.findByIdAndDelete(id);
    if (!deletedTrainer) {
      return NextResponse.json({ message: 'Trainer not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Trainer deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Trainer DELETE Error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
