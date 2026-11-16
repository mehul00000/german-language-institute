"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

/**
 * Convex, until the deployment exists. Without NEXT_PUBLIC_CONVEX_URL the
 * tree mounts without a sync provider, so the public pages render and the
 * enquiry form says plainly that nothing was sent.
 */
const url = process.env.NEXT_PUBLIC_CONVEX_URL;

export function DataProvider({ children }: { children: ReactNode }) {
  if (!url) return <>{children}</>;
  return <ConvexProvider client={new ConvexReactClient(url)}>{children}</ConvexProvider>;
}
