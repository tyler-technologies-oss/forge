---
'@tylertech/forge-tailwind': minor
---

feat: generate the color utilities from every Forge theme color token, adding `text-on-*`, `bg-{role}-subtle` and `-default`, `border-{role}-subtle` through `-strongest`, `ring-focus-indicator`, `outline-focus-indicator`, `bg-categorical-*` and the newer surfaces. `text-success`, `text-error`, `text-warning` and `text-info` now use the readable status text colors (4.5:1 or better), and `text-critical` and `text-informational` are new aliases. The secondary and tertiary utilities are kept but deprecated.
