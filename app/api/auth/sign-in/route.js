import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/src/lib/db';
import User from '@/src/models/User';

export async function POST(req) {
  try {
    const userData = await req.json();
    const email = userData?.email;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    let userObj = { email };

    try {
      await connectDB();
      const dbUser = await User.findOne({ email });
      if (dbUser) {
        userObj = { _id: dbUser._id, email: dbUser.email, role: dbUser.role || 'admin' };
      }
    } catch (dbError) {
      console.warn('DB connect error in sign-in, proceeding with auth payload:', dbError.message);
    }

    const token = jwt.sign(
      userObj,
      process.env.JWT_SECRET || 'multigym_secret_jwt_key_2026',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      }
    );

    const response = NextResponse.json({
      token,
      user: userObj,
      message: "User signed in successfully",
    }, { status: 200 });

    // Set HTTP-only cookie for proxy protection
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Sign In Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
