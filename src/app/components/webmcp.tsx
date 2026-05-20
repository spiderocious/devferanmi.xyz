"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ENABLED_TABS, type TabKey } from "./content/tabs-config";

/**
 * WebMCP — exposes a few of the portfolio's actions to in-browser AI agents
 * via the experimental `navigator.modelContext` API
 * (https://webmachinelearning.github.io/webmcp/).
 *
 * The spec is still early, so everything is feature-detected and type-shimmed
 * locally; on browsers/agents without WebMCP this component is inert.
 */

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (args: Record<string, unknown>) => Promise<{
    content: Array<{ type: "text"; text: string }>;
  }>;
}

interface ModelContext {
  provideContext: (ctx: { tools: WebMcpTool[] }) => void;
}

function getModelContext(): ModelContext | null {
  if (typeof navigator === "undefined") return null;
  const mc = (navigator as Navigator & { modelContext?: ModelContext })
    .modelContext;
  return mc && typeof mc.provideContext === "function" ? mc : null;
}

export function WebMcp() {
  const router = useRouter();

  useEffect(() => {
    const mc = getModelContext();
    if (!mc) return;

    const tabKeys = ENABLED_TABS.map((t) => t.key);
    const tabList = ENABLED_TABS.map((t) => `"${t.key}" (${t.label})`).join(
      ", ",
    );

    const tools: WebMcpTool[] = [
      {
        name: "navigate_to_section",
        description:
          `Switch the portfolio to one of its sections. Available sections: ${tabList}.`,
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: tabKeys,
              description: "The section to open.",
            },
          },
          required: ["section"],
        },
        execute: async (args) => {
          const section = String(args.section) as TabKey;
          if (!tabKeys.includes(section)) {
            return {
              content: [
                {
                  type: "text",
                  text: `Unknown section "${section}". Valid sections: ${tabKeys.join(", ")}.`,
                },
              ],
            };
          }
          router.replace(`/?tab=${section}`, { scroll: false });
          return {
            content: [{ type: "text", text: `Opened the ${section} section.` }],
          };
        },
      },
      {
        name: "open_ai_assistant",
        description:
          "Open feranmi.ai, an AI assistant grounded in Feranmi Adeniji's work, experience, and opinions.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          router.push("/llm");
          return {
            content: [
              { type: "text", text: "Opened the feranmi.ai assistant at /llm." },
            ],
          };
        },
      },
      {
        name: "get_portfolio_markdown",
        description:
          "Fetch the full portfolio (bio, experience, projects, links) as Markdown.",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          const res = await fetch("/index.md", {
            headers: { Accept: "text/markdown" },
          });
          const text = await res.text();
          return { content: [{ type: "text", text }] };
        },
      },
    ];

    mc.provideContext({ tools });
  }, [router]);

  return null;
}
