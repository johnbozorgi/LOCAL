"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, AlertCircle, CheckCircle2, RefreshCw, Settings, Key } from "lucide-react";
import { cn } from "@/lib/utils";

const apiServices = [
  {
    name: "Google Business Profile API",
    key: "GOOGLE_CLIENT_ID",
    status: "operational",
    latency: "124ms",
    requests24h: "12,847",
    errors24h: "23",
    quota: 75,
    color: "#4285F4",
  },
  {
    name: "Twilio SMS API",
    key: "TWILIO_ACCOUNT_SID",
    status: "operational",
    latency: "89ms",
    requests24h: "3,421",
    errors24h: "8",
    quota: 85,
    color: "#F22F46",
  },
  {
    name: "OpenAI API",
    key: "OPENAI_API_KEY",
    status: "degraded",
    latency: "2,100ms",
    requests24h: "8,934",
    errors24h: "147",
    quota: 62,
    color: "#10A37F",
  },
  {
    name: "DataForSEO API",
    key: "DATAFORSEO_LOGIN",
    status: "operational",
    latency: "342ms",
    requests24h: "1,203",
    errors24h: "5",
    quota: 45,
    color: "#FF6B2C",
  },
  {
    name: "Stripe API",
    key: "STRIPE_SECRET_KEY",
    status: "operational",
    latency: "201ms",
    requests24h: "892",
    errors24h: "2",
    quota: 12,
    color: "#635BFF",
  },
  {
    name: "Neon Database",
    key: "DATABASE_URL",
    status: "operational",
    latency: "23ms",
    requests24h: "84,392",
    errors24h: "0",
    quota: 34,
    color: "#00E5BF",
  },
];

const statusConfig = {
  operational: { label: "Operational", dot: "bg-[#34C759]", text: "text-[#34C759]", bg: "bg-[#34C759]/10" },
  degraded: { label: "Degraded", dot: "bg-[#FF9500]", text: "text-[#FF9500]", bg: "bg-[#FF9500]/10" },
  down: { label: "Down", dot: "bg-[#FF3B30]", text: "text-[#FF3B30]", bg: "bg-[#FF3B30]/10" },
};

export default function ApiHubPage() {
  const [refreshing, setRefreshing] = useState<string | null>(null);

  const handleRefresh = async (name: string) => {
    setRefreshing(name);
    await new Promise(r => setTimeout(r, 1000));
    setRefreshing(null);
  };

  return (
    <div className="space-y-6">
      {/* Overall status */}
      <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#FF9500] animate-pulse" />
            <div>
              <p className="text-sm font-bold text-[#1c1c1e]">System Status: Partially Degraded</p>
              <p className="text-xs text-[#8e8e93]">1 service experiencing issues — OpenAI response times elevated</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-[10px] bg-[#f2f2f7] text-xs font-semibold text-[#8e8e93] hover:text-[#1c1c1e]">
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh All
          </button>
        </div>
      </div>

      {/* API Services */}
      <div className="grid gap-4">
        {apiServices.map((api, i) => {
          const status = statusConfig[api.status as keyof typeof statusConfig];
          return (
            <motion.div
              key={api.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-[16px] flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${api.color}18` }}>
                  <Cpu className="h-6 w-6" style={{ color: api.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <p className="text-sm font-bold text-[#1c1c1e]">{api.name}</p>
                    <span className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full", status.bg, status.text)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <div className="p-2.5 rounded-[10px] bg-[#f2f2f7]">
                      <p className="text-xs text-[#8e8e93]">Latency</p>
                      <p className="text-sm font-bold text-[#1c1c1e] font-mono">{api.latency}</p>
                    </div>
                    <div className="p-2.5 rounded-[10px] bg-[#f2f2f7]">
                      <p className="text-xs text-[#8e8e93]">24h Requests</p>
                      <p className="text-sm font-bold text-[#1c1c1e]">{api.requests24h}</p>
                    </div>
                    <div className="p-2.5 rounded-[10px] bg-[#f2f2f7]">
                      <p className="text-xs text-[#8e8e93]">24h Errors</p>
                      <p className={cn("text-sm font-bold", parseInt(api.errors24h) > 50 ? "text-[#FF3B30]" : "text-[#34C759]")}>
                        {api.errors24h}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-[10px] bg-[#f2f2f7]">
                      <p className="text-xs text-[#8e8e93]">Quota Used</p>
                      <p className={cn(
                        "text-sm font-bold",
                        api.quota >= 80 ? "text-[#FF3B30]" : api.quota >= 60 ? "text-[#FF9500]" : "text-[#34C759]"
                      )}>
                        {api.quota}%
                      </p>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#e5e5ea] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${api.quota}%`,
                        backgroundColor: api.quota >= 80 ? "#FF3B30" : api.quota >= 60 ? "#FF9500" : "#34C759",
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRefresh(api.name)}
                    className="p-2 rounded-[10px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#007AFF] hover:bg-[#007AFF]/10 transition-colors"
                  >
                    <RefreshCw className={cn("h-4 w-4", refreshing === api.name && "animate-spin")} />
                  </button>
                  <button className="p-2 rounded-[10px] bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1c1c1e] transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Environment Variables */}
      <div className="bg-white rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.08)] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5 text-[#FF9500]" />
          <h2 className="text-lg font-bold text-[#1c1c1e]">Environment Variables</h2>
        </div>
        <div className="space-y-2">
          {apiServices.map((api) => (
            <div key={api.key} className="flex items-center gap-3 p-3 rounded-[13px] bg-[#f2f2f7]">
              <code className="text-xs font-mono text-[#007AFF] flex-1">{api.key}</code>
              <span className="text-xs font-mono text-[#8e8e93]">••••••••••••••••</span>
              <button className="text-xs text-[#007AFF] font-semibold hover:underline">Rotate</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
