/**
 * Single source of truth for the portfolio tabs.
 *
 * To hide a tab, flip its `enabled` to false — it disappears from the tab bar,
 * its panel stops rendering, and it's no longer a valid `?tab=` value.
 * Order here is the order shown. The first enabled tab is the default.
 */
export type TabKey =
  | "projects"
  | "experience"
  | "technical"
  | "soft"
  | "board";

export interface TabConfig {
  key: TabKey;
  label: string;
  enabled: boolean;
}

export const TABS: TabConfig[] = [
  { key: "projects", label: "Projects", enabled: true },
  { key: "experience", label: "Experience", enabled: false },
  { key: "technical", label: "Technical Skills", enabled: true },
  { key: "soft", label: "Soft Skills", enabled: true },
  { key: "board", label: "Board", enabled: true },
];

export const ENABLED_TABS: TabConfig[] = TABS.filter((t) => t.enabled);
