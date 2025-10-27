// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
    cssCodeSplit: true,
    // Optimize code splitting for better caching and performance
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            if (id.includes('react-toastify')) {
              return 'toast-vendor';
            }
            // Other node_modules into a separate chunk
            return 'vendor';
          }
          // Split large component pages
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('/')[0].replace('.tsx', '');
            return `page-${pageName}`;
          }
        },
        // Optimize chunk names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    chunkSizeWarningLimit: 500,
    // Optimize assets - inline small files
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Enable source maps only for production debugging
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'react-toastify'],
  },
  // Enable compression
  esbuild: {
    legalComments: 'none', // Remove comments
    treeShaking: true,
  },
})