# Limitless / Surajkumar KS

React + TypeScript + Tailwind CSS 4 + Vite portfolio with a black-and-white halftone design and an interactive perspective-projected 3D particle sphere.

Use Node.js 22.12+ and npm.

- `npm ci` installs dependencies.
- `npm run dev` starts local development.
- `npm run build` checks TypeScript and compiles to `dist/`.
- `npm run preview` previews the production output.

GitHub Actions builds and uploads `dist/`. Cloudflare Workers should use `npm run build` as its build command; Wrangler serves `dist/`. Deployment remains separate from the build workflow.

Edit content in `src/App.tsx`, particles in `src/Particles.tsx`, and styles in `src/styles.css`. Static domain and verification files live in `public/`. Motion supports pause, reduced-motion preferences, and background-tab suspension.
