import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  const isProtected =
    nextUrl.pathname.startsWith("/welcome") ||
    nextUrl.pathname.startsWith("/home");
  const isLoginPage = nextUrl.pathname === "/";

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/welcome", nextUrl));
  }
});

export const config = {
  // Run middleware on all routes except static files and Next.js internals
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
