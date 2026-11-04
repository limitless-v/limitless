import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Pages supplies an empty path for custom domains and /repo for project sites.
  base: `${loadEnv(mode, '.', 'PAGES_').PAGES_BASE_PATH || ''}/`,
}));
