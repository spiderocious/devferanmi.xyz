"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Thin wrapper around react-markdown. Isolated in its own module so the board
 * can pull it in via `next/dynamic` — keeping the ~42 KB markdown/micromark
 * stack out of the homepage's initial bundle until a board card is expanded.
 */
export default function MarkdownBody({ children }: { children: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>;
}
