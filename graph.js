/* Mapa dílny: silový graf (Obsidian styl). Bez knihoven (CSP script-src 'self'). */
(() => {
  const host = document.querySelector('.hero-graph');
  if (!host) return;
  const svg = host.querySelector('svg.graph');
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = { core:'#2ee8c4', ha:'#2ee8c4', print:'#ffa94d', ai:'#a78bfa', server:'#7dd3fc', games:'#bcecff', blog:'#ff7a6e', tech:'#7c8780' };

  const N = [
    ['ongy','ongy.cz','core','./',24],
    ['ha','Home Assistant','ha','pages/homeassistant/',12],
    ['print','3D tisk','print','pages/3d-print/',12],
    ['ai','AI','ai','pages/ai/',12],
    ['server','Server & síť','server','pages/server/',12],
    ['games','Deskovky','games','pages/deskovky/',12],
    ['blog','Blog','blog','pages/blog/',8],
    ['about','O mně','core','pages/about/',7],
    ['devices','Zařízení','ha','pages/homeassistant/devices/',6],
    ['automations','Automatizace','ha','pages/homeassistant/automations/',6],
    ['monitoring','Monitoring','ha','pages/homeassistant/monitoring/',6],
    ['tips','Tipy','ha','pages/homeassistant/tips/',5],
    ['zaluzie','Žaluzie RF','ha','pages/homeassistant/zaluzie/',6],
    ['coach','AI Coach','ai','pages/ai/coach/',7],
    ['hotkey','ai-hotkey','ai','pages/ai/hotkey/',7],
    ['gdpr','GDPR bot','ai','pages/ai/gdpr/',6],
    ['brain','Brain System','ai','pages/ai/brain/',6],
    ['adguard','AdGuard','server','pages/server/adguard/',6],
    ['router','Router & IoT','server','pages/server/router-iot/',6],
    ['tailscale','Tailscale','server','pages/server/tailscale/',6],
    ['backups','Zálohy','server','pages/server/backups/',6],
    ['audit','Audit','server','pages/server/audit/',5],
    ['x1c','X1 Carbon','print','pages/3d-print/',6],
    ['photon','Photon','print','pages/3d-print/',5],
    ['drybox','Suchý box','print','pages/3d-print/',5],
    ['prints','Výtisky','print','pages/3d-print/#co-tisknu',5],
    ['gloom','Gloomhaven','games','https://gloomhaven.ongy.cz',7],
    ['frost','Frosthaven','games','https://frosthaven.ongy.cz',6],
    ['hexpole','Hex pole','games','pages/3d-print/',5],
    ['claude','Claude','tech','',3.5],['docker','Docker','tech','',3.5],['python','Python','tech','',3.5],
    ['zigbee','Zigbee','tech','',3.5],['grafana','Grafana','tech','',3.5],['esp32','ESP32','tech','',3.5],
    ['ollama','Ollama','tech','',3.5],['restic','restic','tech','',3.5],['caddy','Caddy','tech','',3.5]
  ];
  const L = [
    ['ongy','ha'],['ongy','print'],['ongy','ai'],['ongy','server'],['ongy','games'],['ongy','blog'],['ongy','about'],
    ['ha','devices'],['ha','automations'],['ha','monitoring'],['ha','tips'],['ha','zaluzie'],
    ['ai','coach'],['ai','hotkey'],['ai','gdpr'],['ai','brain'],
    ['server','adguard'],['server','router'],['server','tailscale'],['server','backups'],['server','audit'],
    ['print','x1c'],['print','photon'],['print','drybox'],['print','prints'],
    ['games','gloom'],['games','frost'],['games','hexpole'],
    // křížové vazby = síť, ne strom
    ['monitoring','server'],['drybox','ha'],['hexpole','print'],['coach','ha'],['router','adguard'],['tailscale','router'],
    ['blog','backups'],['blog','hotkey'],['blog','adguard'],
    ['claude','coach'],['claude','gdpr'],['claude','brain'],['claude','hotkey'],
    ['docker','adguard'],['docker','server'],['docker','monitoring'],
    ['python','coach'],['python','gdpr'],['python','brain'],
    ['zigbee','devices'],['grafana','monitoring'],['grafana','drybox'],['esp32','zaluzie'],
    ['ollama','hotkey'],['restic','backups'],['caddy','server'],['caddy','ongy']
  ];

  const narrow = host.getBoundingClientRect().width < 560;
  host.classList.toggle('compact', narrow);
  const k = narrow ? .78 : 1;
  const nodes = N.filter(n => !(narrow && n[2] === 'tech')).map(([id,label,g,href,r]) => ({ id, label, g, href, r: r*k, x:0, y:0, vx:0, vy:0, deg:0 }));
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
  const links = L.filter(([a,b]) => byId[a] && byId[b]).map(([a,b]) => ({ a: byId[a], b: byId[b] }));
  links.forEach(l => { l.a.deg++; l.b.deg++; });
  const adj = {}; links.forEach(l => { (adj[l.a.id] ||= new Set()).add(l.b.id); (adj[l.b.id] ||= new Set()).add(l.a.id); });

  let W = 0, H = 0;
  const size = () => { const b = host.getBoundingClientRect(); W = b.width; H = b.height; svg.setAttribute('viewBox', `0 0 ${W} ${H}`); };
  size();

  // start: střed + sekce po kruhu + děti u své sekce
  const core = byId.ongy; core.x = W/2; core.y = H/2;
  const secs = ['server','ai','games','print','ha'];
  secs.forEach((id, i) => { const a = -Math.PI/2 + i * 2*Math.PI/5; byId[id].x = W/2 + Math.cos(a)*Math.min(W,H)*.3; byId[id].y = H/2 + Math.sin(a)*Math.min(W,H)*.3; });
  nodes.forEach(n => { if (n.x) return; const p = links.find(l => l.b === n || l.a === n); const par = p ? (p.a === n ? p.b : p.a) : core; n.x = par.x + (Math.random()-.5)*60; n.y = par.y + (Math.random()-.5)*60; });

  const rest = l => (narrow ? .66 : 1) * (l.a.g==='core'||l.b.g==='core') ? (l.a.r>=12||l.b.r>=12 ? 170 : 120) : ((l.a.r>=12&&l.b.r>=12) ? 150 : (l.a.g==='tech'||l.b.g==='tech') ? 64 : 84);
  const tick = (alpha) => {
    // odpuzování
    for (let i = 0; i < nodes.length; i++) for (let j = i+1; j < nodes.length; j++) {
      const a = nodes[i], b = nodes[j]; let dx = b.x-a.x, dy = b.y-a.y; let d2 = dx*dx+dy*dy; if (d2 < 1) { dx = Math.random()-.5; dy = Math.random()-.5; d2 = 1; }
      const d = Math.sqrt(d2); const min = a.r + b.r + 14; const f = ((narrow ? 1900 : 3400) + (d < min ? (min-d)*50 : 0)) / d2 * alpha;
      const fx = dx/d*f, fy = dy/d*f; a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
    }
    // pružiny
    links.forEach(l => { const dx = l.b.x-l.a.x, dy = l.b.y-l.a.y; const d = Math.max(1, Math.hypot(dx,dy)); const f = (d - rest(l)) * .05 * alpha; const fx = dx/d*f, fy = dy/d*f; l.a.vx += fx; l.a.vy += fy; l.b.vx -= fx; l.b.vy -= fy; });
    // gravitace ke středu
    nodes.forEach(n => { n.vx += (W/2 - n.x) * .006 * alpha; n.vy += (H/2 - n.y) * (narrow ? .013 : .007) * alpha; });
    core.vx = core.vy = 0; core.x = W/2; core.y = H/2 + 6;
    nodes.forEach(n => { if (n.fixed) { n.vx = n.vy = 0; return; } n.vx *= .55; n.vy *= .55; n.x += n.vx; n.y += n.vy; const m = n.r + 30; const mx = n.r + (n.r >= 9 ? Math.min(90, n.label.length * 4 + 20) : Math.min(60, n.label.length * 2.6 + 14)); n.x = Math.min(W-mx, Math.max(mx, n.x)); n.y = Math.min(H-m-(narrow ? 92 : 48), Math.max(m+44, n.y)); });
  };
  for (let i = 0; i < 320; i++) tick(1 - i/340);

  // DOM
  const gl = document.createElementNS(NS,'g'); gl.setAttribute('class','links');
  const gn = document.createElementNS(NS,'g'); gn.setAttribute('class','nodes');
  svg.append(gl, gn);
  links.forEach(l => { const e = document.createElementNS(NS,'line'); e.dataset.a = l.a.id; e.dataset.b = l.b.id; l.el = e; gl.append(e); });
  nodes.forEach(n => {
    const el = document.createElementNS(NS, n.href ? 'a' : 'g'); el.setAttribute('class', `node g-${n.g}`); el.dataset.id = n.id;
    if (n.href) { el.setAttribute('href', n.href); if (n.href.startsWith('http')) { el.setAttribute('target','_blank'); el.setAttribute('rel','noopener'); } }
    if (n.id === 'ongy') {
      const hit0 = document.createElementNS(NS,'circle'); hit0.setAttribute('class','hit'); hit0.setAttribute('r', 34); el.append(hit0);
      const hex = document.createElementNS(NS,'path'); hex.setAttribute('class','core-hex'); hex.setAttribute('d','M0 -30 26 -15v30L0 30-26 15v-30Z'); el.append(hex);
      const img = document.createElementNS(NS,'image'); img.setAttribute('href','assets/logo-mark.svg?v=2'); img.setAttribute('x',-22); img.setAttribute('y',-22); img.setAttribute('width',44); img.setAttribute('height',44); el.append(img);
    } else {
      const hit = document.createElementNS(NS,'circle'); hit.setAttribute('class','hit'); hit.setAttribute('r', n.r + 12); el.append(hit);
      const halo = document.createElementNS(NS,'circle'); halo.setAttribute('class','halo'); halo.setAttribute('r', n.r + 6); el.append(halo);
      const pulse = document.createElementNS(NS,'circle'); pulse.setAttribute('class','pulse'); pulse.setAttribute('r', n.r + 3); el.append(pulse);
      const c = document.createElementNS(NS,'circle'); c.setAttribute('class','dot'); c.setAttribute('r', n.r); c.setAttribute('fill', C[n.g]); el.append(c);
    }
    const t = document.createElementNS(NS,'text'); t.setAttribute('class','label'); t.setAttribute('y', (n.id==='ongy' ? 46 : n.r + 13)); t.textContent = n.label; el.append(t);
    el.style.setProperty('--c', C[n.g]);
    n.el = el; gn.append(el);
  });

  const place = () => { links.forEach(l => { l.el.setAttribute('x1', l.a.x); l.el.setAttribute('y1', l.a.y); l.el.setAttribute('x2', l.b.x); l.el.setAttribute('y2', l.b.y); }); nodes.forEach(n => n.el.setAttribute('transform', `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`)); };
  place(); if (!reduce) { nodes.forEach(n => n.el.style.opacity = 0); links.forEach(l => l.el.style.opacity = 0); }

  // hover: zvýraznit sousedy, ztlumit zbytek
  const touchUI = !matchMedia('(hover: hover)').matches;
  let active = null;
  const setActive = (id) => {
    active = id; host.classList.toggle('has-active', !!id);
    const keep = id ? new Set([id, ...(adj[id] || [])]) : null;
    nodes.forEach(n => n.el.classList.toggle('dim', !!keep && !keep.has(n.id)));
    nodes.forEach(n => n.el.classList.toggle('hi', !!keep && keep.has(n.id) && n.id !== id));
    nodes.forEach(n => n.el.classList.toggle('is-active', n.id === id));
    links.forEach(l => l.el.classList.toggle('lit', !!id && (l.a.id === id || l.b.id === id)));
    links.forEach(l => l.el.classList.toggle('dim', !!id && !(l.a.id === id || l.b.id === id)));
    const st = host.querySelector('.graph-status');
    if (st) {
      const n = id ? byId[id] : null;
      if (n && n.href) { st.setAttribute('href', n.href); st.classList.add('open'); st.innerHTML = `Otevřít: <b>${n.label}</b><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`; }
      else { st.removeAttribute('href'); st.classList.remove('open'); st.innerHTML = n ? `Vybráno: <b>${n.label}</b>` : `<b>${touchUI ? 'klepni na uzel' : 'najeď na uzel'}</b>`; }
    }
  };
  let leaveTimer = 0;
  nodes.forEach(n => {
    n.el.addEventListener('pointerenter', (e) => { if (e.pointerType === 'touch') return; clearTimeout(leaveTimer); setActive(n.id); });
    n.el.addEventListener('pointerleave', (e) => { if (e.pointerType === 'touch') return; clearTimeout(leaveTimer); leaveTimer = setTimeout(() => { if (active === n.id) setActive(null); }, 140); });
    n.el.addEventListener('focus', () => { if (n.el.matches(':focus-visible')) setActive(n.id); }); n.el.addEventListener('blur', () => { if (active === n.id && !touchUI) setActive(null); });
  });
  host.addEventListener('pointerleave', (e) => { if (e.pointerType === 'touch') return; clearTimeout(leaveTimer); setActive(null); });
  svg.addEventListener('click', (e) => { if (!e.target.closest('.node')) setActive(null); });

  // kurzor jako magnet: uzly v okolí se k němu lehce stáhnou
  let px = -1e4, py = -1e4;
  host.addEventListener('pointermove', (e) => { if (e.pointerType === 'touch') return; const b = host.getBoundingClientRect(); px = e.clientX - b.left; py = e.clientY - b.top; });
  host.addEventListener('pointerleave', () => { px = py = -1e4; });
  nodes.forEach(n => { n.dx = 0; n.dy = 0; });

  // tažení (jen myš/pero; na dotyku má přednost scroll a klepnutí = otevřít)
  let drag = null, moved = false, hot = 0;
  nodes.forEach(n => {
    n.el.addEventListener('pointerdown', (e) => { n.lastPT = e.pointerType; if (n.id === 'ongy' || e.pointerType === 'touch') return; drag = n; moved = false; n.fixed = true; n.el.setPointerCapture(e.pointerId); e.preventDefault(); });
    n.el.addEventListener('click', (e) => { if (moved) { e.preventDefault(); return; } const isTouch = n.lastPT === 'touch' || e.pointerType === 'touch' || (touchUI && n.lastPT !== 'mouse'); if (isTouch && active !== n.id) { e.preventDefault(); setActive(n.id); } });
    n.el.addEventListener('contextmenu', (e) => e.preventDefault());
  });
  host.addEventListener('pointermove', (e) => { if (!drag) return; const b = host.getBoundingClientRect(); const nx = e.clientX - b.left, ny = e.clientY - b.top; if (Math.hypot(nx-drag.x, ny-drag.y) > 3) moved = true; drag.x = nx; drag.y = ny; hot = 60; });
  const release = () => { if (drag) { drag.fixed = false; drag = null; hot = 40; } };
  host.addEventListener('pointerup', release); host.addEventListener('pointercancel', release);

  // ---- animace: intro (rozbalení ze středu po vrstvách), dýchání, paketíky po hranách ----
  const depth = { ongy: 0 }; { const q = ['ongy']; while (q.length) { const id = q.shift(); (adj[id] || []).forEach(n => { if (depth[n] === undefined) { depth[n] = depth[id] + 1; q.push(n); } }); } }
  nodes.forEach(n => { n.delay = (depth[n.id] ?? 3) * 190 + (n.g === 'tech' ? 160 : 0) + Math.random() * 120; n.cx = n.x; n.cy = n.y; });
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const easeBack = t => { const c = 1.4; return 1 + c * Math.pow(t - 1, 3) + (c - 1) * Math.pow(t - 1, 2) * 0; };
  const gp = document.createElementNS(NS,'g'); gp.setAttribute('class','packets'); svg.insertBefore(gp, gn);
  const packets = [];
  const spawnPacket = (t) => {
    const pool = links.filter(l => l.a.g !== 'tech' && l.b.g !== 'tech');
    const l = pool[Math.floor(Math.random() * pool.length)]; const rev = Math.random() < .5;
    const el = document.createElementNS(NS,'circle'); el.setAttribute('r', 2.2); el.setAttribute('class','packet');
    const to = rev ? l.a : l.b; el.setAttribute('fill', C[to.g === 'tech' ? 'core' : to.g]); gp.append(el);
    packets.push({ l, rev, el, t0: t, dur: 900 + Math.random() * 700 });
  };
  const introStart = performance.now(); const INTRO = 780; let introDone = reduce;
  let lastPacket = 0; let t0 = introStart;
  const setPos = (n, x, y, sc) => n.el.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})${sc !== undefined && sc !== 1 ? ` scale(${sc.toFixed(3)})` : ''}`);
  const setLink = (l, ax, ay, bx, by) => { l.el.setAttribute('x1', ax); l.el.setAttribute('y1', ay); l.el.setAttribute('x2', bx); l.el.setAttribute('y2', by); };
  const loop = (t) => {
    const s = (t - t0) / 1000;
    if (hot > 0) { tick(.35); hot--; }
    const act = active ? byId[active] : null; const nb = act ? adj[act.id] : null;
    nodes.forEach(n => {
      let tx = 0, ty = 0;
      if (!reduce && n.id !== 'ongy') {
        if (!act && !drag) { const k = n.id.length; tx += Math.sin(s*.5 + k)*1.6; ty += Math.cos(s*.42 + k*1.7)*1.6; }
        // magnet kurzoru
        const mdx = px - n.x, mdy = py - n.y; const md = Math.hypot(mdx, mdy); const R = 170;
        if (md < R && md > 1) { const k = Math.pow(1 - md / R, 2) * 18; tx += mdx / md * k; ty += mdy / md * k; }
      }
      // neuronka: sousedi vybraného se k němu stáhnou, zbytek sítě lehce také
      if (act && n !== act && n.id !== 'ongy') { const k = nb.has(n.id) ? .16 : .04; tx += (act.x - n.x) * k; ty += (act.y - n.y) * k; }
      n.dx += (tx - n.dx) * (reduce ? 1 : .11); n.dy += (ty - n.dy) * (reduce ? 1 : .11);
      n.cx = n.x + n.dx; n.cy = n.y + n.dy;
    });
    if (!introDone) {
      let all = true;
      nodes.forEach(n => {
        const pr = Math.min(1, Math.max(0, (t - introStart - n.delay) / INTRO)); if (pr < 1) all = false;
        const e = easeOut(pr); const sc = n.id === 'ongy' ? (0.6 + .4 * e) : (pr === 0 ? 0 : .3 + .7 * e + Math.sin(pr * Math.PI) * .18);
        n.ix = core.x + (n.cx - core.x) * e; n.iy = core.y + (n.cy - core.y) * e; n.pr = pr;
        n.el.style.opacity = pr === 0 ? 0 : Math.min(1, .2 + e); setPos(n, n.ix, n.iy, sc);
      });
      links.forEach(l => { const pr = Math.min(l.a.pr, l.b.pr); l.el.style.opacity = pr; setLink(l, l.a.ix, l.a.iy, l.b.ix, l.b.iy); });
      if (all) { introDone = true; nodes.forEach(n => { n.el.style.opacity = ''; }); links.forEach(l => { l.el.style.opacity = ''; }); host.classList.add('ready'); }
    } else {
      nodes.forEach(n => setPos(n, n.cx, n.cy));
      links.forEach(l => setLink(l, l.a.cx, l.a.cy, l.b.cx, l.b.cy));
      if (!reduce) {
        if (t - lastPacket > (active ? 1600 : 700) && packets.length < 6) { spawnPacket(t); lastPacket = t; }
        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i]; const pr = (t - p.t0) / p.dur;
          if (pr >= 1) { p.el.remove(); packets.splice(i, 1); continue; }
          const from = p.rev ? p.l.b : p.l.a, to = p.rev ? p.l.a : p.l.b; const e = easeOut(pr);
          p.el.setAttribute('cx', from.cx + (to.cx - from.cx) * e); p.el.setAttribute('cy', from.cy + (to.cy - from.cy) * e);
          p.el.style.opacity = (Math.sin(pr * Math.PI) * (active && !(p.l.a.id === active || p.l.b.id === active) ? .25 : .9)).toFixed(2);
        }
      }
    }
    requestAnimationFrame(loop);
  };
  if (reduce) { host.classList.add('ready'); place(); }
  requestAnimationFrame(loop);

  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { const ow = W, oh = H; size(); nodes.forEach(n => { n.x *= W/ow; n.y *= H/oh; }); for (let i = 0; i < 80; i++) tick(.5); place(); }, 150); });
})();
