// Get Involved Module
import { NotificationManager } from './notifications.js';
import { ValidationUtils } from './utils.js';

export class GetInvolvedManager {
    constructor() {
        this.notification = new NotificationManager();
        this.init();
    }

    init() {
        this.initVolunteerForm();
        this.initInvolvementOptions();
        this.loadInvolvementContent();
        console.log('✅ Get Involved module initialized');
    }

    initVolunteerForm() {
        const volunteerForm = document.querySelector('.volunteer-form');
        
        if (!volunteerForm) return;
        
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleVolunteerSubmission(volunteerForm);
        });
    }

    initInvolvementOptions() {
        const involvementOptions = document.querySelectorAll('.involvement-option');
        
        involvementOptions.forEach(option => {
            const button = option.querySelector('.btn');
            if (button) {
                button.addEventListener('click', () => {
                    const optionType = option.getAttribute('data-type') || 'general';
                    this.handleInvolvementInterest(optionType);
                });
            }
        });
    }

    loadInvolvementContent() {
        this.createInvolvementOptions();
    }

    createInvolvementOptions() {
        const optionsContainer = document.querySelector('.involvement-options');
        if (!optionsContainer) return;

        const involvementData = [
            {
                type: 'volunteer',
                icon: 'fas fa-hands-helping',
                title: 'Become a Volunteer',
                description: 'Join our team of dedicated volunteers and make a direct impact in your community.',
                benefits: [
                    'Flexible scheduling',
                    'Training provided',
                    'Community impact',
                    'Skill development'
                ]
            },
            {
                type: 'donate',
                icon: 'fas fa-heart',
                title: 'Make a Donation',
                description: 'Your financial support helps us expand our reach and serve more people in need.',
                benefits: [
                    'Tax deductible',
                    'Monthly or one-time',
                    'Direct impact',
                    'Regular updates'
                ]
            },
            {
                type: 'partner',
                icon: 'fas fa-handshake',
                title: 'Corporate Partnership',
                description: 'Partner with us to create lasting change while building your corporate social responsibility.',
                benefits: [
                    'Brand visibility',
                    'Employee engagement',
                    'Social impact',
                    'Custom programs'
                ]
            },
            {
                type: 'fundraise',
                icon: 'fas fa-users',
                title: 'Organize Fundraiser',
                description: 'Create your own fundraising campaign and rally your network for our cause.',
                benefits: [
                    'Campaign support',
                    'Marketing materials',
                    'Progress tracking',
                    'Recognition'
                ]
            },
            {
                type: 'advocate',
                icon: 'fas fa-bullhorn',
                title: 'Become an Advocate',
                description: 'Spread awareness about hunger and education issues in your community.',
                benefits: [
                    'Social media toolkit',
                    'Speaking opportunities',
                    'Advocacy training',
                    'Network building'
                ]
            },
            {
                type: 'sponsor',
                icon: 'fas fa-graduation-cap',
                title: 'Sponsor a Child',
                description: 'Directly support a child\'s education and nutrition with monthly sponsorship.',
                benefits: [
                    'Personal connection',
                    'Progress updates',
                    'Letters from child',
                    'Visit opportunities'
                ]
            }
        ];

        // Clear existing content
        optionsContainer.innerHTML = '';

        // Create involvement option cards
        involvementData.forEach(option => {
            const optionCard = this.createInvolvementCard(option);
            optionsContainer.appendChild(optionCard);
        });
    }

    createInvolvementCard(option) {
        const card = document.createElement('div');
        card.className = 'involvement-option';
        card.setAttribute('data-type', option.type);
        
        const benefitsList = option.benefits.map(benefit => `<li>${benefit}</li>`).join('');
        
        card.innerHTML = `
            <div class="involvement-option__icon">
                <i class="${option.icon}"></i>
            </div>
            <h3>${option.title}</h3>
            <p>${option.description}</p>
            <ul>${benefitsList}</ul>
            <button class="btn btn--secondary">Get Started</button>
        `;
        
        return card;
    }

    handleVolunteerSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.name || !data.email || !data.phone) {
            this.notification.show('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email
        if (!ValidationUtils.isValidEmail(data.email)) {
            this.notification.show('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate phone
        if (!ValidationUtils.isValidPhone(data.phone)) {
            this.notification.show('Please enter a valid phone number.', 'error');
            return;
        }
        
        this.notification.show('Submitting your volunteer application...', 'info');
        
        setTimeout(() => {
            this.notification.show('Thank you for your interest! We will contact you within 48 hours to discuss volunteer opportunities.', 'success');
            form.reset();
        }, 2000);
    }

    handleInvolvementInterest(type) {
        const actions = {
            volunteer: () => {
                this.scrollToVolunteerForm();
                this.notification.show('Please fill out the volunteer form below.', 'info');
            },
            donate: () => {
                // Navigate to donate section
                window.WingerFoundation?.showSection('donate');
                this.notification.show('Redirecting to donation page...', 'info');
            },
            partner: () => {
                this.notification.show('Please contact us at partnerships@wingerfoundation.org for corporate partnership opportunities.', 'info');
            },
            fundraise: () => {
                this.notification.show('Contact us at fundraising@wingerfoundation.org to start your fundraising campaign.', 'info');
            },
            advocate: () => {
                this.notification.show('Join our advocacy program by contacting advocacy@wingerfoundation.org', 'info');
            },
            sponsor: () => {
                this.notification.show('Learn more about child sponsorship at sponsor@wingerfoundation.org', 'info');
            }
        };
        
        const action = actions[type];
        if (action) {
            action();
        } else {
            this.notification.show('Contact us for more information about this opportunity.', 'info');
        }
    }

    scrollToVolunteerForm() {
        const volunteerForm = document.querySelector('.volunteer-form');
        if (volunteerForm) {
            volunteerForm.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Public methods
    showVolunteerForm() {
        this.scrollToVolunteerForm();
    }

    highlightOption(type) {
        const option = document.querySelector(`[data-type="${type}"]`);
        if (option) {
            option.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                option.style.animation = '';
            }, 1000);
        }
    }
}