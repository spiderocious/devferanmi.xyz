"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MaximizeIcon, PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { cn } from "../shared/utils/cn";

interface DemoVideoProps {
  /** Video source URL (e.g. an R2-hosted MP4). */
  src: string;
  /** Poster image shown before playback / while loading. */
  poster?: string;
  /** Accessible label / caption for the demo. */
  title?: string;
  className?: string;
}

/**
 * Product-demo player that autoplays (muted) when scrolled into view and pauses
 * when it leaves, so it never burns bandwidth off-screen. Honors
 * prefers-reduced-motion by not autoplaying. Exposes play/pause and restart
 * controls that surface on hover or when paused.
 */
export function DemoVideo({ src, poster, title, className }: DemoVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Autoplay/pause based on viewport visibility. Once the user manually
  // pauses (hasInteracted), we stop auto-driving playback so we don't fight them.
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (hasInteracted) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (!prefersReducedMotion) {
            video.play().catch(() => {
              /* autoplay can be blocked; controls remain available */
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasInteracted]);

  // Keep the UI state in sync with the actual <video> element.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setHasInteracted(true);
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const restart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setHasInteracted(true);
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  const enterFullscreen = useCallback(() => {
    const video = videoRef.current as
      | (HTMLVideoElement & { webkitEnterFullscreen?: () => void })
      | null;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    } else if (video.webkitEnterFullscreen) {
      // iOS Safari only supports fullscreen on the video element itself.
      video.webkitEnterFullscreen();
    }
  }, []);

  return (
    <figure
      ref={containerRef}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={title ? `${title} — product demo` : "Product demo"}
        className="block w-full cursor-pointer"
        onClick={togglePlay}
      />

      {/* Control bar — surfaces on hover, and stays visible while paused. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-3 transition-opacity duration-200",
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100",
        )}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause demo" : "Play demo"}
          className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-sm backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4 translate-x-px" />
          )}
        </button>
        <button
          type="button"
          onClick={restart}
          aria-label="Restart demo"
          className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-sm backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          <RotateCcwIcon className="h-4 w-4" />
        </button>
        {title && (
          <span className="pointer-events-none ml-auto truncate text-xs font-medium text-white/90">
            {title}
          </span>
        )}
        <button
          type="button"
          onClick={enterFullscreen}
          aria-label="View demo fullscreen"
          className={cn(
            "pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-sm backdrop-blur transition-transform hover:scale-105 active:scale-95",
            title ? "ml-2" : "ml-auto",
          )}
        >
          <MaximizeIcon className="h-4 w-4" />
        </button>
      </div>
    </figure>
  );
}
