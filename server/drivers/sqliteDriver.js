/**
 * SQLite driver adapter (better-sqlite3).
 * Exposes a uniform async interface so repositories stay driver-agnostic.
 */
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

export function createSqliteConnection(config) {
  const dir = path.dirname(config.dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const db = new Database(config.dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  return {
    kind: 'sqlite',

    async query(sql, params = []) {
      return db.prepare(sql).all(...params);
    },

    async get(sql, params = []) {
      return db.prepare(sql).get(...params);
    },

    async run(sql, params = []) {
      const result = db.prepare(sql).run(...params);
      return { changes: result.changes, lastInsertRowid: result.lastInsertRowid };
    },

    async exec(sql) {
      db.exec(sql);
    },

    async transaction(callback) {
      // better-sqlite3 is synchronous; a transaction can be expressed as one exec block.
      return callback();
    },

    close() {
      try {
        db.close();
      } catch {
        /* ignore double close */
      }
    },
  };
}