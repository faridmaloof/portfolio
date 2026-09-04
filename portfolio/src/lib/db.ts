import { useState, useEffect } from 'react';
import type { ProfileData } from '../types';

const DB_NAME = 'portfolio_db';
const ADMIN_EMAIL = 'faridmaloof@gmail.com';
const DEFAULT_PASSWORD = 'Admin123!';
const DEFAULT_USERNAME = 'admin';

// Initialize database with default admin and profile data
export function initDB(): void {
  try {
    let db = localStorage.getItem(DB_NAME);
    
    if (!db) {
      const initialDB = {
        profiles: [],
        admins: [{
          id: '1',
          email: ADMIN_EMAIL,
          username: DEFAULT_USERNAME,
          password: DEFAULT_PASSWORD,
          mustChangePassword: true,
          resetCode: null,
          resetCodeExpiry: null,
          createdAt: new Date().toISOString()
        }],
        settings: {
          defaultProfile: 'combined',
          defaultLanguage: 'es',
          showEarlyCareer: false,
          showOnlyCompletedEducation: false
        }
      };
      localStorage.setItem(DB_NAME, JSON.stringify(initialDB));
    } else {
      const parsedDB = JSON.parse(db);
      
      // Ensure existing DB has the new admin structure
      if (!parsedDB.admins || parsedDB.admins.length === 0) {
        parsedDB.admins = [{
          id: '1',
          email: ADMIN_EMAIL,
          username: DEFAULT_USERNAME,
          password: DEFAULT_PASSWORD,
          mustChangePassword: true,
          resetCode: null,
          resetCodeExpiry: null,
          createdAt: new Date().toISOString()
        }];
        localStorage.setItem(DB_NAME, JSON.stringify(parsedDB));
        return;
      }
      
      // Ensure admin has all required fields
      const admin = parsedDB.admins[0];
      if (!admin.id) admin.id = '1';
      if (!admin.email) admin.email = ADMIN_EMAIL;
      if (!admin.username) admin.username = DEFAULT_USERNAME;
      if (!admin.password) admin.password = DEFAULT_PASSWORD;
      if (admin.mustChangePassword === undefined) admin.mustChangePassword = true;
      if (!admin.createdAt) admin.createdAt = new Date().toISOString();
      
      // Ensure settings exist
      if (!parsedDB.settings) {
        parsedDB.settings = {
          defaultProfile: 'combined',
          defaultLanguage: 'es',
          showEarlyCareer: false,
          showOnlyCompletedEducation: false
        };
      }
      
      localStorage.setItem(DB_NAME, JSON.stringify(parsedDB));
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Get database
function getDB(): any {
  try {
    const db = localStorage.getItem(DB_NAME);
    return db ? JSON.parse(db) : null;
  } catch (error) {
    console.error('Error getting database:', error);
    return null;
  }
}

// Save database
function saveDB(db: any): boolean {
  try {
    localStorage.setItem(DB_NAME, JSON.stringify(db));
    return true;
  } catch (error) {
    console.error('Error saving database:', error);
    return false;
  }
}

// Get all profiles
export function getProfiles(): ProfileData[] {
  const db = getDB();
  return db?.profiles || [];
}

// Save profile
export function saveProfile(profile: ProfileData): boolean {
  const db = getDB();
  if (!db) return false;
  
  // Check if profile exists and update or create new
  const existingIndex = db.profiles.findIndex((p: ProfileData) => p.contact.email === profile.contact.email);
  
  if (existingIndex >= 0) {
    db.profiles[existingIndex] = profile;
  } else {
    db.profiles.push(profile);
  }
  
  return saveDB(db);
}

// Delete profile
export function deleteProfile(email: string): boolean {
  const db = getDB();
  if (!db) return false;
  
  db.profiles = db.profiles.filter((p: ProfileData) => p.contact.email !== email);
  return saveDB(db);
}

// Authenticate admin by email or username
export function authenticateAdmin(identifier: string, password: string): { success: boolean; admin?: any; error?: string } {
  const db = getDB();
  if (!db || !db.admins) {
    return { success: false, error: 'Database not initialized' };
  }
  
  const admin = db.admins.find(
    (a: any) =>
      ((a.email || '').toLowerCase() === identifier.toLowerCase() || 
       (a.username || '').toLowerCase() === identifier.toLowerCase()) && 
      a.password === password
  );
  
  if (!admin) {
    return { success: false, error: 'Invalid credentials' };
  }
  
  return { success: true, admin };
}

// Get admin by email or username
export function getAdminByIdentifier(identifier: string): any {
  const db = getDB();
  if (!db || !db.admins) return null;
  
  return db.admins.find((a: any) => 
    (a.email || '').toLowerCase() === identifier.toLowerCase() || 
    (a.username || '').toLowerCase() === identifier.toLowerCase()
  ) || null;
}

// Generate reset code
export function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

// Request password reset
export function requestPasswordReset(identifier: string): { success: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.admins) return { success: false, error: 'Database not initialized' };
  
  const admin = getAdminByIdentifier(identifier);
  
  if (!admin) {
    return { success: false, error: 'Admin not found' };
  }
  
  const resetCode = generateResetCode();
  const expiryTime = Date.now() + (15 * 60 * 1000); // 15 minutes
  
  // Update admin in array
  const adminIndex = db.admins.findIndex((a: any) => 
    (a.email || '').toLowerCase() === identifier.toLowerCase() || 
    (a.username || '').toLowerCase() === identifier.toLowerCase()
  );
  
  if (adminIndex >= 0) {
    db.admins[adminIndex].resetCode = resetCode;
    db.admins[adminIndex].resetCodeExpiry = expiryTime;
    saveDB(db);
    
    // In a real app, send email here. For now, log to console and show alert
    console.log(`Password reset code for ${admin.email}: ${resetCode}`);
    alert(`Reset Code sent to ${admin.email}: ${resetCode}\n\n(In production, this would be sent via email)`);
    
    return { success: true };
  }
  
  return { success: false, error: 'Admin not found' };
}

// Verify reset code
export function verifyResetCode(identifier: string, code: string): { valid: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.admins) return { valid: false, error: 'Database not initialized' };
  
  const admin = getAdminByIdentifier(identifier);
  
  if (!admin || !admin.resetCode || !admin.resetCodeExpiry) {
    return { valid: false, error: 'No reset code found' };
  }
  
  if (Date.now() > admin.resetCodeExpiry) {
    // Code expired - clear it
    const adminIndex = db.admins.findIndex((a: any) => 
      (a.email || '').toLowerCase() === identifier.toLowerCase() || 
      (a.username || '').toLowerCase() === identifier.toLowerCase()
    );
    
    if (adminIndex >= 0) {
      db.admins[adminIndex].resetCode = null;
      db.admins[adminIndex].resetCodeExpiry = null;
      saveDB(db);
    }
    return { valid: false, error: 'Code expired' };
  }
  
  if (admin.resetCode !== code) {
    return { valid: false, error: 'Invalid code' };
  }
  
  return { valid: true };
}

// Reset password with code
export function resetPasswordWithCode(identifier: string, code: string, newPassword: string): { success: boolean; error?: string } {
  const verification = verifyResetCode(identifier, code);
  if (!verification.valid) {
    return { success: false, error: verification.error };
  }
  
  const db = getDB();
  if (!db || !db.admins) return { success: false, error: 'Database not initialized' };
  
  const admin = getAdminByIdentifier(identifier);
  
  if (!admin) {
    return { success: false, error: 'Admin not found' };
  }
  
  // Update admin in array
  const adminIndex = db.admins.findIndex((a: any) => 
    (a.email || '').toLowerCase() === identifier.toLowerCase() || 
    (a.username || '').toLowerCase() === identifier.toLowerCase()
  );
  
  if (adminIndex >= 0) {
    db.admins[adminIndex].password = newPassword;
    db.admins[adminIndex].resetCode = null;
    db.admins[adminIndex].resetCodeExpiry = null;
    db.admins[adminIndex].mustChangePassword = false;
    saveDB(db);
    return { success: true };
  }
  
  return { success: false, error: 'Admin not found' };
}

// Change admin password (for currently logged in admin)
export function changeAdminPassword(adminId: string, newPassword: string): { success: boolean; error?: string } {
  const db = getDB();
  if (!db || !db.admins) return { success: false, error: 'Database not initialized' };
  
  const adminIndex = db.admins.findIndex((a: any) => a.id === adminId);
  
  if (adminIndex >= 0) {
    db.admins[adminIndex].password = newPassword;
    db.admins[adminIndex].mustChangePassword = false;
    saveDB(db);
    return { success: true };
  }
  
  return { success: false, error: 'Admin not found' };
}

// Check if admin must change password
export function mustChangePassword(identifier: string): boolean {
  const admin = getAdminByIdentifier(identifier);
  return admin?.mustChangePassword || false;
}

// Get settings
export function getSettings(): any {
  const db = getDB();
  return db?.settings || {
    defaultProfile: 'combined',
    defaultLanguage: 'es',
    showEarlyCareer: false,
    showOnlyCompletedEducation: false
  };
}

// Save settings
export function saveSettings(settings: any): boolean {
  const db = getDB();
  if (!db) return false;
  
  db.settings = { ...db.settings, ...settings };
  return saveDB(db);
}

// Get current user from session
export function getCurrentUser(): any {
  const userId = sessionStorage.getItem('currentAdminId');
  if (!userId) return null;
  
  const db = getDB();
  if (!db || !db.admins) return null;
  
  return db.admins.find((a: any) => a.id === userId) || null;
}

// Set current user
export function setCurrentUser(adminId: string): void {
  sessionStorage.setItem('currentAdminId', adminId);
}

// Logout
export function logout(): void {
  sessionStorage.removeItem('currentAdminId');
  sessionStorage.removeItem('isAdminAuthenticated');
}

// Hook to manage profile data
export function useProfileData() {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initDB();
    const loadedProfiles = getProfiles();
    setProfiles(loadedProfiles);
    setLoading(false);
  }, []);

  const addProfile = (profile: ProfileData) => {
    const success = saveProfile(profile);
    if (success) {
      setProfiles(getProfiles());
    }
    return success;
  };

  const removeProfile = (email: string) => {
    const success = deleteProfile(email);
    if (success) {
      setProfiles(getProfiles());
    }
    return success;
  };

  return { profiles, loading, addProfile, removeProfile };
}
