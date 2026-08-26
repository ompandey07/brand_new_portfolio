// Theme Toggle — Dark is default, light-mode is opt-in via body class
(function () {
  'use strict';

  const STORAGE_KEY = 'om-theme-pref';

  function applyTheme(isLight) {
    if (isLight) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', isLight ? '#FAFAF8' : '#D4A853');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  function init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    // Default is dark unless user previously chose light
    const isLight = stored === 'light';
    applyTheme(isLight);

    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const nowLight = !document.body.classList.contains('light-mode');
        applyTheme(nowLight);
        localStorage.setItem(STORAGE_KEY, nowLight ? 'light' : 'dark');
        btn.style.transform = 'scale(0.88)';
        setTimeout(() => { btn.style.transform = 'scale(1)'; }, 160);
      });
    }

    // Keyboard shortcut Ctrl/Cmd + Shift + L
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        const nowLight = !document.body.classList.contains('light-mode');
        applyTheme(nowLight);
        localStorage.setItem(STORAGE_KEY, nowLight ? 'light' : 'dark');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.ThemeManager = { applyTheme };
})();