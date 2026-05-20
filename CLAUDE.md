# CLAUDE.md

Personal portfolio site for Oluwaferanmi Adeniji — a single-page Next.js App Router site that showcases bio, projects, work experience, and tools. Deployed to Netlify (see [netlify.toml](netlify.toml)).

## Stack

- **Next.js 16** (App Router) on **React 19**, **TypeScript 5**, target ES2017
- **Tailwind CSS v4** via `@tailwindcss/postcss` (config is CSS-first in [src/app/globals.css](src/app/globals.css), no `tailwind.config.*`)
- **Radix UI** primitives (used via `radix-ui` and `@radix-ui/react-tabs`)
- **lucide-react** for icons, **@ridemountainpig/svgl-react** for tech-stack logos
- **jsdom** for server-side OG metadata parsing
- `cn()` helper combines `clsx` + `tailwind-merge` — [src/app/shared/utils/cn.ts](src/app/shared/utils/cn.ts)

## Commands

- `npm run dev` — Next dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config in [eslint.config.mjs](eslint.config.mjs), extends `eslint-config-next` core-web-vitals + typescript)

## Structure

Everything lives under [src/app/](src/app/) (App Router):

- [page.tsx](src/app/page.tsx) — the only route; composes `<Header />` and `<Content />`
- [layout.tsx](src/app/layout.tsx) — root layout. SEO meta tags, OG/Twitter cards, PWA manifest link, and Geist Sans/Mono fonts are wired here
- [components/header/](src/app/components/header/) — bio block + social links
- [components/content/](src/app/components/content/) — tabbed body (Projects / Experience / Tools)
  - [parts/projects.tsx](src/app/components/content/parts/projects.tsx) — project data lives inline as an array, rendered via [project-card.tsx](src/app/components/content/parts/project-card.tsx)
  - [parts/jobs.tsx](src/app/components/content/parts/jobs.tsx) — job history data inline, rendered via [job-card.tsx](src/app/components/content/parts/job-card.tsx)
- [components/tabs/](src/app/components/tabs/) — thin Radix Tabs wrapper using `cn()`
- [components/link-preview/](src/app/components/link-preview/) — `<LinkPreview>` client component that shows an OG preview popover on hover; lazy-fetches from the OG endpoint, supports a `data` prop for static preloads and a `showPreview` boolean to force-show
- [api/og-preview/route.ts](src/app/api/og-preview/route.ts) — `GET /api/og-preview?url=…` fetches the target page, parses OG meta with JSDOM, and returns `{ title, description, image, siteName, url }`. Resolves relative image URLs against the page origin
- [shared/utils/](src/app/shared/utils/) — currently just `cn()`
- Static SEO/PWA assets ship inside [src/app/](src/app/) as files: `manifest.json`, `robots.txt`, `sitemap.xml`, `_redirects`, `_headers`

## Conventions

- `tsconfig.json` defines a path alias `web/*` → `./src/*`, but the code currently uses relative imports — match the surrounding file if unsure
- Components that use hooks or browser APIs declare `"use client"` at the top ([header](src/app/components/header/index.tsx), [tabs](src/app/components/tabs/index.tsx), [link-preview](src/app/components/link-preview/index.tsx))
- Project/job data is hardcoded inside the component files — to add an entry, append to the `projects` array in [parts/projects.tsx](src/app/components/content/parts/projects.tsx) or the `jobs` array in [parts/jobs.tsx](src/app/components/content/parts/jobs.tsx)
- Tech-stack icons come from `@ridemountainpig/svgl-react` — import the named component (e.g. `TypeScript`, `Preact`, `Nodejs`) and pass `className="w-4 h-4"`
- Styling: Tailwind utility classes only. Dark mode uses the `dark:` variant and follows `prefers-color-scheme` (no theme toggle). Zinc is the dominant palette
- The `_redirects` rule in [netlify.toml](netlify.toml) sends `/*` → `/index.html` (SPA fallback); the `og-preview` API route runs as a Netlify function on deploy