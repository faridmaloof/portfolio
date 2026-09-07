/**
 * PostgreSQL driver adapter (optional).
 * Activated when DB_CONNECTION=postgres.
 */
export async function createPostgresConnection(config) {
  let pg;
  try {
    pg = (await import('pg')).default;
  } catch {
    throw new Error(
      'DB_CONNECTION=postgres requires the "pg" package. Run: npm install pg'
    );
  }

  const client = new pg.Client({
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbDatabase,
    user: config.dbUsername,
    password: config.dbPassword,
    ssl: config.dbSsl ? { rejectUnauthorized: false } : undefined,
    max: 10,
  });
  await client.connect();

  return {
    kind: 'postgres',

    async query(sql, params = []) {
      const result = await client.query(sql, params.map((v) => (v === undefined ? null : v)));
      return result.rows;
    },

    async get(sql, params = []) {
      const rows = await this.query(sql, params);
      return rows[0];
    },

    async run(sql, params = []) {
      const result = await client.query(sql, params.map((v) => (v === undefined ? null : v)));
      return { changes: result.rowCount || 0, lastInsertRowid: null };
    },

    async exec(sql) {
      await client.query(sql);
    },

    async transaction(callback) {
      await client.query('BEGIN');
      try {
        const result = await callback();
        await client.query('COMMIT');
        return result;
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      }
    },

    close() {
      return client.end();
    },
  };
}