# NextAuth.js v5 Setup Guide

This project is configured with NextAuth.js v5 using Prisma adapter for authentication.

## Installation

Make sure you have the required dependencies installed:

```bash
npm install bcryptjs
# or
npm install bcryptjs --save
```

The following packages are already in package.json:
- `next-auth` (v4+)
- `@auth/prisma-adapter`
- `@prisma/client`
- `prisma`

## Environment Setup

Ensure your `.env.local` file has these variables:

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-random-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Generate NEXTAUTH_SECRET

Generate a secure random secret:

```bash
openssl rand -base64 32
```

Or use an online tool: https://generate-secret.vercel.app/

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
6. Copy the Client ID and Client Secret to `.env.local`

## Database Setup

After setting up the database connection, run migrations:

```bash
npx prisma migrate dev --name init
# or
npx prisma migrate deploy
```

This will create all the necessary tables including NextAuth tables (User, Account, Session).

## Files Created

### Core Authentication

- **`src/lib/auth.ts`** - Main NextAuth configuration with:
  - Prisma adapter
  - Google OAuth provider
  - Credentials provider (email/password)
  - JWT and session callbacks
  - Database session strategy

- **`src/lib/prisma.ts`** - Prisma client singleton for optimal performance

- **`src/app/api/auth/[...nextauth]/route.ts`** - NextAuth API routes handler

### Components & Hooks

- **`src/components/SessionProvider.tsx`** - Client-side session provider wrapper
  - Wrap your app with this to use NextAuth hooks
  - Already added to `src/app/layout.tsx`

- **`src/hooks/useAuth.ts`** - Custom hook to access session and auth state
  - Returns: `session`, `status`, `isLoading`, `isAuthenticated`, `user`

### Utilities

- **`src/lib/password.ts`** - Password hashing and verification
  - `hashPassword(password)` - Hash password for storage
  - `verifyPassword(password, hash)` - Verify password during login

- **`src/lib/auth-utils.ts`** - Authentication helper functions
  - `signIn(email, password)` - Sign in with credentials
  - `signInWithGoogle()` - Sign in with Google
  - `signOut()` - Sign out

### Pages

- **`src/app/auth/signin/page.tsx`** - Sign-in page
  - Email/password login
  - Google OAuth button
  - Link to sign-up page

- **`src/app/auth/signup/page.tsx`** - Sign-up page
  - Create account with email/password
  - Google OAuth integration
  - Validation and error handling

### API Routes

- **`src/app/api/auth/register/route.ts`** - User registration endpoint
  - POST endpoint to create new user
  - Validates email, password
  - Hashes password before saving

## Usage

### Sign In

```typescript
// In client components
import { signIn } from "next-auth/react";

// With credentials
await signIn("credentials", {
  email: "user@example.com",
  password: "password",
  redirect: false,
});

// With Google
await signIn("google");
```

### Check Authentication

```typescript
// In client components
"use client";

import { useAuth } from "@/hooks/useAuth";

export function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;

  return <div>Hello, {user?.name}!</div>;
}
```

### Access Session Server-Side

```typescript
// In server components or API routes
import { auth } from "@/lib/auth";

export async function MyServerComponent() {
  const session = await auth();

  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello, {session.user.name}!</div>;
}
```

### Protect Routes

For protected routes, create middleware:

```typescript
// middleware.ts in project root
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/bookings", "/favorites"];

export async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtectedRoute = protectedRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### Create New Users

```typescript
// Use the /api/auth/register endpoint
const response = await fetch("/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    password: "securepassword123",
  }),
});
```

## Session User Type

The session user object has:

```typescript
{
  id: string;        // User ID
  name?: string;     // User name
  email?: string;    // User email
  image?: string;    // User image URL
  role?: string;     // "guest" or "host"
}
```

Extend the session type in `next-auth.d.ts` if needed (create file):

```typescript
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      role: "guest" | "host";
    };
  }
}
```

## Troubleshooting

### "NEXTAUTH_SECRET not found"
- Generate a secret and add to `.env.local`
- For production, generate with: `openssl rand -base64 32`

### "Database connection failed"
- Verify DATABASE_URL and DIRECT_URL in `.env.local`
- Ensure database is running and accessible
- Check network/firewall if using cloud DB (Supabase)

### "Google OAuth not working"
- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
- Check authorized redirect URIs in Google Cloud Console
- Ensure NEXTAUTH_URL matches your domain

### "bcryptjs not found"
- Run: `npm install bcryptjs`

## Next Steps

1. Install bcryptjs: `npm install bcryptjs`
2. Set up environment variables in `.env.local`
3. Generate a new database migration: `npx prisma migrate dev`
4. Start development server: `npm run dev`
5. Test sign-up: `http://localhost:3000/auth/signup`
6. Test sign-in: `http://localhost:3000/auth/signin`

## Security Notes

- Never commit `.env.local` to version control
- Keep NEXTAUTH_SECRET secret and unique per environment
- Use secure passwords (minimum 8 characters enforced)
- Enable HTTPS in production (required for cookies)
- Regenerate credentials if exposed
