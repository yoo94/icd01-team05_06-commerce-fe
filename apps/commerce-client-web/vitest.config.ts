import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // src 폴더를 절대 경로로 설정
    },
  },
  test: {
    environment: 'jsdom',
  },
});
