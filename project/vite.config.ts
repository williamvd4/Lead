import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'connect-history-api-fallback';
import type { Connect } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'history-fallback',
      configureServer(server) {
        server.middlewares.use(
          history() as Connect.NextHandleFunction
        );
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});