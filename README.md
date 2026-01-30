# ongy.cz

Osobní web – digitální dílna

🌐 **Live:** [https://www.ongy.cz](https://www.ongy.cz)

---

## 📁 Struktura projektu

```
ongy.cz/
├── index.html              # Hlavní stránka
├── CNAME                   # Vlastní doména pro GitHub Pages
│
├── css/
│   ├── style.css           # Hlavní import
│   ├── base.css            # Reset, variables, typography
│   ├── layout.css          # Grid, flex, responsive
│   ├── components.css      # Buttons, cards, nav
│   └── pages.css           # Page-specific styles
│
├── js/
│   ├── components.js       # Sdílené komponenty (nav, footer)
│   ├── main.js             # Hlavní JavaScript
│   ├── gallery.js          # Funkcionalita galerie
│   ├── ha-lightbox.js      # Lightbox pro HA screenshoty
│   ├── analytics.js        # GoatCounter tracking
│   └── icons.js            # SVG ikony
│
├── pages/
│   ├── 3d-print/           # 3D Print Lab
│   ├── homeassistant/      # Home Assistant (9 podstránek)
│   │   ├── index.html      # Hlavní navigace
│   │   ├── hardware/       # Hardware & Setup
│   │   ├── devices/        # Zařízení
│   │   ├── automations/    # Automatizace
│   │   ├── monitoring/     # Grafana, InfluxDB
│   │   ├── advanced/       # Pokročilé (AI, templates)
│   │   ├── guides/         # Návody
│   │   ├── troubleshooting/# FAQ & troubleshooting
│   │   └── resources/      # Downloads & odkazy
│   ├── ai/                 # AI Playground
│   ├── frosthaven/         # Frosthaven Forge
│   ├── blog/               # Ongy Notes (blog)
│   └── gallery/            # Ongy Eye (galerie)
│
├── assets/
│   └── images/             # Lokální obrázky (většina na Cloudinary)
│
└── .brain/                 # 🧠 Brain System - Project memory
    └── memory/
        ├── NEXT_SESSION_TODO.md  # Co dělat příště
        ├── context/              # Project docs
        └── changelog/            # Historie změn
```

---

## 🚀 Lokální vývoj

### Možnost 1: VS Code Live Server (doporučeno)

1. Nainstaluj rozšíření **Live Server**
2. Pravý klik na `index.html` → **Open with Live Server**
3. Web se automaticky obnoví při změnách

### Možnost 2: Python server

```bash
python -m http.server 8000
```

Otevři `http://localhost:8000`

---

## 📤 Deploy do produkce

```powershell
git add .
git commit -m "Popis změny"
git push
```

Změny se **automaticky nasadí** na GitHub Pages během 1-2 minut.

**Live URL:** https://www.ongy.cz

---

## 🧠 Brain System

Projekt používá **Brain System** pro udržení kontextu a paměti.

### Co je Brain?

`.brain/memory/` obsahuje:
- **context/** - Dokumentace projektu (architecture, design system, plány)
- **changelog/** - Historie změn z každé session
- **NEXT_SESSION_TODO.md** - Co dělat příště

### Proč Brain?

- 📝 Uchovává full kontext projektu
- 🎯 Jasné TODO pro další session
- 📊 Historie všech změn
- 🔄 Konzistence napříč sessions

---

## 🎨 Design System

### Barevná paleta

| Barva         | Hex       | Použití           |
| ------------- | --------- | ----------------- |
| Electric Teal | `#2EE8C4` | Akcent, odkazy    |
| Warm Amber    | `#FFA94D` | Sekundární akcent |
| Deep Indigo   | `#1E1B3A` | Karty             |
| Midnight      | `#121212` | Pozadí            |
| Soft White    | `#F2F2F2` | Text              |

### Fonty

- **Montserrat** (600, 700, 800) – nadpisy
- **Inter** (400, 500, 600) – běžný text
- **JetBrains Mono** – kód, čísla

### Důležitá pravidla

- ✅ **Vždy SVG ikony** (nikdy emoji ❌)
- ✅ **Mobile-first** přístup
- ✅ **Dark mode** pouze
- ✅ **Český obsah** (UI, alt texty, HTML komentáře)
- ✅ `loading="lazy"` na všech obrázcích

---

## 🖼️ Přidávání obrázků

### Cloudinary Setup

**Cloud Name:** `dwuteqscm`

**URL format:**
```
https://res.cloudinary.com/dwuteqscm/image/upload/TRANSFORM/nazev.jpg
```

### Doporučené transformace

| Použití       | Transformace                          | Výsledek         |
| ------------- | ------------------------------------- | ---------------- |
| Tiskárny      | `w_800,q_auto,f_auto`                 | 800px šířka      |
| Projekty      | `w_600,q_auto,f_auto`                 | 600px šířka      |
| Gallery thumb | `w_400,h_400,c_fill,q_auto,f_auto`    | 400x400 čtverec  |
| Gallery full  | `w_1600,q_auto,f_auto`                | 1600px lightbox  |
| HA screenshot | `w_600,q_auto,f_auto` (thumb)         | 600px            |
|               | `w_1600,q_auto,f_auto` (lightbox)     | 1600px           |

### Příklad použití

```html
<img
  src="https://res.cloudinary.com/dwuteqscm/image/upload/w_800,q_auto,f_auto/bambu-x1c.jpg"
  alt="Bambu Lab X1 Carbon"
  loading="lazy"
/>
```

---

## 📊 Analytics - GoatCounter

**Účet:** https://ongy.goatcounter.com
**Code:** `ongy`

### Konfigurace

Tracking probíhá automaticky přes `js/analytics.js`:
- ✅ Auto-skip na localhost/127.0.0.1
- ✅ Počítadlo návštěv v patičce
- ✅ Privacy-friendly (bez cookies)

### Požadavky v GoatCounter Settings:

1. **Sites that can embed GoatCounter:** `*.ongy.cz`
2. **Allow public access to counter API:** ✅ Zapnuto

---

## 🏠 Home Assistant Sekce

### Struktura (9 podstránek)

| Stránka          | Path                    | Status | Popis                                   |
| ---------------- | ----------------------- | ------ | --------------------------------------- |
| Hlavní           | homeassistant/          | ✅      | Navigační stránka s 8 kartami           |
| Hardware         | homeassistant/hardware/ | ✅      | RPi5, Zigbee, rozpočet, jak začít       |
| Devices          | homeassistant/devices/  | ✅      | 40+ zařízení v 6 kategoriích            |
| Automations      | homeassistant/automations/ | ✅   | 28 automatizací v 6 kategoriích         |
| Monitoring       | homeassistant/monitoring/ | ✅    | Grafana, InfluxDB, Node-RED             |
| Advanced         | homeassistant/advanced/ | ✅      | AI, templates, custom integrace         |
| Guides           | homeassistant/guides/   | 📝     | Step-by-step tutoriály (připraveno)     |
| Troubleshooting  | homeassistant/troubleshooting/ | ✅ | FAQ & řešení problémů                   |
| Resources        | homeassistant/resources/| 📝     | Downloads, odkazy (připraveno)          |

### Stats

- **40+** zařízení
- **28** automatizací
- **9** Grafana dashboardů
- **100%** lokálně (bez cloudu)

---

## ⚙️ Tech Stack

### Frontend

- **HTML5, CSS3, Vanilla JavaScript** (ES6+)
- **ŽÁDNÉ frameworks** (React ❌, Vue ❌, jQuery ❌)
- **ŽÁDNÝ build proces** (webpack ❌, vite ❌, npm install ❌)

### Integrace

- **Cloudinary** - Hosting obrázků (`dwuteqscm`)
- **GoatCounter** - Analytics (`ongy.goatcounter.com`)
- **GitHub Pages** - Hosting & deployment

### Deployment

- **Git push** → automatické nasazení za 1-2 minuty
- **CNAME:** `www.ongy.cz`
- **Repo:** `Ondrej-kopecky/Ongys`

---

## ✅ Aktuální TODO

**High Priority:**
- [ ] 📸 Přidat fotky tiskáren (Bambu X1C, Photon Mono X2)
- [ ] 🖼️ Přidat projekty do galerie (Cloudinary ready)
- [ ] 📝 Napsat první blog posty do Ongy Notes
- [ ] 🎮 Přidat Frosthaven zápisky a fotky
- [ ] 🏠 Dodat obsah do HA Guides a Resources podstránek

**Hotovo:**
- ✅ Home Assistant rozděleno na 9 podstránek
- ✅ Brain systém implementován
- ✅ CSS refaktoring (rozděleno do modulů)
- ✅ GoatCounter analytics setup
- ✅ Cloudinary integrace
- ✅ Responsive design pro všechny stránky

---

## 🚨 DŮLEŽITÁ PRAVIDLA

### ❌ NIKDY

- Nepoužívat frameworks (React, Vue, jQuery)
- Nevytvářet package.json nebo build config
- Nepoužívat emoji jako ikony (vždy SVG)
- Nezapomenout na mobile-first přístup
- Nepsát obsah v angličtině (vždy česky)

### ✅ VŽDY

- Testovat na mobilních zařízeních
- Používat relativní cesty pro assets
- Přidávat `loading="lazy"` k obrázkům
- Následovat existující patterns z jiných stránek
- Používat Cloudinary pro obrázky
- Kontrolovat Brain memory před začátkem práce

---

## 📞 Kontakt

**Autor:** Ondřej Kopecký
**Email:** o.kopecky@seznam.cz
**GitHub:** [Ondrej-kopecky](https://github.com/Ondrej-kopecky)
**LinkedIn:** [Ondřej Kopecký](https://www.linkedin.com/in/ond%C5%99ej-kopeck%C3%BD-1322b162/)

---

## 📝 Changelog

**2026-01-24:**
- ✅ GoatCounter script URL fix
- ✅ Brain systém přidán do projektu
- ✅ .gitignore aktualizován

**2026-01-24 (dříve):**
- ✅ Home Assistant rozděleno na 9 samostatných podstránek
- ✅ CSS refaktoring (monolith → moduly)

---

**Vytvořeno s ❤️ a trochou filamentu** | © 2025 ongy.cz
