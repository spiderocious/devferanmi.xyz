"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { PanelSkeleton } from "./panel-skeleton";
import { ENABLED_TABS, type TabKey } from "./content/tabs-config";

// Tabs that own a panel (no href). Outbound-link tabs are excluded from the
// active-tab logic since they don't represent a panel state.
const PANEL_TABS = ENABLED_TABS.filter((t) => !t.href);
const VALID_KEYS = new Set<string>(PANEL_TABS.map((t) => t.key));
const DEFAULT_TAB: TabKey = PANEL_TABS[0]?.key ?? "projects";
const LABELS: Partial<Record<TabKey, string>> = Object.fromEntries(
  ENABLED_TABS.map((t) => [t.key, t.label])
);

function isEnabledTab(value: string | null): value is TabKey {
  return !!value && VALID_KEYS.has(value);
}

const triggerCls =
  "!bg-transparent !border-none !shadow-none !font-medium data-[state=active]:!bg-white dark:data-[state=active]:!bg-zinc-800 data-[state=active]:!text-zinc-900 dark:data-[state=active]:!text-zinc-100 !text-zinc-600 dark:!text-zinc-400 transition-all duration-300 ease-out";

export function AppShell({
  header,
  panels,
}: {
  header: ReactNode;
  panels: Partial<Record<TabKey, ReactNode>>;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  // Read URL state lazily — null on the server (no `?tab=` available without a
  // Suspense boundary that would blank out SSR), real on the client. The shell
  // renders with the default tab on first paint so crawlers see the full nav,
  // then syncs to the URL on hydration.
  const tabParam = searchParams.get("tab");
  const tab: TabKey = isEnabledTab(tabParam) ? tabParam : DEFAULT_TAB;
  const focus = searchParams.get("focus") === "true";

  // Track which panels have ever been the active tab. A panel's heavy content
  // is only built the first time it's opened; afterwards it stays mounted
  // (hidden when inactive) so re-visits are instant and there's no layout shift.
  const [mounted, setMounted] = useState<Set<TabKey>>(() => new Set([tab]));

  // Mark the current tab as visited. Deferred via a transition so flipping the
  // active tab (the highlight) stays instant while the heavy panel renders as a
  // non-urgent update — the skeleton shows in the meantime.
  useEffect(() => {
    if (mounted.has(tab)) return;
    startTransition(() => {
      setMounted((prev) => {
        if (prev.has(tab)) return prev;
        const next = new Set(prev);
        next.add(tab);
        return next;
      });
    });
  }, [tab, mounted]);

  const buildUrl = useCallback(
    (next: { tab?: TabKey; focus?: boolean | null }) => {
      const sp = new URLSearchParams(searchParams.toString());
      if (next.tab) sp.set("tab", next.tab);
      if (next.focus === false || next.focus === null) sp.delete("focus");
      if (next.focus === true) sp.set("focus", "true");
      const qs = sp.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname, searchParams]
  );

  const onTabChange = useCallback(
    (value: string) => {
      if (!isEnabledTab(value)) return;
      router.replace(buildUrl({ tab: value }), { scroll: false });
    },
    [router, buildUrl]
  );

  const exitFocus = useCallback(() => {
    router.replace(buildUrl({ focus: false }), { scroll: false });
  }, [router, buildUrl]);

  const focusTitle = useMemo(() => LABELS[tab], [tab]);

  return (
    <>
      {!focus && header}

      <section>
        {focus ? (
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={exitFocus}
              className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
            >
              <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>back to overview</span>
            </button>
            <h2 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {focusTitle}
            </h2>
          </div>
        ) : null}

        <Tabs
          value={tab}
          onValueChange={onTabChange}
          className="flex flex-col gap-4"
        >
          {!focus && (
            <TabsList className="text-muted-foreground inline-flex h-10 w-full lg:w-fit items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-1">
              {ENABLED_TABS.map((t) => {
                if (t.href && t.external) {
                  return (
                    <a
                      key={t.key}
                      href={t.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${triggerCls} inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1 text-sm`}
                    >
                      {t.label}
                      <ArrowUpRightIcon className="w-3 h-3 opacity-60" />
                    </a>
                  );
                }
                if (t.href) {
                  return (
                    <Link
                      key={t.key}
                      href={t.href}
                      prefetch
                      className={`${triggerCls} inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-1 text-sm`}
                    >
                      {t.label}
                      <ArrowUpRightIcon className="w-3 h-3 opacity-60" />
                    </Link>
                  );
                }
                return (
                  <TabsTrigger key={t.key} value={t.key} className={triggerCls}>
                    {t.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          )}

          {/* Lazy keep-alive: a panel renders its real content only once it has
              been visited (`mounted`), then stays in the DOM (hidden when
              inactive) so re-visits are instant and there's no layout shift.
              The active-but-not-yet-mounted tab shows a skeleton. */}
          {PANEL_TABS.map((t) => {
            const isActive = t.key === tab;
            const isMounted = mounted.has(t.key);
            return (
              <TabsContent
                key={t.key}
                value={t.key}
                forceMount
                className="flex-1 outline-none mt-8 data-[state=inactive]:hidden"
              >
                {/* Sr-only section heading anchors each panel's h3s under an h2,
                    keeping the document heading order sequential (h1→h2→h3). */}
                <h2 className="sr-only">{t.label}</h2>
                {isMounted ? (
                  panels[t.key]
                ) : isActive ? (
                  <PanelSkeleton />
                ) : null}
              </TabsContent>
            );
          })}
        </Tabs>
      </section>
    </>
  );
}
