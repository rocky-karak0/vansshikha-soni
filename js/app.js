/* Main site script: services data (SERV/RAW), CFG.whatsapp, portfolio, booking, intro (playIntro) and animations. */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches||!window.gsap,FINE=matchMedia('(pointer:fine)').matches;
if(RM)document.documentElement.classList.add('reduced');
const NAMES={Gold:['Gilded Line','Aurum Edge','Gold Leaf','Chrome Rim','Liquid Gold'],Florals:['Bloom','Petal Study','Garden Set','Pearl Flower'],'Deep Reds':['Garnet','Wine Cat-Eye','Ruby Gloss','Velvet Red'],Ombré:['Blush Fade','Rose Gradient','Sunset Fade','Berry Tip'],French:['Quiet French','Noir Tip','Minimal Nude','Clean Line'],Playful:['Citrus Stripe','Colour Play','Sea Shell','Little Joys']};
const cnt={};const IT=ITEMS.map(([id,c,w,h],i)=>{cnt[c]=(cnt[c]||0);const t=NAMES[c][cnt[c]++%NAMES[c].length];return{id,c,w,h,t,i}});
const src=id=>IMG[id];
$('#fimg').src=IMG.founder;$('#monoimg').src=IMG.circle;$('#footlogo').src=IMG.circle;$('#yr').textContent=new Date().getFullYear();
$$('[data-p]').forEach(i=>i.src=IMG[i.dataset.p]);
/* story track */
$('#track').innerHTML=[3,12,19,25,8,31,16,22,34].map(n=>{const it=IT[n];return`<div class="slide"><img src="${src(it.id)}" alt="${it.t}, ${it.c} nail art" loading="lazy"><span>${it.t}</span></div>`}).join('');
/* services data: edit prices and text here (M and R shown exactly as on the official menu) */
const CFG={whatsapp:''};/* PENDING: official WhatsApp number, digits with country code, e.g. '91XXXXXXXXXX' */
const CATS=[['APPLICATION','application','#471A2C'],['ADVANCE GEL SET','advance-gel-set','#2b1230'],['NAIL DESIGN','nail-design','#3a1420'],['NAIL EXTENSION','nail-extension','#1d2a2a'],['OVERLAY','overlay','#2a1a3a'],['REFILLS','refills','#381d12'],['MINI MANICURE','mini-manicure','#2c2414'],['REMOVAL','removal','#1f1f26']].map(([name,slug,tint],i)=>({name,slug,tint,i}));
const RAW=[
[0,'classic','Classic',350,400,'A clean, classic nail colour application designed for a polished everyday look.','A simple, versatile finish for clients who prefer understated nails.','Finish and wear depend on the product system used. Please confirm with the studio whether this is regular polish or gel.','Polished everyday look|Simple, versatile finish','','p26'],
[0,'french','French',500,600,'A timeless nail finish featuring a defined tip paired with a natural-looking base.','An elegant, neat look suitable for everyday wear and special occasions.','Tip shape, colour and base shade can be customised after consultation.','Defined tip with a natural-looking base|Tip shape, colour and base shade can be customised','','p18'],
[1,'cat-eye-gel-set','Cat Eye Gel Set',400,500,'A magnetic-effect gel look that creates a luminous, shifting line or reflective pattern.','A dimensional, light-catching manicure with a distinctive finish.','The final effect varies with magnetic gel shade and application technique.','Magnetic-effect gel|Luminous, shifting line or reflective pattern','','p31'],
[1,'marble-gel-set','Marble Gel Set',400,500,'A gel design inspired by natural marble, with soft swirls and layered colour patterns.','A sophisticated artistic look that can be subtle or high-contrast.','Marble patterns are individually created and may vary between nails.','Soft swirls and layered colour patterns|Can be subtle or high-contrast','','p16'],
[1,'glitter-gel-set','Glitter Gel Set',400,500,'A gel nail finish incorporating glitter for a sparkling decorative effect.','A festive or statement manicure with adjustable sparkle intensity.','Glitter density and finish depend on the chosen design.','Glitter for a sparkling decorative effect|Adjustable sparkle intensity','','p22'],
[1,'ombre-gel-art','Ombre Gel Art',400,500,'A blended gel nail design that transitions smoothly between two or more colours.','A soft gradient look, from neutral to colourful combinations.','Colour combinations and blending style can be selected during consultation.','Smooth transition between colours|From neutral to colourful combinations','','p07'],
[1,'chrome-gel-set','Chrome Gel Set',500,600,'A reflective nail finish created with chrome-style pigment over a suitable gel base.','A sleek metallic, pearlescent or mirror-inspired appearance.','The result depends on the base colour and chrome pigment selected.','Reflective chrome-style pigment|Metallic, pearlescent or mirror-inspired','','p27'],
[2,'nail-art-per-finger','Nail Art – Per Finger',30,40,'Decorative detailing applied to an individual nail, such as fine lines, florals, patterns or accents.','Customisation without committing to artwork on every nail.','Price is listed per finger; complex artwork may require a separate quote.','Priced per finger|Fine lines, florals, patterns or accents','','p35'],
[2,'3d-nail-art-per-finger','3D Nail Art – Per Finger',50,70,'Raised or dimensional nail decoration using suitable sculpting materials or embellishments.','A textured statement design for selected accent nails.','Price is per finger; please confirm embellishment complexity and maintenance before booking.','Priced per finger|Raised, dimensional decoration','','p04'],
[3,'gel-extension','Gel Extension',900,1000,'A nail-length enhancement created with an extension system and gel-based building product.','Added length and a shaped, finished nail appearance.','Length, shape, structure and suitability should be assessed by the nail technician.','Added length with a shaped, finished look|Built with an extension system and gel-based product','',''],
[3,'acrylic-extension','Acrylic Extension',1100,1200,'A nail enhancement built with an acrylic system to create additional length and structure.','A sculpted look with customisable length and shape.','Maintenance and safe removal are important.','Additional length and structure|Customisable length and shape','Maintenance and safe removal are important; please do not peel extensions off.',''],
[3,'temporary-extension','Temporary Extension',700,800,'A shorter-term nail-length option for occasions or clients seeking a less permanent look.','A convenient enhanced nail appearance for a specific event or period.','Exact materials, expected wear time and removal method are confirmed by the studio.','Shorter-term nail-length option|Suited to occasions or a less permanent look','',''],
[3,'soft-gel-extension','Soft Gel Extension',800,900,'A nail-length enhancement using soft-gel extension tips or a related soft-gel system.','A smooth, shaped extension look in various lengths and styles.','The specific application method and removal protocol depend on the products used.','Soft-gel extension tips or a related system|Smooth, shaped look in various lengths and styles','Application method and removal protocol depend on the products used.',''],
[3,'gum-gel-extension','Gum Gel Extension',1500,1700,'A sculpted nail extension made with a mouldable builder-style gel commonly called gum gel.','Custom-shaped extensions with a structured finish.','Product terminology and exact technique should be confirmed with the studio.','Sculpted with a mouldable builder-style gel|Custom-shaped, structured finish','',''],
[4,'gel-overlay','Gel Overlay',700,800,'A gel layer applied over natural nails to add a smooth finish and supportive structure without necessarily extending length.','For clients who want their natural nail length with a polished, reinforced look.','A technician should assess natural nail condition and suitable product.','Gel layer over natural nails|Smooth finish with supportive structure','',''],
[4,'acrylic-overlay','Acrylic Overlay',900,1000,'An acrylic coating applied over natural nails, generally without adding extension length.','A structured nail surface while keeping the existing nail length.','Requires appropriate maintenance and professional removal.','Acrylic coating over natural nails|Keeps the existing nail length','Requires appropriate maintenance and professional removal.',''],
[5,'gel-refill','Gel Refill',750,800,'Maintenance of an existing gel enhancement by addressing new nail growth and restoring its appearance.','For clients returning to maintain a previously applied gel set.','Suitability depends on lifting, condition and the existing enhancement system.','Maintains an existing gel enhancement|Addresses new nail growth','Suitability depends on lifting, condition and the existing enhancement system.',''],
[5,'acrylic-refill','Acrylic Refill',900,1050,'Maintenance of existing acrylic enhancements to rebalance the growth area and refresh the set.','For clients who want to maintain an acrylic set rather than replace it completely.','Damaged or lifting enhancements may need repair or removal instead.','Maintains existing acrylic enhancements|Rebalances the growth area and refreshes the set','Damaged or lifting enhancements may need repair or removal instead of a refill.',''],
[5,'gum-gel-refill','Gum Gel Refill',1100,1200,'Maintenance of a previously applied gum-gel enhancement, focusing on new growth and shape.','For upkeep of a compatible gum-gel set.','Please confirm product compatibility and nail condition before refill.','Maintains a previously applied gum-gel set|Focuses on new growth and shape','',''],
[6,'nail-cut-file','Nail Cut + File',50,70,'Basic nail length trimming and shaping using a nail file.','A tidy, natural-looking nail shape with minimal treatment time.','Shape and length are adjusted according to the client’s preference and nail condition.','Basic trimming and shaping|Tidy, natural-looking nail shape','',''],
[6,'nail-cut-polish','Nail Cut + Polish',80,100,'A simple nail grooming service with trimming and a polished colour finish.','A quick refreshed look without an elaborate nail-art design.','Please confirm whether filing, base coat and polish type are included.','Trimming with a polished colour finish|Simple, quick refresh','',''],
[7,'gel-polish-removal','Gel Polish Removal',150,250,'Removal of existing gel polish using a method appropriate to the applied product.','For changing a gel colour or returning to natural nails.','Methods vary by formula.','Method appropriate to the applied product|For a colour change or a return to natural nails','Avoid peeling or scraping gel polish at home; removal methods vary by formula.',''],
[7,'extension-removal','Extension Removal',350,300,'Removal of existing nail extensions using a technique suited to the extension material.','For safely transitioning from enhancements or preparing for a new set.','Different systems require different removal methods; price order follows the original menu.','Technique suited to the extension material|For transitioning from enhancements or preparing a new set','Different systems require different removal methods.','']
];
const SERV=RAW.map(([c,slug,name,m,r,about,ideal,before,hl,care,ph],i)=>({id:'svc-'+String(i+1).padStart(2,'0'),c,slug,name,m,r,about,ideal,before,hl:hl.split('|'),care,ph,i}));
/* services without a verified matching photo use an authentic atelier portfolio photo as a visual example (captioned as an example, technique not claimed) */
const EXAMPLE={'gel-extension':'p32','acrylic-extension':'p17','temporary-extension':'p09','soft-gel-extension':'p19','gum-gel-extension':'p14','gel-overlay':'p10','acrylic-overlay':'p08','gel-refill':'p33','acrylic-refill':'p05','gum-gel-refill':'p20','nail-cut-file':'p34','nail-cut-polish':'p21','gel-polish-removal':'p12','extension-removal':'p37'};
SERV.forEach(s=>{if(!s.ph&&EXAMPLE[s.slug]){s.ph=EXAMPLE[s.slug];s.ex=true}});
CATS.forEach(c=>c.items=SERV.filter(s=>s.c==c.i));
const BY=Object.fromEntries(SERV.map(s=>[s.slug,s]));
const esc=s=>s.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const inr=n=>'₹'+n.toLocaleString('en-IN');
const waLink=msg=>'https://wa.me/'+(CFG.whatsapp?CFG.whatsapp.replace(/\D/g,''):'')+'?text='+encodeURIComponent(msg);
const waMsg=(s,o,d,tm)=>'Hello VANSSHIKHA SONI Nail Atelier!\n\nI would like to enquire about booking:\n\nService: '+s.name+(o?'\nPrice Option: '+o:'')+(d?'\nPreferred Date: '+d:'')+(tm?'\nPreferred Time: '+tm:'')+'\n\nPlease confirm availability and final pricing.';
const pic=(s,alt,eager)=>s.ph?`<img ${eager?'fetchpriority="high" decoding="async"':''} src="${src(s.ph)}" alt="${alt?esc(s.name)+(s.ex?': example finish from the atelier portfolio':', from the atelier portfolio'):''}" ${eager?'':'loading="lazy"'}>`:`<div class="ph" role="img" aria-label="${esc(s.name)}"><span class="gold-text">VS</span><small>${CATS[s.c].name}</small></div>`;
const price=s=>`<div class="pp"><span>M<b>${inr(s.m)}</b></span><span>R<b>${inr(s.r)}</b></span></div>`;
const card=(s,i=0)=>`<article class="sc tilt" style="--i:${i}"><a class="sci" href="#/services/${s.slug}" tabindex="-1" aria-hidden="true">${pic(s,false)}</a><div class="scb"><div class="eyebrow">${CATS[s.c].name}</div><h3><a href="#/services/${s.slug}">${esc(s.name)}</a></h3><p>${esc(s.about)}</p>${price(s)}<div class="acts"><a class="btn ghost" href="#/services/${s.slug}">View Details</a><a class="btn" target="_blank" rel="noopener" href="${waLink(waMsg(s))}">Book on WhatsApp</a></div></div></article>`;
/* home: category cards */
const CPH={0:'p26',1:'p31',2:'p04',3:'p32',4:'p10',5:'p33',6:'p21',7:'p12'};
$('#svc').innerHTML=CATS.map(c=>`<article class="card tilt"><div class="im">${CPH[c.i]?`<img src="${src(CPH[c.i])}" alt="" loading="lazy">`:''}</div><div class="no">0${c.i+1}</div><h3>${c.name}</h3><p>${c.items.length} ${c.items.length>1?'services':'service'}: ${c.items.map(s=>esc(s.name)).slice(0,3).join(', ')}${c.items.length>3?'…':''}</p><a class="go" href="#/services?c=${c.slug}">Explore →</a></article>`).join('');
/* portfolio */
const cats=['All',...new Set(IT.map(i=>i.c))];let cur='All',view=IT,li=0,look=null;
{const w=[...new Set(IT.map(i=>i.c))].map(c=>`<span>${c}</span><span>✦</span>`).join('');$('#mq').innerHTML=w+w+w+w}
$('#chips').innerHTML=cats.map((c,i)=>`<button class="chip" aria-pressed="${!i}" data-c="${c}">${c}</button>`).join('');
$('#mason').innerHTML=IT.map(it=>`<button class="tile tilt" data-i="${it.i}" data-c="${it.c}" aria-label="Open ${it.t}"><img src="${src(it.id)}" width="${it.w}" height="${it.h}" alt="${it.t}, ${it.c} nail art" loading="lazy"><span class="no">${String(it.i+1).padStart(2,'0')}</span><span class="cap"><b>${it.t}</b>${it.c}</span></button>`).join('');
$('#chips').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;cur=b.dataset.c;$$('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));view=IT.filter(i=>cur=='All'||i.c==cur);const sh=[];$$('.tile').forEach(t=>{const on=cur=='All'||t.dataset.c==cur;t.classList.toggle('hide',!on);if(on)sh.push(t)});sh.forEach((x,k)=>{x.classList.add('snap');x.classList.remove('in');x.style.setProperty('--d',Math.min(k,12)*70+'ms');void x.offsetWidth;x.classList.remove('snap');setTimeout(()=>x.classList.add('in'),40)});window.ScrollTrigger&&ScrollTrigger.refresh()};
/* lightbox */
const lb=$('#lb');let lastF;
function show(k,dir=0){li=(k+view.length)%view.length;const it=view[li];const im=$('#li');im.src=src(it.id);im.alt=it.t+', '+it.c+' nail art';$('#lt').textContent=it.t;$('#lc').textContent=it.c+' · '+(li+1)+'/'+view.length;if(!RM)gsap.fromTo(im,{x:dir*60,rotationY:dir*-14,opacity:0},{x:0,rotationY:0,opacity:1,duration:.5,ease:'power3.out'})}
function open(i){lastF=document.activeElement;view=IT.filter(x=>cur=='All'||x.c==cur);show(view.findIndex(x=>x.i==i));lb.classList.add('on');document.body.style.overflow='hidden';$('#lx').focus()}
function close(){lb.classList.remove('on');document.body.style.overflow='';lastF&&lastF.focus()}
$('#mason').onclick=e=>{const t=e.target.closest('.tile');t&&open(+t.dataset.i)};
$('#lx').onclick=close;$('#lp').onclick=()=>show(li-1,-1);$('#ln').onclick=()=>show(li+1,1);lb.onclick=e=>{if(e.target===lb)close()};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key=='Escape')close();if(e.key=='ArrowLeft')show(li-1,-1);if(e.key=='ArrowRight')show(li+1,1);if(e.key=='Tab'){const f=$$('button',lb);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
let sx=0;lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(li+(d<0?1:-1),d<0?1:-1)});
$('#lbk').onclick=()=>{setLook(view[li]);close();$('#book').scrollIntoView({behavior:RM?'auto':'smooth'})};
function setLook(it){look=it;const c=$('#lookchip');c.classList.toggle('on',!!it);if(it){$('img',c).src=src(it.id);$('#lookname').textContent=it.t+' · '+it.c}}$('#lookx').onclick=()=>setLook(null);
/* booking */
const S={svc:null,date:null,time:null};let step=0;
const sel=$('#ssel');sel.innerHTML='<option value="">Choose a service</option>'+CATS.map(c=>`<optgroup label="${c.name}">${c.items.map(s=>`<option value="${esc(s.name)}">${esc(s.name)}</option>`).join('')}</optgroup>`).join('');sel.onchange=()=>{S.svc=sel.value||null;$('#e0').textContent=''};
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
$$('[data-prev]').forEach(b=>b.onclick=()=>go(step-1));
/* nav */
const nav=$('#nav'),bg=$('#burger'),lk=$('#links');let ly=0,tk=false;addEventListener('scroll',()=>{if(tk)return;tk=true;requestAnimationFrame(()=>{const y=scrollY;nav.classList.toggle('s',y>40);if(y>260&&y>ly+6&&!lk.classList.contains('open')&&!$('#mega').classList.contains('open'))nav.classList.add('nav-hide');else if(y<ly-6||y<=260)nav.classList.remove('nav-hide');if(Math.abs(y-ly)>6)ly=y;tk=false})},{passive:true});nav.addEventListener('focusin',()=>nav.classList.remove('nav-hide'));
bg.onclick=()=>{const o=bg.getAttribute('aria-expanded')!='true';bg.setAttribute('aria-expanded',o);lk.classList.toggle('open',o)};new MutationObserver(()=>document.documentElement.classList.toggle('menu-open',lk.classList.contains('open'))).observe(lk,{attributes:true,attributeFilter:['class']});
$$('a',lk).forEach(a=>a.onclick=()=>{bg.setAttribute('aria-expanded',false);lk.classList.remove('open')});
/* tile reveal (IntersectionObserver, with safety net) */
if(!RM){document.documentElement.classList.add('rv-on');const io=new IntersectionObserver(es=>{let k=0;es.forEach(en=>{if(en.isIntersecting){en.target.style.setProperty('--d',(k++)*90+'ms');en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -4% 0px'});$$('.tile').forEach(x=>io.observe(x));setTimeout(()=>$$('.tile').forEach(x=>x.classList.add('in')),6000)}
/* motion */
if(!RM){
gsap.registerPlugin(ScrollTrigger);
gsap.from('.hero h1 .l>span',{yPercent:110,duration:1.3,stagger:.14,ease:'expo.out',delay:.2});
gsap.from('.hero .eyebrow,.hero .rv',{opacity:0,y:24,duration:1,stagger:.12,delay:.8,ease:'power3.out'});
gsap.from('.plaque',{clipPath:'inset(100% 0 0 0)',duration:1.5,ease:'expo.inOut',delay:.3});
gsap.from('.float',{opacity:0,y:60,duration:1.2,stagger:.15,delay:1,ease:'power3.out'});
$$('.float').forEach(f=>gsap.to(f,{y:()=>+f.dataset.d*-3,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}}));
gsap.to('.plaque',{yPercent:-8,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
$$('.dv path,.dv2').forEach(p=>{const l=p.getTotalLength();gsap.fromTo(p,{strokeDasharray:l,strokeDashoffset:l},{strokeDashoffset:0,duration:1.6,ease:'power2.inOut',scrollTrigger:{trigger:p,start:'top 90%'}})});
$$('.rv:not(.hero .rv),.head h2,.head p').forEach(el=>gsap.fromTo(el,{opacity:0,y:40},{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
const tr=$('#track');const dist=()=>tr.scrollWidth-innerWidth;
gsap.to(tr,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'#gallery',start:'top top',end:()=>'+='+dist(),pin:'.story .pin',scrub:.7,invalidateOnRefresh:true,anticipatePin:1}});
$$('.slide img').forEach(im=>gsap.to(im,{scale:1,ease:'none',scrollTrigger:{trigger:im,containerAnimation:ScrollTrigger.getAll().pop().animation,start:'left 95%',end:'left 35%',scrub:true}}));
gsap.from('.arch .in',{clipPath:'inset(100% 0 0 0)',duration:1.5,ease:'expo.inOut',scrollTrigger:{trigger:'.arch',start:'top 80%'}});gsap.fromTo('.arch img',{yPercent:-6},{yPercent:0,ease:'none',scrollTrigger:{trigger:'.arch',start:'top bottom',end:'bottom top',scrub:true}});
gsap.from('#svc .card',{opacity:0,y:60,rotationX:-12,transformOrigin:'50% 100%',stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'#svc',start:'top 80%'}});
gsap.from('#fbig',{yPercent:60,opacity:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'footer',start:'top 70%'}});
gsap.from('footer .bg path',{strokeDashoffset:2000,strokeDasharray:2000,duration:3,stagger:.3,scrollTrigger:{trigger:'footer',start:'top 80%'}});
/* tilt + magnetic (re-bindable for dynamically rendered views) */
function bindFx(r=document){if(!FINE)return;$$('.tilt',r).forEach(c=>{if(c._fx)return;c._fx=1;c.addEventListener('pointermove',e=>{const q=c.getBoundingClientRect(),x=(e.clientX-q.left)/q.width-.5,y=(e.clientY-q.top)/q.height-.5;gsap.to(c,{rotationY:x*12,rotationX:-y*12,transformPerspective:900,duration:.5,ease:'power2.out'})});c.addEventListener('pointerleave',()=>gsap.to(c,{rotationX:0,rotationY:0,duration:.8,ease:'power3.out'}))});
$$('.mag',r).forEach(b=>{if(b._fx)return;b._fx=1;b.addEventListener('pointermove',e=>{const q=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-q.left-q.width/2)*.3,y:(e.clientY-q.top-q.height/2)*.4,duration:.4,ease:'power3.out'})});b.addEventListener('pointerleave',()=>gsap.to(b,{x:0,y:0,duration:.9,ease:'elastic.out(1,.4)'}))})}
bindFx();window.bindFx=bindFx;
/* plaque follow */
if(FINE)$('#stage').addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;gsap.to('#plaque',{rotationY:x*18,rotationX:-y*14,transformPerspective:1100,duration:.7})});
$('#stage').addEventListener('pointerleave',()=>gsap.to('#plaque',{rotationX:0,rotationY:0,duration:1}));
/* cursor */
if(FINE){const c=$('#cur');let tx=0,ty=0,x=0,y=0,run=false;const l=()=>{x+=(tx-x)*.2;y+=(ty-y)*.2;c.style.transform=`translate(${x}px,${y}px)`;if(Math.abs(tx-x)+Math.abs(ty-y)>.3)requestAnimationFrame(l);else run=false};addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;c.classList.add('on');if(!run){run=true;requestAnimationFrame(l)}},{passive:true});document.addEventListener('pointerover',e=>c.classList.toggle('h',!!e.target.closest('a,button,.tile')))}
}

const fx=r=>window.bindFx&&window.bindFx(r);
/* ===== services: mega menu, mobile accordion, routes ===== */
const mega=$('#mega'),macc=$('#macc'),sbtn=$('#svcbtn'),isMob=()=>matchMedia('(max-width:860px)').matches;let mcat=0;
mega.innerHTML=`<div class="mg"><div class="mgl" role="tablist" aria-orientation="vertical" aria-label="Service categories"><div class="eyebrow">Service Menu</div>${CATS.map(c=>`<button type="button" role="tab" id="mt${c.i}" aria-selected="false" aria-controls="mp" tabindex="-1" data-c="${c.i}"><span>${c.name}</span><small>${c.items.length}</small><i aria-hidden="true">\u203A</i></button>`).join('')}<a class="mall" href="#/services">View all services \u2192</a></div><div class="mgr" id="mp" role="tabpanel" aria-live="polite"></div></div>`;
macc.innerHTML='<div class="mi">'+CATS.map(c=>`<div class="ac"><button type="button" id="ab${c.i}" aria-expanded="false" aria-controls="ap${c.i}"><span>${c.name}</span><i aria-hidden="true">+</i></button><div class="apn" id="ap${c.i}" role="region" aria-labelledby="ab${c.i}"><ul>${c.items.map(s=>`<li><a href="#/services/${s.slug}">${esc(s.name)}<span aria-hidden="true">\u2192</span></a></li>`).join('')}</ul></div></div>`).join('')+'<a class="mall" href="#/services">View all services \u2192</a></div>';
function selCat(i,focus){mcat=i;const c=CATS[i];$$('.mgl [role=tab]',mega).forEach(b=>{const on=+b.dataset.c==i;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;if(on&&focus)b.focus()});
$('#mp').setAttribute('aria-labelledby','mt'+i);$('#mp').innerHTML=`<div class="mh"><h3>${c.name}</h3><a href="#/services?c=${c.slug}">View category \u2192</a></div><ul>${c.items.map((s,k)=>`<li style="--i:${k}"><a href="#/services/${s.slug}"><span>${esc(s.name)}</span><em>M ${inr(s.m)} \u00B7 R ${inr(s.r)}</em><b aria-hidden="true">\u2192</b></a></li>`).join('')}</ul>`}
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
function reveal(root){if(RM)return;const key=root===V?'__rvV':'__rvH';window[key]&&window[key].disconnect();const io=window[key]=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{rootMargin:'0px 0px -6% 0px'});$$('.rvx',root).forEach(x=>io.observe(x));setTimeout(()=>$$('.rvx',root).forEach(x=>x.classList.add('in')),4000)}
function pageList(){let f='all',q='';
  V.innerHTML=`<section class="sph"><div class="wrap"><div class="eyebrow">The Menu</div><h1>All <em>Services</em></h1><p>Eight categories and 23 services with the official rates. M and R labels are shown exactly as on the menu.</p></div></section><div class="wrap" style="padding-top:10px;padding-bottom:90px"><div class="tb"><label class="sr" for="sq">Search services</label><input id="sq" type="search" placeholder="Search all 23 services\u2026" autocomplete="off"><div class="chips" id="sch" role="group" aria-label="Filter by category"></div></div><p class="sr" id="scnt" aria-live="polite"></p><div id="sl"></div><p class="note">M and R labels are shown as on the official menu; their meaning is being confirmed by the studio.</p></div>`;
  return{init(c){f=c;const ch=$('#sch');ch.innerHTML=['all',...CATS.map(c=>c.slug)].map(s=>`<button type="button" class="chip" aria-pressed="${s==f}" data-c="${s}">${s=='all'?'All':CATS.find(c=>c.slug==s).name}</button>`).join('');
   const draw=()=>{const n=q.trim().toLowerCase();let tot=0;const h=CATS.filter(c=>f=='all'||c.slug==f).map(c=>{const it=c.items.filter(s=>!n||(s.name+' '+s.about+' '+c.name).toLowerCase().includes(n));tot+=it.length;return it.length?`<section class="sec" id="cat-${c.slug}"><div class="sh"><h2>${c.name}</h2><span>${it.length} ${it.length>1?'services':'service'}</span></div><div class="sg">${it.map((s,i)=>card(s,i)).join('')}</div></section>`:''}).join('');
    $('#sl').innerHTML=h||'<p class="empty">No services match your search.</p>';$('#scnt').textContent=tot+' services shown';fx($('#sl'))};
   ch.onclick=e=>{const b=e.target.closest('.chip');if(!b)return;f=b.dataset.c;$$('.chip',ch).forEach(x=>x.setAttribute('aria-pressed',x==b));draw()};$('#sq').oninput=e=>{q=e.target.value;draw()};draw()}}}
function pageDetail(s){const c=CATS[s.c],flip=s.i%2?' flip':'';
 const rel=[...c.items.filter(x=>x!=s),...SERV.slice(s.i+1),...SERV].filter((x,i,a)=>x!=s&&a.indexOf(x)==i).slice(0,3);
 const rings='<svg viewBox="0 0 400 400" aria-hidden="true">'+[40,80,120,160,195].map(r=>`<circle cx="200" cy="200" r="${r}"/>`).join('')+'</svg>';
 V.innerHTML=`<article class="sd" style="--tint:${c.tint}"><section class="sdh"><div class="sbg" aria-hidden="true">${rings}</div><div class="wrap sdg${flip}"><div class="sdt"><div class="crumb" role="navigation" aria-label="Breadcrumb"><a href="#/services">All Services</a> / <a href="#/services?c=${c.slug}">${c.name}</a></div><div class="eyebrow">${c.name}</div><h1>${esc(s.name)}</h1><p class="lead">${esc(s.about)}</p><div class="pr2"><span>M<b>${inr(s.m)}</b></span><span>R<b>${inr(s.r)}</b></span></div><div class="acts" style="max-width:420px"><button type="button" class="btn mag" data-go="sbk">Book Appointment</button><a class="btn ghost mag" href="#/services">\u2190 All Services</a></div></div><figure class="sdi tilt"><span class="no2">${String(s.i+1).padStart(2,'0')} / 23</span><div class="fr">${pic(s,true,true)}</div>${s.ph?`<figcaption>${s.ex?'Example from the atelier portfolio':'From the atelier portfolio'}</figcaption>`:''}</figure></div></section>
 <section class="sdc"><div class="wrap sdl${flip}"><div class="sdm"><section class="rvx"><h2>What the service <em>involves</em></h2><p>${esc(s.before)}</p></section><section class="rvx"><h2>Suitable looks</h2><p>${esc(s.ideal)}</p></section><section class="rvx"><h2>Key <em>features</em></h2><ul class="kf">${s.hl.map(x=>`<li>${esc(x)}</li>`).join('')}<li>Listed under ${c.name.toLowerCase().replace(/(^|\s)\S/g,m=>m.toUpperCase())}</li></ul></section><section class="rvx" style="border:0"><h2>Care &amp; <em>maintenance</em></h2><p>${s.care?esc(s.care):'Aftercare guidance for this service: PENDING studio confirmation.'}</p></section></div>
 <aside class="pcard rvx tilt"><div class="eyebrow">Official rates</div><div class="prow"><div><span>M</span><b>${inr(s.m)}</b></div><div><span>R</span><b>${inr(s.r)}</b></div></div><p class="small">${s.slug=='extension-removal'?'Shown in the original menu order. ':''}${/per-finger/.test(s.slug)?'Priced per finger. ':''}M and R are shown exactly as on the official menu; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp.</p><button type="button" class="btn mag" data-go="sbk">Book Appointment</button></aside></div></section>
 <section class="sbk" id="sbk"><div class="wrap"><div class="pnl2 rvx"><div><div class="eyebrow">Book on WhatsApp</div><h2>Enquire about <em>${esc(s.name)}</em></h2><p>This opens WhatsApp with a ready message. It is an enquiry only; your slot and final price are confirmed by the studio.</p></div><div class="bf"><fieldset><legend>Price option (optional)</legend><div class="opts"><button type="button" class="opt" aria-pressed="false" data-o="M">M<small>${inr(s.m)}</small></button><button type="button" class="opt" aria-pressed="false" data-o="R">R<small>${inr(s.r)}</small></button></div></fieldset><div class="two"><div><label class="lb2" for="bd">Preferred date (optional)</label><input type="date" id="bd"></div><div><label class="lb2" for="bt">Preferred time (optional)</label><input type="time" id="bt"></div></div><a class="btn mag" id="bwa" target="_blank" rel="noopener">Book on WhatsApp</a></div></div></div></section>
 <section class="rel"><div class="wrap"><h2 class="rvx">Related <em>services</em></h2><div class="sg">${rel.map((x,i)=>card(x,i)).join('')}</div><div class="back2"><a class="btn ghost mag" href="#/services">\u2190 Back to All Services</a></div></div></section></article>`;
 let o='';const up=()=>{$('#bwa').href=waLink(waMsg(s,o,$('#bd').value&&new Date($('#bd').value+'T00:00').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}),$('#bt').value&&new Date('1970-01-01T'+$('#bt').value).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})))};
 $('#bd').min=new Date().toISOString().slice(0,10);$('.bf').addEventListener('click',e=>{const b=e.target.closest('.opt');if(!b)return;o=o==b.dataset.o?'':b.dataset.o;$$('.opt',V).forEach(x=>x.setAttribute('aria-pressed',x.dataset.o==o));up()});$('#bd').oninput=$('#bt').oninput=up;up();
 $$('[data-go]',V).forEach(b=>b.onclick=()=>$('#sbk').scrollIntoView({behavior:RM?'auto':'smooth',block:'center'}));
 meta(s.name+' | Vansshikha Soni Nail Atelier',s.about+' Official rates M '+inr(s.m)+' / R '+inr(s.r)+'.')}
function render(r){if(window.animIO)$$('.gold-text,.sbg svg',V).forEach(x=>{animIO.unobserve(x);x._w=0});closeMega();toggleAcc(false);bg.setAttribute('aria-expanded',false);lk.classList.remove('open');
 if(r.k=='home'){V.hidden=true;V.innerHTML='';HM.hidden=false;meta('Vansshikha Soni \u00B7 Nail Atelier','Vansshikha Soni Nail Atelier: luxury nail art, gel sets, extensions and more.');if(curKey!='home'){window.ScrollTrigger&&setTimeout(()=>ScrollTrigger.refresh(),60);const el=r.id&&document.getElementById(r.id);scrollTo({top:el?el.getBoundingClientRect().top+scrollY-70:0,behavior:'instant'})}}
 else{HM.hidden=true;V.hidden=false;if(r.k=='svcs'){const p=pageList();p.init(CATS.some(c=>c.slug==r.c)?r.c:'all');meta('All Services | Vansshikha Soni Nail Atelier','All 8 categories and 23 nail services with official rates.')}else pageDetail(r.s);fx(V);reveal(V);window.watchAnim&&watchAnim(V);scrollTo({top:0,behavior:'instant'})}
 curKey=r.k;window.igSetup&&setTimeout(igSetup,60)}
function route(){const r=parse();if(first||RM||r.k==curKey&&r.k=='home'){first=false;render(r);return}
 pt.style.transformOrigin='bottom';pt.classList.add('on');setTimeout(()=>{render(r);pt.style.transformOrigin='top';pt.classList.remove('on')},480)}
addEventListener('hashchange',route);route();


/* ===== studio gallery + testimonial carousel (edit these arrays to add or remove photos) ===== */
const STUDIO=[['shelf','Gel polish wall','Shade shelves'],['chart','Colour chart','Gel polish display'],['swatch','Shade swatch board','Nude and rose tones'],['gloss','Gloss top coat','Finishing range'],['matte','Matte top coat','Finishing range'],['bloom','Blooming gel','Colourful Sky']].map(([k,t,c])=>({k,t,c,src:ST[k][0],w:ST[k][1],h:ST[k][2]}));
$('#sgal').innerHTML=STUDIO.map((s,i)=>`<button type="button" class="sit s${i+1} rvx" role="listitem" data-i="${i}" style="transition-delay:${i*90}ms" aria-label="Open photo: ${s.t}"><img src="${s.src}" width="${s.w}" height="${s.h}" alt="${s.t} in the studio" loading="lazy"><span class="gcap"><b>${s.t}</b>${s.c}</span></button>`).join('');
/* testimonials: add items here. name / rating / quote are shown only when provided and approved */
const TESTI=[['t0'],['t1'],['t2'],['t3']].map(([k],i)=>({k,src:TS[k][0],alt:'Moment at the studio '+(i+1),cap:'In the studio',name:'',rating:null,quote:''}));
/* generic full-screen viewer */
const lb2=$('#lb2');let vl=[],vi=0,vf;
function vshow(k,d=0){vi=(k+vl.length)%vl.length;const it=vl[vi],im=$('#l2i');im.src=it.src;im.alt=it.alt;$('#l2t').textContent=it.t||'';$('#l2c').textContent=(it.c?it.c+' \u00B7 ':'')+(vi+1)+'/'+vl.length;$('#l2p').hidden=$('#l2n').hidden=vl.length<2;if(!RM&&window.gsap)gsap.fromTo(im,{x:d*60,rotationY:d*-14,opacity:0},{x:0,rotationY:0,opacity:1,duration:.5,ease:'power3.out'})}
function vopen(list,i){vf=document.activeElement;vl=list;vshow(i);lb2.classList.add('on');document.body.style.overflow='hidden';$('#l2x').focus()}
function vclose(){lb2.classList.remove('on');document.body.style.overflow='';vf&&vf.focus()}
$('#l2x').onclick=vclose;$('#l2p').onclick=()=>vshow(vi-1,-1);$('#l2n').onclick=()=>vshow(vi+1,1);lb2.onclick=e=>{if(e.target===lb2)vclose()};
addEventListener('keydown',e=>{if(!lb2.classList.contains('on'))return;if(e.key=='Escape')vclose();if(e.key=='ArrowLeft')vshow(vi-1,-1);if(e.key=='ArrowRight')vshow(vi+1,1);if(e.key=='Tab'){const f=$$('button:not([hidden])',lb2),a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement==a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement==z){e.preventDefault();a.focus()}}});
let vx=0;lb2.addEventListener('touchstart',e=>vx=e.touches[0].clientX,{passive:true});lb2.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-vx;if(Math.abs(d)>50)vshow(vi+(d<0?1:-1),d<0?1:-1)});
const stList=STUDIO.map(s=>({src:s.src,alt:s.t+' in the studio',t:s.t,c:s.c}));
$('#sgal').onclick=e=>{const b=e.target.closest('.sit');b&&vopen(stList,+b.dataset.i)};
if(FINE&&!RM){const g=$('#sgal');g.addEventListener('pointermove',e=>{const r=g.getBoundingClientRect();g.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*2);g.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*2)});g.addEventListener('pointerleave',()=>{g.style.setProperty('--mx',0);g.style.setProperty('--my',0)})}
/* 3D carousel */
const cst=$('#cstage'),car=$('#car'),N=TESTI.length;let ci=0,moved=false;
cst.innerHTML=TESTI.map((s,i)=>`<div class="cc" data-i="${i}"><div class="tin tilt"><img src="${s.src}" alt="${esc(s.alt)}" loading="lazy" width="1240" height="1646"></div></div>`).join('');
$('#cdots').innerHTML=TESTI.map((s,i)=>`<button type="button" aria-label="Show testimonial ${i+1} of ${N}" data-i="${i}"></button>`).join('');
function cset(k){ci=(k+N)%N;$$('.cc',cst).forEach((c,i)=>{let o=i-ci;if(o>N/2)o-=N;if(o<-N/2)o+=N;c.style.setProperty('--o',o);c.style.setProperty('--ab',Math.abs(o));c.classList.toggle('act',o==0);c.classList.toggle('far',Math.abs(o)>2);c.setAttribute('aria-hidden',o!=0)});
 $$('#cdots button').forEach((b,i)=>b.setAttribute('aria-current',i==ci));const s=TESTI[ci];$('#ccap').innerHTML=(s.quote?'\u201C'+esc(s.quote)+'\u201D':esc(s.cap))+((s.name||s.rating)?`<small>${s.name?esc(s.name):''}${s.rating?' \u00B7 '+'\u2605'.repeat(s.rating):''}</small>`:'')}
$('#cprev').onclick=()=>cset(ci-1);$('#cnext').onclick=()=>cset(ci+1);$('#cdots').onclick=e=>{const b=e.target.closest('button');b&&cset(+b.dataset.i)};
car.addEventListener('keydown',e=>{if(e.key=='ArrowLeft'){e.preventDefault();cset(ci-1)}if(e.key=='ArrowRight'){e.preventDefault();cset(ci+1)}if(e.key=='Enter'||e.key==' '){e.preventDefault();vopen(TESTI.map(s=>({src:s.src,alt:s.alt,t:s.name||'',c:s.cap})),ci)}});
let px=0,pd=false;car.addEventListener('pointerdown',e=>{px=e.clientX;pd=true;moved=false});addEventListener('pointerup',e=>{if(!pd)return;pd=false;const d=e.clientX-px;if(Math.abs(d)>45){moved=true;cset(ci+(d<0?1:-1))}});
cst.addEventListener('click',e=>{if(moved){moved=false;return}const c=e.target.closest('.cc');if(!c)return;const i=+c.dataset.i;if(i==ci)vopen(TESTI.map(s=>({src:s.src,alt:s.alt,t:s.name||'',c:s.cap})),ci);else cset(i)});
cset(0);fx($('#testimonials'));if(!RM){reveal(HM)}


/* ===== cinematic opening intro: 2000 ms, plays on every full page load ===== */
const root0=document.documentElement,INTRO=$('#intro');let introActive=false,curTl=null,introRaf=0;
function heroIn(){if(!window.gsap)return;gsap.from('.hero h1 .l>span',{yPercent:110,duration:1.3,stagger:.14,ease:'expo.out'});gsap.from('.hero .eyebrow,.hero .rv',{opacity:0,y:24,duration:1,stagger:.12,delay:.25,ease:'power3.out'});gsap.from('.plaque',{clipPath:'inset(100% 0 0 0)',duration:1.5,ease:'expo.inOut'});gsap.from('.float',{opacity:0,y:60,duration:1.2,stagger:.15,delay:.4,ease:'power3.out'})}
function introCleanup(){clearTimeout(window.__vsT);if(curTl){curTl.kill();curTl=null}root0.classList.remove('intro-on');document.body.style.overflow='';INTRO.style.clipPath='';cancelAnimationFrame(introRaf);INTRO.style.opacity='';INTRO.innerHTML='';introActive=false;if(window.gsap)gsap.set('.hero',{clearProps:'transform'});window.ScrollTrigger&&setTimeout(()=>ScrollTrigger.refresh(),50)}
/* back/forward cache restores must never leave a frozen overlay */
addEventListener('pageshow',e=>{if(e.persisted)introCleanup()});
addEventListener('pagehide',()=>{if(introActive)introCleanup()});
function playIntro(){
 if(introActive)return;if(!window.gsap){introCleanup();return}
 introActive=true;clearTimeout(window.__vsT);root0.classList.add('intro-on');
 window.__vsT=setTimeout(introCleanup,6500);/* hard cap: never block the site */
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const W=innerWidth,H=innerHeight,small=Math.min(W,H),port=H>W;
 const logo=`<div class="i-logo"><img src="${IMG.circle}" alt="Vansshikha Soni Nail Atelier"></div><div class="i-tag">WHERE BEAUTY BECOMES ART</div>`;
 const skipHtml='<button type="button" class="i-skip" id="iskip">Skip intro</button>';
 let done=false;
 const finish=()=>{if(done)return;done=true;document.removeEventListener('keydown',kd,true);introCleanup()};
 const skip=()=>{if(done)return;heroIn();cancelAnimationFrame(introRaf);curTl&&curTl.kill();gsap.to(INTRO,{opacity:0,duration:.25,onComplete:finish})};
 const kd=e=>{if(e.key=='Tab'){e.preventDefault();const s=INTRO.querySelector('#iskip');s&&s.focus()}if(e.key=='Escape')skip()};
 document.addEventListener('keydown',kd,true);
 /* wall-clock driver: first painted frame = t0, finishes at exactly dur, even if frames are dropped */
 const drive=(tl,dur)=>{tl.pause();let t0=null;const step=()=>{if(done)return;const now=performance.now();if(t0===null)t0=now;const s=(now-t0)/1000;tl.time(Math.min(s,dur),false);if(s>=dur)finish();else introRaf=requestAnimationFrame(step)};introRaf=requestAnimationFrame(step)};
 if(reduced){/* short accessible transition: soft fade, no motion */
  INTRO.innerHTML=logo+skipHtml;const q=s=>INTRO.querySelector(s);q('#iskip').onclick=skip;
  curTl=gsap.timeline({onComplete:finish});curTl.fromTo('.i-logo,.i-tag',{opacity:0},{opacity:1,duration:.25,ease:'none'},0).call(heroIn,null,.35).to(INTRO,{opacity:0,duration:.25,ease:'none'},.35);drive(curTl,.6);return}
/* geometry */
 const L=Math.min(W*.52,300,H*.44),low=small<520||(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=2,amp=H*.07;
 const gold='<stop offset="0" stop-color="#8c6a30"/><stop offset=".28" stop-color="#f6e7bd"/><stop offset=".55" stop-color="#D7B77A"/><stop offset=".8" stop-color="#fff3cf"/><stop offset="1" stop-color="#7a5a22"/>';
 const wave=(c1,c2)=>`<svg viewBox="0 0 1600 400" preserveAspectRatio="none" aria-hidden="true"><path d="M0,230C200,120 420,330 640,220S1040,110 1260,220S1520,300 1600,200L1600,400L0,400Z" fill="url(#${c1})"/><path d="M0,230C200,120 420,330 640,220S1040,110 1260,220S1520,300 1600,200" fill="none" stroke="${c2}" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg>`;
 const nailSvg=(g,s)=>`<svg viewBox="0 0 120 230" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">${s}</linearGradient></defs><path d="M60 4C92 4 112 70 112 140C112 196 92 226 60 226C28 226 8 196 8 140C8 70 28 4 60 4Z" fill="url(#${g})" stroke="#D7B77A" stroke-width="2.5"/><path d="M33 62C40 36 50 22 58 18C50 40 44 82 42 152C34 130 29 92 33 62Z" fill="url(#nH)"/><ellipse cx="82" cy="170" rx="12" ry="26" fill="rgba(255,255,255,.14)" transform="rotate(-12 82 170)"/></svg>`;
 const tints=[['<stop offset="0" stop-color="#f6d6c8"/><stop offset=".55" stop-color="#e2a999"/><stop offset="1" stop-color="#c98577"/>'],['<stop offset="0" stop-color="#fbf0d2"/><stop offset=".5" stop-color="#d7b77a"/><stop offset="1" stop-color="#9a7835"/>'],['<stop offset="0" stop-color="#f4dacd"/><stop offset=".55" stop-color="#e9b9a8"/><stop offset="1" stop-color="#d79a8b"/>']];
 const nw=Math.max(38,Math.min(72,L*.2)),Rx=Math.min(W*.41,L*1.08),Ry=Math.min(H*.4,L*.98);
 const spots=[[-150,-16],[-30,14],[148,-8]].map(([deg,rot],i)=>({x:Math.cos(deg*Math.PI/180)*Rx,y:Math.sin(deg*Math.PI/180)*Ry,rot,w:nw*(i==1?.9:1)}));
 INTRO.innerHTML=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <linearGradient id="wf1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(255,255,255,.55)"/><stop offset=".5" stop-color="rgba(238,200,178,.32)"/><stop offset="1" stop-color="rgba(255,255,255,.5)"/></linearGradient>
 <linearGradient id="wf2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="rgba(231,190,166,.3)"/><stop offset=".5" stop-color="rgba(255,250,240,.5)"/><stop offset="1" stop-color="rgba(231,190,166,.3)"/></linearGradient>
 <linearGradient id="fG" x1="0" y1="0" x2="1" y2="1">${gold}</linearGradient><linearGradient id="fG2" x1="1" y1="0" x2="0" y2="1">${gold}</linearGradient>
 <linearGradient id="nH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
 <clipPath id="iclip"><path id="iclipP" d="M0,0"/></clipPath></defs></svg>
 <div class="i-g2"></div><div class="i-lt"></div>
 <div class="i-wv i-w1">${wave('wf1','rgba(215,183,122,.55)')}</div>${low?'':`<div class="i-wv i-w2">${wave('wf2','rgba(255,255,255,.7)')}</div>`}<div class="i-wv i-w3">${wave('wf1','rgba(215,183,122,.4)')}</div>
 <div class="i-glow"></div><div class="i-lsh"></div>
 ${low?'':`<div class="i-arcs"><div class="sp"><svg viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke-linecap="round"><path d="M12 100A88 88 0 0 1 150 28" stroke="url(#fG)" stroke-width="1.4"/><path d="M188 100A88 88 0 0 1 50 172" stroke="url(#fG2)" stroke-width="1.4"/><path d="M30 60A80 80 0 0 0 40 150" stroke="url(#fG)" stroke-width=".8" opacity=".7"/><path d="M170 140A80 80 0 0 0 160 50" stroke="url(#fG2)" stroke-width=".8" opacity=".7"/></svg></div></div>`}
 <div class="i-frame"><svg viewBox="-10 -10 220 220" aria-hidden="true" fill="none"><circle class="rf1" cx="100" cy="100" r="97" pathLength="1" stroke="url(#fG)" stroke-width="2.6" stroke-linecap="round" stroke-dasharray="1" stroke-dashoffset="1" transform="rotate(-90 100 100)"/><circle class="rf2" cx="100" cy="100" r="104" pathLength="1" stroke="url(#fG2)" stroke-width=".9" stroke-dasharray="1" stroke-dashoffset="1" opacity=".85" transform="rotate(-90 100 100)"/><circle class="rf3" cx="100" cy="100" r="90.5" stroke="rgba(215,183,122,.35)" stroke-width=".7"/><circle class="rhl" cx="100" cy="100" r="97" pathLength="1" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-dasharray=".06 .94" opacity=".9"/></svg></div>
 ${spots.map((s,i)=>`<div class="i-nl" style="width:${s.w}px">${nailSvg('nT'+i,tints[i][0])}</div>`).join('')}
 ${logo}${skipHtml}`;
 const q=s=>INTRO.querySelector(s),qa=s=>[...INTRO.querySelectorAll(s)],skipBtn=q('#iskip');skipBtn.onclick=skip;skipBtn.focus({preventScroll:true});
 const lg=q('.i-logo'),tg=q('.i-tag'),glow=q('.i-glow'),lsh=q('.i-lsh'),fr=q('.i-frame'),arcs=q('.i-arcs'),g2=q('.i-g2'),lt=q('.i-lt'),clipP=q('#iclipP'),waves=qa('.i-wv'),nails=qa('.i-nl'),rf1=q('.rf1'),rf2=q('.rf2'),rhl=q('.rhl');
 gsap.set([lg,fr],{transformPerspective:1000});gsap.set(nails,{xPercent:-50,yPercent:-50,transformPerspective:700});nails.forEach((n,i)=>gsap.set(n,{x:spots[i].x,y:spots[i].y,rotationZ:spots[i].rot}));
 if(arcs)gsap.set(arcs,{transformPerspective:900,rotationX:66});
 const S={Y:H+amp*1.4,ph:0};
 const wv=()=>{const n=24;let s=`M0,0L${W},0`;for(let i=n;i>=0;i--){const x=W*i/n;s+=`L${x},${S.Y+amp*Math.sin(x/W*Math.PI*2.6+S.ph)}`}clipP.setAttribute('d',s+'Z')};
 /* single timeline, exactly 4.0 s: 0-1 silk waves | 1-2 metallic frame + 3D shapes | 2-3.2 logo reveal | 3.2-4 hold, curtain to homepage */
 curTl=gsap.timeline({defaults:{ease:'none'},onComplete:finish});const tl=curTl;
 tl.fromTo(g2,{opacity:0},{opacity:1,duration:1,ease:'sine.inOut'},0)
  .fromTo(lt,{x:'-25%',y:'-10%'},{x:'25%',y:'10%',duration:4,ease:'sine.inOut'},0)
  .fromTo(waves,{opacity:0,yPercent:14},{opacity:1,yPercent:0,duration:1,stagger:.14,ease:'power2.out'},0);
 waves.forEach((w,i)=>tl.to(w,{xPercent:i%2?9:-9,duration:4,ease:'sine.inOut'},0));
 tl.fromTo(fr,{opacity:0,scale:.78,rotationX:55,rotationY:-25},{opacity:1,scale:1,rotationX:0,rotationY:0,duration:1,ease:'power3.out'},1)
  .to(rf1,{attr:{'stroke-dashoffset':0},duration:.9,ease:'power2.inOut'},1)
  .to(rf2,{attr:{'stroke-dashoffset':0},duration:.9,ease:'power2.inOut'},1.15)
  .to(rhl,{rotation:360,svgOrigin:'100 100',duration:2.4,ease:'none'},1)
  .fromTo(glow,{opacity:0},{opacity:1,duration:.9,ease:'power2.out'},1.5)
  .fromTo(lsh,{opacity:0},{opacity:1,duration:.7},1.5);
 if(arcs){const sp=arcs.querySelector('.sp');tl.fromTo(arcs,{opacity:0,scale:.8},{opacity:1,scale:1,duration:1,ease:'power2.out'},1).to(sp,{rotation:140,duration:2.8,ease:'sine.inOut'},1)}
 tl.fromTo(nails,{opacity:0,scale:.5,rotationY:-60},{opacity:1,scale:1,rotationY:0,duration:.8,stagger:.15,ease:'power3.out'},1.1)
  .to(nails,{y:'-=9',rotationZ:'+=5',duration:.9,ease:'sine.inOut',yoyo:true,repeat:1,stagger:.1},1.9)
  .fromTo(lg,{opacity:0,scale:.86,rotationX:14,y:14},{opacity:1,scale:1,rotationX:0,y:0,duration:.9,ease:'power3.out'},2)
  .fromTo(lg,{'--sx':'-120%'},{'--sx':'120%',duration:.7,ease:'power2.inOut'},2.35)
  .to(lg,{scale:1.03,duration:1.1,ease:'none'},2.9)
  .fromTo(tg,{opacity:0,letterSpacing:'.6em',y:8},{opacity:1,letterSpacing:'.32em',y:0,duration:.6,ease:'power2.out'},2.6)
  .call(()=>{INTRO.style.clipPath='url(#iclip)';wv();heroIn()},null,3.35)
  .to(S,{Y:-amp*1.4,ph:4,duration:.65,ease:'power2.inOut',onUpdate:wv},3.35)
  .to([lg,tg,fr,glow,lsh,arcs,...nails].filter(Boolean),{opacity:0,duration:.35,ease:'power1.in'},3.55)
  .fromTo('.hero',{scale:1.08},{scale:1,duration:.65,ease:'power2.out',immediateRender:false},3.35);
 drive(tl,4);
}
window.playIntro=playIntro;
$('#replay').onclick=()=>{scrollTo({top:0,behavior:'instant'});playIntro()};
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
addEventListener('load',()=>{window.ScrollTrigger&&ScrollTrigger.refresh()});
/* three.js hero: lazy, skipped on reduced motion / tiny screens */
(function(){const lowEnd=(navigator.hardwareConcurrency||8)<=2||(navigator.deviceMemory||8)<=1||(navigator.connection&&navigator.connection.saveData);if(RM||!window.THREE||lowEnd)return;const cv=$('#gl');const mobile=innerWidth<700;let R;try{R=new THREE.WebGLRenderer({canvas:cv,alpha:true,antialias:!mobile})}catch(e){return}
R.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:2));const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100);cam.position.z=9;
sc.add(new THREE.AmbientLight(0xffe9c4,.5));const k=new THREE.PointLight(0xffe0a0,2.4,40);k.position.set(5,6,8);sc.add(k);const k2=new THREE.PointLight(0xc4506e,1.4,30);k2.position.set(-7,-3,5);sc.add(k2);
const mat=new THREE.MeshStandardMaterial({color:0xD7B77A,metalness:.85,roughness:.28,emissive:0x2a1c08});const geo=new THREE.SphereGeometry(.5,24,16);
const N=mobile?14:30,ms=[];for(let i=0;i<N;i++){const m=new THREE.Mesh(geo,mat);m.scale.set(.22+Math.random()*.18,.6+Math.random()*.5,.07);m.position.set((Math.random()-.5)*20,(Math.random()-.5)*11,-3+Math.random()*6);m.rotation.set(Math.random()*6,Math.random()*6,Math.random()*6);m.userData={s:.1+Math.random()*.25,o:Math.random()*6};sc.add(m);ms.push(m)}
const pg=new THREE.BufferGeometry(),pn=mobile?120:300,pa=new Float32Array(pn*3);for(let i=0;i<pn*3;i++)pa[i]=(Math.random()-.5)*(i%3==2?10:24);pg.setAttribute('position',new THREE.BufferAttribute(pa,3));const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0xf0d9a2,size:.035,transparent:true,opacity:.7}));sc.add(pts);
function rs(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}rs();addEventListener('resize',rs);
let mx=0,my=0,vis=true;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5});new IntersectionObserver(e=>vis=e[0].isIntersecting).observe($('.hero'));
const t0=performance.now();let fk=0;(function f(){requestAnimationFrame(f);if(!vis||document.hidden||root0.classList.contains('intro-on')||(mobile&&(fk++&1)))return;const t=(performance.now()-t0)/1000;ms.forEach(m=>{m.rotation.x+=m.userData.s*.01;m.rotation.y+=m.userData.s*.012;m.position.y+=Math.sin(t*m.userData.s+m.userData.o)*.003});pts.rotation.y=t*.02;cam.position.x+=(mx*1.4-cam.position.x)*.03;cam.position.y+=(-my*.9-cam.position.y)*.03;cam.lookAt(0,0,0);R.render(sc,cam)})()})();
