import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function requireAdmin(req) {
  const authHeader = req.headers.get('authorization') || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  if (!token || !process.env.JWT_SECRET) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function unauthorizedResponse() {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}
