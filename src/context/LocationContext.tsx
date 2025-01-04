'use client';

import CookieConsentBanner from '@/components/CookieConsentBanner/CookieConsentBanner';
import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { getCookie, setCookie } from '@/utils/cookie';

interface LocationContextType {
  location: string;
  setLocation: (location: string) => void;
}

interface State {
  location: string;
  hasConsented: boolean;
  showBanner: boolean;
}

type Action =
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'SET_CONSENT'; payload: boolean }
  | { type: 'HIDE_BANNER' };

const initialState: State = {
  location: 'United Kingdom',
  hasConsented: getCookie('cookie-consent') === 'true',
  showBanner: !getCookie('cookie-consent'),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_CONSENT':
      return { ...state, hasConsented: action.payload, showBanner: false };
    case 'HIDE_BANNER':
      return { ...state, showBanner: false };
    default:
      return state;
  }
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLocation = (newLocation: string) => {
    if (state.hasConsented) {
      setCookie('location', newLocation, { maxAge: 365 * 24 * 60 * 60 }); // 1 year expiry
    }
    dispatch({ type: 'SET_LOCATION', payload: newLocation });
  };

  const handleConsent = (consent: boolean) => {
    setCookie('cookie-consent', consent.toString(), { maxAge: 365 * 24 * 60 * 60 });
    dispatch({ type: 'SET_CONSENT', payload: consent });
  };

  useEffect(() => {
    if (state.hasConsented) {
      const savedLocation = getCookie('location');
      if (savedLocation) {
        dispatch({ type: 'SET_LOCATION', payload: savedLocation });
      }
    }
  }, [state.hasConsented]);

  return (
    <LocationContext.Provider value={{ location: state.location, setLocation }}>
      {children}
      {state.showBanner && <CookieConsentBanner onConsent={handleConsent} />}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
