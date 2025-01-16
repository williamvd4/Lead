import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/project/', // Match the sub-path where the app is served
  build: {
    outDir: '../backend/staticfiles/dist', // Build files into 'project/dist'
    assetsDir: 'assets', // Place assets under 'assets' folder
    emptyOutDir: true, // Clear the output directory before building
    rollupOptions: {
      external: ['axios'],
      output: {
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  },
});
