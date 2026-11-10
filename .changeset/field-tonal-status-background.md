---
'@tylertech/forge': patch
---

Invalid and warning tonal fields now use the `control-bg-tonal-error` and `control-bg-tonal-warning` backgrounds (red and amber a2) instead of the step 3 error and warning containers, a lighter tint of the same hue since the border, status icon, and support text already carry the state. This applies to the field component and the CSS-only `.forge-field--tonal`.
