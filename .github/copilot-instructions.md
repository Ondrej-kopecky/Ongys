# Copilot Instructions - ongy.cz

Osobní portfolio website postavený na vanilla JS, HTML a CSS. Hostováno na GitHub Pages. Jazyk obsahu: **čeština**.

**Projekt info:**

- Vlastník: Ondřej Kopecký (o.kopecky@seznam.cz)
- Doména: ongy.cz (registrována u WEDOS)
- Hosting: GitHub Pages (repo: Ondrej-kopecky/Ongys)
- Kontakty: [GitHub](https://github.com/Ondrej-kopecky) · [LinkedIn](https://www.linkedin.com/in/ondřej-kopecký-1322b162/)

## Architektura

**Statický web bez frameworků:**

- Sdílená navigace a patička: [js/components.js](../js/components.js) dynamicky vkládá HTML do všech stránek
- Path detection: proměnná `isSubpage` rozlišuje root (`index.html`) vs. podstránky (`pages/`), upravuje cesty k assetům
- Globální funkce: `window.toggleMenu` je global pro použití v inline handlers (`onclick="toggleMenu()"`)

**Klíčové soubory:**

- [index.html](../index.html) - hlavní stránka s hero sekcí a kartami sekcí
- [css/style.css](../css/style.css) - monolitický CSS (~2000 řádků), všechny styly v jednom souboru
- [js/main.js](../js/main.js) - univerzální interaktivity (scroll, navigation, observers)
- [js/gallery.js](../js/gallery.js) - lightbox a filtrovací logika pro galerii
- [js/ha-lightbox.js](../js/ha-lightbox.js) - lightbox pro screenshoty na HA stránce
- [js/analytics.js](../js/analytics.js) - GoatCounter tracking + visitor count display

## Design systém

**CSS proměnné (definované v `:root`):**

```css
--electric-teal: #2ee8c4; /* Hlavní akcent */
--warm-amber: #ffa94d; /* Sekundární akcent */
--deep-indigo: #1e1b3a; /* Karty */
--midnight: #121212; /* Pozadí */
--card-bg: #1a1a2e; /* Karty a bloky */
--glow-teal: rgba(46, 232, 196, 0.3); /* Box-shadow glow efekty */
```

**Fonty (z Google Fonts):**

- Montserrat (600, 700, 800) - nadpisy
- Inter (400, 500, 600) - běžný text
- JetBrains Mono - kód, čísla

**Vizuální styl:**

- Dark mode only
- Neon glow efekty na hover: `box-shadow: 0 0 20px var(--glow-teal)`
- Hexagon/⬡ motiv napříč designem
- SVG ikony konzistentně použity v kartách a navigaci
- **NEPOUŽÍVAT emoji jako ikony** – vždy použít SVG ikony ve stylu webu (stroke-based, 24x24 viewBox)

## Development workflow

**Lokální vývoj:**

```powershell
# VS Code Live Server (doporučeno)
# Pravý klik na index.html → Open with Live Server

# Alternativa: Python
python -m http.server 8000
```

**Deploy:**

```powershell
git add -A
git commit -m "Popis změny"
git push
```

Automaticky nasadí na GitHub Pages (repo: `Ondrej-kopecky/Ongys`).

## Konvence a patterny

**HTML struktura stránek:**

- `<main>` obsahuje veškerý obsah (nav a footer injektovány z JS)
- Page hero: `.page-hero` s `.page-hero-content` + SVG ikona
- Content sekce: `.content-section` wrapper s padding
- Karty: `.section-card`, `.subsection-card`, `.experiment-card`, `.frost-card`, `.blog-note`

**JavaScript patterny:**

```javascript
// DOMContentLoaded pro inicializaci
document.addEventListener("DOMContentLoaded", () => {
  initFunctionality();
});

// Intersection Observer pro scroll animace
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
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

**CSS naming:**

- BEM-like: `.gallery-item`, `.gallery-overlay`, `.gallery-caption`
- State classes: `.active`, `.visible`
- Page-specific: `.card-print`, `.card-ai`, `.card-frost`

**Galerie pattern:**

```html
<div class="gallery-item" data-category="3d-print">
  <img src="../assets/images/gallery/nazev.jpg" alt="Popis" loading="lazy" />
  <div class="gallery-overlay">
    <span class="gallery-caption">Název fotky</span>
  </div>
</div>
```

Filtry: `data-filter` atribut na tagových tlačítkách, `data-category` na items.

## Analytics & tracking

**GoatCounter:**

- Code: `ongy` (https://ongy.goatcounter.com)
- Auto-skip na localhost/127.0.0.1
- Visitor count: API call do `/counter/TOTAL.json`
- Vyžaduje "Allow public access to counter API" v nastavení GoatCounter

## Specifika projektu

**Žádný build process:**

- Nikdy nespouštět `npm install`, webpack, vite, atd.
- Veškerý kód je ve vanilla JS/CSS/HTML

**Odkazy a cesty:**

- Interní odkazy: relativní (`pages/3d-print/`, `../../index.html`)
- Assety: vždy relativní z aktuální stránky (`../../assets/images/...` z pages/\*/)
- Detekce podstránky: `window.location.pathname.includes('/pages/')`
- Struktura: každá stránka v složce jako `index.html` (čisté URL bez .html)

**SEO a meta:**

- `lang="cs"` na `<html>`
- SVG emoji favicon: `data:image/svg+xml,<svg...>⬡</svg>`
- Meta description v každé stránce

**Responzivita:**

- Mobile-first approach
- Hamburger menu: `.nav-toggle` s `.nav-links.active`
- Media queries: mobile (`@media (max-width: 768px)`)

## Sekce webu

| Sekce            | Soubor                         | Popis                               |
| ---------------- | ------------------------------ | ----------------------------------- |
| Home             | index.html                     | Hero, karty sekcí, O mně            |
| 3D Print Lab     | pages/3d-print/index.html      | Tiskárny, projekty, tipy, stahování |
| Home Assistant   | pages/homeassistant/index.html | Chytrá domácnost, automatizace, AI  |
| AI Playground    | pages/ai/index.html            | AI experimenty                      |
| Frosthaven Forge | pages/frosthaven/index.html    | Deskovka, 3D modely, kampaň         |
| Ongy Notes       | pages/blog/index.html          | Blog/zápisky                        |
| Ongy Eye         | pages/gallery/index.html       | Fotogalerie s lightboxem            |

## Tiskárny majitele

1. **Bambu Lab X1 Carbon** - FDM, filament, AMS
2. **Anycubic Photon Mono X2** - MSLA, resin

## Obrázky - Cloudinary

**Účet:** Cloudinary (zdarma 25GB) · [Dashboard](https://cloudinary.com/console)

**URL formát:**

```
https://res.cloudinary.com/CLOUD-NAME/image/upload/TRANSFORMACE/NAZEV.jpg
```

**Doporučené transformace:**

| Použití       | Transformace                       | Výsledek                  |
| ------------- | ---------------------------------- | ------------------------- |
| Tiskárny      | `w_800,q_auto,f_auto`              | 800px šířka, auto kvalita |
| Projekty      | `w_600,q_auto,f_auto`              | 600px šířka               |
| Galerie thumb | `w_400,h_400,c_fill,q_auto,f_auto` | 400x400 čtverec           |
| Galerie full  | `w_1600,q_auto,f_auto`             | 1600px pro lightbox       |

**Příklad použití:**

```html
<img
  src="https://res.cloudinary.com/dxyz1234/image/upload/w_800,q_auto,f_auto/bambu-x1c.jpg"
  alt="Bambu Lab X1 Carbon"
  loading="lazy"
/>
```

## Časté úkoly

**Přidat novou stránku:**

1. Vytvořit složku v `pages/` s `index.html` (např. `pages/nova-sekce/index.html`)
2. Zkopírovat pattern z existující stránky (např. [pages/ai/index.html](../pages/ai/index.html))
3. Přidat odkaz do [js/components.js](../js/components.js) (navigace)
4. Cesty k assetům: `../../css/style.css`, `../../js/main.js`

**Přidat fotky do galerie:**

1. Nahrát na Cloudinary (transformace `w_400,h_400,c_fill,q_auto,f_auto` pro thumb)
2. Přidat `<div class="gallery-item" data-category="...">` do [pages/gallery/index.html](../pages/gallery/index.html)

**Přidat screenshot s lightboxem (HA stránka):**

```html
<div class="ha-screenshot-item">
  <img
    src="https://res.cloudinary.com/.../w_600,q_auto,f_auto/screenshot.png"
    alt="Popis"
    loading="lazy"
    style="width: 100%; border-radius: 8px; border: 1px solid var(--card-border);"
  />
  <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.5rem; text-align: center;">
    Popisek
  </p>
</div>
```

Lightbox automaticky zvětší na w_1600 verzi.

**Přidat fotku tiskárny/projektu:**

```html
<div class="printer-image">
  <img
    src="https://res.cloudinary.com/.../w_800,q_auto,f_auto/foto.jpg"
    alt="Popis"
    loading="lazy"
  />
</div>
```

## Důležité poznámky

- **Nikdy** nepoužívat frameworks/knihovny (React, Vue, jQuery)
- **Nikdy** nevytvářet package.json nebo build config
- Všechen obsah **v češtině** (UI texty, alt texty, komentáře v HTML)
- JavaScript komentáře mohou být česky i anglicky
- Pro nové sekce: zkopírovat pattern z existujících pages (např. [pages/ai/index.html](../pages/ai/index.html))

## Cloudinary účet

**Cloud name:** `dwuteqscm`

Aktuální screenshoty HA dashboardů jsou v rootu Cloudinary účtu.
