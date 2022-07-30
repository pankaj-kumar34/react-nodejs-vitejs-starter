/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  // plugins: [react({ jsxRuntime: 'classic' }), eslintPlugin()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src', 'client', 'app'),
      '@hooks': path.resolve(__dirname, 'src', 'client', 'hooks'),
      '@pages': path.resolve(__dirname, 'src', 'client', 'pages'),
      '@store': path.resolve(__dirname, 'src', 'client', 'store'),
      '@utils': path.resolve(__dirname, 'src', 'client', 'utils'),
      '@assets': path.resolve(__dirname, 'src', 'client', 'assets'),
      '@routes': path.resolve(__dirname, 'src', 'client', 'routes'),
      '@config': path.resolve(__dirname, 'src', 'client', 'config'),
      '@services': path.resolve(__dirname, 'src', 'client', 'services'),
      '@components': path.resolve(__dirname, 'src', 'client', 'components'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
      },
    },
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
