"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Star,
  Map,
  Building2,
  Link2,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Command Center",
  },
  {
    href: "/reviews",
    label: "Reviews",
    icon: Star,
    description: "Review Engine",
  },
  {
    href: "/grid",
    label: "Rank Grid",
    icon: Map,
    description: "Local Grid Tracker",
  },
  {
    href: "/gbp",
    label: "GBP Autopilot",
    icon: Building2,
    description: "Google Business",
  },
  {
    href: "/citations",
    label: "Citations",
    icon: Link2,
    description: "NAP Hub",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    description: "Profile & Billing",
  },
];

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ isMobileOpen = false, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 240 }}
        transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
        className={cn(
          "hidden lg:flex flex-col h-screen sticky top-0 bg-white border-r border-[#e5e5ea] overflow-hidden z-30"
        )}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          pathname={pathname}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.16)] lg:hidden"
          >
            <SidebarContent
              isCollapsed={false}
              pathname={pathname}
              onMobileClose={onMobileClose}
              isMobile
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

interface SidebarContentProps {
  isCollapsed: boolean;
  pathname: string;
  onToggleCollapse?: () => void;
  onMobileClose?: () => void;
  isMobile?: boolean;
}

function SidebarContent({
  isCollapsed,
  pathname,
  onToggleCollapse,
  onMobileClose,
  isMobile,
}: SidebarContentProps) {
  return (
    <>
      {/* Logo */}
      <div className={cn("flex items-center h-16 px-4", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-[10px] bg-[#007AFF] flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-[#1c1c1e]">LocalSEO</span>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="h-8 w-8 rounded-[10px] bg-[#007AFF] flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
        )}
        {isMobile ? (
          <button
            onClick={onMobileClose}
            className="p-1.5 rounded-full bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1c1c1e] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          !isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-full bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1c1c1e] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )
        )}
      </div>

      {/* Collapsed expand button */}
      {isCollapsed && !isMobile && (
        <button
          onClick={onToggleCollapse}
          className="mx-auto mb-2 p-1.5 rounded-full bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1c1c1e] transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onMobileClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[13px] transition-all duration-150 group",
                isActive
                  ? "bg-[#007AFF] text-white shadow-[0_2px_8px_rgba(0,122,255,0.3)]"
                  : "text-[#8e8e93] hover:bg-[#f2f2f7] hover:text-[#1c1c1e]"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-white" : "")} />
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col min-w-0"
                >
                  <span className={cn("text-sm font-semibold leading-tight", isActive ? "text-white" : "text-[#1c1c1e]")}>
                    {item.label}
                  </span>
                  <span className={cn("text-xs leading-tight", isActive ? "text-white/70" : "text-[#8e8e93]")}>
                    {item.description}
                  </span>
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom info */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 mx-3 mb-4 rounded-[16px] bg-gradient-to-br from-[#007AFF]/10 to-[#5856D6]/10 border border-[#007AFF]/20"
        >
          <p className="text-xs font-semibold text-[#007AFF]">Texas Local SEO</p>
          <p className="text-xs text-[#8e8e93] mt-0.5">AI-powered co-pilot</p>
        </motion.div>
      )}
    </>
  );
}
