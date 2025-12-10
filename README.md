# ongy.cz

Osobní web hostovaný na GitHub Pages.

## 🚀 Nasazení

### 1. Vytvořit GitHub repo

```bash
git init
git add .
git commit -m "Initial commit - osobní web"
git branch -M main
git remote add origin git@github.com:Ondrej-kopecky/Ongys.git
git push -u origin main
```

### 2. Zapnout GitHub Pages

1. Jdi do **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Klikni **Save**

### 3. Nastavit vlastní doménu v GitHubu

1. V Settings → Pages → Custom domain zadej: `www.ongy.cz`
2. Zaškrtni **Enforce HTTPS** (až bude dostupné)

### 4. Nastavit DNS ve WEDOS

Přihlas se do WEDOS → Správa domén → ongy.cz → DNS záznamy:

#### Pro www.ongy.cz (CNAME):

| Název | TTL  | Typ   | Hodnota                   |
| ----- | ---- | ----- | ------------------------- |
| www   | 3600 | CNAME | Ondrej-kopecky.github.io. |

#### Pro root ongy.cz (A záznamy):

| Název | TTL  | Typ | Hodnota         |
| ----- | ---- | --- | --------------- |
| @     | 3600 | A   | 185.199.108.153 |
| @     | 3600 | A   | 185.199.109.153 |
| @     | 3600 | A   | 185.199.110.153 |
| @     | 3600 | A   | 185.199.111.153 |

> **Poznámka:** IP adresy jsou oficiální GitHub Pages servery. Aktuální seznam najdeš v [GitHub dokumentaci](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### 5. Počkat na propagaci DNS

- Může trvat až 24-48 hodin (obvykle rychleji)
- HTTPS certifikát se vygeneruje automaticky po ověření domény

## 📁 Struktura projektu

```
ongy.cz/
├── index.html    # Hlavní stránka
├── style.css     # Styly
├── CNAME         # Vlastní doména pro GitHub Pages
└── README.md     # Tento soubor
```

## 🔧 Úpravy

- Uprav odkazy v `index.html` (GitHub, LinkedIn, e-mail)
- Přidej vlastní projekty do sekce "Projekty"
- Přizpůsob barvy v `style.css` (CSS proměnné v `:root`)

## 📝 TODO

- [ ] Přidat skutečné odkazy na profily
- [ ] Přidat projekty
- [ ] Přidat fotku/avatar
- [ ] Experimentovat s JS/React
