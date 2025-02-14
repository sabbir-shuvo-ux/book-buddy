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
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
