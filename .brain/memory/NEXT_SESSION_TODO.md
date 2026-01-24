# Next Session TODO

**Last Updated:** 2026-01-24
**Project:** ongy.cz - Personal Portfolio Website
**Status:** 🟢 Ready to work

---

## 🧠 Brain System Status

**ACTIVE** - Full project context loaded

**Context Files:**
- 📄 `context/project-overview.md` - Project basics, structure, tech stack
- 📄 `context/architecture.md` - Patterns, conventions, integrations
- 📄 `context/design-system.md` - Colors, fonts, visual guidelines
- 📄 `context/ha-website-plan.md` - Home Assistant section plan

---

## 📍 Current Project State

**Repository:**
- Branch: `main`
- Last commit: `46619a1` - Home Assistant: rozdělení na 9 samostatných podstránek
- Status: Clean, deployed to production
- Hosting: GitHub Pages (ongy.cz)

**Project Type:**
- Static website (vanilla JS, HTML, CSS)
- **NO frameworks, NO build process**
- Mobile-first design
- Czech language content

---

## 🎯 Ready to Work On

**High Priority:**
- 🏠 Home Assistant - Dodat obsah do Guides a Resources podstránek
- 📸 Add photos to gallery (Cloudinary setup ready)
- 📝 Create blog posts for Ongy Notes
- 🎮 Add Frosthaven content

**From Project TODO:**
- [ ] Přidat fotky tiskáren
- [ ] Přidat projekty do galerie
- [ ] Napsat první blog posty
- [ ] Přidat Frosthaven zápisky
- [ ] Přidat reálné obrázky do karet

**Available for:**
- New page creation (pattern: `pages/nova-sekce/index.html`)
- Component development
- Design system updates
- Mobile optimization
- Content additions
- Automation improvements

---

## 🔑 Quick Reference

### Tech Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Images:** Cloudinary (cloud: `dwuteqscm`)
- **Analytics:** GoatCounter (`ongy.goatcounter.com`)
- **Deploy:** Git push → automatic

### Design System
- **Primary:** Electric Teal `#2ee8c4`
- **Secondary:** Warm Amber `#ffa94d`
- **Background:** Midnight `#121212`
- **Cards:** Deep Indigo `#1e1b3a`
- **Fonts:** Montserrat (headings), Inter (body), JetBrains Mono (code)

### Commands
```powershell
# Local development
VS Code: Right-click index.html → Open with Live Server

# Deploy to production
git add -A
git commit -m "Description"
git push
```

### Cloudinary Transformations
| Use Case | Transform |
|----------|-----------|
| Printers | `w_800,q_auto,f_auto` |
| Gallery thumb | `w_400,h_400,c_fill,q_auto,f_auto` |
| Gallery full | `w_1600,q_auto,f_auto` |

---

## 📋 Important Rules

**NEVER:**
- ❌ Use frameworks (React, Vue, jQuery)
- ❌ Create package.json or build configs
- ❌ Use emoji as icons (use SVG only)
- ❌ Forget mobile-first approach
- ❌ Write content in English (always Czech)

**ALWAYS:**
- ✅ Test on mobile devices
- ✅ Use relative paths for assets
- ✅ Add `loading="lazy"` to images
- ✅ Follow existing patterns from other pages
- ✅ Use Cloudinary for images

---

## 🏠 Home Assistant Section Status

**Structure:** 9 podstránek (1 hlavní + 8 sekcí)

**Plně hotové podstránky:**
1. ✅ **index.html** - Hlavní navigační stránka
   - Hero, stats, feature highlights
   - 8 navigačních karet na podstránky
   - Tech stack overview
2. ✅ **hardware/** - Hardware & Setup
   - RPi5, Zigbee, LocalTuya
   - Rozpočet tabulka (~4,600 CZK)
   - Jak začít? (4 kroky)
3. ✅ **devices/** - Zařízení & Integrace
   - 6 kategorií (40+ entit)
   - Stats overview
4. ✅ **automations/** - Automatizace
   - 6 příkladů automatizací
   - 6 kategorií (celkem 28)
5. ✅ **monitoring/** - Data & Monitoring
   - Grafana, InfluxDB, Node-RED
   - Carousel se screenshoty
   - Měsíční report preview
6. ✅ **advanced/** - Pokročilé
   - AI & Hlasové ovládání
   - OpenAI, Templates, Custom integrace
7. ✅ **troubleshooting/** - Troubleshooting
   - 6 praktických tipů

**Placeholders (připravené pro obsah):**
8. 📝 **guides/** - Návody
   - Step-by-step tutoriály
   - Integrace návody
   - Monitoring setup
9. 📝 **resources/** - Resources
   - Downloads (configs, dashboardy, flows)
   - Užitečné odkazy
   - Custom komponenty
   - FAQ

**Záloha:**
- `index.html.backup` - Původní monolitická stránka (677 řádků)

---

## 🔗 Key Files

**Architecture:**
- `js/components.js` - Shared navigation & footer
- `js/main.js` - Universal interactivity
- `css/style.css` - Monolithic styles (~2000 lines)

**Templates:**
- `pages/ai/index.html` - Good pattern for new pages
- `pages/gallery/index.html` - Gallery implementation
- `pages/homeassistant/index.html` - Navigační stránka s kartami (nový pattern)
- `pages/homeassistant/hardware/index.html` - Podstránka s breadcrumbs

---

## 💡 Context Available

Brain has complete knowledge of:
- ✅ Full project architecture
- ✅ Design system (colors, fonts, patterns)
- ✅ Development workflow
- ✅ Home Assistant section plan (40+ devices, 28 automations)
- ✅ Component patterns
- ✅ Cloudinary setup
- ✅ Analytics configuration
- ✅ All conventions and best practices

**Just ask and I'll have full context!**

---

## 📊 Recent Changes

**Session 2026-01-24 (Part 2 - HA Restructure):**
- ✅ Home Assistant rozděleno na 9 samostatných podstránek
- ✅ Hlavní navigační stránka s klikacími kartami
- ✅ 7 plných podstránek (Hardware, Devices, Automations, Monitoring, Advanced, Troubleshooting)
- ✅ 2 placeholders (Guides, Resources) - připravené pro obsah
- ✅ CSS breadcrumbs a sekční karty přidány
- ✅ Lokálně otestováno (Python HTTP server)
- ✅ Nasazeno na production (commit `46619a1`)
- ✅ Live: https://www.ongy.cz/pages/homeassistant/

**Session 2026-01-24 (Part 1 - Brain Init):**
- ✅ Brain system initialized
- ✅ Project documentation organized
- ✅ Git configured (.gitignore updated)
- ✅ Changes deployed to production

---

**Brain System v2.0** | Ready for next task 🚀
