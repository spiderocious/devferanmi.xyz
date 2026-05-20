import type { Metadata } from "next";
import { Suspense } from "react";
import Content from "./components/content";
import { buildPageMetadata } from "./shared/seo/metadata";
import { buildPersonSchema } from "./shared/seo/jsonld";
import { JsonLdScript } from "./shared/seo/json-ld-script";
import { SITE } from "./shared/seo/config";

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
    </>
  );
}
