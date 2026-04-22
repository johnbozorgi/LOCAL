import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  real,
  jsonb,
} from "drizzle-orm/pg-core";
import { businesses } from "./businesses";
import { workspaces } from "./users";

export const rankingGrids = pgTable("ranking_grids", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  keyword: text("keyword").notNull(),
  gridSize: integer("grid_size").default(5).notNull(),
  centerLat: real("center_lat").notNull(),
  centerLng: real("center_lng").notNull(),
  radiusMiles: real("radius_miles").default(5).notNull(),
  results: jsonb("results"),
  averageRank: real("average_rank"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const competitors = pgTable("competitors", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  address: text("address"),
  phone: text("phone"),
  rating: real("rating"),
  reviewCount: integer("review_count"),
  googlePlaceId: text("google_place_id"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  rank: integer("rank"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const gbpPosts = pgTable("gbp_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  type: text("type", {
    enum: ["whats_new", "event", "offer", "product"],
  })
    .default("whats_new")
    .notNull(),
  title: text("title"),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  aiGenerated: text("ai_generated").default("false"),
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  googlePostId: text("google_post_id"),
  status: text("status", {
    enum: ["draft", "scheduled", "published", "failed"],
  })
    .default("draft")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
