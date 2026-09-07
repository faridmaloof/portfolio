/**
 * Users & sessions repository — single source of truth for auth data.
 * Driver-agnostic: works with any adapter returned by server/database.js.
 */
import { getDatabase } from '../database.js';
import { hashToken } from '../auth.js';

// ---------- Users ----------

function mapUserRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    username: row.username,
    role: row.role,
    mustChangePassword: Boolean(row.must_change_password),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function countUsers() {
  const { driver } = await getDatabase();
  const row = await driver.get('SELECT COUNT(*) AS total FROM users');
  return Number(row?.total || 0);
}

export async function listUsers() {
  const { driver } = await getDatabase();
  const rows = await driver.query('SELECT id, email, username, role, must_change_password, created_at, updated_at FROM users ORDER BY created_at ASC');
  return rows.map(mapUserRow);
}

export async function findUserById(id) {
  const { driver } = await getDatabase();
  return mapUserRow(await driver.get('SELECT * FROM users WHERE id = ?', [id]));
}

export async function findUserByIdentifier(identifier) {
  const { driver } = await getDatabase();
  const clean = String(identifier || '').trim().toLowerCase();
  const rows = await driver.query(
    'SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(username) = ? LIMIT 1',
    [clean, clean]
  );
  return mapUserRow(rows[0]);
}

/** Returns the user AS STORED (including password_hash) for login checks. */
export async function findUserWithPasswordByIdentifier(identifier) {
  const { driver } = await getDatabase();
  const clean = String(identifier || '').trim().toLowerCase();
  const rows = await driver.query(
    'SELECT * FROM users WHERE LOWER(email) = ? OR LOWER(username) = ? LIMIT 1',
    [clean, clean]
  );
  return rows[0] || null;
}

export async function createUser({ id, email, username, passwordHash, role, mustChangePassword = true }) {
  const { driver } = await getDatabase();
  await driver.run(
    `INSERT INTO users (id, email, username, password_hash, role, must_change_password)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, email, username, passwordHash, role, mustChangePassword ? 1 : 0]
  );
  return findUserById(id);
}

export async function updateUserPassword(userId, passwordHash) {
  const { driver } = await getDatabase();
  await driver.run(
    'UPDATE users SET password_hash = ?, must_change_password = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [passwordHash, userId]
  );
}

export async function markUserMustChangePassword(userId, must = true) {
  const { driver } = await getDatabase();
  await driver.run(
    'UPDATE users SET must_change_password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [must ? 1 : 0, userId]
  );
}

export async function updateUserRole(userId, role) {
  const { driver } = await getDatabase();
  await driver.run(
    'UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [role, userId]
  );
}

export async function deleteUser(userId) {
  const { driver } = await getDatabase();
  await deleteUserSessions(userId);
  await driver.run('DELETE FROM users WHERE id = ?', [userId]);
}

export async function isLastUser(userId) {
  const { driver } = await getDatabase();
  const row = await driver.get(
    'SELECT COUNT(*) AS total FROM users WHERE id <> ?',
    [userId]
  );
  return Number(row?.total || 0) === 0;
}

// ---------- Sessions ----------

export async function createSession({ id, userId, token, ip, userAgent, expiresAt }) {
  const { driver } = await getDatabase();
  const tokenHash = hashToken(token);
  await driver.run(
    `INSERT INTO sessions (id, user_id, token_hash, ip, user_agent, expires_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, userId, tokenHash, ip || '', userAgent || '', expiresAt]
  );
}

export async function findSessionUser(token) {
  const { driver } = await getDatabase();
  const tokenHash = hashToken(token);
  const rows = await driver.query(
    `SELECT s.id AS session_id, s.expires_at, u.id, u.email, u.username, u.role, u.must_change_password, u.created_at, u.updated_at
     FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? LIMIT 1`,
    [tokenHash]
  );
  const row = rows[0];
  if (!row) return null;
  if (new Date(row.expires_at) < new Date()) {
    await deleteSessionToken(token);
    return null;
  }
  return mapUserRow(row);
}

export async function deleteSessionToken(token) {
  const { driver } = await getDatabase();
  await driver.run('DELETE FROM sessions WHERE token_hash = ?', [hashToken(token)]);
}

export async function deleteUserSessions(userId) {
  const { driver } = await getDatabase();
  await driver.run('DELETE FROM sessions WHERE user_id = ?', [userId]);
}

export async function countUserSessions(userId) {
  const { driver } = await getDatabase();
  const row = await driver.get('SELECT COUNT(*) AS total FROM sessions WHERE user_id = ?', [userId]);
  return Number(row?.total || 0);
}