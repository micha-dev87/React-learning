import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React-learning/',
  server: {
    host: true,
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
  },
})
