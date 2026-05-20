/** Lightweight placeholder shown while a tab's content mounts for the first time. */
export function PanelSkeleton() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      aria-hidden="true"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
          <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800 mb-4" />
          <div className="flex gap-2">
            <div className="h-4 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
