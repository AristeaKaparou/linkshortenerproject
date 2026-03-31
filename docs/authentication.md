# Authentication — Clerk

All authentication in this project is handled exclusively by **Clerk** (`@clerk/nextjs`). No other auth methods, libraries, or custom implementations may be used.

---

## Rules

- **Clerk only.** Do not implement custom auth, use NextAuth, or any other auth library.
- **Never trust client-supplied user IDs.** Always verify identity server-side via Clerk's `auth()` helper.
- **Do not store passwords, tokens, or PII** in the database — Clerk manages all identity data.
- `<ClerkProvider>` is mounted once in `app/layout.tsx`. Do not add it anywhere else.

---

## Protected Routes

- `/dashboard` is a protected route. Users **must** be authenticated to access it.
- Enforce this using Clerk's `auth()` in the Server Component or via `clerkMiddleware` in `middleware.ts`.
- If an unauthenticated user visits `/dashboard`, redirect them to sign in.

---

## Homepage Redirect

- If an **authenticated** user visits the homepage (`/`), redirect them to `/dashboard`.
- Implement this check in the `/` Server Component using `auth()` and Next.js `redirect()`.

---

## Sign In / Sign Up — Modal Only

- Sign in and sign up flows must **always launch as a modal**. Never navigate to a dedicated sign-in or sign-up page.
- Use Clerk's `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` components.
- Do not set `NEXT_PUBLIC_CLERK_SIGN_IN_URL` or `NEXT_PUBLIC_CLERK_SIGN_UP_URL` to route-based paths.

---

## Server-Side Auth Pattern

```ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Protect a route
const { userId } = await auth();
if (!userId) redirect("/");

// Redirect authenticated users away from homepage
const { userId } = await auth();
if (userId) redirect("/dashboard");
```

## Client-Side Auth Hooks

Use `useAuth()` or `useUser()` from `@clerk/nextjs` for client components that need auth state.

```ts
import { useAuth } from "@clerk/nextjs";
const { isSignedIn, userId } = useAuth();
```
