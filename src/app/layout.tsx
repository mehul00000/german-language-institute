import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/clerk-provider";
import { DataProvider } from "@/providers/convex-provider";
import { INSTITUTE, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${INSTITUTE.name}, Kaithal | German courses A1 to C1`,
    template: `%s | ${INSTITUTE.name}, Kaithal`,
  },
  description:
    "German Language Institute in Kaithal, Haryana. Courses from A1 to C1, online and offline, with admission enquiries and demo classes open to all.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: INSTITUTE.name,
    title: `${INSTITUTE.name}, Kaithal`,
    description:
      "German courses from A1 to C1 in Kaithal, Haryana. Small batches, online and offline, taught as a craft.",
    locale: "en_IN",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: INSTITUTE.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Galli No. 2, Kaithal-Pundri-Karnal Road, Near Sector 18, Balaji Colony, Balraj Nagar",
    addressLocality: "Kaithal",
    addressRegion: "Haryana",
    postalCode: "136027",
    addressCountry: "IN",
  },
  telephone: INSTITUTE.phoneTel,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=sentient@300,400&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400&display=swap"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
      </head>
      <body>
        <AuthProvider>
          <DataProvider>
            <a className="skip" href="#main">
              Skip to content
            </a>
            {children}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
