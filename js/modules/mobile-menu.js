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

        // Handle dropdown toggles in mobile
        this.navMenu.addEventListener('click', (e) => {
            const dropdownLink = e.target.closest('.dropdown > .nav__link');
            const dropdownItem = e.target.closest('.dropdown-content a');
            
            // Handle dropdown toggle (parent link) - in mobile, we want to toggle dropdown first
            if (dropdownLink && !dropdownItem) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = dropdownLink.parentElement;
                dropdown.classList.toggle('active');
                return;
            }
        });

        // Listen for navigation events to close menu
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('[data-section]');
            if (navLink && this.navMenu.classList.contains('active')) {
                const section = navLink.getAttribute('data-section');
                console.log('Mobile menu: Navigation to', section, 'detected');
                // Close menu when navigation happens
                setTimeout(() => {
                    this.close();
                }, 50);
            }
        });

        // Close menu when clicking on overlay
        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('menu-open') && 
                e.target === document.body.querySelector('body.menu-open::before')) {
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
        
        // Close all dropdowns
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }

    open() {
        this.navMenu.classList.add('active');
        this.navToggle.classList.add('active');
        document.body.classList.add('menu-open');
    }
}