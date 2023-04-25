import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:1230",
    },
  },
})
