import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sri from 'vite-plugin-sri'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sri({
      algorithms: ['sha384'],
      crossorigin: 'anonymous',
      includeAssets: 'all'
    })
  ],
  build: {
    sourcemap: true
  }
})
