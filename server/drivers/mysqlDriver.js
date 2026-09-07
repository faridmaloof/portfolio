/**
 * MySQL / MariaDB driver adapter (optional).
 * Activated when DB_CONNECTION=mysql or mariadb.
 */
export async function createMysqlConnection(config) {
  let mysql;
  try {
    mysql = await import('mysql2/promise');
  } catch {
    throw new Error(
      'DB_CONNECTION=mysql requires the "mysql2" package. Run: npm install mysql2'
    );
  }

  const pool = mysql.createPool({
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbDatabase,
    user: config.dbUsername,
    password: config.dbPassword,
    ssl: config.dbSsl ? { rejectUnauthorized: false } : undefined,
    connectionLimit: 10,
  });

  // Normalize raw rows (dates as strings) so repository logic stays consistent.
  const normalize = (rows) =>
    (rows || []).map((r) => {
      const out = {};
      for (const [k, v] of Object.entries(r)) {
        out[k] = v instanceof Date ? v.toISOString() : v;
      }
      return out;
    });

  return {
    kind: 'mysql',

    async query(sql, params = []) {
      const [rows] = await pool.query(sql, params.map((v) => (v === undefined ? null : v)));
      return normalize(rows);
    },

    async get(sql, params = []) {
      const rows = await this.query(sql, params);
      return rows[0];
    },

    async run(sql, params = []) {
      const [result] = await pool.query(sql, params.map((v) => (v === undefined ? null : v)));
      return { changes: result.affectedRows || 0, lastInsertRowid: result.insertId ?? null };
    },

    async exec(sql) {
      await pool.query(sql);
    },

    async transaction(callback) {
      const conn = await pool.getConnection();
      await conn.beginTransaction();
      try {
        const result = await callback();
        await conn.commit();
        return result;
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    },

    close() {
      return pool.end();
    },
  };
}