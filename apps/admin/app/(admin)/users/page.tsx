"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  LogIn,
  Ban,
  Eye,
  Mail,
  ChevronDown,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockUsers = [
  { id: "1", name: "John Smith", email: "john@austinhvac.com", workspace: "Austin HVAC & Cooling", plan: "Professional", joined: "Jan 12, 2025", lastActive: "2h ago", status: "active", role: "owner" },
  { id: "2", name: "Maria Garcia", email: "maria@texasplumbing.com", workspace: "Texas Plumbing Masters", plan: "Starter", joined: "Feb 3, 2025", lastActive: "1d ago", status: "active", role: "owner" },
  { id: "3", name: "Carlos Rodriguez", email: "carlos@dallascafe.com", workspace: "Dallas Bistro Cafe", plan: "Professional", joined: "Mar 15, 2025", lastActive: "Just now", status: "active", role: "owner" },
  { id: "4", name: "Sarah Johnson", email: "sarah@houstonlaw.com", workspace: "Houston Legal Group", plan: "Enterprise", joined: "Dec 2, 2024", lastActive: "5h ago", status: "active", role: "owner" },
  { id: "5", name: "Bob Williams", email: "bob@sadental.com", workspace: "San Antonio Dental", plan: "Starter", joined: "Apr 1, 2025", lastActive: "3d ago", status: "trial", role: "owner" },
  { id: "6", name: "Lisa Chen", email: "lisa@austinhvac.com", workspace: "Austin HVAC & Cooling", plan: "Professional", joined: "Jan 15, 2025", lastActive: "1h ago", status: "active", role: "member" },
];

const mockAuditLog = [
  { action: "User signed in", user: "john@austinhvac.com", ip: "98.12.34.56", time: "5 min ago" },
  { action: "Review request sent", user: "maria@texasplumbing.com", ip: "74.55.23.11", time: "12 min ago" },
  { action: "GBP post published", user: "carlos@dallascafe.com", ip: "209.67.89.100", time: "23 min ago" },
  { action: "Citation scan started", user: "sarah@houstonlaw.com", ip: "104.32.87.22", time: "1h ago" },
  { action: "Billing plan upgraded", user: "bob@sadental.com", ip: "71.44.12.98", time: "2h ago" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || u.plan.toLowerCase() === planFilter;
    return matchSearch && matchPlan;
  });

  const planColors: Record<string, string> = {
    Starter: "#007AFF",
    Professional: "#AF52DE",
    Enterprise: "#FF9500",
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#c7c7cc]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full pl-9 pr-4 py-2.5 rounded-[13px] border border-[#e5e5ea] bg-white text-sm text-[#1c1c1e] placeholder:text-[#c7c7cc] outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {["all", "starter", "professional", "enterprise"].map((plan) => (
              <button
                key={plan}
                onClick={() => setPlanFilter(plan)}
                className={cn(
                  "px-3 py-2 rounded-[10px] text-xs font-semibold capitalize transition-all",
                  planFilter === plan
                    ? "bg-[#1c1c1e] text-white"
                    : "bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1c1c1e]"
                )}
              >
                {plan === "all" ? "All Plans" : plan}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Users table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="p-5 border-b border-[#f2f2f7]">
              <h2 className="text-lg font-bold text-[#1c1c1e]">
                All Users ({filtered.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f2f2f7]">
                    {["User", "Plan", "Last Active", "Status", "Actions"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-[#8e8e93] px-5 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user, i) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-[#f2f2f7] last:border-0 hover:bg-[#f2f2f7]/50"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#007AFF] flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1c1c1e]">{user.name}</p>
                            <p className="text-xs text-[#8e8e93]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${planColors[user.plan]}18`, color: planColors[user.plan] }}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs text-[#8e8e93]">{user.lastActive}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full",
                          user.status === "active" ? "bg-[#34C759]/10 text-[#34C759]" : "bg-[#FF9500]/10 text-[#FF9500]"
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex gap-1">
                          <button className="p-1.5 rounded-[8px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#007AFF] hover:bg-[#007AFF]/10 transition-colors" title="View">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1.5 rounded-[8px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#FF9500] hover:bg-[#FF9500]/10 transition-colors" title="Impersonate">
                            <LogIn className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1.5 rounded-[8px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#007AFF] hover:bg-[#007AFF]/10 transition-colors" title="Email">
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                          <button className="p-1.5 rounded-[8px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors" title="Suspend">
                            <Ban className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Audit Log */}
        <div>
          <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-[#FF3B30]" />
              <h2 className="text-base font-bold text-[#1c1c1e]">Audit Log</h2>
            </div>
            <div className="space-y-3">
              {mockAuditLog.map((entry, i) => (
                <div key={i} className="p-3 rounded-[13px] bg-[#f2f2f7] space-y-1">
                  <p className="text-xs font-bold text-[#1c1c1e]">{entry.action}</p>
                  <p className="text-xs text-[#007AFF] truncate">{entry.user}</p>
                  <div className="flex justify-between text-xs text-[#8e8e93]">
                    <span className="font-mono">{entry.ip}</span>
                    <span>{entry.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
