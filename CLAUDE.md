# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

A Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 full-stack app for learning Anthropic Claude Code and Claude API concepts hands-on.

## Commands

Run from inside `claude-learning-app/`:

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build (also type-checks)
- `npm run lint` — ESLint check
- `npx prisma db push` — sync schema changes to DB (no migration history; use instead of `migrate dev`)
- `npx prisma generate` — regenerate Prisma client after schema changes
- `npx prisma studio` — GUI to inspect DB

## Architecture

### Stack
- **Next.js 16** App Router, React 19, TypeScript (strict), Tailwind CSS v4
- **shadcn/ui** via the unified `radix-ui` package — import as `import { X } from "radix-ui"`, NOT `@radix-ui/react-*`
- **Supabase** for auth (email/password) + Postgres database
- **Prisma 7** ORM with `@prisma/adapter-pg` (PrismaPg adapter required — no native connection)
- **lucide-react** for icons

### Key Architectural Decisions

**Next.js 16 Middleware → Proxy:** `middleware.ts` is replaced by `src/proxy.ts` with a function named `proxy` (not `middleware`). Root-level `middleware.ts` is silently ignored by Turbopack. The proxy handles session refresh and route protection.

**Prisma 7 Config:** `url`/`directUrl` in `datasource` are removed. Config lives in `prisma.config.ts` at project root, sourcing `DIRECT_URL` from `.env` via dotenv. The `PrismaClient` must be constructed with `new PrismaPg({ connectionString })` adapter. The singleton is at `src/lib/prisma.ts`.

**DB Push vs Migrate:** This project uses `prisma db push` (no migration history). Running `prisma migrate dev` will error with drift. Always use `prisma db push` for schema changes, then `prisma generate`.

**Dev Server Caching:** After `prisma generate`, restart `npm run dev` — the Prisma client singleton is cached in `globalThis` and won't pick up new models until the process restarts.

### Data Flow

**Concept content** is static data in `src/data/concepts.ts` — an array of `Concept` objects with sections, code blocks, difficulty, and references. Not DB-driven.

**User interactions** (likes, comments) are persisted in Postgres via Prisma. Concept pages use `export const dynamic = 'force-dynamic'` to SSR fresh data on each request.

**Auth:** `src/proxy.ts` redirects unauthenticated users to `/login` and authenticated users away from auth pages. Server components call `createClient()` from `src/lib/supabase/server.ts` to get the current user. On signup, a `Profile` row is created in Prisma alongside the Supabase auth record.

### Route Map
| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Homepage; server component; fetches user + profile |
| `/concepts/[slug]` | `src/app/concepts/[slug]/page.tsx` | Dynamic SSR; fetches likes + comments |
| `/login`, `/signup` | `src/app/(auth)/*/page.tsx` | Route group with gradient layout |
| `/auth/callback` | `src/app/auth/callback/route.ts` | Supabase PKCE code exchange |

### Server Actions
- `src/app/actions/auth.ts` — `login`, `signup`, `logout`
- `src/app/actions/concepts.ts` — `toggleLike`, `addComment`, `deleteComment`

All actions auth-guard via `supabase.auth.getUser()` and call `revalidatePath` after mutations.

### Environment Variables
`.env` — `DATABASE_URL` (pooler, pgBouncer) + `DIRECT_URL` (direct, for Prisma CLI)
`.env.local` — `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + both DB URLs

`prisma.config.ts` reads from `.env` (not `.env.local`) via explicit `dotenv` call.
