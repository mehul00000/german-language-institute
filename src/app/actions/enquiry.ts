"use server";

import { enquirySchema } from "@/lib/validations/enquiry";

/**
 * Receives the admission enquiry from the public form.
 *
 * Honest about its state: without a Convex deployment it validates and
 * says plainly that nothing was sent. Once NEXT_PUBLIC_CONVEX_URL (and
 * `npx convex dev`) exist, it posts to `enquiries:create` through the
 * Convex HTTP API, so no generated client is needed here.
 */

// A small best-effort throttle: one enquiry per phone number every ten
// minutes, per server instance. Real abuse protection lands with the
// Convex deployment (docs/: rate limiting on public submissions).
const recent = new Map<string, number>();
const TEN_MINUTES = 10 * 60 * 1000;

function throttled(phone: string): boolean {
  const now = Date.now();
  const last = recent.get(phone);
  if (last && now - last < TEN_MINUTES) return true;
  recent.set(phone, now);
  if (recent.size > 500) {
    for (const [k, t] of recent) if (now - t > TEN_MINUTES) recent.delete(k);
  }
  return false;
}

export type EnquiryResult = {
  connected: boolean;
  ok: boolean;
  message: string;
};

export async function submitEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { connected: false, ok: false, message: "Check the highlighted fields and send again." };
  }
  const data = parsed.data;

  if (throttled(data.phone)) {
    return {
      connected: false,
      ok: false,
      message: "An enquiry with this number just went in. Give the desk ten minutes, or call us.",
    };
  }

  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    return {
      connected: false,
      ok: false,
      message:
        "Nothing was sent: the enquiry desk is not connected yet. Call or WhatsApp us and we will hold your place.",
    };
  }

  try {
    const res = await fetch(`${url}/api/run`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path: "enquiries:create", args: { ...data }, format: "json" }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Convex responded ${res.status}`);
    return {
      connected: true,
      ok: true,
      message: "The enquiry is in. The institute will call you on the number you left.",
    };
  } catch {
    return {
      connected: true,
      ok: false,
      message: "That did not go through. Try again in a minute, or WhatsApp us the same details.",
    };
  }
}
