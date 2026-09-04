import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Language, TrackType } from '../types';

interface ProfileContextType {
  language: Language;
  track: TrackType;
  setLanguage: (lang: Language) => void;
  setTrack: (track: TrackType) => void;
  showAllExperience: boolean;
  setShowAllExperience: (show: boolean) => void;
  showAllCertifications: boolean;
  setShowAllCertifications: (show: boolean) => void;
  showCompletedEducation: boolean;
  setShowCompletedEducation: (show: boolean) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [track, setTrack] = useState<TrackType>('qa');
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [showCompletedEducation, setShowCompletedEducation] = useState(true);

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const profileParam = params.get('profile');
    const langParam = params.get('lang');
    
    if (profileParam && ['qa', 'dev', 'combined'].includes(profileParam)) {
      setTrack(profileParam as TrackType);
    }
    
    if (langParam && ['en', 'es'].includes(langParam)) {
      setLanguage(langParam as Language);
    }
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    // Update URL without reload
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, []);

  const handleSetTrack = useCallback((newTrack: TrackType) => {
    setTrack(newTrack);
    // Update URL without reload
    const params = new URLSearchParams(window.location.search);
    params.set('profile', newTrack);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, []);

  return (
    <ProfileContext.Provider value={{ 
      language, 
      track, 
      setLanguage: handleSetLanguage, 
      setTrack: handleSetTrack,
      showAllExperience,
      setShowAllExperience,
      showAllCertifications,
      setShowAllCertifications,
      showCompletedEducation,
      setShowCompletedEducation
    }}>
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
