---
description: Apply these instructions when creating or modifying server actions for data mutations in this project.
---

# Server Actions

## General Rules

- All data mutations must be performed via **server actions**. Do not mutate data in route handlers or client components.
- Server actions must be called from **client components** only.
- Server action files must be named **`actions.ts`** and colocated in the same directory as the component that calls them. Examples:
  - `app/dashboard/page.tsx` calls `app/dashboard/actions.ts`
  - `app/link/[id]/page.tsx` calls `app/link/[id]/actions.ts`

## Return Values

- Server actions must **never throw errors**. Instead, always return a typed result object with either a `success` or `error` property.
- Example return type:

```ts
type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string }
```

- Callers should check the returned object rather than using try/catch.

## TypeScript

- All data passed into server actions must have explicit TypeScript types.
- Do **not** use the `FormData` TypeScript type. Define dedicated typed objects or interfaces instead.

Example:

```ts
interface CreateLinkData {
  title: string
  url: string
}

export async function createLink(data: CreateLinkData) {
  const { title, url } = data
  // ...
}
```

## Validation

- Validate all incoming data using **Zod** before any further processing.
- Reject and return an error early if validation fails.
  Example:

```ts
import { z } from "zod"
const CreateLinkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
})
export async function createLink(data: CreateLinkData): Promise<ActionResult> {
  const parsedData = CreateLinkSchema.safeParse(data)
  if (!parsedData.success) {
    return { success: false, error: "Invalid input data" }
  }
  const { title, url } = parsedData.data
  // ...
}
```

## Authentication

- Every server action must check for a logged-in user **before** performing any database operation.
- Use Clerk's `auth()` helper to retrieve the current user. Return an error immediately if no user is found.
  Example:

```ts
import { auth } from "@clerk/nextjs/server"

export async function createLink(data: CreateLinkData): Promise<ActionResult> {
  const { userId } = await auth()
  if (!userId) {
    return { success: false, error: "User not authenticated" }
  }
  // ...
}
```

## Database Access

- Do **not** use Drizzle queries directly inside server actions.
- All database operations must go through **helper functions** located in the `/data` directory.
- Server actions should import and call these helpers rather than constructing queries inline.
  Example:

```ts
import { createLinkInDB } from "@/data/link"
export async function createLink(data: CreateLinkData) {
  // ...validation and auth checks
  await createLinkInDB({ title, url, userId: user.id })
}
```
