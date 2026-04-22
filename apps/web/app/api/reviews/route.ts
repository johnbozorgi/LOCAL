import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/lib/inngest";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { customerName, customerPhone, businessId, workspaceId } = body;

  if (!customerName || !customerPhone || !businessId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Trigger the Inngest function
  await inngest.send({
    name: "review/request.send",
    data: {
      customerId: `manual-${Date.now()}`,
      businessId,
      workspaceId,
      customerPhone,
      customerName,
    },
  });

  return NextResponse.json({ success: true, message: "Review request queued" });
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // In production, fetch from DB
  return NextResponse.json({ reviews: [], total: 0 });
}
