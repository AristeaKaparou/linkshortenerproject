# Agent Instructions — Link Shortener Project

This file defines the coding standards and conventions that all LLM agents must follow when contributing to this project.

---

## Project Overview

A URL shortener web application built with:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui components (Radix UI primitives)
- **Auth**: Clerk (`@clerk/nextjs`)
- **Database**: Neon (serverless PostgreSQL) via Drizzle ORM
- **Icons**: Lucide React

---

## Project Structure

```
app/                  # Next.js App Router — pages, layouts, route handlers
  layout.tsx          # Root layout (ClerkProvider, global fonts, header)
  page.tsx            # Home page
  globals.css         # Global styles / Tailwind base
components/
  ui/                 # Reusable shadcn/ui components (button, input, etc.)
db/
  index.ts            # Drizzle client (Neon serverless connection)
  schema.ts           # Drizzle table definitions
lib/
  utils.ts            # Shared utilities (cn helper)
drizzle.config.ts     # Drizzle Kit configuration
```

---

## TypeScript

- Always use TypeScript. No `.js` files except config files that require it.
- Enable and respect strict mode. Never use `any`; prefer `unknown` and narrow types.
- Use `type` for object shapes and unions. Use `interface` only when declaration merging is needed.
- Export types alongside their implementations in the same file.
- Use the `!` non-null assertion only when a value is guaranteed non-null in context (e.g., env vars validated at startup). Never use it to suppress errors.

---

## File & Naming Conventions

- **React components**: PascalCase filenames (`LinkCard.tsx`).
- **Utilities / helpers / hooks**: camelCase filenames (`useLinks.ts`, `generateSlug.ts`).
- **Route handlers**: `app/api/<resource>/route.ts`.
- **One component per file.** Do not co-locate multiple exported components in a single file unless they are tightly coupled sub-components.
- Use named exports for components, not default exports, except for Next.js page and layout files which **must** use default exports.

---

## React & Next.js

- Use the **App Router** exclusively. Do not use the Pages Router.
- Mark components as `"use client"` only when they require browser APIs, event handlers, or React state/effects. Prefer Server Components by default.
- Fetch data in Server Components or Route Handlers. Do not fetch directly from Client Components unless necessary (e.g., SWR/React Query patterns).
- Use Next.js `<Image>` for all images. Never use bare `<img>` tags.
- Use Next.js `<Link>` for all internal navigation. Never use bare `<a>` tags for internal routes.
- Keep `app/layout.tsx` minimal: only global providers, fonts, and shared shell UI.

---

## Styling

- Use **Tailwind CSS v4** utility classes exclusively. Do not write custom CSS except in `globals.css` for base/reset overrides.
- Use the `cn()` helper from `lib/utils.ts` to combine conditional class names.
- Follow the existing dark mode pattern using `dark:` variants. Do not introduce a separate theming system.
- Do not use inline `style` props unless absolutely necessary (e.g., dynamic values not expressible in Tailwind).

---

## Components (shadcn/ui)

- All reusable UI primitives live in `components/ui/`. Do not create ad-hoc styled wrappers outside this folder for generic elements.
- Use the existing `<Button>` component and its variants (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`) — do not create new button-like elements.
- When adding new shadcn/ui components, place them in `components/ui/` following the same pattern as `button.tsx`.

---

## Database (Drizzle ORM + Neon)

- All table definitions go in `db/schema.ts`. One file, all tables.
- Use Drizzle ORM query builders for all database access. Do not write raw SQL strings.
- Import the shared `db` client from `db/index.ts`. Never instantiate a second Drizzle client.
- Column naming: `snake_case` in the database, mapped to `camelCase` in TypeScript via Drizzle's `.mapWith()` or column aliases where needed.
- All database mutations (insert, update, delete) belong in **Server Actions** or **Route Handlers** — never in Client Components.
- Run migrations with Drizzle Kit (`drizzle-kit push` or `drizzle-kit migrate`). Do not hand-edit migration files.

---

## Authentication (Clerk)

- Use Clerk's `auth()` helper (server-side) and `useAuth()` / `useUser()` hooks (client-side) for all auth checks.
- Protect server-side data access with `auth()` at the top of Server Components and Route Handlers. Never trust client-supplied user IDs.
- Do not store passwords, tokens, or PII in the database schema — Clerk manages identity.
- The `<ClerkProvider>` is already mounted in `app/layout.tsx`. Do not add it elsewhere.

---

## API & Route Handlers

- Route handlers live at `app/api/<resource>/route.ts`.
- Always validate and sanitize incoming request data before processing. Use `zod` for schema validation if added to the project.
- Return consistent JSON responses: `{ data: ... }` for success, `{ error: string }` for errors.
- Use appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500).
- Never expose internal error stack traces to the client.

---

## Environment Variables

- All secrets and configuration live in `.env.local` (never committed).
- Access env vars via `process.env.VARIABLE_NAME`. For server-only vars, never expose them to the client bundle (no `NEXT_PUBLIC_` prefix unless intentionally public).
- Required env vars:
  - `DATABASE_URL` — Neon PostgreSQL connection string
  - `CLERK_SECRET_KEY` — Clerk server secret
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk public key

---

## Security

- Sanitize all user-supplied input before storing or displaying it.
- Validate short-link slugs server-side; never trust client input as a database key without lookup.
- Use `rel="noopener noreferrer"` on all `target="_blank"` anchor tags.
- Do not log sensitive data (tokens, user emails, full URLs with PII) to the console in production.

---

## Code Quality

- Run `npm run lint` before committing. All ESLint errors must be resolved.
- Do not disable ESLint rules inline (`// eslint-disable`) without an explanatory comment.
- Keep functions short and focused. If a function exceeds ~40 lines, consider splitting it.
- Do not leave `console.log` statements in committed code.
- Remove unused imports and variables.

---

## Documentation References

> **CRITICAL — MANDATORY STEP**: Before writing ANY code, you MUST read the relevant `/docs` file(s) listed below in full using a file-reading tool. Do not rely on memory, assumptions, or prior context. Skipping this step is not permitted under any circumstances.

- **Authentication**: See [`docs/authentication.md`](docs/authentication.md) for all Clerk auth rules, protected routes, and modal sign-in/sign-up requirements.
- **UI Components**: See [`docs/ui-components.md`](docs/ui-components.md) for shadcn/ui standards — all UI must use shadcn/ui; no custom components.

---

## What Agents Must NOT Do

- **ALWAYS read the relevant `/docs` instruction file(s) in full BEFORE generating any code — no exceptions.** If the task touches authentication, read `docs/authentication.md`. If it touches UI, read `docs/ui-components.md`. When in doubt, read both.
- Do not install new dependencies without explicit user approval.
- Do not modify `drizzle.config.ts`, `next.config.ts`, or `tsconfig.json` unless the task explicitly requires it.
- Do not delete or overwrite `db/schema.ts` — only append or modify table definitions.
- Do not add Pages Router files (`pages/`) — this project uses App Router only.
- Do not generate or commit `.env` files.
