import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigationVisibility } from '../hooks/useNavigationVisibility';

interface NavigationContextType {
  heroNavRef: React.RefObject<HTMLDivElement | null>;
  shouldShowStickyNav: boolean;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const { ref: heroNavRef, shouldShowStickyNav } = useNavigationVisibility<HTMLDivElement>();

  return (
    <NavigationContext.Provider value={{ heroNavRef, shouldShowStickyNav }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationContext() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
}