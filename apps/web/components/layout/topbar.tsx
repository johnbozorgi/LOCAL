"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Menu, Settings, LogOut, User } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/reviews": "Review Engine",
  "/grid": "Local Grid Tracker",
  "/gbp": "GBP Autopilot",
  "/citations": "Citation Hub",
  "/settings": "Settings",
  "/settings/profile": "Profile",
  "/settings/business": "My Business",
  "/settings/billing": "Billing",
  "/settings/integrations": "Integrations",
};

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 2) return null;

  const crumbs = [];
  let path = "";
  for (const segment of segments) {
    path += `/${segment}`;
    const label = routeLabels[path];
    if (label) {
      crumbs.push({ path, label });
    } else {
      crumbs.push({
        path,
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
      });
    }
  }
  return crumbs;
}

interface TopBarProps {
  onMobileMenuToggle: () => void;
  notificationCount?: number;
}

export function TopBar({ onMobileMenuToggle, notificationCount = 3 }: TopBarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const breadcrumbs = getBreadcrumbs(pathname);
  const pageTitle = routeLabels[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 bg-white/80 backdrop-blur-[20px] border-b border-[#e5e5ea]/80 px-4 lg:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 rounded-[10px] text-[#8e8e93] hover:bg-[#f2f2f7] hover:text-[#1c1c1e] transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title / Breadcrumbs */}
      <div className="flex-1 min-w-0">
        {breadcrumbs ? (
          <nav className="flex items-center gap-1 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={crumb.path}>
                {i > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-[#c7c7cc] shrink-0" />
                )}
                {i < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.path}
                    className="text-[#8e8e93] hover:text-[#007AFF] font-medium transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#1c1c1e] font-semibold truncate">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : (
          <h1 className="text-lg font-bold text-[#1c1c1e] truncate">{pageTitle}</h1>
        )}
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-full bg-[#f2f2f7] text-[#8e8e93] hover:text-[#1c1c1e] transition-colors">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#FF3B30] text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* User menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 p-1.5 rounded-[13px] hover:bg-[#f2f2f7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF]">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} />
                <AvatarFallback className="text-xs">
                  {user?.fullName ? getInitials(user.fullName) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start min-w-0">
                <span className="text-sm font-semibold text-[#1c1c1e] truncate max-w-[120px]">
                  {user?.firstName || "User"}
                </span>
                <span className="text-xs text-[#8e8e93] truncate max-w-[120px]">
                  {user?.primaryEmailAddress?.emailAddress || ""}
                </span>
              </div>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 min-w-[200px] rounded-[16px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#e5e5ea] p-1.5 animate-[fadeIn_0.15s_ease-out]"
            >
              <div className="px-3 py-2 mb-1">
                <p className="text-sm font-semibold text-[#1c1c1e]">
                  {user?.fullName || "User"}
                </p>
                <p className="text-xs text-[#8e8e93] truncate">
                  {user?.primaryEmailAddress?.emailAddress || ""}
                </p>
              </div>
              <DropdownMenu.Separator className="h-px bg-[#f2f2f7] my-1" />
              <DropdownMenu.Item asChild>
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm font-medium text-[#1c1c1e] hover:bg-[#f2f2f7] cursor-pointer transition-colors focus:outline-none focus:bg-[#f2f2f7]"
                >
                  <User className="h-4 w-4 text-[#8e8e93]" />
                  My Profile
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/settings"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm font-medium text-[#1c1c1e] hover:bg-[#f2f2f7] cursor-pointer transition-colors focus:outline-none focus:bg-[#f2f2f7]"
                >
                  <Settings className="h-4 w-4 text-[#8e8e93]" />
                  Settings
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-[#f2f2f7] my-1" />
              <DropdownMenu.Item
                className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm font-medium text-[#FF3B30] hover:bg-[#FF3B30]/10 cursor-pointer transition-colors focus:outline-none focus:bg-[#FF3B30]/10"
                onSelect={() => signOut({ redirectUrl: "/sign-in" })}
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
