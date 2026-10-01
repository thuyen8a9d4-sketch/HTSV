import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface HomeScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function HomeScrollReveal({ children, className = '', delay = 0 }: HomeScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const show = () => {
      element.dataset.revealState = 'visible';
      observer?.disconnect();
    };

    if (preference.matches) {
      show();
    } else {
      element.dataset.revealState = 'pending';
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show();
      }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
      observer.observe(element);
    }

    const handlePreferenceChange = () => {
      if (preference.matches) show();
    };
    preference.addEventListener('change', handlePreferenceChange);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', handlePreferenceChange);
      delete element.dataset.revealState;
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`home-reveal ${className}`}
      style={{ '--home-reveal-delay': `${delay}ms` } as CSSProperties}
      onFocusCapture={() => {
        if (elementRef.current) elementRef.current.dataset.revealState = 'visible';
      }}
    >
      {children}
    </div>
  );
}
