import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authConfig } from "./lib/auth.config";

// constents for routes
import { LOGIN, PUBLIC_ROUTES, HOME, ROOT } from "@/constents/middlewareRoutes";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  console.log("Authenticated:", isAuthenticated, "Path:", nextUrl.pathname);

  if (
    nextUrl.pathname.startsWith("/_next/") ||
    nextUrl.pathname.startsWith("/public/") ||
    nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)
  ) {
    return NextResponse.next();
  }

  const isPublicRoute =
    PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) ||
    nextUrl.pathname === ROOT;

  // If user is not logged in and trying to access a protected route
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  // if user is logged in and trying to access a public route
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(HOME, request.url));
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
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|public|.*\\.(png|jpg|jpeg|gif|webp|svg)).*)",
//   ],
// };
