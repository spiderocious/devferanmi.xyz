import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { TechBadge, TechKey } from "../../../shared/tech-icon";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  /** Static badge text (e.g., "100+ Creators", "CLI Tool") */
  badge?: string;
  techStack?: TechKey[];
  className?: string;
  impact?: string;
}

export function ProjectCard({
  slug,
  title,
  description,
  badge,
  techStack = [],
  className = "",
  impact = "",
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className={`group block p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ease-out ${className}`}
    >
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <h3 className="text-md font-medium group-hover:underline underline-offset-4">
          {title}
        </h3>
        <ArrowUpRightIcon className="w-4 h-4 shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
        {description}
      </p>

      {impact && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
          {impact}
        </p>
      )}

      {badge && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          {badge}
        </div>
      )}

      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techStack.map((key) => (
            <TechBadge key={key} value={key} />
          ))}
        </div>
      )}
    </Link>
  );
}
