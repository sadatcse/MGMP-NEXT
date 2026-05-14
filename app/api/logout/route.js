import { NextResponse } from 'next/server';

export async function POST() {
  // Clear any necessary cookies or sessions here
  return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
}
