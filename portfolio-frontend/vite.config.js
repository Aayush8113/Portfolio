import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // 1. Minify code for smaller size
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // Removes console.log in production
        drop_debugger: true,
      },
    },
    // 2. Split vendors (libraries) from your code
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'react-icons'],
          'vendor-utils': ['axios', 'react-qr-code'],
        },
      },
    },
    // 3. Preload assets
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});