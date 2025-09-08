// Gallery Module with Modal Functionality
export class GalleryManager {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.modal = null; // To hold the modal element
        this.init();
    }

    init() {
        if (!this.galleryItems.length) return;
        // this.initModal(); // Disabled to avoid conflicts with the modal in index.html
        console.log('✅ Gallery module initialized (dynamic modal disabled)');
    }

    initModal() {
        // Create the modal structure once and append it to the body
        this.createModal();

        // Add a click event listener to each gallery item
        this.galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const imageElement = item.querySelector('img');
                if (imageElement && imageElement.src) {
                    this.openModal(imageElement.src);
                }
            });
        });
    }

    createModal() {
        // Create the modal structure but keep it hidden
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'gallery-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="gallery-modal-content">
                <span class="gallery-modal-close" title="Close">&times;</span>
                <img src="" alt="Enlarged Gallery Image" class="gallery-modal-image">
            </div>
        `;
        document.body.appendChild(modalOverlay);
        this.modal = modalOverlay;

        // Add event listeners to close the modal
        this.modal.querySelector('.gallery-modal-close').addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            // Close if the click is on the overlay itself (the backdrop)
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close modal with the 'Escape' key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('visible')) {
                this.closeModal();
            }
        });
    }

    openModal(imgSrc) {
        if (!this.modal) return;
        
        // Set the image source and display the modal
        this.modal.querySelector('.gallery-modal-image').src = imgSrc;
        this.modal.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal() {
        if (!this.modal) return;

        this.modal.classList.remove('visible');
        document.body.style.overflow = ''; // Restore background scrolling
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Select all the items in your gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImageContent');
    const closeButton = document.querySelector('.modal-close');

    // Function to open the modal
    function openModal(imgSrc) {
        modalImage.src = imgSrc;
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('visible');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    // Add a click listener to each gallery item
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageElement = item.querySelector('img');
            if (imageElement) {
                openModal(imageElement.src);
            }
        });
    });

    // --- Listen for events to close the modal ---

    // 1. Click on the close button
    closeButton.addEventListener('click', closeModal);

    // 2. Click on the modal background (the overlay)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 3. Press the "Escape" key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });
});