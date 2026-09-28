import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';
const themeKey = 'htsv-theme';
const themeEvent = 'htsv-theme-change';

function applyTheme(theme: Theme, preference: Theme | 'system') {
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#16181c' : '#f8fafc');
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const syncSystem = () => {
    if (document.documentElement.dataset.themePreference === 'system') {
      applyTheme(media.matches ? 'dark' : 'light', 'system');
      onChange();
    }
  };
  const syncStorage = (event: StorageEvent) => {
    if (event.key !== themeKey && event.key !== null) return;
    const preference = event.newValue === 'dark' || event.newValue === 'light' ? event.newValue : 'system';
    applyTheme(preference === 'system' ? (media.matches ? 'dark' : 'light') : preference, preference);
    onChange();
  };
  syncSystem();
  window.addEventListener(themeEvent, onChange);
  window.addEventListener('storage', syncStorage);
  media.addEventListener('change', syncSystem);
  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener('storage', syncStorage);
    media.removeEventListener('change', syncSystem);
  };
}

function getTheme(): Theme { return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'; }

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'light' as const);
}

export function toggleTheme() {
  const theme = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(theme, theme);
  try { localStorage.setItem(themeKey, theme); } catch { /* Keep the selection for this session. */ }
  window.dispatchEvent(new Event(themeEvent));
}
