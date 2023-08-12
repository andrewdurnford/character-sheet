/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setupTests.js",
    coverage: {
      provider: "v8",
      exclude: ["src/utils.ts", "src/api", "src/lib/types.ts"],
    },
  },
})
