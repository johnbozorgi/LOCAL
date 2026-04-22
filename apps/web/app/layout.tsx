import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "LocalSEO Co-Pilot – Texas Local Business Growth",
  description:
    "AI-powered Local SEO co-pilot for Texas brick-and-mortar businesses. Manage reviews, Google Business Profile, local rankings, and citations from one simple dashboard.",
  keywords: "local SEO, Google Business Profile, Texas, reviews, citations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
