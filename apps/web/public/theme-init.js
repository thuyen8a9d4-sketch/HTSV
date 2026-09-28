(function () {
  var preference = 'system';
  try {
    var saved = localStorage.getItem('htsv-theme');
    if (saved === 'light' || saved === 'dark') preference = saved;
  } catch { /* The switch still works when browser storage is unavailable. */ }
  var theme = preference === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#16181c' : '#f8fafc';
})();
