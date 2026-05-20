"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SparklesIcon } from "lucide-react";

export function LlmFloatingTrigger() {
  const pathname = usePathname();
  if (pathname?.startsWith("/llm")) return null;

  return (
    <Link
      href="/llm"
      prefetch
      aria-label="Ask me anything — Feranmi.ai"
      title="Ask me anything — Feranmi.ai"
      data-llm-trigger
      className="llm-trigger-bounce fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 shadow-lg hover:shadow-xl active:scale-95 transition-shadow"
    >
      <span className="relative flex items-center justify-center w-5 h-5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping" />
        <SparklesIcon className="w-4 h-4 relative" />
      </span>
      <span className="text-sm font-medium">Ask me anything</span>
    </Link>
  );
}
