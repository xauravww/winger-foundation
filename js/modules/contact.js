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
        this.initFAQ();
        this.initMap();
        console.log('✅ Contact module initialized');
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
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.name || !data.email || !data.message) {
            this.notification.show('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        if (!ValidationUtils.isValidEmail(data.email)) {
            this.notification.show('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        this.notification.show('Sending your message...', 'info');
        
        setTimeout(() => {
            this.notification.show('Thank you for your message! We will get back to you within 24 hours.', 'success');
            form.reset();
        }, 1500);
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
}