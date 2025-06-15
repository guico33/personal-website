import { useNavigationContext } from '../contexts/NavigationContext';
import { Navigation } from './Navigation';

export function StickyNavigation() {
  const { shouldShowStickyNav } = useNavigationContext();

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200 shadow-[0_1px_3px_0_rgb(0_0_0_/_0.05)] transition-all duration-300 ${
        shouldShowStickyNav 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex justify-center">
          <Navigation />
        </div>
      </div>
    </div>
  );
}