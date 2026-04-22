import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
import { businesses } from "./businesses";
import { workspaces } from "./users";

export const citations = pgTable("citations", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  directory: text("directory").notNull(),
  directoryUrl: text("directory_url"),
  directoryLogo: text("directory_logo"),
  status: text("status", {
    enum: ["correct", "incorrect", "missing", "pending"],
  })
    .default("pending")
    .notNull(),
  foundName: text("found_name"),
  foundPhone: text("found_phone"),
  foundAddress: text("found_address"),
  hasNameError: boolean("has_name_error").default(false).notNull(),
  hasPhoneError: boolean("has_phone_error").default(false).notNull(),
  hasAddressError: boolean("has_address_error").default(false).notNull(),
  listingUrl: text("listing_url"),
  lastScannedAt: timestamp("last_scanned_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const citationScans = pgTable("citation_scans", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  status: text("status", {
    enum: ["queued", "running", "completed", "failed"],
  })
    .default("queued")
    .notNull(),
  totalDirectories: text("total_directories").default("0"),
  correctCount: text("correct_count").default("0"),
  incorrectCount: text("incorrect_count").default("0"),
  missingCount: text("missing_count").default("0"),
  inngestEventId: text("inngest_event_id"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
