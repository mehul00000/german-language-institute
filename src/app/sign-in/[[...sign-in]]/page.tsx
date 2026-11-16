import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Staff sign-in",
  description: "Staff sign-in for the German Language Institute dashboard.",
  robots: { index: false },
};

const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function SignInPage() {
  if (!key) {
    return (
      <main id="main" className="pagehead band band--paper">
        <div className="container prose">
          <h1>Sign-in is not switched on yet.</h1>
          <p>
            The dashboard waits for a Clerk instance. Set{" "}
            <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and <code>CLERK_SECRET_KEY</code> in{" "}
            <code>.env.local</code>, then run <code>npx convex dev</code> and this page becomes the
            staff sign-in.
          </p>
        </div>
      </main>
    );
  }
  return (
    <main id="main" className="band band--paper" style={{ paddingBlock: "var(--space-3xl)" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SignIn />
      </div>
    </main>
  );
}
