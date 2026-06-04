/**
 * Streamed instantly while /projects/[slug] resolves. The detail page is the
 * heaviest route (it ships fullDetails + notes markdown) so the skeleton
 * matters most here.
 */
export default function ProjectDetailLoading() {
  return (
    <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
        <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

        <header className="mt-8 mb-8">
          <div className="h-3 w-20 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-3" />
          <div className="h-10 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-4" />
          <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-2" />
          <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse mb-2" />
          <div className="h-3 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="flex flex-wrap gap-2 mt-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-16 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse"
              />
            ))}
          </div>
        </header>

        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse ${
                i % 4 === 3 ? "w-2/3" : "w-full"
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
