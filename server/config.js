/**
 * Centralized environment configuration (12-factor style).
 * Mirrors the Laravel "config/database" pattern:
 *   DB_CONNECTION decides the active driver (sqlite | postgres | mysql).
 *
 * The .env file is loaded manually (no external dependency required).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

/** Minimal .env parser (KEY=VALUE, supports quotes and comments). */
function loadEnvFile() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile();

const DEFAULT_SESSION_SECRET =
  process.env.SESSION_SECRET || 'local-dev-only-change-me';

export const config = Object.freeze({
  isProduction: process.env.NODE_ENV === 'production',
  port: Number(process.env.PORT || 3000),
  root: ROOT,

  // ---- Database (Laravel-style) ----
  dbConnection: (process.env.DB_CONNECTION || 'sqlite').toLowerCase(),
  dbPath: process.env.DB_PATH || path.join(ROOT, 'data', 'portfolio.db'),
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbPort: Number(process.env.DB_PORT || 5432),
  dbDatabase: process.env.DB_DATABASE || 'portfolio',
  dbUsername: process.env.DB_USERNAME || 'portfolio',
  dbPassword: process.env.DB_PASSWORD || '',
  dbSsl: process.env.DB_SSL === 'true',

  // ---- Public site origin (sitemap / robots / canonical) ----
  siteUrl: process.env.SITE_URL || 'https://faridmaloof.dev',

  // ---- Sessions ----
  sessionSecret: DEFAULT_SESSION_SECRET,
  sessionTtlMs: Number(process.env.SESSION_TTL_MS || 1000 * 60 * 60 * 12), // 12h

  // ---- Security tuning ----
  loginMaxAttempts: Number(process.env.LOGIN_MAX_ATTEMPTS || 5),
  loginWindowMs: Number(process.env.LOGIN_WINDOW_MS || 1000 * 60 * 5),
});

export default config;