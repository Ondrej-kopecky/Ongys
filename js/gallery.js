// ========================================
// ONGY.CZ - Gallery functionality
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});

function initGallery() {
    const filterButtons = document.querySelectorAll('.gallery-tag');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.dataset.filter;
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.3s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    if (lightbox) {
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        let visibleItems = [];
        
        // Open lightbox
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                visibleItems = Array.from(galleryItems).filter(i => i.style.display !== 'none');
                currentIndex = visibleItems.indexOf(item);
                openLightbox(item);
            });
        });
        
        function openLightbox(item) {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption');
            
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        function showNext() {
            currentIndex = (currentIndex + 1) % visibleItems.length;
            openLightbox(visibleItems[currentIndex]);
        }
        
        function showPrev() {
            currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
            openLightbox(visibleItems[currentIndex]);
        }
        
        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        });
    }
}

// Helper function to add images to gallery
// Usage: addGalleryImage('3d-print', 'photo.jpg', 'Popis fotky')
function addGalleryImage(category, filename, caption) {
    const grid = document.querySelector('.gallery-grid');
    const placeholder = document.querySelector('.gallery-placeholder');
    
    if (placeholder) {
        placeholder.style.display = 'none';
    }
    
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.category = category;
    item.innerHTML = `
        <img src="../assets/images/gallery/${filename}" alt="${caption}" loading="lazy">
        <div class="gallery-overlay">
            <span class="gallery-caption">${caption}</span>
        </div>
    `;
    
    grid.appendChild(item);
}
