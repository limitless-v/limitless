# Limitless / Surajkumar KS

React + TypeScript + Tailwind CSS 4 + Vite portfolio with a black-and-white halftone design and an interactive perspective-projected 3D particle sphere.

Use Node.js 22.12+ and npm.

- `npm ci` installs dependencies.
- `npm run dev` starts local development.
- `npm run build` checks TypeScript and compiles to `dist/`.
- `npm run preview` previews the production output.

The single `.github/workflows/pages.yml` workflow builds and deploys `dist/` to GitHub Pages on pushes to `main` or manual runs. Set repository Settings → Pages → Build and deployment → Source to **GitHub Actions** to replace automatic branch publishing. The build uses the Pages base path for both custom domains and repository URLs. Cloudflare Workers can also use `npm run build`; Wrangler serves `dist/`.

Edit content in `src/App.tsx`, particles in `src/Particles.tsx`, and styles in `src/styles.css`. Static domain and verification files live in `public/`. Motion supports pause, reduced-motion preferences, and background-tab suspension.
