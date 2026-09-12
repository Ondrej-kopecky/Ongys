// ========================================
// ONGY.CZ - Video Lightbox
// Kliknutí na <video data-lightbox> ho otevře zvětšené s ovládáním
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video[data-lightbox]');
    if (!videos.length) return;

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox video-lightbox';
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Zavřít">&times;</button>' +
        '<video class="video-lightbox-player" controls autoplay loop muted playsinline></video>' +
        '<div class="lightbox-caption"></div>';
    document.body.appendChild(overlay);

    const player = overlay.querySelector('video');
    const caption = overlay.querySelector('.lightbox-caption');
    const closeBtn = overlay.querySelector('.lightbox-close');

    function open(src, poster, text) {
        player.src = src;
        if (poster) player.poster = poster;
        caption.textContent = text || '';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        player.play().catch(() => {});
    }
    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        player.pause();
        player.removeAttribute('src');
        player.load();
    }

    videos.forEach(v => {
        v.style.cursor = 'zoom-in';
        v.setAttribute('title', 'Klikni pro zvětšení');
        v.addEventListener('click', () => {
            const src = v.currentSrc || (v.querySelector('source') || {}).src || v.src;
            const fig = v.closest('figure');
            const cap = fig ? fig.querySelector('figcaption') : null;
            open(src, v.poster, cap ? cap.textContent.trim() : '');
        });
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) close(); });
});
