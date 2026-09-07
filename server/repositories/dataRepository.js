/**
 * Content data repository — system variables, tracks, services, settings,
 * profile data and generated SEO files. Driver-agnostic.
 */
import { getDatabase } from '../database.js';

// ---------- System Variables ----------

export async function getSystemVariablesDb() {
  const { driver } = await getDatabase();
  const row = await driver.get('SELECT value FROM system_variables WHERE key = ?', ['vars']);
  if (row && row.value) {
    try {
      return JSON.parse(row.value);
    } catch {
      /* fall through */
    }
  }
  return null;
}

export async function saveSystemVariablesDb(vars) {
  const { driver } = await getDatabase();
  await driver.run(
    `INSERT INTO system_variables (key, value) VALUES ('vars', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [JSON.stringify(vars)]
  );
  return true;
}

// ---------- Tracks ----------

function normalizeTrackRow(row) {
  if (!row) return null;
  try {
    return JSON.parse(row.data);
  } catch {
    return { id: row.id, name: row.name, badge: row.badge, isActive: Boolean(row.is_active) };
  }
}

export async function getTracksDb() {
  const { driver } = await getDatabase();
  const rows = await driver.query(
    'SELECT * FROM tracks WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
  );
  if (!rows || rows.length === 0) return null;
  return rows.map(normalizeTrackRow);
}

export async function getAllTracksDb() {
  const { driver } = await getDatabase();
  const rows = await driver.query('SELECT * FROM tracks ORDER BY sort_order ASC, id ASC');
  if (!rows || rows.length === 0) return null;
  return rows.map(normalizeTrackRow);
}

export async function saveTrackDb(track) {
  const { driver } = await getDatabase();
  await driver.run(
    `INSERT INTO tracks (id, name, badge, data, is_active, sort_order, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       badge = excluded.badge,
       data = excluded.data,
       is_active = excluded.is_active,
       sort_order = excluded.sort_order,
       updated_at = CURRENT_TIMESTAMP`,
    [
      track.id,
      track.name,
      track.badge || '',
      JSON.stringify(track),
      track.isActive ? 1 : 0,
      Number(track.sortOrder || 0),
    ]
  );
  return true;
}

export async function deleteTrackDb(id) {
  const { driver } = await getDatabase();
  await driver.run('DELETE FROM tracks WHERE id = ?', [id]);
  return true;
}

// ---------- Services ----------

function safeParseArray(value) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function normalizeServiceRow(row) {
  if (!row) return null;
  if (row.data) {
    try {
      return JSON.parse(row.data);
    } catch {
      /* fall through to column build */
    }
  }
  return {
    id: row.id,
    title: { es: row.title_es, en: row.title_en },
    description: { es: row.desc_es, en: row.desc_en },
    icon: row.icon,
    keywords: safeParseArray(row.keywords),
    trackIds: safeParseArray(row.track_ids),
  };
}

export async function getServicesDb() {
  const { driver } = await getDatabase();
  const rows = await driver.query('SELECT * FROM services ORDER BY id ASC');
  if (!rows || rows.length === 0) return null;
  return rows.map(normalizeServiceRow).filter(Boolean);
}

export async function saveServicesDb(services) {
  const { driver } = await getDatabase();
  await driver.run('DELETE FROM services');
  for (const s of services) {
    await driver.run(
      `INSERT INTO services (id, title_es, title_en, desc_es, desc_en, icon, keywords, track_ids, data)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        s.id,
        s.title?.es || '',
        s.title?.en || '',
        s.description?.es || '',
        s.description?.en || '',
        s.icon || 'Briefcase',
        JSON.stringify(s.keywords || []),
        JSON.stringify(s.trackIds || []),
        JSON.stringify(s),
      ]
    );
  }
  return true;
}

// ---------- Settings ----------

export async function getSettingsDb() {
  const { driver } = await getDatabase();
  const row = await driver.get('SELECT value FROM settings WHERE key = ?', ['settings']);
  if (row && row.value) {
    try {
      return JSON.parse(row.value);
    } catch {
      /* fall through */
    }
  }
  return null;
}

export async function saveSettingsDb(settings) {
  const { driver } = await getDatabase();
  await driver.run(
    `INSERT INTO settings (key, value) VALUES ('settings', ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [JSON.stringify(settings)]
  );
  return true;
}

// ---------- Profile data (full CV content) ----------

export async function getProfileDataDb() {
  const { driver } = await getDatabase();
  const rows = await driver.query('SELECT id, data, updated_at FROM profile_data ORDER BY updated_at DESC');
  return rows
    .map((r) => {
      try {
        return JSON.parse(r.data);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export async function saveProfileDataDb(profile) {
  const { driver } = await getDatabase();
  await driver.run(
    `INSERT INTO profile_data (id, data, updated_at)
     VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP`,
    [profile.id || 'main', JSON.stringify(profile)]
  );
  return true;
}

// ---------- Full snapshot (used by admin backup/export) ----------

export async function getFullExportDb() {
  return {
    version: '3.0',
    exportedAt: new Date().toISOString(),
    systemVariables: await getSystemVariablesDb(),
    tracks: await getAllTracksDb(),
    services: await getServicesDb(),
    settings: await getSettingsDb(),
    profiles: await getProfileDataDb(),
  };
}

export async function importFullDataDb(payload) {
  const { driver } = await getDatabase();
  await driver.transaction(async () => {
    if (payload.systemVariables) await saveSystemVariablesDb(payload.systemVariables);
    if (Array.isArray(payload.tracks)) {
      await driver.run('DELETE FROM tracks');
      for (const t of payload.tracks) await saveTrackDb(t);
    }
    if (Array.isArray(payload.services)) await saveServicesDb(payload.services);
    if (payload.settings) await saveSettingsDb(payload.settings);
    if (Array.isArray(payload.profiles)) {
      await driver.run('DELETE FROM profile_data');
      for (const p of payload.profiles) await saveProfileDataDb(p);
    }
  });
  return true;
}

// ---------- SEO files ----------

export async function generateSitemapXml(origin = 'https://faridmaloof.dev') {
  const tracks = (await getTracksDb()) || [
    { id: 'full', name: 'Full Profile' },
    { id: 'sdet', name: 'SDET & Automation' },
    { id: 'backend', name: 'Backend Engineer' },
    { id: 'fullstack', name: 'Full Stack Engineer' },
    { id: 'qa', name: 'QA Lead' },
  ];

  const now = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  xml += '  <url>\n';
  xml += `    <loc>${origin}/</loc>\n`;
  xml += `    <lastmod>${now}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';

  for (const t of tracks) {
    xml += '  <url>\n';
    xml += `    <loc>${origin}/?profile=${encodeURIComponent(t.id)}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += '    <changefreq>weekly</changefreq>\n';
    xml += `    <priority>${t.id === 'full' || t.id === 'combined' ? '0.95' : '0.9'}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>';
  return xml;
}

export function generateRobotsTxt(origin = 'https://faridmaloof.dev') {
  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${origin}/sitemap.xml
`;
}