# Architecture & Technical Details

**Date:** 2026-01-24

## Architecture Overview

**Static website without frameworks:**

- **Shared navigation and footer:** `js/components.js` dynamically injects HTML into all pages
- **Path detection:** `isSubpage` variable distinguishes root (`index.html`) vs. subpages (`pages/`), adjusts asset paths
- **Global functions:** `window.toggleMenu` is global for use in inline handlers (`onclick="toggleMenu()"`)

## Key Files

| File | Purpose |
|------|---------|
| index.html | Main page with hero section and section cards |
| css/style.css | Monolithic CSS (~2000 lines), all styles in one file |
| js/main.js | Universal interactivity (scroll, navigation, observers) |
| js/components.js | Shared nav/footer injection |
| js/gallery.js | Lightbox and filter logic for gallery |
| js/ha-lightbox.js | Lightbox for screenshots on HA page |
| js/analytics.js | GoatCounter tracking + visitor count display |

## JavaScript Patterns

### DOMContentLoaded Initialization
```javascript
document.addEventListener("DOMContentLoaded", () => {
  initFunctionality();
});
```

### Intersection Observer for Scroll Animations
```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document
  .querySelectorAll(".section-card")
  .forEach((el) => observer.observe(el));
```

## HTML Structure Conventions

- `<main>` contains all content (nav and footer injected from JS)
- **Page hero:** `.page-hero` with `.page-hero-content` + SVG icon
- **Content sections:** `.content-section` wrapper with padding
- **Cards:** `.section-card`, `.subsection-card`, `.experiment-card`, `.frost-card`, `.blog-note`

## CSS Naming Conventions

- **BEM-like:** `.gallery-item`, `.gallery-overlay`, `.gallery-caption`
- **State classes:** `.active`, `.visible`
- **Page-specific:** `.card-print`, `.card-ai`, `.card-frost`

## Gallery Pattern

```html
<div class="gallery-item" data-category="3d-print">
  <img src="../assets/images/gallery/nazev.jpg" alt="Popis" loading="lazy" />
  <div class="gallery-overlay">
    <span class="gallery-caption">Název fotky</span>
  </div>
</div>
```

**Filters:** `data-filter` attribute on tag buttons, `data-category` on items.

## Links and Paths

- **Internal links:** Relative (`pages/3d-print/`, `../../index.html`)
- **Assets:** Always relative from current page (`../../assets/images/...` from pages/*/`)
- **Subpage detection:** `window.location.pathname.includes('/pages/')`
- **Structure:** Each page in folder as `index.html` (clean URLs without .html)

## Responsivity

- **Mobile-first approach**
- **Hamburger menu:** `.nav-toggle` with `.nav-links.active`
- **Media queries:** Mobile (`@media (max-width: 768px)`)

## SEO & Meta

- `lang="cs"` on `<html>`
- SVG emoji favicon: `data:image/svg+xml,<svg...>⬡</svg>`
- Meta description on each page

## Cloudinary Integration

**Account:** dwuteqscm
**URL format:**
```
https://res.cloudinary.com/dwuteqscm/image/upload/TRANSFORM/NAME.jpg
```

**Recommended transformations:**

| Use Case | Transformation | Result |
|----------|---------------|--------|
| Printers | `w_800,q_auto,f_auto` | 800px width, auto quality |
| Projects | `w_600,q_auto,f_auto` | 600px width |
| Gallery thumb | `w_400,h_400,c_fill,q_auto,f_auto` | 400x400 square |
| Gallery full | `w_1600,q_auto,f_auto` | 1600px for lightbox |

## Analytics - GoatCounter

- **Code:** `ongy` (https://ongy.goatcounter.com)
- **Auto-skip:** localhost/127.0.0.1
- **Visitor count:** API call to `/counter/TOTAL.json`
- **Requires:** "Allow public access to counter API" in GoatCounter settings

## Important Notes

- **NEVER** use frameworks/libraries (React, Vue, jQuery)
- **NEVER** create package.json or build config
- All content in **Czech** (UI texts, alt texts, HTML comments)
- JavaScript comments can be Czech or English
- For new sections: copy pattern from existing pages (e.g., `pages/ai/index.html`)
