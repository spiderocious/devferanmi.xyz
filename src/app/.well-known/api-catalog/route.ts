import { absoluteUrl } from "../../shared/seo/config";

export const dynamic = "force-static";

/**
 * /.well-known/api-catalog — RFC 9727 API discovery. Returns an RFC 9264
 * linkset describing the site's public, unauthenticated APIs. Only real
 * endpoints are listed; the site has no auth, so no security links are
 * advertised.
 */
export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: absoluteUrl("/data/projects.json"),
        "service-doc": [{ href: absoluteUrl("/llms.txt") }],
        status: [{ href: absoluteUrl("/data/projects.json") }],
        author: [{ href: absoluteUrl("/") }],
      },
      {
        anchor: absoluteUrl("/api/og-preview"),
        "service-doc": [{ href: absoluteUrl("/llms.txt") }],
        status: [{ href: absoluteUrl("/api/og-preview?url=https://example.com") }],
        author: [{ href: absoluteUrl("/") }],
      },
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
