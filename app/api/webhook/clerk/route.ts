import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get the Clerk Webhook secret from environment variables
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing WEBHOOK_SECRET in environment variables.");
    return new NextResponse("Webhook secret not configured", { status: 500 });
  }

  // Get the headers
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  // Validate presence of required headers
  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error("Missing Svix headers.");
    return new NextResponse("Bad Request: Missing headers", { status: 400 });
  }

  // Parse the request body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Initialize Svix webhook handler
  const webhook = new Webhook(WEBHOOK_SECRET);

  let event: WebhookEvent;

  try {
    // Verify the webhook payload and headers
    event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  // TODO: Add your event handling logic here
  console.log("Webhook event received:", event);

  return new NextResponse("Webhook processed successfully", { status: 200 });
}
