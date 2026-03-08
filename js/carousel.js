// ========================================
// ONGY.CZ - Carousel functionality
// Pro Dashboard a Grafana screenshoty
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializace Dashboard carousel
    initCarousel('carouselContainer', 'carouselDots', 'screenshot');

    // Inicializace Grafana carousel
    initCarousel('grafanaContainer', 'grafanaDots', 'grafana');

    // Event listeners pro carousel nav buttony (místo inline onclick)
    document.querySelectorAll('.carousel-nav[data-carousel]').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.carousel;
            const dir = parseInt(btn.dataset.dir, 10);
            if (name === 'grafana') {
                moveCarouselGeneric('grafana', 'grafanaContainer', 'grafanaDots', dir);
            } else if (name === 'screenshot') {
                moveCarouselGeneric('screenshot', 'carouselContainer', 'carouselDots', dir);
            }
        });
    });
});

// Globální stav carouselů
const carouselStates = {
    screenshot: { currentSlide: 0, totalSlides: 0 },
    grafana: { currentSlide: 0, totalSlides: 0 }
};

function initCarousel(containerId, dotsId, carouselName) {
    const container = document.getElementById(containerId);
    const dotsContainer = document.getElementById(dotsId);
    
    if (!container || !dotsContainer) return;
    
    const slides = container.querySelectorAll('.carousel-slide');
    carouselStates[carouselName].totalSlides = slides.length;
    
    // Vytvoření teček
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(carouselName, containerId, dotsId, index));
        dotsContainer.appendChild(dot);
    });
    
    // Autoplay - posun každých 5 sekund, pauza při hoveru
    let autoplayTimer = setInterval(() => {
        moveCarouselGeneric(carouselName, containerId, dotsId, 1);
    }, 5000);

    const carouselEl = container.closest('.screenshot-carousel');
    if (carouselEl) {
        carouselEl.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        carouselEl.addEventListener('mouseleave', () => {
            autoplayTimer = setInterval(() => {
                moveCarouselGeneric(carouselName, containerId, dotsId, 1);
            }, 5000);
        });
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(carouselName, containerId, dotsId);
    }, { passive: true });
    
    function handleSwipe(name, contId, dotsId) {
        const diff = touchStartX - touchEndX;
        if (diff > 50) {
            // Swipe left - next
            moveCarouselGeneric(name, contId, dotsId, 1);
        } else if (diff < -50) {
            // Swipe right - prev
            moveCarouselGeneric(name, contId, dotsId, -1);
        }
    }
}

function goToSlide(carouselName, containerId, dotsId, slideIndex) {
    const container = document.getElementById(containerId);
    const dots = document.getElementById(dotsId).querySelectorAll('.carousel-dot');
    
    carouselStates[carouselName].currentSlide = slideIndex;
    container.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === slideIndex);
    });
}

function moveCarouselGeneric(carouselName, containerId, dotsId, direction) {
    const state = carouselStates[carouselName];
    let newSlide = state.currentSlide + direction;
    
    if (newSlide < 0) newSlide = state.totalSlides - 1;
    if (newSlide >= state.totalSlides) newSlide = 0;
    
    goToSlide(carouselName, containerId, dotsId, newSlide);
}

// Globální funkce pro onclick handlery
function moveCarousel(direction) {
    moveCarouselGeneric('screenshot', 'carouselContainer', 'carouselDots', direction);
}

function moveGrafanaCarousel(direction) {
    moveCarouselGeneric('grafana', 'grafanaContainer', 'grafanaDots', direction);
}

// Keyboard navigation (pouze pokud není lightbox aktivní)
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.classList.contains('active')) return;
    
    // Najdi, který carousel je ve viewportu
    const screenshotCarousel = document.getElementById('screenshotCarousel');
    const grafanaCarousel = document.getElementById('grafanaCarousel');
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        
        // Zkontroluj, který carousel je viditelný
        if (isInViewport(screenshotCarousel)) {
            moveCarousel(direction);
        } else if (isInViewport(grafanaCarousel)) {
            moveGrafanaCarousel(direction);
        }
    }
});

function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}

// Export pro případné další použití
window.moveCarousel = moveCarousel;
window.moveGrafanaCarousel = moveGrafanaCarousel;
