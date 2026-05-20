import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "./shared/seo/config";

/**
 * Fully open robots policy — every page, deep-link, and data endpoint is
 * crawlable, and all known search + AI crawlers are explicitly welcomed.
 * No disallow rules: we want maximum indexability and rich discovery.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly welcome the major AI / answer-engine crawlers so the
      // portfolio (and /data/projects.json) feeds LLM search results.
      {
        userAgent: [
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
        ],
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
