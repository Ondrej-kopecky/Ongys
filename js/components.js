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

// Navigace - struktura (kategorie + podstránky pro přímý přístup)
const navItems = [
    { label: 'Home', href: `${basePath}/` },
    { label: '3D Print', href: `${basePath}/pages/3d-print/` },
    { label: 'Home Assistant', href: `${basePath}/pages/homeassistant/`, children: [
        { label: 'Zařízení & Hardware', href: `${basePath}/pages/homeassistant/devices/` },
        { label: 'Automatizace', href: `${basePath}/pages/homeassistant/automations/` },
        { label: 'Data & Monitoring', href: `${basePath}/pages/homeassistant/monitoring/` },
        { label: 'Tipy & Triky', href: `${basePath}/pages/homeassistant/tips/` },
        { label: 'Aluprof žaluzie', href: `${basePath}/pages/homeassistant/zaluzie/` },
    ] },
    { label: 'AI', href: `${basePath}/pages/ai/`, children: [
        { label: 'Brain System', href: `${basePath}/pages/ai/brain/` },
        { label: 'AI Coach', href: `${basePath}/pages/ai/coach/` },
        { label: 'GDPR Bot', href: `${basePath}/pages/ai/gdpr/` },
    ] },
    { label: 'Projects', href: `${basePath}/pages/projects/` },
    { label: 'Deskovky', href: `${basePath}/pages/deskovky/` },
    { label: 'Blog', href: `${basePath}/pages/blog/` },
    { label: 'O mně', href: `${basePath}/pages/about/` },
];

function renderNavItem(item) {
    if (!item.children) {
        return `<li><a href="${item.href}">${item.label}</a></li>`;
    }
    const subItems = item.children.map(
        (c) => `<li><a href="${c.href}">${c.label}</a></li>`
    ).join('');
    return `
        <li class="has-dropdown">
            <div class="nav-row">
                <a href="${item.href}">${item.label}</a>
                <button class="nav-caret" aria-label="Rozbalit ${item.label}" aria-expanded="false">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
            </div>
            <ul class="nav-dropdown">${subItems}</ul>
        </li>`;
}

// Navigation HTML - čisté URL bez .html
const navHTML = `
<nav class="navbar">
    <a href="${basePath}/" class="logo">
        <svg class="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon points="50,0 90,25 90,75 50,100 10,75 10,25" stroke="#2EE8C4" fill="none" stroke-width="4"/>
            <rect x="40" y="30" width="20" height="8" fill="#2EE8C4"/>
            <rect x="35" y="40" width="30" height="20" fill="#2EE8C4"/>
            <polygon points="38,60 62,60 55,75 45,75" fill="#2EE8C4"/>
            <circle cx="50" cy="85" r="3" fill="#2EE8C4"/>
        </svg>
        <span class="logo-text">ongy</span>
    </a>
    <button class="nav-toggle" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <ul class="nav-links" id="nav-links">
        ${navItems.map(renderNavItem).join('')}
    </ul>
</nav>
`;

// Global toggle function
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.querySelector('.nav-toggle');
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}
window.toggleMenu = toggleMenu;

// Footer HTML
const footerHTML = `
<footer class="footer">
    <div class="footer-content">
        <div class="footer-logo">
            <svg class="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,0 90,25 90,75 50,100 10,75 10,25" stroke="#2EE8C4" fill="none" stroke-width="4"/>
                <rect x="40" y="30" width="20" height="8" fill="#2EE8C4"/>
                <rect x="35" y="40" width="30" height="20" fill="#2EE8C4"/>
                <polygon points="38,60 62,60 55,75 45,75" fill="#2EE8C4"/>
                <circle cx="50" cy="85" r="3" fill="#2EE8C4"/>
            </svg>
            <span class="logo-text">ongy</span>
        </div>
        <p class="footer-text">© 2025–2026 ongy.cz | Vytvořeno s <svg style="width:16px;height:16px;vertical-align:-3px;filter:drop-shadow(0 0 4px rgba(46,232,196,0.4))" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.75L20.44 6.62V17.38L12 22.25L3.56 17.38V6.62L12 1.75Z" fill="none" stroke="#2EE8C4" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 17.1C11.1 16.32 10.18 15.57 9.33 14.87C7.18 13.08 5.9 11.93 5.9 9.93C5.9 8.35 7.1 7.15 8.66 7.15C9.79 7.15 10.63 7.73 11.17 8.55C11.51 9.06 12.49 9.06 12.83 8.55C13.37 7.73 14.21 7.15 15.34 7.15C16.9 7.15 18.1 8.35 18.1 9.93C18.1 11.93 16.82 13.08 14.67 14.87C13.82 15.57 12.9 16.32 12 17.1Z" fill="#2EE8C4"/></svg> trochou filamentu a chutí stavět nové věci</p>
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
            <a href="https://github.com/Ondrej-kopecky" target="_blank" rel="noopener" title="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" style="vertical-align: -3px;"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                GitHub
            </a>
            <a href="https://www.youtube.com/@bonggy23" target="_blank" rel="noopener" title="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" style="vertical-align: -3px;"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                YouTube
            </a>
            <a href="https://www.instagram.com/_ongy_/" target="_blank" rel="noopener" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" style="vertical-align: -3px;"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                Instagram
            </a>
            <a href="https://www.linkedin.com/in/ond%C5%99ej-kopeck%C3%BD-1322b162/" target="_blank" rel="noopener" title="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" style="vertical-align: -3px;"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
            </a>
            <a href="mailto:o.kopecky@seznam.cz" title="E-mail">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" height="18" style="vertical-align: -3px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                E-mail
            </a>
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
            document.body.classList.remove('menu-open');
        });
    });

    // Dropdown caret toggle (mobil) — rozbalí/sbalí podmenu, neproklikne na stránku
    document.querySelectorAll('.nav-caret').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const li = btn.closest('.has-dropdown');
            const open = li.classList.toggle('open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

    // Mark active page in navigation (porovnání normalizovaných cest)
    const normalize = (p) => p.replace(/index\.html$/, '').replace(/\/+$/, '/');
    const here = normalize(window.location.pathname);

    document.querySelectorAll('.nav-links a').forEach(link => {
        if (normalize(link.pathname) === here) {
            link.classList.add('active');
        }
    });

    // Zvýrazni rodičovskou kategorii, když jsem na její podstránce.
    // Přidá i .open → na MOBILU se podmenu rozbalí (vidím, kde jsem),
    // na DESKTOPU je .open neúčinné (tam se řídí jen hoverem) → zůstane sbalené.
    document.querySelectorAll('.has-dropdown').forEach(li => {
        const parentLink = li.querySelector('.nav-row > a');
        const pp = normalize(parentLink.pathname);
        if (pp !== '/' && here.startsWith(pp)) {
            parentLink.classList.add('active');
            li.classList.add('open');
            const caret = li.querySelector('.nav-caret');
            if (caret) caret.setAttribute('aria-expanded', 'true');
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
