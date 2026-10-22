# Design QA — Jilong Product Template

## Comparison target

- Source visual truth: `C:\Users\HUAWEI\Documents\Codex\2026-10-22\br-logo-ip-banner-seo-seo\outputs\jilong-product-template-concept-02.png` (1440 × 2400 px).
- Implementation: `http://localhost:4173/products/pvc-ultrafiltration-membrane-housing`, rendered in Codex In-app Browser.
- Desktop evidence: 1440 × 1200 CSS viewport, default product-details tab, full-page and hero captures inspected. Mobile evidence: 390 × 844 CSS viewport, default state. Browser screenshot captures were inspected directly in the active task; the in-app browser does not expose a filesystem screenshot path.
- State: no form submission; RFQ selector, specification tab, save-to-RFQ state and FAQ affordances checked.

## Findings

- No actionable P0, P1, or P2 differences remain. The implementation intentionally adapts the selected concept into a responsive page while preserving its procurement-led hierarchy: product gallery, product summary, right-side requirement form, capability strip, tabbed details, model comparison, recommendation path, resource download, logistics, related solutions and RFQ.

## Required fidelity surfaces

- **Fonts and typography:** Plus Jakarta Sans display headings and Manrope body/UI copy preserve the bold technical hierarchy, uppercase labels and compact B2B rhythm of the visual source.
- **Spacing and layout rhythm:** The 1440 px view uses the selected three-zone hero and evenly spaced technical modules. At 390 px, the gallery, product copy and configurator stack with no horizontal clipping.
- **Colors and visual tokens:** Deep navy, technical blue, white, pale-blue requirement panels and the red RFQ action track the selected design. Main actions maintain high contrast.
- **Image quality and asset fidelity:** The supplied Jilong logo and local product/factory raster assets are used. No Geelung or Guolong mark appears. No invented certification or customer-logo asset was introduced.
- **Copy and content:** The exemplar is clearly labelled `PVC Ultrafiltration Membrane Housing`; parameter values are presented as replaceable product-template fields rather than certified product claims.
- **Interactions and accessibility:** The product navigation, catalog download, select controls, tabs, native FAQ disclosures and RFQ success state are interactive. Desktop checks confirmed `Specifications` shows `Technical Specifications`; `Save to RFQ` changes to `Saved for RFQ`. Console error count: 0.

## Responsive notes

- Desktop: 1440 px hero keeps product imagery, content and conversion card visible together; model comparison remains legible.
- Mobile: 390 px hero and configuration fields stack cleanly; product imagery stays contained and key copy remains readable.

## Follow-up polish

- Replace generated/sample product imagery with Jilong’s original product photo set when it is available.
- Connect the visible RFQ form to the chosen email/CRM workflow before using it for real lead capture.

**final result: passed**
