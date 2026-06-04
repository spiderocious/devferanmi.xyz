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
        // Federal Government of Nigeria recognition (2020 National Youth Day,
        // 60 Day App Challenge). Surfaced both as a plain `award` string (which
        // Google's Knowledge Graph picks up) and as a structured credential
        // with the awarding organization, date, and the news article that
        // documents it (subjectOf).
        award: [
          "Presidential recognition by President Muhammadu Buhari and the Federal Government of Nigeria — 60 Day App Challenge national winner, Maiden National Youth Day, 1 November 2020 (Federal Ministry of Youth and Sports Development).",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "60 Day App Challenge — National Winner",
            credentialCategory: "Government Innovation Award",
            dateCreated: "2020-11-01",
            recognizedBy: {
              "@type": "GovernmentOrganization",
              name: "Federal Government of Nigeria",
              department: {
                "@type": "GovernmentOrganization",
                name: "Federal Ministry of Youth and Sports Development",
              },
              member: {
                "@type": "Person",
                name: "Muhammadu Buhari",
                jobTitle: "President of the Federal Republic of Nigeria",
              },
              location: {
                "@type": "Place",
                name: "State House Conference Centre, Abuja, Nigeria",
              },
            },
            about: "Nationwide innovation competition recognising Nigerian youth software innovators. Selected as one of 10 national winners from thousands of entries, with a ₦1,000,000 cash prize and laptop awarded by the Federal Government of Nigeria.",
            url: "https://msmeafricaonline.com/national-youth-day-buhari-recognises-15-youth-innovators/",
          },
        ],
        subjectOf: [
          {
            "@type": "NewsArticle",
            headline:
              "National Youth Day: Buhari Recognises 15 Youth Innovators",
            datePublished: "2020-11-02",
            url: "https://msmeafricaonline.com/national-youth-day-buhari-recognises-15-youth-innovators/",
            publisher: { "@type": "Organization", name: "MSME Africa" },
            about: { "@id": personId },
          },
        ],
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
