import talksData from "../../data/talks.json";

export type TalkType = "talk" | "workshop";

export interface Talk {
  title: string;
  event: string | null;
  year: string | null;
  location: string | null;
  type: TalkType;
  url: string;
  intro: string;
  excerpt: string;
  tags: string[];
}

const TALKS: Talk[] = talksData as Talk[];

export function getAllTalks(): Talk[] {
  return TALKS;
}

/** Counts grouped by type — useful for the page header. */
export function getTalkStats() {
  const total = TALKS.length;
  const workshops = TALKS.filter((t) => t.type === "workshop").length;
  const talks = total - workshops;
  return { total, talks, workshops };
}
