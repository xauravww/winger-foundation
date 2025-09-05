// Footer Module with Micro-Animations
import { NotificationManager } from './notifications.js';
import { ValidationUtils } from './utils.js';

export class FooterManager {
    constructor() {
        this.notification = new NotificationManager();
        this.init();
    }

    init() {
        this.initNewsletterSignup();
        this.initBackToTop();
        this.initSocialLinks();
        this.initScrollAnimations();
        this.initFooterLinks();
        console.log('✅ Footer module initialized');
    }

    initNewsletterSignup() {
        const newsletterForms = document.querySelectorAll('.footer__newsletter-form');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(form);
            });
        });
    }

    initBackToTop() {
        const backToTopBtn = document.querySelector('.footer__back-to-top');
        
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                this.scrollToTop();
            });
        }
    }

    initSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-icon');
        
        socialLinks.forEach(link => {
            // Add ripple effect on click
            link.addEventListener('click', (e) => {
                this.createRippleEffect(e, link);
            });

            // Add hover sound effect (optional)
            link.addEventListener('mouseenter', () => {
                this.addHoverEffect(link);
            });
        });
    }

    initScrollAnimations() {
        // Animate footer sections when they come into view
        const footerSections = document.querySelectorAll('.footer__section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        footerSections.forEach(section => {
            observer.observe(section);
        });
    }

    initFooterLinks() {
        const footerLinks = document.querySelectorAll('.footer__section a[data-section]');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                
                // Navigate to section
                if (window.WingerFoundation?.showSection) {
                    window.WingerFoundation.showSection(section);
                }
                
                // Scroll to top
                this.scrollToTop();
                
                // Add click animation
                this.addClickAnimation(link);
            });
        });
    }

    handleNewsletterSignup(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value.trim();
        
        if (!email) {
            this.notification.show('Please enter your email address.', 'error');
            this.shakeElement(emailInput);
            return;
        }
        
        if (!ValidationUtils.isValidEmail(email)) {
            this.notification.show('Please enter a valid email address.', 'error');
            this.shakeElement(emailInput);
            return;
        }
        
        // Show loading state
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.notification.show('Thank you for subscribing! You will receive our latest updates.', 'success');
            form.reset();
            button.textContent = originalText;
            button.disabled = false;
            
            // Add success animation
            this.addSuccessAnimation(form);
        }, 1500);
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add scroll animation feedback
        const backToTopBtn = document.querySelector('.footer__back-to-top');
        if (backToTopBtn) {
            backToTopBtn.style.transform = 'translateY(-4px) scale(1.2) rotate(360deg)';
            setTimeout(() => {
                backToTopBtn.style.transform = '';
            }, 600);
        }
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
            if (element.querySelectorAll('span').length === 0) {
                style.remove();
            }
        }, 600);
    }

    addHoverEffect(element) {
        // Subtle hover effect without position change
        element.style.filter = 'brightness(1.1)';
        element.style.transition = 'filter 0.3s ease-out';
        
        setTimeout(() => {
            element.style.filter = '';
            element.style.transition = '';
        }, 300);
    }

    addClickAnimation(element) {
        // Subtle click feedback without position change
        element.style.opacity = '0.8';
        element.style.transition = 'opacity 0.1s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '';
            setTimeout(() => {
                element.style.transition = '';
            }, 200);
        }, 100);
    }

    addSuccessAnimation(form) {
        form.style.animation = 'successPulse 0.6s ease-out';
        
        setTimeout(() => {
            form.style.animation = '';
        }, 600);
    }

    shakeElement(element) {
        if (!element) return;
        
        element.style.animation = 'shake 0.5s ease-out';
        element.style.borderColor = 'var(--error)';
        
        setTimeout(() => {
            element.style.animation = '';
            element.style.borderColor = '';
        }, 500);
    }

    // Utility method to add floating animation to elements
    addFloatingAnimation(selector, duration = 3000, delay = 0) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `floating ${duration}ms ease-in-out infinite`;
                element.style.animationDelay = `${index * 200}ms`;
            }, delay);
        });
    }

    // Method to create particle effects
    createParticleEffect(x, y, color = 'var(--primary-orange)') {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: particle 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    // Public methods
    animateFooterEntry() {
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.style.animation = 'slideInUp 0.8s ease-out';
        }
    }

    highlightSection(sectionName) {
        const section = document.querySelector(`[data-section="${sectionName}"]`);
        if (section) {
            section.style.animation = 'highlight 1s ease-out';
            setTimeout(() => {
                section.style.animation = '';
            }, 1000);
        }
    }
}

// Add CSS animations for footer effects
const footerAnimationStyles = `
    
    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); background: rgba(16, 185, 129, 0.1); }
        100% { transform: scale(1); background: rgba(255, 255, 255, 0.05); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes floating {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes particle {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes highlight {
        0% { background: transparent; }
        50% { background: rgba(255, 107, 53, 0.2); }
        100% { background: transparent; }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = footerAnimationStyles;
document.head.appendChild(styleSheet);