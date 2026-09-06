import {
  getSystemVariablesDb,
  saveSystemVariablesDb,
  getTracksDb,
  getAllTracksDb,
  saveTrackDb,
  deleteTrackDb,
  getServicesDb,
  saveServicesDb,
  getSettingsDb,
  saveSettingsDb,
  getFullExportDb,
  importFullDataDb,
  generateSitemapXml,
  generateRobotsTxt
} from './sqliteDb.js';

export function handleApiRequest(req, res, next) {
  const url = req.url || '';
  const method = req.method || 'GET';

  // Helper to parse JSON body
  const parseJsonBody = (callback) => {
    if (req.body && typeof req.body === 'object') {
      return callback(req.body);
    }
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        const body = data ? JSON.parse(data) : {};
        callback(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON body' }));
      }
    });
  };

  // 1. Sitemap.xml
  if (url === '/sitemap.xml' && method === 'GET') {
    const host = req.headers.host ? `https://${req.headers.host}` : 'https://faridmaloof.dev';
    const xml = generateSitemapXml(host);
    res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
    res.end(xml);
    return;
  }

  // 2. Robots.txt
  if (url === '/robots.txt' && method === 'GET') {
    const host = req.headers.host ? `https://${req.headers.host}` : 'https://faridmaloof.dev';
    const txt = generateRobotsTxt(host);
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(txt);
    return;
  }

  // 3. API System Variables
  if (url === '/api/system-variables') {
    if (method === 'GET') {
      const vars = getSystemVariablesDb();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(vars));
      return;
    }
    if (method === 'POST') {
      parseJsonBody((body) => {
        saveSystemVariablesDb(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
      return;
    }
  }

  // 4. API Tracks
  if (url === '/api/tracks' || url.startsWith('/api/tracks/')) {
    if (method === 'GET') {
      const all = url.includes('all=true');
      const tracks = all ? getAllTracksDb() : getTracksDb();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tracks));
      return;
    }
    if (method === 'POST') {
      parseJsonBody((body) => {
        saveTrackDb(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, track: body }));
      });
      return;
    }
    if (method === 'DELETE') {
      const parts = url.split('/');
      const id = parts[parts.length - 1].split('?')[0];
      if (id) {
        deleteTrackDb(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, id }));
        return;
      }
    }
  }

  // 5. API Services
  if (url === '/api/services') {
    if (method === 'GET') {
      const services = getServicesDb();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(services));
      return;
    }
    if (method === 'POST') {
      parseJsonBody((body) => {
        if (Array.isArray(body)) {
          saveServicesDb(body);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Body must be an array of services' }));
        }
      });
      return;
    }
  }

  // 6. API Settings
  if (url === '/api/settings') {
    if (method === 'GET') {
      const settings = getSettingsDb();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(settings));
      return;
    }
    if (method === 'POST') {
      parseJsonBody((body) => {
        saveSettingsDb(body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      });
      return;
    }
  }

  // 7. Full DB Export
  if (url === '/api/db/export' && method === 'GET') {
    const full = getFullExportDb();
    res.writeHead(200, { 
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="portfolio-database-export.json"'
    });
    res.end(JSON.stringify(full, null, 2));
    return;
  }

  // 8. Full DB Import
  if (url === '/api/db/import' && method === 'POST') {
    parseJsonBody((body) => {
      importFullDataDb(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Database imported successfully' }));
    });
    return;
  }

  // Pass to next middleware if not handled
  if (typeof next === 'function') {
    next();
  }
}
