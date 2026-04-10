import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    host: true, // listen on all interfaces to avoid localhost resolution issues
    port: 0, // auto-pick a free port
    strictPort: false, // allow fallback if a specific port is requested
  },
  preview: {
    host: true,
    port: 0, // auto-pick a free port for preview too
    strictPort: false,
  },
});
