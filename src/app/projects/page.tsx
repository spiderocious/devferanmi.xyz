import type { Metadata } from "next";
import Link from "next/link";
import Projects from "../components/content/parts/projects";
import { getAllProjects } from "../shared/projects";
import { buildPageMetadata } from "../shared/seo/metadata";
import {
  buildCollectionSchema,
  buildBreadcrumbSchema,
} from "../shared/seo/jsonld";
import { JsonLdScript } from "../shared/seo/json-ld-script";

export const metadata: Metadata = buildPageMetadata({
  title: "Projects",
  description:
    "Selected work by Feranmi Adeniji — fintech platforms, developer tools, AI-powered products, and open-source libraries.",
  path: "/projects",
  tags: ["projects", "portfolio", "fintech", "developer tools", "open source"],
});

export default function ProjectsPage() {
  const count = getAllProjects().length;

  const jsonLd = [
    buildCollectionSchema({
      name: "Projects — Feranmi Adeniji",
      description:
        "Selected work — fintech platforms, developer tools, AI-powered products, and open-source libraries.",
      url: "/projects",
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
    ]),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
          <header className="mb-12">
            <Link
              href="/"
              className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              ← back
            </Link>
            <h1 className="text-2xl font-medium tracking-tight mt-6 mb-3">
              Projects
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Selected work — fintech platforms, developer tools, AI-powered
              products, and open-source libraries.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3">
              {count} {count === 1 ? "project" : "projects"}
            </p>
          </header>

          <Projects />
        </main>
      </div>
    </>
  );
}
