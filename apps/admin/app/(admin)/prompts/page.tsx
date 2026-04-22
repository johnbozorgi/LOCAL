"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Save, RefreshCw, Eye, Star, Building2, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultPrompts = [
  {
    id: "review-reply-positive",
    name: "Review Reply – Positive (4–5 stars)",
    category: "reviews",
    icon: Star,
    color: "#FFCC00",
    content: `You are a professional local business reputation manager. Write a warm, authentic Google review reply for a {{rating}}-star review from {{author_name}}.

Business: {{business_name}}
Review: {{review_text}}

Guidelines:
- Start by thanking the customer by name
- Reference something specific from their review
- Reinforce the positive experience
- Invite them back
- Keep it under 150 words
- Do not use emojis or hashtags
- Sound human and genuine, not corporate`,
  },
  {
    id: "review-reply-negative",
    name: "Review Reply – Negative (1–3 stars)",
    category: "reviews",
    icon: Star,
    color: "#FF3B30",
    content: `You are a professional local business reputation manager. Write an empathetic, professional Google review reply for a {{rating}}-star review from {{author_name}}.

Business: {{business_name}}
Review: {{review_text}}

Guidelines:
- Acknowledge the customer's experience sincerely
- Apologize without making excuses
- Offer to resolve the issue offline (provide phone/email)
- Keep it professional and calm
- Do NOT be defensive
- Keep it under 100 words`,
  },
  {
    id: "gbp-post-weekly",
    name: "GBP Weekly Post",
    category: "gbp",
    icon: Building2,
    color: "#007AFF",
    content: `Generate an engaging Google Business Profile post for a local {{category}} business in Texas.

Business: {{business_name}}
City: {{city}}
Seasonal context: {{season_month}}

Requirements:
- Write a compelling 80-120 word post
- Include a clear call-to-action
- Make it feel local and authentic
- Focus on value to the customer
- Do NOT use excessive emojis (max 2)
- No hashtags`,
  },
  {
    id: "photo-caption",
    name: "GBP Photo Caption",
    category: "gbp",
    icon: Building2,
    color: "#AF52DE",
    content: `Generate a concise, engaging caption for a Google Business Profile photo for a {{category}} business.

Business: {{business_name}}
Photo description: {{photo_description}}

Requirements:
- 30-60 words maximum
- Professional and inviting tone
- Include location mention
- End with a soft call-to-action`,
  },
  {
    id: "review-request-sms",
    name: "Review Request SMS",
    category: "reviews",
    icon: MessageSquare,
    color: "#34C759",
    content: `Hi {{customer_name}}! Thank you for choosing {{business_name}}. We hope your experience was excellent! 

Would you mind sharing a quick Google review? It only takes 60 seconds and helps us serve our Austin community better.

Reply 👍 if you're happy to leave a review, or 👎 if there's anything we can improve.

- {{business_owner_name}}`,
  },
];

export default function PromptsPage() {
  const [prompts, setPrompts] = useState(defaultPrompts);
  const [selected, setSelected] = useState(defaultPrompts[0]);
  const [editContent, setEditContent] = useState(defaultPrompts[0].content);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setPrompts(prev => prev.map(p => p.id === selected.id ? { ...p, content: editContent } : p));
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSelect = (prompt: typeof selected) => {
    setSelected(prompt);
    setEditContent(prompt.content);
    setSaved(false);
  };

  const categoryColors: Record<string, string> = {
    reviews: "#FFCC00",
    gbp: "#007AFF",
    citations: "#AF52DE",
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Prompt list */}
      <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="p-5 border-b border-[#f2f2f7]">
          <h2 className="text-lg font-bold text-[#1c1c1e]">AI Prompts</h2>
          <p className="text-xs text-[#8e8e93] mt-1">Manage all AI content prompts</p>
        </div>
        <div className="p-3 space-y-1">
          {prompts.map((prompt) => {
            const Icon = prompt.icon;
            const isSelected = selected.id === prompt.id;
            return (
              <button
                key={prompt.id}
                onClick={() => handleSelect(prompt)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-[13px] text-left transition-all",
                  isSelected ? "bg-[#007AFF] text-white" : "hover:bg-[#f2f2f7]"
                )}
              >
                <div className="h-8 w-8 rounded-[10px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : `${prompt.color}18` }}>
                  <Icon className="h-4 w-4" style={{ color: isSelected ? "white" : prompt.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-bold leading-tight truncate", isSelected ? "text-white" : "text-[#1c1c1e]")}>
                    {prompt.name}
                  </p>
                  <p className={cn("text-[10px] capitalize mt-0.5", isSelected ? "text-white/70" : "text-[#8e8e93]")}>
                    {prompt.category}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-5 border-b border-[#f2f2f7] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1c1c1e]">{selected.name}</h2>
              <p className="text-xs text-[#8e8e93] mt-0.5">
                Use &#123;&#123;variable_name&#125;&#125; for dynamic values
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-[#f2f2f7] text-xs font-semibold text-[#8e8e93] hover:text-[#1c1c1e] transition-colors">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-[#f2f2f7] text-xs font-semibold text-[#8e8e93] hover:text-[#1c1c1e] transition-colors">
                <RefreshCw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>
          </div>
          <div className="p-5">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full min-h-[400px] font-mono text-sm text-[#1c1c1e] bg-[#f2f2f7] rounded-[13px] p-4 resize-none outline-none focus:ring-2 focus:ring-[#007AFF]"
            />
          </div>
          <div className="p-5 pt-0">
            <button
              onClick={handleSave}
              disabled={saving}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-[13px] text-sm font-bold text-white transition-all",
                saved ? "bg-[#34C759]" : "bg-[#007AFF] hover:bg-[#0066DD]",
                saving && "opacity-70"
              )}
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : saved ? "Saved!" : "Save Prompt"}
            </button>
          </div>
        </div>

        {/* Variables reference */}
        <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
          <h3 className="text-sm font-bold text-[#1c1c1e] mb-3">Available Variables</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              "{{business_name}}", "{{customer_name}}", "{{author_name}}",
              "{{rating}}", "{{review_text}}", "{{city}}",
              "{{category}}", "{{season_month}}", "{{business_owner_name}}",
              "{{photo_description}}", "{{first_name}}", "{{phone_number}}",
            ].map((v) => (
              <code key={v} className="text-xs bg-[#f2f2f7] text-[#007AFF] px-2 py-1 rounded-[8px] font-mono">
                {v}
              </code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
