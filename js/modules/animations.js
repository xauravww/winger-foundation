// Animations Module
export class AnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
        console.log('✅ Animations module initialized');
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
    }

    observeElements() {
        const animateElements = document.querySelectorAll(`
            .program-card, .stat-card, .involvement-option, .giving-option, 
            .impact-stat, .edu-feature, .news-card, .gallery-item, 
            .value-item, .contact-detail
        `);

        animateElements.forEach(el => this.observer.observe(el));
    }

    triggerSectionAnimations(section) {
        const animateElements = section.querySelectorAll(`
            .program-card, .stat-card, .involvement-option, .giving-option, 
            .impact-stat, .edu-feature, .news-card, .gallery-item, 
            .value-item, .contact-detail
        `);

        animateElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-fade-in-up');
            }, index * 100);
        });
    }

    fadeIn(element, delay = 0) {
        setTimeout(() => {
            element.classList.add('animate-fade-in-up');
        }, delay);
    }

    fadeOut(element, callback) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }
}