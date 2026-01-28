import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isTokenExpired(token: string): boolean {
  try {
    // JWT is base64url encoded: header.payload.signature
    const payload = token.split(".")[1];
    if (!payload) return true;

    // Decode the payload (base64url to JSON)
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));

    // Check if token has expired
    if (!decoded.exp) return true;

    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true; // If we can't decode, treat as expired
  }
}

function clearTokenCookie(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set("token", "", { path: "/", maxAge: 0 });
  return response;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Check if token exists and is not expired
  const hasValidToken = token && !isTokenExpired(token);

  // Public paths that don't require auth
  const isPublicPath = pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/auth");

  if (pathname.startsWith("/login") || pathname.startsWith("/auth")) {
    if (hasValidToken) {
      // If already logged in with valid token, redirect to workflows dashboard
      return NextResponse.redirect(new URL("/workflows", request.url));
    }
    // Clear expired token cookie if it exists
    if (token && !hasValidToken) {
      const response = NextResponse.next();
      response.cookies.set("token", "", { path: "/", maxAge: 0 });
      return response;
    }
    return NextResponse.next();
  }

  // Protected paths - require valid (non-expired) token
  // Skip auth check for public paths (home page is now a landing page)
  if (!isPublicPath && !hasValidToken) {
    return clearTokenCookie(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
