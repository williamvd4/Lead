import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/project/', // Adjust this if your app is served from a sub-path
  build: {
    outDir: 'dist', // Ensure this matches the directory Render will use
    rollupOptions: {
      external: ['axios'],
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});   