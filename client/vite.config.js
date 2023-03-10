import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import eslintPlugin from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:1230",
    },
  },
  plugins: [react(), eslintPlugin()],
})
