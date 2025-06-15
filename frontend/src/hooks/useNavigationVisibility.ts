import { useState, useEffect, useRef } from 'react';

export function useNavigationVisibility<T extends HTMLElement>() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAboveViewport, setIsAboveViewport] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const rect = entry.boundingClientRect;
        const isIntersecting = entry.isIntersecting;
        
        setIsVisible(isIntersecting);
        
        // Element is above viewport if it's not intersecting AND its bottom is above the top of viewport
        if (!isIntersecting && rect.bottom < 0) {
          setIsAboveViewport(true);
        } else {
          setIsAboveViewport(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  // Monitor for modal/dialog elements
  useEffect(() => {
    const checkForModals = () => {
      // Check for common modal/dialog selectors
      const modals = document.querySelectorAll('[data-state="open"], [role="dialog"], .modal, [aria-modal="true"]');
      setIsModalOpen(modals.length > 0);
    };

    // Initial check
    checkForModals();

    // Use MutationObserver to watch for DOM changes (modals opening/closing)
    const observer = new MutationObserver(checkForModals);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state', 'aria-modal', 'role', 'class']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return { 
    ref: elementRef, 
    isVisible, 
    isAboveViewport,
    isModalOpen,
    shouldShowStickyNav: !isVisible && isAboveViewport && !isModalOpen
  };
}