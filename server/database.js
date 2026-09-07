/**
 * Database factory — selects the active driver from `DB_CONNECTION`
 * (sqlite | postgres | mysql) and ensures the schema exists.
 */
import { config } from './config.js';
import { createSqliteConnection } from './drivers/sqliteDriver.js';
import { createPostgresConnection } from './drivers/postgresDriver.js';
import { createMysqlConnection } from './drivers/mysqlDriver.js';

export const DIALECTS = new Set(['sqlite', 'postgres', 'mysql', 'mariadb']);

export function normalizeBestDriver(raw) {
  const value = (raw || 'sqlite').toLowerCase();
  if (value === 'postgresql') return 'postgres';
  if (value === 'mariadb') return 'mysql';
  if (!DIALECTS.has(value)) {
    throw new Error(
      `Unsupported DB_CONNECTION="${value}". Use sqlite, postgres or mysql.`
    );
  }
  return value;
}

/** Per-dialect DDL. Returns an array of statements that are idempotent. */
export function getSchema(dialect) {
  const TEXT_PK = dialect === 'mysql' ? 'VARCHAR(255) PRIMARY KEY' : 'TEXT PRIMARY KEY';
  const BOOL = dialect === 'postgres' ? 'BOOLEAN' : dialect === 'mysql' ? 'TINYINT(1)' : 'INTEGER';
  const TS = dialect === 'postgres' ? 'TIMESTAMPTZ DEFAULT now()' : dialect === 'mysql' ? 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP' : 'DATETIME DEFAULT CURRENT_TIMESTAMP';

  return [
    `CREATE TABLE IF NOT EXISTS users (
      id ${TEXT_PK},
      email TEXT NOT NULL,
      username TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL,
      must_change_password ${BOOL} NOT NULL DEFAULT 1,
      created_at ${TS},
      updated_at ${TS}
    )`,

    `CREATE TABLE IF NOT EXISTS sessions (
      id ${TEXT_PK},
      user_id TEXT NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      ip TEXT,
      user_agent TEXT,
      expires_at TEXT NOT NULL,
      created_at ${TS}
    )`,

    `CREATE TABLE IF NOT EXISTS system_variables (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      badge TEXT NOT NULL,
      data TEXT NOT NULL,
      is_active ${BOOL} NOT NULL DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at ${TS},
      updated_at ${TS}
    )`,

    `CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title_es TEXT NOT NULL,
      title_en TEXT NOT NULL,
      desc_es TEXT NOT NULL,
      desc_en TEXT NOT NULL,
      icon TEXT NOT NULL,
      keywords TEXT,
      track_ids TEXT,
      data TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS profile_data (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at ${TS}
    )`,
  ];
}

export async function createDriver(override = config) {
  const dialect = normalizeBestDriver(override.dbConnection);

  let driver;
  if (dialect === 'sqlite') {
    driver = createSqliteConnection(override);
  } else if (dialect === 'postgres') {
    driver = await createPostgresConnection(override);
  } else {
    driver = await createMysqlConnection(override);
  }

  for (const ddl of getSchema(dialect)) {
    await driver.exec(ddl);
  }

  return { dialect, driver };
}

/**
 * Singleton connection shared across the server process.
 */
let instance = null;

export async function getDatabase() {
  if (!instance) {
    instance = await createDriver();
  }
  return instance;
}

export async function closeDatabase() {
  if (instance) {
    await instance.driver.close();
    instance = null;
  }
}