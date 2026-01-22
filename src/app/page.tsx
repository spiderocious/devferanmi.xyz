import Content from "./components/content";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col">
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <Header />
        <Content />
      </main>
    </div>
  );
}
