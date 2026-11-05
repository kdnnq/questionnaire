import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (
            /[\\/](react|react-dom|react-router|react-router-dom|react-redux|redux|scheduler)[\\/]/.test(
              id,
            )
          ) {
            return 'vendor-react';
          }
          if (/[\\/](antd|@ant-design|@rc-component|rc-)[\\/]/.test(id)) {
            return 'vendor-antd';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  css: {
    modules: {
      hashPrefix: 'prefix',
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
