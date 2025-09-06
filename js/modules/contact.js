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

        // Send email using SMTP.js
        this.notification.show('Sending your message...', 'info');

        Email.send({
            Host: "smtp.yourmailserver.com",
            Username: "your@email.com",
            Password: "your_smtp_password",
            To: "receiver@example.com",
            From: data.email,
            Subject: data.subject || "Contact Form Message",
            Body: `
                <h3>New message from contact form</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Subject:</strong> ${data.subject || "N/A"}</p>
                <p><strong>Message:</strong><br/>${data.message.replace(/\n/g, "<br/>")}</p>
            `
        }).then(
            message => {
                if (message === 'OK') {
                    this.notification.show('Thank you for your message! We will get back to you within 24 hours.', 'success');
                    form.reset();
                } else {
                    this.notification.show('Failed to send message. Please try again later.', 'error');
                    console.error('Email send error:', message);
                }
            }
        );
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