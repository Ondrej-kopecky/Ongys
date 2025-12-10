# Instrukce pro AI - Projekt ongy.cz

## 📋 Základní informace o projektu

**Vlastník:** Ondřej Kopecký
**Doména:** ongy.cz (registrována u WEDOS)
**Hosting:** GitHub Pages (repo: Ondrej-kopecky/Ongys)
**Typ webu:** Osobní portfolio / digitální dílna

---

## 🏗️ Struktura projektu

```
c:\ongy.cz\
├── index.html              # Hlavní stránka
├── CNAME                   # Doména pro GitHub Pages
├── .gitignore
├── css/
│   └── style.css           # Všechny styly (~1500+ řádků)
├── js/
│   ├── components.js       # Sdílená navigace a patička
│   ├── main.js             # Hlavní JavaScript
│   ├── icons.js            # SVG ikony knihovna
│   ├── gallery.js          # Lightbox pro galerii
│   └── analytics.js        # GoatCounter analytics
├── pages/
│   ├── 3d-print.html       # 3D Print Lab
│   ├── ai.html             # AI Playground
│   ├── frosthaven.html     # Frosthaven Forge
│   ├── blog.html           # Ongy Notes (blog)
│   └── gallery.html        # Ongy Eye (galerie)
└── assets/
    └── images/
        ├── 3d-print/       # Fotky 3D tisků
        ├── frosthaven/     # Fotky Frosthaven
        ├── gallery/        # Obecná galerie
        └── blog/           # Obrázky pro blog
```

---

## 🎨 Design systém

### Barvy (CSS proměnné)

```css
--deep-indigo: #1e1b3a; /* Tmavě fialová */
--electric-teal: #2ee8c4; /* Hlavní akcent - tyrkysová */
--warm-amber: #ffa94d; /* Sekundární akcent - oranžová */
--midnight: #121212; /* Pozadí */
--soft-white: #f2f2f2; /* Text */
--text-muted: #94a3b8; /* Šedý text */
--card-bg: #1a1a2e; /* Pozadí karet */
--card-border: rgba(46, 232, 196, 0.1);
--glow-teal: rgba(46, 232, 196, 0.3);
--glow-amber: rgba(255, 169, 77, 0.3);
```

### Fonty (Google Fonts)

- **Montserrat** (600, 700, 800) - nadpisy
- **Inter** (400, 500, 600) - tělo textu
- **JetBrains Mono** (400, 500) - kód, čísla

### Vizuální styl

- Dark mode
- Neon glow efekty (box-shadow s glow-teal/amber)
- Hover animace (transform, color transitions)
- SVG ikony (konzistentní line icons)
- Hex/šestiúhelníkové motivy

---

## 🔧 Technické detaily

### Navigace & Patička

- Generovány JavaScriptem v `components.js`
- Automaticky detekuje podstránky a upravuje cesty
- Mobilní hamburger menu (onclick="toggleMenu()")

### Analytics

- **GoatCounter** (ongy.goatcounter.com)
- Skript v `analytics.js`
- Počítadlo návštěv v patičce

### Git workflow

```powershell
# Standardní push
git add -A; git commit -m "Popis změny"; git push
```

---

## 📝 Sekce webu

| Sekce            | Soubor                | Popis                               |
| ---------------- | --------------------- | ----------------------------------- |
| Home             | index.html            | Hero, karty sekcí, O mně            |
| 3D Print Lab     | pages/3d-print.html   | Tiskárny, projekty, tipy, stahování |
| AI Playground    | pages/ai.html         | AI experimenty                      |
| Frosthaven Forge | pages/frosthaven.html | Deskovka, 3D modely, kampaň         |
| Ongy Notes       | pages/blog.html       | Blog/zápisky                        |
| Ongy Eye         | pages/gallery.html    | Fotogalerie s lightboxem            |

---

## 🖨️ Tiskárny majitele

1. **Bambu Lab X1 Carbon** - FDM, filament, AMS
2. **Anycubic Photon Mono X2** - MSLA, resin

---

## 📞 Kontakty

- **GitHub:** https://github.com/Ondrej-kopecky
- **LinkedIn:** https://www.linkedin.com/in/ondřej-kopecký-1322b162/
- **Email:** o.kopecky@seznam.cz

---

## ⚠️ Důležité poznámky pro AI

1. **Jazyk:** Web je v češtině, komunikuj česky
2. **Styly:** Vše v jednom souboru `css/style.css`
3. **Ikony:** Používej SVG z `icons.js`, NE emoji
4. **Cesty:** Podstránky používají `../` pro relativní cesty
5. **Push:** Po změnách vždy `git add -A; git commit -m "..."; git push`
6. **Testování:** `python -m http.server 8080` pro lokální náhled
7. **GitHub Pages:** Změny se projeví do pár minut po push

---

## 🚀 Časté úkoly

### Přidat novou stránku

1. Vytvořit HTML v `pages/`
2. Přidat odkaz do `components.js` (navigace)
3. Použít stejnou strukturu jako ostatní stránky

### Přidat fotky do galerie

1. Nahrát na Cloudinary (viz sekce Obrázky)
2. Přidat `<div class="gallery-item">` do `gallery.html`

### Přidat fotku tiskárny/projektu

```html
<!-- Místo placeholder -->
<div class="printer-image">
  <img
    src="https://res.cloudinary.com/CLOUD-NAME/image/upload/w_800,q_auto,f_auto/fotka.jpg"
    alt="Popis fotky"
    loading="lazy"
  />
</div>
```

---

## 🖼️ Obrázky - Cloudinary

**Účet:** Cloudinary (zdarma 25GB)
**Dashboard:** https://cloudinary.com/console

### URL formát

```
https://res.cloudinary.com/CLOUD-NAME/image/upload/TRANSFORMACE/NAZEV.jpg
```

### Doporučené transformace

| Použití       | Transformace                       | Výsledek                  |
| ------------- | ---------------------------------- | ------------------------- |
| Tiskárny      | `w_800,q_auto,f_auto`              | 800px šířka, auto kvalita |
| Projekty      | `w_600,q_auto,f_auto`              | 600px šířka               |
| Galerie thumb | `w_400,h_400,c_fill,q_auto,f_auto` | 400x400 čtverec           |
| Galerie full  | `w_1600,q_auto,f_auto`             | 1600px pro lightbox       |

### Příklad použití

```html
<img
  src="https://res.cloudinary.com/dxyz1234/image/upload/w_800,q_auto,f_auto/bambu-x1c.jpg"
  alt="Bambu Lab X1 Carbon"
  loading="lazy"
/>
```

### Upravit styly

- Vše v `css/style.css`
- Používej CSS proměnné pro barvy
- Media queries pro responsive na konci souboru

---

_Poslední aktualizace: 10. prosince 2025_
