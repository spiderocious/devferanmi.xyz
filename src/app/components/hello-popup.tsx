"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SparklesIcon, XIcon } from "lucide-react";

const STORAGE_KEY = "feranmi_hello_dismissed";
const DELAY_MS = 3000;

const PROMPTS = [
  "What is he working on?",
  "Is he open to work?",
  "What's his tech stack?",
];

export function HelloPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Decide whether to schedule the popup. Skips on /llm, on mobile/coarse
  // pointers, when reduced motion is set, and when the user already dismissed
  // it this session.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/llm")) return;

    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    if (!fine || !wideEnough) return;

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      // sessionStorage blocked — fail open, show once
    }

    queueMicrotask(() => setMounted(true));
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  };

  if (!mounted || pathname?.startsWith("/llm")) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`hidden md:block fixed bottom-20 right-5 sm:bottom-24 sm:right-6 z-40 w-80 transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl p-4">
        {/* Speech-bubble tail pointing toward the trigger */}
        <span
          aria-hidden
          className="absolute -bottom-1.5 right-8 w-3 h-3 rotate-45 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800"
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <XIcon className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center shrink-0">
            <SparklesIcon className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wide">
            feranmi.ai
          </span>
        </div>

        <p className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed mb-3">
          Hey 👋 nice to meet you. What do you want to know about me?
        </p>

        <div className="flex flex-col gap-1.5">
          {PROMPTS.map((p) => (
            <Link
              key={p}
              href={`/llm?q=${encodeURIComponent(p)}`}
              prefetch
              onClick={dismiss}
              className="text-left text-xs text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-md px-3 py-2 transition-colors"
            >
              {p}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={dismiss}
          className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          not now
        </button>
      </div>
    </div>
  );
}
