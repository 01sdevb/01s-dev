import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { scriptsTable } from "./scripts";

export const scriptCommentsTable = pgTable("script_comments", {
  id: serial("id").primaryKey(),
  scriptId: integer("script_id")
    .notNull()
    .references(() => scriptsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type ScriptComment = typeof scriptCommentsTable.$inferSelect;
