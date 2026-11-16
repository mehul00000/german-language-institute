import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Admin routes are gated by Clerk when configured. Role checks do NOT
 * happen here: they happen inside every Convex function (convex/auth.ts),
 * which is the only trusted place to decide who may read or write.
 */
const isProtected = createRouteMatcher(["/admin(.*)"]);
const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default key
  ? clerkMiddleware(async (auth, req) => {
      if (isProtected(req)) await auth.protect();
    })
  : function middleware() {
      return NextResponse.next();
    };

export const config = {
  matcher: ["/admin/:path*"],
};
