"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Thin top progress bar for App Router navigations.
 *
 * The App Router doesn't expose a "navigation started" event, so we listen
 * for clicks on same-origin <a> elements (including <Link>) at the document
 * level and show the bar immediately. We then hide it once the pathname /
 * search params actually change (the navigation completed) — or after a
 * safety timeout if it didn't (e.g. blocked by a guard).
 */
export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const navKey = `${pathname}?${searchParams.toString()}`;
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastKeyRef = useRef(navKey);

  // When a navigation completes (key changes), finish the bar.
  useEffect(() => {
    if (lastKeyRef.current === navKey) return;
    lastKeyRef.current = navKey;
    if (!active) return;
    // Snap to 100 on the next microtask (avoids the sync-setState-in-effect
    // rule), then fade out after a short delay.
    queueMicrotask(() => setProgress(100));
    const t = setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 220);
    return () => clearTimeout(t);
  }, [navKey, active]);

  // Start the bar in response to any same-origin link click.
  useEffect(() => {
    function start() {
      if (active) return;
      setActive(true);
      setProgress(8);
      // Eased ticker that creeps toward ~85% — fast at first, slows down.
      if (tickerRef.current) clearInterval(tickerRef.current);
      tickerRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 85) return p;
          const remaining = 85 - p;
          return p + Math.max(0.4, remaining * 0.08);
        });
      }, 120);
      // Safety net: if the navigation never resolves, hide after 8s.
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = setTimeout(() => {
        setActive(false);
        setProgress(0);
      }, 8000);
    }

    function onClick(e: MouseEvent) {
      // Only left-click, no modifier keys (so cmd/ctrl/shift open-in-tab still works natively).
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const target = e.target as Element | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return;
      // Same-origin only — external links open the browser's own loader.
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        // Skip if the click is just to the same exact URL (no nav happens).
        const currentFull = `${window.location.pathname}${window.location.search}`;
        const nextFull = `${url.pathname}${url.search}`;
        if (currentFull === nextFull) return;
      } catch {
        return;
      }
      start();
    }

    function onPopState() {
      start();
    }

    document.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", onPopState);
      if (tickerRef.current) clearInterval(tickerRef.current);
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, [active]);

  // Stop the ticker once the bar is dismissed.
  useEffect(() => {
    if (active) return;
    if (tickerRef.current) {
      clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, [active]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: active ? 1 : 0,
        transition: "opacity 240ms ease 80ms",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background:
            "linear-gradient(90deg, rgba(59,130,246,0.0) 0%, #3b82f6 30%, #6366f1 100%)",
          boxShadow: "0 0 8px rgba(99,102,241,0.6)",
          transition: "width 160ms ease-out",
        }}
      />
    </div>
  );
}
