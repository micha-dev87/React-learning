import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/React-learning/', // Attention à la casse qui doit correspondre à votre repo
  server: {
    host: true,
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
    proxy: {
      '/wp-json': {
        target: 'https://wordpress-data.free.nf',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
