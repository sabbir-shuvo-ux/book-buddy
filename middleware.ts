import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "./lib/auth.config";

import { LOGIN, PUBLIC_ROUTES, HOME } from "@/constents/constents";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  console.log("Authenticated:", isAuthenticated, "Path:", nextUrl.pathname);

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // If user is not logged in and trying to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  // if user is logged in and trying to access a public route
  if (isAuthenticated && isPublicRoute && nextUrl.pathname !== HOME) {
    return NextResponse.redirect(new URL(HOME, request.url));
  }

  return NextResponse.next(); // Allow request to proceed
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
