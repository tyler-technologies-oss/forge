---
'@tylertech/forge-tokens': minor
---

Added `brand` color primitives alongside the Radix scales, matching Figma: `brand.9` (#283593 in light, slate 3 in dark), `brand.contrast` (white), and `brand.surface` (#F3F8FF at 80% in light, #111B43 at 50.2% in dark). The `brand` and `on-brand` theme tokens now use them, so no theme token references the legacy palette. The resolved colors are unchanged.
