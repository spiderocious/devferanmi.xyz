export const SITE = {
  name: "Feranmi Adeniji",
  shortName: "Feranmi",
  handle: "@devferanmi",
  url: "https://devferanmi.xyz",
  locale: "en_US",
  tagline: "Senior Software Engineer · Lagos, Nigeria",
  description:
    "Oluwaferanmi Adeniji — senior software engineer in Lagos, Nigeria. 7+ years shipping fintech systems, developer tools, and AI-powered products. Currently at Moniepoint: frontend systems serving 10M+ users and processing $1B+ annually. Open-source maintainer of Connectic and Monie Utils.",
  shortDescription:
    "Senior software engineer in Lagos. Fintech, developer tools, AI. 10M+ users at Moniepoint. Open-source: Connectic, Monie Utils.",
  keywords: [
    // Name variants
    "Oluwaferanmi Adeniji",
    "Feranmi Adeniji",
    "Adeniji Feranmi",
    "Adeniji Adewale Oluwaferanmi",
    "Oluwaferanmi Adewale Adeniji",
    "devferanmi",
    "Feranmi",
    // Seniority / role framing
    "senior software engineer",
    "senior frontend engineer",
    "lead engineer",
    "engineering lead",
    "staff engineer",
    "principal engineer",
    "software engineer",
    "smart engineer",
    "problem solver",
    "builder",
    "emerging talent",
    // Role + location combinations (Nigeria / Africa / Lagos / Ogbomoso)
    "principal engineer Nigeria",
    "principal engineer Africa",
    "staff engineer Nigeria",
    "staff engineer Africa",
    "lead engineer Nigeria",
    "engineering lead Africa",
    "senior frontend engineer Nigeria",
    "software engineer Lagos",
    "software engineer Ogbomoso",
    "software engineer Nigeria",
    "software engineer Africa",
    "React engineer Nigeria",
    "React engineer Lagos",
    "React engineer Africa",
    "TypeScript engineer Nigeria",
    "Node.js engineer Nigeria",
    "Golang engineer Nigeria",
    "Elixir engineer Nigeria",
    "builders in Nigeria",
    "problem solvers Nigeria",
    "emerging engineering talent Africa",
    // Tech & domain
    "fintech engineer",
    "Moniepoint engineer",
    "Next.js engineer",
    "React engineer",
    "TypeScript engineer",
    "Node.js engineer",
    "Golang engineer",
    "Elixir engineer",
    "developer tools",
    "AI engineer",
    "Connectic",
    "Monie Utils",
    "open source maintainer",
    "microfrontends",
    "payment systems",
    "kyc compliance",
    "system design",
    "portfolio",
  ] as string[],
  author: {
    name: "Oluwaferanmi Adeniji",
    alternateName: [
      "Feranmi Adeniji",
      "Adeniji Feranmi",
      "Adeniji Adewale Oluwaferanmi",
      "Oluwaferanmi Adewale Adeniji",
      "devferanmi",
      "Feranmi",
    ],
    role: "Senior Software Engineer",
    /** Roles the person works at or is actively growing toward. */
    roles: [
      "Senior Software Engineer",
      "Senior Frontend Engineer",
      "Lead Engineer",
      "Engineering Lead",
    ],
    seeksRoles: ["Lead Engineer", "Staff Engineer", "Principal Engineer"],
    company: "Moniepoint",
    /** Languages shipped in production vs. actively exploring. */
    languages: ["TypeScript", "JavaScript", "Node.js"],
    exploringLanguages: ["Golang", "Elixir"],
    /** Geographic relevance, narrow → broad. */
    location: {
      city: "Lagos",
      hometown: "Ogbomoso",
      region: "Lagos",
      country: "Nigeria",
      countryCode: "NG",
      continent: "Africa",
      areaServed: [
        "Ogbomoso",
        "Lagos",
        "Nigeria",
        "Africa",
        "Remote",
        "Worldwide",
      ],
    },
    sameAs: [
      "https://github.com/spiderocious",
      "https://www.linkedin.com/in/oluwaferanmi-adeniji-aba341179/",
      "https://devferanmi.hashnode.dev",
      "https://twitter.com/devferanmi",
    ],
    email: "devferanmi@gmail.com",
  },
  social: {
    github: "https://github.com/spiderocious",
    linkedin: "https://www.linkedin.com/in/oluwaferanmi-adeniji-aba341179/",
    blog: "https://devferanmi.hashnode.dev",
    twitter: "https://twitter.com/devferanmi",
  },
  defaultOgImage: "/opengraph-image",
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const base = SITE.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export const PORTFOLIO_API_BASE =
  process.env.NEXT_PUBLIC_PORTFOLIO_API_BASE ?? "http://localhost:8787";

/**
 * External blog URL. Hashnode's GraphQL API is now paid, so instead of
 * fetching/rendering posts we just send visitors to the hosted publication.
 * Sourced from HASHNODE_PUBLICATION_HOST (a bare host like
 * "blog.example.com"); falls back to the SITE.social.blog URL.
 */
export function blogUrl(): string {
  const host = process.env.HASHNODE_PUBLICATION_HOST?.trim();
  if (!host) return SITE.social.blog;
  if (host.startsWith("http")) return host;
  return `https://${host}`;
}
