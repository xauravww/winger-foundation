// Main Application Entry Point
import { NavigationManager } from './modules/navigation.js';
import { MobileMenuManager } from './modules/mobile-menu.js';
import { FormsManager } from './modules/forms.js';
import { NotificationManager } from './modules/notifications.js';
import { GalleryManager } from './modules/gallery.js';
import { AnimationManager } from './modules/animations.js';
import { ScrollManager } from './modules/scroll.js';
import { ContactManager } from './modules/contact.js';
import { NewsManager } from './modules/news.js';
import { GetInvolvedManager } from './modules/get-involved.js';
import { FooterManager } from './modules/footer.js';
import { BackToTop } from './modules/back-to-top.js';
import { FreeCoursesManager } from './modules/free-courses.js';
import { AnalyticsUtils } from './modules/utils.js';

class WingerFoundationApp {
    constructor() {
        this.modules = {};
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize all modules
            this.initializeModules();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Initialize performance optimizations
            this.initializeOptimizations();
            
            console.log('🌟 Winger Foundation Website Loaded Successfully');
            
        } catch (error) {
            console.error('❌ Error initializing application:', error);
        }
    }

    initializeModules() {
        try {
            // Core navigation
            this.modules.navigation = new NavigationManager();
            this.modules.mobileMenu = new MobileMenuManager();
            
            // UI components
            this.modules.forms = new FormsManager();
            this.modules.notifications = new NotificationManager();
            this.modules.gallery = new GalleryManager();
            this.modules.animations = new AnimationManager();
            this.modules.scroll = new ScrollManager();
            
            // Page-specific modules
            this.modules.contact = new ContactManager();
            this.modules.news = new NewsManager();
            this.modules.getInvolved = new GetInvolvedManager();
            this.modules.footer = new FooterManager();
            this.modules.backToTop = new BackToTop();
            this.modules.freeCourses = new FreeCoursesManager();
            
            console.log('✅ All modules initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing modules:', error);
        }
    }

    setupGlobalEvents() {
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            // Close mobile menu on desktop
            if (window.innerWidth > 768) {
                this.modules.mobileMenu?.close();
            }
        }, 250));

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Track navigation events
        document.addEventListener('click', (e) => {
            const element = e.target.closest('[data-section]');
            if (element) {
                const section = element.getAttribute('data-section');
                AnalyticsUtils.trackEvent('Navigation', 'Section View', section);
            }
        });

        // Error handling
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
        });
    }

    handleKeyboardNavigation(e) {
        // Close mobile menu with Escape
        if (e.key === 'Escape') {
            this.modules.mobileMenu?.close();
        }

        // Navigate sections with arrow keys (when focused on nav)
        if (e.target.classList.contains('nav__link')) {
            const navLinks = Array.from(document.querySelectorAll('.nav__link'));
            const currentIndex = navLinks.indexOf(e.target);

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % navLinks.length;
                navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
                navLinks[prevIndex].focus();
            }
        }
    }

    initializeOptimizations() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Register service worker for PWA capabilities
        this.registerServiceWorker();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('✅ ServiceWorker registration successful');
                    })
                    .catch(err => {
                        console.log('❌ ServiceWorker registration failed');
                    });
            });
        }
    }

    // Utility method
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API methods
    showNotification(message, type = 'info') {
        return this.modules.notifications?.show(message, type);
    }

    showSection(sectionId) {
        return this.modules.navigation?.showSection(sectionId);
    }

    trackEvent(category, action, label) {
        return AnalyticsUtils.trackEvent(category, action, label);
    }

    // Get module instance
    getModule(name) {
        return this.modules[name];
    }
}

// Initialize the application
const app = new WingerFoundationApp();

// Export for global access
window.WingerFoundation = {
    app,
    showNotification: (message, type) => app.showNotification(message, type),
    showSection: (sectionId) => app.showSection(sectionId),
    trackEvent: (category, action, label) => app.trackEvent(category, action, label)
};

// Console welcome message
console.log(`
🌟 Welcome to Winger Foundation Website
💙 Built with love for fighting hunger and providing education
🚀 Modern, responsive, and accessible design
📧 Contact: info@wingerfoundation.org
🔧 Version: 2.0.0 (Modular)
`);

export default app;