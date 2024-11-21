import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    middlewareMode: true,
    configureServer: (server: any) => {
      server.middlewares.use(
        history({
          disableDotRule: true,
          verbose: true,
        })
      );
    },
  },
});