#!/usr/bin/env python3
"""Blog a O mně."""
import json, pathlib, sys, subprocess
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
from build import render_generic, ROOT, e
TAGS = {"AI":"purple","Home Assistant":"teal","Server &amp; síť":"teal","Deskovky":"ice","Web":"amber"}
KEY = {"AI":"ai","Home Assistant":"ha","Server &amp; síť":"server","Deskovky":"games","Web":"web"}

def blog():
    posts = json.loads((ROOT/"build"/"blog-posts.json").read_text(encoding="utf-8"))
    counts = {}
    for p in posts: counts[p["tag"]] = counts.get(p["tag"],0)+1
    filters = '<button class="filter active" type="button" data-tag="all" aria-pressed="true">Vše <span>%d</span></button>' % len(posts)
    for t,n in counts.items():
        filters += f'<button class="filter" type="button" data-tag="{KEY[t]}" aria-pressed="false">{t} <span>{n}</span></button>'
    items = ""
    for i, p in enumerate(posts):
        paras = "".join(f"<p>{x}</p>" for x in p["paragraphs"])
        more = ' data-more hidden' if i >= 6 else ''
        items += f'''<article class="panel post" data-tag="{KEY[p["tag"]]}"{more}>
        <div class="post-meta"><span class="tag {TAGS[p["tag"]]}">{p["tag"]}</span><span class="post-date">{p["date"]}</span></div>
        <h2>{p["title"]}</h2>
        <div class="prose post-body">{paras}</div>
      </article>'''
    body = f'''    <section class="project-hero shell">
      <div>
        <p class="crumbs"><a href="../../">Dílna</a><span>/</span><span>Blog</span></p>
        <h1>Co jsem zkusil, rozbil <span>a naučil se.</span></h1>
        <p class="lead">Krátké zápisky bez tlaku. Co se v dílně stalo, co se povedlo a na co jsem přišel až v provozu. Delší věci mají vlastní stránku, tady je vždy odkaz.</p>
      </div>
      <aside class="hero-panel" aria-label="Deník v číslech">
        <span class="motif"><svg viewBox="0 0 160 160" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="34" y="24" width="92" height="112" rx="8"/><path d="M52 52h56M52 72h56M52 92h36" opacity=".7"/><path d="M110 118l22-22" opacity=".8"/><path d="M104 124l6-6 22-22 6 6-22 22z" opacity=".5"/></svg></span>
        <span class="now-label"><span class="pulse" style="background:var(--teal)"></span>Deník</span>
        <ul class="kpis"><li><b>{len(posts)}</b><small>zápisků</small></li><li><b>{len(counts)}</b><small>témat</small></li><li><b>2025</b><small>první zápisek</small></li></ul>
        <p class="note">Šest nejnovějších nahoře, zbytek na kliknutí. Filtrem si vybereš jen téma, které tě zajímá.</p>
      </aside>
    </section>

    <section class="psection"><div class="shell">
      <div class="filters" role="group" aria-label="Filtrovat zápisky">{filters}</div>
      <div class="posts-list" aria-live="polite">{items}</div>
      <div class="links" style="margin-top:14px"><button class="button button-quiet show-more" type="button">Zobrazit další zápisky ({len(posts) - 6})</button></div>
    </div></section>
'''
    return render_generic({"path":"pages/blog/","nav":"blog","title":"Blog","description":"Ongy Notes: krátké zápisky o chytré domácnosti, lokální AI, 3D tisku, home serveru a nástrojích pro deskovky."}, body)

def about():
    body = '''    <section class="project-hero shell about-hero">
      <div>
        <p class="crumbs"><a href="../../">Dílna</a><span>/</span><span>O mně</span></p>
        <h1>Ahoj, jsem <span>Ongy.</span></h1>
        <p class="lead">QA tester, 3D tiskař, deskovkář a nadšenec do chytré domácnosti z Prahy. Ve dne testuju software pro jeden z největších českých delivery marketů, po večerech bastlím, automatizuju byt a hraju deskovky s partou. Tenhle web je moje digitální dílna.</p>
        <div class="links" style="margin-top:22px"><a class="button" href="https://github.com/Ondrej-kopecky">GitHub</a><a class="button button-quiet" href="https://www.linkedin.com/in/ond%C5%99ej-kopeck%C3%BD-1322b162/">LinkedIn</a><a class="button button-quiet" href="https://www.youtube.com/@bonggy23">YouTube</a><a class="button button-quiet" href="https://www.instagram.com/_ongy_/">Instagram</a><a class="button button-quiet" href="mailto:o.kopecky@seznam.cz">E-mail</a></div>
      </div>
      <div class="about-portrait"><a class="zoom" href="../../assets/avatar.jpg" aria-label="Zvětšit"><img src="../../assets/avatar.jpg" alt="Ongyho avatar" width="220" height="220"></a></div>
    </section>

    <section class="psection"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">Co mě baví</p><h2>Čtyři světy, jedna dílna</h2></div>
      <div class="finds two">
        <div class="panel find"><b class="amber">3D</b><h3>3D tisk</h3><p>Začínal jsem na Prusa i3, nejvíc mě naučil Ender 3. Resin jsem objevil s Anycubic Mono a přešel na Mono X2. Teď jede hlavně Bambu Lab X1C s AMS, to je jiná liga.</p></div>
        <div class="panel find"><b style="color:var(--ice)">GH</b><h3>Deskovky</h3><p>Hraju všechno, srdcovka jsou kooperativní kampaně. S jednou partou 2,5 roku Lví Křtán, pak celý Gloomhaven a teď Frosthaven. S druhou bandou rozjíždíme Gloomhaven znovu. Vždy ve čtyřech.</p></div>
        <div class="panel find"><b>HA</b><h3>Home Assistant</h3><p>Světla zhasnou, když odejdu, rozsvítí, když přijdu. Spotřeba, teploty, vlhkost v grafech. Běží to doma na Raspberry Pi a home serveru s InfluxDB, Grafanou a Node-RED.</p></div>
        <div class="panel find"><b style="color:var(--purple)">AI</b><h3>AI a automatizace</h3><p>Používám ji denně, od orchestrace více agentů po Brain System, který drží kontext mezi sezeními. Každý projekt má svůj AI workflow. Jako nástroj, ne jako cíl.</p></div>
      </div>
    </div></section>

    <section class="psection"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">Profesně</p><h2>Co dělám přes den</h2></div>
      <div class="lessons">
        <div class="panel lesson"><i>QA</i><div><h3>Tester softwaru</h3><p>Testuju software pro jeden z předních českých delivery marketů. Playwright, Docker, Linux. Kvalita a spolehlivost na prvním místě.</p></div></div>
        <div class="panel lesson"><i>IT</i><div><h3>Správa IT pro ordinaci</h3><p>Kompletní hardware a software pro ordinaci praktické lékařky. Od sítě po zálohy.</p></div></div>
      </div>
    </div></section>

    <section class="psection"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">Cesta 3D tiskem</p><h2>Od první tiskárny k X1C</h2></div>
      <div class="steps">
        <div class="step"><span class="n">2023</span><div><h3>Prusa i3 Original</h3><p>První tiskárna. Moc jsem na ní nedělal, ale zažehla to.</p></div></div>
        <div class="step"><span class="n">07/23</span><div><h3>Anycubic Photon Mono</h3><p>Vstup do světa resinu. Detailní figurky a miniatury.</p></div></div>
        <div class="step"><span class="n">08/23</span><div><h3>Ender 3</h3><p>Tady jsem se naučil nejvíc o filamentovém tisku. Kalibrace, modifikace, řešení problémů.</p></div></div>
        <div class="step"><span class="n">09/24</span><div><h3>Photon Mono X2 + SUNLU stanice</h3><p>Větší tiskový prostor, 4K LCD. K tomu UV stanice na vytvrzování a mytí výtisků.</p></div></div>
        <div class="step"><span class="n">10/24</span><div><h3>Bambu Lab X1C + AMS</h3><p>Jiná liga. Rychlost, více barev, spolehlivost. Hlavní pracant dílny.</p></div></div>
      </div>
    </div></section>

    <section class="psection"><div class="shell psection-grid">
      <div class="psection-head"><p class="eyebrow">Dál</p><h2>Kudy dál</h2></div>
      <div class="links"><a class="button" href="../../#dilny">Projít dílnu</a><a class="button button-quiet" href="../blog/">Číst zápisky</a><a class="button button-quiet" href="../../projects/">Všechny projekty</a></div>
    </div></section>
'''
    return render_generic({"path":"pages/about/","nav":"about","title":"O mně","description":"Kdo stojí za ongy.cz: QA tester z Prahy, 3D tiskař, deskovkář a nadšenec do chytré domácnosti a lokální AI."}, body)

if __name__ == "__main__":
    for t in (blog(), about()): print("→", t.relative_to(ROOT))
    subprocess.run([sys.executable, str(ROOT/"build"/"relink.py")])
