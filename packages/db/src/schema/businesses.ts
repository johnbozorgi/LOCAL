import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  real,
  jsonb,
} from "drizzle-orm/pg-core";
import { workspaces } from "./users";

export const businesses = pgTable("businesses", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  address: text("address"),
  city: text("city"),
  state: text("state").default("TX"),
  zip: text("zip"),
  category: text("category"),
  description: text("description"),
  gbpLocationId: text("gbp_location_id"),
  gbpAccessToken: text("gbp_access_token"),
  gbpRefreshToken: text("gbp_refresh_token"),
  napLocked: boolean("nap_locked").default(false).notNull(),
  healthScore: integer("health_score").default(0),
  latitude: real("latitude"),
  longitude: real("longitude"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const todoItems = pgTable("todo_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id").references(() => businesses.id, {
    onDelete: "cascade",
  }),
  title: text("title").notNull(),
  description: text("description"),
  priority: text("priority", { enum: ["today", "this_week", "suggested"] })
    .default("suggested")
    .notNull(),
  category: text("category", {
    enum: ["review", "gbp", "citation", "ranking", "general"],
  })
    .default("general")
    .notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  dueDate: timestamp("due_date"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
