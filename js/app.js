/* Main site script: services data (SERV/RAW), CFG.whatsapp, portfolio, booking and animations. */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(RM)document.documentElement.classList.add('reduced');
const IT=PORTFOLIO;
const src=id=>IMG[id];
const fi=$('#fimg');if(fi&&!fi.hasAttribute('src'))fi.src=IMG.founder;$('#yr').textContent=new Date().getFullYear();
/* services data: js/service-data.js (single source of truth, shared with build.js) */
const CFG={whatsapp:'917838913373'};
const {CATS,RAW}=VS_SERVICE_DATA;
const SERV=RAW.map(([c,slug,name,m,r])=>({c,slug,name,m,r}));
CATS.forEach(c=>c.items=SERV.filter(s=>s.c==c.i));
const esc=s=>s.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const inr=n=>'₹'+n.toLocaleString('en-IN');
const waLink=msg=>'https://wa.me/'+(CFG.whatsapp?CFG.whatsapp.replace(/\D/g,''):'')+'?text='+encodeURIComponent(msg);
/* portfolio (gallery page can ship the same markup server-rendered; only fill empty containers) */
const cats=['All',...new Set(IT.map(i=>i.c))];let cur='All',view=IT,li=0;
const chipsEl=$('#chips');if(chipsEl&&!chipsEl.children.length)chipsEl.innerHTML=cats.map((c,i)=>`<button class="chip" aria-pressed="${!i}" data-c="${c}">${c}</button>`).join('');
const masonEl=$('#mason');
const kinetics=window.AtelierMotion;
if(chipsEl)chipsEl.onclick=e=>{
 const b=e.target.closest('.chip');if(!b||b.dataset.c===cur)return;
 const tiles=$$('.tile',masonEl);
 const apply=()=>{cur=b.dataset.c;$$('.chip',chipsEl).forEach(x=>x.setAttribute('aria-pressed',x===b));tiles.forEach(t=>t.classList.toggle('hide',cur!=='All'&&t.dataset.c!==cur))};
 if(kinetics)kinetics.filter(masonEl,tiles,apply);else apply();
};
/* lightbox */
const lb=$('#lb');let lastF;
const lockViewer=on=>document.documentElement.classList.toggle('viewer-open',on);
const viewerMotion=matchMedia('(prefers-reduced-motion: reduce)'), viewerFrames=new WeakMap();
function viewerPhoto(photo, source, alt, direction){
 if(direction)kinetics?.cancelFlight();
 const state={};
 viewerFrames.get(photo)?.animation?.cancel();
 viewerFrames.set(photo,state);
 photo.src=source;photo.alt=alt;
 if(!direction||viewerMotion.matches||!photo.closest('.lb.on')||!photo.decode||!photo.animate)return;
 photo.decode().then(()=>{
  if(viewerFrames.get(photo)!==state||viewerMotion.matches||!photo.closest('.lb.on'))return;
  state.animation=photo.animate([{opacity:.52,translate:`${Math.sign(direction)*10}px 0`},{opacity:1,translate:'0 0'}],
   {id:'atelier-viewer',duration:270,easing:'cubic-bezier(.2,.72,.22,1)'});
 },()=>{});
}
viewerMotion.addEventListener('change',()=>{
 if(viewerMotion.matches)$$('.lb img').forEach(photo=>viewerFrames.get(photo)?.animation?.cancel());
});
function onSwipe(viewer, move){
 const photo=$('img',viewer);let start;
 photo.addEventListener('touchstart',e=>{start=e.touches.length===1?e.touches[0]:null},{passive:true});
 photo.addEventListener('touchcancel',()=>{start=null},{passive:true});
 photo.addEventListener('touchend',e=>{
  const end=[...e.changedTouches].find(t=>t.identifier===start?.identifier);
  if(!end)return;
  const dx=end.clientX-start.clientX,dy=end.clientY-start.clientY;start=null;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.35)move(dx<0?1:-1);
 },{passive:true});
}
function show(k){const direction=k-li;li=(k+view.length)%view.length;const it=view[li];viewerPhoto($('#li'),src(it.id),it.t,view.length>1?direction:0);$('#lt').textContent=it.t;$('#lc').textContent=it.c+' · '+(li+1)+' / '+view.length;$('#lbk').href='/booking?look='+encodeURIComponent(it.id)+'#book'}
function open(tile){
 lastF=tile;const thumb=$('img',tile),box=kinetics?.thumbBox(thumb);
 view=IT.filter(x=>cur=='All'||x.c==cur);show(view.findIndex(x=>x.i==tile.dataset.i));
 lb.classList.add('on');lockViewer(true);$('#lx').focus({preventScroll:true});kinetics?.fly(lb,thumb,box,true);
}
function close(){
 if(!lb.classList.contains('on'))return;
 const thumb=$(`.tile[data-i="${view[li].i}"] img`,masonEl);
 kinetics?.fly(lb,thumb,kinetics.thumbBox(thumb),false);
 lb.classList.remove('on');lockViewer(false);lastF?.focus({preventScroll:true});
}
if(masonEl)masonEl.onclick=e=>{const t=e.target.closest('.tile');t&&open(t)};
$('#lx').onclick=close;$('#lp').onclick=()=>show(li-1,-1);$('#ln').onclick=()=>show(li+1,1);lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key=='Escape')close();if(e.key=='ArrowLeft')show(li-1);if(e.key=='ArrowRight')show(li+1);if(e.key=='Tab'){const f=$$('button,a[href]',lb);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
onSwipe(lb,d=>show(li+d));
/* nav */
const nav=$('#nav'),bg=$('#burger'),lk=$('#links');
function setMobileMenu(open){
 bg.setAttribute('aria-expanded',open);lk.classList.toggle('open',open);
 document.documentElement.classList.toggle('menu-open',open);
 if(open)lk.scrollTop=0;else toggleAcc(false);
}
bg.onclick=()=>setMobileMenu(!lk.classList.contains('open'));
nav.addEventListener('click',e=>{if(e.target.closest('a[href]')&&lk.classList.contains('open'))setMobileMenu(false)});
nav.addEventListener('keydown',e=>{
 if(e.key!=='Tab'||!lk.classList.contains('open'))return;
 const items=$$('button,a[href]',nav).filter(el=>getComputedStyle(el).visibility==='visible'&&el.getClientRects().length);
 const target=e.shiftKey?items.at(-1):items[0];
 if(document.activeElement===(e.shiftKey?items[0]:items.at(-1))){e.preventDefault();target.focus()}
});
/* ===== services: mega menu, mobile accordion, routes ===== */
const mega=$('#mega'),macc=$('#macc'),sbtn=$('#svcbtn'),mobileMenu=matchMedia('(max-width:860px)'),isMob=()=>mobileMenu.matches;let mcat=0;
const navPath=location.pathname.replace(/\/index\.html$|\/$/,'')||'/';
$$('#nav a[href]').forEach(a=>{if(a.getAttribute('href')===navPath)a.setAttribute('aria-current','page')});
if(navPath==='/services'||navPath.startsWith('/services/'))sbtn.dataset.active='';
sbtn.setAttribute('aria-controls',isMob()?'macc':'mega');
mega.innerHTML=`<div class="mg"><div class="mgl" role="tablist" aria-orientation="vertical" aria-label="Service categories"><div class="eyebrow">Service Menu</div>${CATS.map(c=>`<button type="button" role="tab" id="mt${c.i}" aria-selected="false" aria-controls="mp" tabindex="-1" data-c="${c.i}"><span>${c.name}</span><small>${c.items.length}</small><i aria-hidden="true">\u203A</i></button>`).join('')}<a class="mall" href="/services">View all services \u2192</a></div><div class="mgr" id="mp" role="tabpanel" aria-live="polite"></div></div>`;
macc.innerHTML='<div class="mi">'+CATS.map(c=>`<div class="ac"><button type="button" id="ab${c.i}" aria-expanded="false" aria-controls="ap${c.i}"><span>${c.name}</span><i aria-hidden="true">+</i></button><div class="apn" id="ap${c.i}" role="region" aria-labelledby="ab${c.i}"><ul>${c.items.map(s=>`<li><a href="/services/${s.slug}">${esc(s.name)}<span aria-hidden="true">\u2192</span></a></li>`).join('')}</ul></div></div>`).join('')+'<a class="mall" href="/services">View all services \u2192</a></div>';
function selCat(i,focus){mcat=i;const c=CATS[i];$$('.mgl [role=tab]',mega).forEach(b=>{const on=+b.dataset.c==i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;if(on&&focus)b.focus()});
$('#mp').setAttribute('aria-labelledby','mt'+i);$('#mp').innerHTML=`<div class="mh"><h3>${c.name}</h3><a href="/services/category/${c.slug}">View category \u2192</a></div><ul>${c.items.map(s=>`<li><a href="/services/${s.slug}"><span>${esc(s.name)}</span><em>M ${inr(s.m)} \u00B7 R ${inr(s.r)}</em><b aria-hidden="true">\u2192</b></a></li>`).join('')}</ul><div class="mega__footer"><span>M and R are shown as listed on the atelier menu.</span><a href="/nail-prices">Full price list ↗</a></div>`}
function openMega(focus){mega.classList.add('open');sbtn.setAttribute('aria-expanded','true');selCat(mcat,focus)}
function closeMega(f){if(!mega.classList.contains('open'))return;mega.classList.remove('open');sbtn.setAttribute('aria-expanded','false');if(f)sbtn.focus()}
function toggleAcc(o){macc.classList.toggle('open',o);sbtn.setAttribute('aria-expanded',o)}
sbtn.onclick=e=>{if(isMob())toggleAcc(!macc.classList.contains('open'));else mega.classList.contains('open')?closeMega():openMega(e.detail===0)};
sbtn.addEventListener('keydown',e=>{if(!isMob()&&e.key==='ArrowDown'){e.preventDefault();openMega(true)}});
document.addEventListener('click',e=>{if(!mega.contains(e.target)&&!sbtn.contains(e.target))closeMega()});
addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(mega.classList.contains('open'))closeMega(true);else if(isMob()&&lk.classList.contains('open')){setMobileMenu(false);bg.focus()}});
mobileMenu.addEventListener('change',()=>{const hadFocus=nav.contains(document.activeElement)||mega.contains(document.activeElement);closeMega();setMobileMenu(false);sbtn.setAttribute('aria-controls',isMob()?'macc':'mega');if(hadFocus)(isMob()?bg:sbtn).focus({preventScroll:true})});
mega.addEventListener('click',e=>{const b=e.target.closest('[role=tab]');if(b)selCat(+b.dataset.c);if(e.target.closest('a'))closeMega()});
mega.addEventListener('pointerover',e=>{const b=e.target.closest('[role=tab]');if(b&&e.pointerType=='mouse'&&+b.dataset.c!=mcat)selCat(+b.dataset.c)});
mega.addEventListener('keydown',e=>{const b=e.target.closest('[role=tab]');if(!b)return;const n=CATS.length,i=+b.dataset.c;let j=null;if(e.key=='ArrowDown')j=(i+1)%n;if(e.key=='ArrowUp')j=(i-1+n)%n;if(e.key=='Home')j=0;if(e.key=='End')j=n-1;if(j!==null){e.preventDefault();selCat(j,true)}if(e.key=='ArrowRight'){e.preventDefault();$('#mp a')?.focus()}});
macc.addEventListener('click',e=>{const b=e.target.closest('.ac>button');if(b){const ac=b.parentElement,o=!ac.classList.contains('open');$$('.ac',macc).forEach(x=>{x.classList.remove('open');$('button',x).setAttribute('aria-expanded',false)});if(o){ac.classList.add('open');b.setAttribute('aria-expanded',true)}return}
if(e.target.closest('a')){$$('.ac',macc).forEach(x=>{x.classList.remove('open');$('button',x).setAttribute('aria-expanded',false)});setMobileMenu(false)}});
/* Legacy shared links resolve to the canonical static pages. */
function legacyHash(){const h=location.hash;if(/^#\/services(?:[/?]|$)/.test(h))location.replace(location.origin+'/'+h.slice(2))}
addEventListener('hashchange',legacyHash);
legacyHash();


/* ===== studio gallery + testimonial carousel (edit these arrays to add or remove photos) ===== */
const STUDIO=[['shelf','Gel polish wall','Shade shelves'],['chart','Colour chart','Gel polish display'],['swatch','Shade swatch board','Nude and rose tones'],['gloss','Gloss top coat','Finishing range'],['matte','Matte top coat','Finishing range'],['bloom','Blooming gel','Colourful Sky']].map(([k,t,c])=>({k,t,c,src:ST[k][0],w:ST[k][1],h:ST[k][2]}));
const sgalEl=$('#sgal');if(sgalEl&&!sgalEl.children.length)sgalEl.innerHTML=STUDIO.map((s,i)=>`<button type="button" class="sit s${i+1}" data-i="${i}" aria-label="Open photo: ${s.t}"><img src="${s.src}" width="${s.w}" height="${s.h}" alt="${s.t} in the studio" loading="lazy" decoding="async"><span class="gcap"><b>${s.t}</b>${s.c}</span></button>`).join('');
/* testimonials: add items here. name / rating / quote are shown only when provided and approved */
const TESTI=[['t0'],['t1'],['t2'],['t3'],['t4']].map(([k],i)=>({k,src:TS[k][0],w:TS[k][1],h:TS[k][2],alt:'Moment at the studio '+(i+1),cap:'In the studio',name:'',rating:null,quote:''}));
/* generic full-screen viewer */
const lb2=$('#lb2');let vl=[],vi=0,vf,studioTrigger;
function vshow(k){const direction=k-vi;vi=(k+vl.length)%vl.length;const it=vl[vi];viewerPhoto($('#l2i'),it.src,it.alt,vl.length>1?direction:0);$('#l2t').textContent=it.t||'';$('#l2c').textContent=(it.c?it.c+' \u00B7 ':'')+(vi+1)+'/'+vl.length;$('#l2p').hidden=$('#l2n').hidden=vl.length<2}
function vopen(list,i,trigger){
 vf=trigger||document.activeElement;studioTrigger=trigger;
 const thumb=trigger&&$('img',trigger),box=kinetics?.thumbBox(thumb);
 vl=list;vshow(i);lb2.classList.add('on');lockViewer(true);$('#l2x').focus({preventScroll:true});kinetics?.fly(lb2,thumb,box,true);
}
function vclose(){
 if(!lb2.classList.contains('on'))return;
 const thumb=studioTrigger&&$(`.sit[data-i="${vi}"] img`,sgalEl);
 kinetics?.fly(lb2,thumb,kinetics.thumbBox(thumb),false);
 lb2.classList.remove('on');lockViewer(false);vf?.focus({preventScroll:true});
}
$('#l2x').onclick=vclose;$('#l2p').onclick=()=>vshow(vi-1,-1);$('#l2n').onclick=()=>vshow(vi+1,1);lb2.onclick=e=>{if(e.target===lb2)vclose()};
addEventListener('keydown',e=>{if(!lb2.classList.contains('on'))return;if(e.key=='Escape')vclose();if(e.key=='ArrowLeft')vshow(vi-1,-1);if(e.key=='ArrowRight')vshow(vi+1,1);if(e.key=='Tab'){const f=$$('button:not([hidden])',lb2),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
onSwipe(lb2,d=>{if(vl.length>1)vshow(vi+d)});
const stList=STUDIO.map(s=>({src:s.src,alt:s.t+' in the studio',t:s.t,c:s.c}));
if(sgalEl)sgalEl.onclick=e=>{const b=e.target.closest('.sit');b&&vopen(stList,+b.dataset.i,b)};
/* 3D carousel */
const cst=$('#cstage'),car=$('#car'),N=TESTI.length;let ci=0,moved=false;
if(cst&&car){
 cst.innerHTML=TESTI.map((s,i)=>`<div class="cc" data-i="${i}"><div class="tin tilt"><img src="${s.src}" alt="${esc(s.alt)}" loading="lazy" width="${s.w}" height="${s.h}"></div></div>`).join('');
$('#cdots').innerHTML=TESTI.map((s,i)=>`<button type="button" aria-label="Show testimonial ${i+1} of ${N}" data-i="${i}"></button>`).join('');
function cset(k){ci=(k+N)%N;$$('.cc',cst).forEach((c,i)=>{let o=i-ci;if(o>N/2)o-=N;if(o<-N/2)o+=N;c.style.setProperty('--o',o);c.style.setProperty('--ab',Math.abs(o));c.classList.toggle('act',o==0);c.classList.toggle('far',Math.abs(o)>2);c.setAttribute('aria-hidden',o!=0)});
 $$('#cdots button').forEach((b,i)=>b.setAttribute('aria-current',i==ci));const s=TESTI[ci];$('#ccap').innerHTML=(s.quote?'\u201C'+esc(s.quote)+'\u201D':esc(s.cap))+((s.name||s.rating)?`<small>${s.name?esc(s.name):''}${s.rating?' \u00B7 '+'\u2605'.repeat(s.rating):''}</small>`:'')}
$('#cprev').onclick=()=>cset(ci-1);$('#cnext').onclick=()=>cset(ci+1);$('#cdots').onclick=e=>{const b=e.target.closest('button');b&&cset(+b.dataset.i)};
car.addEventListener('keydown',e=>{if(e.key=='ArrowLeft'){e.preventDefault();cset(ci-1)}if(e.key=='ArrowRight'){e.preventDefault();cset(ci+1)}if(e.key=='Enter'||e.key==' '){e.preventDefault();vopen(TESTI.map(s=>({src:s.src,alt:s.alt,t:s.name||'',c:s.cap})),ci)}});
let px=0,pd=false;car.addEventListener('pointerdown',e=>{px=e.clientX;pd=true;moved=false});addEventListener('pointerup',e=>{if(!pd)return;pd=false;const d=e.clientX-px;if(Math.abs(d)>45){moved=true;cset(ci+(d<0?1:-1))}});
cst.addEventListener('click',e=>{if(moved){moved=false;return}const c=e.target.closest('.cc');if(!c)return;const i=+c.dataset.i;if(i==ci)vopen(TESTI.map(s=>({src:s.src,alt:s.alt,t:s.name||'',c:s.cap})),ci);else cset(i)});
 cset(0)}


/* FAQ accordion (SEO) — one handler per .faq-list so pages can ship several grouped lists */
{$$('.faq-list').forEach(list=>list.addEventListener('click',e=>{const btn=e.target.closest('.faq-q');if(!btn)return;const item=btn.closest('.faq-item');const open=item.classList.contains('open');
 $$('.faq-item.open',list).forEach(o=>{if(o!==item){o.classList.remove('open');const b=o.querySelector('.faq-q');b&&b.setAttribute('aria-expanded','false')}});
 if(open){item.classList.remove('open');btn.setAttribute('aria-expanded','false')}
 else{item.classList.add('open');btn.setAttribute('aria-expanded','true')}}))}
/* /services: category chips + search over the prerendered list (JS only filters, HTML stays crawlable) */
{const sl=$('#sl'),sch=$('#sch'),sq=$('#sq');
 if(sl&&sch&&!sch.children.length){
  let f=new URLSearchParams(location.search).get('c')||'all';if(!CATS.some(c=>c.slug==f))f='all';
  let q='';
  sch.innerHTML=['all',...CATS.map(c=>c.slug)].map(s=>`<button type="button" class="chip" aria-pressed="${s==f}" data-c="${s}">${s=='all'?'All':CATS.find(c=>c.slug==s).name}</button>`).join('');
  const scnt=$('#scnt');
  const draw=()=>{const n=q.trim().toLowerCase();let tot=0;
   $$('.sec',sl).forEach(sec=>{const inCat=f=='all'||sec.id=='cat-'+f;let shown=0;
    $$('.sc',sec).forEach(cd=>{const ok=inCat&&(!n||(cd.textContent||'').toLowerCase().includes(n));cd.hidden=!ok;if(ok)shown++});
    sec.hidden=!shown;tot+=shown});
   if(scnt)scnt.textContent=tot+' services shown';
    const empty=$('#empty');if(empty)empty.hidden=tot>0};
  sch.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;f=b.dataset.c;$$('.chip',sch).forEach(x=>x.setAttribute('aria-pressed',x==b));history.replaceState(null,'',f=='all'?location.pathname:'/services?c='+f);draw()};
  if(sq)sq.oninput=e=>{q=e.target.value;draw()};
  draw();
  if(f!='all'){const el=document.getElementById('cat-'+f);el&&scrollTo({top:el.getBoundingClientRect().top+scrollY-80,behavior:'instant'})}
 }}
