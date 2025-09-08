// Comprehensive Image Management System for Winger Foundation
class ImageManager {
    constructor() {
        this.images = {
            // Branding
            branding: {
                logo: 'assets/wingerfoundationlogo.avif'
            },

            // Hero images from dedicated folder
            hero: {
                hero1: 'assets/hero/hero1.png',
                hero2: 'assets/hero/hero2.png',
                hero3: 'assets/hero/hero3.png'
            },

            // About images from dedicated folder
            about: {
                about1: 'assets/about/about1',
                about2: 'assets/about/about2',
                about3: 'assets/about/about3'
            },

            // Core programs
            programs: {
                kitchen: 'assets/winger global kitchen.avif',
                school: 'assets/winger global school.avif',
                hospital: 'assets/winger global hospital.avif',
                water: 'assets/Winger Global Water .avif'
            },

            // Education initiatives
            education: {
                main: 'assets/EDUCATION- A WEAPON FOR EMANCIPATION FOR POOR CHILDREN.avif',
                importance: 'assets/The Importance of Education for Underprivileged Children.avif',
                transformation: 'assets/The Role of Education in Transforming Charitable Efforts.avif'
            },

            // Community and social welfare
            community: {
                organization: 'assets/Outstanding Non-Profit Organization in Delhi NCR for Social Welfare.avif',
                children: 'assets/childrens.avif',
                elderly: 'assets/Old Age.avif'
            },

            // Women empowerment
            women: {
                empowerment: 'assets/Women Empowerment.avif',
                epitome: 'assets/Women- The Epitome of goodness.avif',
                upliftment: 'assets/Living for the women upliftment.avif'
            },

            // Awareness campaigns
            campaigns: {
                cleanliness: 'assets/Cleanliness Awareness Campaign.avif',
                voter: 'assets/Voter Awareness Campaign.avif',
                water: 'assets/Water Awareness Campaign.avif',
                health: 'assets/health.avif'
            },

            // Get involved and volunteering
            involvement: {
                volunteering: 'assets/banner1-1-volunteering -get involved.avif',
                students: 'assets/banner1-32 students get involved.avif',
                educators: 'assets/banner1-4 Option educators get involved.avif',
                training: 'assets/heads-black-white-holstein-cows-feeding-grass-stable-holland Artificial Insemination Training.avif'
            }
        };

        this.init();
    }

    init() {
        this.updateHeroImages();
        this.createImageGallery();
        this.updateProgramImages();
        this.createNewsSection();
        this.updateAboutImages();
        this.createCampaignSection();
    }

    // Update hero section with rotating background images
    updateHeroImages() {
        const heroImages = [
            this.images.hero.hero1,
            this.images.hero.hero2,
            this.images.hero.hero3
        ];

        let currentImageIndex = 0;
        const heroImageElement = document.querySelector('.hero__image img');

        if (heroImageElement) {
            // Set initial image
            heroImageElement.src = heroImages[0];
            
            // Rotate hero images every 5 seconds
            setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % heroImages.length;
                heroImageElement.src = heroImages[currentImageIndex];
            }, 5000);
        }
    }

    // Create comprehensive image gallery
    createImageGallery() {
        const gallerySection = document.getElementById('gallery');
        if (!gallerySection) return;

        const galleryHTML = `
            <div class="container">
                <h1>Our Gallery</h1>
                <p class="section__subtitle">Witness the impact of our work through these powerful moments</p>
                
                <div class="gallery-filters">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="education">Education</button>
                    <button class="filter-btn" data-filter="programs">Programs</button>
                    <button class="filter-btn" data-filter="community">Community</button>
                    <button class="filter-btn" data-filter="campaigns">Campaigns</button>
                    <button class="filter-btn" data-filter="women">Women Empowerment</button>
                </div>
                
                <div class="gallery-grid">
                    ${this.generateGalleryItems()}
                </div>
            </div>
        `;

        gallerySection.innerHTML = galleryHTML;
    }

    generateGalleryItems() {
        let galleryHTML = '';

        // Add education images
        Object.entries(this.images.education).forEach(([key, img]) => {
            const title = key.charAt(0).toUpperCase() + key.slice(1);
            galleryHTML += `
                <div class="gallery-item" data-category="education">
                    <img src="${img}" alt="Education - ${title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Education Initiative</h3>
                        <p>Empowering children through quality education</p>
                    </div>
                </div>
            `;
        });

        // Add community images
        Object.entries(this.images.community).forEach(([key, img]) => {
            const title = key.charAt(0).toUpperCase() + key.slice(1);
            galleryHTML += `
                <div class="gallery-item" data-category="community">
                    <img src="${img}" alt="Community - ${title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Community Service</h3>
                        <p>Supporting communities in need</p>
                    </div>
                </div>
            `;
        });

        // Add campaign images
        Object.entries(this.images.campaigns).forEach(([key, img]) => {
            const title = key.charAt(0).toUpperCase() + key.slice(1);
            galleryHTML += `
                <div class="gallery-item" data-category="campaigns">
                    <img src="${img}" alt="Campaign - ${title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Awareness Campaign</h3>
                        <p>Creating awareness for social causes</p>
                    </div>
                </div>
            `;
        });

        // Add women empowerment images
        Object.entries(this.images.women).forEach(([key, img]) => {
            const title = key.charAt(0).toUpperCase() + key.slice(1);
            galleryHTML += `
                <div class="gallery-item" data-category="women">
                    <img src="${img}" alt="Women - ${title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Women Empowerment</h3>
                        <p>Supporting women's rights and development</p>
                    </div>
                </div>
            `;
        });

        // Add program images
        Object.entries(this.images.programs).forEach(([key, img]) => {
            const title = key.charAt(0).toUpperCase() + key.slice(1);
            galleryHTML += `
                <div class="gallery-item" data-category="programs">
                    <img src="${img}" alt="Program - ${title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Winger Global ${title}</h3>
                        <p>Making a difference through our programs</p>
                    </div>
                </div>
            `;
        });

        return galleryHTML;
    }

    // Update program sections with specific images
    updateProgramImages() {
        // Images are now integrated into the hero sections, so we don't need to add them separately
        // This prevents duplicate images from appearing above the hero sections
        
        // Update hospital section (only if it doesn't have enhanced hero)
        const hospitalSection = document.getElementById('hospital');
        if (hospitalSection && !hospitalSection.querySelector('.project-hero-enhanced')) {
            this.addImageToSection(hospitalSection, this.images.programs.hospital, 'Winger Global Hospital services');
        }
        
        // Update water section (only if it doesn't have enhanced hero)
        const waterSection = document.getElementById('water');
        if (waterSection && !waterSection.querySelector('.project-hero-enhanced')) {
            this.addImageToSection(waterSection, this.images.programs.water, 'Winger Global Water project');
        }
    }

    addImageToSection(section, imageSrc, altText) {
        const container = section.querySelector('.container');
        if (container) {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'section-image';
            imageDiv.innerHTML = `
                <img src="${imageSrc}" alt="${altText}" class="section-hero-image">
            `;
            container.insertBefore(imageDiv, container.firstChild.nextSibling);
        }
    }

    // Create news section with campaign images
    createNewsSection() {
        const newsSection = document.getElementById('news');
        if (!newsSection) return;

        const newsHTML = `
            <div class="container">
                <h1>News & Stories</h1>
                <p class="section__subtitle">Stay updated with our latest initiatives and success stories</p>
                
                <div class="news-grid">
                    ${this.generateNewsItems()}
                </div>
            </div>
        `;

        newsSection.innerHTML = newsHTML;
    }

    generateNewsItems() {
        const newsItems = [
            {
                image: this.images.campaigns.cleanliness,
                title: "Cleanliness Awareness Campaign",
                excerpt: "Our recent cleanliness drive reached over 1000 families, promoting hygiene and sanitation.",
                date: "March 15, 2024"
            },
            {
                image: this.images.education.main,
                title: "Education - A Weapon for Emancipation",
                excerpt: "Providing quality education to underprivileged children continues to be our primary focus.",
                date: "March 10, 2024"
            },
            {
                image: this.images.women.empowerment,
                title: "Women Empowerment Initiative",
                excerpt: "Empowering women through skill development and entrepreneurship programs.",
                date: "March 5, 2024"
            },
            {
                image: this.images.campaigns.voter,
                title: "Voter Awareness Campaign",
                excerpt: "Educating communities about their voting rights and civic responsibilities.",
                date: "February 28, 2024"
            }
        ];

        return newsItems.map(item => `
            <article class="news-card">
                <div class="news-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="news-content">
                    <span class="news-date">${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.excerpt}</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </article>
        `).join('');
    }

    // Update about section with dedicated about images
    updateAboutImages() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const impactSection = aboutSection.querySelector('.impact-section');
            if (impactSection) {
                const imageGrid = document.createElement('div');
                imageGrid.className = 'about-image-grid';
                imageGrid.innerHTML = `
                    <div class="about-images">
                        <img src="${this.images.about.about1}" alt="About our mission" class="about-img">
                        <img src="${this.images.about.about2}" alt="Our impact" class="about-img">
                        <img src="${this.images.about.about3}" alt="Our team" class="about-img">
                    </div>
                `;
                impactSection.appendChild(imageGrid);
            }
        }
    }

    // Create campaign showcase section
    createCampaignSection() {
        const getInvolvedSection = document.getElementById('get-involved');
        if (!getInvolvedSection) return;

        const campaignHTML = `
            <div class="container">
                <h1>Get Involved</h1>
                <p class="section__subtitle">Join us in making a difference - every contribution counts</p>
                
                <div class="involvement-grid">
                    <div class="involvement-option">
                        <img src="${this.images.involvement.volunteering}" alt="Volunteer with us">
                        <h3>Volunteer</h3>
                        <p>Join our team of dedicated volunteers and make a direct impact in your community.</p>
                        <button class="btn btn--primary">Become a Volunteer</button>
                    </div>
                    
                    <div class="involvement-option">
                        <img src="${this.images.education.importance}" alt="Support education">
                        <h3>Support Education</h3>
                        <p>Help us provide quality education to underprivileged children across India.</p>
                        <button class="btn btn--primary">Support Education</button>
                    </div>
                    
                    <div class="involvement-option">
                        <img src="${this.images.programs.kitchen}" alt="Feed the hungry">
                        <h3>Feed the Hungry</h3>
                        <p>Support our kitchen program to provide nutritious meals to those in need.</p>
                        <button class="btn btn--primary">Support Kitchen</button>
                    </div>
                    
                    <div class="involvement-option">
                        <img src="${this.images.women.empowerment}" alt="Women empowerment">
                        <h3>Empower Women</h3>
                        <p>Support our women empowerment programs and skill development initiatives.</p>
                        <button class="btn btn--primary">Empower Women</button>
                    </div>
                </div>
                
                <div class="campaign-showcase">
                    <h2>Our Recent Campaigns</h2>
                    <div class="campaign-grid">
                        ${this.generateCampaignItems()}
                    </div>
                </div>
            </div>
        `;

        getInvolvedSection.innerHTML = campaignHTML;
    }

    generateCampaignItems() {
        const campaigns = [
            {
                image: this.images.campaigns.water,
                title: "Water Awareness Campaign",
                description: "Promoting water conservation and clean water access"
            },
            {
                image: this.images.campaigns.health,
                title: "Healthy India Initiative",
                description: "Building awareness for a healthier and stronger India"
            }
        ];

        return campaigns.map(campaign => `
            <div class="campaign-item">
                <img src="${campaign.image}" alt="${campaign.title}">
                <div class="campaign-content">
                    <h3>${campaign.title}</h3>
                    <p>${campaign.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Utility method to get random image from category
    getRandomImage(category) {
        const categoryImages = this.images[category];
        if (Array.isArray(categoryImages)) {
            return categoryImages[Math.floor(Math.random() * categoryImages.length)];
        }
        return categoryImages;
    }

    // Method to preload critical images
    preloadImages() {
        const criticalImages = [
            this.images.hero.hero1,
            this.images.hero.hero2,
            this.images.hero.hero3,
            this.images.branding.logo,
            this.images.about.about1,
            this.images.about.about2,
            this.images.about.about3
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Initialize the image manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    window.imageManager = new ImageManager();
    window.imageManager.preloadImages();
});

// Export for external use
window.ImageManager = ImageManager;