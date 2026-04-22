"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Search,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from "@/components/ui/modal";
import { cn } from "@/lib/utils";

const mockCitations = [
  {
    id: "1",
    directory: "Google Business Profile",
    logo: "G",
    color: "#4285F4",
    status: "correct",
    foundName: "Austin HVAC & Cooling LLC",
    foundPhone: "(512) 555-0100",
    foundAddress: "3201 Bee Cave Rd, Austin TX 78746",
    listingUrl: "https://maps.google.com",
  },
  {
    id: "2",
    directory: "Yelp",
    logo: "Y",
    color: "#FF1A1A",
    status: "incorrect",
    foundName: "Austin HVAC and Cooling",
    foundPhone: "(512) 555-0100",
    foundAddress: "3201 Bee Cave Rd, Austin TX 78746",
    hasNameError: true,
    listingUrl: "https://yelp.com",
  },
  {
    id: "3",
    directory: "Better Business Bureau",
    logo: "B",
    color: "#003087",
    status: "incorrect",
    foundName: "Austin HVAC & Cooling LLC",
    foundPhone: "(512) 555-0199",
    foundAddress: "3201 Bee Cave Rd, Austin TX 78746",
    hasPhoneError: true,
    listingUrl: "https://bbb.org",
  },
  {
    id: "4",
    directory: "Yellow Pages",
    logo: "YP",
    color: "#D4A017",
    status: "correct",
    foundName: "Austin HVAC & Cooling LLC",
    foundPhone: "(512) 555-0100",
    foundAddress: "3201 Bee Cave Rd, Austin TX 78746",
    listingUrl: "https://yellowpages.com",
  },
  {
    id: "5",
    directory: "Angi (Angie's List)",
    logo: "A",
    color: "#FF6B2C",
    status: "missing",
    foundName: null,
    foundPhone: null,
    foundAddress: null,
    listingUrl: null,
  },
  {
    id: "6",
    directory: "HomeAdvisor",
    logo: "H",
    color: "#F18B2C",
    status: "missing",
    foundName: null,
    foundPhone: null,
    foundAddress: null,
    listingUrl: null,
  },
  {
    id: "7",
    directory: "Bing Places",
    logo: "Bi",
    color: "#0078D4",
    status: "correct",
    foundName: "Austin HVAC & Cooling LLC",
    foundPhone: "(512) 555-0100",
    foundAddress: "3201 Bee Cave Rd, Austin TX 78746",
    listingUrl: "https://bingplaces.com",
  },
  {
    id: "8",
    directory: "Apple Maps",
    logo: "Ap",
    color: "#1c1c1e",
    status: "incorrect",
    foundName: "Austin HVAC & Cooling LLC",
    foundPhone: "(512) 555-0100",
    foundAddress: "3201 Bee Cave, Austin TX 78746",
    hasAddressError: true,
    listingUrl: null,
  },
  {
    id: "9",
    directory: "Foursquare",
    logo: "F",
    color: "#F94877",
    status: "correct",
    foundName: "Austin HVAC & Cooling LLC",
    foundPhone: "(512) 555-0100",
    foundAddress: "3201 Bee Cave Rd, Austin TX 78746",
    listingUrl: "https://foursquare.com",
  },
  {
    id: "10",
    directory: "Facebook Business",
    logo: "Fb",
    color: "#1877F2",
    status: "correct",
    foundName: "Austin HVAC & Cooling LLC",
    foundPhone: "(512) 555-0100",
    foundAddress: "3201 Bee Cave Rd, Austin TX 78746",
    listingUrl: "https://facebook.com",
  },
];

const statusConfig = {
  correct: {
    label: "Correct",
    icon: CheckCircle2,
    color: "text-[#34C759]",
    bg: "bg-[#34C759]/10",
    rowBg: "",
  },
  incorrect: {
    label: "Incorrect",
    icon: XCircle,
    color: "text-[#FF3B30]",
    bg: "bg-[#FF3B30]/10",
    rowBg: "bg-[#FF3B30]/5 border-l-4 border-l-[#FF3B30]",
  },
  missing: {
    label: "Missing",
    icon: AlertCircle,
    color: "text-[#FF9500]",
    bg: "bg-[#FF9500]/10",
    rowBg: "bg-[#FF9500]/5 border-l-4 border-l-[#FF9500]",
  },
  pending: {
    label: "Pending",
    icon: Search,
    color: "text-[#8e8e93]",
    bg: "bg-[#f2f2f7]",
    rowBg: "",
  },
};

export default function CitationsPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);
  const [fixModal, setFixModal] = useState<(typeof mockCitations)[0] | null>(null);

  const correctCount = mockCitations.filter((c) => c.status === "correct").length;
  const incorrectCount = mockCitations.filter((c) => c.status === "incorrect").length;
  const missingCount = mockCitations.filter((c) => c.status === "missing").length;
  const totalCount = mockCitations.length;
  const score = Math.round((correctCount / totalCount) * 100);

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise((r) => setTimeout(r, 3000));
    setIsScanning(false);
    setHasScanned(true);
  };

  return (
    <div className="space-y-6">
      {/* Hero scan section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-white to-[#f2f2f7]">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-5">
                <div className="relative h-24 w-24 shrink-0">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e5ea" strokeWidth="10" />
                    <circle
                      cx="60" cy="60" r="50" fill="none"
                      stroke={score >= 80 ? "#34C759" : score >= 60 ? "#FF9500" : "#FF3B30"}
                      strokeWidth="10" strokeLinecap="round"
                      strokeDasharray={`${(score / 100) * 314} 314`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-[#1c1c1e]">{score}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8e8e93] uppercase tracking-wide">NAP Consistency</p>
                  <p className="text-xl font-bold text-[#1c1c1e] mt-0.5">
                    {correctCount}/{totalCount} directories correct
                  </p>
                  <p className="text-sm text-[#8e8e93] mt-1">
                    {incorrectCount + missingCount} issues need attention
                  </p>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-[13px] bg-[#34C759]/10">
                  <p className="text-2xl font-bold text-[#34C759]">{correctCount}</p>
                  <p className="text-xs text-[#8e8e93] font-medium">Correct</p>
                </div>
                <div className="text-center p-3 rounded-[13px] bg-[#FF3B30]/10">
                  <p className="text-2xl font-bold text-[#FF3B30]">{incorrectCount}</p>
                  <p className="text-xs text-[#8e8e93] font-medium">Incorrect</p>
                </div>
                <div className="text-center p-3 rounded-[13px] bg-[#FF9500]/10">
                  <p className="text-2xl font-bold text-[#FF9500]">{missingCount}</p>
                  <p className="text-xs text-[#8e8e93] font-medium">Missing</p>
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleScan}
                loading={isScanning}
                className="shrink-0"
              >
                <Globe className={cn("h-5 w-5", isScanning && "animate-spin")} />
                {isScanning ? "Scanning Internet..." : "Scan the Entire Internet"}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Citations table */}
      {hasScanned && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Directory Listings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f2f2f7]">
                      <th className="text-left text-xs font-semibold text-[#8e8e93] px-6 py-3">
                        Directory
                      </th>
                      <th className="text-left text-xs font-semibold text-[#8e8e93] px-4 py-3 hidden md:table-cell">
                        Found Info
                      </th>
                      <th className="text-left text-xs font-semibold text-[#8e8e93] px-4 py-3">
                        Status
                      </th>
                      <th className="text-right text-xs font-semibold text-[#8e8e93] px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockCitations.map((citation, i) => {
                      const status = statusConfig[citation.status as keyof typeof statusConfig];
                      const StatusIcon = status.icon;
                      return (
                        <motion.tr
                          key={citation.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.03 }}
                          className={cn(
                            "border-b border-[#f2f2f7] last:border-0",
                            status.rowBg
                          )}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="h-9 w-9 rounded-[10px] flex items-center justify-center text-white text-xs font-bold shrink-0"
                                style={{ backgroundColor: citation.color }}
                              >
                                {citation.logo}
                              </div>
                              <span className="text-sm font-semibold text-[#1c1c1e]">
                                {citation.directory}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            {citation.foundName ? (
                              <div className="space-y-0.5">
                                <p className={cn("text-xs", citation.hasNameError ? "text-[#FF3B30] font-semibold" : "text-[#8e8e93]")}>
                                  {citation.foundName}
                                </p>
                                <p className={cn("text-xs", citation.hasPhoneError ? "text-[#FF3B30] font-semibold" : "text-[#8e8e93]")}>
                                  {citation.foundPhone}
                                </p>
                                <p className={cn("text-xs", citation.hasAddressError ? "text-[#FF3B30] font-semibold" : "text-[#8e8e93]")}>
                                  {citation.foundAddress}
                                </p>
                              </div>
                            ) : (
                              <span className="text-xs text-[#c7c7cc]">Not found</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold", status.bg, status.color)}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {status.label}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {citation.status === "correct" ? (
                              citation.listingUrl && (
                                <a
                                  href={citation.listingUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-[#007AFF] font-medium hover:underline"
                                >
                                  View
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )
                            ) : (
                              <Button
                                size="sm"
                                variant={citation.status === "missing" ? "default" : "destructive"}
                                className="text-xs h-8"
                                onClick={() => setFixModal(citation)}
                              >
                                <Wrench className="h-3.5 w-3.5" />
                                {citation.status === "missing" ? "Add Listing" : "Fix Now"}
                              </Button>
                            )}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {!hasScanned && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-20 w-20 rounded-full bg-[#007AFF]/10 flex items-center justify-center mb-4">
            <Globe className="h-10 w-10 text-[#007AFF]" />
          </div>
          <h3 className="text-xl font-bold text-[#1c1c1e]">No Scan Yet</h3>
          <p className="text-[#8e8e93] mt-2 max-w-md">
            Click &ldquo;Scan the Entire Internet&rdquo; above to check how your business
            appears across all major directories.
          </p>
        </div>
      )}

      {/* Fix Modal */}
      <Modal open={!!fixModal} onOpenChange={() => setFixModal(null)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {fixModal?.status === "missing"
                ? `Add to ${fixModal?.directory}`
                : `Fix ${fixModal?.directory} Listing`}
            </ModalTitle>
            <ModalDescription>
              {fixModal?.status === "missing"
                ? "Your business is not listed on this directory. Add it to improve your local SEO."
                : "We found incorrect information. Review and submit the correct data."}
            </ModalDescription>
          </ModalHeader>
          <div className="px-6 py-4 space-y-3">
            <div className="p-4 rounded-[16px] bg-[#f2f2f7] space-y-2">
              <p className="text-xs font-bold text-[#8e8e93]">CORRECT INFO (NAP Locked)</p>
              <p className="text-sm text-[#1c1c1e] font-semibold">Austin HVAC & Cooling LLC</p>
              <p className="text-sm text-[#8e8e93]">(512) 555-0100</p>
              <p className="text-sm text-[#8e8e93]">3201 Bee Cave Rd, Austin TX 78746</p>
            </div>
            {fixModal?.status === "incorrect" && fixModal.foundName && (
              <div className="p-4 rounded-[16px] bg-[#FF3B30]/5 border border-[#FF3B30]/20 space-y-2">
                <p className="text-xs font-bold text-[#FF3B30]">FOUND (INCORRECT)</p>
                <p className={cn("text-sm", fixModal.hasNameError ? "text-[#FF3B30] font-semibold" : "text-[#8e8e93]")}>
                  {fixModal.foundName}
                </p>
                <p className={cn("text-sm", fixModal.hasPhoneError ? "text-[#FF3B30] font-semibold" : "text-[#8e8e93]")}>
                  {fixModal.foundPhone}
                </p>
                <p className={cn("text-sm", fixModal.hasAddressError ? "text-[#FF3B30] font-semibold" : "text-[#8e8e93]")}>
                  {fixModal.foundAddress}
                </p>
              </div>
            )}
          </div>
          <ModalFooter>
            <Button className="w-full" onClick={() => setFixModal(null)}>
              <Wrench className="h-5 w-5" />
              Submit Correction
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setFixModal(null)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
