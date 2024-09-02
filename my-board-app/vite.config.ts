import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.2024.newbies.gistory.me',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // /api를 실제 API로 변경
      },
    },
  },
});
