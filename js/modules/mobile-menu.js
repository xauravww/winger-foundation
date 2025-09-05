// Mobile Menu Module
export class MobileMenuManager {
    constructor() {
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        if (!this.navToggle || !this.navMenu) return;
        
        this.bindEvents();
        console.log('✅ Mobile menu module initialized');
    }

    bindEvents() {
        this.navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.navToggle.contains(e.target)) {
                this.close();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    toggle() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    close() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    open() {
        this.navMenu.classList.add('active');
        this.navToggle.classList.add('active');
        document.body.classList.add('menu-open');
    }
}