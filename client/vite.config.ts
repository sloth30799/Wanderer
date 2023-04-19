import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import eslintPlugin from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:1230",
    },
  },
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      "@": "/src/",
      "@assets": "/src/assets/",
    },
  },
})
