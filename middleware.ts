import { NextRequest, NextResponse } from "next/server";

// Define the middleware handler
export default function middleware(request: NextRequest) {
  // Get the path from the URL
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't need authentication
  const isPublicPath = path === "/" || path === "/login";
  
  // Check if user is authenticated from the cookie
  const authCookie = request.cookies.get("user")?.value;
  const isAuthenticated = !!authCookie;
  
  // If the path is public and user is authenticated, redirect to dashboard
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  // If the path is not public and user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated && !path.includes("/_next")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

// Paths that should trigger this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next/static (static files)
     * 3. /_next/image (image optimization files)
     * 4. /favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};