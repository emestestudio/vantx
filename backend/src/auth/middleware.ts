import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('vantx_token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/profile'];
  const authRoutes = ['/login', '/register'];

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authRoutes.some((r) => pathname.startsWith(r)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/register'],
};