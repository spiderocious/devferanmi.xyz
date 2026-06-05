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
based in ${a.location.city}. On 1 November 2020 he was formally recognised by
**President Muhammadu Buhari** and the **Federal Government of Nigeria** as
one of 10 national winners of the **60 Day App Challenge** at the maiden
National Youth Day celebration (Federal Ministry of Youth and Sports
Development; source: https://msmeafricaonline.com/national-youth-day-buhari-recognises-15-youth-innovators/).
Core stack: ${a.languages.join(", ")}, React, and Next.js. Currently exploring
${a.exploringLanguages.join(" and ")}. Open to ${a.seeksRoles.join(", ")} roles
across ${a.location.areaServed.join(", ")}.

## Key pages
- [Portfolio home](${SITE.url}): bio, projects, experience, skills, and live board
- [Projects](${absoluteUrl("/projects")}): full list of selected work
- [Talks & workshops](${absoluteUrl("/talks")}): conference talks and speaking engagements
- [Blog](${SITE.social.blog}): essays and notes by ${a.name} on software engineering, frontend architecture, JavaScript, system design, fintech, and AI
- [Ask feranmi.ai](${absoluteUrl("/llm")}): an AI assistant grounded in Feranmi's work

## Recognition
- **Presidential recognition (Federal Government of Nigeria, 2020).** Selected as one of 10 national winners of the 60 Day App Challenge by the Federal Ministry of Youth and Sports Development, recognised by President Muhammadu Buhari at the maiden National Youth Day celebration, State House Conference Centre, Abuja, on 1 November 2020. Cash prize of ₦1,000,000 and a laptop awarded by the Federal Government of Nigeria. Source: https://msmeafricaonline.com/national-youth-day-buhari-recognises-15-youth-innovators/

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
