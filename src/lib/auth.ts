/**
 * Authentication client.
 *
 * Two operation modes:
 *  1. `server` — the Express/Node backend is available. Sessions are
 *     managed with HttpOnly cookies (source of truth).
 *  2. `local`  — degraded/static-hosting mode. Falls back to an isolated
 *     localStorage store so the app remains testable without a backend.
 *
 * First-run bootstrap is handled by the caller: if `usersCount === 0` the
 * admin must be created (first user becomes superadmin and is asked to
 * change its password).
 */
import { hash, compare } from 'bcryptjs';

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: 'superadmin' | 'admin' | 'editor';
  mustChangePassword: boolean;
  createdAt?: string;
}

export interface AuthStatus {
  authenticated: boolean;
  user: AdminUser | null;
  usersCount: number;
  mode: 'server' | 'local';
}

// ---------------------------------------------------------------------------
// Local fallback store
// ---------------------------------------------------------------------------

const LS_USERS_KEY = 'portfolio_local_users';
const LS_SESSION_KEY = 'portfolio_local_session';
const LS_USER_KEY = 'portfolio_auth_user';

function cacheCurrentUser(user: AdminUser | null) {
  try {
    if (user) {
      localStorage.setItem(LS_USER_KEY, JSON.stringify(user));
      sessionStorage.setItem('currentAdminId', user.id);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      localStorage.setItem('currentAdminId', user.id);
      localStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      localStorage.removeItem(LS_USER_KEY);
    }
  } catch {
    /* ignore */
  }
}

interface LocalStoredUser extends AdminUser {
  passwordHash: string;
  createdAt: string;
}

function readLocalUsers(): LocalStoredUser[] {
  try {
    const raw = localStorage.getItem(LS_USERS_KEY);
    return raw ? (JSON.parse(raw) as LocalStoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeLocalUsers(users: LocalStoredUser[]) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}

function localUserToPublic(u: LocalStoredUser): AdminUser {
  return {
    id: u.id,
    email: u.email,
    username: u.username,
    role: u.role,
    mustChangePassword: u.mustChangePassword,
    createdAt: u.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Generic API request helper (same-origin)
// ---------------------------------------------------------------------------

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'same-origin',
    ...options,
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as any).error || `Request failed (${res.status})`);
  }
  return body as T;
}

let serverModeKnown: boolean | null = null;

async function isServerMode(): Promise<boolean> {
  if (serverModeKnown !== null) return serverModeKnown;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const res = await fetch('/api/auth/status', { signal: controller.signal, credentials: 'same-origin' });
    clearTimeout(timer);
    serverModeKnown = res.ok;
  } catch {
    serverModeKnown = false;
  }
  return serverModeKnown;
}

export function resetAuthModeCache() {
  serverModeKnown = null;
}

// ---------------------------------------------------------------------------
// Public auth API
// ---------------------------------------------------------------------------

export async function getAuthStatus(): Promise<AuthStatus> {
  if (await isServerMode()) {
    try {
      const status = await api<AuthStatus>('/api/auth/status');
      cacheCurrentUser(status.authenticated ? status.user : null);
      return status;
    } catch {
      return { authenticated: false, user: null, usersCount: 0, mode: 'local' };
    }
  }

  const users = readLocalUsers();
  const sessionId = localStorage.getItem(LS_SESSION_KEY);
  const current = users.find((u) => u.id === sessionId) || null;
  cacheCurrentUser(current ? localUserToPublic(current) : null);
  return {
    authenticated: Boolean(current),
    user: current ? localUserToPublic(current) : null,
    usersCount: users.length,
    mode: 'local',
  };
}

export async function registerFirstAdmin(input: { email: string; username: string; password: string }) {
  if (await isServerMode()) {
    const res = await api<{ success: boolean; user: AdminUser }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    cacheCurrentUser(res.user);
    return res;
  }

  const users = readLocalUsers();
  if (users.length > 0) {
    throw new Error('La registración inicial ya fue completada');
  }
  const id = `usr_${Date.now().toString(36)}`;
  const user: LocalStoredUser = {
    id,
    email: input.email.trim().toLowerCase(),
    username: input.username.trim(),
    passwordHash: await hash(input.password, 10),
    role: 'superadmin',
    mustChangePassword: true,
    createdAt: new Date().toISOString(),
  };
  writeLocalUsers([user]);
  localStorage.setItem(LS_SESSION_KEY, id);
  cacheCurrentUser(localUserToPublic(user));
  return { success: true, user: localUserToPublic(user) };
}

export async function login(identifier: string, password: string): Promise<{ success: boolean; user: AdminUser }> {
  if (await isServerMode()) {
    const res = await api<{ success: boolean; user: AdminUser }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
    cacheCurrentUser(res.user);
    return res;
  }

  const users = readLocalUsers();
  const clean = identifier.trim().toLowerCase();
  const found = users.find((u) => u.email.toLowerCase() === clean || u.username.toLowerCase() === clean);
  if (!found || !(await compare(password, found.passwordHash))) {
    throw new Error('Credenciales inválidas');
  }
  localStorage.setItem(LS_SESSION_KEY, found.id);
  cacheCurrentUser(localUserToPublic(found));
  return { success: true, user: localUserToPublic(found) };
}

export async function logout(): Promise<void> {
  try {
    if (await isServerMode()) {
      await api('/api/auth/logout', { method: 'POST' }).catch(() => {});
    }
  } finally {
    localStorage.removeItem(LS_SESSION_KEY);
    localStorage.removeItem(LS_USER_KEY);
    sessionStorage.removeItem('currentAdminId');
    sessionStorage.removeItem('isAdminAuthenticated');
    localStorage.removeItem('currentAdminId');
    localStorage.removeItem('isAdminAuthenticated');
  }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  if (await isServerMode()) {
    await api('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return;
  }

  const users = readLocalUsers();
  const sessionId = localStorage.getItem(LS_SESSION_KEY);
  const idx = users.findIndex((u) => u.id === sessionId);
  if (idx < 0) throw new Error('No autenticado');
  if (!(await compare(currentPassword, users[idx].passwordHash))) {
    throw new Error('La contraseña actual es incorrecta');
  }
  users[idx].passwordHash = await hash(newPassword, 10);
  users[idx].mustChangePassword = false;
  writeLocalUsers(users);
}

// Superadmin user management (server mode only; local fallback keeps a single user)

export async function listUsers(): Promise<AdminUser[]> {
  if (await isServerMode()) {
    const res = await api<{ users: AdminUser[] }>('/api/auth/users');
    return res.users;
  }
  return readLocalUsers().map(localUserToPublic);
}

export async function createUser(input: { email: string; username: string; password: string; role: AdminUser['role'] }) {
  if (await isServerMode()) {
    return api<{ user: AdminUser }>('/api/auth/users', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }
  throw new Error('No se pueden crear usuarios adicionales en modo local');
}

export async function deleteUser(userId: string) {
  if (await isServerMode()) {
    await api(`/api/auth/users/${encodeURIComponent(userId)}`, { method: 'DELETE' });
    return;
  }
  throw new Error('No se pueden eliminar usuarios en modo local');
}

export async function resetUserPassword(userId: string, newPassword: string) {
  if (await isServerMode()) {
    await api(`/api/auth/users/${encodeURIComponent(userId)}`, {
      method: 'PUT',
      body: JSON.stringify({ resetPassword: newPassword }),
    });
    return;
  }
  throw new Error('Operación no disponible en modo local');
}

// Session helpers kept for compatibility with existing components
export function isUserAuthenticated(): boolean {
  return Boolean(
    localStorage.getItem(LS_SESSION_KEY) ||
    sessionStorage.getItem('currentAdminId') ||
    sessionStorage.getItem('isAdminAuthenticated') === 'true'
  );
}

export function getCurrentUserLocal(): AdminUser | null {
  try {
    // Server-mode cached user first
    const cached = localStorage.getItem(LS_USER_KEY);
    if (cached) {
      try {
        return JSON.parse(cached) as AdminUser;
      } catch {
        /* fall through */
      }
    }
    const users = readLocalUsers();
    const id = localStorage.getItem(LS_SESSION_KEY) || sessionStorage.getItem('currentAdminId');
    const found = users.find((u) => u.id === id);
    return found ? localUserToPublic(found) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(adminId: string): void {
  sessionStorage.setItem('currentAdminId', adminId);
  localStorage.setItem('currentAdminId', adminId);
  sessionStorage.setItem('isAdminAuthenticated', 'true');
  localStorage.setItem('isAdminAuthenticated', 'true');
}