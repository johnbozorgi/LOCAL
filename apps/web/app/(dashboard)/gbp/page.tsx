"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Unlock,
  Upload,
  Sparkles,
  Calendar,
  ImageIcon,
  FileText,
  Tag,
  Package,
  Clock,
  Plus,
  Trash2,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/ui/modal";
import { cn } from "@/lib/utils";

const mockPosts = [
  {
    id: "1",
    type: "whats_new",
    content: "Summer AC tune-up special! 20% off all maintenance checks this July. Keep your home cool and save money. Book today!",
    imageUrl: "/placeholder.jpg",
    status: "published",
    publishedAt: "Jul 15, 2025",
    aiGenerated: true,
  },
  {
    id: "2",
    type: "offer",
    content: "FREE diagnostic with any repair over $150. Limited time offer for Austin homeowners. Call now to schedule!",
    imageUrl: null,
    status: "scheduled",
    scheduledAt: "Jul 22, 2025",
    aiGenerated: false,
  },
  {
    id: "3",
    type: "whats_new",
    content: "We're now offering 24/7 emergency HVAC services! No more waiting until morning when your AC breaks down at 2am.",
    imageUrl: null,
    status: "draft",
    aiGenerated: true,
  },
];

const postTypeConfig = {
  whats_new: { label: "What's New", icon: FileText, color: "#007AFF" },
  event: { label: "Event", icon: Calendar, color: "#AF52DE" },
  offer: { label: "Offer", icon: Tag, color: "#FF9500" },
  product: { label: "Product", icon: Package, color: "#34C759" },
};

const statusConfig = {
  published: { label: "Published", color: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  scheduled: { label: "Scheduled", color: "text-[#FF9500]", bg: "bg-[#FF9500]/10" },
  draft: { label: "Draft", color: "text-[#8e8e93]", bg: "bg-[#f2f2f7]" },
  failed: { label: "Failed", color: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10" },
};

export default function GBPPage() {
  const [napLocked, setNapLocked] = useState(true);
  const [autoPosting, setAutoPosting] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [generatingCaption, setGeneratingCaption] = useState(false);
  const [postType, setPostType] = useState("whats_new");
  const posts = mockPosts;

  const handleGenerateCaption = async () => {
    setGeneratingCaption(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPostContent(
      "Beat the Texas heat this summer! 🌡️ Our certified HVAC technicians are ready to keep your home perfectly cool. Book your seasonal tune-up today and enjoy peace of mind all summer long. Limited slots available!"
    );
    setGeneratingCaption(false);
  };

  const napFields = [
    { label: "Business Name", value: "Austin HVAC & Cooling LLC", locked: napLocked },
    { label: "Phone Number", value: "(512) 555-0100", locked: napLocked },
    { label: "Address", value: "3201 Bee Cave Rd, Austin TX 78746", locked: napLocked },
    { label: "Website", value: "www.austinhvacandcooling.com", locked: napLocked },
    { label: "Hours", value: "Mon–Fri 8am–6pm, Sat 9am–4pm", locked: false },
  ];

  return (
    <div className="space-y-6">
      {/* NAP Profile Lock */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-12 w-12 rounded-[16px] flex items-center justify-center",
                  napLocked ? "bg-[#34C759]/10" : "bg-[#FF9500]/10"
                )}>
                  {napLocked ? (
                    <Lock className="h-6 w-6 text-[#34C759]" />
                  ) : (
                    <Unlock className="h-6 w-6 text-[#FF9500]" />
                  )}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1c1c1e]">NAP Profile Lock</h2>
                  <p className="text-sm text-[#8e8e93]">
                    {napLocked
                      ? "Your business info is locked and consistent across Google"
                      : "Profile unlocked – changes may cause inconsistencies"}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={napLocked}
                onCheckedChange={setNapLocked}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {napFields.map((field) => (
                <div
                  key={field.label}
                  className={cn(
                    "flex items-center gap-3 p-3.5 rounded-[13px]",
                    field.locked ? "bg-[#f2f2f7]" : "bg-white border border-[#e5e5ea]"
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#8e8e93]">{field.label}</p>
                    <p className="text-sm font-medium text-[#1c1c1e] truncate mt-0.5">
                      {field.value}
                    </p>
                  </div>
                  {field.locked && (
                    <Lock className="h-4 w-4 text-[#34C759] shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {!napLocked && (
              <div className="mt-4 p-3 rounded-[13px] bg-[#FF9500]/10 border border-[#FF9500]/20 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#FF9500] flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <p className="text-sm text-[#FF9500] font-medium">
                  Profile is unlocked. Inconsistent NAP data can hurt your local rankings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card
            className="cursor-pointer hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-shadow"
            onClick={() => setUploadModalOpen(true)}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-[16px] bg-[#AF52DE]/10 flex items-center justify-center shrink-0">
                <ImageIcon className="h-6 w-6 text-[#AF52DE]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1c1c1e]">Upload Photo</p>
                <p className="text-xs text-[#8e8e93]">Add with AI caption</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card
            className="cursor-pointer hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-shadow"
            onClick={() => setPostModalOpen(true)}
          >
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-[16px] bg-[#007AFF]/10 flex items-center justify-center shrink-0">
                <Plus className="h-6 w-6 text-[#007AFF]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1c1c1e]">New Post</p>
                <p className="text-xs text-[#8e8e93]">Schedule or publish now</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-[16px] bg-[#34C759]/10 flex items-center justify-center shrink-0">
                  <Sparkles className="h-6 w-6 text-[#34C759]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#1c1c1e]">Auto-Posting</p>
                  <p className="text-xs text-[#8e8e93]">AI posts weekly</p>
                </div>
                <ToggleSwitch
                  checked={autoPosting}
                  onCheckedChange={setAutoPosting}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Posts Calendar / List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Scheduled Posts</CardTitle>
              <Button size="sm" variant="secondary" onClick={() => setPostModalOpen(true)}>
                <Plus className="h-4 w-4" />
                New Post
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {posts.map((post, i) => {
              const typeConfig = postTypeConfig[post.type as keyof typeof postTypeConfig];
              const statusCfg = statusConfig[post.status as keyof typeof statusConfig];
              const TypeIcon = typeConfig.icon;
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 p-4 rounded-[16px] bg-[#f2f2f7]"
                >
                  <div
                    className="h-10 w-10 rounded-[12px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${typeConfig.color}18` }}
                  >
                    <TypeIcon className="h-5 w-5" style={{ color: typeConfig.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-xs font-semibold" style={{ color: typeConfig.color }}>
                        {typeConfig.label}
                      </span>
                      <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", statusCfg.bg, statusCfg.color)}>
                        {statusCfg.label}
                      </span>
                      {post.aiGenerated && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#AF52DE]/10 text-[#AF52DE] flex items-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[#3c3c3e] leading-relaxed line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <Clock className="h-3.5 w-3.5 text-[#8e8e93]" />
                      <span className="text-xs text-[#8e8e93]">
                        {post.publishedAt || post.scheduledAt || "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.status === "draft" && (
                      <Button size="icon-sm" variant="secondary">
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button size="icon-sm" variant="ghost">
                      <Trash2 className="h-3.5 w-3.5 text-[#FF3B30]" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </CardContent>
        </Card>
      </motion.div>

      {/* New Post Modal */}
      <Modal open={postModalOpen} onOpenChange={setPostModalOpen}>
        <ModalContent variant="bottom">
          <ModalHeader>
            <ModalTitle>Create New Post</ModalTitle>
            <ModalDescription>
              Write your post or let AI generate one for you
            </ModalDescription>
          </ModalHeader>
          <div className="px-6 py-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(postTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={type}
                    onClick={() => setPostType(type)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-3 rounded-[13px] transition-all",
                      postType === type
                        ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                        : "bg-[#f2f2f7] hover:bg-white"
                    )}
                  >
                    <Icon className="h-5 w-5" style={{ color: config.color }} />
                    <span className="text-xs font-medium text-[#1c1c1e]">
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div>
              <label className="text-sm font-semibold text-[#1c1c1e] mb-1.5 block">
                Post Content
              </label>
              <textarea
                className="w-full min-h-[120px] rounded-[13px] border border-[#e5e5ea] bg-white px-4 py-3 text-sm text-[#1c1c1e] placeholder:text-[#c7c7cc] resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent"
                placeholder="Write your post content..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            <Button
              variant="secondary"
              className="w-full"
              loading={generatingCaption}
              onClick={handleGenerateCaption}
            >
              <Sparkles className="h-4 w-4" />
              {generatingCaption ? "Generating with AI..." : "Generate with AI"}
            </Button>
          </div>
          <ModalFooter>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4" />
                Schedule
              </Button>
              <Button className="flex-1" disabled={!postContent}>
                <Send className="h-4 w-4" />
                Publish Now
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Photo Upload Modal */}
      <Modal open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Upload Photo</ModalTitle>
            <ModalDescription>
              Add a photo to your Google Business Profile with an AI-generated caption
            </ModalDescription>
          </ModalHeader>
          <div className="px-6 py-4 space-y-4">
            <div className="border-2 border-dashed border-[#e5e5ea] rounded-[16px] p-8 text-center cursor-pointer hover:border-[#007AFF] hover:bg-[#007AFF]/5 transition-all group">
              <Upload className="h-10 w-10 text-[#c7c7cc] group-hover:text-[#007AFF] mx-auto mb-3 transition-colors" />
              <p className="text-sm font-semibold text-[#1c1c1e]">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-[#8e8e93] mt-1">
                PNG, JPG, WEBP up to 10MB
              </p>
            </div>
            <Button variant="secondary" className="w-full">
              <Sparkles className="h-4 w-4" />
              Generate AI Caption
            </Button>
          </div>
          <ModalFooter>
            <Button className="w-full" onClick={() => setUploadModalOpen(false)}>
              Upload to Google Business
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
