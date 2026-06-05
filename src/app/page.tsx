import type { Metadata } from "next";
import { Suspense } from "react";
import Content from "./components/content";
import { buildPageMetadata } from "./shared/seo/metadata";
import { buildPersonSchema } from "./shared/seo/jsonld";
import { JsonLdScript } from "./shared/seo/json-ld-script";
import { SITE } from "./shared/seo/config";
import { SeoBio } from "./components/seo-bio";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLdScript data={buildPersonSchema()} />
      <Suspense>
        <Content />
      </Suspense>
      {/* Crawlable bio prose. Rendered above the Suspense boundary so its
          target-keyword content (blog, recognition, locations, languages)
          appears in the SSR HTML — not just after client hydration. */}
      <div className="text-zinc-900 dark:text-zinc-100">
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <SeoBio />
        </div>
      </div>
    </>
  );
}
