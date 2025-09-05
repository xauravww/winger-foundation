// Free Courses Module
export class FreeCoursesManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupAnimations();
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                const parentTabs = button.closest('.content-tabs');

                // Remove active class from all buttons and contents in this tab group
                parentTabs.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                parentTabs.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const targetContent = parentTabs.querySelector(`#${targetTab}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    setupAnimations() {
        // Animate cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe cards
        const cards = document.querySelectorAll('.overview-card, .detail-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Stagger animation for detail cards
        const detailCards = document.querySelectorAll('.detail-card');
        detailCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FreeCoursesManager();
});