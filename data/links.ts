import { db } from "@/db";
import { links } from "@/db/schema";
import type { Link } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserLinks(userId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(links.createdAt);
}
