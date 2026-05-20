"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  Loader2,
  RefreshCwIcon,
  SparklesIcon,
  SquareIcon,
} from "lucide-react";
import { useLlmChat } from "./use-llm-chat";

const STARTERS = [
  "What is Feranmi working on right now?",
  "Tell me about his fintech work.",
  "What's his tech stack?",
  "Is he open to work?",
];

export function LlmChat() {
  const {
    messages,
    streaming,
    error,
    suggestions,
    hydrating,
    send,
    stop,
    reset,
  } = useLlmChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isEmpty = !hydrating && messages.length === 0;

  // Pin to bottom when content changes
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-grow the textarea to fit its content (capped by max-height in CSS).
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [input]);

  // Deep-link: if /llm?q=… is set and the conversation is empty post-hydration,
  // auto-send the prompt so visitors land mid-conversation from the hello popup.
  const searchParams = useSearchParams();
  const deepLinkQuery = searchParams.get("q");
  const deepLinkSentRef = useRef(false);
  useEffect(() => {
    if (deepLinkSentRef.current) return;
    if (hydrating) return;
    if (messages.length > 0) return;
    if (!deepLinkQuery || streaming) return;
    deepLinkSentRef.current = true;
    void send(deepLinkQuery);
  }, [hydrating, messages.length, deepLinkQuery, streaming, send]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || streaming) return;
    const value = input;
    setInput("");
    void send(value);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent);
    }
  }

  function handleStarter(text: string) {
    if (streaming) return;
    setInput("");
    void send(text);
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Back to portfolio"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="hidden sm:inline">back</span>
          </Link>
          <span className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-2.5">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium">feranmi.ai</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-300 hidden sm:inline">
              · ask me anything
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          title="Start a new chat"
        >
          <RefreshCwIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">new chat</span>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {hydrating ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />
          </div>
        ) : isEmpty ? (
          <EmptyState onPick={handleStarter} />
        ) : (
          <div className="flex flex-col gap-5 max-w-2xl mx-auto mb-16">
            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-4 py-2.5 text-[10px] sm:text-sm whitespace-pre-wrap wrap-break-word">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center shrink-0">
                    <SparklesIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0 text-[8px] sm:text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed break-words">
                    {m.content ? (
                      <AssistantMarkdown content={m.content} />
                    ) : (
                      <span className="inline-flex gap-1 items-center text-zinc-500 dark:text-zinc-400">
                        <Dot delay={0} />
                        <Dot delay={150} />
                        <Dot delay={300} />
                      </span>
                    )}
                  </div>
                </div>
              )
            )}

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400 px-1">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Suggestions */}
      {!isEmpty && suggestions.length > 0 && !streaming && (
        <div className="px-5 pb-2 flex flex-wrap gap-2 max-w-2xl mx-auto w-full">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleStarter(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <form
        onSubmit={onSubmit}
        className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4"
      >
        <div className="max-w-2xl mx-auto flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={streaming}
            rows={1}
            placeholder="Ask anything about Feranmi…"
            maxLength={2000}
            className="flex-1 resize-none bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 outline-none disabled:opacity-60 max-h-40 overflow-y-auto"
            style={{ minHeight: 24 }}
          />
          {streaming ? (
            <button
              type="button"
              onClick={stop}
              className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Stop"
            >
              <SquareIcon className="w-3.5 h-3.5" fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Send"
            >
              <ArrowUpIcon className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 text-center mt-2">
          Grounded in Feranmi&apos;s actual work, experience &amp; opinions.
          10 messages / 10 min per visitor.
        </p>
      </form>
    </div>
  );
}

const CAN_ASK = [
  "His current role and what he's shipping at Moniepoint.",
  "Open-source work — Connectic, Monie Utils, and more.",
  "Fintech experience: payments, KYC, loan management.",
  "Frontend specialism — micro-frontends, design systems, performance.",
  "Whether he's open to new roles, and what kind.",
];

function EmptyState({ onPick }: { onPick: (s: string) => void }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center mb-5">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-3">
          Ask me anything.
        </h2>
        <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 max-w-lg mb-8">
          I&apos;m an AI grounded in Feranmi&apos;s actual work, experience, and
          opinions. Ask about his projects, his stack, his fintech background,
          his open-source work, or whether he&apos;s open to new roles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mb-10">
          {STARTERS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onPick(s)}
              className="text-left text-sm text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 rounded-lg px-4 py-3 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="w-full text-left border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <h3 className="text-xs font-medium tracking-wide uppercase text-zinc-500 dark:text-zinc-400 mb-3">
            What you can ask
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
            {CAN_ASK.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-zinc-400 dark:text-zinc-500 shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-5">
            Grounded in a private system context written by Feranmi himself —
            his work history, products shipped, and what he&apos;s working on
            next. For anything else, email{" "}
            <a
              href="mailto:devferanmi@gmail.com"
              className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              devferanmi@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400 animate-bounce"
      style={{ animationDelay: `${delay}ms` }}
    />
  );
}

function AssistantMarkdown({ content }: { content: string }) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-zinc-900 dark:text-zinc-100 hover:opacity-80"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
