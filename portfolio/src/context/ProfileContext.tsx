import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language, TrackType } from '../types';

interface ProfileContextType {
  language: Language;
  track: TrackType;
  setLanguage: (lang: Language) => void;
  setTrack: (track: TrackType) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [track, setTrack] = useState<TrackType>('qa');

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  const handleSetTrack = useCallback((newTrack: TrackType) => {
    setTrack(newTrack);
  }, []);

  return (
    <ProfileContext.Provider value={{ language, track, setLanguage: handleSetLanguage, setTrack: handleSetTrack }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
