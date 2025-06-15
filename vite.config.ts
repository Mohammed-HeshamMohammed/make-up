import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// Only load the plugin locally
const getDevPlugins = () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      const { componentTagger } = require('lovable-tagger');
      return [componentTagger()];
    } catch {
      console.warn('lovable-tagger not installed. Skipping.');
    }
  }
  return [];
};

export default defineConfig(({ mode }) => ({
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [
    react(),
    ...getDevPlugins(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
}));
