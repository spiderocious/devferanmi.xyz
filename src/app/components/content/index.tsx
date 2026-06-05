import Projects from "./parts/projects";
import { Jobs } from "./parts/jobs";
import { Board } from "./parts/board";
import { Tools } from "./parts/tools";
import { SoftSkills } from "./parts/soft-skills";
import { getBoard } from "../../shared/api";
import { AppShell } from "../app-shell";
import Header from "../header";

export default async function Content() {
  const board = await getBoard();

  return (
    <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <AppShell
          header={<Header />}
          panels={{
            projects: <Projects />,
            experience: <Jobs />,
            technical: <Tools />,
            soft: <SoftSkills />,
            board: <Board board={board} />,
          }}
        />
        {/* SeoBio is rendered from page.tsx (outside the Suspense) so its
            crawlable copy appears in the SSR HTML, not just after hydration. */}
      </main>
    </div>
  );
}
