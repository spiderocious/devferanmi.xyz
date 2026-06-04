import type { Metadata } from "next";
import Link from "next/link";
import { getAllTalks, getTalkStats } from "../shared/talks";
import { buildPageMetadata } from "../shared/seo/metadata";
import {
  buildBreadcrumbSchema,
  buildCollectionSchema,
} from "../shared/seo/jsonld";
import { JsonLdScript } from "../shared/seo/json-ld-script";
import { SITE, absoluteUrl } from "../shared/seo/config";
import { TalksGrid } from "./talks-grid";

export const metadata: Metadata = buildPageMetadata({
  title: "Talks & Workshops",
  description:
    "Conference talks, workshops, and speaking engagements by Feranmi Adeniji — covering JavaScript, frontend architecture, micro-frontends, fintech systems, software architecture, clean code, and engineering careers.",
  path: "/talks",
  tags: [
    "talks",
    "workshops",
    "speaking engagements",
    "conference talks",
    "DevFest",
    "JavaScript",
    "frontend architecture",
    "micro-frontends",
    "system design",
  ],
});

export default function TalksPage() {
  const talks = getAllTalks();
  const stats = getTalkStats();

  const jsonLd = [
    buildCollectionSchema({
      name: "Talks & Workshops — Feranmi Adeniji",
      description:
        "Conference talks, workshops, and speaking engagements by Feranmi Adeniji.",
      url: "/talks",
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Talks", url: "/talks" },
    ]),
    // Each talk as an Event entry — helps Google understand the speaking record.
    ...talks.map((talk) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: talk.title,
      description: talk.intro.split("\n\n")[0],
      url: talk.url,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      ...(talk.year ? { startDate: talk.year } : {}),
      ...(talk.location
        ? {
            location: {
              "@type": "Place",
              name: talk.event ?? talk.location,
              address: talk.location,
            },
          }
        : {}),
      organizer: talk.event
        ? { "@type": "Organization", name: talk.event }
        : undefined,
      performer: {
        "@type": "Person",
        "@id": `${SITE.url}#person`,
        name: SITE.author.name,
        url: SITE.url,
      },
      keywords: talk.tags.join(", "),
      mainEntityOfPage: absoluteUrl("/talks"),
    })),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
        <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
          <Link
            href="/"
            prefetch
            className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← back
          </Link>

          <header className="mt-8 mb-10 max-w-3xl">
            <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
              Speaking
            </div>
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              Talks &amp; Workshops
            </h1>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              A running record of sessions I&apos;ve delivered — conference
              talks, hands-on workshops, and community sessions on JavaScript,
              frontend architecture, micro-frontends, fintech systems, software
              architecture, clean code, and engineering careers.
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-xs text-zinc-500 dark:text-zinc-400">
              <Stat value={stats.total} label="sessions" />
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <Stat value={stats.talks} label="talks" />
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <Stat value={stats.workshops} label="workshops" />
            </div>
          </header>

          <TalksGrid talks={talks} />
        </main>
      </div>
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="text-base font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
        {value.toString().padStart(2, "0")}
      </span>
      <span>{label}</span>
    </span>
  );
}
