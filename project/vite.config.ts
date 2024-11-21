import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';
import { Plugin } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  configureServer: (server) => {
    server.middlewares.use(
      history({
        disableDotRule: true,
        verbose: true,
      })
    );
  },
  },
});