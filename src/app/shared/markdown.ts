import { SITE, absoluteUrl } from "./seo/config";
import { getAllProjects } from "./projects";
import jobs from "../../data/jobs.json";

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

/**
 * Builds a clean, agent-friendly Markdown representation of the portfolio
 * homepage. Served to clients that request `Accept: text/markdown` (see
 * middleware) and at the stable `/index.md` URL. Sourced from the same data
 * (SITE, projects.json, jobs.json) the HTML pages render, so it never drifts.
 */
export function buildHomepageMarkdown(): string {
  const a = SITE.author;
  const projects = getAllProjects();
  const jobList = jobs as Job[];

  const lines: string[] = [];

  lines.push(`# ${a.name}`);
  lines.push("");
  lines.push(`> ${SITE.tagline}`);
  lines.push("");
  lines.push(SITE.description);
  lines.push("");
  lines.push(
    `Also known as: ${a.alternateName.join(", ")}. Based in ${a.location.city}, ` +
      `${a.location.country} (from ${a.location.hometown}). Core stack: ` +
      `${a.languages.join(", ")}, React, Next.js. Currently exploring ` +
      `${a.exploringLanguages.join(" and ")}. Open to ${a.seeksRoles.join(", ")} ` +
      `roles across ${a.location.areaServed.join(", ")}.`,
  );
  lines.push("");

  lines.push("## Links");
  lines.push("");
  lines.push(`- Website: ${SITE.url}`);
  lines.push(`- GitHub: ${SITE.social.github}`);
  lines.push(`- LinkedIn: ${SITE.social.linkedin}`);
  lines.push(`- Blog: ${SITE.social.blog}`);
  lines.push(`- Twitter/X: ${SITE.social.twitter}`);
  lines.push(`- Email: ${a.email}`);
  lines.push("");

  lines.push("## Experience");
  lines.push("");
  for (const job of jobList) {
    lines.push(`### ${job.title} — ${job.company}`);
    lines.push(`*${job.location} · ${job.period}*`);
    lines.push("");
    for (const point of job.description) lines.push(`- ${point}`);
    lines.push("");
  }

  lines.push("## Projects");
  lines.push("");
  for (const p of projects) {
    lines.push(`### ${p.title} (${p.badge})`);
    lines.push("");
    lines.push(p.description);
    lines.push("");
    if (p.impacts) {
      lines.push(`**Impact:** ${p.impacts}`);
      lines.push("");
    }
    if (p.techStack?.length) {
      lines.push(`**Tech:** ${p.techStack.join(", ")}`);
      lines.push("");
    }
    if (p.links?.length) {
      const linkText = p.links
        .map((l) => `[${l.label ?? l.url}](${l.url})`)
        .join(" · ");
      lines.push(linkText);
      lines.push("");
    }
  }

  lines.push("## Machine-readable resources");
  lines.push("");
  lines.push(`- [llms.txt](${absoluteUrl("/llms.txt")}): concise agent pointer`);
  lines.push(
    `- [All projects (JSON)](${absoluteUrl("/data/projects.json")}): full project catalogue`,
  );
  lines.push(
    `- [API catalog](${absoluteUrl("/.well-known/api-catalog")}): public API discovery (RFC 9727)`,
  );
  lines.push(`- [Sitemap](${absoluteUrl("/sitemap.xml")})`);
  lines.push(`- [Ask feranmi.ai](${absoluteUrl("/llm")}): AI grounded in this work`);
  lines.push("");

  return lines.join("\n");
}
