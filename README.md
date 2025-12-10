# ongy.cz

Osobní web – digitální dílna jednoho IT mistra.

🌐 **Live:** [https://www.ongy.cz](https://www.ongy.cz)

## 📁 Struktura projektu

```
ongy.cz/
├── index.html              # Hlavní stránka
├── CNAME                   # Vlastní doména pro GitHub Pages
│
├── css/
│   └── style.css           # Hlavní styly
│
├── js/
│   ├── components.js       # Sdílené komponenty (nav, footer)
│   ├── main.js             # Hlavní JavaScript
│   └── gallery.js          # Funkcionalita galerie
│
├── pages/
│   ├── 3d-print.html       # 3D Print Lab
│   ├── ai.html             # AI Playground
│   ├── frosthaven.html     # Frosthaven Forge
│   ├── blog.html           # Ongy Notes (blog)
│   └── gallery.html        # Ongy Eye (galerie)
│
└── assets/
    └── images/
        ├── 3d-print/       # Fotky z 3D tisku
        ├── frosthaven/     # Fotky z Frosthavenu
        ├── gallery/        # Obecná galerie
        └── blog/           # Obrázky pro blog
```

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

## 📤 Deploy

```powershell
git add .
git commit -m "Popis změny"
git push
```

Změny se automaticky nasadí na GitHub Pages.

## 🖼️ Přidávání fotek

1. Nahraj fotky do příslušné složky v `assets/images/`
2. Pro galerii použij strukturu:
   ```html
   <div class="gallery-item" data-category="3d-print">
       <img src="../assets/images/gallery/nazev.jpg" alt="Popis" loading="lazy">
       <div class="gallery-overlay">
           <span class="gallery-caption">Název fotky</span>
       </div>
   </div>
   ```

## 🎨 Barevná paleta

| Barva | Hex | Použití |
|-------|-----|---------|
| Deep Indigo | `#1E1B3A` | Primární tmavá |
| Electric Teal | `#2EE8C4` | Akcent, odkazy |
| Warm Amber | `#FFA94D` | Sekundární akcent |
| Midnight | `#121212` | Pozadí |
| Soft White | `#F2F2F2` | Text |

## 📝 Fonty

- **Montserrat** – nadpisy
- **Inter** – běžný text
- **JetBrains Mono** – kód

## ✅ TODO

- [ ] Přidat fotky tiskáren
- [ ] Přidat projekty do galerie
- [ ] Napsat první blog posty
- [ ] Přidat Frosthaven zápisky
- [ ] Přidat reálné obrázky do karet
