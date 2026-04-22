"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  Eye,
  LogIn,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockStats = [
  { label: "Total Users", value: "1,247", change: "+23", positive: true, icon: Users, color: "#007AFF" },
  { label: "Active Workspaces", value: "389", change: "+12", positive: true, icon: Building2, color: "#34C759" },
  { label: "MRR", value: "$42,380", change: "+$3,240", positive: true, icon: DollarSign, color: "#FF9500" },
  { label: "Churn Rate", value: "2.1%", change: "-0.3%", positive: true, icon: TrendingUp, color: "#AF52DE" },
];

const mockActivity = [
  { user: "john@austinhvac.com", action: "Sent 12 review requests", time: "2 min ago", type: "review" },
  { user: "maria@texasplumbing.com", action: "Published GBP post", time: "8 min ago", type: "gbp" },
  { user: "admin@localseo.com", action: "New subscription: Professional", time: "15 min ago", type: "billing" },
  { user: "carlos@dallascafe.com", action: "Citation scan completed (28 dirs)", time: "1h ago", type: "citation" },
  { user: "sarah@houstonlaw.com", action: "Rank grid updated", time: "2h ago", type: "ranking" },
];

const mockAlerts = [
  { message: "Twilio API rate limit approaching (85% used)", severity: "warning", time: "5 min ago" },
  { message: "OpenAI API errors spiked — 12 failures in last hour", severity: "error", time: "23 min ago" },
  { message: "DataForSEO quota reset", severity: "info", time: "1h ago" },
  { message: "3 users reported review request failures", severity: "warning", time: "2h ago" },
];

const mockWorkspaces = [
  { name: "Austin HVAC & Cooling", owner: "john@austinhvac.com", plan: "Professional", users: 2, healthScore: 72, status: "active" },
  { name: "Texas Plumbing Masters", owner: "maria@texasplumbing.com", plan: "Starter", users: 1, healthScore: 58, status: "active" },
  { name: "Dallas Bistro Cafe", owner: "carlos@dallascafe.com", plan: "Professional", users: 3, healthScore: 85, status: "active" },
  { name: "Houston Legal Group", owner: "sarah@houstonlaw.com", plan: "Enterprise", users: 5, healthScore: 91, status: "active" },
  { name: "San Antonio Dental", owner: "bob@sadental.com", plan: "Starter", users: 1, healthScore: 34, status: "trial" },
];

const severityConfig = {
  error: { color: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10", dot: "bg-[#FF3B30]", Icon: AlertCircle },
  warning: { color: "text-[#FF9500]", bg: "bg-[#FF9500]/10", dot: "bg-[#FF9500]", Icon: AlertCircle },
  info: { color: "text-[#007AFF]", bg: "bg-[#007AFF]/10", dot: "bg-[#007AFF]", Icon: CheckCircle2 },
};

const planColors = {
  Starter: "#007AFF",
  Professional: "#AF52DE",
  Enterprise: "#FF9500",
};

export default function AdminDashboardPage() {
  const [impersonating, setImpersonating] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkspaces = mockWorkspaces.filter(
    (w) =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mockStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5"
            >
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-[13px] flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}18` }}>
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full",
                  stat.positive ? "bg-[#34C759]/10 text-[#34C759]" : "bg-[#FF3B30]/10 text-[#FF3B30]"
                )}>
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#1c1c1e] mt-3">{stat.value}</p>
              <p className="text-xs text-[#8e8e93] font-medium mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Workspaces / User Management */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="p-5 flex items-center justify-between border-b border-[#f2f2f7]">
              <h2 className="text-lg font-bold text-[#1c1c1e]">Workspaces</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c7c7cc]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 rounded-[10px] bg-[#f2f2f7] text-sm text-[#1c1c1e] placeholder:text-[#c7c7cc] outline-none w-48"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f2f2f7]">
                    {["Business", "Plan", "Score", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-[#8e8e93] px-5 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkspaces.map((ws, i) => (
                    <motion.tr
                      key={ws.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-[#f2f2f7] last:border-0 hover:bg-[#f2f2f7]/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-bold text-[#1c1c1e]">{ws.name}</p>
                        <p className="text-xs text-[#8e8e93]">{ws.owner}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor: `${planColors[ws.plan as keyof typeof planColors]}18`,
                            color: planColors[ws.plan as keyof typeof planColors],
                          }}>
                          {ws.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-sm font-bold",
                            ws.healthScore >= 80 ? "text-[#34C759]" :
                            ws.healthScore >= 60 ? "text-[#FF9500]" : "text-[#FF3B30]"
                          )}>
                            {ws.healthScore}
                          </span>
                          <div className="h-1.5 w-16 bg-[#e5e5ea] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${ws.healthScore}%`,
                                backgroundColor: ws.healthScore >= 80 ? "#34C759" :
                                  ws.healthScore >= 60 ? "#FF9500" : "#FF3B30",
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full",
                          ws.status === "active" ? "bg-[#34C759]/10 text-[#34C759]" : "bg-[#FF9500]/10 text-[#FF9500]"
                        )}>
                          {ws.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-[8px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#007AFF] hover:bg-[#007AFF]/10 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setImpersonating(ws.owner)}
                            className="p-1.5 rounded-[8px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#FF9500] hover:bg-[#FF9500]/10 transition-colors"
                            title="Impersonate"
                          >
                            <LogIn className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Activity */}
          <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2 w-2 rounded-full bg-[#34C759] animate-pulse" />
              <h2 className="text-lg font-bold text-[#1c1c1e]">Live Activity</h2>
            </div>
            <div className="space-y-3">
              {mockActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-[13px] bg-[#f2f2f7]">
                  <Activity className="h-4 w-4 text-[#8e8e93] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#007AFF] truncate">{item.user}</p>
                    <p className="text-sm text-[#1c1c1e]">{item.action}</p>
                  </div>
                  <span className="text-xs text-[#8e8e93] shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts & System Status */}
        <div className="space-y-4">
          <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
            <h2 className="text-lg font-bold text-[#1c1c1e] mb-4">System Alerts</h2>
            <div className="space-y-3">
              {mockAlerts.map((alert, i) => {
                const config = severityConfig[alert.severity as keyof typeof severityConfig];
                const Icon = config.Icon;
                return (
                  <div key={i} className={cn("p-3 rounded-[13px]", config.bg)}>
                    <div className="flex items-start gap-2">
                      <Icon className={cn("h-4 w-4 shrink-0 mt-0.5", config.color)} />
                      <div className="flex-1">
                        <p className={cn("text-xs font-semibold leading-snug", config.color)}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-[#8e8e93] mt-0.5">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
            <h2 className="text-base font-bold text-[#1c1c1e] mb-3">API Status</h2>
            <div className="space-y-3">
              {[
                { name: "Google Business API", status: "operational", latency: "124ms" },
                { name: "Twilio SMS", status: "operational", latency: "89ms" },
                { name: "OpenAI API", status: "degraded", latency: "2.1s" },
                { name: "DataForSEO", status: "operational", latency: "342ms" },
                { name: "Stripe", status: "operational", latency: "201ms" },
                { name: "Neon DB", status: "operational", latency: "23ms" },
              ].map((api) => (
                <div key={api.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      api.status === "operational" ? "bg-[#34C759]" :
                      api.status === "degraded" ? "bg-[#FF9500]" : "bg-[#FF3B30]"
                    )} />
                    <span className="text-xs font-medium text-[#1c1c1e]">{api.name}</span>
                  </div>
                  <span className="text-xs text-[#8e8e93] font-mono">{api.latency}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Impersonation banner */}
      {impersonating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-[16px] bg-[#FF9500] shadow-[0_4px_24px_rgba(255,149,0,0.4)] flex items-center gap-3"
        >
          <LogIn className="h-5 w-5 text-white" />
          <span className="text-sm font-bold text-white">
            Impersonating: {impersonating}
          </span>
          <button
            onClick={() => setImpersonating(null)}
            className="ml-2 text-white/80 hover:text-white font-bold"
          >
            Stop ×
          </button>
        </motion.div>
      )}
    </div>
  );
}
