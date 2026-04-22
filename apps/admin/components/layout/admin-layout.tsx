"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Cpu,
  MessageSquare,
  Shield,
  Settings,
  LogOut,
  Zap,
  Bell,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

const navItems = [
  { href: "/admin/dashboard", label: "Command Center", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users & Workspaces", icon: Users },
  { href: "/admin/billing", label: "Billing & Plans", icon: CreditCard },
  { href: "/admin/api-hub", label: "API & Infrastructure", icon: Cpu },
  { href: "/admin/prompts", label: "Prompt Manager", icon: MessageSquare },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="flex h-screen bg-[#1c1c1e] overflow-hidden">
      {/* Dark sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#2c2c2e] flex flex-col transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-[#3a3a3c]">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-[10px] bg-[#FF3B30] flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">Admin</p>
              <p className="text-[10px] text-[#8e8e93]">Super Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#8e8e93] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[11px] transition-all",
                  isActive
                    ? "bg-[#FF3B30] text-white"
                    : "text-[#8e8e93] hover:bg-[#3a3a3c] hover:text-white"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-3 border-t border-[#3a3a3c]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-[#FF3B30] flex items-center justify-center text-white text-xs font-bold shrink-0">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {user?.firstName || "Super Admin"}
              </p>
              <p className="text-[10px] text-[#8e8e93]">Super Admin</p>
            </div>
            <button
              onClick={() => signOut()}
              className="text-[#8e8e93] hover:text-[#FF3B30] transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Admin topbar */}
        <header className="h-16 flex items-center gap-4 px-5 bg-[#2c2c2e] border-b border-[#3a3a3c]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#8e8e93] hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#FF3B30]" />
            <span className="text-sm font-bold text-white">Admin Command Center</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-[#FF3B30]/20 border border-[#FF3B30]/40">
              <span className="text-xs font-bold text-[#FF3B30]">ADMIN ACCESS</span>
            </div>
            <button className="relative p-2 rounded-full bg-[#3a3a3c] text-[#8e8e93] hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-[#FF3B30] flex items-center justify-center">
                <span className="text-[8px] text-white font-bold">5</span>
              </span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#f2f2f7]">
          <div className="p-5 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
