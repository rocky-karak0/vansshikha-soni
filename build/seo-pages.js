/* SEO landing pages for the prerendered site (build.js).
   Every statement is derived from the official menu data in js/service-data.js or from copy already
   published on the site (services, FAQ, nail care guide, why-us, story). Nothing is invented: no new
   prices, no qualifications, no treatment results and no medical claims. */

const GUIDE_PAGES = [
  {
    path: '/gel-nails', page: 'gel-nails', crumb: 'Gel Nails',
    title: 'Gel Nails: Guide, Services &amp; Prices | Vansshikha Soni Nail Atelier',
    desc: 'Gel nails at Vansshikha Soni Nail Atelier — cat-eye, marble, glitter, ombré and chrome gel sets, overlays, extensions and refills with official rates. Gel typically lasts 2–3 weeks.',
    ogTitle: 'Gel Nails | Vansshikha Soni Nail Atelier',
    eyebrow: 'Gel Nails', h1: 'Gel <em>Nails</em>',
    lead: 'Magnetic cat-eye, marble, glitter, ombré and chrome — plus gel overlays, extensions and refills, each with the official rate shown.',
    paras: [
      'Gel is the backbone of the menu: five advance gel sets that add an effect to the colour — magnetic cat-eye, marble swirls, glitter, blended ombré and reflective chrome — plus gel over your natural nails, gel extensions and the refills that keep a set looking fresh.',
      'A professionally applied gel manicure typically lasts <strong>2–3 weeks</strong> without chipping, and gel extensions or overlays may need a refill every <strong>2–4 weeks</strong> depending on growth and aftercare. Book a refill before lifting starts.',
      'Never peel gel polish at home — removal methods vary by formula, so gel removal is done professionally at the studio. Bring a reference photo when you book so the shade and effect can be planned before you sit down.'
    ],
    cardsTitle: 'Gel nails, <em>at a glance</em>', cardsEyebrow: 'Good to know',
    cards: [
      { h: 'How long does gel last?', p: 'A professional gel manicure typically lasts <strong>2–3 weeks</strong> without chipping. Gel extensions and overlays may need a refill every <strong>2–4 weeks</strong> depending on nail growth and aftercare.' },
      { h: 'Gel vs acrylic vs soft gel', p: '<strong>Gel extensions</strong> use a gel-based builder for a glossy, flexible finish. <strong>Acrylic</strong> offers strong structure with a classic sculpted look. <strong>Soft gel</strong> is lighter and soak-off friendly. Not sure which suits you? Message us on WhatsApp.' },
      { h: 'Making a gel set last', p: 'Apply cuticle oil daily, wear gloves for cleaning, avoid using nails as tools and never peel product off at home. These simple habits can add 7–10 extra days of wear to any gel set.' },
      { h: 'Safe removal', p: 'Never bite, peel or forcibly remove gel — this damages the natural nail plate. Professional gel polish removal uses the method appropriate to the formula applied.' }
    ],
    svcTitle: 'Gel services & official rates',
    svcSlugs: ['cat-eye-gel-set', 'marble-gel-set', 'glitter-gel-set', 'ombre-gel-art', 'chrome-gel-set', 'gel-overlay', 'gel-extension', 'gel-refill', 'gel-polish-removal'],
    faqs: [
      { q: 'How long does a gel manicure last?', a: 'A professional gel manicure typically lasts 2–3 weeks. With proper aftercare — cuticle oil daily, gloves for chores, no peeling — many clients get even longer wear. Book a gel refill before lifting starts to extend the life of your set.' },
      { q: 'How much do gel nails cost?', a: 'Advance gel sets are M ₹400–₹500 / R ₹500–₹600 on the official menu, gel overlay is M ₹700 / R ₹800 and gel extension is M ₹900 / R ₹1,000. Final pricing is confirmed on WhatsApp before your appointment.' },
      { q: 'Can I choose the gel shade and effect?', a: 'Yes — colour combinations, glitter intensity, marble pattern and chrome direction are selected during consultation. Send a reference photo on WhatsApp before your visit so we can prepare.' },
      { q: 'How do I book gel nails?', a: 'Use the booking form to pick the service, preferred date and time, then send the request on WhatsApp. Vansshikha personally confirms availability — nothing is booked until you receive a confirmation reply.' }
    ],
    relTitle: 'More <em>guides</em>',
    rel: [{ h: '/nail-prices', t: 'Price List' }, { h: '/acrylic-nails', t: 'Acrylic Nails' }, { h: '/nail-extensions', t: 'Nail Extensions' }, { h: '/nail-guide', t: 'Nail Care Guide' }, { h: '/gallery', t: 'Portfolio' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/acrylic-nails', page: 'acrylic-nails', crumb: 'Acrylic Nails',
    title: 'Acrylic Nails: Extensions, Overlays &amp; Refills | Vansshikha Soni Nail Atelier',
    desc: 'Acrylic nails at Vansshikha Soni Nail Atelier — acrylic extensions, overlays, refills and professional removal with official menu rates from ₹900.',
    ogTitle: 'Acrylic Nails | Vansshikha Soni Nail Atelier',
    eyebrow: 'Acrylic Nails', h1: 'Acrylic <em>Nails</em>',
    lead: 'Sculpted length and structure — acrylic extensions, overlays, refills and safe removal, with the official rate on every service.',
    paras: [
      'Acrylic is the structured side of the menu: an acrylic system built over the natural nail to add length and shape, an acrylic coating that keeps your own length with a reinforced surface, and the refills that maintain a set as it grows.',
      'Maintenance matters. Refills address new nail growth and rebalance the set, and damaged or lifting enhancements may need repair or removal instead. Book before lifting starts — sets are usually refilled every 2–4 weeks.',
      'Removal is professional, never forced: different systems need different methods, and peeling or biting product off damages the nail plate. Tell us which system you currently wear when you book so the right method is prepared.'
    ],
    cardsTitle: 'The acrylic <em>menu</em>', cardsEyebrow: 'What is included',
    cards: [
      { h: 'Acrylic extension', p: 'Additional length and structure, customisable in length and shape. Maintenance and safe removal are important — please do not peel extensions off at home.' },
      { h: 'Acrylic overlay', p: 'An acrylic coating over the natural nails without necessarily adding extension length — a structured surface while keeping the existing nail length.' },
      { h: 'When to book a refill', p: 'Book a refill <strong>before lifting starts</strong>, as the set grows out. Suitability depends on lifting, condition and the existing enhancement system — send a photo on WhatsApp if your set is already lifting.' },
      { h: 'Safe removal', p: 'Never bite, peel or forcibly remove extensions. Professional removal uses the technique suited to the extension material, so the natural nail plate stays protected.' }
    ],
    svcTitle: 'Acrylic services & official rates',
    svcSlugs: ['acrylic-extension', 'acrylic-overlay', 'acrylic-refill', 'extension-removal'],
    faqs: [
      { q: 'How much do acrylic nails cost?', a: 'Acrylic extension is M ₹1,100 / R ₹1,200, acrylic overlay is M ₹900 / R ₹1,000 and acrylic refill is M ₹900 / R ₹1,050 on the official menu. Final pricing is confirmed on WhatsApp before your appointment.' },
      { q: 'How long do acrylic nails last before a refill?', a: 'Extensions and overlays are usually refilled every 2–4 weeks depending on nail growth and aftercare. Book before lifting starts to keep the set looking its best.' },
      { q: 'Can I remove acrylic nails at home?', a: 'Please do not peel, bite or forcibly remove acrylic — this damages the natural nail plate. Professional extension removal uses a technique suited to the extension material and starts from the official menu rate.' },
      { q: 'Acrylic or gel — which should I choose?', a: 'Acrylic offers strong structure with a classic sculpted look; gel extensions use a gel-based builder for a glossy, flexible finish; soft gel is lighter and soak-off friendly. Message us on WhatsApp and we will recommend the best system for your natural nail condition.' }
    ],
    relTitle: 'Related <em>pages</em>',
    rel: [{ h: '/nail-prices', t: 'Price List' }, { h: '/gel-nails', t: 'Gel Nails' }, { h: '/services/category/refills', t: 'Refills' }, { h: '/nail-guide', t: 'Nail Care Guide' }, { h: '/gallery', t: 'Portfolio' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/nail-extensions', page: 'nail-extensions', crumb: 'Nail Extensions',
    title: 'Nail Extensions: Gel, Acrylic &amp; Soft Gel | Vansshikha Soni Nail Atelier',
    desc: 'Five nail extension systems at Vansshikha Soni Nail Atelier — gel, acrylic, temporary, soft gel and gum gel — with official rates, refill timing and safe removal.',
    ogTitle: 'Nail Extensions | Vansshikha Soni Nail Atelier',
    eyebrow: 'Nail Extensions', h1: 'Nail <em>Extensions</em>',
    lead: 'Length and structure — gel, acrylic, temporary, soft gel and gum gel extensions, each with the official rate shown.',
    paras: [
      'Length, shape, structure and suitability are assessed by the nail technician first, so the result fits your natural nail condition as well as your style. Every set needs refills every 2–4 weeks plus professional removal at the end.',
      'Temporary extensions suit occasions or clients who want a less permanent look, while gum gel is sculpted with a mouldable builder-style gel for a custom-shaped, structured finish. Exact materials and wear time are confirmed by the studio.',
      'Bring a reference photo or describe the length and shape you have in mind. Final pricing is confirmed on WhatsApp, and nothing is booked until you receive a confirmation reply.'
    ],
    cardsTitle: 'Five ways to add <em>length</em>', cardsEyebrow: 'Extension types',
    cards: [
      { h: 'Gel extension', p: 'M <strong>₹900</strong> / R <strong>₹1,000</strong> — added length with a shaped, finished look, built with an extension system and gel-based product.' },
      { h: 'Acrylic extension', p: 'M <strong>₹1,100</strong> / R <strong>₹1,200</strong> — additional length and structure with customisable length and shape. Maintenance and safe removal are important.' },
      { h: 'Temporary extension', p: 'M <strong>₹700</strong> / R <strong>₹800</strong> — a shorter-term nail-length option for occasions or clients seeking a less permanent look.' },
      { h: 'Soft gel extension', p: 'M <strong>₹800</strong> / R <strong>₹900</strong> — a smooth, shaped extension look using soft-gel tips or a related soft-gel system, in various lengths and styles.' },
      { h: 'Gum gel extension', p: 'M <strong>₹1,500</strong> / R <strong>₹1,700</strong> — sculpted with a mouldable builder-style gel for custom-shaped extensions with a structured finish.' },
      { h: 'Refills & removal', p: 'Extensions are usually refilled every <strong>2–4 weeks</strong>. Professional removal uses the method suited to the material — never peel or bite product off at home.' }
    ],
    svcTitle: 'Extension services & official rates',
    svcSlugs: ['gel-extension', 'acrylic-extension', 'temporary-extension', 'soft-gel-extension', 'gum-gel-extension', 'extension-removal'],
    faqs: [
      { q: 'Which extension system is best for me?', a: 'Length, shape, structure and suitability are assessed by the nail technician first. Gel, acrylic, soft gel and gum gel each suit different preferences — message us on WhatsApp with your current nail condition and the look you want, and we will guide you.' },
      { q: 'How much do nail extensions cost?', a: 'Gel extension is M ₹900 / R ₹1,000, acrylic M ₹1,100 / R ₹1,200, temporary M ₹700 / R ₹800, soft gel M ₹800 / R ₹900 and gum gel M ₹1,500 / R ₹1,700 on the official menu. Final pricing is confirmed on WhatsApp.' },
      { q: 'How long do extensions last before a refill?', a: 'Gel extensions and overlays may need a refill every 2–4 weeks depending on nail growth and aftercare. Book a refill before lifting starts to keep the set looking its best.' },
      { q: 'How are extensions removed?', a: 'Professionally, using the technique suited to the extension material — never forced peeling. Never bite, peel or forcibly remove extensions at home; this damages the natural nail plate.' }
    ],
    relTitle: 'Plan <em>your set</em>',
    rel: [{ h: '/nail-prices', t: 'Price List' }, { h: '/services/category/nail-extension', t: 'Extension Category' }, { h: '/gel-nails', t: 'Gel Nails' }, { h: '/services/category/refills', t: 'Refills' }, { h: '/nail-guide', t: 'Nail Care Guide' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/manicure', page: 'manicure', crumb: 'Manicure',
    title: 'Manicure Services &amp; Prices | Vansshikha Soni Nail Atelier',
    desc: 'Manicure at Vansshikha Soni Nail Atelier — classic and French application, mini manicures from ₹50, gel colour sets and per-finger nail art with official rates.',
    ogTitle: 'Manicure Services | Vansshikha Soni Nail Atelier',
    eyebrow: 'Manicure', h1: 'The <em>Manicure</em> Menu',
    lead: 'Classic colour, timeless French and quick mini manicures — plus gel sets and nail art to finish the look.',
    paras: [
      'The application category holds the two services clients return to most often: a simple polished finish, and the classic French look with a natural-looking base. Tip shape, colour and base shade can be customised after consultation.',
      'Short on time? The mini manicure category covers nail cut + file for a tidy, natural shape and nail cut + polish for trimming with a polished colour finish — a quick refresh without an elaborate nail-art design.',
      'Prefer longer wear? Gel colour sets — cat-eye, marble, glitter, ombré, chrome — sit alongside the classics, and per-finger nail art starts from the official menu rate if you want an accent.'
    ],
    cardsTitle: 'Choose your <em>finish</em>', cardsEyebrow: 'Manicure options',
    cards: [
      { h: 'Classic', p: 'A clean colour application for a polished everyday look — a simple, versatile finish for clients who prefer understated nails. Confirm with the studio whether you would like regular polish or gel.' },
      { h: 'French', p: 'A defined tip over a natural-looking base — elegant and neat for everyday wear and special occasions, with tip shape, colour and base shade customised after consultation.' },
      { h: 'Mini manicure', p: 'Nail cut + file for a tidy, natural-looking shape, or nail cut + polish for trimming with a polished colour finish. A quick refresh without an elaborate nail-art design.' },
      { h: 'Add-ons', p: 'Per-finger nail art starts from the official menu rate, and advance gel sets add an effect — magnetic cat-eye, marble, glitter, blended ombré or reflective chrome.' }
    ],
    svcTitle: 'Manicure services & official rates',
    svcSlugs: ['classic', 'french', 'nail-cut-file', 'nail-cut-polish'],
    faqs: [
      { q: 'How much does a manicure cost?', a: 'Classic is M ₹350 / R ₹400, French is M ₹500 / R ₹600, Nail Cut + File is M ₹50 / R ₹70 and Nail Cut + Polish is M ₹80 / R ₹100 on the official menu. Final pricing is confirmed on WhatsApp before your appointment.' },
      { q: 'Is Classic a regular polish or a gel service?', a: 'Finish and wear depend on the product system used. Please confirm with the studio when you book whether this is regular polish or gel — we will explain the finish, wear and removal before you decide.' },
      { q: 'Can the French tip be customised?', a: 'Yes — tip shape, colour and base shade can be customised after consultation. Bring a reference photo if you have a specific line width or colour in mind.' },
      { q: 'How do I book a manicure?', a: 'Use the booking form to pick the service, preferred date and time, then send the request on WhatsApp. Vansshikha personally confirms availability — nothing is booked until you receive a confirmation reply. Walk-ins are subject to availability.' }
    ],
    relTitle: 'Complete <em>the look</em>',
    rel: [{ h: '/nail-prices', t: 'Price List' }, { h: '/gel-nails', t: 'Gel Nails' }, { h: '/nail-art', t: 'Nail Art' }, { h: '/french-nails', t: 'French Nails' }, { h: '/gallery', t: 'Portfolio' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/nail-art', page: 'nail-art', crumb: 'Nail Art',
    title: 'Nail Art Designs &amp; Prices | Vansshikha Soni Nail Atelier',
    desc: 'Custom nail art at Vansshikha Soni Nail Atelier — fine lines, florals, patterns and 3D accents priced per finger from ₹30, plus advance gel sets. Bring your reference photo.',
    ogTitle: 'Nail Art Designs | Vansshikha Soni Nail Atelier',
    eyebrow: 'Nail Art', h1: 'Custom <em>Nail Art</em>',
    lead: 'Fine lines, florals, patterns and raised 3D detail — priced per finger, planned around your reference.',
    paras: [
      'Nail art here is custom work: decorative detailing applied to an individual nail — fine lines, florals, patterns or accents — so you can add personality without committing to artwork on every nail. Price is listed per finger; complex artwork may require a separate quote.',
      'For raised detail, 3D nail art uses suitable sculpting materials or embellishments for a textured statement on selected accent nails. Confirm embellishment complexity and maintenance before booking so upkeep can be advised.',
      'Bring a reference photo or describe your idea — gold linework, chrome, florals, 3D accents or minimalist designs. Send your inspiration on WhatsApp before your visit so the design can be planned before you sit down.'
    ],
    cardsTitle: 'Ways to wear <em>the art</em>', cardsEyebrow: 'Design options',
    cards: [
      { h: 'Per-finger art', p: 'Decorative detailing on an individual nail — fine lines, florals, patterns or accents — for customisation without artwork on every nail. Priced per finger.' },
      { h: '3D accents', p: 'Raised or dimensional decoration using suitable sculpting materials or embellishments, built on the selected nail or nails. Price is per finger.' },
      { h: 'Advance gel sets', p: 'Effects worked into the colour itself — magnetic cat-eye, marble swirls, glitter, blended ombré and reflective chrome, each individually created at the appointment.' },
      { h: 'Bring your reference', p: 'Send a photo or describe the look on WhatsApp before your visit. Complex artwork may need a separate quote after consultation.' }
    ],
    svcTitle: 'Nail art services & official rates',
    svcSlugs: ['nail-art-per-finger', '3d-nail-art-per-finger', 'cat-eye-gel-set', 'marble-gel-set', 'glitter-gel-set', 'ombre-gel-art', 'chrome-gel-set'],
    faqs: [
      { q: 'Is nail art priced per finger?', a: 'Yes — nail art is priced per finger (M ₹30 / R ₹40 on the official menu) and 3D nail art is M ₹50 / R ₹70 per finger. Complex artwork may require a separate quote after consultation.' },
      { q: 'Can I bring my own design reference?', a: 'Yes. Bring a reference photo or describe your idea — gold linework, chrome, florals, 3D accents or minimalist designs. Send your inspiration on WhatsApp before your visit so we can prepare.' },
      { q: 'How long does nail art last?', a: 'Wear depends on the system used — a professional gel manicure typically lasts 2–3 weeks. Apply cuticle oil daily, wear gloves for cleaning and never peel product off at home to get the most from any set.' },
      { q: 'How do I book a custom design?', a: 'Send your reference on WhatsApp, then use the booking form to pick a service, preferred date and time. Vansshikha personally confirms availability — nothing is booked until you receive a confirmation reply.' }
    ],
    relTitle: 'See the <em>work</em>',
    rel: [{ h: '/gallery', t: 'Portfolio' }, { h: '/nail-prices', t: 'Price List' }, { h: '/services/category/nail-design', t: 'Nail Design Category' }, { h: '/french-nails', t: 'French Nails' }, { h: '/bridal-nails', t: 'Bridal Nails' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/bridal-nails', page: 'bridal-nails', crumb: 'Bridal Nails',
    title: 'Bridal &amp; Wedding Nail Art | Vansshikha Soni Nail Atelier',
    desc: 'Bridal and wedding nails at Vansshikha Soni Nail Atelier — French, ombré, gold and floral designs, planned by consultation with official rates. Book your date on WhatsApp.',
    ogTitle: 'Bridal &amp; Wedding Nail Art | Vansshikha Soni Nail Atelier',
    eyebrow: 'Bridal &amp; Wedding', h1: 'Bridal <em>Nail Art</em>',
    lead: 'For the day itself and every function around it — French, ombré, gold and florals, planned by consultation.',
    paras: [
      'Wedding nails are planned, not rushed. Bring your outfit colours, jewellery or a reference photo to the consultation and the design is shaped around your nail shape, lifestyle and personal aesthetic — from quiet French tips to gold linework and florals.',
      'Timing matters: a gel manicure typically lasts 2–3 weeks and extensions are refilled every 2–4 weeks, so plan your appointment close to the function. Temporary extensions are an option for clients who want a less permanent look for the occasion.',
      'Appointments are requested through the website or WhatsApp and Vansshikha confirms availability personally — message early for wedding dates, and let us know at least 24 hours ahead if you need to reschedule.'
    ],
    cardsTitle: 'Plan <em>the day</em>', cardsEyebrow: 'How it works',
    cards: [
      { h: 'Plan the design early', p: 'Bring outfit colours, jewellery photos or a reference to the consultation so the look can be designed around your aesthetic — from minimal nude French to statement gold.' },
      { h: 'Choose your finish', p: 'Classic or French application, gel colour sets — ombré, chrome, marble, glitter — and per-finger nail art for accents, with the official rate shown on every service.' },
      { h: 'Time your appointment', p: 'Gel typically lasts 2–3 weeks and extensions are refilled every 2–4 weeks, so book close to the function. Temporary extensions suit occasions when you want a less permanent look.' },
      { h: 'Confirm on WhatsApp', p: 'Nothing is booked until Vansshikha replies to confirm your slot and final pricing. Please reschedule at least 24 hours ahead if plans change.' }
    ],
    svcTitle: 'Popular for occasions & official rates',
    svcSlugs: ['french', 'classic', 'ombre-gel-art', 'nail-art-per-finger'],
    faqs: [
      { q: 'How far in advance should I book wedding nails?', a: 'Appointments are requested through the website or WhatsApp and confirmed personally, so message as early as your date is fixed. A gel set typically lasts 2–3 weeks, so plan the appointment close to the function — we will help you pick the right timing.' },
      { q: 'Which designs suit bridal looks?', a: 'French tips, blended ombré, gold linework, florals and soft minimalist sets are all part of the atelier portfolio. Bring your outfit colours or a reference photo and the design is planned around your aesthetic during the consultation.' },
      { q: 'Can you match my outfit or jewellery?', a: 'Yes — bring colours, jewellery photos or a mood board to the consultation. Every look is designed around your nail shape, lifestyle and personal aesthetic, from quiet minimalism to bold statement nails.' },
      { q: 'What does bridal nail art cost?', a: 'Every service shows its official menu rate — per-finger nail art starts from M ₹30 / R ₹40 and French is M ₹500 / R ₹600. Complex artwork may need a separate quote; final pricing is confirmed on WhatsApp.' }
    ],
    relTitle: 'More <em>inspiration</em>',
    rel: [{ h: '/gallery', t: 'Portfolio' }, { h: '/french-nails', t: 'French Nails' }, { h: '/nail-art', t: 'Nail Art' }, { h: '/nail-prices', t: 'Price List' }, { h: '/founder', t: 'Meet the Founder' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/nail-shapes', page: 'nail-shapes', crumb: 'Nail Shapes',
    title: 'Nail Shapes Guide: Square, Almond, Oval &amp; More | Vansshikha Soni Nail Atelier',
    desc: 'A guide to nail shapes — square, squoval, oval, almond, coffin and stiletto — and how to choose one that suits your nails at Vansshikha Soni Nail Atelier.',
    ogTitle: 'Nail Shapes Guide | Vansshikha Soni Nail Atelier',
    eyebrow: 'Nail Shapes', h1: 'Choose Your <em>Nail Shape</em>',
    lead: 'Square, oval, almond, coffin, stiletto — how each shape reads, and how to choose one that suits your nails.',
    paras: [
      'Shape changes the whole feel of a set. Shorter everyday shapes read neat and practical; longer tapered shapes read more dramatic. The right choice depends on your nail bed, how you use your hands and the look you want.',
      'At the atelier, length, shape, structure and suitability are assessed by the nail technician first — for extensions especially — so the result works with your natural nail condition. French tips can be customised by tip shape, colour and base shade.',
      'Whatever the shape, the same aftercare applies: cuticle oil daily, gloves for cleaning, no using nails as tools and professional removal at the end of a set.'
    ],
    cardsTitle: 'Six classic <em>shapes</em>', cardsEyebrow: 'Shape guide',
    cards: [
      { h: 'Square', p: 'A straight, flat tip with parallel sides — a clean, structured look that reads modern and works well on shorter lengths.' },
      { h: 'Squoval', p: 'Square with softened corners — the practical middle ground, neat on short to medium nails.' },
      { h: 'Oval', p: 'A soft, rounded tip that follows the nail — a classic, understated shape for everyday wear.' },
      { h: 'Almond', p: 'Gently tapered sides with a rounded tip — an elegant, elongating shape that suits medium to longer nails.' },
      { h: 'Coffin (ballerina)', p: 'Tapered sides with a flat squared-off tip — a statement shape that shows off colour and nail art.' },
      { h: 'Stiletto', p: 'A sharply pointed tip — the most dramatic shape, best supported by extensions.' }
    ],
    faqs: [
      { q: 'Which nail shape suits short nails?', a: 'Shorter shapes like square, squoval and oval keep a tidy, balanced look on short nails. Your technician assesses your nail bed and condition first and suggests shapes that suit your hands as well as the style you want.' },
      { q: 'Can I change the shape at a refill?', a: 'Ask when you book — refills refresh the set as it grows out, and your technician will confirm what is possible for your nails and the enhancement system you wear. Send a photo on WhatsApp if you are unsure.' },
      { q: 'Do I need extensions for a certain shape?', a: 'Length and shape for extensions are assessed by the nail technician first, so the result fits your natural nail condition. Some dramatic shapes are best supported by an extension system rather than the natural nail alone.' },
      { q: 'How do I book a shape consultation?', a: 'Use the booking form to pick a service, preferred date and time, then send the request on WhatsApp. Bring a reference photo of the shape you like — Vansshikha personally confirms availability before anything is booked.' }
    ],
    relTitle: 'Plan <em>your set</em>',
    rel: [{ h: '/nail-extensions', t: 'Nail Extensions' }, { h: '/manicure', t: 'Manicure' }, { h: '/french-nails', t: 'French Nails' }, { h: '/gallery', t: 'Portfolio' }, { h: '/nail-prices', t: 'Price List' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/french-nails', page: 'french-nails', crumb: 'French Nails',
    title: 'French Manicure: Classic French Nails | Vansshikha Soni Nail Atelier',
    desc: 'French nails at Vansshikha Soni Nail Atelier — a defined tip over a natural-looking base, customisable tip shape, colour and base shade. Official rate M ₹500 / R ₹600.',
    ogTitle: 'French Manicure | Vansshikha Soni Nail Atelier',
    eyebrow: 'French Nails', h1: 'The <em>French</em> Finish',
    lead: 'A timeless defined tip over a natural-looking base — customisable in shape, colour and base shade.',
    paras: [
      'The French finish is a defined tip paired with a natural-looking base — elegant and neat for everyday wear as well as special occasions. It is one of the two services clients return to most often in the application category.',
      'Everything can be adjusted after consultation: tip shape, the colour of the tip and the base shade. Bring a reference photo if you have a specific line width or colour in mind.',
      'Prefer longer wear? Ask whether a gel finish suits you when you book — the studio will confirm the product system, finish and removal before you decide.'
    ],
    cardsTitle: 'Why clients choose <em>French</em>', cardsEyebrow: 'At a glance',
    cards: [
      { h: 'Customisable tip', p: 'Tip shape, colour and base shade can be customised after consultation — from a soft classic line to a bolder contrast.' },
      { h: 'Everyday or occasion', p: 'A neat, understated finish that works for daily wear and dresses up easily for functions and events.' },
      { h: 'Gel or regular', p: 'Finish and wear depend on the product system used — confirm with the studio when you book and we will explain the finish, wear and removal before you decide.' },
      { h: 'Add an accent', p: 'Per-finger nail art starts from the official menu rate if you want a detail on an accent nail alongside the French line.' }
    ],
    svcTitle: 'French & companion services',
    svcSlugs: ['french', 'classic', 'nail-art-per-finger'],
    faqs: [
      { q: 'Can the French tip be customised?', a: 'Yes — tip shape, colour and base shade can be customised after consultation. Bring a reference photo if you have a specific line width or colour in mind.' },
      { q: 'How much does a French manicure cost?', a: 'French is M ₹500 / R ₹600 on the official menu. Final pricing is confirmed on WhatsApp before your appointment.' },
      { q: 'Is French a regular polish or a gel service?', a: 'Finish and wear depend on the product system used. Please confirm with the studio when you book — we will explain the finish, wear and removal before you decide.' },
      { q: 'Can I bring a reference photo?', a: 'Yes — send it on WhatsApp before your visit so the tip shape, line width and base shade can be planned before you sit down.' }
    ],
    relTitle: 'Complete <em>the look</em>',
    rel: [{ h: '/nail-prices', t: 'Price List' }, { h: '/manicure', t: 'Manicure' }, { h: '/nail-art', t: 'Nail Art' }, { h: '/bridal-nails', t: 'Bridal Nails' }, { h: '/gallery', t: 'Portfolio' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/chrome-nails', page: 'chrome-nails', crumb: 'Chrome Nails',
    title: 'Chrome Nails: Mirror-Finish Gel Set | Vansshikha Soni Nail Atelier',
    desc: 'Chrome nails at Vansshikha Soni Nail Atelier — reflective chrome-style pigment over a gel base for a metallic, pearlescent or mirror finish. Official rate M ₹500 / R ₹600.',
    ogTitle: 'Chrome Nails | Vansshikha Soni Nail Atelier',
    eyebrow: 'Chrome Nails', h1: 'Chrome <em>Nails</em>',
    lead: 'Reflective chrome-style pigment over a suitable gel base — metallic, pearlescent or mirror-inspired.',
    paras: [
      'A chrome set is a reflective finish created with chrome-style pigment over a suitable gel base. The result depends on the base colour and chrome pigment selected — the two are chosen together.',
      'Tell us whether you want a mirror, metallic or pearlescent feel and the combination will be guided during consultation. As with every advance gel set, the effect is worked individually at the appointment and may vary between nails.',
      'A gel finish typically lasts 2–3 weeks with proper aftercare — cuticle oil daily, gloves for cleaning and never peeling product off at home.'
    ],
    cardsTitle: 'The chrome <em>finish</em>', cardsEyebrow: 'Good to know',
    cards: [
      { h: 'Choose the direction', p: 'Mirror, metallic or pearlescent — the base colour and chrome pigment are selected together so the finish lands the way you want.' },
      { h: 'How it is made', p: 'Chrome-style pigment is applied over a suitable gel base. The result depends on the base colour and chrome pigment selected.' },
      { h: 'Wear & care', p: 'A gel set typically lasts 2–3 weeks. Apply cuticle oil daily, wear gloves for cleaning and never peel product off at home.' },
      { h: 'Pair it with', p: 'Chrome pairs well with gold linework and per-finger accents — see the portfolio for real atelier work before you book.' }
    ],
    svcTitle: 'Chrome services & official rates',
    svcSlugs: ['chrome-gel-set', 'gel-refill'],
    faqs: [
      { q: 'How is the chrome shade chosen?', a: 'The result depends on the base colour and chrome pigment selected, so the two are chosen together. Tell us whether you want a mirror, metallic or pearlescent feel and we will guide the combination.' },
      { q: 'How much does a chrome gel set cost?', a: 'Chrome Gel Set is M ₹500 / R ₹600 on the official menu. Final pricing is confirmed on WhatsApp before your appointment.' },
      { q: 'How long do chrome nails last?', a: 'A professional gel manicure typically lasts 2–3 weeks. Apply cuticle oil daily, wear gloves for cleaning and never peel product off at home — book a gel refill before lifting starts.' },
      { q: 'How do I book chrome nails?', a: 'Use the booking form to pick the service, preferred date and time, then send the request on WhatsApp. Vansshikha personally confirms availability — nothing is booked until you receive a confirmation reply.' }
    ],
    relTitle: 'More <em>gel looks</em>',
    rel: [{ h: '/gel-nails', t: 'Gel Nails' }, { h: '/nail-art', t: 'Nail Art' }, { h: '/gallery', t: 'Portfolio' }, { h: '/nail-prices', t: 'Price List' }, { h: '/nail-guide', t: 'Nail Care Guide' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/hygiene', page: 'hygiene', crumb: 'Hygiene &amp; Safety',
    title: 'Hygiene &amp; Safety Standards | Vansshikha Soni Nail Atelier',
    desc: 'Hygiene at Vansshikha Soni Nail Atelier — single-use files where needed, hospital-grade sanitisation, carefully prepared tools and professional removal. Nail health comes before any trend.',
    ogTitle: 'Hygiene &amp; Safety | Vansshikha Soni Nail Atelier',
    eyebrow: 'Hygiene &amp; Safety', h1: 'Hygiene <em>First</em>',
    lead: 'Single-use files where needed, hospital-grade sanitisation and carefully prepared tools — nail health comes before any trend.',
    paras: [
      'Hygiene comes first at every appointment: single-use files where needed, hospital-grade sanitisation and carefully prepared tools. Your nail health comes before any trend.',
      'The same standard covers product use and removal — professional removal with the method appropriate to the product, and aftercare guidance for your specific system. Never peel or bite product off at home; forcing product off damages the nail plate.',
      'Length, shape, structure and suitability are assessed before extension work begins, so the set is planned around the condition of your natural nails.'
    ],
    cardsTitle: 'The studio <em>standard</em>', cardsEyebrow: 'What to expect',
    cards: [
      { h: 'Sanitised tools', p: 'Hospital-grade sanitisation and carefully prepared tools, with single-use files where needed, before every appointment.' },
      { h: 'Assessment first', p: 'Length, shape, structure and suitability are assessed by the nail technician, so the service fits your natural nail condition.' },
      { h: 'Professional removal', p: 'Removal uses the method appropriate to the product or material — never forced peeling, biting or scraping at home.' },
      { h: 'Aftercare that lasts', p: 'Cuticle oil daily, gloves for cleaning, no using nails as tools — and a refill before lifting starts if you wear enhancements.' }
    ],
    faqs: [
      { q: 'How are tools prepared for my appointment?', a: 'Hospital-grade sanitisation and carefully prepared tools are part of every appointment, with single-use files where needed. Nail health comes before any trend at the atelier.' },
      { q: 'Is nail extension removal safe for natural nails?', a: 'When done professionally, yes. We use the correct removal method for your system — never forced peeling. Never remove gel or extensions at home by biting or scraping; this damages the nail plate permanently.' },
      { q: 'Can I remove gel polish at home?', a: 'Avoid peeling or scraping gel polish at home — removal methods vary by formula and peeling damages the nail surface. Professional gel polish removal uses a method appropriate to the product applied.' },
      { q: 'How do I make my nail art last longer?', a: 'Apply cuticle oil daily, wear gloves for cleaning, avoid using nails as tools and never peel gel polish at home. These simple habits can add 7–10 extra days of wear to any gel set. Full guidance is in our nail care guide.' }
    ],
    relTitle: 'Read <em>more</em>',
    rel: [{ h: '/nail-guide', t: 'Nail Care Guide' }, { h: '/why-us', t: 'Why Choose Us' }, { h: '/services', t: 'Services' }, { h: '/faq', t: 'FAQ' }, { h: '/studio', t: 'Studio' }, { h: '/booking', t: 'Book' }]
  },
  {
    path: '/terms', page: 'terms', crumb: 'Terms',
    title: 'Terms &amp; Booking Policy | Vansshikha Soni Nail Atelier',
    desc: 'Booking terms for Vansshikha Soni Nail Atelier — appointments are requests confirmed on WhatsApp, pricing is confirmed before your visit, and rescheduling needs 24 hours notice.',
    ogTitle: 'Terms &amp; Booking Policy | Vansshikha Soni Nail Atelier',
    eyebrow: 'Terms', h1: 'Terms &amp; <em>Booking</em>',
    lead: 'How appointments, pricing and rescheduling work at the atelier.',
    paras: [
      'Appointments are requested through the website or WhatsApp. Nothing is booked until Vansshikha personally confirms availability in a reply — walk-ins are subject to availability.',
      'Rates shown on the site are the official menu rates with M and R labels exactly as listed; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp before your appointment.',
      'The full studio address is shared privately on booking confirmation. All photography on this site is the atelier’s own work.'
    ],
    cardsTitle: 'The essentials', cardsEyebrow: 'Policy',
    cards: [
      { h: 'Requests, not instant bookings', p: 'Use the booking form or WhatsApp to request a slot. Vansshikha confirms availability personally — nothing is booked until you receive a confirmation reply.' },
      { h: 'Pricing', p: 'M and R labels are shown exactly as on the official menu. Final pricing is confirmed on WhatsApp before your appointment; complex nail art may need a separate quote.' },
      { h: 'Rescheduling', p: 'Please message on WhatsApp at least 24 hours before your appointment if you need to reschedule. Same-day cancellations may affect future booking priority.' },
      { h: 'Walk-ins & address', p: 'Walk-ins are subject to availability. The studio is based in India and the full address is shared privately on booking confirmation.' }
    ],
    faqs: [
      { q: 'Is my appointment confirmed as soon as I send the form?', a: 'No — the booking form sends a request. Vansshikha personally confirms availability on WhatsApp, and nothing is booked until you receive a confirmation reply.' },
      { q: 'What is the cancellation policy?', a: 'Please message us on WhatsApp at least 24 hours before your appointment if you need to reschedule. Same-day cancellations may affect future booking priority. We understand life happens — just communicate early so we can offer the slot to another client.' },
      { q: 'Are the prices final?', a: 'The rates shown are the official menu rates with M and R labels exactly as listed. Final pricing is confirmed on WhatsApp before your appointment, and complex artwork may need a separate quote after consultation.' }
    ],
    relTitle: 'Helpful <em>pages</em>',
    rel: [{ h: '/booking', t: 'Book' }, { h: '/nail-prices', t: 'Price List' }, { h: '/contact', t: 'Contact' }, { h: '/faq', t: 'FAQ' }, { h: '/services', t: 'Services' }, { h: '/privacy', t: 'Privacy' }]
  },
  {
    path: '/privacy', page: 'privacy', crumb: 'Privacy',
    title: 'Privacy Policy | Vansshikha Soni Nail Atelier',
    desc: 'Privacy policy for Vansshikha Soni Nail Atelier — what information you share when you enquire, how it is used, and your contact options.',
    ogTitle: 'Privacy Policy | Vansshikha Soni Nail Atelier',
    eyebrow: 'Privacy', h1: 'Privacy <em>Policy</em>',
    lead: 'What happens to the details you share when you enquire or book.',
    paras: [
      'When you use the booking form or message the studio, you share details such as your name, the service you are interested in, your preferred date and time, and any notes or design inspiration you choose to add. These details are used only to handle your enquiry and arrange your appointment.',
      'Enquiries are delivered to the studio through WhatsApp, so your message is also handled under WhatsApp’s own terms. We do not sell your information. For longer enquiries you can also email or reach out on Instagram — the links are in the footer.',
      'To ask about, correct or delete the details you have shared, contact the studio on WhatsApp at +91 78389 13373 or by email at VANSSHIKHASONI@gmail.com.'
    ],
    cardsTitle: 'In <em>short</em>', cardsEyebrow: 'Your data',
    cards: [
      { h: 'What we receive', p: 'Your name, chosen service, preferred date and time, and any notes or design inspiration you add to the booking form or send on WhatsApp.' },
      { h: 'How it is used', p: 'Only to handle your enquiry, confirm availability and arrange your appointment. We do not sell your information.' },
      { h: 'Third-party links', p: 'Messages are delivered through WhatsApp, and the site links to Instagram and email. Those services handle data under their own terms.' },
      { h: 'Your choices', p: 'Ask about, correct or delete your details any time on WhatsApp at +91 78389 13373 or by email at VANSSHIKHASONI@gmail.com.' }
    ],
    faqs: [
      { q: 'What information do I share when I book?', a: 'Your name, the service you are interested in, your preferred date and time, and any notes or design inspiration you choose to add. The details are used only to handle your enquiry and arrange your appointment.' },
      { q: 'Do you sell my information?', a: 'No. Details you share are used only to handle your enquiry and arrange your appointment. We do not sell your information.' },
      { q: 'How do I delete the details I shared?', a: 'Contact the studio on WhatsApp at +91 78389 13373 or email VANSSHIKHASONI@gmail.com and we will help with your request.' }
    ],
    relTitle: 'More <em>pages</em>',
    rel: [{ h: '/terms', t: 'Terms' }, { h: '/contact', t: 'Contact' }, { h: '/booking', t: 'Book' }, { h: '/faq', t: 'FAQ' }, { h: '/about', t: 'About' }]
  }
];

module.exports = { GUIDE_PAGES };
