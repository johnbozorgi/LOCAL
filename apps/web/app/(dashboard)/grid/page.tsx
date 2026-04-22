"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Search,
  Star,
  Building2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const mockGridData = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  row: Math.floor(i / 5),
  col: i % 5,
  rank: [
    1, 2, 4, 3, 5,
    2, 1, 3, 6, 8,
    4, 3, 2, 1, 5,
    7, 5, 4, 3, 9,
    12, 8, 6, 5, 11,
  ][i],
  neighborhood: [
    "Domain", "North Loop", "Hyde Park", "Mueller", "Manor",
    "Allandale", "Rosedale", "North Austin", "Pflugerville", "Round Rock",
    "Crestview", "North Shoal", "Central Austin", "East Austin", "Elgin",
    "Tarrytown", "Clarksville", "Downtown", "South Congress", "Manchaca",
    "Westlake", "Barton Hills", "South Austin", "Slaughter Ln", "Buda",
  ][i],
}));

const mockCompetitors = [
  {
    id: "1",
    name: "Austin HVAC Pros",
    rating: 4.7,
    reviews: 312,
    rank: 1,
    change: -1,
    address: "5001 N Lamar Blvd, Austin TX",
  },
  {
    id: "2",
    name: "Capital City Climate",
    rating: 4.5,
    reviews: 189,
    rank: 2,
    change: 0,
    address: "2200 W Anderson Ln, Austin TX",
  },
  {
    id: "3",
    name: "Cool Comfort Texas",
    rating: 4.3,
    reviews: 97,
    rank: 4,
    change: 2,
    address: "7800 Shoal Creek Blvd, Austin TX",
  },
];

function getRankBg(rank: number): string {
  if (rank <= 3) return "bg-[#34C759]";
  if (rank <= 7) return "bg-[#FF9500]";
  return "bg-[#FF3B30]";
}

export default function GridPage() {
  const [keyword, setKeyword] = useState("HVAC repair Austin TX");
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const handleScan = async () => {
    setIsScanning(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsScanning(false);
  };

  const avgRank =
    mockGridData.reduce((sum, cell) => sum + cell.rank, 0) / mockGridData.length;
  const top3Count = mockGridData.filter((c) => c.rank <= 3).length;

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="Enter keyword to track (e.g. 'plumber near me')"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                prefix={<Search className="h-4 w-4" />}
              />
            </div>
            <Button
              onClick={handleScan}
              loading={isScanning}
              className="shrink-0"
            >
              <RefreshCw className={cn("h-4 w-4", isScanning && "animate-spin")} />
              {isScanning ? "Scanning..." : "Update Grid"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Rank Grid Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Local Rank Grid</CardTitle>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#34C759]" />
                    Top 3
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#FF9500]" />
                    Top 7
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#FF3B30]" />
                    8+
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#8e8e93] mt-1">
                &ldquo;{keyword}&rdquo; · 5×5 grid · Austin, TX area
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {mockGridData.map((cell) => (
                  <motion.button
                    key={cell.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setSelectedCell(
                        selectedCell === cell.id ? null : cell.id
                      )
                    }
                    className={cn(
                      "relative aspect-square rounded-[13px] flex flex-col items-center justify-center gap-0.5 transition-all",
                      getRankBg(cell.rank),
                      selectedCell === cell.id
                        ? "ring-4 ring-white ring-offset-2 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                        : "opacity-90 hover:opacity-100"
                    )}
                  >
                    <MapPin className="h-3 w-3 text-white" />
                    <span className="text-white font-bold text-sm leading-none">
                      #{cell.rank}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Selected cell info */}
              {selectedCell !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-[13px] bg-[#f2f2f7]"
                >
                  {(() => {
                    const cell = mockGridData[selectedCell];
                    return (
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-[10px] flex items-center justify-center",
                            getRankBg(cell.rank)
                          )}
                        >
                          <span className="text-white font-bold text-sm">
                            #{cell.rank}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1c1c1e]">
                            {cell.neighborhood}
                          </p>
                          <p className="text-xs text-[#8e8e93]">
                            {cell.rank <= 3
                              ? "Top 3 – Great visibility!"
                              : cell.rank <= 7
                              ? "Top 7 – Good position"
                              : "Below top 7 – Needs improvement"}
                          </p>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}

              {/* Grid stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-3 rounded-[13px] bg-[#34C759]/10">
                  <p className="text-xl font-bold text-[#34C759]">{top3Count}</p>
                  <p className="text-xs text-[#8e8e93] font-medium">Top 3 Spots</p>
                </div>
                <div className="text-center p-3 rounded-[13px] bg-[#007AFF]/10">
                  <p className="text-xl font-bold text-[#007AFF]">
                    #{Math.round(avgRank)}
                  </p>
                  <p className="text-xs text-[#8e8e93] font-medium">Avg. Rank</p>
                </div>
                <div className="text-center p-3 rounded-[13px] bg-[#FF3B30]/10">
                  <p className="text-xl font-bold text-[#FF3B30]">
                    {mockGridData.filter((c) => c.rank > 7).length}
                  </p>
                  <p className="text-xs text-[#8e8e93] font-medium">Need Work</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Competitors */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[#FF9500]" />
                Top Competitors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockCompetitors.map((comp, i) => (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-3 rounded-[13px] bg-[#f2f2f7] space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#1c1c1e] leading-tight">
                        {comp.name}
                      </p>
                      <p className="text-xs text-[#8e8e93] mt-0.5 truncate">
                        {comp.address}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "h-8 w-8 rounded-[8px] flex items-center justify-center shrink-0 text-white text-sm font-bold",
                        getRankBg(comp.rank)
                      )}
                    >
                      #{comp.rank}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-[#FFCC00] fill-[#FFCC00]" />
                      <span className="text-xs font-bold text-[#1c1c1e]">
                        {comp.rating}
                      </span>
                    </div>
                    <span className="text-xs text-[#8e8e93]">
                      {comp.reviews} reviews
                    </span>
                    <div className="ml-auto flex items-center gap-1">
                      {comp.change < 0 ? (
                        <>
                          <TrendingDown className="h-3.5 w-3.5 text-[#FF3B30]" />
                          <span className="text-xs text-[#FF3B30] font-medium">
                            {comp.change}
                          </span>
                        </>
                      ) : comp.change > 0 ? (
                        <>
                          <TrendingUp className="h-3.5 w-3.5 text-[#34C759]" />
                          <span className="text-xs text-[#34C759] font-medium">
                            +{comp.change}
                          </span>
                        </>
                      ) : (
                        <Minus className="h-3.5 w-3.5 text-[#8e8e93]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-[13px] bg-[#007AFF]/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-[#007AFF]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1c1c1e]">Your Business</p>
                  <p className="text-xs text-[#8e8e93]">Austin HVAC & Cooling</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-[#8e8e93]">Average Rank</span>
                  <span className="text-xs font-bold text-[#FF9500]">#{Math.round(avgRank)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#8e8e93]">Top 3 Coverage</span>
                  <span className="text-xs font-bold text-[#34C759]">{top3Count}/25 areas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#8e8e93]">Google Reviews</span>
                  <span className="text-xs font-bold text-[#1c1c1e]">47 (4.8★)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
