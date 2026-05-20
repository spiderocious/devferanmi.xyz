import { buildHomepageMarkdown } from "../shared/markdown";

export const dynamic = "force-static";

/**
 * /index.md — a stable Markdown representation of the homepage. Also the
 * rewrite target the middleware uses when a client sends `Accept: text/markdown`
 * for `/` (Markdown for Agents content negotiation).
 */
export function GET() {
  const body = buildHomepageMarkdown();

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      // Rough token estimate (~4 chars/token) to help agents budget context.
      "x-markdown-tokens": String(Math.ceil(body.length / 4)),
      Vary: "Accept",
    },
  });
}
