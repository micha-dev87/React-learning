import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs-extra'

// Plugin personnalisé pour copier le dossier uploads
const copyUploadsPlugin = () => {
  return {
    name: 'copy-uploads',
    closeBundle: async () => {
      // Assurez-vous que le dossier uploads est copié après le build
      const uploadsDir = resolve(__dirname, 'public/uploads')
      const distUploadsDir = resolve(__dirname, 'dist/uploads')
      
      if (fs.existsSync(uploadsDir)) {
        console.log('Copying uploads directory to build output...')
        await fs.copy(uploadsDir, distUploadsDir)
        console.log('Uploads directory copied successfully!')
      } else {
        console.warn('Uploads directory not found in public folder')
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copyUploadsPlugin()
  ],
  base: '/React-learning/',
  build: {
    manifest: true,
    outDir: 'dist',
    assetsDir: 'assets',
  },
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
  resolve: {
    alias: {
      '/uploads': '/public/uploads'
    }
  }
})
