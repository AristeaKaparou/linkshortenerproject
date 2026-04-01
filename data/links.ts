import { db } from "@/db";
import { links } from "@/db/schema";
import type { Link, NewLink } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getUserLinks(userId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function createLinkInDB(
  data: Omit<NewLink, "id" | "createdAt" | "updatedAt">
): Promise<Link> {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function isShortCodeAvailable(shortCode: string): Promise<boolean> {
  const result = await db
    .select({ id: links.id })
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return result.length === 0;
}

export async function getLinkByShortCode(shortCode: string): Promise<Link | null> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link ?? null;
}

export async function updateLinkInDB(
  id: number,
  userId: string,
  data: { url: string; shortCode: string }
): Promise<Link> {
  const [link] = await db
    .update(links)
    .set({ url: data.url, shortCode: data.shortCode, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}

export async function deleteLinkFromDB(id: number, userId: string): Promise<void> {
  await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}
