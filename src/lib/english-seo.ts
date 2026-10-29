export const englishProductSeo = {
  'crochet-rope': {
    metaTitle: 'Polyester Crochet Cord Manufacturer | GEELUNG',
    metaDescription: 'Source polyester crochet cord for industrial and OEM orders. Confirm diameter, construction, color, packing and sample requirements with GEELUNG.',
    keywords: ['crochet cord', 'polyester crochet cord', 'white crochet cord', 'custom crochet cord', 'crochet cord manufacturer'],
    h1: 'Polyester Crochet Cord for Industrial & OEM Supply',
    imageAlt: 'White polyester crochet cord on an industrial spool',
    summary: 'GEELUNG supplies crochet cord in large-spool formats for industrial procurement, export packing and specification-led OEM orders.',
    details: [
      ['Material', 'Polyester crochet cord options can be discussed against the required construction and end use.'],
      ['Diameter & thickness', 'Reference outer diameter: 1.0–2.5 mm; confirm the required diameter and tolerance before quotation.'],
      ['Tensile requirement', 'Strength requirements are reviewed against the confirmed material, construction, diameter and application.'],
      ['Abrasion & water exposure', 'Select the material and braid structure around the expected abrasion level and wet or dry working environment.'],
      ['Applications', 'Suitable for industrial assembly, sporting goods, agricultural use and other projects that require a specified cord format.'],
      ['Custom options', 'Color, diameter, length, spool format and carton marking can be aligned with your OEM/ODM requirement.'],
      ['Packing & lead time', 'Spool, roll or palletized export packing and production lead time are confirmed after the order specification and quantity are reviewed.'],
      ['Samples', 'Sample availability can be discussed before bulk production; provide your target diameter, material preference and use case.']
    ],
    guide: {href: '/blog/polyester-crochet-cord-vs-nylon-braided-rope', label: 'Read the polyester crochet cord vs nylon braided rope guide'}
  },
  'braided-rope': {
    metaTitle: 'Nylon Braided Rope Manufacturer | GEELUNG',
    metaDescription: 'Source nylon braided rope for industrial and export orders. Discuss diameter, abrasion needs, packing, color and samples with GEELUNG.',
    keywords: ['braided rope', 'nylon braided rope', 'industrial braided rope', 'white braided rope', 'braided rope manufacturer'],
    h1: 'Nylon Braided Rope for Industrial & Export Orders',
    imageAlt: 'White nylon braided rope rolls for industrial export orders',
    summary: 'GEELUNG supplies braided rope in stable roll formats for industrial buyers who need a clear route from specification confirmation to export shipment.',
    details: [
      ['Material', 'Nylon braided rope options can be evaluated against the end use, handling requirements and requested construction.'],
      ['Diameter & thickness', 'Reference outer diameter: 1.0–2.5 mm; share the target size and tolerance for a production-focused quotation.'],
      ['Tensile requirement', 'Required tensile performance is confirmed against the finished construction, diameter and intended loading condition.'],
      ['Abrasion & water exposure', 'Discuss abrasion, moisture and water-exposure requirements so the material selection fits the working environment.'],
      ['Applications', 'For industrial assembly, agriculture, recreation equipment and other applications where a repeatable braided-rope format is required.'],
      ['Custom options', 'OEM/ODM support can cover color, diameter, cut length, roll format, labels and outer-carton details.'],
      ['Packing & lead time', 'Roll, spool and palletized export packing are available; lead time is confirmed after specification, quantity and destination review.'],
      ['Samples', 'Request a sample discussion with the intended use, diameter, material preference and estimated order quantity.']
    ],
    guide: {href: '/blog/how-to-specify-braided-rope-for-oem-export-orders', label: 'See how to specify braided rope for an OEM or export order'}
  }
} as const;

export function getEnglishProductSeo(slug: string) {
  return englishProductSeo[slug as keyof typeof englishProductSeo];
}
