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
  isValidProfile: boolean;
  refreshKey: number; // Force re-render when URL changes
}

const VALID_PROFILES: TrackType[] = ['qa', 'dev', 'combined'];

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [track, setTrackState] = useState<TrackType>('combined');
  const [isValidProfile, setIsValidProfile] = useState(true);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [showCompletedEducation, setShowCompletedEducation] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Read URL params on mount and when URL changes
  const parseUrlParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    const profileParam = params.get('profile');
    const langParam = params.get('lang');
    
    // Validate profile parameter
    if (profileParam) {
      if (VALID_PROFILES.includes(profileParam as TrackType)) {
        setTrackState(profileParam as TrackType);
        setIsValidProfile(true);
      } else {
        // Invalid profile - use default 'combined' and mark as invalid
        setTrackState('combined');
        setIsValidProfile(false);
      }
    } else {
      // No profile param - use default 'combined'
      setTrackState('combined');
      setIsValidProfile(true);
    }
    
    if (langParam && ['en', 'es'].includes(langParam)) {
      setLanguageState(langParam as Language);
    }
    
    setRefreshKey(prev => prev + 1);
  }, []);

  // Initial load
  useEffect(() => {
    parseUrlParams();
    
    // Listen for popstate (back/forward browser buttons)
    const handlePopState = () => parseUrlParams();
    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseUrlParams]);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    // Update URL without reload
    const params = new URLSearchParams(window.location.search);
    params.set('lang', lang);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    setRefreshKey(prev => prev + 1);
  }, []);

  const handleSetTrack = useCallback((newTrack: TrackType) => {
    setTrackState(newTrack);
    // Update URL without reload
    const params = new URLSearchParams(window.location.search);
    params.set('profile', newTrack);
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
    setRefreshKey(prev => prev + 1);
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
      setShowCompletedEducation,
      isValidProfile,
      refreshKey
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
