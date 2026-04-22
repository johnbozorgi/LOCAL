import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";
import { businesses } from "./businesses";
import { workspaces } from "./users";

export const reviewRequests = pgTable("review_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  customerEmail: text("customer_email"),
  channel: text("channel", { enum: ["sms", "email"] })
    .default("sms")
    .notNull(),
  status: text("status", {
    enum: [
      "pending",
      "sent",
      "delivered",
      "responded_positive",
      "responded_negative",
      "review_posted",
      "failed",
    ],
  })
    .default("pending")
    .notNull(),
  twilioSid: text("twilio_sid"),
  sentAt: timestamp("sent_at"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  businessId: uuid("business_id")
    .notNull()
    .references(() => businesses.id, { onDelete: "cascade" }),
  googleReviewId: text("google_review_id").unique(),
  authorName: text("author_name"),
  authorPhotoUrl: text("author_photo_url"),
  rating: integer("rating").notNull(),
  text: text("text"),
  publishedAt: timestamp("published_at"),
  aiReply: text("ai_reply"),
  aiReplyGeneratedAt: timestamp("ai_reply_generated_at"),
  repliedAt: timestamp("replied_at"),
  isNegative: boolean("is_negative").default(false).notNull(),
  isGated: boolean("is_gated").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
