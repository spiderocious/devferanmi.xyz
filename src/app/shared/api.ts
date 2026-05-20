import { PORTFOLIO_API_BASE } from "./seo/config";

export type BoardStatus = "backlog" | "in_progress" | "done" | "on_hold";
export type BoardCategory = "goal" | "project" | "learning" | "idea" | string;

export interface SubItem {
  id: string;
  parent_id: string;
  title: string;
  description: string | null;
  status: BoardStatus;
  is_private: boolean;
  position: number;
  created_at: string;
  updated_at: string;
}

export interface BoardItem {
  id: string;
  title: string;
  description: string | null;
  status: BoardStatus;
  category: BoardCategory;
  priority: "high" | "medium" | "low" | null;
  due_date: string | null;
  is_private: boolean;
  position: number;
  created_at: string;
  updated_at: string;
  sub_items: SubItem[];
}

export interface BoardGrouped {
  backlog: BoardItem[];
  in_progress: BoardItem[];
  done: BoardItem[];
  on_hold: BoardItem[];
}

const EMPTY: BoardGrouped = {
  backlog: [],
  in_progress: [],
  done: [],
  on_hold: [],
};

export async function getBoard(): Promise<BoardGrouped> {
  try {
    const res = await fetch(`${PORTFOLIO_API_BASE}/api/board`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return EMPTY;
    const data = (await res.json()) as BoardGrouped;
    return {
      backlog: data.backlog ?? [],
      in_progress: data.in_progress ?? [],
      done: data.done ?? [],
      on_hold: data.on_hold ?? [],
    };
  } catch {
    return EMPTY;
  }
}
