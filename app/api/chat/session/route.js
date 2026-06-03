import { NextResponse } from 'next/server';
import connectDB from '../../../../src/lib/db';
import ChatSession from '../../../../src/models/ChatSession';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, mobile } = await req.json();

    if (!name || !mobile) {
      return NextResponse.json({ error: 'Name and mobile number are required' }, { status: 400 });
    }

    // Resolve client IP Address
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (req.ip || '127.0.0.1');

    // Create session in database
    const session = await ChatSession.create({
      name,
      email,
      mobile,
      ip,
      messages: [
        {
          role: 'model',
          text: `Welcome to Multigym Premium! 🏋️💪\nWe’re here to help you with anything you need — membership plans, pricing, branch locations, facilities, class schedules, and more. Feel free to ask us anytime!`,
          timestamp: new Date()
        }
      ]
    });

    return NextResponse.json({ sessionId: session._id, messages: session.messages }, { status: 201 });
  } catch (error) {
    console.error('Create ChatSession Error:', error);
    return NextResponse.json({ error: 'Server error, please try again later' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectDB();
    const sessions = await ChatSession.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(sessions, { status: 200 });
  } catch (error) {
    console.error('Fetch ChatSessions Error:', error);
    return NextResponse.json({ error: 'Server error, please try again later' }, { status: 500 });
  }
}
