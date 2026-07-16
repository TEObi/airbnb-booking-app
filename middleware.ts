import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

/**
 * Middleware runs on the Edge runtime — only use the edge-safe authConfig here.
 * Never import from @/lib/auth (which pulls in Prisma and bcryptjs).
 */
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/bookings/:path*",
    "/favorites/:path*",
    "/host/:path*",
    "/reviews/:path*",
  ],
};
