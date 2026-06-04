"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRightIcon,
  MicIcon,
  PresentationIcon,
  QuoteIcon,
} from "lucide-react";
import type { Talk, TalkType } from "../shared/talks";

type Filter = "all" | TalkType;

const FILTERS: Array<{ key: Filter; label: string }> = [
  { key: "all", label: "All" },
  { key: "talk", label: "Talks" },
  { key: "workshop", label: "Workshops" },
];

export function TalksGrid({ talks }: { talks: Talk[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return talks;
    return talks.filter((t) => t.type === filter);
  }, [filter, talks]);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter talks"
        className="flex items-center gap-1 p-1 mb-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 w-fit"
      >
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          const count =
            f.key === "all"
              ? talks.length
              : talks.filter((t) => t.type === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {f.label}
              <span
                className={`tabular-nums text-[10px] ${
                  isActive
                    ? "text-zinc-500 dark:text-zinc-400"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {count.toString().padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-sm text-zinc-500 dark:text-zinc-400 text-center">
          No sessions in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((talk) => (
            <TalkCard key={talk.url} talk={talk} />
          ))}
        </div>
      )}
    </>
  );
}

function TalkCard({ talk }: { talk: Talk }) {
  const Icon = talk.type === "workshop" ? PresentationIcon : MicIcon;
  const typeLabel = talk.type === "workshop" ? "Workshop" : "Talk";
  const meta = [talk.event, talk.year, talk.location].filter(Boolean).join(" · ");

  return (
    <a
      href={talk.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ease-out"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-medium text-zinc-500 dark:text-zinc-400">
          <Icon className="w-3 h-3" />
          {typeLabel}
        </div>
        <ArrowUpRightIcon className="w-4 h-4 shrink-0 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>

      <h2 className="text-md md:text-lg font-medium tracking-tight mb-1 leading-snug group-hover:underline underline-offset-4 text-zinc-900 dark:text-zinc-100">
        {talk.title}
      </h2>

      {meta && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{meta}</p>
      )}

      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-4 mb-4">
        {talk.intro.split("\n\n")[0]}
      </p>

      <blockquote className="relative pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 mb-4">
        <QuoteIcon className="absolute -left-1 -top-1 w-2.5 h-2.5 text-zinc-300 dark:text-zinc-700" />
        <p className="text-xs italic text-zinc-500 dark:text-zinc-400 line-clamp-3">
          {talk.excerpt}
        </p>
      </blockquote>

      {talk.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {talk.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
        View slides
        <ArrowUpRightIcon className="w-3 h-3" />
      </div>
    </a>
  );
}
