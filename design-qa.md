# Design QA

## Comparison target

- Source visual truth: `C:\Users\HUAWEI\.codex\generated_images\01a0c70c-7bb5-72e0-a466-01ca8a944945\exec-141a4fdc-d3c4-4bfa-a099-d66b70b9a929.png`
- Implementation: `http://127.0.0.1:4173/`
- Implementation screenshot evidence: in-app browser desktop capture at 1440 x 900 CSS px, device scale factor 1, captured after the final asset update.
- State: desktop homepage; separately verified quote section with expanded FAQ and submitted success state.

## Full-view comparison

The implementation preserves the selected direction's dark industrial hero, small blue brand treatment, white product/application sections, dark three-column advantage strip, factory capability region, founder statement, resources, FAQ/RFQ pair, and dark footer. It uses the provided logo, portrait, and catalogue-derived production/product imagery rather than placeholders.

## Focused-region comparison

- Hero: verified at 1440 px wide. The headline, dual CTAs, metric rail, dark overlay, and full-bleed production-roll image match the source hierarchy.
- Conversion area: verified in the browser. FAQ expansion works; the RFQ fields accept input; choosing a product and submitting shows the local success state.

## Fidelity surfaces

- Fonts and typography: bold sans-serif display hierarchy and compact all-caps utility labels match the source's industrial direction. Browser rendering has no clipping in the tested desktop viewport.
- Spacing and layout rhythm: 1240 px content column, wide section spacing, six-card product row, four-card applications row, and split FAQ/form layout match the visual rhythm.
- Colors and visual tokens: charcoal/black, white, and bright EPT blue are used for the same hierarchy as the source. CTA contrast is strong.
- Image quality and asset fidelity: EPT logo and founder portrait use supplied assets. Product and manufacturing imagery comes from supplied catalogue imagery, cropped to remove most brochure framing. No placeholder or inline-SVG artwork is used.
- Copy and content: text reflects the supplied company brief. Unverified certifications, customer logos, awards, and project outcomes are not claimed.

## Findings

- [P3] The source mock has a blue roll in the hero while the catalogue source contains an orange production roll. This is an intentional use of supplied authentic production imagery rather than an invented recolor.
- [P3] The prototype follows the selected screenshot's information architecture but uses supplied catalogue crops where the source mock used idealized single-subject images. Replacing these with new studio product photography would increase fidelity later.

## Interaction checks

- Primary `Get a Quote` action scrolls to the RFQ section.
- FAQ accordion expands and collapses.
- RFQ accepts name, email, country, and product selection, then displays the success state locally.
- Desktop `Products` now opens a centered frosted-glass mega menu. The verified state exposes product-family, application, all-products, and RFQ links. It opens through hover code and was browser-tested through click, including the `aria-expanded=true` state.
- Browser console errors: none.

## Final result

passed
# Product template QA — Application Story option

Reference checked: `C:\Users\HUAWEI\.codex\generated_images\01a0c70c-7bb5-72e0-a466-01ca8a944945\exec-562a41e8-3d9e-4ee8-8491-fabf5b32281c.png` (selected option 2).

Rendered route checked: `http://127.0.0.1:4173/products/pvc-soundproof-barrier` at a 1440 × 900 browser viewport.

## Fidelity review

- Passed: dark editorial hero, application-first narrative, light technical sections, dark advantage section, specification surface, FAQ and blue enquiry ending follow the selected direction.
- Passed: implementation uses Supfield logo and available catalogue/factory assets; the layered anatomy section uses a generated project-local diagram instead of a CSS placeholder.
- Passed: hierarchy, large type, restrained blue accent and modular product-story rhythm remain consistent across the long page.

## Functional review

- Passed: “Request a project quote” scrolls to the enquiry section.
- Passed: form required fields accept input and show a local success state on submit.
- Passed: FAQ opens and exposes `aria-expanded="true"` for the selected question.
- Passed: browser console check found no recorded errors.
- Passed: `npm run build` and `npm run test:sites` completed successfully (4/4 tests).

## Company-credibility image module

- Passed: four project-local, generated factory-story images are rendered in the product page: team and workshop, customer visit, export packing, and engineering design.
- Passed: the image section keeps the selected product-page narrative and has responsive two-column / single-column layouts.
- Passed: a final build and Sites test run completed after the image module was added (4/4 tests).

Final result: passed

# Contact page visual QA

## Summary
- Overall status: Pass
- Primary conversion path: CEO contact card → email/phone/address links → enquiry form.

## Responsive notes
- Desktop: 1440 × 900 capture confirms a readable dark hero, clear contact rows and visible primary email action.
- Mobile: 390 × 844 capture confirms navigation simplification, readable heading and stacked content without horizontal overflow.

## Accessibility and interaction notes
- Alan’s portrait has meaningful alternative text.
- The OpenStreetMap frame has a descriptive title and a separate external directions link.
- The contact form accepts required values and returns the local success state.

## Verification
- The map iframe, OpenStreetMap link and Alan portrait each render once.
- `npm run build` and `npm run test:sites` passed after the contact-page implementation (4/4 tests).

Ship recommendation: Proceed. Replace the phone placeholder in `ContactPage.jsx` with Alan’s live business number before publishing.

# B2B inquiry page QA

## Summary
- Overall status: Pass
- Desktop and mobile captures confirm the inquiry page retains the existing dark, high-end industrial visual system.

## Validation and feedback
- Empty submission visibly identifies name, email and phone as required and announces a completion message.
- Invalid phone input shows the international-number example.
- The Worker rejects invalid inquiry payloads (422) and silently accepts the hidden honeypot as an anti-spam measure.
- Successful delivery uses the server-side `/api/inquiry` route after Resend environment variables are configured.

Ship recommendation: Proceed after adding `RESEND_API_KEY` and `INQUIRY_FROM_EMAIL` to the deployment environment.

# Homepage contents module QA

## Summary
- Overall status: Pass
- The module introduces a clear page directory without competing with the homepage’s primary product hierarchy.

## Responsive notes
- Desktop: 1440 × 900 capture confirms four equal cards in one row, with readable Chinese titles, English labels and blue numeric actions.
- Mobile: 390 × 844 capture confirms the cards stack vertically without clipping or horizontal overflow.

## Interaction and accessibility
- Each numeric action is a semantic link with an accessible route label.
- The Product List action was activated and navigated to `/product-list` successfully.
- Hover movement is restrained and paired with a visible keyboard focus outline.

Ship recommendation: Proceed.

# Blog article page QA

## Summary
- Overall status: Pass
- The `/blog-single` route provides a full article layout with a prominent image header, publication date, relaxed reading column and article navigation.

## Responsive notes
- Desktop: 1440 × 900 capture confirms the hero title remains legible over the product image and the article begins in a focused, readable content column.
- Mobile: 390 × 844 capture confirms the header title, date and opening paragraph stack without visible clipping or horizontal overflow.

## Interaction and accessibility
- Back to Blog List was activated and verified to navigate to `/blog-list`.
- Images carry descriptive alternative text, while article navigation uses semantic links and visible focus styling.

Ship recommendation: Proceed.

# Blog list page QA

## Summary
- Overall status: Pass
- The `/blog-list` route presents articles in a two-column desktop grid, with image, title, excerpt, date and a direct Read More action.

## Responsive notes
- Desktop: 1440 × 900 capture confirms the two-column editorial grid begins cleanly beneath the Blog & Articles heading.
- Mobile: 390 × 844 capture confirms articles transition to one column with readable typography and no visible horizontal overflow.

## Interaction and accessibility
- Page 2 was activated and displayed Preparing Your Industrial Fabric RFQ.
- The first Read More control was activated and verified to navigate to `/blog-single`.
- Pagination controls include accessible labels and visible keyboard focus styling.

Ship recommendation: Proceed.

# Product list page QA

## Summary
- Overall status: Pass
- The `/product-list` route provides a concise B2B product-category grid with product imagery, descriptions, detail calls to action and pagination.

## Responsive notes
- Desktop: 1440 × 900 capture confirms three cards are presented in a single row below the category heading.
- Mobile: 390 × 844 capture confirms the grid changes to a single-column card layout with no visible horizontal overflow.

## Interaction and accessibility
- Page 2 was activated and displayed the second set of product cards, including Custom Industrial Covers.
- The PVC Coated Fabrics card was activated and verified to navigate to `/product`.
- Cards and pagination controls have accessible labels and visible keyboard focus styling.

Ship recommendation: Proceed.

# PVC product page QA

## Summary
- Overall status: Pass
- The `/product` route now provides an industrial PVC tarpaulin detail page with a blue B2B visual system and direct enquiry path.

## Responsive notes
- Desktop: 1440 × 900 capture confirms the full-width material-roll hero, readable hierarchy and two-column overview are visually balanced.
- Mobile: 390 × 844 capture confirms a compact header, readable hero copy and a single-column content flow with no visible horizontal overflow.

## Interaction and accessibility
- The primary Get a Quote action uses a semantic link and was verified to navigate to `/inquiry`.
- Product imagery carries presentation context while the brand image has descriptive alt text.

Ship recommendation: Proceed.
