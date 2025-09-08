// Navigation Module
export class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('[data-section]');
        this.sections = document.querySelectorAll('.section');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleInitialLoad();
        console.log('✅ Navigation module initialized');
    }

    bindEvents() {
        // Handle all navigation clicks
        document.addEventListener('click', (e) => {
            const element = e.target.closest('[data-section]');
            if (element) {
                e.preventDefault();
                const targetSection = element.getAttribute('data-section');
                this.showSection(targetSection);
                this.updateActiveNavLink(targetSection);
                this.updateURL(targetSection);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const section = e.state?.section || this.getInitialSection();
            this.showSection(section);
            this.updateActiveNavLink(section);
        });
    }

    showSection(sectionId) {
        console.log('Navigating to section:', sectionId);
        
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('Section activated:', sectionId);
        } else {
            // Fallback to home
            console.log('Section not found, falling back to home');
            document.getElementById('home').classList.add('active');
        }
    }

    updateActiveNavLink(sectionId) {
        document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.nav__link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateURL(sectionId) {
        history.pushState({ section: sectionId }, '', '/' + sectionId);
    }

    getInitialSection() {
        const path = window.location.pathname.substring(1);
        return path && document.getElementById(path) ? path : 'home';
    }

    handleInitialLoad() {
        const initialSection = this.getInitialSection();
        this.showSection(initialSection);
        this.updateActiveNavLink(initialSection);
        history.replaceState({ section: initialSection }, '', '/' + initialSection);
    }
}