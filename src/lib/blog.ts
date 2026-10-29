export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: Array<{heading: string; paragraphs: string[]}>;
  faq: Array<{question: string; answer: string}>;
  product: {href: '/products/crochet-rope' | '/products/braided-rope'; label: string};
};

export const blogPosts: readonly BlogPost[] = [
  {
    slug: 'braided-rope-vs-crochet-cord',
    title: 'Braided Rope vs Crochet Cord: How Industrial Buyers Choose',
    description: 'Learn the practical differences between braided rope and crochet cord, including construction, specification questions, packing and OEM sourcing steps.',
    keywords: ['braided rope vs crochet cord', 'industrial braided rope', 'crochet cord supplier', 'custom rope specification'],
    image: '/assets/rope-rolls.webp',
    imageAlt: 'Industrial braided rope rolls for export orders',
    publishedAt: '2026-10-29',
    updatedAt: '2026-10-29',
    intro: 'For an industrial rope RFQ, the best starting point is not a product name alone. Buyers get a faster, more comparable quotation when they define the construction, material preference, diameter, end use, quantity and packing requirement.',
    sections: [
      {heading: 'Construction and order format', paragraphs: ['Braided rope is commonly specified when the buyer needs a repeatable rope construction supplied by roll, spool or pallet. Crochet cord is often requested for cord formats and large-spool supply where the construction and finished feel need to be agreed before production.', 'The names are not a substitute for a technical specification. Share a reference sample or confirm the target diameter, tolerance, intended use and any required test method.']},
      {heading: 'Questions to include in a procurement RFQ', paragraphs: ['State whether the rope will see repeated handling, abrasion, moisture, loading or outdoor exposure. These conditions help the supplier discuss a suitable material and construction without promising performance that has not been validated for your project.', 'For export orders, add destination, estimated quantity, preferred roll or spool format, pallet requirement, carton marking and target delivery window.']},
      {heading: 'From sample to bulk order', paragraphs: ['A sample discussion is useful when the application is new, the construction is custom or the buyer needs to compare material options. Once the specification is confirmed, production packing and shipment documents can be aligned to the purchase order.', 'GEELUNG supports the discussion from technical requirement through export-ready packing.']}
    ],
    faq: [
      {question: 'Is crochet cord the same as braided rope?', answer: 'They are related rope formats, but the required construction, material, finished diameter and use case should be confirmed before they are treated as interchangeable.'},
      {question: 'What information makes a rope quotation more accurate?', answer: 'Provide product format, material preference, target diameter, quantity, intended use, packing preference and destination.'}
    ],
    product: {href: '/products/braided-rope', label: 'Explore industrial braided rope'}
  },
  {
    slug: 'polyester-crochet-cord-vs-nylon-braided-rope',
    title: 'Polyester Crochet Cord vs Nylon Braided Rope: A Buyer’s Guide',
    description: 'Compare polyester crochet cord and nylon braided rope for industrial sourcing. Learn which material questions, use conditions and packaging details to confirm.',
    keywords: ['polyester crochet cord', 'nylon braided rope', 'crochet cord material', 'braided rope material guide'],
    image: '/assets/rope-spool.webp',
    imageAlt: 'White polyester crochet cord on a large industrial spool',
    publishedAt: '2026-10-29',
    updatedAt: '2026-10-29',
    intro: 'Polyester crochet cord and nylon braided rope should be selected against the finished construction and the project environment—not keyword preference alone. A material conversation is most useful when it begins with the intended use and acceptance criteria.',
    sections: [
      {heading: 'Start with the working environment', paragraphs: ['Ask whether the rope will be used indoors or outdoors, in a dry or wet setting, under repeated handling or in contact with surfaces that can create abrasion. These details guide the material discussion and help avoid an assumption based solely on color or a sample photo.', 'If tensile, abrasion or water-exposure performance is critical, state the required value or test method in the RFQ. Performance should be confirmed for the agreed construction and diameter.']},
      {heading: 'Confirm the finished construction', paragraphs: ['Material is only one part of the finished rope. Diameter, core and sheath construction, braid pattern, cut length and finishing can all affect how a cord is handled and specified.', 'For a polyester crochet cord order, clarify the desired cord format and spool size. For a nylon braided rope order, clarify the roll length, braid requirement and intended load or handling condition.']},
      {heading: 'Plan samples, packing and repeat supply', paragraphs: ['A documented sample stage is helpful when a buyer needs a specific hand feel, diameter tolerance, color or packaging presentation. Keep the approved sample and order specification together for repeat purchasing.', 'For shipment planning, specify whether you require rolls, spools or palletized packing, plus carton labels and destination details.']}
    ],
    faq: [
      {question: 'Can I request polyester crochet cord in a custom diameter?', answer: 'Yes. Include target diameter, tolerance, color, order quantity and application in your RFQ so feasibility and packing can be reviewed.'},
      {question: 'Can nylon braided rope be used in wet conditions?', answer: 'Material selection should be matched to the actual water-exposure and performance requirement. Share the condition and any test standard for a project-specific discussion.'}
    ],
    product: {href: '/products/crochet-rope', label: 'View polyester crochet cord'}
  },
  {
    slug: 'how-to-specify-braided-rope-for-oem-export-orders',
    title: 'How to Specify Braided Rope for OEM and Export Orders',
    description: 'A B2B checklist for specifying braided rope: material, diameter, strength requirement, color, packing, samples and export delivery information.',
    keywords: ['custom braided rope', 'OEM braided rope', 'braided rope export packing', 'braided rope sample'],
    image: '/assets/rope-warehouse.webp',
    imageAlt: 'Palletized braided rope rolls prepared for export packing',
    publishedAt: '2026-10-29',
    updatedAt: '2026-10-29',
    intro: 'OEM rope orders move faster when the buyer sends a structured request instead of asking only for a price. This checklist gives purchasing teams the minimum information needed to compare options, confirm feasibility and plan shipment.',
    sections: [
      {heading: 'The essential product fields', paragraphs: ['Identify the rope type, material preference, target diameter and tolerance, required length or roll size, intended application and estimated quantity. If a tensile requirement is mandatory, provide the required value and test method rather than assuming a standard value.', 'Add the requested color, label content and any approved reference sample. These details help prevent a specification mismatch between development and bulk supply.']},
      {heading: 'Packaging details for export', paragraphs: ['Describe your preferred packing format: roll, spool or pallet. Include pieces per carton, carton marking, pallet requirement, destination port or country and whether you need shipping marks.', 'The supplier can then align a practical packing proposal with container planning, handling needs and the delivery schedule.']},
      {heading: 'Sample and lead-time planning', paragraphs: ['For a new project, ask how the sample will be made, what needs approval and which specification becomes the basis for bulk production. This makes a later repeat order easier to manage.', 'Production lead time should be confirmed only after the order specification, quantity, packing and production schedule have been reviewed.']}
    ],
    faq: [
      {question: 'What should I send with an OEM braided rope inquiry?', answer: 'Send the product type, material preference, target diameter, quantity, use case, color, packing request, destination and any drawing or sample reference.'},
      {question: 'Can I request a rope sample before a bulk order?', answer: 'Yes. State the target specification and expected order quantity so the sample discussion can be matched to the intended bulk order.'}
    ],
    product: {href: '/products/braided-rope', label: 'Request nylon braided rope information'}
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
