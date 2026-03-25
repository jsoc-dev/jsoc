import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/examples/basic-tanstack-table/",
  build: {
    outDir: "../../../docs/public/examples/basic-tanstack-table",
    emptyOutDir: true,
  },
});
