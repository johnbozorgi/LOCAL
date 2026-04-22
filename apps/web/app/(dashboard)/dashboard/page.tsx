"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Star,
  Map,
  Building2,
  Link2,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const mockTodos = [
  {
    id: "1",
    title: "Send review request to 5 recent customers",
    category: "review" as const,
    priority: "today" as const,
    completed: false,
    icon: Star,
  },
  {
    id: "2",
    title: "Respond to 2 new Google reviews",
    category: "review" as const,
    priority: "today" as const,
    completed: false,
    icon: MessageSquare,
  },
  {
    id: "3",
    title: "Update holiday hours on Google Business Profile",
    category: "gbp" as const,
    priority: "today" as const,
    completed: false,
    icon: Building2,
  },
  {
    id: "4",
    title: "Fix NAP inconsistency on Yelp",
    category: "citation" as const,
    priority: "this_week" as const,
    completed: false,
    icon: Link2,
  },
  {
    id: "5",
    title: "Publish weekly Google post",
    category: "gbp" as const,
    priority: "this_week" as const,
    completed: true,
    icon: Building2,
  },
  {
    id: "6",
    title: "Run full citation scan",
    category: "citation" as const,
    priority: "suggested" as const,
    completed: false,
    icon: Link2,
  },
  {
    id: "7",
    title: "Check local ranking for 'plumber Austin TX'",
    category: "ranking" as const,
    priority: "suggested" as const,
    completed: false,
    icon: Map,
  },
];

const mockStats = [
  {
    label: "Reviews This Month",
    value: "12",
    change: "+4",
    positive: true,
    icon: Star,
    color: "#FF9500",
  },
  {
    label: "Avg. Star Rating",
    value: "4.8",
    change: "+0.2",
    positive: true,
    icon: TrendingUp,
    color: "#34C759",
  },
  {
    label: "Local Rank (Top KW)",
    value: "#3",
    change: "+2",
    positive: true,
    icon: Map,
    color: "#007AFF",
  },
  {
    label: "Citations Correct",
    value: "24/31",
    change: "+3",
    positive: true,
    icon: Link2,
    color: "#AF52DE",
  },
];

const priorityConfig = {
  today: {
    label: "Today",
    color: "text-[#FF3B30]",
    bg: "bg-[#FF3B30]/10",
    dot: "bg-[#FF3B30]",
  },
  this_week: {
    label: "This Week",
    color: "text-[#FF9500]",
    bg: "bg-[#FF9500]/10",
    dot: "bg-[#FF9500]",
  },
  suggested: {
    label: "Suggested",
    color: "text-[#007AFF]",
    bg: "bg-[#007AFF]/10",
    dot: "bg-[#007AFF]",
  },
};

type ChatMessage = { role: "assistant" | "user"; content: string };

export default function DashboardPage() {
  const [todos, setTodos] = useState(mockTodos);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Local SEO co-pilot. Ask me anything about growing your local business online. 🎯",
    },
  ]);

  const healthScore = 72;
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const todayTodos = todos.filter((t) => t.priority === "today" && !t.completed);
  const weekTodos = todos.filter(
    (t) => t.priority === "this_week" && !t.completed
  );
  const suggestedTodos = todos.filter(
    (t) => t.priority === "suggested" && !t.completed
  );
  const completedTodos = todos.filter((t) => t.completed);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg: ChatMessage = { role: "user", content: chatInput };
    const assistantMsg: ChatMessage = {
      role: "assistant",
      content:
        "Great question! Based on your current metrics, I'd recommend focusing on getting more Google reviews this week. Your rating is strong at 4.8 stars, but volume helps with local pack rankings. Would you like me to draft some review request messages?",
    };
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setChatInput("");
  };

  return (
    <div className="space-y-6">
      {/* Health Score Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-white to-[#f2f2f7]">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Score circle */}
              <div className="flex items-center gap-6">
                <div className="relative h-28 w-28 shrink-0">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#e5e5ea"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#FF9500"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${(healthScore / 100) * 314} 314`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-[#1c1c1e]">
                      {healthScore}
                    </span>
                    <span className="text-xs font-semibold text-[#8e8e93]">
                      / 100
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8e8e93] uppercase tracking-wide">
                    Local Health Score
                  </p>
                  <p className="text-2xl font-bold text-[#FF9500] mt-0.5">
                    Good
                  </p>
                  <p className="text-sm text-[#8e8e93] mt-1 max-w-[200px]">
                    3 actions today can push you to &ldquo;Excellent&rdquo;
                  </p>
                </div>
              </div>

              {/* Score breakdown */}
              <div className="flex-1 grid grid-cols-2 gap-3">
                {[
                  { label: "Reviews", value: 85, color: "#FF9500" },
                  { label: "GBP Health", value: 70, color: "#007AFF" },
                  { label: "Local Rank", value: 60, color: "#34C759" },
                  { label: "Citations", value: 75, color: "#AF52DE" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-[#8e8e93]">
                        {item.label}
                      </span>
                      <span className="text-xs font-bold text-[#1c1c1e]">
                        {item.value}
                      </span>
                    </div>
                    <Progress
                      value={item.value}
                      className="h-1.5"
                      indicatorClassName={`bg-[${item.color}]`}
                      style={
                        {
                          "--progress-color": item.color,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Progress on tasks */}
              <div className="md:text-right">
                <p className="text-xs font-semibold text-[#8e8e93]">
                  Today&rsquo;s Progress
                </p>
                <p className="text-4xl font-bold text-[#1c1c1e] mt-0.5">
                  {completedCount}
                  <span className="text-xl text-[#8e8e93]">/{totalCount}</span>
                </p>
                <p className="text-sm text-[#8e8e93]">tasks done</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div
                      className="h-10 w-10 rounded-[13px] flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}18` }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: stat.color }}
                      />
                    </div>
                    <Badge
                      variant={stat.positive ? "success" : "destructive"}
                      className="text-xs"
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-[#1c1c1e] mt-3">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#8e8e93] font-medium mt-0.5">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* To-Do List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#007AFF]" />
                Your Action Plan
              </CardTitle>
              <span className="text-sm font-semibold text-[#8e8e93]">
                {completedCount}/{totalCount} done
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Today */}
            {todayTodos.length > 0 && (
              <TodoSection
                title="Today"
                items={todayTodos}
                config={priorityConfig.today}
                onToggle={toggleTodo}
              />
            )}

            {/* This Week */}
            {weekTodos.length > 0 && (
              <TodoSection
                title="This Week"
                items={weekTodos}
                config={priorityConfig.this_week}
                onToggle={toggleTodo}
              />
            )}

            {/* Suggested */}
            {suggestedTodos.length > 0 && (
              <TodoSection
                title="Suggested"
                items={suggestedTodos}
                config={priorityConfig.suggested}
                onToggle={toggleTodo}
              />
            )}

            {/* Completed */}
            {completedTodos.length > 0 && (
              <TodoSection
                title="Completed"
                items={completedTodos}
                config={{
                  label: "Completed",
                  color: "text-[#8e8e93]",
                  bg: "bg-[#f2f2f7]",
                  dot: "bg-[#8e8e93]",
                }}
                onToggle={toggleTodo}
                isCompleted
              />
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 rounded-[20px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.16)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#f2f2f7]">
              <div className="h-8 w-8 rounded-full bg-[#007AFF] flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1c1c1e]">SEO Co-Pilot</p>
                <p className="text-xs text-[#34C759] font-medium">Online</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="ml-auto text-[#8e8e93] hover:text-[#1c1c1e]"
              >
                ×
              </button>
            </div>
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-[16px] px-3.5 py-2.5 text-sm leading-relaxed",
                      (msg.role as string) === "user"
                        ? "bg-[#007AFF] text-white rounded-br-[4px]"
                        : "bg-[#f2f2f7] text-[#1c1c1e] rounded-bl-[4px]"
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-[#f2f2f7]">
              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask your co-pilot..."
                  className="flex-1 text-sm bg-[#f2f2f7] rounded-full px-4 py-2 outline-none text-[#1c1c1e] placeholder:text-[#c7c7cc]"
                />
                <button
                  onClick={handleSendMessage}
                  className="h-9 w-9 rounded-full bg-[#007AFF] flex items-center justify-center text-white hover:bg-[#0066DD] transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="h-14 w-14 rounded-full bg-[#007AFF] shadow-[0_4px_20px_rgba(0,122,255,0.4)] flex items-center justify-center text-white hover:bg-[#0066DD] transition-all active:scale-95"
        >
          <Sparkles className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

interface TodoSectionProps {
  title: string;
  items: typeof mockTodos;
  config: {
    label: string;
    color: string;
    bg: string;
    dot: string;
  };
  onToggle: (id: string) => void;
  isCompleted?: boolean;
}

function TodoSection({ title, items, config, onToggle, isCompleted }: TodoSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className={cn("h-2 w-2 rounded-full", config.dot)} />
        <span className={cn("text-sm font-bold", config.color)}>{title}</span>
        <span className="text-xs text-[#8e8e93]">({items.length})</span>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                onClick={() => onToggle(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3.5 rounded-[13px] text-left transition-all hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)] group",
                  isCompleted
                    ? "bg-[#f2f2f7] opacity-60"
                    : "bg-[#f2f2f7] hover:bg-white"
                )}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#34C759]" />
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-[#c7c7cc] group-hover:text-[#007AFF] transition-colors" />
                )}
                <div
                  className={cn(
                    "h-8 w-8 rounded-[10px] flex items-center justify-center shrink-0",
                    config.bg
                  )}
                >
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <span
                  className={cn(
                    "flex-1 text-sm font-medium leading-snug",
                    isCompleted
                      ? "line-through text-[#8e8e93]"
                      : "text-[#1c1c1e]"
                  )}
                >
                  {item.title}
                </span>
                {!isCompleted && (
                  <ChevronRight className="h-4 w-4 text-[#c7c7cc] group-hover:text-[#8e8e93] shrink-0 transition-colors" />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
