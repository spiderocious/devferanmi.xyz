import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy (Next.js 16's renamed middleware) adding agent-discovery affordances
 * per RFC 8288 (Link headers) and the "Markdown for Agents" content-negotiation
 * convention.
 *
 *  - Markdown for Agents: a request for `/` with `Accept: text/markdown`
 *    preferred over `text/html` is rewritten to `/index.md`, which responds
 *    with `Content-Type: text/markdown`. Browsers (HTML-first) are unaffected.
 *  - Link headers: every HTML response advertises real, agent-useful resources
 *    using registered IANA link relations.
 */

// Link relations point only to resources that actually exist on this site.
const LINK_HEADER = [
  `<${"/.well-known/api-catalog"}>; rel="api-catalog"; type="application/linkset+json"`,
  `<${"/llms.txt"}>; rel="service-doc"; type="text/plain"`,
  `<${"/data/projects.json"}>; rel="service-desc"; type="application/json"`,
  `<${"/index.md"}>; rel="alternate"; type="text/markdown"`,
  `<${"/sitemap.xml"}>; rel="sitemap"; type="application/xml"`,
].join(", ");

/** True when the client prefers text/markdown over text/html in Accept. */
function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false;

  const q = (type: string): number => {
    // Match the media type and any q-value; absent type => not acceptable.
    const re = new RegExp(`(?:^|,)\\s*${type.replace("/", "\\/")}\\s*(?:;\\s*q=([0-9.]+))?`, "i");
    const m = accept.match(re);
    if (!m) return -1;
    return m[1] !== undefined ? parseFloat(m[1]) : 1;
  };

  const md = q("text/markdown");
  if (md < 0) return false;
  const html = Math.max(q("text/html"), q("application/xhtml\\+xml"));
  // Prefer markdown only when it's at least as acceptable as HTML.
  return md >= Math.max(html, 0);
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accept = req.headers.get("accept");

  if (pathname === "/" && prefersMarkdown(accept)) {
    const url = req.nextUrl.clone();
    url.pathname = "/index.md";
    const res = NextResponse.rewrite(url);
    res.headers.set("Link", LINK_HEADER);
    res.headers.set("Vary", "Accept");
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("Link", LINK_HEADER);
  res.headers.append("Vary", "Accept");
  return res;
}

export const config = {
  // Run on pages and the homepage, but skip static assets, image routes, and
  // the API/well-known endpoints that already set their own headers.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|feranmi.png|robots.txt|sitemap.xml|manifest.webmanifest|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico)$).*)",
  ],
};
