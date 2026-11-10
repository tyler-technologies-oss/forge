---
'@tylertech/forge': patch
---

The app bar now re-themes its content with Radix white and black alpha steps instead of Material emphasis opacities, using the same steps as the main theme: a12 for high text and outlines, a9 for medium text, a10 and a8 for medium and default outlines, and a6 for low text and outlines. Medium text now passes WCAG AA on the light app bar (5.98:1, was 4.19:1). The app bar also provides `outline`, and the label and border colors text and outlined buttons use, so buttons without `theme="app-bar"` read light on the app bar again.
