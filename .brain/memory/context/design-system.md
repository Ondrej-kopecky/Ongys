# Design System

**Date:** 2026-01-24

## CSS Variables (defined in `:root`)

```css
--electric-teal: #2ee8c4;     /* Main accent */
--warm-amber: #ffa94d;         /* Secondary accent */
--deep-indigo: #1e1b3a;        /* Cards */
--midnight: #121212;           /* Background */
--card-bg: #1a1a2e;            /* Cards and blocks */
--glow-teal: rgba(46, 232, 196, 0.3);  /* Box-shadow glow effects */
```

## Color Palette

| Color         | Hex       | Usage            |
|---------------|-----------|------------------|
| Deep Indigo   | `#1E1B3A` | Primary dark     |
| Electric Teal | `#2EE8C4` | Accent, links    |
| Warm Amber    | `#FFA94D` | Secondary accent |
| Midnight      | `#121212` | Background       |
| Soft White    | `#F2F2F2` | Text             |

## Fonts (from Google Fonts)

- **Montserrat** (600, 700, 800) - Headings
- **Inter** (400, 500, 600) - Body text
- **JetBrains Mono** - Code, numbers

## Visual Style

- **Dark mode only**
- **Mobile-first approach** – always test and optimize for mobile devices
- **Neon glow effects on hover:** `box-shadow: 0 0 20px var(--glow-teal)`
- **Hexagon/⬡ motif** across design
- **SVG icons** consistently used in cards and navigation
- **DO NOT USE emoji as icons** – always use SVG icons in website style (stroke-based, 24x24 viewBox)

## Common Tasks

### Add New Page

1. Create folder in `pages/` with `index.html` (e.g., `pages/nova-sekce/index.html`)
2. Copy pattern from existing page (e.g., `pages/ai/index.html`)
3. Add link to `js/components.js` (navigation)
4. Asset paths: `../../css/style.css`, `../../js/main.js`

### Add Photos to Gallery

1. Upload to Cloudinary (transformation `w_400,h_400,c_fill,q_auto,f_auto` for thumb)
2. Add `<div class="gallery-item" data-category="...">` to `pages/gallery/index.html`

### Add Screenshot with Lightbox (HA page)

```html
<div class="ha-screenshot-item">
  <img
    src="https://res.cloudinary.com/.../w_600,q_auto,f_auto/screenshot.png"
    alt="Description"
    loading="lazy"
    style="width: 100%; border-radius: 8px; border: 1px solid var(--card-border);"
  />
  <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem; text-align: center;">
    Caption
  </p>
</div>
```

Lightbox automatically enlarges to w_1600 version.

### Add Printer/Project Photo

```html
<div class="printer-image">
  <img
    src="https://res.cloudinary.com/.../w_800,q_auto,f_auto/photo.jpg"
    alt="Description"
    loading="lazy"
  />
</div>
```

## Icon Guidelines

- **NEVER use emoji** as icons (❌ 🏠 🖨️ ⚙️)
- **ALWAYS use SVG** icons
- **Style:** stroke-based, minimal, 24x24 viewBox
- **Consistency:** Match existing icons in nav/cards

## Important Reminders

- All content in **Czech** (UI texts, alt texts, comments in HTML)
- JavaScript comments can be Czech or English
- Always use `loading="lazy"` on images
- Test on mobile devices regularly
- Keep visual style consistent across all pages
