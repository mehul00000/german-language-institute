import type { MetadataRoute } from "next";
import { COURSES } from "@/lib/data/courses";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const now = new Date();
  const staticRoutes = ["", "/about", "/courses", "/german-levels", "/admission", "/contact", "/privacy-policy", "/terms"];
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...COURSES.map((c) => ({
      url: `${base}/courses/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
