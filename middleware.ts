import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding") || pathname.startsWith("/api/funfact");
        if (!isProtected) return true;
        return !!token;
      },
    },
    pages: { signIn: "/" },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/api/funfact"],
};
