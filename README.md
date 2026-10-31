# Rodolfo Robles — portfolio

An English-language portfolio built with Next.js App Router, React, TypeScript, and React Three Fiber. The portfolio is statically exported for GitHub Pages.

## Local development

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` while the development server is running.

## Build for GitHub Pages

```sh
GITHUB_PAGES=true npm run build
```

The static site is emitted to `out/`. The GitHub Actions workflow builds and deploys it when changes reach `main`; pushes to `codex/nextjs-migration` run a build check only. The project uses the `/portfolio-website` base path for the repository Pages URL.

## Hero animation choices

Choose between neural nodes, luminous brain fibers, a reactive 3D neural mesh, and cursor-reactive particle waves using the controls in the hero. The neural mesh is selected by default. Motion pauses outside the visible hero and respects reduced-motion preferences.

Portfolio copy and entries are grouped in `src/data/portfolio.ts`; page composition lives in `src/app/page.tsx` and reusable UI in `src/components/`.
