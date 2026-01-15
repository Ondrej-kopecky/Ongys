// ========================================
// ONGY.CZ - HA Page Lightbox
// Zvětšení screenshotů na fullscreen
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initHALightbox();
});

function initHALightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');

    // Najdi všechny screenshoty na stránce
    const screenshots = document.querySelectorAll('.ha-screenshot-item img, .ha-screenshot-main img');
    let currentIndex = 0;
    let visibleItems = [];

    // Přidej cursor pointer a click event
    screenshots.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            visibleItems = Array.from(screenshots);
            currentIndex = index;
            openLightbox(img);
        });
    });

    function openLightbox(img) {
        // Použij větší verzi obrázku pro lightbox (w_1600 místo w_600)
        let fullSrc = img.src.replace(/w_600/, 'w_1600').replace(/w_1200/, 'w_1600');
        lightboxImage.src = fullSrc;
        lightboxImage.alt = img.alt;
        
        // Najdi caption z parent elementu
        const parent = img.closest('.ha-screenshot-item');
        const captionEl = parent ? parent.querySelector('p') : null;
        lightboxCaption.textContent = captionEl ? captionEl.textContent : img.alt;
        
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
