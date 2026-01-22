import { LinkPreview } from "../../link-preview";
import { ReactNode } from "react";

interface ProjectLink {
  url: string;
  label: string;
}

interface TechStack {
  name: string;
  icon?: ReactNode;
}

interface ProjectCardProps {
  title: string;
  description: string;
  links?: ProjectLink[];
  /** Static badge text (e.g., "100+ Creators", "CLI Tool") - shown when no links */
  badge?: string;
  techStack?: TechStack[];
  className?: string;
  impact?: string;
}

export function ProjectCard({
  title,
  description,
  links = [],
  badge,
  techStack = [],
  className = "",
  impact = "",
}: ProjectCardProps) {
  return (
    <div
      className={`group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ease-out ${className}`}
    >
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-md font-medium">{title}</h3>

        <div className="flex flex-row gap-2">
          {links.map((link) => (
            <LinkPreview key={link.url} url={link.url}>
              <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                {link.label}
              </span>
            </LinkPreview>
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
        {description}
      </p>

      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
        {impact}
      </p>

      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{badge}</div>

      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <div key={tech.name} className="flex items-center gap-1">
              {tech.icon && (
                <span className="w-4 h-4 flex items-center justify-center">
                  {tech.icon}
                </span>
              )}
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
