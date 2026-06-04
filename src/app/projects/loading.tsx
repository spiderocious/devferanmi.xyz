/**
 * Streamed instantly while /projects' server component resolves.
 * Mirrors the real layout (header + 3-col card grid) so the swap-in is calm.
 */
export default function ProjectsLoading() {
  return (
    <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <header className="mb-12">
          <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-7 w-32 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mt-6 mb-3" />
          <div className="h-3 w-80 max-w-full rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-2" />
          <div className="h-3 w-64 max-w-full rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 animate-pulse"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-4 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800 mb-2" />
              <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800 mb-4" />
              <div className="flex gap-2">
                <div className="h-3 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-12 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
