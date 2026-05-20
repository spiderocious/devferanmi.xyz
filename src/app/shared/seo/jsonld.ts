import { SITE, absoluteUrl } from "./config";

export function buildPersonSchema() {
  const personId = `${SITE.url}#person`;
  const websiteId = `${SITE.url}#website`;
  const loc = SITE.author.location;

  const areaServed = loc.areaServed.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.author.name,
        givenName: "Oluwaferanmi",
        additionalName: "Adewale",
        familyName: "Adeniji",
        alternateName: SITE.author.alternateName,
        url: SITE.url,
        mainEntityOfPage: SITE.url,
        image: absoluteUrl("/feranmi.png"),
        description: SITE.description,
        jobTitle: SITE.author.roles,
        hasOccupation: SITE.author.roles.map((role) => ({
          "@type": "Occupation",
          name: role,
          occupationLocation: areaServed,
          skills: [
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "System Design",
            "Micro-frontends",
            "Fintech Systems",
          ].join(", "),
        })),
        worksFor: {
          "@type": "Organization",
          name: SITE.author.company,
          url: "https://moniepoint.com",
        },
        homeLocation: {
          "@type": "Place",
          name: `${loc.hometown}, ${loc.country}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: loc.hometown,
            addressCountry: loc.countryCode,
          },
        },
        workLocation: {
          "@type": "Place",
          name: `${loc.city}, ${loc.country}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: loc.city,
            addressRegion: loc.region,
            addressCountry: loc.countryCode,
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: loc.city,
          addressRegion: loc.region,
          addressCountry: loc.countryCode,
        },
        nationality: { "@type": "Country", name: loc.country },
        worksAt: areaServed,
        email: `mailto:${SITE.author.email}`,
        sameAs: SITE.author.sameAs,
        knowsLanguage: ["English"],
        // Roles actively being pursued — signals availability to recruiters.
        seeks: SITE.author.seeksRoles.map((role) => ({
          "@type": "Demand",
          name: role,
          areaServed,
        })),
        knowsAbout: [
          "Software Engineering",
          "Frontend Development",
          "Frontend Architecture",
          "Micro-frontends",
          "Design Systems",
          "Performance Engineering",
          "Fintech Systems",
          "Payment Processing",
          "KYC and Compliance",
          "Loan Management Systems",
          "Developer Tools",
          "AI Applications",
          "Large Language Models",
          "System Design",
          "Distributed Systems",
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Vue",
          "Golang",
          "Elixir",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE.url,
        name: SITE.name,
        alternateName: SITE.author.alternateName,
        description: SITE.shortDescription,
        inLanguage: "en-US",
        about: { "@id": personId },
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}#profilepage`,
        url: SITE.url,
        name: `${SITE.author.name} — ${SITE.author.role}`,
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
    ],
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.url),
    image: input.image ? absoluteUrl(input.image) : absoluteUrl(SITE.defaultOgImage),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: {
      "@type": "Person",
      "@id": `${SITE.url}#person`,
      name: SITE.author.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE.url}#person`,
      name: SITE.author.name,
    },
    inLanguage: "en-US",
    keywords: input.tags?.join(", "),
    mainEntityOfPage: absoluteUrl(input.url),
  };
}

export function buildCollectionSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.url),
    isPartOf: { "@type": "WebSite", "@id": `${SITE.url}#website` },
    about: { "@type": "Person", "@id": `${SITE.url}#person` },
  };
}

interface ProjectSchemaInput {
  title: string;
  description: string;
  url: string;
  sameAs?: string[];
  programmingLanguage?: string[];
}

/**
 * For portfolio projects — CreativeWork authored by the person. Helps Google
 * surface the project as a developer work product.
 */
export function buildProjectSchema(input: ProjectSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.url),
    author: {
      "@type": "Person",
      "@id": `${SITE.url}#person`,
      name: SITE.author.name,
    },
    creator: {
      "@type": "Person",
      "@id": `${SITE.url}#person`,
      name: SITE.author.name,
    },
    sameAs: input.sameAs && input.sameAs.length > 0 ? input.sameAs : undefined,
    programmingLanguage: input.programmingLanguage,
  };
}
