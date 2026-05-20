import { ComponentType } from "react";
import { Github, Globe, Package, BookOpen, Play } from "lucide-react";
import { LinkPreview } from "../components/link-preview";

export type LinkType = "github" | "demo" | "npm" | "docs" | "play";

interface LinkTypeEntry {
  Icon: ComponentType<{ className?: string }>;
  defaultLabel: string;
}

const LINK_TYPES: Record<LinkType, LinkTypeEntry> = {
  github: { Icon: Github, defaultLabel: "GitHub" },
  demo: { Icon: Globe, defaultLabel: "Demo" },
  npm: { Icon: Package, defaultLabel: "NPM" },
  docs: { Icon: BookOpen, defaultLabel: "Docs" },
  play: { Icon: Play, defaultLabel: "Play" },
};

export interface ProjectLinkData {
  type: LinkType;
  url: string;
  label?: string;
}

export function ProjectLink({ type, url, label }: ProjectLinkData) {
  const { Icon, defaultLabel } = LINK_TYPES[type];
  return (
    <LinkPreview url={url}>
      <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
        <Icon className="w-3 h-3" />
        {label ?? defaultLabel}
      </span>
    </LinkPreview>
  );
}
