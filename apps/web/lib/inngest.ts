import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "local-seo-copilot",
  name: "LocalSEO Co-Pilot",
});

export const sendReviewRequest = inngest.createFunction(
  {
    id: "send-review-request",
    name: "Send Review Request SMS",
    triggers: [{ event: "review/request.send" }],
  },
  async ({ event, step }) => {
    const { } = event.data as {
      customerId: string;
      businessId: string;
      customerPhone: string;
      customerName: string;
    };

    const twilioResult = await step.run("send-sms", async () => {
      // In production, call Twilio API here
      return { sid: `mock-sid-${Date.now()}`, status: "sent" };
    });

    await step.run("update-request-status", async () => {
      return { updated: true };
    });

    return { success: true, twilioSid: twilioResult.sid };
  }
);

export const scanCitations = inngest.createFunction(
  {
    id: "scan-citations",
    name: "Scan Citation Directories",
    concurrency: { limit: 2 },
    triggers: [{ event: "citations/scan.start" }],
  },
  async ({ event, step }) => {
    const { businessId } = event.data as {
      businessId: string;
      workspaceId: string;
    };

    const directories = await step.run("get-directories", async () => {
      return [
        "Google Business Profile",
        "Yelp",
        "BBB",
        "Yellow Pages",
        "Angi",
        "HomeAdvisor",
        "Bing Places",
        "Apple Maps",
        "Foursquare",
        "Facebook Business",
      ];
    });

    const results = await step.run("scan-all-directories", async () => {
      return directories.map((dir: string) => ({
        directory: dir,
        status:
          Math.random() > 0.3
            ? "correct"
            : Math.random() > 0.5
            ? "incorrect"
            : "missing",
      }));
    });

    await step.run("save-results", async () => {
      return { saved: results.length };
    });

    return { businessId, directoriesScanned: directories.length, results };
  }
);

export const generateGBPPost = inngest.createFunction(
  {
    id: "generate-gbp-post",
    name: "Auto-Generate GBP Post",
    triggers: [{ event: "gbp/post.auto-generate" }],
  },
  async ({ event, step }) => {
    const { businessId, category } = event.data as {
      businessId: string;
      businessName: string;
      category: string;
    };

    const draft = await step.run("generate-content", async () => {
      return {
        content: `Professional ${category} services in Austin, TX! Our certified team is ready to help you. Call today!`,
        type: "whats_new",
      };
    });

    await step.run("save-draft", async () => {
      return { saved: true };
    });

    return { businessId, draft };
  }
);
