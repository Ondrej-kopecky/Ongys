// ========================================
// ONGY.CZ - Shared Components
// Header & Footer pro všechny stránky
// ========================================

// Zjistíme hloubku podle cesty
// Root: /index.html nebo /
// Subpage: /pages/nazev/ (složka s index.html)
// Sub-subpage: /pages/nazev/subpage/ (např. /pages/ai/brain/)
const pathDepth = window.location.pathname.split('/').filter(p => p && !p.includes('.')).length;
const basePath = pathDepth >= 3 ? '../../..' : (pathDepth === 2 ? '../..' : (pathDepth === 1 ? '..' : '.'));

// Navigation HTML - čisté URL bez .html
const navHTML = `
<nav class="navbar">
    <a href="${basePath}/" class="logo">
        <span class="logo-text">Ong<span class="logo-y">y</span></span>
        <span class="logo-hex">⬡</span>
    </a>
    <button class="nav-toggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <ul class="nav-links" id="nav-links">
        <li><a href="${basePath}/">Home</a></li>
        <li><a href="${basePath}/pages/3d-print/">3D Print</a></li>
        <li><a href="${basePath}/pages/homeassistant/">Home Assistant</a></li>
        <li><a href="${basePath}/pages/ai/">AI</a></li>
        <li><a href="${basePath}/pages/deskovky/">Deskovky</a></li>
        <li><a href="${basePath}/pages/blog/">Blog</a></li>
        <li><a href="${basePath}/pages/gallery/">Galerie</a></li>
        <li><a href="${basePath}/#about">O mně</a></li>
    </ul>
</nav>
`;

// Global toggle function
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
}
window.toggleMenu = toggleMenu;

// Footer HTML
const footerHTML = `
<footer class="footer">
    <div class="footer-content">
        <div class="footer-logo">
            <span class="logo-text">Ong<span class="logo-y">y</span></span>
            <span class="logo-hex">⬡</span>
        </div>
        <p class="footer-text">© 2025–2026 ongy.cz | Vytvořeno s ❤️ a trochou filamentu</p>
        <div class="footer-stats">
            <span class="visitor-count" title="Počet návštěv">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                <span id="visitor-count-number">–</span>
            </span>
        </div>
        <div class="footer-links">
            <a href="https://github.com/Ondrej-kopecky" target="_blank" rel="noopener">GitHub</a>
            <a href="https://www.linkedin.com/in/ond%C5%99ej-kopeck%C3%BD-1322b162/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="mailto:o.kopecky@seznam.cz">E-mail</a>
        </div>
    </div>
</footer>
`;

// Inject components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Insert navigation at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Insert footer at the end of body (before scripts)
    const mainContent = document.querySelector('main') || document.body;
    mainContent.insertAdjacentHTML('afterend', footerHTML);
    
    // Initialize navigation functionality
    initNavigation();
});

function initNavigation() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Mark active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.98)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.9)';
        }
    });
}

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
});
