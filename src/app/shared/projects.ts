import projectsData from "../../data/projects.json";
import type { ProjectLinkData } from "./project-link";
import type { TechKey } from "./tech-icon";

export interface Project {
  title: string;
  description: string;
  badge: string;
  impacts: string;
  links?: ProjectLinkData[];
  techStack: TechKey[];
  fullDetails: string;
  notes: string;
  /** Optional product-demo video URL (e.g. an R2-hosted MP4). Shown on the
   *  project detail page beneath the description when present. */
  demo?: string;
  /** Optional poster image shown before the demo video plays. */
  demoPoster?: string;
}

export interface ProjectWithSlug extends Project {
  slug: string;
}

/** Turn a title into a URL-safe slug: "TrustRail" -> "trustrail". */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * All projects with a unique slug attached. If two titles ever collide after
 * slugifying, later ones get a numeric suffix so URLs stay unique.
 */
function buildProjects(): ProjectWithSlug[] {
  const seen = new Map<string, number>();
  return (projectsData as Project[]).map((p) => {
    const base = slugify(p.title);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const slug = count === 0 ? base : `${base}-${count + 1}`;
    return { ...p, slug };
  });
}

const PROJECTS: ProjectWithSlug[] = buildProjects();

export function getAllProjects(): ProjectWithSlug[] {
  return PROJECTS;
}

export function getProjectSlugs(): Array<{ slug: string }> {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function getProjectBySlug(slug: string): ProjectWithSlug | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}
