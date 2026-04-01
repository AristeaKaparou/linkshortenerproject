import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const links = pgTable("links", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  shortCode: text("short_code").notNull().unique(),
  url: text("url").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type Link = typeof links.$inferSelect
export type NewLink = typeof links.$inferInsert
