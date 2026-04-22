"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  CreditCard,
  Plug,
  Camera,
  Lock,
  Bell,
  Shield,
  ChevronRight,
  Check,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 97,
    features: [
      "Up to 50 review requests/mo",
      "Google Business Management",
      "5×5 Rank Grid",
      "Citation scan (monthly)",
      "AI reply generation",
    ],
    color: "#007AFF",
  },
  {
    id: "professional",
    name: "Professional",
    price: 197,
    popular: true,
    features: [
      "Unlimited review requests",
      "Full GBP Autopilot",
      "7×7 Rank Grid + Alerts",
      "Weekly citation scans",
      "AI post generation",
      "Priority support",
    ],
    color: "#AF52DE",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 397,
    features: [
      "Everything in Professional",
      "Multiple locations",
      "White-label reports",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    color: "#FF9500",
  },
];

const integrations = [
  {
    name: "Google Business Profile",
    description: "Manage your GBP, posts, and reviews",
    icon: "G",
    color: "#4285F4",
    connected: true,
  },
  {
    name: "Twilio SMS",
    description: "Send review request SMS to customers",
    icon: "T",
    color: "#F22F46",
    connected: true,
  },
  {
    name: "Stripe",
    description: "Billing and subscription management",
    icon: "S",
    color: "#635BFF",
    connected: true,
  },
  {
    name: "OpenAI",
    description: "AI reply and content generation",
    icon: "AI",
    color: "#10A37F",
    connected: true,
  },
  {
    name: "DataForSEO",
    description: "Local ranking data and competitor tracking",
    icon: "D",
    color: "#FF6B2C",
    connected: false,
  },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newReview: true,
    negativeReview: true,
    rankDrop: true,
    citationIssue: false,
    weeklyReport: true,
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="profile">
            <User className="h-4 w-4" />
            My Profile
          </TabsTrigger>
          <TabsTrigger value="business">
            <Building2 className="h-4 w-4" />
            My Business
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Plug className="h-4 w-4" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button size="sm" variant="secondary">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-[#8e8e93] mt-1.5">
                      JPG or PNG, max 2MB
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="John" />
                  <Input label="Last Name" defaultValue="Doe" />
                </div>
                <Input label="Email Address" type="email" defaultValue="john@austinhvac.com" />
                <Input label="Phone Number" type="tel" defaultValue="(512) 555-0100" />
                <Button className="mt-2">Save Changes</Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-[#007AFF]" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "newReview", label: "New Review", desc: "When you get a Google review" },
                    { key: "negativeReview", label: "Negative Review", desc: "Critical alerts" },
                    { key: "rankDrop", label: "Rank Drop", desc: "Position changes" },
                    { key: "citationIssue", label: "Citation Issues", desc: "NAP inconsistencies" },
                    { key: "weeklyReport", label: "Weekly Report", desc: "Performance summary" },
                  ].map((item) => (
                    <ToggleSwitch
                      key={item.key}
                      label={item.label}
                      description={item.desc}
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(v) =>
                        setNotifications((prev) => ({ ...prev, [item.key]: v }))
                      }
                    />
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-[13px] bg-[#FF3B30]/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-[#FF3B30]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1c1c1e]">Security</p>
                      <p className="text-xs text-[#8e8e93]">2FA & Password</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" size="sm">
                    <Lock className="h-4 w-4" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Business Name" defaultValue="Austin HVAC & Cooling LLC" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Phone Number" type="tel" defaultValue="(512) 555-0100" />
                <Input label="Website" type="url" defaultValue="www.austinhvacandcooling.com" />
              </div>
              <Input label="Street Address" defaultValue="3201 Bee Cave Rd" />
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Input label="City" defaultValue="Austin" />
                </div>
                <Input label="ZIP" defaultValue="78746" />
              </div>
              <Input label="Primary Business Category" defaultValue="HVAC Contractor" />
              <div>
                <label className="text-sm font-semibold text-[#1c1c1e] mb-1.5 block">
                  Business Description
                </label>
                <textarea
                  className="w-full min-h-[100px] rounded-[13px] border border-[#e5e5ea] bg-white px-4 py-3 text-sm text-[#1c1c1e] placeholder:text-[#c7c7cc] resize-none focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent"
                  defaultValue="Austin's premier HVAC service company. We provide fast, reliable heating and cooling solutions for homes and businesses across the Austin metro area."
                />
              </div>
              <Button>Save Business Info</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="space-y-6">
            {/* Current plan */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-[16px] bg-[#AF52DE]/10 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-[#AF52DE]" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#8e8e93]">Current Plan</p>
                      <p className="text-xl font-bold text-[#1c1c1e]">Professional</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#1c1c1e]">$197</p>
                    <p className="text-xs text-[#8e8e93]">per month</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 p-3 rounded-[13px] bg-[#f2f2f7] text-center">
                    <p className="text-sm font-bold text-[#1c1c1e]">Next Billing</p>
                    <p className="text-xs text-[#8e8e93]">Aug 1, 2025</p>
                  </div>
                  <div className="flex-1 p-3 rounded-[13px] bg-[#f2f2f7] text-center">
                    <p className="text-sm font-bold text-[#1c1c1e]">Payment</p>
                    <p className="text-xs text-[#8e8e93]">Visa •••• 4242</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plans */}
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={cn(
                    "relative overflow-hidden",
                    plan.popular && "ring-2 ring-[#AF52DE]"
                  )}>
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold text-white"
                        style={{ backgroundColor: plan.color }}>
                        Most Popular
                      </div>
                    )}
                    <CardContent className={cn("p-5", plan.popular && "pt-9")}>
                      <p className="text-sm font-bold" style={{ color: plan.color }}>
                        {plan.name}
                      </p>
                      <div className="flex items-end gap-1 mt-1 mb-4">
                        <span className="text-3xl font-bold text-[#1c1c1e]">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-[#8e8e93] mb-1">/mo</span>
                      </div>
                      <div className="space-y-2 mb-5">
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-start gap-2">
                            <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: plan.color }} />
                            <span className="text-xs text-[#3c3c3e]">{f}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full"
                        variant={plan.id === "professional" ? "default" : "outline"}
                      >
                        {plan.id === "professional" ? "Current Plan" : "Switch Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <div className="space-y-4">
            {integrations.map((integration, i) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-12 w-12 rounded-[16px] flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: integration.color }}
                      >
                        {integration.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1c1c1e]">
                          {integration.name}
                        </p>
                        <p className="text-xs text-[#8e8e93] mt-0.5">
                          {integration.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {integration.connected ? (
                          <Badge variant="success">Connected</Badge>
                        ) : (
                          <Badge variant="secondary">Not Connected</Badge>
                        )}
                        <Button size="sm" variant={integration.connected ? "outline" : "default"}>
                          {integration.connected ? "Configure" : "Connect"}
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
