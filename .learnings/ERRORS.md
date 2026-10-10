## [ERR-20261010-001] browser-policy-unavailable

**Logged**: 2026-10-10T00:00:00+08:00
**Priority**: low
**Status**: pending
**Area**: browser

### Summary
Browser automation could not load its request-header policy while validating a local product-page update.

### Error
```text
Unable to load browser request-header policy.
```

### Context
- Task attempted: visually validate the new construction protective tarpaulin product sheet.
- Fallback verification: local product page and image asset both returned HTTP 200.

### Suggested Fix
Retry visual validation after the browser automation service is available; do not treat this as a site rendering failure.

### Metadata
- Reproducible: unknown
- Related files: src/site-pages/ProductPage.jsx, src/site-pages/product-sheet.css
- Tags: browser, visual-qa, local-preview
