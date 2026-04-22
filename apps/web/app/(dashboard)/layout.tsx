import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
