// Scroll Management Module
import { DOMUtils } from './utils.js';

export class ScrollManager {
    constructor() {
        this.scrollButton = null;
        this.init();
    }

    init() {
        this.createScrollToTopButton();
        this.bindScrollEvents();
        console.log('✅ Scroll module initialized');
    }

    createScrollToTopButton() {
        this.scrollButton = document.createElement('button');
        this.scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        this.scrollButton.className = 'scroll-to-top';
        this.scrollButton.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(this.scrollButton);

        // Handle click
        this.scrollButton.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    bindScrollEvents() {
        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', DOMUtils.debounce(() => {
            if (window.pageYOffset > 300) {
                this.scrollButton.classList.add('visible');
            } else {
                this.scrollButton.classList.remove('visible');
            }
        }, 100));
    }

    scrollToTop(smooth = true) {
        window.scrollTo({ 
            top: 0, 
            behavior: smooth ? 'smooth' : 'auto' 
        });
    }

    scrollToElement(element, offset = 0) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    }

    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}