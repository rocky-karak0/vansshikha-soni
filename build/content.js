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

/* main (non-service) page copy — again only from copy that already exists on the site */
const PAGES = {
  about: {
    title: 'About Vansshikha Soni Nail Atelier | Story, Founder & Approach',
    desc: 'The story behind Vansshikha Soni Nail Atelier — a luxury nail studio built on creativity, timeless elegance and hand-finished nail artistry by founder Vansshikha Soni.',
    h1: 'A Journey of Beauty, <em>Art &amp; Elegance</em>'
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

module.exports = { CONTENT, PAGES, GENERAL_AFTERCARE, sharedFaqs };
