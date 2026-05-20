import type { MetadataRoute } from "next";
import { absoluteUrl } from "./shared/seo/config";
import { getProjectSlugs } from "./shared/projects";

export const revalidate = 3600;

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/?tab=projects", changeFrequency: "weekly", priority: 0.7 },
  { path: "/?tab=technical", changeFrequency: "monthly", priority: 0.6 },
  { path: "/?tab=soft", changeFrequency: "monthly", priority: 0.6 },
  { path: "/?tab=board", changeFrequency: "weekly", priority: 0.5 },
  { path: "/llm", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjectSlugs().map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...projectEntries];
}
