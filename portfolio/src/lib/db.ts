import { useState, useEffect } from 'react';
import { ProfileData } from '../types';

const DB_NAME = 'portfolio_db';
const PROFILE_TABLE = 'profiles';
const ADMIN_TABLE = 'admins';

// Initialize database
export function initDB(): void {
  try {
    const db = localStorage.getItem(DB_NAME);
    if (!db) {
      const initialDB = {
        profiles: [],
        admins: [{ username: 'admin', password: 'admin123' }], // Default credentials
      };
      localStorage.setItem(DB_NAME, JSON.stringify(initialDB));
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

// Authenticate admin
export function authenticateAdmin(username: string, password: string): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    const admin = db.admins?.find(
      (a: { username: string; password: string }) => a.username === username && a.password === password
    );
    return !!admin;
  } catch (error) {
    console.error('Error authenticating admin:', error);
    return false;
  }
}

// Change admin password
export function changeAdminPassword(newPassword: string): boolean {
  try {
    const db = JSON.parse(localStorage.getItem(DB_NAME) || '{}');
    if (db.admins && db.admins.length > 0) {
      db.admins[0].password = newPassword;
      localStorage.setItem(DB_NAME, JSON.stringify(db));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error changing password:', error);
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
