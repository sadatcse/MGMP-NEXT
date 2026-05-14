import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/src/lib/db';
import User from '@/src/models/User';

export async function POST(req) {
  try {
    const userData = await req.json();
    await connectDB();
    
    const result = await User.findOne({ email: userData?.email });

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = jwt.sign(
      { _id: result._id, email: result.email },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      }
    );
    
    return NextResponse.json({
      token,
      message: "User signed in successfully",
    }, { status: 200 });
  } catch (error) {
    console.error('Sign In Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
