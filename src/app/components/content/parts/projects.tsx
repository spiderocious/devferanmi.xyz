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

import { ProjectCard } from "./project-card";

export default function Projects() {
  const projects = [
    {
      title: "BuffByte AI",
      description:
        "AI-powered content optimization platform with real-time analysis, trend discovery, and professional teleprompter. Multi-platform optimization for YouTube, TikTok, Instagram.",
      badge: "100+ Creators",
      impacts:
        "Built for content creators to optimize their videos with AI-powered suggestions, increasing engagement by 25-40%.",
      links: [{ url: "https://buffbyteai.xyz/", label: "Demo" }],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "GraphQL", icon: <GraphQL className="w-4 h-4" /> },
        { name: "Claude AI", icon: <ClaudeAI className="w-4 h-4" /> },
      ],
    },
    {
      title: "WordShot",
      description:
        "Real-time multiplayer word game with 98% mobile session recovery. Three-layer WebSocket architecture, comprehensive gamification with 24+ tracked metrics.",
      badge: "400 Users • 10K+ Games",
      impacts:
        "Production game serving 400 active users with 10,000+ games played. Features three-layer reconnection strategy achieving 98% session recovery on mobile.",
      links: [
        { url: "https://wordshot.netlify.app", label: "Play" },
        { url: "https://github.com/spiderocious/wordshot", label: "GitHub" },
      ],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Socket.IO", icon: <SocketIODark className="w-4 h-4" /> },
        { name: "Framer Motion", icon: <FramerDark className="w-4 h-4" /> },
        { name: "Node.js", icon: <Nodejs className="w-4 h-4" /> },
        { name: "MongoDB", icon: <MongoDBDark className="w-4 h-4" /> },
      ],
    },
    {
      title: "MARTECH3D",
      description:
        "Enterprise 3D model viewer with client-side encryption, comprehensive analytics, interactive hotspots, and AR support. GDPR-compliant tracking.",
      badge: "1000+ Enterprise Users",
      impacts:
        "Serving 1000+ enterprise users with XOR-based content protection, session-based analytics, and multi-format 3D support (GLB, STEP, USDZ).",
      links: [{ url: "https://martech3d.com", label: "Demo" }],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "BabylonJS", icon: <ThreejsDark className="w-4 h-4" /> },
        { name: "Redux", icon: <Redux className="w-4 h-4" /> },
      ],
    },
    {
      title: "Connectic",
      description:
        "Framework-agnostic microfrontend communication library. Event-driven pub/sub, reactive state management, request/response patterns with caching.",
      badge: "3,000+ Downloads",
      impacts:
        "Open-source NPM package with 3,000+ downloads. Used in production microfrontend architectures for seamless cross-framework communication.",
      links: [
        { url: "https://connectic.devferanmi.xyz/", label: "Docs" },
        { url: "https://www.npmjs.com/package/connectic", label: "NPM" },
        { url: "http://github.com/spiderocious/connectic", label: "GitHub" },
      ],
      techStack: [
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Microfrontends" },
        { name: "State Machines" },
      ],
    },
    {
      title: "Monie Utils",
      description:
        "Comprehensive TypeScript money utilities for fintech. 20+ currencies with African market focus, banker's rounding, loan calculations, zero dependencies.",
      badge: "5,000+ Downloads",
      impacts:
        "Production-ready fintech utilities with 5,000+ downloads. Supports Nigerian Naira, Kenyan Shilling, and 20+ currencies with precise calculations.",
      links: [
        { url: "https://monieutils.devferanmi.xyz/", label: "Docs" },
        { url: "https://www.npmjs.com/package/monie-utils", label: "NPM" },
        { url: "https://github.com/spiderocious/monie-utils", label: "GitHub" },
      ],
      techStack: [
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Fintech" },
        { name: "Currency" },
      ],
    },
    {
      title: "Meemaw",
      description:
        "React utility component library with 9 components. Declarative conditional rendering, iteration, time-based display. 100% test coverage, ~7KB bundle.",
      badge: "NPM Package",
      impacts:
        "Zero-dependency React library eliminating repetitive JSX patterns. Features Show, Switch/Case, Repeat, Hidden, Clamp, CopyToClipboard components.",
      links: [
        { url: "https://www.npmjs.com/package/meemaw", label: "NPM" },
        { url: "https://github.com/spiderocious/meemaw", label: "GitHub" },
      ],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Jest", icon: <Jest className="w-4 h-4" /> },
        { name: "Tree-shakeable" },
      ],
    },
    {
      title: "Pullee",
      description:
        "Git branch synchronization CLI with conflict-aware merging, desktop notifications, and comprehensive statistics tracking. Three-layer architecture.",
      badge: "CLI Tool",
      impacts:
        "Automates Git branch synchronization with pre-merge conflict detection, event logging, and desktop notifications. Saves 50+ hours annually per team.",
      links: [
        { url: "https://github.com/spiderocious/pullee", label: "GitHub" },
      ],
      techStack: [
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Node.js", icon: <Nodejs className="w-4 h-4" /> },
        { name: "Commander.js" },
        { name: "Git" },
      ],
    },
    {
      title: "Ajala AI SDK",
      description:
        "Unified TypeScript SDK for Claude and OpenAI integration. Smart JSON parsing with auto-fix, schema validation, variable interpolation.",
      badge: "Multi-Provider SDK",
      impacts:
        "Single API for multiple AI providers with automatic JSON repair, comprehensive schema validation, and 28 error codes for debugging.",
      links: [
        {
          url: "https://github.com/spiderocious/ajala-ai-sdk",
          label: "GitHub",
        },
      ],
      techStack: [
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Claude", icon: <ClaudeAI className="w-4 h-4" /> },
        { name: "OpenAI", icon: <OpenAIDark className="w-4 h-4" /> },
      ],
    },
    {
      title: "MoneyWrapped",
      description:
        "Spotify Wrapped for your finances. Upload bank statements and get AI-powered spending analysis, category breakdowns, and shareable year-end summaries.",
      badge: "Full-Stack App",
      impacts:
        "AI-powered financial analytics transforming bank statements into engaging visualizations with Nigerian bank support (Moniepoint, OPay, GTBank).",
      links: [
        {
          url: "https://github.com/spiderocious/moneywrapped-frontend",
          label: "GitHub Frontend",
        },
        {
          url: "https://github.com/spiderocious/moneywrapped-backend",
          label: "GitHub Backend",
        },
      ],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Node.js", icon: <Nodejs className="w-4 h-4" /> },
        { name: "MongoDB", icon: <MongoDBDark className="w-4 h-4" /> },
        { name: "GraphQL", icon: <GraphQL className="w-4 h-4" /> },
        { name: "OpenAI", icon: <OpenAIDark className="w-4 h-4" /> },
      ],
    },
    {
      title: "Match Maker Web",
      description:
        "Modern dating platform frontend with 24-component UI library, feature-based architecture, and responsive design. Ready for backend integration.",
      badge: "React App",
      impacts:
        "Production-ready React dating platform with comprehensive component library including Avatar, Card, MessageBubble, and form components.",
      links: [
        {
          url: "https://github.com/spiderocious/matchmaker-web",
          label: "GitHub",
        },
      ],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Vite", icon: <Vite className="w-4 h-4" /> },
        { name: "Tailwind", icon: <TailwindCSS className="w-4 h-4" /> },
        { name: "Jest", icon: <Jest className="w-4 h-4" /> },
      ],
    },
    {
      title: "Dondie",
      description:
        "AI-powered nail health analysis app. Capture nail images and get health indicators, severity assessments, and personalized recommendations.",
      badge: "AI Health App",
      impacts:
        "Vision AI integration using GPT-4o-mini for nail health analysis with camera capture, health indicator detection, and recommendation generation.",
      links: [
        { url: "https://nailtechapp.netlify.app/", label: "Demo" },
      ],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Express", icon: <ExpressjsDark className="w-4 h-4" /> },
        { name: "OpenAI", icon: <OpenAIDark className="w-4 h-4" /> },
      ],
    },
    {
      title: "GLTF Handler",
      description:
        "JavaScript library for dynamic 3D texture swapping. Real-time material customization for product configurators and interactive 3D experiences.",
      badge: "3D Library",
      impacts:
        "Enables runtime texture swapping in GLTF/GLB models without re-export. Perfect for e-commerce configurators and interactive 3D applications.",
      techStack: [
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Three.js", icon: <ThreejsDark className="w-4 h-4" /> },
        { name: "WebGL" },
      ],
    },
    {
      title: "Fuel Tracker",
      description:
        "Vehicle mileage and fuel tracking app with analytics dashboard, CSV import/export, and MPG calculations. Offline-first with LocalForage.",
      badge: "React App",
      impacts:
        "Client-side vehicle tracking with comprehensive analytics including actual vs. estimated MPG, cost per mile, and fuel price trends.",
      links: [
        {url: "https://bentirol.netlify.app/", label: "Demo" },
        { url: "https://github.com/spiderocious/fuel-tracker", label: "GitHub" },
      ],
      techStack: [
        { name: "React", icon: <Preact className="w-4 h-4" /> },
        { name: "TypeScript", icon: <TypeScript className="w-4 h-4" /> },
        { name: "Vite", icon: <Vite className="w-4 h-4" /> },
        { name: "Recharts" },
        { name: "LocalForage" },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.title}
          title={project.title}
          description={project.description}
          links={project.links}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          badge={project.badge as any}
          techStack={project.techStack}
        />
      ))}
    </div>
  );
}
