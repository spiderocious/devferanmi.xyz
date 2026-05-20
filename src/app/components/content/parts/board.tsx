"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type {
  BoardGrouped,
  BoardItem,
  BoardStatus,
  BoardCategory,
  SubItem,
} from "../../../shared/api";

// Lazy-loaded so the markdown/micromark stack is code-split out of the
// homepage's initial JS — fetched only when a board card is expanded.
const MarkdownBody = dynamic(() => import("./markdown-body"), {
  loading: () => <p className="text-xs text-zinc-500 dark:text-zinc-400">…</p>,
});

const COLUMNS: Array<{ key: BoardStatus; label: string }> = [
  { key: "backlog", label: "Backlog" },
  { key: "in_progress", label: "In Progress" },
  { key: "done", label: "Done" },
  { key: "on_hold", label: "On Hold" },
];

const STATUS_DOT: Record<BoardStatus, string> = {
  backlog: "bg-zinc-400 dark:bg-zinc-500",
  in_progress: "bg-amber-400",
  done: "bg-emerald-400",
  on_hold: "bg-blue-400",
};

const CATEGORY_COLOR: Record<string, string> = {
  goal: "text-blue-600 dark:text-blue-400 border-blue-600/30 dark:border-blue-400/30",
  project:
    "text-emerald-600 dark:text-emerald-400 border-emerald-600/30 dark:border-emerald-400/30",
  learning:
    "text-amber-600 dark:text-amber-400 border-amber-600/30 dark:border-amber-400/30",
  idea: "text-purple-600 dark:text-purple-400 border-purple-600/30 dark:border-purple-400/30",
};

function categoryClass(cat: BoardCategory): string {
  return (
    CATEGORY_COLOR[cat] ??
    "text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700"
  );
}

export function Board({ board }: { board: BoardGrouped }) {
  const total =
    board.backlog.length +
    board.in_progress.length +
    board.done.length +
    board.on_hold.length;

  if (total === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-8 text-sm text-zinc-500 dark:text-zinc-400">
        Board is empty — nothing to show yet.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-md font-medium mb-1">What I&apos;m working on</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Live board — What I&apos;m up to.{" "}
        </p>
      </div>

      {/* Mobile: pilled status switcher */}
      <MobileBoard board={board} />

      {/* Desktop: full kanban */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const hasContent = board[col.key].length > 0;
          if (!hasContent) return null;
          const tasks = board[col.key]?.slice(0, 4) ?? [];
          return (
            <Column
              key={col.key}
              label={col.label}
              status={col.key}
              items={tasks}
            />
          );
        })}
      </div>
    </div>
  );
}

function MobileBoard({ board }: { board: BoardGrouped }) {
  // Default to in_progress; if it's empty, fall back to the first column that has any tasks
  const initial: BoardStatus =
    board.in_progress.length > 0
      ? "in_progress"
      : (COLUMNS.find((c) => board[c.key].length > 0)?.key ?? "in_progress");

  const [active, setActive] = useState<BoardStatus>(initial);
  const items = board[active]?.slice(0, 4) ?? [];

  return (
    <div className="md:hidden">
      {/* Pilled status row */}
      <div
        role="tablist"
        aria-label="Board status"
        className="flex items-center gap-1 p-1 mb-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 overflow-x-auto"
      >
        {COLUMNS.map((col) => {
          const isActive = active === col.key;
          const count = board[col.key].length;
          return (
            <button
              key={col.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(col.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActive
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[col.key]}`}
              />
              <span>{col.label}</span>
              <span
                className={`tabular-nums text-[10px] ${
                  isActive
                    ? "text-zinc-600 dark:text-zinc-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {count.toString().padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active column's cards (no surrounding column chrome — the pill already labels it) */}
      <div className="flex flex-col gap-2.5">
        {items.length === 0 ? (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 py-6 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-md">
            — nothing in this column —
          </p>
        ) : (
          items.map((item) => <Card key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

function Column({
  label,
  status,
  items,
}: {
  label: string;
  status: BoardStatus;
  items: BoardItem[];
}) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col gap-3 min-h-[12rem]">
      <header className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <span className="flex items-center gap-2 text-xs font-medium tracking-wide text-zinc-900 dark:text-zinc-100">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status]}`} />
          {label}
        </span>
        <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
          {items.length.toString().padStart(2, "0")}
        </span>
      </header>

      <div className="flex flex-col gap-2.5">
        {items.length === 0 ? (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 py-3 text-center">
            — empty —
          </p>
        ) : (
          items.map((item) => <Card key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

function Card({ item }: { item: BoardItem }) {
  const [open, setOpen] = useState(false);
  const canExpand = !!item.description || item.sub_items.length > 0;

  return (
    <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <button
        type="button"
        onClick={() => canExpand && setOpen(!open)}
        className={`w-full text-left p-3 ${canExpand ? "cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50" : "cursor-default"} transition-colors`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className={`text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-sm border font-medium ${categoryClass(item.category)}`}
          >
            {item.category}
          </span>
          {item.priority === "high" && (
            <span className="text-[10px] tracking-wider font-semibold text-red-500 dark:text-red-400">
              HIGH
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug line-clamp-3">
          {item.title}
        </p>

        {item.due_date && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5">
            Due{" "}
            {new Date(item.due_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        )}

        {item.sub_items.length > 0 && (
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-2">
            {item.sub_items.length} sub-task
            {item.sub_items.length === 1 ? "" : "s"}
          </p>
        )}
      </button>

      {open && canExpand && (
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
          {item.description && (
            <div className="text-sm text-zinc-600 dark:text-zinc-400 hashnode-body">
              <MarkdownBody>{item.description}</MarkdownBody>
            </div>
          )}
          {item.sub_items.length > 0 && (
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-[10px] tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-2">
                Sub-tasks
              </p>
              <ul className="flex flex-col gap-1.5">
                {item.sub_items.map((sub) => (
                  <SubRow key={sub.id} sub={sub} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SubRow({ sub }: { sub: SubItem }) {
  return (
    <li className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[sub.status]}`}
      />
      <span className="flex-1">{sub.title}</span>
    </li>
  );
}
