// ========================================
// ONGY.CZ - Scroll Reveal Animations
// Subtle fade-in when elements enter viewport
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Auto-add reveal class to common elements
    const selectors = [
        '.section-card',
        '.ha-card',
        '.printer-card',
        '.experiment-card',
        '.interest-card',
        '.work-item',
        '.blog-post',
        '.tip-card',
        '.ha-device-category',
        '.frost-card',
        '.filament-feature',
        '.filament-photo',
        '.timeline-item',
        '.about-teaser',
        '.about-hero',
        '.about-avatar',
        '.section-header'
    ];

    document.querySelectorAll(selectors.join(', ')).forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    // Add stagger class to grids
    document.querySelectorAll(
        '.sections-grid, .ha-hardware-grid, .printer-grid, .experiments-grid, ' +
        '.about-interests, .ha-devices-grid, .tips-grid, .filament-features, ' +
        '.filament-gallery, .about-timeline, .blog-list, .frost-grid'
    ).forEach(el => {
        el.classList.add('reveal-stagger');
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});
