import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProjectBySlug, getProjectSlugs } from "../../shared/projects";
import { DemoVideo } from "../../components/demo-video";
import { ProjectLink } from "../../shared/project-link";
import { TechBadge } from "../../shared/tech-icon";
import { buildPageMetadata } from "../../shared/seo/metadata";
import {
  buildProjectSchema,
  buildBreadcrumbSchema,
} from "../../shared/seo/jsonld";
import { JsonLdScript } from "../../shared/seo/json-ld-script";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }
  return buildPageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    type: "article",
    tags: [project.badge, ...project.techStack],
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const links = project.links ?? [];

  // Title links to the demo first, otherwise the first GitHub link. If neither
  // exists, the title stays plain text (not clickable).
  const titleHref =
    links.find((l) => l.type === "demo")?.url ??
    links.find((l) => l.type === "github")?.url ??
    null;

  const jsonLd = [
    buildProjectSchema({
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
      sameAs: links.map((l) => l.url),
      programmingLanguage: project.techStack,
    }),
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/?tab=projects" },
      { name: project.title, url: `/projects/${project.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
        <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
          <Link
            href="/?tab=projects"
            className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            ← all projects
          </Link>

          <header className="mt-8 mb-8">
            {project.badge && (
              <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                {project.badge}
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              {titleHref ? (
                <a
                  href={titleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 hover:underline underline-offset-4 decoration-2"
                >
                  {project.title}
                  <ArrowUpRightIcon className="w-5 h-5 self-center text-zinc-400 dark:text-zinc-500" />
                </a>
              ) : (
                project.title
              )}
            </h1>
            <p className="text-base text-zinc-700 dark:text-zinc-300">
              {project.description}
            </p>

            {project.demo && (
              <DemoVideo
                src={project.demo}
                poster={project.demoPoster}
                title={project.title}
                className="mt-6"
              />
            )}

            {project.impacts && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3">
                {project.impacts}
              </p>
            )}

            {links.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-5">
                {links.map((link) => (
                  <ProjectLink
                    key={link.url}
                    type={link.type}
                    url={link.url}
                    label={link.label}
                  />
                ))}
              </div>
            )}

            {project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {project.techStack.map((key) => (
                  <TechBadge key={key} value={key} />
                ))}
              </div>
            )}
          </header>

          {project.fullDetails && (
            <article className="hashnode-body text-zinc-700 dark:text-zinc-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {project.fullDetails}
              </ReactMarkdown>
            </article>
          )}

          {project.notes && (
            <section className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-md font-medium mb-4">Notes</h2>
              <div className="hashnode-body text-zinc-700 dark:text-zinc-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.notes}
                </ReactMarkdown>
              </div>
            </section>
          )}

          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <Link
              href="/?tab=projects"
              className="text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              ← back to all projects
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
