// Comprehensive Image Management System for Winger Foundation
class ImageManager {
    constructor() {
        this.images = {
            // Logo and branding
            logo: 'assets/wingerfoundationlogo.avif',
            
            // Hero and banner images
            hero: 'assets/hero-section.jpeg',
            heroAlt: 'assets/LG1dcf1I9tIX.jpeg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.66_1.00_0.01/LG1dcf1I9tIX.jpeg',
            
            // Program specific images
            kitchen: 'assets/winger global kitchen.avif',
            school: 'assets/winger global school.avif',
            hospital: 'assets/winger global hospital.avif',
            water: 'assets/Winger Global Water .avif',
            
            // Campaign and awareness images
            campaigns: [
                'assets/Cleanliness Awareness Campaign.avif',
                'assets/Voter Awareness Campaign.avif',
                'assets/Water Awareness Campaign.avif',
                'assets/Because it\'s the time for a healthy India.avif'
            ],
            
            // Education focused images
            education: [
                'assets/EDUCATION- A WEAPON FOR EMANCIPATION FOR POOR CHILDREN.avif',
                'assets/The Importance of Education for Underprivileged Children.avif',
                'assets/The Role of Education in Transforming Charitable Efforts.avif',
                'assets/banner1-32 students get involved.avif',
                'assets/banner1-4 Option educators get involved.avif'
            ],
            
            // Social welfare and community
            community: [
                'assets/Outstanding Non-Profit Organization in Delhi NCR for Social Welfare.avif',
                'assets/childrens.avif',
                'assets/Old Age.avif',
                'assets/5.avif',
                'assets/5.jpeg'
            ],
            
            // Women empowerment
            womenEmpowerment: [
                'assets/Women Empowerment.avif',
                'assets/Women- The Epitome of goodness.avif',
                'assets/Living for the women upliftment.avif'
            ],
            
            // Get involved and volunteering
            getInvolved: [
                'assets/banner1-1-volunteering -get involved.avif',
                'assets/heads-black-white-holstein-cows-feeding-grass-stable-holland Artificial Insemination Training.avif'
            ],
            
            // Gallery images (PNG folders)
            gallery: [
                'assets/4RVaPcWlaXVd.png/',
                'assets/5g9hjvwKbzby.jpeg/',
                'assets/bkE0WXdFs0uK.png/',
                'assets/IPh9imaMa5bf.png/',
                'assets/p4L2oGdKK8ki.png/',
                'assets/sR7Jiu9wzq3n.png/',
                'assets/taB2wRnB2Lbw.png/',
                'assets/U4MBnnXyiyKt.png/',
                'assets/XUbxF8CDN4Xo.png/'
            ]
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
            this.images.hero,
            this.images.heroAlt,
            this.images.education[0],
            this.images.community[0]
        ];
        
        let currentImageIndex = 0;
        const heroImageElement = document.querySelector('.hero__image img');
        
        if (heroImageElement) {
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
                    <button class="filter-btn" data-filter="kitchen">Kitchen</button>
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
        this.images.education.forEach((img, index) => {
            galleryHTML += `
                <div class="gallery-item" data-category="education">
                    <img src="${img}" alt="Education Program ${index + 1}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Education Initiative</h3>
                        <p>Empowering children through quality education</p>
                    </div>
                </div>
            `;
        });
        
        // Add community images
        this.images.community.forEach((img, index) => {
            galleryHTML += `
                <div class="gallery-item" data-category="community">
                    <img src="${img}" alt="Community Service ${index + 1}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Community Service</h3>
                        <p>Supporting communities in need</p>
                    </div>
                </div>
            `;
        });
        
        // Add campaign images
        this.images.campaigns.forEach((img, index) => {
            galleryHTML += `
                <div class="gallery-item" data-category="campaigns">
                    <img src="${img}" alt="Awareness Campaign ${index + 1}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Awareness Campaign</h3>
                        <p>Creating awareness for social causes</p>
                    </div>
                </div>
            `;
        });
        
        // Add women empowerment images
        this.images.womenEmpowerment.forEach((img, index) => {
            galleryHTML += `
                <div class="gallery-item" data-category="women">
                    <img src="${img}" alt="Women Empowerment ${index + 1}" loading="lazy">
                    <div class="gallery-overlay">
                        <h3>Women Empowerment</h3>
                        <p>Supporting women's rights and development</p>
                    </div>
                </div>
            `;
        });
        
        // Add kitchen image
        galleryHTML += `
            <div class="gallery-item" data-category="kitchen">
                <img src="${this.images.kitchen}" alt="Global Kitchen" loading="lazy">
                <div class="gallery-overlay">
                    <h3>Winger Global Kitchen</h3>
                    <p>Feeding the hungry with nutritious meals</p>
                </div>
            </div>
        `;
        
        return galleryHTML;
    }
    
    // Update program sections with specific images
    updateProgramImages() {
        // Update kitchen section
        const kitchenSection = document.getElementById('kitchen');
        if (kitchenSection) {
            this.addImageToSection(kitchenSection, this.images.kitchen, 'Winger Global Kitchen in action');
        }
        
        // Update school section
        const schoolSection = document.getElementById('school');
        if (schoolSection) {
            this.addImageToSection(schoolSection, this.images.school, 'Winger Global School students');
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
                image: this.images.campaigns[0],
                title: "Cleanliness Awareness Campaign",
                excerpt: "Our recent cleanliness drive reached over 1000 families, promoting hygiene and sanitation.",
                date: "March 15, 2024"
            },
            {
                image: this.images.education[0],
                title: "Education - A Weapon for Emancipation",
                excerpt: "Providing quality education to underprivileged children continues to be our primary focus.",
                date: "March 10, 2024"
            },
            {
                image: this.images.womenEmpowerment[0],
                title: "Women Empowerment Initiative",
                excerpt: "Empowering women through skill development and entrepreneurship programs.",
                date: "March 5, 2024"
            },
            {
                image: this.images.campaigns[1],
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
    
    // Update about section with community images
    updateAboutImages() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const impactSection = aboutSection.querySelector('.impact-section');
            if (impactSection) {
                const imageGrid = document.createElement('div');
                imageGrid.className = 'about-image-grid';
                imageGrid.innerHTML = `
                    <div class="about-images">
                        <img src="${this.images.community[1]}" alt="Children we serve" class="about-img">
                        <img src="${this.images.community[2]}" alt="Elderly care" class="about-img">
                        <img src="${this.images.getInvolved[0]}" alt="Volunteers" class="about-img">
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
                        <img src="${this.images.getInvolved[0]}" alt="Volunteer with us">
                        <h3>Volunteer</h3>
                        <p>Join our team of dedicated volunteers and make a direct impact in your community.</p>
                        <button class="btn btn--primary">Become a Volunteer</button>
                    </div>
                    
                    <div class="involvement-option">
                        <img src="${this.images.education[1]}" alt="Support education">
                        <h3>Support Education</h3>
                        <p>Help us provide quality education to underprivileged children across India.</p>
                        <button class="btn btn--primary">Support Education</button>
                    </div>
                    
                    <div class="involvement-option">
                        <img src="${this.images.kitchen}" alt="Feed the hungry">
                        <h3>Feed the Hungry</h3>
                        <p>Support our kitchen program to provide nutritious meals to those in need.</p>
                        <button class="btn btn--primary">Support Kitchen</button>
                    </div>
                    
                    <div class="involvement-option">
                        <img src="${this.images.womenEmpowerment[1]}" alt="Women empowerment">
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
                image: this.images.campaigns[2],
                title: "Water Awareness Campaign",
                description: "Promoting water conservation and clean water access"
            },
            {
                image: this.images.campaigns[3],
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
            this.images.hero,
            this.images.logo,
            this.images.kitchen,
            this.images.school
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
}

// Initialize the image manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.imageManager = new ImageManager();
    window.imageManager.preloadImages();
});

// Export for external use
window.ImageManager = ImageManager;