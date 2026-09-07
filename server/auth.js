/**
 * Authentication helpers: password hashing, session tokens and cookies.
 */
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { config } from './config.js';

export const COOKIE_NAME = 'portfolio_session';
export const BCRYPT_ROUNDS = 10;

export function hashPassword(plain) {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

export function createSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function generateId(prefix = 'id') {
  return `${prefix}_${crypto.randomBytes(12).toString('hex')}`;
}

export function setSessionCookie(res, token, ttlMs = config.sessionTtlMs) {
  const maxAgeSeconds = Math.floor(ttlMs / 1000);
  const secureFlag = config.isProduction ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secureFlag}`
  );
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export function extractToken(req) {
  const header = String(req.headers?.cookie || '');
  if (!header) return null;
  for (const part of header.split(';')) {
    const trimmed = part.trim();
    if (trimmed.startsWith(`${COOKIE_NAME}=`)) {
      const value = trimmed.slice(COOKIE_NAME.length + 1);
      return value ? decodeURIComponent(value) : null;
    }
  }
  return null;
}

export function getClientIp(req) {
  return (
    req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    ''
  );
}

/** Small in-memory login throttler (per identifier + ip). */
class LoginThrottler {
  constructor(maxAttempts = 5, windowMs = 5 * 60 * 1000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.map = new Map();
  }

  getKey(identifier, ip) {
    return `${identifier.toLowerCase()}|${ip}`;
  }

  check(identifier, ip) {
    const key = this.getKey(identifier, ip);
    const now = Date.now();
    const record = this.map.get(key);
    if (!record) return { allowed: true };
    if (now - record.startedAt > this.windowMs) {
      this.map.delete(key);
      return { allowed: true };
    }
    return { allowed: record.count < this.maxAttempts, retryAfterMs: record.startedAt + this.windowMs - now };
  }

  recordFailure(identifier, ip) {
    const key = this.getKey(identifier, ip);
    const now = Date.now();
    const record = this.map.get(key);
    if (!record || now - record.startedAt > this.windowMs) {
      this.map.set(key, { count: 1, startedAt: now });
    } else {
      record.count += 1;
    }
  }

  clear(identifier, ip) {
    this.map.delete(this.getKey(identifier, ip));
  }
}

export const loginThrottler = new LoginThrottler(config.loginMaxAttempts, config.loginWindowMs);