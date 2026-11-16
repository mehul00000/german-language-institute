"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

/**
 * Clerk, until the keys exist. Without a publishable key the provider
 * passes the tree through untouched, so the site can be designed and
 * reviewed before the Clerk instance is configured. Set
 * NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY to switch auth on.
 */
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function AuthProvider({ children }: { children: ReactNode }) {
  if (!publishableKey) return <>{children}</>;
  return (
    <ClerkProvider publishableKey={publishableKey} appearance={{ variables: {} }}>
      {children}
    </ClerkProvider>
  );
}
