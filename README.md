# LocalSEO Co-Pilot

An ultra-simple, AI-powered Local SEO co-pilot designed specifically for traditional brick-and-mortar businesses and local service providers across Texas. Built with an **Apple-like simplicity** (Human Interface Guidelines) philosophy.

## Overview

This platform translates the complexities of SEO into a simple, action-first daily To-Do list.

### Core Features

- **Review & Reputation Engine** — Automatically sends SMS requests to generate 5-star Google reviews with smart gating to intercept negative feedback
- **Google Business Autopilot** — Fully manages Google Business Profiles with AI-generated captions and scheduled posts
- **Hyper-Local Rank Grid** — Interactive color-coded map tracking search rankings across neighborhoods with competitor monitoring
- **Citation & NAP Hub** — Scans the entire internet for business name/address/phone consistency across all major directories

## Architecture

```
local-seo-copilot/
├── apps/
│   ├── web/          # Main user dashboard (Next.js 15)
│   └── admin/        # Super Admin panel (Next.js 15)
└── packages/
    ├── db/           # Drizzle ORM + Neon schema
    └── config/       # Shared Tailwind + TypeScript configs
```

**Monorepo**: Turborepo  
**Hosting**: Vercel (web → your-domain.com, admin → admin.your-domain.com)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Server Actions) |
| Styling | Tailwind CSS v4 + Radix UI + Framer Motion |
| Auth | Clerk (Google OAuth, 2FA, Workspaces, Impersonation) |
| Database | Neon (Serverless PostgreSQL) + Drizzle ORM |
| Background Jobs | Inngest v4 |
| SMS | Twilio |
| AI | OpenAI GPT-4 |
| Rankings | DataForSEO API |
| Payments | Stripe |
| Maps | Google Maps JavaScript API |

## Getting Started

### Prerequisites

- Node.js ≥ 22
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) application
- API keys for: Twilio, OpenAI, Stripe, DataForSEO, Google Maps

### Installation

```bash
# Install dependencies
npm install

# Copy and fill in environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env.local
```

### Environment Variables

**`apps/web/.env.local`**
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Database
DATABASE_URL=postgresql://...

# Google
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Twilio
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# OpenAI
OPENAI_API_KEY=sk-...

# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# DataForSEO
DATAFORSEO_LOGIN=...
DATAFORSEO_PASSWORD=...

# Inngest
INNGEST_EVENT_KEY=...
INNGEST_SIGNING_KEY=...
```

### Development

```bash
# Run both apps concurrently
npm run dev

# Web app runs on http://localhost:3000
# Admin app runs on http://localhost:3001
```

### Database Setup

```bash
# Generate migration files
npm run db:generate

# Push schema to database
npm run db:push
```

### Build

```bash
npm run build
```

## User Panel Routes

| Route | Description |
|-------|-------------|
| `/dashboard` | Command Center — Health Score + To-Do List |
| `/reviews` | Review Engine — Send SMS requests + manage reviews |
| `/grid` | Local Grid Tracker — 5×5 rank map |
| `/gbp` | GBP Autopilot — NAP lock + posts |
| `/citations` | Citation Hub — Internet scan |
| `/settings` | Profile, Business, Billing, Integrations |

## Admin Panel Routes (`admin.yourplatform.com`)

| Route | Description |
|-------|-------------|
| `/admin/dashboard` | Command Center — Stats, workspaces, live activity |
| `/admin/users` | User & Workspace Management + Impersonation + Audit Log |
| `/admin/billing` | MRR, ARR, plan distribution, transactions |
| `/admin/api-hub` | API status, latency, quota monitoring |
| `/admin/prompts` | AI Prompt Manager |

## Design System (Apple HIG)

- **Clarity**: San Francisco system font, large rounded CTA buttons, legible hierarchy
- **Deference**: Zero borders/dividers, generous whitespace, content-first layout  
- **Depth**: Frosted glass top bar, bottom sheet modals (slide-up animation), card shadows
- **Controls**: iOS-style toggle switches, continuous corners (13px–28px radius)
- **Colors**: iOS system palette — `#007AFF` (blue), `#34C759` (green), `#FF3B30` (red), `#FF9500` (orange)

## Deployment (Vercel)

1. Connect your GitHub repo to Vercel
2. Set **Root Directory** to `apps/web` for the main app
3. Create a second Vercel project with **Root Directory** `apps/admin`
4. Configure custom domains: `app.yourplatform.com` and `admin.yourplatform.com`
5. Set environment variables in Vercel dashboard

## Background Jobs (Inngest)

After deploying, register your Inngest endpoint at `https://app.inn.gs`:

- Sync: `POST https://your-app.vercel.app/api/inngest`

Functions:
- `send-review-request` — Sends SMS via Twilio
- `scan-citations` — Scans 30+ directories for NAP consistency
- `generate-gbp-post` — Auto-generates weekly GBP content with OpenAI
