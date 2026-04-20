import { pgTable, serial, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { scriptsTable } from "./scripts";

export const scriptRatingsTable = pgTable("script_ratings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  scriptId: integer("script_id").notNull().references(() => scriptsTable.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => [
  unique("user_script_rating").on(table.userId, table.scriptId),
]);

export type ScriptRating = typeof scriptRatingsTable.$inferSelect;
