// Contact Module
import { NotificationManager } from './notifications.js';
import { ValidationUtils } from './utils.js';

export class ContactManager {
    constructor() {
        this.notification = new NotificationManager();
        this.init();
    }

    init() {
        this.initContactForm();
        this.initNewsletterForm();
        this.initFAQ();
        this.initMap();
        console.log('✅ Contact module initialized');
    }

    initNewsletterForm() {
        const newsletterForm = document.querySelector('.footer__newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmission(newsletterForm);
        });
    }

    handleNewsletterSubmission(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value.trim() : '';

        if (!email) {
            this.notification.show('Please enter your email address.', 'error');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.notification.show('Please enter a valid email address.', 'error');
            return;
        }

        const mailtoSubject = encodeURIComponent('Newsletter Subscription');
        const mailtoBody = encodeURIComponent(`Please subscribe me to the newsletter.\nEmail: ${email}`);

        const mailtoLink = `mailto:info@wingerfoundation.org?subject=${mailtoSubject}&body=${mailtoBody}`;

        window.location.href = mailtoLink;

        this.notification.show('Opening your mail client...', 'info');
        form.reset();
    }

    initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(contactForm);
        });
    }

    initFAQ() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = question.classList.contains('active');
                
                // Close all other FAQs
                faqQuestions.forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                });
                
                // Toggle current FAQ
                if (!isActive) {
                    question.classList.add('active');
                    answer.classList.add('active');
                }
            });
        });
    }

    initMap() {
        // Placeholder for map initialization
        // You can integrate Google Maps, OpenStreetMap, etc. here
        const mapContainer = document.querySelector('.map-container');
        
        if (mapContainer && mapContainer.querySelector('.map-placeholder')) {
            // Add click handler to show map integration options
            mapContainer.addEventListener('click', () => {
                this.notification.show('Map integration can be added here (Google Maps, OpenStreetMap, etc.)', 'info');
            });
        }
    }

    handleContactSubmission(form) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim() || 'Contact Form Message';
        const message = document.getElementById('message').value.trim();

        // Validate required fields
        if (!name || !email || !message) {
            this.notification.show('Please fill in all required fields.', 'error');
            return;
        }

        // Validate email
        if (!ValidationUtils.isValidEmail(email)) {
            this.notification.show('Please enter a valid email address.', 'error');
            return;
        }

        // Compose mailto link
        const mailtoSubject = encodeURIComponent(subject);
        const mailtoBody = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`
        );

        const mailtoLink = `mailto:info@wingerfoundation.org?subject=${mailtoSubject}&body=${mailtoBody}`;

        // Open mail client
        window.location.href = mailtoLink;

        this.notification.show('Opening your mail client...', 'info');
        form.reset();
    }

    // Public methods
    openFAQ(index) {
        const faqQuestions = document.querySelectorAll('.faq-question');
        if (faqQuestions[index]) {
            faqQuestions[index].click();
        }
    }

    scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

        initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            if (question && answer) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.toggle('active');
                    if (isActive) {
                        answer.style.display = 'block';
                    } else {
                        answer.style.display = 'none';
                    }
                });
            }
        });
    }
}