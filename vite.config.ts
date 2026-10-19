import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
function sqliteApiPlugin(): Plugin {
  return {
    name: 'sqlite-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && (req.url.startsWith('/api') || req.url === '/sitemap.xml' || req.url === '/robots.txt')) {
          try {
            const { handleApiRequest } = await import('./server/apiRouter.js');
            return handleApiRequest(req, res, next);
          } catch (err) {
            console.error('Failed to load SQLite API router:', err);
            return next();
          }
        }
        next();
      });
    },
  };
}

const currentDir = typeof import.meta.dirname !== 'undefined' ? import.meta.dirname : path.resolve('');

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [sqliteApiPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(currentDir, './src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})
