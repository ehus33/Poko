import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        options: resolve(__dirname, "options.html"),
        content: resolve(__dirname, "src/content/index.ts"),
        background: resolve(__dirname, "src/background/index.ts")
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "content") {
            return "content/index.js";
          }
          if (chunk.name === "background") {
            return "background/index.js";
          }
          return "assets/[name]-[hash].js";
        }
      }
    }
  }
});
