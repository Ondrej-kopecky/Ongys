# ongy.cz

Osobní digitální dílna — kde se kód mění v automatizace a filament ve skutečné věci.

🌐 **Live:** [https://ongy.cz](https://ongy.cz)

---

## 📁 Struktura

```
ongy.cz/
├── index.html              # Homepage (hero, 5 karet, highlights, O mně teaser)
├── css/
│   ├── style.css           # Import hub
│   ├── base.css            # Proměnné, reset, scroll-reveal animace
│   ├── layout.css          # Navigace, footer, hero, grid
│   ├── components.css      # Karty, lightbox, about styly
│   └── pages.css           # Page-specific (printer, blog, filament, about, timeline)
├── js/
│   ├── components.js       # Nav + footer (injected)
│   ├── main.js             # Filtry, interakce
│   ├── reveal.js           # Scroll-reveal animace (Intersection Observer)
│   ├── ha-lightbox.js      # Lightbox pro fotky
│   ├── gallery.js          # Galerie
│   ├── analytics.js        # GoatCounter
│   └── icons.js            # SVG ikony
├── pages/
│   ├── 3d-print/           # Tiskárny, filament skladování, projekty, tipy
│   ├── homeassistant/      # 50+ zařízení, 35+ automatizací
│   │   ├── devices/        # Zařízení & hardware (wall tablet, Zigbee, F1)
│   │   ├── automations/    # Automatizace (8 kategorií)
│   │   ├── monitoring/     # Grafana (9 dashboardů), InfluxDB, Node-RED
│   │   └── tips/           # AI integrace, šablony, tipy
│   ├── ai/                 # AI v praxi (workflow, Brain System, nástroje)
│   │   └── brain/          # Brain System v2.0 dokumentace
│   ├── deskovky/           # Gloomhaven (amber) + Frosthaven (ledově modrá)
│   ├── about/              # O mně (avatar, zájmy, práce, 3D tisk timeline)
│   ├── blog/               # Ongy Notes (7 článků, SVG ikony podle kategorie)
│   └── gallery/            # Galerie (odkaz na 3D Print)
├── assets/images/
│   ├── avatar.jpg          # Stylizovaný avatar (hex rám)
│   ├── og-image.jpg        # Open Graph náhled (1200x630)
│   ├── wall-tablet.jpg     # HA wall tablet fotka
│   └── 3d-print/           # Lokální fotky tiskáren + filament
│       ├── bambu-x1c.avif
│       ├── anycubic-photon-mono-x2.png
│       ├── filament-storage.jpg
│       ├── silica-gel-box.jpg
│       └── grafana-filament.jpg
├── img/
│   ├── logo.svg            # Hex + tryska logo
│   └── favicon.svg         # Favicon
└── .brain/memory/          # Brain System v2.0
```

---

## 🎨 Design System

| Barva | Hex | Použití |
|-------|-----|---------|
| Electric Teal | `#2EE8C4` | Primární akcent |
| Warm Amber | `#FFA94D` | Sekundární, Gloomhaven |
| Ice Blue | `#7DD3FC` | Frosthaven |
| Soft Purple | `#A78BFA` | AI |
| Coral Red | `#FF6B6B` | Web/kód |
| Deep Indigo | `#1E1B3A` | Karty |
| Midnight | `#121212` | Pozadí |

**Fonty:** Montserrat (nadpisy), Inter (text), JetBrains Mono (kód)

**Pravidla:**
- Dark mode only, mobile-first
- SVG ikony (ne emoji)
- Český obsah
- `loading="lazy"` na obrázcích
- Cache-bust: `?v=YYYYMMDD` na CSS/JS při změnách (Cloudflare CDN)

---

## 🚀 Deploy

```bash
git push  # → GitHub Pages auto-deploy za 1-2 min
```

**Hosting:** GitHub Pages + Cloudflare
**Repo:** `Ondrej-kopecky/Ongys`

---

## 📊 Features

- **Scroll reveal animace** — fade-in při scrollu (Intersection Observer)
- **Open Graph tagy** — hezké náhledy při sdílení na sociálních sítích
- **Lightbox** — klikatelné fotky na fullscreen
- **Hex-heart footer** — custom SVG ikona
- **Responzivní** — mobil, tablet, desktop
- **Hamburger menu** — scroll lock při otevření
- **GoatCounter** — privacy-friendly analytics

---

## 🔗 Propojené projekty

| Projekt | URL | Popis |
|---------|-----|-------|
| Gloomhaven Tracker | [gloomhaven.ongy.cz](https://gloomhaven.ongy.cz) | Campaign tracker v češtině |
| Frosthaven Tracker | *Ve vývoji* | Samostatná appka |
| Home Assistant | xx | 50+ zařízení, RPi5 |

---

**Vytvořeno s 🔷 trochou filamentu a chutí stavět nové věci** | © 2025–2026 ongy.cz
