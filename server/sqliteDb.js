import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Database configuration with environment variables support
const DB_CONFIG = {
  path: process.env.DB_PATH || path.join(process.cwd(), 'data', 'portfolio.db'),
  password: process.env.DB_PASSWORD || null,
  encryption: process.env.DB_ENCRYPTION === 'true'
};

// Ensure data directory exists
const DB_DIR = path.dirname(DB_CONFIG.path);
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Initialize database with optional encryption
let db;
try {
  db = new Database(DB_CONFIG.path);
  
  // Enable WAL mode for better concurrency
  db.pragma('journal_mode = WAL');
  
  // Set encryption key if provided
  if (DB_CONFIG.password && DB_CONFIG.encryption) {
    db.pragma(`key = '${DB_CONFIG.password.replace(/'/g, "''")}'`);
  }
  
  // Set secure pragmas
  db.pragma('secure_delete = ON');
  db.pragma('auto_vacuum = FULL');
} catch (error) {
  console.error('Failed to initialize database:', error.message);
  throw error;
}

// Initialize tables with admin users table for server-side authentication
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

  CREATE TABLE IF NOT EXISTS admin_users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    salt TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    must_change_password INTEGER DEFAULT 0,
    reset_code TEXT,
    reset_code_expiry INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS education (
    id TEXT PRIMARY KEY,
    school_name TEXT NOT NULL,
    degree_name TEXT,
    location TEXT,
    start_date TEXT,
    end_date TEXT,
    description TEXT,
    notes TEXT,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS languages (
    id TEXT PRIMARY KEY,
    name_es TEXT NOT NULL,
    name_en TEXT NOT NULL,
    native_name TEXT,
    code TEXT,
    flag_emoji TEXT,
    proficiency_level TEXT,
    is_active INTEGER DEFAULT 1,
    sort_order INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Helper function to hash passwords with salt
function hashPassword(password, salt = null) {
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex');
  }
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

// Initialize default admin user if none exists
const adminCount = db.prepare('SELECT COUNT(*) as count FROM admin_users').get();
if (adminCount.count === 0) {
  const defaultAdmin = {
    id: '1',
    email: 'admin@portfolio.local',
    username: 'admin',
    role: 'superadmin',
    must_change_password: 1
  };
  const { hash, salt } = hashPassword('Admin123!');
  
  db.prepare(`
    INSERT INTO admin_users (id, email, username, password_hash, salt, role, must_change_password)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(defaultAdmin.id, defaultAdmin.email, defaultAdmin.username, hash, salt, defaultAdmin.role, defaultAdmin.must_change_password);
  
  console.log('✅ Default admin user created. Please change password on first login.');
}

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

// Admin authentication functions
export function authenticateAdminDb(identifier, password) {
  try {
    const admin = db.prepare(`
      SELECT * FROM admin_users 
      WHERE email = ? OR username = ?
    `).get(identifier.toLowerCase(), identifier.toLowerCase());
    
    if (!admin) {
      return { success: false, error: 'Credenciales inválidas' };
    }
    
    // Verify password
    const { hash } = hashPassword(password, admin.salt);
    if (hash !== admin.password_hash) {
      return { success: false, error: 'Credenciales inválidas' };
    }
    
    return {
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
        mustChangePassword: Boolean(admin.must_change_password)
      }
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Error de autenticación' };
  }
}

export function getAdminCountDb() {
  const result = db.prepare('SELECT COUNT(*) as count FROM admin_users').get();
  return result.count;
}

export function createFirstAdminDb(email, username, password) {
  try {
    const count = getAdminCountDb();
    if (count > 0) {
      return { success: false, error: 'Ya existe un administrador registrado' };
    }
    
    const { hash, salt } = hashPassword(password);
    const id = String(Date.now());
    
    db.prepare(`
      INSERT INTO admin_users (id, email, username, password_hash, salt, role, must_change_password)
      VALUES (?, ?, ?, ?, ?, 'superadmin', 0)
    `).run(id, email.toLowerCase(), username.toLowerCase(), hash, salt);
    
    return { success: true, admin: { id, email, username, role: 'superadmin' } };
  } catch (error) {
    console.error('Error creating admin:', error);
    return { success: false, error: 'Error al crear administrador' };
  }
}

export function changeAdminPasswordDb(adminId, newPassword) {
  try {
    const { hash, salt } = hashPassword(newPassword);
    db.prepare(`
      UPDATE admin_users 
      SET password_hash = ?, salt = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(hash, salt, adminId);
    
    return { success: true };
  } catch (error) {
    console.error('Error changing password:', error);
    return { success: false, error: 'Error al cambiar contraseña' };
  }
}

export function requestPasswordResetDb(identifier) {
  try {
    const admin = db.prepare(`
      SELECT * FROM admin_users 
      WHERE email = ? OR username = ?
    `).get(identifier.toLowerCase(), identifier.toLowerCase());
    
    if (!admin) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    
    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + (15 * 60 * 1000); // 15 minutes
    
    db.prepare(`
      UPDATE admin_users 
      SET reset_code = ?, reset_code_expiry = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(resetCode, expiry, admin.id);
    
    // In production, send email here. For now, log the code
    console.log(`🔑 Password reset code for ${admin.email}: ${resetCode}`);
    
    return { success: true, message: 'Código generado (revisar consola en desarrollo)' };
  } catch (error) {
    console.error('Error requesting reset:', error);
    return { success: false, error: 'Error al solicitar restablecimiento' };
  }
}

export function resetPasswordWithCodeDb(identifier, code, newPassword) {
  try {
    const admin = db.prepare(`
      SELECT * FROM admin_users 
      WHERE (email = ? OR username = ?) AND reset_code = ? AND reset_code_expiry > ?
    `).get(identifier.toLowerCase(), identifier.toLowerCase(), code, Date.now());
    
    if (!admin) {
      return { success: false, error: 'Código inválido o expirado' };
    }
    
    const { hash, salt } = hashPassword(newPassword);
    db.prepare(`
      UPDATE admin_users 
      SET password_hash = ?, salt = ?, reset_code = NULL, reset_code_expiry = NULL, must_change_password = 0, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(hash, salt, admin.id);
    
    return { success: true };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, error: 'Error al restablecer contraseña' };
  }
}

// Education management functions
export function getEducationDb() {
  const rows = db.prepare(`
    SELECT * FROM education 
    WHERE is_active = 1 
    ORDER BY sort_order ASC, start_date DESC
  `).all();
  
  return rows.map(row => ({
    id: row.id,
    schoolName: row.school_name,
    degreeName: row.degree_name,
    location: row.location,
    startDate: row.start_date,
    endDate: row.end_date,
    description: row.description,
    notes: row.notes,
    isActive: Boolean(row.is_active),
    sortOrder: row.sort_order
  }));
}

export function saveEducationDb(education) {
  const stmt = db.prepare(`
    INSERT INTO education (id, school_name, degree_name, location, start_date, end_date, description, notes, is_active, sort_order, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      school_name = excluded.school_name,
      degree_name = excluded.degree_name,
      location = excluded.location,
      start_date = excluded.start_date,
      end_date = excluded.end_date,
      description = excluded.description,
      notes = excluded.notes,
      is_active = excluded.is_active,
      sort_order = excluded.sort_order,
      updated_at = CURRENT_TIMESTAMP
  `);
  
  stmt.run(
    education.id,
    education.schoolName,
    education.degreeName,
    education.location || '',
    education.startDate || '',
    education.endDate || '',
    education.description || '',
    education.notes || '',
    education.isActive ? 1 : 0,
    education.sortOrder || 0
  );
  
  return true;
}

export function deleteEducationDb(id) {
  db.prepare('DELETE FROM education WHERE id = ?').run(id);
  return true;
}

// Languages management functions
export function getLanguagesDb() {
  const rows = db.prepare(`
    SELECT * FROM languages 
    WHERE is_active = 1 
    ORDER BY sort_order ASC
  `).all();
  
  return rows.map(row => ({
    id: row.id,
    nameEs: row.name_es,
    nameEn: row.name_en,
    nativeName: row.native_name,
    code: row.code,
    flagEmoji: row.flag_emoji,
    proficiencyLevel: row.proficiency_level,
    isActive: Boolean(row.is_active),
    sortOrder: row.sort_order
  }));
}

export function saveLanguageDb(language) {
  const stmt = db.prepare(`
    INSERT INTO languages (id, name_es, name_en, native_name, code, flag_emoji, proficiency_level, is_active, sort_order, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET
      name_es = excluded.name_es,
      name_en = excluded.name_en,
      native_name = excluded.native_name,
      code = excluded.code,
      flag_emoji = excluded.flag_emoji,
      proficiency_level = excluded.proficiency_level,
      is_active = excluded.is_active,
      sort_order = excluded.sort_order,
      updated_at = CURRENT_TIMESTAMP
  `);
  
  stmt.run(
    language.id,
    language.nameEs,
    language.nameEn,
    language.nativeName || '',
    language.code || '',
    language.flagEmoji || '',
    language.proficiencyLevel || '',
    language.isActive ? 1 : 0,
    language.sortOrder || 0
  );
  
  return true;
}

export function deleteLanguageDb(id) {
  db.prepare('DELETE FROM languages WHERE id = ?').run(id);
  return true;
}
