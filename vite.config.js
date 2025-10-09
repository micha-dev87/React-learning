import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 9000  // ⚠️ Ce port est seulement pour le dev server, pas pour la production
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Configuration importante pour le build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  // Important pour le déploiement
  base: './'  // ou '/' si vous utilisez un domaine racine
})
