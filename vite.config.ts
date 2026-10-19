import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { handleApiRequest } from './server/apiRouter.js'

function sqliteApiPlugin(): Plugin {
  return {
    name: 'sqlite-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && (req.url.startsWith('/api') || req.url === '/sitemap.xml' || req.url === '/robots.txt')) {
          return handleApiRequest(req, res, next);
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
