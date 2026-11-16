import type { Metadata } from "next";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Institute dashboard",
  robots: { index: false },
};

const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!key || !convexUrl) {
    return (
      <main id="main" className="pagehead band band--paper">
        <div className="container prose">
          <h1>The dashboard waits for its keys.</h1>
          <p>
            Two things stand between this scaffold and a working dashboard: a Clerk instance for
            the staff login and a Convex deployment for the records.
          </p>
          <ul>
            <li>
              Set <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and <code>CLERK_SECRET_KEY</code>.
            </li>
            <li>
              Run <code>npx convex dev</code> to generate the client and set{" "}
              <code>NEXT_PUBLIC_CONVEX_URL</code>.
            </li>
            <li>
              Provision the first admin once:{" "}
              <code>npx convex run adminProfiles:provisionFirst</code>.
            </li>
          </ul>
          <p>Until then, nothing here is writable, by design.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <SignedOut>
        <main id="main" className="pagehead band band--paper">
          <div className="container prose">
            <h1>Staff only.</h1>
            <p>
              <Link className="linkline" href="/sign-in">
                Sign in
              </Link>{" "}
              with the institute account. Access is checked again inside every record operation.
            </p>
          </div>
        </main>
      </SignedOut>
      <SignedIn>
        <div className="band band--paper" style={{ minHeight: "100dvh" }}>
          <div className="container" style={{ paddingTop: "var(--space-lg)", paddingBottom: "var(--space-4xl)" }}>
            <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-lg)" }}>
              <p style={{ font: "var(--serif-small) var(--text-lg)/1.2 var(--font-display)", color: "var(--color-ink)" }}>
                Institute dashboard
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                <UserButton afterSignOutUrl="/" />
                <Link className="btn btn--quiet" href="/" style={{ minHeight: "44px" }}>
                  View site
                </Link>
              </div>
            </header>
            <nav aria-label="Dashboard" style={{ marginTop: "var(--space-lg)" }}>
              <ul className="colophon__links" style={{ marginTop: 0 }}>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="ruled" style={{ marginTop: "var(--space-xl)" }}>{children}</div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}
