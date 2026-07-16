# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

An Airbnb clone booking application with property listings, search, booking management, payments, and reviews.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Google OAuth + credentials)
- **Payments**: Stripe
- **Image Storage**: Cloudinary
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Maps**: Leaflet / React Leaflet

## Project Structure

```
/app                  → Next.js App Router pages and API routes
/app/api              → API route handlers
/components           → Reusable React components
/components/ui        → Base UI components (buttons, inputs, modals)
/lib                  → Utility functions and shared logic
/prisma               → Prisma schema and migrations
/public               → Static assets
/types                → TypeScript type definitions
/hooks                → Custom React hooks
/store                → Zustand state stores
```

## Key Conventions

- Use App Router only — never Pages Router
- Use server components by default, add "use client" only when needed
- All database queries go through Prisma — never raw SQL
- All API routes live in /app/api
- Use Zod for all input validation
- Use TypeScript strictly — no `any` types
- Components follow PascalCase naming
- Files and folders follow kebab-case naming

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Open Prisma Studio (DB viewer)
npx prisma studio

# Build for production
npm run build

# Run linter
npm run lint
```

## Environment Variables Required

```
DATABASE_URL
DIRECT_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

## Core Features to Build

1. Property listings with search and filters
2. Property detail page with image gallery
3. Interactive map with property locations
4. Date range booking calendar
5. User authentication (Google + email)
6. Host dashboard (manage properties)
7. Guest dashboard (manage bookings)
8. Stripe payment processing
9. Reviews and ratings system
10. Favorites / wishlist

## Security Notes

- Never commit `.env` or `.env.local` to version control
- Never commit `.claude/settings.local.json`
- Use `.env.example` to document required variables without values
- Validate all user inputs with Zod on both client and server
