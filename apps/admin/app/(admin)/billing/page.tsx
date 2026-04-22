"use client";

import React from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const planData = [
  { plan: "Starter", count: 234, mrr: 22698, color: "#007AFF", pct: 60 },
  { plan: "Professional", count: 128, mrr: 25216, color: "#AF52DE", pct: 33 },
  { plan: "Enterprise", count: 27, mrr: 10719, color: "#FF9500", pct: 7 },
];

const recentTransactions = [
  { user: "john@austinhvac.com", amount: 197, plan: "Professional", type: "renewal", time: "2h ago", status: "success" },
  { user: "new_user@example.com", amount: 97, plan: "Starter", type: "new", time: "5h ago", status: "success" },
  { user: "cancelled@example.com", amount: -197, plan: "Professional", type: "refund", time: "1d ago", status: "refunded" },
  { user: "enterprise@bigco.com", amount: 397, plan: "Enterprise", type: "renewal", time: "1d ago", status: "success" },
  { user: "trial@example.com", amount: 97, plan: "Starter", type: "trial_end", time: "2d ago", status: "success" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* MRR overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "MRR", value: "$58,633", change: "+$3,240", positive: true, icon: DollarSign, color: "#34C759" },
          { label: "ARR", value: "$703,596", change: "+$38,880", positive: true, icon: TrendingUp, color: "#007AFF" },
          { label: "Active Subscribers", value: "389", change: "+12", positive: true, icon: Users, color: "#AF52DE" },
          { label: "Churn Rate", value: "2.1%", change: "-0.3%", positive: true, icon: CreditCard, color: "#FF9500" },
        ].map((stat, i) => {
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
                  "flex items-center gap-0.5 text-xs font-bold",
                  stat.positive ? "text-[#34C759]" : "text-[#FF3B30]"
                )}>
                  {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#1c1c1e] mt-3">{stat.value}</p>
              <p className="text-xs text-[#8e8e93] font-medium mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Plan distribution */}
        <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
          <h2 className="text-lg font-bold text-[#1c1c1e] mb-5">Plan Distribution</h2>
          <div className="space-y-4">
            {planData.map((plan) => (
              <div key={plan.plan}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-bold" style={{ color: plan.color }}>{plan.plan}</span>
                  <div className="flex gap-4 text-sm">
                    <span className="text-[#8e8e93]">{plan.count} users</span>
                    <span className="font-bold text-[#1c1c1e]">${plan.mrr.toLocaleString()}/mo</span>
                  </div>
                </div>
                <div className="h-2 bg-[#e5e5ea] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${plan.pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: plan.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-5 border-b border-[#f2f2f7]">
            <h2 className="text-lg font-bold text-[#1c1c1e]">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-[#f2f2f7]">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3.5">
                <div className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center shrink-0",
                  tx.amount > 0 ? "bg-[#34C759]/10" : "bg-[#FF3B30]/10"
                )}>
                  {tx.amount > 0
                    ? <ArrowUpRight className="h-4 w-4 text-[#34C759]" />
                    : <ArrowDownRight className="h-4 w-4 text-[#FF3B30]" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#1c1c1e] truncate">{tx.user}</p>
                  <p className="text-xs text-[#8e8e93]">{tx.plan} · {tx.type}</p>
                </div>
                <div className="text-right">
                  <p className={cn("text-sm font-bold", tx.amount > 0 ? "text-[#34C759]" : "text-[#FF3B30]")}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
                  </p>
                  <p className="text-xs text-[#8e8e93]">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
