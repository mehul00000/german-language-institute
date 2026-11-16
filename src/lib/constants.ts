/**
 * Institute facts, from the source documents in docs/.
 * Nothing here is invented: fields the institute has not published
 * stay out of the site copy and are marked as slots where they appear.
 */
export const INSTITUTE = {
  name: "German Language Institute",
  shortName: "German Language Institute",
  town: "Kaithal",
  state: "Haryana",
  pin: "136027",
  address:
    "Galli No. 2, Kaithal-Pundri-Karnal Road, Near Sector 18, Balaji Colony, Balraj Nagar, Kaithal, Haryana 136027",
  addressShort: "Galli No. 2, Kaithal-Pundri-Karnal Road, Kaithal, Haryana 136027",
  phoneDisplay: "08168 506171",
  phoneRaw: "08168506171",
  phoneTel: "+918168506171",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://germanlanguageinstitute-kaithal.example";

/** A WhatsApp deep link with a prefilled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/918168506171?text=${encodeURIComponent(message)}`;
}

export const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
export type Level = (typeof LEVELS)[number];

export const MODES = ["Offline", "Online", "Hybrid"] as const;
export type Mode = (typeof MODES)[number];
