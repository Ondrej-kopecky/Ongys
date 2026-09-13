// Lightbox pro screenshoty: klik/klepnutí otevře, × / Esc / klepnutí mimo zavře,
// dvojklep přepíná přiblížení, dva prsty přibližují, tažením se přiblížený obrázek posouvá
(function(){
  const links=[...document.querySelectorAll('a.zoom')]; if(!links.length) return;
  if(typeof HTMLDialogElement==='undefined') return; // starý prohlížeč: odkaz otevře obrázek normálně
  const dlg=document.createElement('dialog'); dlg.className='lightbox';
  dlg.innerHTML='<button type="button" aria-label="Zavřít">×</button><div class="lb-stage"><img alt="" draggable="false"></div><p class="lb-hint">dvojklep = přiblížit · klepnutí mimo = zavřít</p>';
  document.body.appendChild(dlg);
  const stage=dlg.querySelector('.lb-stage'), img=dlg.querySelector('img'), hint=dlg.querySelector('.lb-hint');
  let scale=1, tx=0, ty=0, pointers=new Map(), lastDist=0, lastTap=0, dragging=false, start=null;
  const apply=()=>{ img.style.transform=`translate(${tx}px,${ty}px) scale(${scale})`; stage.classList.toggle('zoomed', scale>1.02); };
  const reset=()=>{ scale=1; tx=0; ty=0; apply(); };
  const clamp=()=>{ const r=stage.getBoundingClientRect(); const w=img.clientWidth*scale, h=img.clientHeight*scale;
    const mx=Math.max(0,(w-r.width)/2), my=Math.max(0,(h-r.height)/2); tx=Math.min(mx,Math.max(-mx,tx)); ty=Math.min(my,Math.max(-my,ty)); };
  links.forEach(a=>a.addEventListener('click',e=>{ e.preventDefault(); img.src=a.href; img.alt=a.querySelector('img')?.alt||''; reset(); dlg.showModal(); hint.hidden=!matchMedia('(pointer:coarse)').matches; }));
  dlg.querySelector('button').addEventListener('click',()=>dlg.close());
  dlg.addEventListener('click',e=>{ if(e.target===dlg||e.target===stage) dlg.close(); });
  dlg.addEventListener('close',()=>{ img.src=''; reset(); });
  const zoomAt=(cx,cy,ns)=>{ const r=stage.getBoundingClientRect(); const px=cx-r.left-r.width/2, py=cy-r.top-r.height/2;
    tx=px-(px-tx)*(ns/scale); ty=py-(py-ty)*(ns/scale); scale=ns; clamp(); apply(); };
  img.addEventListener('pointerdown',e=>{ e.preventDefault(); img.setPointerCapture(e.pointerId); pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===1){ start={x:e.clientX-tx,y:e.clientY-ty}; dragging=false; }
    if(pointers.size===2){ const [a,b]=[...pointers.values()]; lastDist=Math.hypot(a.x-b.x,a.y-b.y); } });
  img.addEventListener('pointermove',e=>{ if(!pointers.has(e.pointerId)) return; pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
    if(pointers.size===2){ const [a,b]=[...pointers.values()]; const d=Math.hypot(a.x-b.x,a.y-b.y); if(lastDist){ zoomAt((a.x+b.x)/2,(a.y+b.y)/2,Math.min(6,Math.max(1,scale*d/lastDist))); } lastDist=d; return; }
    if(pointers.size===1&&scale>1&&start){ tx=e.clientX-start.x; ty=e.clientY-start.y; dragging=true; clamp(); apply(); } });
  const up=e=>{ pointers.delete(e.pointerId); if(pointers.size<2) lastDist=0;
    if(pointers.size===0&&!dragging&&e.type==='pointerup'){ const now=Date.now(); if(now-lastTap<320){ scale>1.02?reset():zoomAt(e.clientX,e.clientY,2.5); lastTap=0; } else lastTap=now; }
    dragging=false; };
  img.addEventListener('pointerup',up); img.addEventListener('pointercancel',up);
  img.addEventListener('wheel',e=>{ e.preventDefault(); zoomAt(e.clientX,e.clientY,Math.min(6,Math.max(1,scale*(e.deltaY<0?1.15:1/1.15)))); },{passive:false});
  img.addEventListener('dblclick',e=>e.preventDefault());
})();
// Filtr zápisků podle tématu
(function(){
  const fs=[...document.querySelectorAll('.filter[data-tag]')], posts=[...document.querySelectorAll('.post[data-tag]')]; if(!fs.length) return;
  const more=document.querySelector('.show-more');
  const reveal=()=>{posts.forEach(p=>{p.removeAttribute('data-more');}); if(more) more.hidden=true;};
  if(more) more.addEventListener('click',()=>{reveal(); posts.forEach(p=>{p.hidden=false;});});
  fs.forEach(b=>b.addEventListener('click',()=>{const t=b.dataset.tag;fs.forEach(x=>{const a=x===b;x.classList.toggle('active',a);x.setAttribute('aria-pressed',String(a));});
    if(t!=='all') reveal();
    posts.forEach(p=>{p.hidden=(t!=='all'&&p.dataset.tag!==t)||(t==='all'&&p.hasAttribute('data-more'));});}));
})();
