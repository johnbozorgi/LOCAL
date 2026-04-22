import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { businessId, workspaceId } = body;

  await inngest.send({
    name: "citations/scan.start",
    data: { businessId, workspaceId },
  });

  return NextResponse.json({
    success: true,
    message: "Citation scan started. Results will be ready in a few minutes.",
  });
}
