import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(async ({ mode }) => {
  console.log(`Vite running in ${mode} mode`);

  // Dynamically import the plugin only in dev using ES modules
  const devPlugins = [];
  if (mode === 'development') {
    try {
      const { componentTagger } = await import('lovable-tagger');
      devPlugins.push(componentTagger());
    } catch (error) {
      if (error instanceof Error) {
        console.warn('lovable-tagger not available:', error.message);
      } else {
        console.warn('lovable-tagger not available:', error);
      }
    }
  }

  return {
    server: {
      host: '::',
      port: 8080,
    },
    plugins: [
      react(),
      ...devPlugins,
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
  };
});
