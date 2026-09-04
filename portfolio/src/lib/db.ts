import { useState, useEffect } from 'react';
import type { ProfileData } from '../types';

const DB_NAME = 'portfolio_db';
const ADMIN_EMAIL = 'faridmaloof@gmail.com';
const DEFAULT_PASSWORD = 'Admin123!';
const DEFAULT_USERNAME = 'admin';

// Initialize database with default admin
export function initDB(): void {
  try {
    const db = localStorage.getItem(DB_NAME);
    if (!db) {
      const initialDB = {
        profiles: [],
        admins: [{
          email: ADMIN_EMAIL,
          username: DEFAULT_USERNAME,
          password: DEFAULT_PASSWORD,
          mustChangePassword: true,
          resetCode: null,
          resetCodeExpiry: null
        }],
      };
      localStorage.setItem(DB_NAME, JSON.stringify(initialDB));
    } else {
      // Ensure existing DB has the new admin structure
      const parsedDB = JSON.parse(db);
      if (!parsedDB.admins || parsedDB.admins.length === 0) {
        parsedDB.admins = [{
          email: ADMIN_EMAIL,
          username: DEFAULT_USERNAME,
          password: DEFAULT_PASSWORD,
          mustChangePassword: true,
          resetCode: null,
          resetCodeExpiry: null
        }];
        localStorage.setItem(DB_NAME, JSON.stringify(parsedDB));
      }
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Get all profiles
export function getProfiles(): ProfileData[] {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    return db.profiles || [];
  } catch (error) {
    console.error('Error getting profiles:', error);
    return [];
  }
}

// Save profile
export function saveProfile(profile: ProfileData): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    
    // Check if profile exists and update or create new
    const existingIndex = db.profiles.findIndex((p: ProfileData) => p.contact.email === profile.contact.email);
    
    if (existingIndex >= 0) {
      db.profiles[existingIndex] = profile;
    } else {
      db.profiles.push(profile);
    }
    
    localStorage.setItem(DB_NAME, JSON.stringify(db));
    return true;
  } catch (error) {
    console.error('Error saving profile:', error);
    return false;
  }
}

// Delete profile
export function deleteProfile(email: string): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    db.profiles = db.profiles.filter((p: ProfileData) => p.contact.email !== email);
    localStorage.setItem(DB_NAME, JSON.stringify(db));
    return true;
  } catch (error) {
    console.error('Error deleting profile:', error);
    return false;
  }
}

// Authenticate admin by email or username
export function authenticateAdmin(identifier: string, password: string): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    const admin = db.admins?.find(
      (a: { email: string; username: string; password: string }) =>
        ((a.email || '').toLowerCase() === identifier.toLowerCase() || 
         (a.username || '').toLowerCase() === identifier.toLowerCase()) && 
        a.password === password
    );
    return !!admin;
  } catch (error) {
    console.error('Error authenticating admin:', error);
    return false;
  }
}

// Get admin by email or username
export function getAdminByIdentifier(identifier: string): any {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    return db.admins?.find((a: { email: string; username: string }) => 
      (a.email || '').toLowerCase() === identifier.toLowerCase() || 
      (a.username || '').toLowerCase() === identifier.toLowerCase()
    ) || null;
  } catch (error) {
    console.error('Error getting admin:', error);
    return null;
  }
}

// Generate reset code
export function generateResetCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

// Request password reset
export function requestPasswordReset(identifier: string): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    const admin = getAdminByIdentifier(identifier);
    
    if (!admin) {
      return false;
    }
    
    const resetCode = generateResetCode();
    const expiryTime = Date.now() + (15 * 60 * 1000); // 15 minutes
    
    // Update admin in array
    const adminIndex = db.admins.findIndex((a: { email: string; username: string }) => 
      (a.email || '').toLowerCase() === identifier.toLowerCase() || 
      (a.username || '').toLowerCase() === identifier.toLowerCase()
    );
    
    if (adminIndex >= 0) {
      db.admins[adminIndex].resetCode = resetCode;
      db.admins[adminIndex].resetCodeExpiry = expiryTime;
    }
    
    localStorage.setItem(DB_NAME, JSON.stringify(db));
    
    // In a real app, send email here. For now, log to console and show alert
    console.log(`Password reset code for ${admin.email}: ${resetCode}`);
    alert(`Reset Code sent to ${admin.email}: ${resetCode}`);
    
    return true;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return false;
  }
}

// Verify reset code
export function verifyResetCode(identifier: string, code: string): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    const admin = getAdminByIdentifier(identifier);
    
    if (!admin || !admin.resetCode || !admin.resetCodeExpiry) {
      return false;
    }
    
    if (Date.now() > admin.resetCodeExpiry) {
      // Code expired - clear it
      const adminIndex = db.admins.findIndex((a: { email: string; username: string }) => 
        (a.email || '').toLowerCase() === identifier.toLowerCase() || 
        (a.username || '').toLowerCase() === identifier.toLowerCase()
      );
      
      if (adminIndex >= 0) {
        db.admins[adminIndex].resetCode = null;
        db.admins[adminIndex].resetCodeExpiry = null;
        localStorage.setItem(DB_NAME, JSON.stringify(db));
      }
      return false;
    }
    
    return admin.resetCode === code;
  } catch (error) {
    console.error('Error verifying reset code:', error);
    return false;
  }
}

// Reset password with code
export function resetPasswordWithCode(identifier: string, code: string, newPassword: string): boolean {
  try {
    if (!verifyResetCode(identifier, code)) {
      return false;
    }
    
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    const admin = getAdminByIdentifier(identifier);
    
    if (!admin) {
      return false;
    }
    
    // Update admin in array
    const adminIndex = db.admins.findIndex((a: { email: string; username: string }) => 
      (a.email || '').toLowerCase() === identifier.toLowerCase() || 
      (a.username || '').toLowerCase() === identifier.toLowerCase()
    );
    
    if (adminIndex >= 0) {
      db.admins[adminIndex].password = newPassword;
      db.admins[adminIndex].resetCode = null;
      db.admins[adminIndex].resetCodeExpiry = null;
      db.admins[adminIndex].mustChangePassword = false;
      localStorage.setItem(DB_NAME, JSON.stringify(db));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}

// Change admin password (for currently logged in admin)
export function changeAdminPassword(newPassword: string): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    if (db.admins && db.admins.length > 0) {
      db.admins[0].password = newPassword;
      db.admins[0].mustChangePassword = false;
      localStorage.setItem(DB_NAME, JSON.stringify(db));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
}

// Check if admin must change password
export function mustChangePassword(identifier: string): boolean {
  try {
    const admin = getAdminByIdentifier(identifier);
    return admin?.mustChangePassword || false;
  } catch (error) {
    console.error('Error checking password change requirement:', error);
    return false;
  }
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
