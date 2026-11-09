/* Original page copy for the prerendered service pages (build.js).
   Every statement is derived from the official menu data in js/service-data.js or from copy already
   published on the site (FAQ, nail care guide, why-us). Nothing is invented: no new prices, no
   qualifications, no treatment results and no medical claims. */

const GENERAL_AFTERCARE = 'Apply cuticle oil daily, wear gloves for cleaning, avoid using your nails as tools and never peel product off at home. If anything begins to lift, book a refill or contact the studio rather than removing it yourself. General guidance from our atelier — your technician will confirm the aftercare that suits your specific product system.';

/* shared questions reused on every service page (answers are re-stated with the service name) */
function sharedFaqs(name, priceLine) {
  return [
    { q: 'How do I book ' + name + ' at Vansshikha Soni Nail Atelier?',
      a: 'Use the booking form on this page or the Book on WhatsApp button to send your preferred date and time. Vansshikha personally confirms availability — nothing is booked until you receive a confirmation reply. Walk-ins are subject to availability.' },
    { q: 'Are these the final rates for ' + name + '?',
      a: priceLine + ' M and R are shown exactly as on the official menu; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp before your appointment.' },
    { q: 'Where is the studio and how do I get directions?',
      a: 'Our luxury nail atelier is based in India. The full studio address is shared privately on booking confirmation — message us on WhatsApp at +91 78389 13373 for appointments, directions or a studio tour.' }
  ];
}

const CONTENT = {
  'classic': {
    intro: 'A clean, classic colour application designed for a polished everyday look — the understated finish clients come back to when they want neat, versatile nails without extra artwork.',
    procedure: [
      'Confirm with the studio whether you would like regular polish or gel, then choose your shade.',
      'Colour is applied for an even, clean finish suited to your preferred everyday look.',
      'Products used and appointment timing are confirmed by your technician at the visit.'
    ],
    faqs: [
      { q: 'Is Classic a regular polish or a gel service?', a: 'Finish and wear depend on the product system used. Please confirm with the studio when you book whether this is regular polish or gel — we will explain the finish, wear and removal before you decide.' }
    ]
  },
  'french': {
    intro: 'A timeless nail finish featuring a defined tip paired with a natural-looking base — an elegant, neat look that suits everyday wear as well as special occasions.',
    procedure: [
      'Discuss the tip shape, colour and base shade you would like during your consultation.',
      'The defined tip is created over a natural-looking base for a balanced, neat finish.',
      'Shape and length are adjusted to your preference and nail condition.'
    ],
    faqs: [
      { q: 'Can the French tip be customised?', a: 'Yes — tip shape, colour and base shade can be customised after consultation. Bring a reference photo if you have a specific line width or colour in mind.' }
    ]
  },
  'cat-eye-gel-set': {
    intro: 'A magnetic-effect gel look that creates a luminous, shifting line or reflective pattern — a dimensional, light-catching manicure with a distinctive finish.',
    procedure: [
      'Choose the magnetic gel shade for your set.',
      'The magnetic effect is worked into the gel to create the shifting line or reflective pattern.',
      'The final effect varies with the magnetic gel shade and the application technique used.'
    ],
    faqs: [
      { q: 'Will every nail have the same cat-eye line?', a: 'The final effect varies with magnetic gel shade and application technique, so each nail carries the pattern in its own way. Your technician will aim for a balanced, consistent look across the set.' }
    ]
  },
  'marble-gel-set': {
    intro: 'A gel design inspired by natural marble, with soft swirls and layered colour patterns — a sophisticated artistic look that can be subtle or high-contrast.',
    procedure: [
      'Select the colour direction for your marble design at consultation.',
      'Soft swirls and layered colour patterns are created individually on each nail.',
      'Marble patterns are individually created and may vary between nails.'
    ],
    faqs: [
      { q: 'Will the marble pattern be identical on every nail?', a: 'No — marble patterns are individually created and may vary between nails. That variation is part of the design and gives the set its natural, stone-like character.' }
    ]
  },
  'glitter-gel-set': {
    intro: 'A gel nail finish incorporating glitter for a sparkling decorative effect — a festive or statement manicure with adjustable sparkle intensity.',
    procedure: [
      'Choose the glitter shade and how much sparkle you want in the finished look.',
      'Glitter is incorporated into the gel finish across the set or on selected nails.',
      'Glitter density and finish depend on the design you select.'
    ],
    faqs: [
      { q: 'Can I choose how much glitter is used?', a: 'Yes. Glitter density and finish depend on the chosen design, from a light shimmer to full sparkle. Share the intensity you have in mind when you book.' }
    ]
  },
  'ombre-gel-art': {
    intro: 'A blended gel nail design that transitions smoothly between two or more colours — a soft gradient look, from neutral to colourful combinations.',
    procedure: [
      'Choose the colour combination for your gradient during consultation.',
      'Colours are blended to transition smoothly across the nail.',
      'Colour combinations and blending style can be selected during consultation.'
    ],
    faqs: [
      { q: 'Can I choose the colours for my ombre set?', a: 'Yes — colour combinations and blending style can be selected during consultation. Bring a reference photo or describe the palette you would like and we will plan the blend with you.' }
    ]
  },
  'chrome-gel-set': {
    intro: 'A reflective nail finish created with chrome-style pigment over a suitable gel base — a sleek metallic, pearlescent or mirror-inspired appearance.',
    procedure: [
      'Select the base colour and chrome pigment direction for the finish.',
      'Chrome-style pigment is applied over a suitable gel base.',
      'The result depends on the base colour and chrome pigment selected.'
    ],
    faqs: [
      { q: 'How is the chrome shade chosen?', a: 'The result depends on the base colour and chrome pigment selected, so the two are chosen together. Tell us whether you want a mirror, metallic or pearlescent feel and we will guide the combination.' }
    ]
  },
  'nail-art-per-finger': {
    intro: 'Decorative detailing applied to an individual nail — fine lines, florals, patterns or accents — so you can add customisation without committing to artwork on every nail.',
    procedure: [
      'Send your reference photo or idea on WhatsApp before the appointment when possible.',
      'The design is planned for the selected accent nail or nails.',
      'Price is listed per finger; complex artwork may require a separate quote.'
    ],
    faqs: [
      { q: 'Is the price charged per finger?', a: 'Yes — nail art is priced per finger (M ₹30 / R ₹40 on the official menu). Complex artwork may require a separate quote after consultation.' },
      { q: 'Can I bring my own design reference?', a: 'Yes. Bring a reference photo or describe your idea — gold linework, chrome, florals, 3D accents or minimalist designs. Send your inspiration on WhatsApp before your visit so we can prepare.' }
    ]
  },
  '3d-nail-art-per-finger': {
    intro: 'Raised or dimensional nail decoration using suitable sculpting materials or embellishments — a textured statement design for selected accent nails.',
    procedure: [
      'Discuss the embellishment or sculpted detail you would like and where it will sit.',
      'The raised design is built on the selected nail or nails.',
      'Price is per finger; please confirm embellishment complexity and maintenance before booking.'
    ],
    faqs: [
      { q: 'What should I know before booking 3D nail art?', a: 'Price is per finger (M ₹50 / R ₹70 on the official menu). Please confirm embellishment complexity and maintenance with the studio before booking so we can advise on upkeep for the raised detail.' }
    ]
  },
  'gel-extension': {
    intro: 'A nail-length enhancement created with an extension system and a gel-based building product, giving added length with a shaped, finished appearance.',
    procedure: [
      'Length, shape, structure and suitability are assessed by the nail technician first.',
      'The extension system and gel-based building product are applied to create the agreed length and shape.',
      'Final structure and finish are checked with you before the set is completed.'
    ],
    faqs: [
      { q: 'How long do gel extensions last before a refill?', a: 'Gel extensions and overlays may need a refill every 2–4 weeks depending on nail growth and aftercare. Book a gel refill before lifting starts to keep the set looking its best.' }
    ]
  },
  'acrylic-extension': {
    intro: 'A nail enhancement built with an acrylic system to create additional length and structure — a sculpted look with customisable length and shape.',
    procedure: [
      'Your preferred length and shape are discussed and assessed by the technician.',
      'The acrylic system is built out to create the agreed structure and length.',
      'Maintenance and safe removal are important — never peel extensions off.'
    ],
    faqs: [
      { q: 'How should I look after acrylic extensions?', a: 'Maintenance and safe removal are important; please do not peel extensions off. Book a refill every 2–4 weeks as the set grows out, and use professional removal when you are finished with them.' }
    ]
  },
  'temporary-extension': {
    intro: 'A shorter-term nail-length option for occasions or clients seeking a less permanent look — a convenient enhanced nail appearance for a specific event or period.',
    procedure: [
      'Share the occasion or time frame you have in mind when you enquire.',
      'Exact materials, expected wear time and removal method are confirmed by the studio.',
      'The set is prepared for the specific event or period you need it for.'
    ],
    faqs: [
      { q: 'How long will a temporary extension last?', a: 'Exact materials, expected wear time and removal method are confirmed by the studio when you book, so you know exactly what to expect for your event or time frame.' }
    ]
  },
  'soft-gel-extension': {
    intro: 'A nail-length enhancement using soft-gel extension tips or a related soft-gel system — a smooth, shaped extension look in various lengths and styles.',
    procedure: [
      'Your preferred length and style are selected during the consultation.',
      'Soft-gel extension tips or a related soft-gel system are applied.',
      'The specific application method and removal protocol depend on the products used.'
    ],
    faqs: [
      { q: 'How is a soft gel extension removed?', a: 'The specific application method and removal protocol depend on the products used, so the studio will confirm the correct removal route for your set. Never peel or force extensions off at home.' }
    ]
  },
  'gum-gel-extension': {
    intro: 'A sculpted nail extension made with a mouldable builder-style gel commonly called gum gel — custom-shaped extensions with a structured finish.',
    procedure: [
      'The desired shape and structure are agreed before sculpting begins.',
      'The mouldable builder-style gel is sculpted into the custom shape.',
      'Product terminology and exact technique should be confirmed with the studio.'
    ],
    faqs: [
      { q: 'What exactly is gum gel?', a: 'Gum gel is a mouldable builder-style gel used to sculpt custom-shaped extensions with a structured finish. Product terminology and the exact technique used should be confirmed with the studio when you book.' }
    ]
  },
  'gel-overlay': {
    intro: 'A gel layer applied over natural nails to add a smooth finish and supportive structure without necessarily extending length — for clients who want their natural nail length with a polished, reinforced look.',
    procedure: [
      'A technician assesses natural nail condition and the suitable product before starting.',
      'The gel layer is applied over the natural nails for a smooth, supportive finish.',
      'The result keeps your existing nail length with a reinforced surface.'
    ],
    faqs: [
      { q: 'Does a gel overlay add length?', a: 'No — a gel overlay adds a smooth finish and supportive structure without necessarily extending length. It is designed for clients who want to keep their natural nail length with a polished, reinforced look.' }
    ]
  },
  'acrylic-overlay': {
    intro: 'An acrylic coating applied over natural nails, generally without adding extension length — a structured nail surface while keeping the existing nail length.',
    procedure: [
      'Natural nail condition is assessed before the coating is applied.',
      'The acrylic coating is applied over the natural nails without adding extension length.',
      'Appropriate maintenance and professional removal are required when the set is finished.'
    ],
    faqs: [
      { q: 'How do I maintain an acrylic overlay?', a: 'Requires appropriate maintenance and professional removal. Contact the studio when the overlay begins to grow out so it can be maintained or removed correctly instead of peeled off.' }
    ]
  },
  'gel-refill': {
    intro: 'Maintenance of an existing gel enhancement by addressing new nail growth and restoring its appearance — for clients returning to maintain a previously applied gel set.',
    procedure: [
      'The existing set is checked for lifting, condition and the enhancement system used.',
      'New nail growth is addressed and the appearance of the set is restored.',
      'Suitability depends on lifting, condition and the existing enhancement system.'
    ],
    faqs: [
      { q: 'When should I book a gel refill?', a: 'Book a gel refill before lifting starts — typically as the set grows out (extensions and overlays are usually refilled every 2–4 weeks). Suitability depends on lifting, condition and the existing enhancement system, so contact the studio if your set is already lifting.' }
    ]
  },
  'acrylic-refill': {
    intro: 'Maintenance of existing acrylic enhancements to rebalance the growth area and refresh the set — for clients who want to maintain an acrylic set rather than replace it completely.',
    procedure: [
      'The existing acrylic set is assessed for lifting and overall condition.',
      'The growth area is rebalanced and the set is refreshed.',
      'Damaged or lifting enhancements may need repair or removal instead of a refill.'
    ],
    faqs: [
      { q: 'Can any acrylic set be refilled?', a: 'Not always. Damaged or lifting enhancements may need repair or removal instead of a refill. Send a photo on WhatsApp before booking if you are unsure and we will advise.' }
    ]
  },
  'gum-gel-refill': {
    intro: 'Maintenance of a previously applied gum-gel enhancement, focusing on new growth and shape — for upkeep of a compatible gum-gel set.',
    procedure: [
      'Product compatibility and nail condition are confirmed before the refill begins.',
      'New growth is addressed and the shape of the set is refreshed.',
      'The set is finished to match the original gum-gel structure.'
    ],
    faqs: [
      { q: 'Can you refill a gum-gel set applied elsewhere?', a: 'Please confirm product compatibility and nail condition before booking. Message the studio on WhatsApp with the details of your existing set and we will confirm whether a refill is suitable.' }
    ]
  },
  'nail-cut-file': {
    intro: 'Basic nail length trimming and shaping using a nail file — a tidy, natural-looking nail shape with minimal treatment time.',
    procedure: [
      'Shape and length are adjusted according to your preference and nail condition.',
      'Nails are trimmed and filed into the agreed shape.',
      'The finish is checked with you before you leave.'
    ],
    faqs: [
      { q: 'Can I choose the shape I want?', a: 'Yes — shape and length are adjusted according to the client’s preference and nail condition. Bring a photo of the shape you like if you have one.' }
    ]
  },
  'nail-cut-polish': {
    intro: 'A simple nail grooming service with trimming and a polished colour finish — a quick refreshed look without an elaborate nail-art design.',
    procedure: [
      'Choose your polish colour for the appointment.',
      'Nails are trimmed and finished with a polished colour.',
      'Please confirm whether filing, base coat and polish type are included.'
    ],
    faqs: [
      { q: 'What is included in Nail Cut + Polish?', a: 'It is a simple grooming service with trimming and a polished colour finish. Please confirm with the studio whether filing, base coat and polish type are included so there are no surprises when you arrive.' }
    ]
  },
  'gel-polish-removal': {
    intro: 'Removal of existing gel polish using a method appropriate to the applied product — for changing a gel colour or returning to natural nails.',
    procedure: [
      'The product on your nails is checked so the correct method can be used.',
      'Removal is carried out with a method appropriate to the applied product.',
      'Avoid peeling or scraping gel polish at home; removal methods vary by formula.'
    ],
    faqs: [
      { q: 'Can I remove gel polish at home?', a: 'Avoid peeling or scraping gel polish at home — removal methods vary by formula and peeling damages the nail surface. Professional removal starts from ₹150 (gel polish removal is M ₹150 / R ₹250 on the official menu).' }
    ]
  },
  'extension-removal': {
    intro: 'Removal of existing nail extensions using a technique suited to the extension material — for safely transitioning from enhancements or preparing for a new set.',
    procedure: [
      'The extension material is identified so the correct removal technique can be used.',
      'Removal is carried out with a technique suited to that material.',
      'Different systems require different removal methods.'
    ],
    faqs: [
      { q: 'Is extension removal safe for my natural nails?', a: 'When done professionally, yes. We use the correct removal method for your system and never force extensions off. Never bite, peel or scrape enhancements at home — this damages the nail plate. Rates are shown in the original menu order: M ₹350 / R ₹300.' }
    ]
  }
};

/* ===== standalone SEO pages (/story, /founder, /studio, /why-us, /faq, /nail-guide) ===== */

const STORY = {
  title: 'Our Story | Vansshikha Soni Nail Atelier',
  desc: 'The story of Vansshikha Soni Nail Atelier — a luxury nail studio built on creativity, timeless elegance and the belief that beautiful nails are a reflection of you.',
  h1: 'A Journey of Beauty, <em>Art &amp; Elegance</em>',
  lead: 'Where beauty meets artistry — and every nail tells a story.',
  paras: [
    'At VANSSHIKHA SONI – NAIL ATELIER, we believe that nail artistry is more than just beauty — it\u2019s a form of self-expression.',
    'Our atelier is inspired by a passion for creativity, timeless elegance, and the little details that make every design special.',
    'From delicate, minimalist nails to bold, statement-making creations, we celebrate individuality through thoughtfully crafted nail designs.',
    'Our vision is to create a space where beauty meets artistry, where every detail matters, and where every client feels confident expressing their unique style.',
    'Because we believe beautiful nails aren\u2019t just an accessory — they\u2019re a reflection of you.'
  ],
  tag: 'Where Every Nail Tells a Story.',
  today: [
    'Today that thinking sits behind a menu of 23 services across 8 categories — classic and French application, advance gel sets, custom nail art, gel and acrylic extensions, overlays, refills, mini manicures and safe removal. Every service has its own page with the official menu rate shown exactly as it appears on the studio menu, so you can browse the details before you enquire.',
    'The portfolio carries real atelier work only — gold linework, chrome, florals, ombr\u00e9, French and playful sets photographed on genuine sets. Every look can be enlarged, studied and sent straight to a booking request.',
    'Appointments are requested through the website or WhatsApp, and Vansshikha confirms availability personally. The full studio address is shared privately on booking confirmation, so every visit begins with a conversation.'
  ]
};

const FOUNDER = {
  title: 'Meet the Founder, Vansshikha Soni | Vansshikha Soni Nail Atelier',
  desc: 'Meet Vansshikha Soni, founder of Vansshikha Soni Nail Atelier — the vision behind hand-finished luxury nail art, refined aesthetics and a detail-first approach to every set.',
  h1: 'Meet <em>the Founder</em>',
  role: 'Founder | Nail Artistry &amp; Luxury Beauty',
  paras: [
    'At VANSSHIKHA SONI – NAIL ATELIER, beauty is celebrated through creativity, elegance, and attention to detail.',
    'With a vision to make nail artistry a reflection of personal style, Vansshikha Soni brings an appreciation for refined aesthetics and beautiful design to the heart of the brand.',
    'From timeless elegance to bold, expressive nail designs, the atelier is inspired by the belief that every detail matters and every individual deserves a look that feels uniquely their own.'
  ],
  quote: '“Elegance is in the details, and every nail tells a story.”',
  today: [
    'Every set is painted by Vansshikha Soni herself — gold linework, chrome, florals, ombr\u00e9 and quiet minimalism, one set at a time, with no rushed factory finishes. Each look is planned around your nail shape, lifestyle and personal aesthetic, starting from a reference photo, a mood board or simply a colour you like.',
    'The same care shapes the studio standard: single-use files where needed, hospital-grade sanitisation and carefully prepared tools, with nail health placed before any trend. Official rates are published openly on every service page, and nothing is booked until Vansshikha replies to confirm your slot.'
  ]
};

const STUDIO_PAGE = {
  title: 'Our Studio | Vansshikha Soni Nail Atelier',
  desc: 'Step inside Vansshikha Soni Nail Atelier — a space designed for beauty, comfort and elegance, with shade shelves, swatch boards and a hand-finished approach to every set.',
  h1: 'Step Inside <em>Our Studio</em>',
  lead: 'A Space Designed for Beauty, Comfort &amp; Elegance.',
  paras: [
    'The atelier is set up around the work itself: shade shelves of gel polish, a colour chart and a shade swatch board for planning a look, plus gloss and matte top coats so the finish can be chosen rather than assumed.',
    'Bring a reference photo, a mood board or just a colour. The design is discussed and shaped around your nail condition, preferred length and personal style before the appointment begins.',
    'Hygiene comes first — single-use files where needed, hospital-grade sanitisation and carefully prepared tools. Your nail health comes before any trend.',
    'Our luxury nail atelier is based in India. The full studio address is shared privately on booking confirmation — message us on WhatsApp for appointments, directions or a studio tour.'
  ]
};

const WHY = {
  title: 'Why Choose Vansshikha Soni Nail Atelier | Luxury Nail Art Studio',
  desc: 'Hand-finished luxury nail artistry — precision, hygiene, transparent official rates and custom design consultation. Why clients choose Vansshikha Soni Nail Atelier.',
  h1: 'The <em>Vansshikha Soni</em> Difference',
  lead: 'Hand-finished luxury nail artistry — where precision, hygiene and personal style meet.',
  steps: [
    { t: 'Consultation before the set', p: 'Bring a reference, a mood board or just a colour. Every look is designed around your nail shape, lifestyle and personal aesthetic — from quiet minimalism to bold statement nails.' },
    { t: 'One set at a time', p: 'Every set is painted by Vansshikha Soni herself — gold linework, chrome, florals and ombr\u00e9, finished without rushed factory work. The appointment is paced so the details that make a design special get the time they need.' },
    { t: 'Care after you leave', p: 'Apply cuticle oil daily, wear gloves for cleaning and never peel product off at home. Book a refill before lifting starts — extensions and overlays are usually refilled every 2–4 weeks — and use professional removal when you are finished with a set.' }
  ]
};

/* nail care guide: items 1–4 are the copy already published on the homepage, 5–8 extend it with
   aftercare and booking guidance that also exists on the site */
const GUIDE_ITEMS = [
  { h: 'How Long Does a Gel Manicure Last?', p: 'A professionally applied gel manicure typically lasts <strong>2–3 weeks</strong> without chipping. Gel extensions and overlays may need a refill every <strong>2–4 weeks</strong> depending on nail growth and aftercare. Book a gel refill at Vansshikha Soni Nail Atelier to maintain your set between full appointments.' },
  { h: 'Gel vs Acrylic vs Soft Gel Extensions', p: '<strong>Gel extensions</strong> use a gel-based builder for a glossy, flexible finish. <strong>Acrylic extensions</strong> offer strong structure with a classic sculpted look. <strong>Soft gel extensions</strong> are lighter and soak-off friendly. Not sure which suits you? Message us on WhatsApp — we\u2019ll recommend the best system for your natural nail condition.' },
  { h: 'How to Make Your Nail Art Last Longer', p: 'Apply cuticle oil daily, wear gloves for cleaning, avoid using nails as tools, and never peel gel polish at home. Schedule a refill before lifting begins. These simple habits can add <strong>7–10 extra days</strong> of wear to any gel set or nail extension.' },
  { h: 'Safe Nail Extension Removal', p: 'Never bite, peel or forcibly remove extensions — this damages the natural nail plate. Professional removal at our atelier uses the correct method for your system (gel, acrylic or soft gel). Gel polish removal starts from ₹150; extension removal from ₹300.' },
  { h: 'A Simple Daily Nail-Care Routine', p: 'Keep cuticle oil within reach and apply it daily. Wear gloves when cleaning so nails are not soaked or scraped. Treat your nails as jewellery rather than tools, and if anything begins to lift, contact the studio instead of removing it yourself — these four habits protect the natural nail under any set.' },
  { h: 'When Should You Book a Refill?', p: 'Book a refill <strong>before lifting starts</strong>, as the set grows out — extensions and overlays are usually refilled every <strong>2–4 weeks</strong>. Suitability depends on lifting, condition and the enhancement system used, so send a photo on WhatsApp if your set is already lifting and we will advise whether a refill or a fresh set is the better route.' },
  { h: 'Preparing for Your Appointment', p: 'Send your reference photo or design idea on WhatsApp before you visit, choose your service and preferred date on the <a href="/booking">booking form</a>, and let us know if you have a specific finish in mind — regular polish or gel, tip shape, glitter intensity or chrome direction. Vansshikha confirms availability personally, and the studio address is shared once your slot is confirmed.' },
  { h: 'Choosing a Set That Suits Your Nails', p: 'Length, shape, structure and suitability are assessed by the nail technician first, so the result fits your natural nail condition as well as your style. Browse the <a href="/services">full menu</a> for suitable looks and official rates, or open the <a href="/services/category/nail-extension">extension category</a> if you are deciding between length and structure options.' }
];

/* FAQ hub: grouped questions taken from the homepage, /services, /booking, /contact and service pages */
const FAQ_GROUPS = [
  { g: 'Booking &amp; Appointments', items: [
    { q: 'How do I book an appointment?', a: 'Use the <a href="/booking">booking form</a> to pick a service, preferred date and time — then send the request on WhatsApp. Vansshikha personally confirms availability. Nothing is booked until you receive a confirmation reply. Walk-ins are subject to availability.' },
    { q: 'Can I walk in without an appointment?', a: 'Appointments are requested through the website or WhatsApp, and walk-ins are subject to availability. Messaging first means the slot and final pricing are confirmed before you travel.' },
    { q: 'What is your cancellation or rescheduling policy?', a: 'Please message us on WhatsApp at least <strong>24 hours</strong> before your appointment if you need to reschedule. Same-day cancellations may affect future booking priority. We understand life happens — just communicate early so we can offer the slot to another client.' },
    { q: 'How can I contact the studio?', a: 'WhatsApp is fastest for appointment requests, design references and directions: <a href="https://wa.me/917838913373" target="_blank" rel="noopener">+91 78389 13373</a>. For longer enquiries and collaborations, email <a href="mailto:VANSSHIKHASONI@gmail.com">VANSSHIKHASONI@gmail.com</a>, or see recent work on <a href="https://www.instagram.com/vs_nail_atelier_luxury_artist/" target="_blank" rel="noopener">Instagram</a>.' }
  ] },
  { g: 'Services &amp; Pricing', items: [
    { q: 'What nail services do you offer?', a: 'We offer <strong>23 professional nail services</strong> across 8 categories: classic &amp; French application, advance gel sets (cat-eye, marble, glitter, ombr\u00e9, chrome), custom nail art, gel &amp; acrylic extensions, overlays, refills, mini manicures and safe removal. <a href="/services">View the full menu with official rates →</a>' },
    { q: 'How much do nail services cost?', a: 'Every service page shows its official menu rate as M and R, exactly as listed on the studio menu. M and R labels are shown as on the official menu; their meaning is being confirmed by the studio. Final pricing is confirmed on WhatsApp before your appointment.' },
    { q: 'How much do gel extensions cost?', a: 'Gel extensions start from <strong>₹900–₹1,000</strong> on our official menu. Acrylic extensions are ₹1,100–₹1,200, soft gel extensions ₹800–₹900, and gum gel extensions ₹1,500–₹1,700. Final pricing is confirmed on WhatsApp based on length, design and product system. <a href="/services/gel-extension">See extension details →</a>' },
    { q: 'Do you take custom nail art requests?', a: 'Yes. Bring a reference photo or describe your idea — gold linework, chrome, florals, 3D accents or minimalist designs. Per-finger nail art starts from ₹30. Complex designs may need a separate quote after consultation. Send your inspiration on WhatsApp before your visit. <a href="/services/category/nail-design">Explore nail art services →</a>' },
    { q: 'How long does a gel manicure last?', a: 'A professional gel manicure typically lasts <strong>2–3 weeks</strong>. With proper aftercare — cuticle oil daily, gloves for chores, no peeling — many clients get even longer wear. Book a <a href="/services/gel-refill">gel refill</a> before lifting starts to extend the life of your set.' },
    { q: 'How long do extensions last before a refill?', a: 'Gel extensions and overlays may need a refill every <strong>2–4 weeks</strong> depending on nail growth and aftercare. Book a refill before lifting starts to keep the set looking its best. <a href="/services/category/refills">See refill services →</a>' }
  ] },
  { g: 'Nail Health &amp; Aftercare', items: [
    { q: 'Is nail extension removal safe for natural nails?', a: 'When done professionally, yes. We use the correct removal method for your system — never forced peeling. Gel polish removal starts from ₹150; extension removal from ₹300. Never remove gel or extensions at home by biting or scraping — this damages the nail plate permanently. <a href="/services/category/removal">See removal services →</a>' },
    { q: 'Can I remove gel polish at home?', a: 'Avoid peeling or scraping gel polish at home — removal methods vary by formula and peeling damages the nail surface. Professional gel polish removal starts from ₹150, using a method appropriate to the product applied.' },
    { q: 'How do I make my nail art last longer?', a: 'Apply cuticle oil daily, wear gloves for cleaning, avoid using nails as tools and never peel gel polish at home. These simple habits can add 7–10 extra days of wear to any gel set. Full guidance is in our <a href="/nail-guide">nail care guide</a>.' }
  ] },
  { g: 'Studio &amp; Visiting', items: [
    { q: 'Where is Vansshikha Soni Nail Atelier located?', a: 'Our luxury nail atelier is based in India. The full studio address is shared privately on booking confirmation. For appointments, directions or a studio tour, message us directly on WhatsApp at <a href="https://wa.me/917838913373" target="_blank" rel="noopener">+91 78389 13373</a>.' },
    { q: 'What can I expect at the studio?', a: 'A space designed for beauty, comfort and elegance — shade shelves, colour charts and swatch boards for planning your look, with hygiene-first preparation. <a href="/studio">Step inside the studio →</a>' },
    { q: 'Who will be doing my nails?', a: 'Every set is painted by Vansshikha Soni herself — one set at a time, with a custom design consultation before the appointment. <a href="/founder">Meet the founder →</a>' }
  ] }
];

/* short category intros for the 8 /services/category/<slug> landing pages */
const CAT_INTRO = {
  'application': 'Classic and French application — clean colour and timeless defined tips for everyday wear. This category holds the two services clients return to most often: a simple polished finish, and the classic French look with a natural-looking base.',
  'advance-gel-set': 'Advance gel sets add an effect to the colour — magnetic cat-eye, marble swirls, glitter, blended ombr\u00e9 and reflective chrome. Five services, each individually created at the appointment, with looks that can stay subtle or go high-contrast.',
  'nail-design': 'Custom nail art priced per finger: fine lines, florals, patterns and accents, plus raised 3D detail for selected accent nails. Bring a reference photo or describe your idea so the design can be planned before you sit down.',
  'nail-extension': 'Length and structure — gel, acrylic, temporary, soft gel and gum gel extensions. Length, shape and suitability are assessed by the nail technician first, and every set needs refills every 2–4 weeks plus professional removal at the end.',
  'overlay': 'Overlay services add a smooth, supportive layer over your natural nails without necessarily extending length — gel or acrylic, for clients who want to keep their own length with a polished, reinforced look.',
  'refills': 'Maintenance for an existing set — gel, acrylic and gum gel refills address new nail growth and refresh the shape. Book before lifting starts; damaged or lifting enhancements may need repair or removal instead of a refill.',
  'mini-manicure': 'Short grooming appointments — nail cut + file for a tidy, natural shape, and nail cut + polish for trimming with a polished colour finish. A quick refresh without an elaborate nail-art design.',
  'removal': 'Safe, professional removal — gel polish removal and extension removal, each using a method appropriate to the product or material. Never peel or bite product off at home: removal methods vary by formula and forcing product off damages the nail plate.'
};

/* main (non-service) page copy — again only from copy that already exists on the site */
const PAGES = {
  about: {
    title: 'About Vansshikha Soni Nail Atelier | Story, Founder & Studio',
    desc: 'About Vansshikha Soni Nail Atelier — explore the story, meet the founder, step inside the studio and see why clients choose this luxury nail art studio in India.',
    h1: 'About the <em>Atelier</em>'
  },
  story: { title: STORY.title, desc: STORY.desc },
  founder: { title: FOUNDER.title, desc: FOUNDER.desc },
  studio: { title: STUDIO_PAGE.title, desc: STUDIO_PAGE.desc },
  whyus: { title: WHY.title, desc: WHY.desc },
  faq: {
    title: 'Frequently Asked Questions | Vansshikha Soni Nail Atelier',
    desc: 'Answers to the most common questions about booking, services, official rates, nail aftercare and visiting Vansshikha Soni Nail Atelier.',
    h1: 'Frequently <em>Asked</em>'
  },
  guide: {
    title: 'Nail Care Guide | Tips from Vansshikha Soni Nail Atelier',
    desc: 'Professional nail care tips from Vansshikha Soni Nail Atelier — how long gel lasts, gel vs acrylic vs soft gel, making nail art last longer, refills and safe removal.',
    h1: 'Nail Care <em>Guide</em>'
  },
  services: {
    title: 'Nail Services &amp; Official Rates | Vansshikha Soni Nail Atelier',
    desc: 'All 23 nail services across 8 categories — classic and French application, advance gel sets, nail art, extensions, overlays, refills, mini manicures and removal — with the official menu rates.',
    h1: 'Nail <em>Services</em>'
  },
  gallery: {
    title: 'Nail Art Portfolio &amp; Gallery | Vansshikha Soni Nail Atelier',
    desc: 'Browse the atelier portfolio — real hand-finished nail art in gold, florals, deep reds, ombré, French and playful sets. Tap any look to enlarge it or send it to booking.',
    h1: 'Real work, <em>real hands</em>'
  },
  contact: {
    title: 'Contact &amp; Studio Enquiries | Vansshikha Soni Nail Atelier',
    desc: 'Contact Vansshikha Soni Nail Atelier on WhatsApp, email or Instagram. The studio address is shared privately on booking confirmation — appointments are requested through the website.',
    h1: 'Contact the <em>Atelier</em>'
  },
  booking: {
    title: 'Book a Nail Appointment | Vansshikha Soni Nail Atelier',
    desc: 'Request an appointment at Vansshikha Soni Nail Atelier — choose a service, preferred date and time, then send the request on WhatsApp. Vansshikha confirms availability personally.',
    h1: 'Reserve <em>your hour</em>'
  },
  notfound: {
    title: 'Page Not Found | Vansshikha Soni Nail Atelier',
    desc: 'This page could not be found. Explore the nail services, portfolio or book an appointment at Vansshikha Soni Nail Atelier.',
    h1: 'Page <em>not found</em>'
  }
};

module.exports = {
  CONTENT, PAGES, GENERAL_AFTERCARE, sharedFaqs,
  STORY, FOUNDER, STUDIO_PAGE, WHY, GUIDE_ITEMS, FAQ_GROUPS, CAT_INTRO
};
