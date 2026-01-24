# Ongy.cz - Project Overview

**Date:** 2026-01-24
**Type:** Personal Portfolio Website

## Quick Facts

- **Owner:** Ondřej Kopecký (o.kopecky@seznam.cz)
- **Domain:** ongy.cz (WEDOS)
- **Hosting:** GitHub Pages (repo: Ondrej-kopecky/Ongys)
- **Tech Stack:** Vanilla JS, HTML, CSS (NO frameworks!)
- **Language:** Czech (všechen obsah v češtině)

## Project Structure

```
ongy.cz/
├── index.html              # Hlavní stránka
├── css/
│   └── style.css           # Monolitický CSS (~2000 řádků)
├── js/
│   ├── components.js       # Sdílená navigace a patička
│   ├── main.js             # Univerzální interaktivity
│   ├── gallery.js          # Lightbox a filtrovací logika
│   ├── ha-lightbox.js      # Lightbox pro HA screenshoty
│   └── analytics.js        # GoatCounter tracking
├── pages/
│   ├── 3d-print/           # 3D Print Lab
│   ├── homeassistant/      # Home Assistant
│   ├── ai/                 # AI Playground
│   ├── frosthaven/         # Frosthaven Forge
│   ├── blog/               # Ongy Notes
│   └── gallery/            # Ongy Eye (fotogalerie)
└── assets/
    └── images/             # Lokální obrázky
```

## Key Principles

1. **No Build Process** - Nikdy nespouštět npm install, webpack, vite
2. **Vanilla Only** - Žádné frameworks (React, Vue, jQuery)
3. **Mobile-First** - Vždy testovat a optimalizovat pro mobil
4. **Czech Content** - Všechen obsah v češtině
5. **Clean URLs** - Struktura: každá stránka v složce jako index.html

## Tech Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Analytics:** GoatCounter (ongy.goatcounter.com)
- **Images:** Cloudinary (dwuteqscm)
- **Deploy:** Git push → GitHub Pages (automatic)

## Development

**Local dev:**
```powershell
# VS Code Live Server (recommended)
# Right-click index.html → Open with Live Server
```

**Deploy:**
```powershell
git add -A
git commit -m "Description"
git push
```

## Website Sections

| Section          | Path                           | Description                      |
|------------------|--------------------------------|----------------------------------|
| Home             | index.html                     | Hero, section cards, About me    |
| 3D Print Lab     | pages/3d-print/index.html      | Printers, projects, tips         |
| Home Assistant   | pages/homeassistant/index.html | Smart home, automations, AI      |
| AI Playground    | pages/ai/index.html            | AI experiments                   |
| Frosthaven Forge | pages/frosthaven/index.html    | Board game, 3D models, campaign  |
| Ongy Notes       | pages/blog/index.html          | Blog/notes                       |
| Ongy Eye         | pages/gallery/index.html       | Photo gallery with lightbox      |

## Owner's Equipment

**3D Printers:**
1. **Bambu Lab X1 Carbon** - FDM, filament, AMS
2. **Anycubic Photon Mono X2** - MSLA, resin

## Current TODO (from README)

- [ ] Přidat fotky tiskáren
- [ ] Přidat projekty do galerie
- [ ] Napsat první blog posty
- [ ] Přidat Frosthaven zápisky
- [ ] Přidat reálné obrázky do karet
