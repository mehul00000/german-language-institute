# German Language Institute — Kaithal

A full-stack website and admin dashboard for the German Language Institute in Kaithal, Haryana.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Convex + Clerk**, per the specs in [`docs/`](docs).

## Features

### Public site
- **Home** — institute introduction, why learn German, teaching methodology, level overview
- **About** — institute information and teaching approach
- **Courses** — course catalogue with per-course detail pages (`/courses/[slug]`)
- **German Levels** — interactive A1 → C1 level explorer
- **Admission** — enquiry / demo-class booking form (React Hook Form + Zod validation)
- **Contact** — address, phone, map
- **Privacy Policy** and **Terms & Conditions**
- SEO: metadata, `sitemap.xml`, `robots.txt`

### Admin dashboard (`/admin`)
- Manage courses, enquiries, students, testimonials, FAQs, and site settings
- Real-time data via Convex queries
- Authentication via Clerk; authorization enforced inside every Convex function (`convex/auth.ts`)

## Getting started

```bash
npm install
```

1. Copy `.env.example` to `.env.local` and fill in the values.
2. Create a Convex deployment and generate the backend types:

   ```bash
   npx convex dev
   ```

   This sets `CONVEX_DEPLOYMENT` — copy `NEXT_PUBLIC_CONVEX_URL` from its output into `.env.local`.

3. Run the app:

   ```bash
   npm run dev
   ```

The site runs **keyless** without Clerk keys (the admin dashboard will say so plainly), so you can develop the public site first and add Clerk credentials later.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk sign-in (admin auth) |
| `CLERK_SECRET_KEY` | Clerk server-side auth |
| `CLERK_JWT_ISSUER_DOMAIN` | Clerk ↔ Convex JWT integration |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL |
| `CONVEX_DEPLOYMENT` | Convex deployment identifier |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for SEO/sitemap |
| `RESEND_API_KEY` | (Optional) email notifications |

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run convex:dev` | Convex dev loop (pushes functions, generates types) |

## Project structure

```
convex/        Backend: schema, queries, mutations (auth checked in every function)
src/app/       Routes: (public)/ marketing pages, admin/ dashboard
src/components Public UI components and the enquiry form
src/lib/       Constants, static course data, Zod validation schemas
docs/          PRD, TRD and database design docs
```

## Deployment

Designed for **Vercel** (frontend) + **Convex** (backend):

1. Push this repo to GitHub.
2. Import it in Vercel; set the environment variables from the table above (production values).
3. Deploy Convex with `npx convex deploy` and point `NEXT_PUBLIC_CONVEX_URL` at the production deployment.
4. Add the Vercel production URL to the Clerk app's allowed origins.
