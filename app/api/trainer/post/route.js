import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import Trainers from '../../../../src/models/Trainers';
import { requireAdmin, unauthorizedResponse } from '@/src/lib/auth-guard';

export async function POST(req) {
  if (!requireAdmin(req)) return unauthorizedResponse();
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
