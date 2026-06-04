/**
 * Single source of truth for the portfolio tabs.
 *
 * To hide a tab, flip its `enabled` to false — it disappears from the tab bar,
 * its panel stops rendering, and it's no longer a valid `?tab=` value.
 *
 * To make a tab navigate to a different route instead of switching panels,
 * give it an `href` — the tab renders as a link and no panel is required.
 *
 * Order here is the order shown. The first enabled, non-href tab is the default.
 */
export type TabKey =
  | "projects"
  | "experience"
  | "technical"
  | "soft"
  | "board"
  | "talks";

export interface TabConfig {
  key: TabKey;
  label: string;
  enabled: boolean;
  /** When set, clicking the tab navigates to this URL instead of swapping the
   *  panel content. Tabs with `href` don't need a `panels[key]` entry. */
  href?: string;
}

export const TABS: TabConfig[] = [
  { key: "projects", label: "Projects", enabled: true },
  { key: "experience", label: "Experience", enabled: false },
  { key: "technical", label: "Technical Skills", enabled: true },
  { key: "soft", label: "Soft Skills", enabled: true },
  { key: "board", label: "Board", enabled: true },
  { key: "talks", label: "Talks", enabled: true, href: "/talks" },
];

export const ENABLED_TABS: TabConfig[] = TABS.filter((t) => t.enabled);
