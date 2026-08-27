import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const ALLOWED_ORIGINS = [
  'https://www.multigympremium.com',
  'https://multigympremium.com',
  'http://localhost:3000',
  'http://localhost:3001',
];

function isValidToken(token) {
  if (!token || !process.env.JWT_SECRET) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');

  // 1. CORS Preflight & Security Headers for /api/ routes
  if (pathname.startsWith('/api/')) {
    const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) || !origin;
    const corsOrigin = isAllowedOrigin ? (origin || 'https://www.multigympremium.com') : 'https://www.multigympremium.com';

    // OPTIONS preflight response
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': corsOrigin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Date, X-Api-Version',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', corsOrigin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    return response;
  }

  // 2. Protect all /dashboard routes
  const token = request.cookies.get('token')?.value;
  const valid = isValidToken(token);

  if (pathname.startsWith('/dashboard')) {
    if (!valid) {
      const loginUrl = new URL('/webadmin', request.url);
      loginUrl.searchParams.set('from', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (token) response.cookies.delete('token');
      return response;
    }
  }

  // 3. Redirect logged-in users trying to access /webadmin
  if (pathname === '/webadmin') {
    if (valid) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/webadmin'],
};
