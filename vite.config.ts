import { defineConfig } from "vite";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// On GitHub Pages we serve from /<repo>/ — set via env or default to "/" for dev.
const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  appType: "spa",
  base,
  server: {
    port: 5173,
    open: false,
  },
  plugins: [
    {
      name: "spa-404-fallback",
      // GitHub Pages doesn't have a SPA fallback; copying index.html → 404.html
      // makes any unknown path serve the SPA shell so the client router can take over.
      closeBundle() {
        const dist = resolve(__dirname, "dist");
        try {
          copyFileSync(resolve(dist, "index.html"), resolve(dist, "404.html"));
        } catch {
          // dev / no dist — skip silently
        }
      },
    },
  ],
});
