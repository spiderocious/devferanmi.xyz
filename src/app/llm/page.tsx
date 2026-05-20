import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { SITE, absoluteUrl } from "../shared/seo/config";
import { buildPageMetadata } from "../shared/seo/metadata";
import { buildBreadcrumbSchema } from "../shared/seo/jsonld";
import { JsonLdScript } from "../shared/seo/json-ld-script";
import { LlmChat } from "../components/llm/chat";

const TITLE = "feranmi.ai — ask me anything";
const DESCRIPTION =
  "An AI trained on Feranmi's actual work, experience, and opinions. Ask about his projects, tech stack, fintech background, open-source work, or whether he's open to new roles.";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/llm",
    image: "/llm/opengraph-image",
    tags: [
      "feranmi.ai",
      "ask feranmi",
      "portfolio chatbot",
      "developer ai assistant",
      "Oluwaferanmi Adeniji AI",
      "hire feranmi",
      "open to work",
    ],
  }),
};

function FaqSchema() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Feranmi Adeniji?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oluwaferanmi Adeniji is a Senior Software Engineer based in Lagos, Nigeria with 7+ years of experience. He currently works at Moniepoint where he contributes to frontend systems serving 10M+ users and processing $1B+ in payment volume annually.",
        },
      },
      {
        "@type": "Question",
        name: "What is feranmi.ai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "feranmi.ai is an AI chatbot grounded in Feranmi's actual work, experience, and opinions. Ask it anything about his projects, tech stack, fintech background, open-source work, or whether he is open to new roles.",
        },
      },
      {
        "@type": "Question",
        name: "Is Feranmi open to work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Feranmi is actively exploring senior software engineering roles in fintech and developer tools. Reach out via devferanmi@gmail.com or ask feranmi.ai directly.",
        },
      },
      {
        "@type": "Question",
        name: "What is Feranmi's tech stack?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Primary stack: TypeScript, React, Next.js, Node.js. Experience also spans Vue, Angular, microfrontends, MongoDB, MySQL, PostgreSQL, Redis, Docker, Kafka, GCP, and AI tooling (Claude, OpenAI).",
        },
      },
    ],
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "feranmi.ai",
    description: DESCRIPTION,
    url: absoluteUrl("/llm"),
    applicationCategory: "ChatApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: {
      "@type": "Person",
      "@id": `${SITE.url}#person`,
      name: SITE.author.name,
    },
  };

  return <JsonLdScript data={[faq, software]} />;
}

export default function LlmPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "feranmi.ai", url: "/llm" },
  ]);

  return (
    <>
      <FaqSchema />
      <JsonLdScript data={breadcrumb} />

      {/* SEO copy for crawlers. Visually hidden — the full-screen chat carries
          the visible version of this content in its empty state. */}
      <div className="sr-only">
        <h1>feranmi.ai — ask me anything</h1>
        <p>
          An AI grounded in Feranmi Adeniji&apos;s actual work, experience, and
          opinions. Ask about his projects, his tech stack, his fintech
          background at Moniepoint, his open-source work on Connectic and Monie
          Utils, or whether he&apos;s open to new roles.
        </p>
        <h2>What you can ask feranmi.ai</h2>
        <ul>
          <li>His current role and what he&apos;s shipping at Moniepoint.</li>
          <li>Open-source maintenance work — Connectic, Monie Utils, and more.</li>
          <li>Fintech experience: payments, KYC, loan management, interbank transfers.</li>
          <li>Frontend specialism — micro-frontends, design systems, and performance engineering.</li>
          <li>Whether he&apos;s open to new roles, and what kind.</li>
          <li>Specific projects, decisions, and tradeoffs from his past work.</li>
        </ul>
        <h2>About this assistant</h2>
        <p>
          feranmi.ai is a portfolio chatbot. It uses a large language model
          grounded in a private system context written by Feranmi himself —
          covering his work history, the products he&apos;s shipped, his
          opinions, and what he&apos;s working on next. It&apos;s rate limited
          to 10 messages per 10 minutes per visitor. For anything else, email
          devferanmi@gmail.com.
        </p>
        <p>
          <Link href="/">Back to portfolio</Link>
        </p>
      </div>

      {/* Full-screen interactive chat — client island */}
      <Suspense
        fallback={
          <div className="h-[100dvh] bg-white dark:bg-zinc-950 animate-pulse" />
        }
      >
        <LlmChat />
      </Suspense>
    </>
  );
}
