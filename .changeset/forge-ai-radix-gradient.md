---
'@tylertech/forge-tokens': minor
'@tylertech/forge': patch
---

AI styles now use the Radix plum and iris palette through the new `ai-gradient-start` and `ai-gradient-end` theme tokens, so they follow the light and dark themes. The field background is the surface color at 85% over the gradient, the field's own outline draws over the gradient instead of a separate gradient ring, and invalid fields keep the AI glow around their error outline.
