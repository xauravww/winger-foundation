// News Module
import { NotificationManager } from './notifications.js';

export class NewsManager {
    constructor() {
        this.notification = new NotificationManager();
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.initNewsFilter();
        this.initNewsletterSignup();
        this.initLoadMore();
        this.loadNewsContent();
        console.log('✅ News module initialized');
    }

    initNewsFilter() {
        const filterButtons = document.querySelectorAll('.news-filter .filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter') || 'all';
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter news items
                this.filterNews(filter);
                this.currentFilter = filter;
            });
        });
    }

    initNewsletterSignup() {
        const newsletterForms = document.querySelectorAll('.newsletter-form');
        
        newsletterForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(form);
            });
        });
    }

    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreNews');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreNews();
            });
        }
    }

    filterNews(filter) {
        const newsCards = document.querySelectorAll('.news-card');
        
        newsCards.forEach((card, index) => {
            const category = card.getAttribute('data-category') || 'general';
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            } else {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    handleNewsletterSignup(form) {
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value.trim();
        
        if (!email) {
            this.notification.show('Please enter your email address.', 'error');
            return;
        }
        
        if (!this.isValidEmail(email)) {
            this.notification.show('Please enter a valid email address.', 'error');
            return;
        }
        
        this.notification.show('Subscribing to newsletter...', 'info');
        
        setTimeout(() => {
            this.notification.show('Thank you for subscribing! You will receive our latest updates.', 'success');
            form.reset();
        }, 1000);
    }

    loadNewsContent() {
        // This would typically load news from an API or CMS
        // For now, we'll create some sample news items
        this.createSampleNews();
    }

    createSampleNews() {
        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        const sampleNews = [
            {
                title: "500 Children Fed Daily in New Kitchen Program",
                excerpt: "Our latest kitchen initiative in Mumbai is now serving nutritious meals to 500 children daily, making a significant impact on local communities.",
                category: "kitchen",
                date: "2024-01-15",
                author: "Winger Foundation Team",
                image: "assets/news-1.jpg"
            },
            {
                title: "New School Opens in Rural Bihar",
                excerpt: "We're excited to announce the opening of our newest school facility, providing quality education to 200+ children in rural Bihar.",
                category: "education",
                date: "2024-01-10",
                author: "Education Team",
                image: "assets/news-2.jpg"
            },
            {
                title: "Volunteer Appreciation Event Success",
                excerpt: "Our annual volunteer appreciation event brought together 100+ dedicated volunteers who make our mission possible.",
                category: "events",
                date: "2024-01-05",
                author: "Community Team",
                image: "assets/news-3.jpg"
            }
        ];

        // Clear existing content
        newsGrid.innerHTML = '';

        // Create news cards
        sampleNews.forEach(news => {
            const newsCard = this.createNewsCard(news);
            newsGrid.appendChild(newsCard);
        });
    }

    createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.setAttribute('data-category', news.category);
        
        card.innerHTML = `
            <div class="news-image">
                <div class="news-placeholder">
                    <i class="fas ${this.getCategoryIcon(news.category)}"></i>
                </div>
            </div>
            <div class="news-content">
                <span class="news-card__category">${this.getCategoryLabel(news.category)}</span>
                <div class="news-card__meta">
                    <span class="news-date">${this.formatDate(news.date)}</span>
                    <span class="news-card__author">${news.author}</span>
                </div>
                <h3 class="news-content h3">${news.title}</h3>
                <p class="news-content p">${news.excerpt}</p>
                <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        // Add click handler for the entire card
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.news-card__read-more')) {
                this.handleNewsCardClick(news);
            }
        });
        
        return card;
    }

    getCategoryLabel(category) {
        const labels = {
            kitchen: 'Kitchen Program',
            education: 'Education',
            events: 'Events',
            community: 'Community',
            featured: 'Featured Story',
            general: 'General'
        };
        return labels[category] || 'News';
    }

    getCategoryIcon(category) {
        const icons = {
            kitchen: 'fa-utensils',
            education: 'fa-graduation-cap',
            events: 'fa-calendar-alt',
            community: 'fa-hands-helping',
            featured: 'fa-star',
            general: 'fa-newspaper'
        };
        return icons[category] || 'fa-newspaper';
    }

    handleNewsCardClick(news) {
        // This would typically open a modal or navigate to a detailed view
        this.notification.show(`Opening: ${news.title}`, 'info');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Public methods
    showCategory(category) {
        const filterButton = document.querySelector(`[data-filter="${category}"]`);
        if (filterButton) {
            filterButton.click();
        }
    }

    loadMoreNews() {
        const loadMoreBtn = document.getElementById('loadMoreNews');
        const originalText = loadMoreBtn.innerHTML;
        
        // Show loading state
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            const additionalNews = [
                {
                    title: "Mobile Health Clinic Reaches Remote Villages",
                    excerpt: "Our new mobile health initiative has successfully reached 15 remote villages, providing essential healthcare services to over 2000 people.",
                    category: "community",
                    date: "2024-01-08",
                    author: "Health Team",
                    image: "assets/news-mobile-health.jpg"
                },
                {
                    title: "Digital Learning Program Launches",
                    excerpt: "Introducing our new digital learning platform that will help students access quality education content from anywhere.",
                    category: "education",
                    date: "2024-01-03",
                    author: "Tech Team",
                    image: "assets/news-digital-learning.jpg"
                }
            ];
            
            const newsGrid = document.querySelector('.news-grid');
            additionalNews.forEach((news, index) => {
                const newsCard = this.createNewsCard(news);
                newsCard.style.opacity = '0';
                newsCard.style.transform = 'translateY(30px)';
                newsGrid.appendChild(newsCard);
                
                setTimeout(() => {
                    newsCard.style.transition = 'all 0.5s ease';
                    newsCard.style.opacity = '1';
                    newsCard.style.transform = 'translateY(0)';
                }, index * 200);
            });
            
            // Reset button
            loadMoreBtn.innerHTML = originalText;
            loadMoreBtn.disabled = false;
            
            this.notification.show('New stories loaded successfully!', 'success');
        }, 1500);
    }

    addNewsItem(newsData) {
        const newsGrid = document.querySelector('.news-grid');
        if (newsGrid) {
            const newsCard = this.createNewsCard(newsData);
            newsGrid.insertBefore(newsCard, newsGrid.firstChild);
        }
    }
}