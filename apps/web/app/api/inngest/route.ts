import { serve } from "inngest/next";
import { inngest, sendReviewRequest, scanCitations, generateGBPPost } from "@/lib/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendReviewRequest, scanCitations, generateGBPPost],
});
