// Back to Top Button Module
export class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.scrollThreshold = 300; // Show button after scrolling 300px
        this.init();
    }

    init() {
        if (!this.button) return;

        this.bindEvents();
        this.checkScroll(); // Check initial scroll position
    }

    bindEvents() {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => this.checkScroll());
        
        // Smooth scroll to top on click
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    checkScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.scrollThreshold) {
            this.showButton();
        } else {
            this.hideButton();
        }
    }

    showButton() {
        this.button.classList.add('visible');
    }

    hideButton() {
        this.button.classList.remove('visible');
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BackToTop();
});