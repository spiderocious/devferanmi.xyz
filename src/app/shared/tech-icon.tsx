import { ComponentType } from "react";
import {
  Preact,
  TypeScript,
  Nodejs,
  GraphQL,
  Redux,
  SocketIODark,
  Vite,
  TailwindCSS,
  Jest,
  MongoDBDark,
  ExpressjsDark,
  ClaudeAI,
  OpenAIDark,
  ThreejsDark,
  FramerDark,
} from "@ridemountainpig/svgl-react";

export type TechKey =
  | "react"
  | "typescript"
  | "node"
  | "express"
  | "mongodb"
  | "openai"
  | "claude"
  | "tailwind"
  | "vite"
  | "jest"
  | "graphql"
  | "redux"
  | "socketio"
  | "framer-motion"
  | "three"
  | "babylon"
  | "webgl"
  | "microfrontends"
  | "state-machines"
  | "fintech"
  | "currency"
  | "commander"
  | "git"
  | "recharts"
  | "localforage"
  | "tree-shakeable";

type IconComponent = ComponentType<{ className?: string }>;

interface TechEntry {
  label: string;
  Icon?: IconComponent;
}

const TECH_MAP: Record<TechKey, TechEntry> = {
  react: { label: "React", Icon: Preact },
  typescript: { label: "TypeScript", Icon: TypeScript },
  node: { label: "Node.js", Icon: Nodejs },
  express: { label: "Express", Icon: ExpressjsDark },
  mongodb: { label: "MongoDB", Icon: MongoDBDark },
  openai: { label: "OpenAI", Icon: OpenAIDark },
  claude: { label: "Claude", Icon: ClaudeAI },
  tailwind: { label: "Tailwind", Icon: TailwindCSS },
  vite: { label: "Vite", Icon: Vite },
  jest: { label: "Jest", Icon: Jest },
  graphql: { label: "GraphQL", Icon: GraphQL },
  redux: { label: "Redux", Icon: Redux },
  socketio: { label: "Socket.IO", Icon: SocketIODark },
  "framer-motion": { label: "Framer Motion", Icon: FramerDark },
  three: { label: "Three.js", Icon: ThreejsDark },
  babylon: { label: "BabylonJS", Icon: ThreejsDark },
  webgl: { label: "WebGL" },
  microfrontends: { label: "Microfrontends" },
  "state-machines": { label: "State Machines" },
  fintech: { label: "Fintech" },
  currency: { label: "Currency" },
  commander: { label: "Commander.js" },
  git: { label: "Git" },
  recharts: { label: "Recharts" },
  localforage: { label: "LocalForage" },
  "tree-shakeable": { label: "Tree-shakeable" },
};

export function TechIcon({ value, className = "w-4 h-4" }: { value: TechKey; className?: string }) {
  const entry = TECH_MAP[value];
  if (!entry?.Icon) return null;
  const Icon = entry.Icon;
  return <Icon className={className} />;
}

export function TechBadge({ value }: { value: TechKey }) {
  const entry = TECH_MAP[value];
  if (!entry) return null;
  const { label, Icon } = entry;
  return (
    <div className="flex items-center gap-1">
      {Icon && (
        <span className="w-4 h-4 flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </span>
      )}
      <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
    </div>
  );
}
