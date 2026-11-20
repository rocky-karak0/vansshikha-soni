/* Main site script: services data (SERV/RAW), CFG.whatsapp, portfolio, booking, intro (playIntro) and animations. */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches||!window.gsap,FINE=matchMedia('(pointer:fine)').matches;
if(RM)document.documentElement.classList.add('reduced');
const NAMES={Gold:['Gilded Line','Aurum Edge','Gold Leaf','Chrome Rim','Liquid Gold'],Florals:['Bloom','Petal Study','Garden Set','Pearl Flower'],'Deep Reds':['Garnet','Wine Cat-Eye','Ruby Gloss','Velvet Red'],Ombré:['Blush Fade','Rose Gradient','Sunset Fade','Berry Tip'],French:['Quiet French','Noir Tip','Minimal Nude','Clean Line'],Playful:['Citrus Stripe','Colour Play','Sea Shell','Little Joys']};
const cnt={};const IT=ITEMS.map(([id,c,w,h],i)=>{cnt[c]=(cnt[c]||0);const t=NAMES[c][cnt[c]++%NAMES[c].length];return{id,c,w,h,t,i}});
const src=id=>IMG[id];
const fi=$('#fimg'),mi=$('#monoimg');if(fi&&!fi.hasAttribute('src'))fi.src=IMG.founder;if(mi&&!mi.hasAttribute('src'))mi.src=IMG.circle;const fl=$('#footlogo');if(fl&&!fl.hasAttribute('src'))fl.src=IMG.circle;$('#yr').textContent=new Date().getFullYear();
$$('[data-p]').forEach(i=>{if(!i.hasAttribute('src'))i.src=IMG[i.dataset.p]});
/* story track */
const trackEl=$('#track');if(trackEl)trackEl.innerHTML=[3,12,19,25,8,31,16,22,34].map(n=>{const it=IT[n];return`<div class="slide"><img src="${src(it.id)}" width="${it.w}" height="${it.h}" alt="${it.t}, ${it.c} nail art" loading="lazy" fetchpriority="low"><span>${it.t}</span></div>`}).join('');
/* services data: js/service-data.js (single source of truth, shared with build.js) */
const CFG={whatsapp:'917838913373'};
const {CATS,RAW,EXAMPLE}=VS_SERVICE_DATA;
const SERV=RAW.map(([c,slug,name,m,r,about,ideal,before,hl,care,ph],i)=>({id:'svc-'+String(i+1).padStart(2,'0'),c,slug,name,m,r,about,ideal,before,hl:hl.split('|'),care,ph,i}));
SERV.forEach(s=>{if(!s.ph&&EXAMPLE[s.slug]){s.ph=EXAMPLE[s.slug];s.ex=true}});
CATS.forEach(c=>c.items=SERV.filter(s=>s.c==c.i));
const BY=Object.fromEntries(SERV.map(s=>[s.slug,s]));
const esc=s=>s.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const inr=n=>'₹'+n.toLocaleString('en-IN');
const waLink=msg=>'https://wa.me/'+(CFG.whatsapp?CFG.whatsapp.replace(/\D/g,''):'')+'?text='+encodeURIComponent(msg);
const waMsg=(s,o,d,tm)=>'Hello VANSSHIKHA SONI Nail Atelier!\n\nI would like to enquire about booking:\n\nService: '+s.name+(o?'\nPrice Option: '+o:'')+(d?'\nPreferred Date: '+d:'')+(tm?'\nPreferred Time: '+tm:'')+'\n\nPlease confirm availability and final pricing.';
const pic=(s,alt,eager)=>s.ph?`<img ${eager?'fetchpriority="high" decoding="async"':''} src="${src(s.ph)}" alt="${alt?esc(s.name)+(s.ex?': example finish from the atelier portfolio':', from the atelier portfolio'):''}" ${eager?'':'loading="lazy"'}>`:`<div class="ph" role="img" aria-label="${esc(s.name)}"><span class="gold-text">VS</span><small>${CATS[s.c].name}</small></div>`;
const price=s=>`<div class="pp"><span>M<b>${inr(s.m)}</b></span><span>R<b>${inr(s.r)}</b></span></div>`;
const card=(s,i=0)=>`<article class="sc tilt" style="--i:${i}"><a class="sci" href="/services/${s.slug}" tabindex="-1" aria-hidden="true">${pic(s,false)}</a><div class="scb"><div class="eyebrow">${CATS[s.c].name}</div><h3><a href="/services/${s.slug}">${esc(s.name)}</a></h3><p>${esc(s.about)}</p>${price(s)}<div class="acts"><a class="btn ghost" href="/services/${s.slug}">View Details</a></div></div></article>`;
/* home: category cards */
const CPH={0:'p26',1:'p31',2:'p04',3:'p32',4:'p10',5:'p33',6:'p21',7:'p12'};
const DIM=id=>{const x=IT.find(v=>v.id===id);return x?` width="${x.w}" height="${x.h}"`:''};
const svcEl=$('#svc');if(svcEl)svcEl.innerHTML=CATS.map(c=>`<article class="card tilt"><div class="im">${CPH[c.i]?`<img src="${src(CPH[c.i])}"${DIM(CPH[c.i])} alt="" loading="lazy">`:''}</div><div class="no">0${c.i+1}</div><h3>${c.name}</h3><p>${c.items.length} ${c.items.length>1?'services':'service'}: ${c.items.map(s=>esc(s.name)).slice(0,3).join(', ')}${c.items.length>3?'…':''}</p><a class="go" href="/services/category/${c.slug}">Explore →</a></article>`).join('');
/* portfolio (gallery page can ship the same markup server-rendered; only fill empty containers) */
const cats=['All',...new Set(IT.map(i=>i.c))];let cur='All',view=IT,li=0,look=null;
{const mq=$('#mq');if(mq&&!mq.children.length){const w=[...new Set(IT.map(i=>i.c))].map(c=>`<span>${c}</span><span>✦</span>`).join('');mq.innerHTML=w+w+w+w}}
const chipsEl=$('#chips');if(chipsEl&&!chipsEl.children.length)chipsEl.innerHTML=cats.map((c,i)=>`<button class="chip" aria-pressed="${!i}" data-c="${c}">${c}</button>`).join('');
const masonEl=$('#mason');if(masonEl&&!masonEl.children.length)masonEl.innerHTML=IT.map(it=>`<button class="tile tilt" data-i="${it.i}" data-c="${it.c}" aria-label="Open ${it.t}"><img src="${src(it.id)}" width="${it.w}" height="${it.h}" alt="${it.t}, ${it.c} nail art" loading="lazy"><span class="no">${String(it.i+1).padStart(2,'0')}</span><span class="cap"><b>${it.t}</b>${it.c}</span></button>`).join('');
if(chipsEl)chipsEl.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cur=b.dataset.c;$$('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));view=IT.filter(i=>cur=='All'||i.c==cur);$$('.tile').forEach(t=>t.classList.toggle('hide',!(cur=='All'||t.dataset.c==cur)));window.ScrollTrigger&&ScrollTrigger.refresh()};
/* lightbox */
const lb=$('#lb');let lastF;
function show(k,dir=0){li=(k+view.length)%view.length;const it=view[li];const im=$('#li');im.src=src(it.id);im.alt=it.t+', '+it.c+' nail art';$('#lt').textContent=it.t;$('#lc').textContent=it.c+' · '+(li+1)+'/'+view.length;if(!RM)gsap.fromTo(im,{x:dir*60,rotationY:dir*-14,opacity:0},{x:0,rotationY:0,opacity:1,duration:.5,ease:'power3.out'})}
function open(i){lastF=document.activeElement;view=IT.filter(x=>cur=='All'||x.c==cur);show(view.findIndex(x=>x.i==i));lb.classList.add('on');document.body.style.overflow='hidden';$('#lx').focus()}
function close(){lb.classList.remove('on');document.body.style.overflow='';lastF&&lastF.focus()}
if(masonEl)masonEl.onclick=e=>{const t=e.target.closest('.tile');t&&open(+t.dataset.i)};
$('#lx').onclick=close;$('#lp').onclick=()=>show(li-1,-1);$('#ln').onclick=()=>show(li+1,1);lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key=='Escape')close();if(e.key=='ArrowLeft')show(li-1,-1);if(e.key=='ArrowRight')show(li+1,1);if(e.key=='Tab'){const f=$$('button',lb);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(li+(d<0?1:-1),d<0?1:-1)});
const lbkEl=$('#lbk');if(lbkEl)lbkEl.onclick=()=>{const bk=$('#book');if(bk){setLook(view[li]);close();bk.scrollIntoView({behavior:RM?'auto':'smooth'})}else{close();location.href='/booking'}};
function setLook(it){const c=$('#lookchip');if(!c)return;look=it;c.classList.toggle('on',!!it);if(it){$('img',c).src=src(it.id);$('#lookname').textContent=it.t+' · '+it.c}}const lookx=$('#lookx');if(lookx)lookx.onclick=()=>setLook(null);
/* booking (rendered only on pages that ship the booking panel: home and /booking) */
const S={svc:null,date:null,time:null};let step=0;
const sel=$('#ssel');if(sel){sel.innerHTML='<option value="">Choose a service</option>'+CATS.map(c=>`<optgroup label="${c.name}">${c.items.map(s=>`<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('')}</optgroup>`).join('');sel.onchange=()=>{S.svc=sel.value||null;$('#e0').textContent=''};
const today=new Date();today.setHours(0,0,0,0);let cm=new Date(today.getFullYear(),today.getMonth(),1);
function cal(){const y=cm.getFullYear(),m=cm.getMonth(),first=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate();let h=`<div class="h"><button type="button" id="cp" aria-label="Previous month" ${cm<=new Date(today.getFullYear(),today.getMonth(),1)?'disabled':''}>‹</button><span>${cm.toLocaleString('en',{month:'long',year:'numeric'})}</span><button type="button" id="cn" aria-label="Next month">›</button></div><div class="grid7">`+['S','M','T','W','T','F','S'].map(d=>`<div class="w">${d}</div>`).join('')+'<div></div>'.repeat(first);for(let d=1;d<=dim;d++){const dt=new Date(y,m,d),k=dt.toDateString();h+=`<button type="button" class="day" data-d="${dt.getTime()}" ${dt<today?'disabled':''} aria-pressed="${S.date&&S.date.toDateString()==k}">${d}</button>`}$('#cal').innerHTML=h+'</div>'}
cal();$('#cal').onclick=e=>{if(e.target.id=='cp'){cm=new Date(cm.getFullYear(),cm.getMonth()-1,1);cal()}else if(e.target.id=='cn'){cm=new Date(cm.getFullYear(),cm.getMonth()+1,1);cal()}else if(e.target.classList.contains('day')){S.date=new Date(+e.target.dataset.d);cal();$('#e1').textContent=''}};
$('#times').innerHTML=['Morning','Afternoon','Evening'].map(t=>`<button type="button" class="opt" aria-pressed="false" data-v="${t}">${t}<small>PREFERENCE</small></button>`).join('');
$('#times').onclick=e=>{const b=e.target.closest('.opt');if(!b)return;S.time=b.dataset.v;$$('.opt',$('#times')).forEach(x=>x.setAttribute('aria-pressed',x===b))};
const fmt=d=>d.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
function go(n){step=n;$$('.stp').forEach(s=>s.classList.toggle('on',+s.dataset.s==n));$$('#steps i').forEach((i,k)=>i.classList.toggle('d',k<=n));if(n==3)review()}
function review(){const nm=$('#nm').value.trim(),nt=$('#nt').value.trim();const rows=[['Service',S.svc],['Date',fmt(S.date)],['Time of day',S.time||'Flexible'],['Name',nm]];if(look)rows.push(['Look',look.t+' ('+look.c+')']);if(nt)rows.push(['Notes',nt]);$('#sum').innerHTML=rows.map(r=>`<li><span>${r[0]}</span><span style="text-align:right">${r[1].replace(/</g,'&lt;')}</span></li>`).join('');
const msg=`Hello Vansshikha Soni Nail Atelier! I'd like to request an appointment (please confirm availability).\n\nService: ${S.svc}\nPreferred date: ${fmt(S.date)}\nTime of day: ${S.time||'Flexible'}${look?`\nLook of interest: ${look.t} (${look.c})`:''}\nName: ${nm}${nt?`\nNotes: ${nt}`:''}`;$('#wa').href=waLink(msg)}
$$('[data-next]').forEach(b=>b.onclick=()=>{if(step==0&&!S.svc)return $('#e0').textContent='Please choose a service.';if(step==1&&!S.date)return $('#e1').textContent='Please pick a preferred date.';if(step==2&&!$('#nm').value.trim())return $('#e2').textContent='Please add your name.';go(step+1)});
$$('[data-prev]').forEach(b=>b.onclick=()=>go(step-1))}
/* service-detail WhatsApp booking widget (static /services/<slug> pages and the SPA view) */
function initServiceBook(root){root=root||document;const sec=root.querySelector&&root.querySelector('#sbk'),bwa=root.querySelector&&root.querySelector('#bwa'),bf=root.querySelector&&root.querySelector('.bf');if(!sec||!bwa||!bf||sec._bk)return;
 const s=BY[sec.dataset.svc];if(!s)return;sec._bk=1;let o='';
 const bd=$('#bd',sec),bt=$('#bt',sec);
 const up=()=>{bwa.href=waLink(waMsg(s,o,bd.value&&new Date(bd.value+'T00:00').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}),bt.value&&new Date('1970-01-01T'+bt.value).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})))};
 bd.min=new Date().toISOString().slice(0,10);
 bf.addEventListener('click',e=>{const b=e.target.closest('.opt');if(!b)return;o=o==b.dataset.o?'':b.dataset.o;$$('.opt',bf).forEach(x=>x.setAttribute('aria-pressed',x.dataset.o==o));up()});
 bd.oninput=bt.oninput=up;up()}
$$('[data-go]').forEach(b=>b.onclick=()=>{const t=document.getElementById(b.dataset.go);t&&t.scrollIntoView({behavior:RM?'auto':'smooth',block:'center'})});
initServiceBook(document);
/* nav */
const nav=$('#nav'),bg=$('#burger'),lk=$('#links');let ly=0,tk=false;addEventListener('scroll',()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{const y=scrollY;nav.classList.toggle('s',y>40);if(y>260&&y>ly+6&&!lk.classList.contains('open')&&!$('#mega').classList.contains('open'))nav.classList.add('nav-hide');else if(y<ly-6||y<=260)nav.classList.remove('nav-hide');if(Math.abs(y-ly)>6)ly=y;tk=false})},{passive:true});nav.addEventListener('focusin',()=>nav.classList.remove('nav-hide'));
bg.onclick=()=>{const o=bg.getAttribute('aria-expanded')!='true';bg.setAttribute('aria-expanded',o);lk.classList.toggle('open',o)};new MutationObserver(()=>document.documentElement.classList.toggle('menu-open',lk.classList.contains('open'))).observe(lk,{attributes:true,attributeFilter:['class']});
$$('a',lk).forEach(a=>a.onclick=()=>{bg.setAttribute('aria-expanded',false);lk.classList.remove('open')});
/* tile reveal (IntersectionObserver, with safety net) */
if(!RM){document.documentElement.classList.add('rv-on');const io=new IntersectionObserver(es=>{let k=0;es.forEach(en=>{if(en.isIntersecting){en.target.style.setProperty('--d',(k++)*90+'ms');en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -4% 0px'});$$('.tile').forEach(x=>io.observe(x));setTimeout(()=>$$('.tile').forEach(x=>x.classList.add('in')),6000)}
/* motion */
if(!RM){
gsap.registerPlugin(ScrollTrigger);
/* hero entrance is pure CSS now (lineUp/fadeUp/plaqueIn/floatIn): it starts at first paint, no JS needed */
$$('.float').forEach(f=>gsap.to(f,{y:()=>+f.dataset.d*-3,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}}));
gsap.to('.plaque',{yPercent:-8,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
$$('.dv path,.dv2').forEach(p=>{const l=p.getTotalLength();gsap.fromTo(p,{strokeDasharray:l,strokeDashoffset:l},{strokeDashoffset:0,duration:1.6,ease:'power2.inOut',scrollTrigger:{trigger:p,start:'top 90%'}})});
$$('.rv:not(.hero .rv),.head h2,.head p').forEach(el=>gsap.fromTo(el,{opacity:0,y:36},{opacity:1,y:0,duration:1.15,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 89%'}}));
const tr=$('#track');if(tr&&innerWidth>860){const dist=()=>tr.scrollWidth-innerWidth;
gsap.to(tr,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#gallery',start:'top top',end:()=>'+='+dist(),pin:'.story .pin',scrub:.7,invalidateOnRefresh:true,anticipatePin:1}});
$$('.slide img').forEach(im=>gsap.to(im,{scale:1,ease:'none',scrollTrigger:{trigger:im,containerAnimation:ScrollTrigger.getAll().pop().animation,start:'left 95%',end:'left 35%',scrub:true}}));}
gsap.from('.arch .in',{clipPath:'inset(100% 0 0 0)',duration:1.5,ease:'expo.inOut',scrollTrigger:{trigger:'.arch',start:'top 80%'}});gsap.fromTo('.arch img',{yPercent:-6},{yPercent:0,ease:'none',scrollTrigger:{trigger:'.arch',start:'top bottom',end:'bottom top',scrub:true}});
gsap.from('#svc .card',{opacity:0,y:60,rotationX:-12,transformOrigin:'50% 100%',stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#svc',start:'top 80%'}});
gsap.from('#fbig',{yPercent:60,opacity:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'footer',start:'top 70%'}});
gsap.from('footer .bg path',{strokeDashoffset:2000,strokeDasharray:2000,duration:3,stagger:.3,scrollTrigger:{trigger:'footer',start:'top 80%'}});
/* tilt + magnetic (re-bindable for dynamically rendered views) */
function bindFx(r=document){if(!FINE)return;$$('.tilt',r).forEach(c=>{if(c._fx)return;c._fx=1;c.addEventListener('pointermove',e=>{const q=c.getBoundingClientRect(),x=(e.clientX-q.left)/q.width-.5,y=(e.clientY-q.top)/q.height-.5;gsap.to(c,{rotationY:x*12,rotationX:-y*12,transformPerspective:900,duration:.5,ease:'power2.out'})});c.addEventListener('pointerleave',()=>gsap.to(c,{rotationX:0,rotationY:0,duration:.8,ease:'power3.out'}))});
$$('.mag',r).forEach(b=>{if(b._fx)return;b._fx=1;b.addEventListener('pointermove',e=>{const q=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-q.left-q.width/2)*.3,y:(e.clientY-q.top-q.height/2)*.4,duration:.4,ease:'power3.out'})});b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.9,ease:'elastic.out(1,.4)'}))})}
bindFx();window.bindFx=bindFx;
/* plaque follow */
const stageEl=$('#stage');if(FINE&&stageEl)stageEl.addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to('#plaque',{rotationY:x*18,rotationX:-y*14,transformPerspective:1100,duration:.7})});
if(stageEl)stageEl.addEventListener('pointerleave',()=>gsap.to('#plaque',{rotationX:0,rotationY:0,duration:1}));
/* cursor */
if(FINE){const c=$('#cur');let tx=0,ty=0,x=0,y=0,run=false;const l=()=>{x+=(tx-x)*.2;y+=(ty-y)*.2;c.style.transform=`translate(${x}px,${y}px)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.3)requestAnimationFrame(l);else run=false};addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;c.classList.add('on');if(!run){run=true;requestAnimationFrame(l)}},{passive:true});document.addEventListener('pointerover',e=>c.classList.toggle('h',!!e.target.closest('a,button,.tile')))}
}

const fx=r=>window.bindFx&&window.bindFx(r);
/* ===== services: mega menu, mobile accordion, routes ===== */
const mega=$('#mega'),macc=$('#macc'),sbtn=$('#svcbtn'),isMob=()=>matchMedia('(max-width:860px)').matches;let mcat=0;
mega.innerHTML=`<div class="mg"><div class="mgl" role="tablist" aria-orientation="vertical" aria-label="Service categories"><div class="eyebrow">Service Menu</div>${CATS.map(c=>`<button type="button" role="tab" id="mt${c.i}" aria-selected="false" aria-controls="mp" tabindex="-1" data-c="${c.i}"><span>${c.name}</span><small>${c.items.length}</small><i aria-hidden="true">\u203A</i></button>`).join('')}<a class="mall" href="/services">View all services \u2192</a></div><div class="mgr" id="mp" role="tabpanel" aria-live="polite"></div></div>`;
macc.innerHTML='<div class="mi">'+CATS.map(c=>`<div class="ac"><button type="button" id="ab${c.i}" aria-expanded="false" aria-controls="ap${c.i}"><span>${c.name}</span><i aria-hidden="true">+</i></button><div class="apn" id="ap${c.i}" role="region" aria-labelledby="ab${c.i}"><ul>${c.items.map(s=>`<li><a href="/services/${s.slug}">${esc(s.name)}<span aria-hidden="true">\u2192</span></a></li>`).join('')}</ul></div></div>`).join('')+'<a class="mall" href="/services">View all services \u2192</a></div>';
function selCat(i,focus){mcat=i;const c=CATS[i];$$('.mgl [role=tab]',mega).forEach(b=>{const on=+b.dataset.c==i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;if(on&&focus)b.focus()});
$('#mp').setAttribute('aria-labelledby','mt'+i);$('#mp').innerHTML=`<div class="mh"><h3>${c.name}</h3><a href="/services/category/${c.slug}">View category \u2192</a></div><ul>${c.items.map((s,k)=>`<li style="--i:${k}"><a href="/services/${s.slug}"><span>${esc(s.name)}</span><em>M ${inr(s.m)} \u00B7 R ${inr(s.r)}</em><b aria-hidden="true">\u2192</b></a></li>`).join('')}</ul>`}
function openMega(){mega.style.top=($('#nav').getBoundingClientRect().bottom+8)+'px';mega.classList.add('open');sbtn.setAttribute('aria-expanded','true');selCat(mcat)}
function closeMega(f){if(!mega.classList.contains('open'))return;mega.classList.remove('open');sbtn.setAttribute('aria-expanded','false');if(f)sbtn.focus()}
function toggleAcc(o){macc.classList.toggle('open',o);sbtn.setAttribute('aria-expanded',o)}
sbtn.onclick=()=>{if(isMob())toggleAcc(!macc.classList.contains('open'));else mega.classList.contains('open')?closeMega():openMega()};
document.addEventListener('click',e=>{if(!mega.contains(e.target)&&!sbtn.contains(e.target))closeMega()});
addEventListener('keydown',e=>{if(e.key=='Escape'&&mega.classList.contains('open'))closeMega(true)});
addEventListener('resize',()=>{closeMega();if(!isMob())toggleAcc(false)});
mega.addEventListener('click',e=>{const b=e.target.closest('[role=tab]');if(b)selCat(+b.dataset.c);if(e.target.closest('a'))closeMega()});
mega.addEventListener('pointerover',e=>{const b=e.target.closest('[role=tab]');if(b&&e.pointerType=='mouse'&&+b.dataset.c!=mcat)selCat(+b.dataset.c)});
mega.addEventListener('keydown',e=>{const b=e.target.closest('[role=tab]');if(!b)return;const n=CATS.length,i=+b.dataset.c;let j=null;if(e.key=='ArrowDown')j=(i+1)%n;if(e.key=='ArrowUp')j=(i-1+n)%n;if(e.key=='Home')j=0;if(e.key=='End')j=n-1;if(j!==null){e.preventDefault();selCat(j,true)}if(e.key=='ArrowRight'||e.key=='Enter'&&false){e.preventDefault();$('#mp a')?.focus()}});
macc.addEventListener('click',e=>{const b=e.target.closest('.ac>button');if(b){const ac=b.parentElement,o=!ac.classList.contains('open');$$('.ac',macc).forEach(x=>{x.classList.remove('open');$('button',x).setAttribute('aria-expanded',false)});if(o){ac.classList.add('open');b.setAttribute('aria-expanded',true)}return}
if(e.target.closest('a')){toggleAcc(false);$$('.ac',macc).forEach(x=>x.classList.remove('open'));bg.setAttribute('aria-expanded',false);lk.classList.remove('open')}});
/* routes: #/services , #/services?c=slug , #/services/slug */
const V=$('#views'),HM=$('#home'),pt=$('#pt');let curKey=null,first=true;
const meta=(t,d)=>{document.title=t;$('meta[name=description]').content=d};
function parse(){const h=location.hash;if(!h.startsWith('#/services'))return{k:'home',id:h.slice(1)};const[p,qs]=h.slice(2).split('?'),parts=p.split('/'),q=new URLSearchParams(qs||'');if(parts[1]&&BY[parts[1]])return{k:'svc:'+parts[1],s:BY[parts[1]]};return{k:'svcs',c:q.get('c')||'all'}}
function reveal(root){if(RM)return;const key=root===V?'__rvV':'__rvH';window[key]&&window[key].disconnect();const io=window[key]=new IntersectionObserver(es=>{let k=0;es.forEach(en=>{if(en.isIntersecting){en.target.style.setProperty('--d',(k++)*80+'ms');en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -6% 0px'});$$('.rvx',root).forEach(x=>io.observe(x));setTimeout(()=>$$('.rvx',root).forEach(x=>x.classList.add('in')),4000)}
function pageList(){let f='all',q='';
  V.innerHTML=`<section class="sph"><div class="wrap"><div class="eyebrow">The Menu</div><h1>All <em>Services</em></h1><p>Eight categories and 23 services with the official rates. M and R labels are shown exactly as on the menu.</p></div></section><div class="wrap" style="padding-top:10px;padding-bottom:90px"><div class="tb"><label class="sr" for="sq">Search services</label><input id="sq" type="search" placeholder="Search all 23 services\u2026" autocomplete="off"><div class="chips" id="sch" role="group" aria-label="Filter by category"></div></div><p class="sr" id="scnt" aria-live="polite"></p><div id="sl"></div><p class="note">M and R labels are shown as on the official menu; their meaning is being confirmed by the studio.</p></div>`;
  return{init(c){f=c;const ch=$('#sch');ch.innerHTML=['all',...CATS.map(c=>c.slug)].map(s=>`<button type="button" class="chip" aria-pressed="${s==f}" data-c="${s}">${s=='all'?'All':CATS.find(c=>c.slug==s).name}</button>`).join('');
   const draw=()=>{const n=q.trim().toLowerCase();let tot=0;const h=CATS.filter(c=>f=='all'||c.slug==f).map(c=>{const it=c.items.filter(s=>!n||(s.name+' '+s.about+' '+c.name).toLowerCase().includes(n));tot+=it.length;return it.length?`<section class="sec" id="cat-${c.slug}"><div class="sh"><h2>${c.name}</h2><span>${it.length} ${it.length>1?'services':'service'}</span></div><div class="sg">${it.map((s,i)=>card(s,i)).join('')}</div></section>`:''}).join('');
    $('#sl').innerHTML=h||'<p class="empty">No services match your search.</p>';$('#scnt').textContent=tot+' services shown';fx($('#sl'))};
   ch.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;f=b.dataset.c;$$('.chip',ch).forEach(x=>x.setAttribute('aria-pressed',x==b));draw()};$('#sq').oninput=e=>{q=e.target.value;draw()};draw()}}}
function pageDetail(s){const c=CATS[s.c],flip=s.i%2?' flip':'';
 const rel=[...c.items.filter(x=>x!=s),...SERV.slice(s.i+1),...SERV].filter((x,i,a)=>x!=s&&a.indexOf(x)==i).slice(0,3);
 const rings='<svg viewBox="0 0 400 400" aria-hidden="true">'+[40,80,120,160,195].map(r=>`<circle cx="200" cy="200" r="${r}"/>`).join('')+'</svg>';
 V.innerHTML=`<article class="sd" style="--tint:${c.tint}"><section class="sdh"><div class="sbg" aria-hidden="true">${rings}</div><div class="wrap sdg${flip}"><div class="sdt"><div class="crumb" role="navigation" aria-label="Breadcrumb"><a href="/services">All Services</a> / <a href="/services/category/${c.slug}">${c.name}</a></div><div class="eyebrow">${c.name}</div><h1>${esc(s.name)}</h1><p class="lead">${esc(s.about)}</p><div class="pr2"><span>M<b>${inr(s.m)}</b></span><span>R<b>${inr(s.r)}</b></span></div><div class="acts" style="max-width:420px"><a class="btn ghost mag" href="/services">\u2190 All Services</a></div></div><figure class="sdi tilt"><span class="no2">${String(s.i+1).padStart(2,'0')} / 23</span><div class="fr">${pic(s,true,true)}</div>${s.ph?`<figcaption>${s.ex?'Example from the atelier portfolio':'From the atelier portfolio'}</figcaption>`:''}</figure></div></section>
 <section class="sdc"><div class="wrap sdl${flip}"><div class="sdm"><section class="rvx"><h2>What the service <em>involves</em></h2><p>${esc(s.before)}</p></section><section class="rvx"><h2>Suitable looks</h2><p>${esc(s.ideal)}</p></section><section class="rvx"><h2>Key <em>features</em></h2><ul class="kf">${s.hl.map(x=>`<li>${esc(x)}</li>`).join('')}<li>Listed under ${c.name.toLowerCase().replace(/(^|\s)\S/g,m=>m.toUpperCase())}</li></ul></section><section class="rvx" style="border:0"><h2>Care &amp; <em>maintenance</em></h2><p>${s.care?esc(s.care):'Aftercare guidance for this service: PENDING studio confirmation.'}</p></section></div>
 <aside class="pcard rvx tilt"><div class="eyebrow">Official rates</div><div class="prow"><div><span>M</span><b>${inr(s.m)}</b></div><div><span>R</span><b>${inr(s.r)}</b></div></div><p class="small">${s.slug=='extension-removal'?'Shown in the original menu order. ':''}${/per-finger/.test(s.slug)?'Priced per finger. ':''}M and R are shown exactly as on the official menu; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp.</p></aside></div></section>
 <section class="sbk" id="sbk" data-svc="${s.slug}"><div class="wrap"><div class="pnl2 rvx"><div><div class="eyebrow">Book on WhatsApp</div><h2>Enquire about <em>${esc(s.name)}</em></h2><p>This opens WhatsApp with a ready message. It is an enquiry only; your slot and final price are confirmed by the studio.</p></div><div class="bf"><fieldset><legend>Price option (optional)</legend><div class="opts"><button type="button" class="opt" aria-pressed="false" data-o="M">M<small>${inr(s.m)}</small></button><button type="button" class="opt" aria-pressed="false" data-o="R">R<small>${inr(s.r)}</small></button></div></fieldset><div class="two"><div><label class="lb2" for="bd">Preferred date (optional)</label><input type="date" id="bd"></div><div><label class="lb2" for="bt">Preferred time (optional)</label><input type="time" id="bt"></div></div><a class="btn mag" id="bwa" target="_blank" rel="noopener">Book on WhatsApp</a></div></div></div></section>
 <section class="rel"><div class="wrap"><h2 class="rvx">Related <em>services</em></h2><div class="sg">${rel.map((x,i)=>card(x,i)).join('')}</div><div class="back2"><a class="btn ghost mag" href="/services">\u2190 Back to All Services</a></div></div></section></article>`;
 initServiceBook(V);
 $$('[data-go]',V).forEach(b=>b.onclick=()=>$('#sbk').scrollIntoView({behavior:RM?'auto':'smooth',block:'center'}));
 meta(s.name+' | Vansshikha Soni Nail Atelier',s.about+' Official rates M '+inr(s.m)+' / R '+inr(s.r)+'.')}
function render(r){if(window.animIO)$$('.gold-text,.sbg svg',V).forEach(x=>{animIO.unobserve(x);x._w=0});closeMega();toggleAcc(false);bg.setAttribute('aria-expanded',false);lk.classList.remove('open');
 if(r.k=='home'){V.hidden=true;V.innerHTML='';HM.hidden=false;meta('Vansshikha Soni Nail Atelier | Luxury Nail Art & Gel Extensions','Vansshikha Soni Nail Atelier: luxury nail art, gel extensions, chrome, ombre and French designs. Portfolio, official rates and WhatsApp booking.');if(curKey!='home'){window.ScrollTrigger&&setTimeout(()=>ScrollTrigger.refresh(),60);const el=r.id&&document.getElementById(r.id);scrollTo({top:el?el.getBoundingClientRect().top+scrollY-70:0,behavior:'instant'})}}
 else{HM.hidden=true;V.hidden=false;if(r.k=='svcs'){const p=pageList();p.init(CATS.some(c=>c.slug==r.c)?r.c:'all');meta('All Services | Vansshikha Soni Nail Atelier','All 8 categories and 23 nail services with official rates.')}else pageDetail(r.s);fx(V);reveal(V);window.watchAnim&&watchAnim(V);scrollTo({top:0,behavior:'instant'})}
 curKey=r.k;window.igSetup&&setTimeout(igSetup,60)}
/* legacy shared links (#/services/...) resolve to the canonical clean URLs (/services/...) */
function legacyHash(){const h=location.hash||'';if(h.indexOf('#/services')!==0)return false;location.replace(location.origin+'/'+h.slice(2));return true}
function route(){if(!HM)return;const r=parse();if(first||RM||r.k==curKey&&r.k=='home'){first=false;render(r);return}
 pt.style.transformOrigin='bottom';let sw=false;const swap=()=>{if(sw)return;sw=true;render(r);pt.style.transformOrigin='top';pt.classList.remove('on')};pt.classList.add('on');pt.addEventListener('transitionend',swap,{once:true});setTimeout(swap,560)}
/* static pages carry their own prerendered content; only the home page runs the hash router */
addEventListener('hashchange',()=>{if(legacyHash())return;if(HM)route()});
if(HM&&!legacyHash())route();


/* ===== studio gallery + testimonial carousel (edit these arrays to add or remove photos) ===== */
const STUDIO=[['shelf','Gel polish wall','Shade shelves'],['chart','Colour chart','Gel polish display'],['swatch','Shade swatch board','Nude and rose tones'],['gloss','Gloss top coat','Finishing range'],['matte','Matte top coat','Finishing range'],['bloom','Blooming gel','Colourful Sky']].map(([k,t,c])=>({k,t,c,src:ST[k][0],w:ST[k][1],h:ST[k][2]}));
const sgalEl=$('#sgal');if(sgalEl&&!sgalEl.children.length)sgalEl.innerHTML=STUDIO.map((s,i)=>`<button type="button" class="sit s${i+1} rvx" role="listitem" data-i="${i}" style="transition-delay:${i*90}ms" aria-label="Open photo: ${s.t}"><img src="${s.src}" width="${s.w}" height="${s.h}" alt="${s.t} in the studio" loading="lazy"><span class="gcap"><b>${s.t}</b>${s.c}</span></button>`).join('');
/* testimonials: add items here. name / rating / quote are shown only when provided and approved */
const TESTI=[['t0'],['t1'],['t2'],['t3'],['t4']].map(([k],i)=>({k,src:TS[k][0],w:TS[k][1],h:TS[k][2],alt:'Moment at the studio '+(i+1),cap:'In the studio',name:'',rating:null,quote:''}));
/* generic full-screen viewer */
const lb2=$('#lb2');let vl=[],vi=0,vf;
function vshow(k,d=0){vi=(k+vl.length)%vl.length;const it=vl[vi],im=$('#l2i');im.src=it.src;im.alt=it.alt;$('#l2t').textContent=it.t||'';$('#l2c').textContent=(it.c?it.c+' \u00B7 ':'')+(vi+1)+'/'+vl.length;$('#l2p').hidden=$('#l2n').hidden=vl.length<2;if(!RM&&window.gsap)gsap.fromTo(im,{x:d*60,rotationY:d*-14,opacity:0},{x:0,rotationY:0,opacity:1,duration:.5,ease:'power3.out'})}
function vopen(list,i){vf=document.activeElement;vl=list;vshow(i);lb2.classList.add('on');document.body.style.overflow='hidden';$('#l2x').focus()}
function vclose(){lb2.classList.remove('on');document.body.style.overflow='';vf&&vf.focus()}
$('#l2x').onclick=vclose;$('#l2p').onclick=()=>vshow(vi-1,-1);$('#l2n').onclick=()=>vshow(vi+1,1);lb2.onclick=e=>{if(e.target===lb2)vclose()};
addEventListener('keydown',e=>{if(!lb2.classList.contains('on'))return;if(e.key=='Escape')vclose();if(e.key=='ArrowLeft')vshow(vi-1,-1);if(e.key=='ArrowRight')vshow(vi+1,1);if(e.key=='Tab'){const f=$$('button:not([hidden])',lb2),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
let vx=0;lb2.addEventListener('touchstart',e=>vx=e.touches[0].clientX,{passive:true});lb2.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-vx;if(Math.abs(d)>50)vshow(vi+(d<0?1:-1),d<0?1:-1)});
const stList=STUDIO.map(s=>({src:s.src,alt:s.t+' in the studio',t:s.t,c:s.c}));
if(sgalEl)sgalEl.onclick=e=>{const b=e.target.closest('.sit');b&&vopen(stList,+b.dataset.i)};
if(FINE&&!RM&&sgalEl){const g=sgalEl;g.addEventListener('pointermove',e=>{const r=g.getBoundingClientRect();g.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*2);g.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*2)});g.addEventListener('pointerleave',()=>{g.style.setProperty('--mx',0);g.style.setProperty('--my',0)})}
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
cset(0);fx(car)}
/* reveal + fx for whichever page is on screen (static pages prerender their content in #views) */
if(!RM){if(HM)reveal(HM);else if(V){reveal(V);fx(V)}}


/* ===== editorial triptych intro: exactly 1200 ms, homepage only, skipped if the photo is not ready ===== */
const root0=document.documentElement,INTRO=$('#intro');let introActive=false,curTl=null,introRaf=0;
function heroIn(){/* hero entrance is pure CSS now: it plays from first paint and needs no JS */}
function introCleanup(){clearTimeout(window.__vsT);if(curTl){curTl.kill();curTl=null}root0.classList.remove('intro-on');document.body.style.overflow='';INTRO.style.clipPath='';cancelAnimationFrame(introRaf);INTRO.style.opacity='';INTRO.innerHTML='';introActive=false;if(window.gsap)gsap.set('.hero',{clearProps:'transform'});window.ScrollTrigger&&setTimeout(()=>ScrollTrigger.refresh(),50)}
/* back/forward cache restores must never leave a frozen overlay */
addEventListener('pageshow',e=>{if(e.persisted)introCleanup()});
addEventListener('pagehide',()=>{if(introActive)introCleanup()});
function playIntro(){
 if(introActive)return;if(!window.gsap){introCleanup();return}
 introActive=true;clearTimeout(window.__vsT);root0.classList.add('intro-on');
 window.__vsT=setTimeout(introCleanup,2000);/* hard cap: never block the site */
 let done=false,started=false;
 const finish=()=>{if(done)return;done=true;document.removeEventListener('keydown',kd,true);introCleanup()};
 const skip=()=>{if(done)return;heroIn();cancelAnimationFrame(introRaf);curTl&&curTl.kill();gsap.to(INTRO,{opacity:0,duration:.2,onComplete:finish})};
 const kd=e=>{if(e.key=='Escape')skip()};
 document.addEventListener('keydown',kd,true);
 INTRO.innerHTML='<div class="i-paper"></div><div class="i-trip">'+[0,1,2].map(k=>'<div class="i-pane"><i class="i-ph" style="--k:'+k+'"></i></div>').join('')+'<i class="i-sheen"></i></div>';
 const paper=$('.i-paper',INTRO),trip=$('.i-trip',INTRO),sheen=$('.i-sheen',INTRO),ps=$$('.i-pane',INTRO);
 /* wall-clock driver: first painted frame = t0, finishes at exactly dur, even if frames are dropped */
 const drive=(tl,dur)=>{tl.pause();let t0=null;const step=()=>{if(done)return;const now=performance.now();if(t0===null)t0=now;const s=(now-t0)/1000;tl.time(Math.min(s,dur),false);if(s>=dur)finish();else introRaf=requestAnimationFrame(step)};introRaf=requestAnimationFrame(step)};
 const go=()=>{if(started||done)return;started=true;
  if(!im.complete||im.naturalWidth<2){heroIn();introCleanup();return}/* photo not ready: homepage opens directly */
  if(RM){/* accessible path: soft fade, no motion */
   curTl=gsap.timeline({onComplete:finish});curTl.fromTo([paper,trip],{opacity:0},{opacity:1,duration:.2,ease:'none'},0).call(heroIn,null,.22).to([paper,trip],{opacity:0,duration:.22,ease:'none'},.26);drive(curTl,.5);return}
  /* editorial triptych: panels settle, light sweeps the photo, panels part — exactly 1.2 s */
  curTl=gsap.timeline({onComplete:finish});
  curTl.fromTo(paper,{opacity:0},{opacity:1,duration:.14,ease:'none'},0)
   .fromTo(ps,{opacity:0,y:i=>i%2?56:-56},{opacity:1,y:0,duration:.46,stagger:.06,ease:'expo.out'},.04)
   .fromTo(trip,{gap:'16px'},{gap:'4px',duration:.5,ease:'power2.out'},.1)
   .fromTo(sheen,{opacity:0,xPercent:-55},{opacity:.9,xPercent:55,duration:.4,ease:'power1.inOut'},.16)
   .to(sheen,{opacity:0,duration:.14,ease:'power1.in'},.5)
   .call(()=>heroIn(),null,.82)
   .to(ps,{opacity:0,y:i=>i%2?-64:64,duration:.3,stagger:.04,ease:'power2.in'},.84)
   .to(paper,{opacity:0,duration:.3,ease:'power1.inOut'},.9);
  drive(curTl,1.2)};
 const im=new Image();im.onload=go;im.onerror=go;im.src=src('p31');
 if(im.complete&&im.naturalWidth)go();else setTimeout(go,420);
}
window.playIntro=playIntro;
const replayBtn=$('#replay');if(replayBtn)replayBtn.onclick=()=>{scrollTo({top:0,behavior:'instant'});playIntro()};
try{if(root0.classList.contains('intro-on'))playIntro()}catch(e){introCleanup()}

if(matchMedia('(pointer:coarse)').matches)addEventListener('focusin',e=>{const f=e.target;if(f.matches&&f.matches('input,textarea,select'))setTimeout(()=>f.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'}),300)});

/* pause infinite animations that are offscreen; fade images in when loaded (content stays visible if JS fails) */
const animIO=new IntersectionObserver(es=>es.forEach(e=>e.target.toggleAttribute('data-off',!e.isIntersecting)),{rootMargin:'80px'});window.animIO=animIO;
function watchAnim(root=document){$$('.gold-text,.mq div,.float,.plaque,.sbg svg',root).forEach(x=>{if(!x._w){x._w=1;animIO.observe(x)}})}window.watchAnim=watchAnim;watchAnim();
{const ld=i=>i&&i.classList&&i.classList.add('ld');addEventListener('load',e=>{if(e.target.tagName=='IMG')ld(e.target)},true);addEventListener('error',e=>{if(e.target.tagName=='IMG')ld(e.target)},true);$$('img').forEach(i=>{if(i.complete)ld(i)});document.documentElement.classList.add('ld-on');setTimeout(()=>$$('img').forEach(ld),5000)}


/* Instagram button: yields (fades) while it would sit on a WhatsApp booking button, and while a form field is focused */
const igEl=$('#dock');let igIO=null;const igHits=new Set();
function igSetup(){if(!igEl||!window.IntersectionObserver)return;igIO&&igIO.disconnect();igHits.clear();igEl.classList.remove('yield');const r=igEl.getBoundingClientRect(),vw=innerWidth,vh=innerHeight;if(!r.width)return;
 igIO=new IntersectionObserver(es=>{es.forEach(e=>e.isIntersecting?igHits.add(e.target):igHits.delete(e.target));igEl.classList.toggle('yield',igHits.size>0)},{rootMargin:`${-Math.floor(r.top)}px ${-Math.floor(vw-r.right)}px ${-Math.floor(vh-r.bottom)}px ${-Math.floor(r.left)}px`});
 $$('a[href^="https://wa.me"]:not(.dk)').forEach(a=>igIO.observe(a))}
window.igSetup=igSetup;igSetup();let igT;addEventListener('resize',()=>{clearTimeout(igT);igT=setTimeout(igSetup,200)});addEventListener('orientationchange',()=>setTimeout(igSetup,300));
addEventListener('focusin',e=>{if(e.target.matches&&e.target.matches('input,textarea,select'))root0.classList.add('typing')});
addEventListener('focusout',()=>setTimeout(()=>{const a=document.activeElement;if(!(a&&a.matches&&a.matches('input,textarea,select')))root0.classList.remove('typing')},150));


/* social dock: soft 3D tilt toward the pointer (fine pointers only) */
if(FINE)$$('.dk').forEach(a=>{a.addEventListener('pointermove',e=>{const r=a.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;a.style.setProperty('--ry',(x*18)+'deg');a.style.setProperty('--rx',(-y*18)+'deg')},{passive:true});a.addEventListener('pointerleave',()=>{a.style.setProperty('--rx','0deg');a.style.setProperty('--ry','0deg')})});
/* FAQ accordion (SEO) — one handler per .faq-list so pages can ship several grouped lists */
{$$('.faq-list').forEach(list=>list.addEventListener('click',e=>{const btn=e.target.closest('.faq-q');if(!btn)return;const item=btn.closest('.faq-item');const open=item.classList.contains('open');
 $$('.faq-item.open',list).forEach(o=>{if(o!==item){o.classList.remove('open');const b=o.querySelector('.faq-q');b&&b.setAttribute('aria-expanded','false')}});
 if(open){item.classList.remove('open');btn.setAttribute('aria-expanded','false')}
 else{item.classList.add('open');btn.setAttribute('aria-expanded','true')}}))}
addEventListener('load',()=>{window.ScrollTrigger&&ScrollTrigger.refresh()});
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
   const empty=$('#empty');if(empty)empty.hidden=tot>0;
   window.ScrollTrigger&&ScrollTrigger.refresh()};
  sch.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;f=b.dataset.c;$$('.chip',sch).forEach(x=>x.setAttribute('aria-pressed',x==b));history.replaceState(null,'',f=='all'?location.pathname:'/services?c='+f);draw()};
  if(sq)sq.oninput=e=>{q=e.target.value;draw()};
  draw();
  if(f!='all'){const el=document.getElementById('cat-'+f);el&&scrollTo({top:el.getBoundingClientRect().top+scrollY-80,behavior:'instant'})}
 }}
/* three.js hero background removed for performance: the hero keeps its CSS radial-gradient look with no per-frame rendering */
