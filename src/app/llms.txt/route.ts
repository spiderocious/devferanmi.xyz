import { SITE, absoluteUrl } from "../shared/seo/config";

export const dynamic = "force-static";

/**
 * /llms.txt — the emerging convention for giving AI agents a concise,
 * structured pointer to the most useful resources on a site.
 * See https://llmstxt.org
 */
export function GET() {
  const a = SITE.author;
  const body = `# ${a.name}

> ${SITE.description}

${a.name} (also: ${a.alternateName.join(", ")}) is a senior software engineer
and frontend engineer from ${a.location.hometown}, ${a.location.country},
based in ${a.location.city}. Core stack: ${a.languages.join(", ")}, React, and
Next.js. Currently exploring ${a.exploringLanguages.join(" and ")}. Open to
${a.seeksRoles.join(", ")} roles across ${a.location.areaServed.join(", ")}.

## Key pages
- [Portfolio home](${SITE.url}): bio, projects, experience, skills, and live board
- [Projects](${absoluteUrl("/projects")}): full list of selected work
- [Talks & workshops](${absoluteUrl("/talks")}): conference talks and speaking engagements
- [Ask feranmi.ai](${absoluteUrl("/llm")}): an AI assistant grounded in Feranmi's work

## Structured data
- [All projects (JSON)](${absoluteUrl("/data/projects.json")}): complete machine-readable project catalogue
- [Sitemap](${absoluteUrl("/sitemap.xml")})

## Links
- GitHub: ${a.sameAs[0]}
- LinkedIn: ${a.sameAs[1]}
- Blog: ${SITE.social.blog}
- Email: ${a.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
