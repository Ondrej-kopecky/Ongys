# ongy.cz

Osobní digitální dílna — kde se kód mění v automatizace a filament ve skutečné věci.

🌐 **Live:** https://ongy.cz — servíruje se PŘÍMO z tohoto adresáře přes Caddy (bind-mount), editace = živé; `git push` je jen záloha.

## Struktura (redesign 2026-09-13)
```
index.html            homepage (hero „mapa dílny", bento Pět dílen, Na čem dělám, pravidla, zápisky, o mně)
projects/             archiv projektů s filtry
pages/<sekce>/        přehledy sekcí: server, ai, homeassistant, 3d-print, deskovky
pages/<sekce>/<proj>/ projektové stránky (adguard, coach, hotkey, gdpr, brain, zaluzie) + HA podstránky
pages/blog/           zápisky (6 nejnovějších + Zobrazit další, filtr témat)
pages/about/          o mně
style.css             společný vizuální systém (tokeny, hlavička, patička, archiv)
home.css              jen homepage (ilustrované karty)
project.css           projektové/sekční/katalogové stránky, galerie, lightbox
app.js                mobilní menu, filtry archivu, reveal
project.js            lightbox, filtr blogu, Zobrazit další
analytics.js          GoatCounter
assets/               obrázky, videa, logo, og-image
build/                GENERÁTOR stránek (viz níže) — Caddy ho neservíruje
```

## Generátor (build/)
Obsah stránek je v JSON, HTML se generuje:
- `build/content/*.json` → projektové stránky (`python3 build/build.py`)
- `build/sections/*.json` → přehledy sekcí (`python3 build/build.py sections`)
- `build/catalog/*.json` → HA podstránky (`python3 build/build.py catalog`)
- `build/blog-posts.json` + `build/pages.py` → blog a o mně (`python3 build/pages.py`)
Každý běh volá `build/relink.py` (odkazy na existující stránky → relativní). Pořadí: build → sections → catalog → pages.
Homepage a `projects/` jsou ručně psané HTML. Nový projekt = JSON podle vzoru `build/content/adguard.json` (+ `motif` SVG, volitelně `media`).

## Pravidla
- Písma Montserrat / Inter / JetBrains Mono (Google Fonts), tmavé pozadí `#101312`, akcent teal `#2ee8c4`, amber pro stavy.
- Žádné emoji, žádné pomlčky „—" v textu, technika jen v rozbalovacích blocích.
- Soukromí: žádné IP/MAC adresy, jména zařízení, tokeny, jméno zaměstnavatele, zdravotní údaje.
- CSP meta v každé stránce: skripty jen vlastní + GoatCounter, obrázky vlastní + Cloudinary. Inline `<script>` a `onclick` zakázané.
- Cache-bust `?v=N` u CSS/JS při změně (v šablonách v `build/build.py`, v `index.html` a `projects/index.html` ručně).
