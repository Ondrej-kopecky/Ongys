#!/usr/bin/env python3
"""Generátor projektových stránek ongy.cz (nový design). Obsah: build/content/*.json → dist/<path>/index.html"""
import json, re, sys, html, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist" if (ROOT / "dist").exists() else ROOT
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">'
# tón záře za sekcemi podle sekce (odpovídá poli "color" v build/sections/*.json)
TONE = {"ha": "teal", "3d": "amber", "ai": "purple", "server": "teal", "games": "ice"}

NAV = [
    ("Domů", "{r}", "home", []),
    ("3D tisk", "{r}pages/3d-print/", "3d", []),
    ("Home Assistant", "{r}pages/homeassistant/", "ha", [
        ("Zařízení a hardware","{r}pages/homeassistant/devices/","HW","Co doma běží a jakou cestou"),
        ("Automatizace","{r}pages/homeassistant/automations/","AUT","Sedm ukázek a devět oblastí"),
        ("Data a monitoring","{r}pages/homeassistant/monitoring/","DAT","Grafana, InfluxDB, měsíční report"),
        ("Tipy a triky","{r}pages/homeassistant/tips/","TIP","Co bych si přál vědět dřív"),
        ("Aluprof žaluzie","{r}pages/homeassistant/zaluzie/","RF","Vlastní most z ESP32 na 433 MHz")]),
    ("AI", "{r}pages/ai/", "ai", [
        ("AI Coach","{r}pages/ai/coach/","AC","Trenér, který bydlí v Telegramu"),
        ("ai-hotkey","{r}pages/ai/hotkey/","HK","AI tam, kde zrovna píšu"),
        ("GDPR Broker Bot","{r}pages/ai/gdpr/","GD","Vymáhá moje data od brokerů"),
        ("Brain System","{r}pages/ai/brain/","BR","Paměť, která přežije session")]),
    ("Server & síť", "{r}pages/server/", "server", [
        ("AdGuard Home","{r}pages/server/adguard/","DNS","Co moje zařízení posílají domů"),
        ("Router a IoT síť","{r}pages/server/router-iot/","NET","Krabičky mají vlastní Wi-Fi"),
        ("Tailscale","{r}pages/server/tailscale/","VPN","Domů bez otevřeného portu"),
        ("Zálohy","{r}pages/server/backups/","BKP","Záloha, kterou jsem obnovil"),
        ("Bezpečnostní audit","{r}pages/server/audit/","SEC","Co doma poslouchá a kdo se dostane dovnitř"),
        ("Telemetrie na iPhonu","{r}pages/server/telemetry/","TEL","Starý iPhone hlídá teploty počítače")]),
    ("Deskovky", "{r}pages/deskovky/", "games", []),
    ("Blog", "{r}pages/blog/", "blog", []),
    ("O mně", "{r}pages/about/", "about", []),
]
ARR_NE = '<svg class="arr" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>'  # ↗ jako SVG (znak se vykresluje jako emoji)
CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
def _page_tints():
    """path ('pages/ai/coach/') → tint, načteno z build/content a build/catalog JSONů."""
    m = {}
    for d in ("content", "catalog"):
        for f in sorted((ROOT / "build" / d).glob("*.json")):
            try:
                c = json.loads(f.read_text(encoding="utf-8"))
            except Exception:
                continue
            if c.get("tint"):
                m[c["path"].strip("/") + "/"] = c["tint"]
    return m
PAGE_TINT = _page_tints()

def nav_html(r, active, path=""):
    cur = path.strip("/") + "/" if path.strip("/") else ""
    out = []
    for label, href, key, subs in NAV:
        a = f'<a{" class=\"active\"" if key == active else ""} href="{href.format(r=r) or "./"}">{e(label)}</a>'
        if subs:
            sub = "".join(f'<a class="sub-item tint-{PAGE_TINT.get(h.format(r=""), "teal")}{" active" if h.format(r="") == cur else ""}"{" aria-current=\"page\"" if h.format(r="") == cur else ""} href="{h.format(r=r)}"><span class="sub-ic"><span class="sub-ic-text">{e(mk)}</span></span><span><b>{e(l)}</b><small>{e(d)}</small></span></a>' for l, h, mk, d in subs)
            more = f'<a class="sub-item sub-more" href="{href.format(r=r)}"><span class="sub-ic sub-ic-more"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></svg></span><span><b>Přehled sekce</b><small>{e(label)}: všechny projekty a články</small></span><svg class="sub-more-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>'
            is_open = (key == active)
            btn = f'<button class="sub-toggle" type="button" aria-expanded="{"true" if is_open else "false"}" aria-label="Rozbalit {e(label)}">{CHEV}</button>'
            out.append(f'<div class="nav-item has-sub{" open" if is_open else ""}">{a}{btn}<div class="sub"><div class="sub-inner">{sub}{more}</div></div></div>')
        else:
            out.append(f'<div class="nav-item">{a}</div>')
    return "".join(out)
FOOTER = '<footer class="site-footer"><div class="shell footer-inner"><span>© 2025–2026 ongy.cz</span><span class="visitor-count" title="Celkový počet zobrazení webu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.7-6 10-6 10 6 10 6-3.7 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.7"/></svg><b id="visitor-count-number">—</b> zobrazení</span><div class="social-links"><a href="https://github.com/Ondrej-kopecky" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/></svg><span>GitHub</span></a><a href="https://www.youtube.com/@bonggy23" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 7.2a2.8 2.8 0 0 0-2-2C18.3 4.7 12 4.7 12 4.7s-6.3 0-8 .5a2.8 2.8 0 0 0-2 2 29 29 0 0 0-.4 4.8 29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.5 8 .5 8 .5s6.3 0 8-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .4-4.8 29 29 0 0 0-.4-4.8Z"/><path d="m10 15.3 5-3.3-5-3.3Z"/></svg><span>YouTube</span></a><a href="https://www.instagram.com/_ongy_/" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg><span>Instagram</span></a><a href="mailto:o.kopecky@seznam.cz" aria-label="E-mail"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg><span>E-mail</span></a></div></div></footer>'

def e(s): return html.escape(s, quote=False)

CSP = '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' https://gc.zgo.at; style-src \'self\' \'unsafe-inline\' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src \'self\' https://res.cloudinary.com data:; media-src \'self\'; connect-src \'self\' https://ongy.goatcounter.com">'
def social_meta(c):
    url = "https://ongy.cz/" + c["path"].strip("/") + ("/" if c["path"].strip("/") else "")
    t = e(c["title"]); d = e(c["description"])
    return (f'{CSP}\n  <meta name="referrer" content="strict-origin-when-cross-origin">\n  <link rel="canonical" href="{url}">\n'
            f'  <meta property="og:type" content="website"><meta property="og:site_name" content="Ongy.cz"><meta property="og:locale" content="cs_CZ">\n'
            f'  <meta property="og:title" content="{t}"><meta property="og:description" content="{d}"><meta property="og:url" content="{url}"><meta property="og:image" content="https://ongy.cz/assets/og-image.jpg">\n'
            f'  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{t}"><meta name="twitter:description" content="{d}"><meta name="twitter:image" content="https://ongy.cz/assets/og-image.jpg">')

def paras(ps): return "".join(f"<p>{p}</p>" for p in ps)


def media_block(m):
    items = ""
    for it in m["items"]:
        wide = " wide" if it.get("wide") else ""
        cap = f'<figcaption>{it["caption"]}</figcaption>' if it.get("caption") else ""
        if it.get("type") == "video":
            body = f'<video controls preload="none" playsinline poster="{it["poster"]}" width="1280" height="608"><source src="{it["src"]}" type="video/mp4"></video>'
        else:
            body = f'<a href="{it["src"]}" class="zoom" aria-label="Zvětšit"><img src="{it["src"]}" alt="{it.get("alt","")}" loading="lazy" decoding="async"></a>'
        items += f'<figure class="shot{wide}">{body}{cap}</figure>'
    return f'<div class="shots{" cover" if m.get("fit") == "cover" else ""}">{items}</div>'

def section(eyebrow, h2, inner):
    return f'''    <section class="psection" id="{e(eyebrow).lower().replace(" ", "-").replace("č","c").replace("ř","r").replace("š","s").replace("ě","e").replace("í","i").replace("á","a").replace("é","e").replace("ý","y").replace("ů","u").replace("ú","u").replace("ž","z")}"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">{e(eyebrow)}</p><h2>{e(h2)}</h2></div>
      {inner}
    </div></section>\n'''

def render(c):
    depth = c["path"].strip("/").count("/") + 1
    r = "../" * depth
    nav = nav_html(r, c.get("nav"), c["path"])
    tone = c.get("tint") or TONE.get(c.get("nav"), "teal")   # barva projektu (stejná jako jeho karta v sekci), jinak barva sekce
    chips = "".join(f'<span class="chip{" amber" if ch.get("amber") else ""}"><i></i>{ch["text"]}</span>' for ch in c["chips"])
    kpis = "".join(f'<li><b>{k["b"]}</b><small>{e(k["small"])}</small></li>' for k in c["kpis"])
    out = []
    out.append(section("K čemu to je", c["kcemu"]["h2"], f'<div class="prose">{paras(c["kcemu"]["p"])}</div>'))
    out.append(section("Proč", c["proc"]["h2"], f'<div class="prose">{paras(c["proc"]["p"])}</div>'))
    jak = c["jak"]
    visual = f'<div class="panel diagram">{jak["visual"]}</div>' if jak.get("visual") else ""
    bullets = "".join(f'<li><b>{b["b"]}</b> {b["t"]}</li>' for b in jak["bullets"])
    out.append(section("Jak to funguje", jak["h2"], f'<div>{visual}<ul class="bullets">{bullets}</ul></div>'))
    if c.get("media"):
        out.append(section(c["media"].get("eyebrow","Jak to vypadá"), c["media"]["h2"], media_block(c["media"])))
    if c.get("zjisteni"):
        z = c["zjisteni"]
        finds = "".join(f'<div class="panel find"><b{" class=\"amber\"" if f.get("amber") else ""}>{f["num"]}</b><h3>{f["h"]}</h3><p>{f["p"]}</p></div>' for f in z["items"])
        out.append(section(z.get("eyebrow","Co jsem zjistil"), z["h2"], f'<div class="finds">{finds}</div>'))
    l = c["lekce"]
    lessons = "".join(f'<div class="panel lesson"><i>{i+1:02d}</i><div><h3>{x["h"]}</h3><p>{x["p"]}</p></div></div>' for i,x in enumerate(l["items"]))
    out.append(section("Co jsem se naučil", l["h2"], f'<div class="lessons">{lessons}</div>'))
    tech = "".join(f'<details class="panel tech"{" open" if i==0 else ""}><summary>{t["summary"]} <small>{e(t["hint"])}</small></summary><div class="body">{t["body"]}</div></details>' for i,t in enumerate(c["tech"]))
    out.append(section("Pro zvědavé", "Technické detaily", f'<div>{tech}</div>'))
    links = "".join(f'<a class="button{"" if i==0 else " button-quiet"}" href="{ln["href"]}">{ln["text"]}</a>' for i,ln in enumerate(c["links"]))
    priv = f'<div class="panel privacy" style="margin-top:18px"><strong>Soukromí.</strong> {c["privacy"]}</div>' if c.get("privacy") else ""
    out.append(section("Dál", "Související", f'<div><div class="links">{links}</div>{priv}</div>'))
    page = f'''<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{e(c["description"])}">
  <meta name="theme-color" content="#101312"><title>{e(c["title"])} | Ongy.cz</title>
  {social_meta(c)}
  <link rel="icon" type="image/svg+xml" href="{r}assets/logo-mark.svg?v=2">
  {FONTS}
  <link rel="stylesheet" href="{r}style.css?v=12"><link rel="stylesheet" href="{r}project.css?v=9">
</head>
<body data-tone="{tone}">
  <a class="skip-link" href="#obsah">Přeskočit na obsah</a>
  <header class="site-header"><div class="header-inner">
    <a class="brand" href="{r}"><img src="{r}assets/logo-mark.svg?v=2" alt="" width="38" height="38"><span>ongy<span>.cz</span></span></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav"><span class="mb-open">Menu</span><span class="mb-close">Zavřít</span></button>
    <nav id="site-nav" class="site-nav" aria-label="Hlavní navigace">{nav}</nav>
  </div></header>

  <main id="obsah">
    <section class="project-hero shell">
      <div>
        <p class="crumbs"><a href="{c["section"]["href"]}">{e(c["section"]["label"])}</a><span>/</span><span>{e(c["name"])}</span></p>
        <h1>{c["h1"]}</h1>
        <p class="lead">{c["lead"]}</p>
        <div class="status-row">{chips}</div>
      </div>
      <aside class="hero-panel" aria-label="Klíčová čísla">
        {('<span class="motif">'+c["motif"]+'</span>') if c.get("motif") else ""}
        <span class="now-label"><span class="pulse" style="background:var(--teal)"></span>{e(c["kpi_label"])}</span>
        <ul class="kpis">{kpis}</ul>
        <p class="note">{c["kpi_note"]}</p>
      </aside>
    </section>

{"".join(out)}  </main>

  {FOOTER}
  <script src="{r}app.js?v=14"></script>
  <script src="{r}analytics.js?v=2"></script>
  <script src="{r}project.js?v=5"></script>
</body>
</html>
'''
    target = DIST / c["path"].strip("/") / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(page, encoding="utf-8")
    return target

if __name__ == "__main__" and not (len(sys.argv) > 1 and sys.argv[1] in ("sections", "catalog", "nav")):
    files = sys.argv[1:] or sorted((ROOT/"build"/"content").glob("*.json"))
    for f in files:
        c = json.loads(pathlib.Path(f).read_text(encoding="utf-8"))
        print("→", render(c).relative_to(ROOT))
    import subprocess; subprocess.run([sys.executable, str(ROOT/"build"/"relink.py")])

def render_generic(c, body):
    """Obecná stránka: chrome (hlavička, nav, patička) + libovolné tělo."""
    depth = c["path"].strip("/").count("/") + 1 if c["path"].strip("/") else 0
    r = "../" * depth
    nav = nav_html(r, c.get("nav"), c["path"])
    tone = c.get("tint") or c.get("color") or TONE.get(c.get("nav"), "teal")
    page = f'''<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{e(c["description"])}">
  <meta name="theme-color" content="#101312"><title>{e(c["title"])} | Ongy.cz</title>
  {social_meta(c)}
  <link rel="icon" type="image/svg+xml" href="{r}assets/logo-mark.svg?v=2">
  {FONTS}
  <link rel="stylesheet" href="{r}style.css?v=12"><link rel="stylesheet" href="{r}project.css?v=9">
</head>
<body data-tone="{tone}">
  <a class="skip-link" href="#obsah">Přeskočit na obsah</a>
  <header class="site-header"><div class="header-inner">
    <a class="brand" href="{r}"><img src="{r}assets/logo-mark.svg?v=2" alt="" width="38" height="38"><span>ongy<span>.cz</span></span></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav"><span class="mb-open">Menu</span><span class="mb-close">Zavřít</span></button>
    <nav id="site-nav" class="site-nav" aria-label="Hlavní navigace">{nav}</nav>
  </div></header>

  <main id="obsah">
{body}
  </main>

  {FOOTER}
  <script src="{r}app.js?v=14"></script>
  <script src="{r}analytics.js?v=2"></script>
  <script src="{r}project.js?v=5"></script>
</body>
</html>
'''
    target = DIST / c["path"].strip("/") / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(page, encoding="utf-8")
    return target

# ---------------- katalogová stránka (podstránky HA, galerie) ----------------
def render_catalog(c):
    depth = c["path"].strip("/").count("/") + 1
    r = "../" * depth
    chips = "".join(f'<span class="chip{" amber" if ch.get("amber") else ""}"><i></i>{ch["text"]}</span>' for ch in c.get("chips", []))
    kpis = "".join(f'<li><b>{k["b"]}</b><small>{e(k["small"])}</small></li>' for k in c["kpis"])
    motif = ('<span class="motif">' + c["motif"] + '</span>') if c.get("motif") else ""
    out = []
    if c.get("intro"):
        out.append(section(c["intro"].get("eyebrow", "O čem to je"), c["intro"]["h2"], f'<div class="prose">{paras(c["intro"]["p"])}</div>'))
    if c.get("media"):
        out.append(section(c["media"].get("eyebrow", "Jak to vypadá"), c["media"]["h2"], media_block(c["media"])))
    for g in c["groups"]:
        layout = g.get("layout", "cards")
        if layout == "list":
            items = "".join(f'<div class="panel lesson"><i>{it.get("mark", "")}</i><div><h3>{it["title"]}</h3><p>{it["text"]}</p>{("<small class=\"meta\">" + it["meta"] + "</small>") if it.get("meta") else ""}</div></div>' for it in g["items"])
            inner = f'<div class="lessons">{items}</div>'
        elif layout == "steps":
            items = "".join(f'<div class="step"><span class="n">{it.get("mark", "")}</span><div><h3>{it["title"]}</h3><p>{it["text"]}</p>{("<pre class=\"code\"><code>" + it["code"] + "</code></pre>") if it.get("code") else ""}</div></div>' for it in g["items"])
            inner = f'<div class="steps">{items}</div>'
        else:
            items = "".join(f'<div class="panel find item"><h3>{it["title"]}</h3><p>{it["text"]}</p>{("<small class=\"meta\">" + it["meta"] + "</small>") if it.get("meta") else ""}</div>' for it in g["items"])
            inner = f'<div class="finds{" two" if g.get("cols") == 2 else ""}">{items}</div>'
        out.append(section(g["eyebrow"], g["h2"], inner))
    if c.get("tech"):
        tech = "".join(f'<details class="panel tech"{" open" if i == 0 else ""}><summary>{t["summary"]} <small>{e(t["hint"])}</small></summary><div class="body">{t["body"]}</div></details>' for i, t in enumerate(c["tech"]))
        out.append(section("Pro zvědavé", "Technické detaily", f'<div>{tech}</div>'))
    links = "".join(f'<a class="button{"" if i == 0 else " button-quiet"}" href="{ln["href"]}">{ln["text"]}</a>' for i, ln in enumerate(c["links"]))
    out.append(section("Dál", "Související", f'<div class="links">{links}</div>'))
    body = f'''    <section class="project-hero shell">
      <div>
        <p class="crumbs"><a href="{c["section"]["href"]}">{e(c["section"]["label"])}</a><span>/</span><span>{e(c["name"])}</span></p>
        <h1>{c["h1"]}</h1>
        <p class="lead">{c["lead"]}</p>
        <div class="status-row">{chips}</div>
      </div>
      <aside class="hero-panel" aria-label="Klíčová čísla">
        {motif}
        <span class="now-label"><span class="pulse" style="background:var(--teal)"></span>{e(c["kpi_label"])}</span>
        <ul class="kpis">{kpis}</ul>
        <p class="note">{c["kpi_note"]}</p>
      </aside>
    </section>

{"".join(out)}'''
    return render_generic(c, body)

def build_catalogs():
    for f in sorted((ROOT/"build"/"catalog").glob("*.json")):
        c = json.loads(f.read_text(encoding="utf-8"))
        print("→", render_catalog(c).relative_to(ROOT))

if __name__ == "__main__" and len(sys.argv) > 1 and sys.argv[1] == "catalog":
    build_catalogs()
    import subprocess; subprocess.run([sys.executable, str(ROOT/"build"/"relink.py")])

# ---------------- přehledové stránky sekcí ----------------
def render_section_page(c):
    depth = c["path"].strip("/").count("/") + 1
    r = "../" * depth
    nav = nav_html(r, c.get("nav"), c["path"])
    color = c.get("color","teal")
    tone = color
    cards = ""
    for p in c["projects"]:
        st = p.get("status","running")
        tint = f' tint-{p["tint"]}' if p.get("tint") else ""
        cards += f'<a class="archive-card{tint}" data-status="{st}" href="{p["href"]}"><span class="tag {p.get("tagColor","teal")}">{p["tag"]}</span><h2>{p["name"]}</h2><p>{p["text"]}</p><small>{p.get("meta","")}</small><b>{p.get("cta","Detail →").replace("↗", ARR_NE)}</b></a>'
    notes = ""
    if c.get("notes"):
        items = "".join(f'<a class="row-link" href="{n["href"]}"><span class="hex-mini {color}">{n.get("mark","TXT")}</span><span><strong>{n["title"]}</strong><small>{n["date"]}</small></span><b>→</b></a>' for n in c["notes"])
        notes = f'''    <section class="psection"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">Z deníku</p><h2>Zápisky k tématu</h2></div>
      <div class="row-list">{items}</div>
    </div></section>\n'''
    facts = "".join(f'<li><b>{k["b"]}</b><small>{e(k["small"])}</small></li>' for k in c["kpis"])
    intro = paras(c["intro"])
    media = section(c["media"].get("eyebrow","Jak to vypadá"), c["media"]["h2"], media_block(c["media"])) if c.get("media") else ""
    if c.get("media2"): media += section(c["media2"].get("eyebrow","Jak to vypadá"), c["media2"]["h2"], media_block(c["media2"]))
    stack = ""
    if c.get("stack"):
        stack_items = "".join(f'<div><dt>{e(k)}</dt><dd>{v}</dd></div>' for k,v in c["stack"])
        stack = f'''    <section class="psection"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">Pro zvědavé</p><h2>Z čeho se to skládá</h2></div>
      <div class="panel privacy"><dl class="kv">{stack_items}</dl></div>
    </div></section>\n'''
    page = f'''<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{e(c["description"])}">
  <meta name="theme-color" content="#101312"><title>{e(c["title"])} | Ongy.cz</title>
  {social_meta(c)}
  <link rel="icon" type="image/svg+xml" href="{r}assets/logo-mark.svg?v=2">
  {FONTS}
  <link rel="stylesheet" href="{r}style.css?v=12"><link rel="stylesheet" href="{r}project.css?v=9">
</head>
<body data-tone="{tone}">
  <a class="skip-link" href="#obsah">Přeskočit na obsah</a>
  <header class="site-header"><div class="header-inner">
    <a class="brand" href="{r}"><img src="{r}assets/logo-mark.svg?v=2" alt="" width="38" height="38"><span>ongy<span>.cz</span></span></a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="site-nav"><span class="mb-open">Menu</span><span class="mb-close">Zavřít</span></button>
    <nav id="site-nav" class="site-nav" aria-label="Hlavní navigace">{nav}</nav>
  </div></header>

  <main id="obsah">
    <section class="project-hero shell">
      <div>
        <p class="crumbs"><a href="{r}">Dílna</a><span>/</span><span>{e(c["name"])}</span></p>
        <h1>{c["h1"]}</h1>
        <p class="lead">{c["lead"]}</p>
      </div>
      <aside class="hero-panel" aria-label="Klíčová čísla">
        <span class="now-label"><span class="pulse" style="background:var(--{color})"></span>{e(c["kpi_label"])}</span>
        <ul class="kpis">{facts}</ul>
        <p class="note">{c["kpi_note"]}</p>
      </aside>
    </section>

    <section class="psection"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">O čem to je</p><h2>{e(c["intro_h2"])}</h2></div>
      <div class="prose">{intro}</div>
    </div></section>
{media}
    <section class="psection"><div class="shell">
      <div class="section-intro-inline"><p class="eyebrow">Projekty a stránky</p><h2>{e(c["projects_h2"])}</h2></div>
      <div class="archive-grid">{cards}</div>
    </div></section>

{notes}{stack}  </main>

  {FOOTER}
  <script src="{r}app.js?v=14"></script>
  <script src="{r}analytics.js?v=2"></script>
  <script src="{r}project.js?v=5"></script>
</body>
</html>
'''
    target = DIST / c["path"].strip("/") / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(page, encoding="utf-8")
    return target

def build_sections():
    for f in sorted((ROOT/"build"/"sections").glob("*.json")):
        c = json.loads(f.read_text(encoding="utf-8"))
        print("→", render_section_page(c).relative_to(ROOT))

if __name__ == "__main__" and (len(sys.argv) == 1 or sys.argv[1] == "sections"):
    build_sections()
    import subprocess; subprocess.run([sys.executable, str(ROOT/"build"/"relink.py")])


# ---------------- ruční stránky (homepage, /projects/): přegenerování navigace ----------------
NAV_RE = re.compile(r'(<nav id="site-nav" class="site-nav" aria-label="Hlavní navigace">).*?(</nav>)', re.S)
def sync_manual_nav():
    for rel, r, active in (("index.html", "", "home"), ("projects/index.html", "../", None)):
        f = DIST / rel
        if not f.exists():
            continue
        html_ = f.read_text(encoding="utf-8")
        new_ = NAV_RE.sub(lambda m: m.group(1) + nav_html(r, active, rel if rel != "index.html" else "") + m.group(2), html_, count=1)
        if new_ != html_:
            f.write_text(new_, encoding="utf-8"); print("nav →", rel)

if __name__ == "__main__" and len(sys.argv) > 1 and sys.argv[1] == "nav":
    sync_manual_nav()
