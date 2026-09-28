import { useSyncExternalStore } from 'react';
import { ArrowUp } from './Icons';

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true });
  return () => window.removeEventListener('scroll', onChange);
}

function isPastThreshold() {
  return window.scrollY >= 300;
}

export function ScrollToTop() {
  const visible = useSyncExternalStore(subscribeToScroll, isPastThreshold, () => false);

  return (
    <button
      type="button"
      className="scroll-to-top"
      data-visible={visible}
      aria-label="Cuộn lên đầu trang"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      disabled={!visible}
      onClick={() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.getElementById('main-content')?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }}
    >
      <ArrowUp />
    </button>
  );
}
