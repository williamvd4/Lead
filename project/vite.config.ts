import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/static/', // Match the Django STATIC_URL
  build: {
    outDir: 'C:/Users/allie/Desktop/CODES/Lead/backend/staticfiles',
 // Ensure the output goes to Django's STATIC_ROOT
    assetsDir: 'assets', // Organize assets under 'assets'
    emptyOutDir: true, // Clean up old files
    rollupOptions: {
      external: ['axios'],
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
