import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest } from './server/apiRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API & Sitemap routes with SQLite
app.use((req, res, next) => {
  if (req.url.startsWith('/api') || req.url === '/sitemap.xml' || req.url === '/robots.txt') {
    return handleApiRequest(req, res, next);
  }
  next();
});

// Serve static assets from root directory
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'Farid Maloof Portfolio', database: 'SQLite (better-sqlite3)' });
});

// Fallback to index.html for root or SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Portfolio server with SQLite running on http://0.0.0.0:${PORT}`);
});
