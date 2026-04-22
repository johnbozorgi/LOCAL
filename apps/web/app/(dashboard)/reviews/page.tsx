"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Phone,
  Star,
  Sparkles,
  CheckCircle2,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/ui/modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Review = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  publishedAt: string;
  aiReply: string | null;
  replied: boolean;
  isNegative?: boolean;
  isGated?: boolean;
};

const mockReviews: Review[] = [
  {
    id: "1",
    author: "Maria Garcia",
    avatar: "",
    rating: 5,
    text: "Absolutely amazing service! They fixed my AC unit in under 2 hours. The technician was professional and explained everything. Will definitely use again!",
    publishedAt: "2 days ago",
    aiReply: null,
    replied: false,
  },
  {
    id: "2",
    author: "James Wilson",
    avatar: "",
    rating: 4,
    text: "Good work overall. Showed up on time and did a thorough job. Price was fair. Only minor issue was a small cleanup needed afterward.",
    publishedAt: "5 days ago",
    aiReply:
      "Thank you so much for your kind words, James! We're thrilled we could help with your AC repair. We've taken note of your feedback on cleanup and will make sure our team is extra thorough. We look forward to serving you again!",
    replied: false,
  },
  {
    id: "3",
    author: "Sarah Chen",
    avatar: "",
    rating: 5,
    text: "Best HVAC company in Austin! Fast, reliable, and honest pricing. Already recommended to three neighbors.",
    publishedAt: "1 week ago",
    aiReply: null,
    replied: true,
  },
  {
    id: "4",
    author: "Bob Thompson",
    avatar: "",
    rating: 2,
    text: "Took longer than expected and left a mess. Had to call twice to get it fixed right.",
    publishedAt: "2 weeks ago",
    aiReply: null,
    replied: false,
    isNegative: true,
    isGated: true,
  },
];

const mockRequests = [
  { id: "1", name: "Alex Martinez", phone: "+1 (512) 555-0101", status: "sent", sentAt: "1h ago" },
  { id: "2", name: "Lisa Johnson", phone: "+1 (512) 555-0102", status: "responded_positive", sentAt: "3h ago" },
  { id: "3", name: "Tom Brown", phone: "+1 (512) 555-0103", status: "delivered", sentAt: "5h ago" },
  { id: "4", name: "Emma Davis", phone: "+1 (512) 555-0104", status: "review_posted", sentAt: "1d ago" },
];

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          style={{ width: size, height: size }}
          className={cn(
            star <= rating ? "text-[#FFCC00] fill-[#FFCC00]" : "text-[#e5e5ea] fill-[#e5e5ea]"
          )}
        />
      ))}
    </div>
  );
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  sent: { label: "Sent", color: "text-[#007AFF]", bg: "bg-[#007AFF]/10" },
  delivered: { label: "Delivered", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10" },
  responded_positive: { label: "👍 Positive", color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  responded_negative: { label: "👎 Negative", color: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10" },
  review_posted: { label: "✓ Posted", color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  failed: { label: "Failed", color: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10" },
};

export default function ReviewsPage() {
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [reviews, setReviews] = useState(mockReviews);
  const [generatingReply, setGeneratingReply] = useState<string | null>(null);

  const avgRating =
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length;

  const handleGenerateReply = async (reviewId: string) => {
    setGeneratingReply(reviewId);
    await new Promise((r) => setTimeout(r, 1500));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              aiReply:
                "Thank you so much for taking the time to share your experience! We truly appreciate your kind words and are so glad we could provide the service you expected. Your satisfaction is our top priority, and we look forward to serving you again in the future!",
            }
          : r
      )
    );
    setGeneratingReply(null);
  };

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: "47", icon: Star, color: "#FFCC00" },
          { label: "Average Rating", value: avgRating.toFixed(1), icon: Star, color: "#34C759" },
          { label: "Requests Sent", value: "23", icon: Send, color: "#007AFF" },
          { label: "Response Rate", value: "78%", icon: CheckCircle2, color: "#AF52DE" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="h-10 w-10 rounded-[13px] flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${stat.color}18` }}>
                    <Icon className="h-5 w-5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl font-bold text-[#1c1c1e]">{stat.value}</p>
                  <p className="text-xs text-[#8e8e93] font-medium mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="send">
        <TabsList>
          <TabsTrigger value="send">Send Requests</TabsTrigger>
          <TabsTrigger value="manage">Manage Reviews</TabsTrigger>
        </TabsList>

        {/* Send Requests Tab */}
        <TabsContent value="send">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Request a New Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-[#8e8e93] leading-relaxed">
                  Enter your customer&rsquo;s details and we&rsquo;ll send them a friendly SMS
                  asking for a Google review. Our smart gating system protects your
                  rating from negative feedback.
                </p>

                <div className="p-4 rounded-[16px] bg-[#34C759]/10 border border-[#34C759]/20">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#34C759] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1c1c1e]">
                        Smart Review Gating Active
                      </p>
                      <p className="text-xs text-[#8e8e93] mt-0.5">
                        Customers rate their experience first. Happy customers (👍) go
                        to Google. Unhappy customers (👎) get a private feedback form.
                      </p>
                    </div>
                  </div>
                </div>

                <Input
                  label="Customer Name"
                  placeholder="e.g. John Smith"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  prefix={<User className="h-4 w-4" />}
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="e.g. (512) 555-0100"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  prefix={<Phone className="h-4 w-4" />}
                />

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setSendModalOpen(true)}
                  disabled={!customerName || !customerPhone}
                >
                  <Send className="h-5 w-5" />
                  Send Review Request
                </Button>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRequests.map((req) => {
                    const status = statusConfig[req.status];
                    return (
                      <div
                        key={req.id}
                        className="flex items-center gap-3 p-3 rounded-[13px] bg-[#f2f2f7]"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs">
                            {req.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#1c1c1e]">
                            {req.name}
                          </p>
                          <p className="text-xs text-[#8e8e93]">{req.phone}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", status.bg, status.color)}>
                            {status.label}
                          </span>
                          <span className="text-xs text-[#8e8e93]">
                            {req.sentAt}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Manage Reviews Tab */}
        <TabsContent value="manage">
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={cn(review.isNegative && "border-l-4 border-l-[#FF3B30]")}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={review.avatar} />
                        <AvatarFallback>
                          {review.author.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-[#1c1c1e]">
                            {review.author}
                          </p>
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-[#8e8e93]">
                            {review.publishedAt}
                          </span>
                          {review.isGated && (
                            <Badge variant="destructive" className="text-[10px]">
                              Gated
                            </Badge>
                          )}
                          {review.replied && (
                            <Badge variant="success" className="text-[10px]">
                              Replied
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#3c3c3e] mt-2 leading-relaxed">
                          {review.text}
                        </p>

                        {review.aiReply && (
                          <div className="mt-3 p-3 rounded-[13px] bg-[#007AFF]/5 border border-[#007AFF]/20">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-[#007AFF]" />
                              <span className="text-xs font-bold text-[#007AFF]">
                                AI Reply Draft
                              </span>
                            </div>
                            <p className="text-sm text-[#3c3c3e] leading-relaxed">
                              {review.aiReply}
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" className="text-xs h-8">
                                <Send className="h-3.5 w-3.5" />
                                Send to Google
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs h-8">
                                Edit
                              </Button>
                            </div>
                          </div>
                        )}

                        {!review.replied && !review.aiReply && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="text-xs h-8"
                              loading={generatingReply === review.id}
                              onClick={() => handleGenerateReply(review.id)}
                            >
                              <Sparkles className="h-3.5 w-3.5" />
                              {generatingReply === review.id ? "Generating..." : "Generate AI Reply"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Send Confirmation Modal */}
      <Modal open={sendModalOpen} onOpenChange={setSendModalOpen}>
        <ModalContent variant="bottom">
          <ModalHeader>
            <ModalTitle>Confirm Review Request</ModalTitle>
            <ModalDescription>
              Send a review request SMS to {customerName}?
            </ModalDescription>
          </ModalHeader>
          <div className="px-6 py-4">
            <div className="p-4 rounded-[16px] bg-[#f2f2f7] space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-[#007AFF]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1c1c1e]">{customerName}</p>
                  <p className="text-xs text-[#8e8e93]">{customerPhone}</p>
                </div>
              </div>
              <div className="p-3 rounded-[13px] bg-white border border-[#e5e5ea]">
                <p className="text-xs text-[#8e8e93] font-medium mb-1">SMS Preview</p>
                <p className="text-sm text-[#1c1c1e]">
                  Hi {customerName || "there"}! Thanks for choosing us. How was your
                  experience? Reply 👍 if great or 👎 if not. Either way, your
                  feedback helps us improve!
                </p>
              </div>
            </div>
          </div>
          <ModalFooter>
            <Button
              className="w-full"
              onClick={() => {
                setSendModalOpen(false);
                setCustomerName("");
                setCustomerPhone("");
              }}
            >
              <Send className="h-5 w-5" />
              Send Now
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setSendModalOpen(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
