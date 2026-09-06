import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, 'portfolio.db');
const db = new Database(DB_PATH);

// Enable WAL mode for fast concurrency
db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS system_variables (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS tracks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    badge TEXT NOT NULL,
    data TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id TEXT PRIMARY KEY,
    title_es TEXT NOT NULL,
    title_en TEXT NOT NULL,
    desc_es TEXT NOT NULL,
    desc_en TEXT NOT NULL,
    icon TEXT NOT NULL,
    keywords TEXT,
    track_ids TEXT,
    data TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS profile_data (
    id TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export function getSystemVariablesDb() {
  const row = db.prepare('SELECT value FROM system_variables WHERE key = ?').get('vars');
  if (row && row.value) {
    try {
      return JSON.parse(row.value);
    } catch (e) {
      console.error('Error parsing system variables from sqlite:', e);
    }
  }
  return null;
}

export function saveSystemVariablesDb(vars) {
  const stmt = db.prepare(`
    INSERT INTO system_variables (key, value)
    VALUES ('vars', ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  stmt.run(JSON.stringify(vars));
  return true;
}

export function getTracksDb() {
  const rows = db.prepare('SELECT * FROM tracks WHERE is_active = 1 ORDER BY sort_order ASC, id ASC').all();
  if (!rows || rows.length === 0) return null;
  return rows.map(r => {
    try {
      return JSON.parse(r.data);
    } catch (e) {
      return { id: r.id, name: r.name, badge: r.badge, isActive: Boolean(r.is_active) };
    }
  });
}

export function getAllTracksDb() {
  const rows = db.prepare('SELECT * FROM tracks ORDER BY sort_order ASC, id ASC').all();
  if (!rows || rows.length === 0) return null;
  return rows.map(r => {
    try {
      return JSON.parse(r.data);
    } catch (e) {
      return { id: r.id, name: r.name, badge: r.badge, isActive: Boolean(r.is_active) };
    }
  });
}

export function saveTrackDb(track) {
  const stmt = db.prepare(`
    INSERT INTO tracks (id, name, badge, data, is_active, updated_at)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      badge = excluded.badge,
      data = excluded.data,
      is_active = excluded.is_active,
      updated_at = CURRENT_TIMESTAMP
  `);
  stmt.run(track.id, track.name, track.badge, JSON.stringify(track), track.isActive ? 1 : 0);
  return true;
}

export function deleteTrackDb(id) {
  const stmt = db.prepare('DELETE FROM tracks WHERE id = ?');
  stmt.run(id);
  return true;
}

export function getServicesDb() {
  const rows = db.prepare('SELECT data FROM services').all();
  if (!rows || rows.length === 0) return null;
  return rows.map(r => {
    try {
      return JSON.parse(r.data);
    } catch (e) {
      return null;
    }
  }).filter(Boolean);
}

export function saveServicesDb(services) {
  const deleteStmt = db.prepare('DELETE FROM services');
  const insertStmt = db.prepare(`
    INSERT INTO services (id, title_es, title_en, desc_es, desc_en, icon, keywords, track_ids, data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const runTx = db.transaction(() => {
    deleteStmt.run();
    for (const s of services) {
      insertStmt.run(
        s.id,
        s.title?.es || '',
        s.title?.en || '',
        s.description?.es || '',
        s.description?.en || '',
        s.icon || 'Briefcase',
        JSON.stringify(s.keywords || []),
        JSON.stringify(s.trackIds || []),
        JSON.stringify(s)
      );
    }
  });

  runTx();
  return true;
}

export function getSettingsDb() {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get('settings');
  if (row && row.value) {
    try {
      return JSON.parse(row.value);
    } catch (e) {
      console.error('Error parsing settings from sqlite:', e);
    }
  }
  return null;
}

export function saveSettingsDb(settings) {
  const stmt = db.prepare(`
    INSERT INTO settings (key, value)
    VALUES ('settings', ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `);
  stmt.run(JSON.stringify(settings));
  return true;
}

export function getFullExportDb() {
  return {
    version: '2.0',
    exportedAt: new Date().toISOString(),
    systemVariables: getSystemVariablesDb(),
    tracks: getAllTracksDb(),
    services: getServicesDb(),
    settings: getSettingsDb(),
  };
}

export function importFullDataDb(payload) {
  const runTx = db.transaction(() => {
    if (payload.systemVariables) {
      saveSystemVariablesDb(payload.systemVariables);
    }
    if (Array.isArray(payload.tracks)) {
      db.prepare('DELETE FROM tracks').run();
      for (const t of payload.tracks) {
        saveTrackDb(t);
      }
    }
    if (Array.isArray(payload.services)) {
      saveServicesDb(payload.services);
    }
    if (payload.settings) {
      saveSettingsDb(payload.settings);
    }
  });

  runTx();
  return true;
}

export function generateSitemapXml(origin = 'https://faridmaloof.dev') {
  const tracks = getTracksDb() || [
    { id: 'full', name: 'Full Profile' },
    { id: 'sdet', name: 'SDET & Automation' },
    { id: 'backend', name: 'Backend Engineer' },
    { id: 'fullstack', name: 'Full Stack Engineer' },
    { id: 'qa', name: 'QA Lead' }
  ];

  const now = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Root URL
  xml += `  <url>\n`;
  xml += `    <loc>${origin}/</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Each Technical Stack URL
  for (const t of tracks) {
    xml += `  <url>\n`;
    xml += `    <loc>${origin}/?profile=${encodeURIComponent(t.id)}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${t.id === 'full' || t.id === 'combined' ? '0.95' : '0.9'}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;
  return xml;
}

export function generateRobotsTxt(origin = 'https://faridmaloof.dev') {
  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${origin}/sitemap.xml
`;
}
