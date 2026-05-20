import { SITE, absoluteUrl } from "../shared/seo/config";

export const dynamic = "force-static";

/**
 * /robots.txt — emitted as a raw route (not Next's MetadataRoute.Robots) so we
 * can include directives Next doesn't model, namely Content-Signal.
 *
 * Policy: fully open. Every page, deep-link, and data endpoint is crawlable,
 * and the major search + AI crawlers are explicitly welcomed — this portfolio
 * *wants* to feed LLM answer engines (see /llm and /llms.txt).
 *
 * Content Signals (https://contentsignals.org) declare how this content may be
 * used by automated systems. We opt in to everything, consistent with the open
 * crawl policy:
 *   - search    : index for traditional / AI search result links  → yes
 *   - ai-input  : use as live context for AI answers (RAG, agents) → yes
 *   - ai-train  : include in model training corpora                → yes
 */

const AI_CRAWLERS = [
  "Googlebot",
  "Googlebot-Image",
  "Bingbot",
  "DuckDuckBot",
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "Google-Extended",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "cohere-ai",
  "YouBot",
  "Bytespider",
];

const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=yes";

export function GET() {
  const lines: string[] = [
    "# Fully open crawl policy. Content Signals below declare that this",
    "# content may be used for search, as live AI input, and for AI training.",
    "",
    "User-agent: *",
    CONTENT_SIGNAL,
    "Allow: /",
    "",
    "# Explicitly welcome the major search + AI / answer-engine crawlers.",
    `User-agent: ${AI_CRAWLERS.join("\nUser-agent: ")}`,
    CONTENT_SIGNAL,
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `Host: ${SITE.url}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
