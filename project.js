// Lightbox pro screenshoty (klik = zvětšit, Esc/klik mimo = zavřít)
(function(){
  const links=[...document.querySelectorAll('a.zoom')]; if(!links.length) return;
  const dlg=document.createElement('dialog'); dlg.className='lightbox';
  dlg.innerHTML='<button type="button" aria-label="Zavřít">×</button><img alt="">';
  document.body.appendChild(dlg);
  const img=dlg.querySelector('img');
  links.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();img.src=a.href;img.alt=a.querySelector('img')?.alt||'';dlg.showModal();}));
  dlg.querySelector('button').addEventListener('click',()=>dlg.close());
  dlg.addEventListener('click',e=>{ if(e.target===dlg) dlg.close(); });
  dlg.addEventListener('close',()=>{ img.src=''; });
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
