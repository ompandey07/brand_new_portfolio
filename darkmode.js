// Dark Mode Implementation with System Preference Detection
(function() {
    'use strict';

    // Theme management
    const ThemeManager = {
        STORAGE_KEY: 'preferred-theme',
        THEME_LIGHT: 'light',
        THEME_DARK: 'dark',
        
        // Initialize theme
        init() {
            this.themeToggle = document.getElementById('themeToggle');
            this.initializeTheme();
            this.bindEvents();
        },
        
        // Get system preference
        getSystemPreference() {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return this.THEME_DARK;
            }
            return this.THEME_LIGHT;
        },
        
        // Get stored theme or system preference
        getStoredTheme() {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                return stored;
            }
            return this.getSystemPreference();
        },
        
        // Apply theme
        applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            
            // Update meta theme color
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', theme === this.THEME_DARK ? '#0f0f0f' : '#6366f1');
            }
            
            // Re-initialize Lucide icons if needed
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        },
        
        // Toggle theme
        toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === this.THEME_DARK ? this.THEME_LIGHT : this.THEME_DARK;
            
            this.applyTheme(newTheme);
            localStorage.setItem(this.STORAGE_KEY, newTheme);
            
            // Add animation effect
            this.addToggleAnimation();
        },
        
        // Initialize theme on load
        initializeTheme() {
            const theme = this.getStoredTheme();
            this.applyTheme(theme);
        },
        
        // Bind events
        bindEvents() {
            // Theme toggle button
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', () => this.toggleTheme());
            }
            
            // Listen for system theme changes
            if (window.matchMedia) {
                const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkModeQuery.addEventListener('change', (e) => {
                    // Only apply if user hasn't manually set theme
                    if (!localStorage.getItem(this.STORAGE_KEY)) {
                        this.applyTheme(e.matches ? this.THEME_DARK : this.THEME_LIGHT);
                    }
                });
            }
            
            // Keyboard shortcut (Ctrl/Cmd + Shift + L)
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        },
        
        // Add toggle animation
        addToggleAnimation() {
            const button = this.themeToggle;
            if (button) {
                button.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
            }
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
    } else {
        ThemeManager.init();
    }
    
    // Export for global access if needed
    window.ThemeManager = ThemeManager;
})();