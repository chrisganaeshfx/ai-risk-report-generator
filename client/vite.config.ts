import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
  server: {
    port: 3000,
    proxy: {
      // Forward API calls to the gateway (S2) during local dev. `localhost`
      // default is for bare `npm run dev`; docker-compose.yml overrides
      // SERVER_URL to the Docker service name for the client container —
      // see CLAUDE.md "Known pitfalls".
      '/api': {
        target: process.env.SERVER_URL || 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
