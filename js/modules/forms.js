// Forms Module
import { NotificationManager } from './notifications.js';
import { ValidationUtils } from './utils.js';

export class FormsManager {
    constructor() {
        this.notification = new NotificationManager();
        this.init();
    }

    init() {
        this.initDonationForm();
        this.initContactForm();
        this.initNewsletterForm();
        this.initFormValidation();
        console.log('✅ Forms module initialized');
    }

    initDonationForm() {
        const donationTypes = document.querySelectorAll('.donation-type');
        const amountButtons = document.querySelectorAll('.amount-btn');
        const customAmountInput = document.getElementById('custom-amount');
        const donationForm = document.querySelector('.donation-form');

        // Handle direct Razorpay donation links
        const razorpayLinks = document.querySelectorAll('a[href*="razorpay.com"]');
        razorpayLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.notification.show('Redirecting to secure payment page...', 'info');
            });
        });

        // Handle donation type selection
        donationTypes.forEach(type => {
            type.addEventListener('click', function() {
                donationTypes.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Handle amount button selection
        amountButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                amountButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                if (button.classList.contains('custom')) {
                    this.showCustomAmountInput(customAmountInput);
                } else {
                    this.hideCustomAmountInput(customAmountInput);
                }
            });
        });

        // Handle form submission
        if (donationForm) {
            donationForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDonationSubmission(donationForm);
            });
        }
    }

    initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission(contactForm);
        });
    }

    initNewsletterForm() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSubmission(form);
            });
        });
    }

    initFormValidation() {
        // Real-time validation for all form inputs
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('form-control')) {
                this.validateField(e.target);
            }
        });

        document.addEventListener('blur', (e) => {
            if (e.target.classList.contains('form-control')) {
                this.validateField(e.target);
            }
        }, true);
    }

    showCustomAmountInput(input) {
        if (input) {
            input.style.display = 'block';
            input.focus();
        }
    }

    hideCustomAmountInput(input) {
        if (input) {
            input.style.display = 'none';
            input.value = '';
        }
    }

    handleDonationSubmission(form) {
        if (!this.validateForm(form)) {
            this.notification.show('Please fill in all required fields correctly.', 'error');
            return;
        }

        this.notification.show('Processing your donation...', 'info');
        
        setTimeout(() => {
            this.notification.show('Thank you for your donation! You will be redirected to the payment page.', 'success');
            form.reset();
        }, 2000);
    }

    handleContactSubmission(form) {
        if (!this.validateForm(form)) {
            this.notification.show('Please fill in all required fields correctly.', 'error');
            return;
        }

        this.notification.show('Sending your message...', 'info');
        
        setTimeout(() => {
            this.notification.show('Thank you for your message! We will get back to you within 24 hours.', 'success');
            form.reset();
        }, 1500);
    }

    handleNewsletterSubmission(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value.trim();

        if (!email) {
            this.notification.show('Please enter your email address.', 'error');
            return;
        }

        if (!ValidationUtils.isValidEmail(email)) {
            this.notification.show('Please enter a valid email address.', 'error');
            emailInput?.classList.add('error');
            return;
        }

        this.notification.show('Subscribing...', 'info');
        
        setTimeout(() => {
            this.notification.show('Thank you for subscribing! You will receive our latest updates.', 'success');
            form.reset();
        }, 1000);
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');

        // Remove previous error state
        field.classList.remove('error');

        // Check if required field is empty
        if (required && !value) {
            field.classList.add('error');
            return false;
        }

        // Validate email
        if (type === 'email' && value && !ValidationUtils.isValidEmail(value)) {
            field.classList.add('error');
            return false;
        }

        // Validate phone
        if (type === 'tel' && value && !ValidationUtils.isValidPhone(value)) {
            field.classList.add('error');
            return false;
        }

        return true;
    }

    validateForm(form) {
        const fields = form.querySelectorAll('.form-control[required]');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }
}