import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { reviewText, authorName, rating, businessName } = body;

  if (!reviewText) {
    return NextResponse.json(
      { error: "Review text is required" },
      { status: 400 }
    );
  }

  // In production, call OpenAI here
  // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  // const completion = await openai.chat.completions.create({...});

  const mockReply =
    rating >= 4
      ? `Thank you so much for the wonderful review, ${authorName}! We're thrilled you had a great experience with ${businessName}. Your kind words mean the world to our team. We look forward to serving you again soon!`
      : `Thank you for sharing your feedback, ${authorName}. We sincerely apologize for falling short of your expectations. Your experience is not the standard we hold ourselves to. We'd love the opportunity to make this right — please reach out to us directly so we can address your concerns personally.`;

  return NextResponse.json({ reply: mockReply });
}
