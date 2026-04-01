---
description: Read this file before implementing or modifying UI components in the project.
----

# UI Standards — shadcn/ui

All UI elements in this project use **shadcn/ui**. Agents must follow these rules without exception.

---

## Rules

- **Never create custom UI components.** Always use an existing shadcn/ui component or add a new one from the shadcn/ui library.
- All reusable UI primitives live in `components/ui/`. Do not place ad-hoc styled elements elsewhere.
- When a required component does not yet exist in `components/ui/`, add it using the shadcn/ui pattern (matching the style of `button.tsx`). Do not build it from scratch.
- Use the `cn()` helper from `lib/utils.ts` for all conditional class merging.
- Do not use inline `style` props or raw HTML elements (`<div>`, `<span>`, etc.) as substitutes for available shadcn/ui components.
- Do not wrap shadcn/ui components in unnecessary custom wrapper components.

## Available Components

Check `components/ui/` for the current list of installed components before adding a new one. Reuse what is already there.

## Adding New shadcn/ui Components

1. Confirm the component exists in the [shadcn/ui registry](https://ui.shadcn.com/docs/components).
2. Add the component file to `components/ui/` following the existing file structure.
3. Do **not** install new npm dependencies without explicit user approval.
