import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Admin routes: only allow authenticated users
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

// Protect all /admin/* routes except /admin/login
export const config = {
  matcher: ["/admin/dashboard/:path*", "/api/admin/:path*"],
};
