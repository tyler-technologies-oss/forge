---
'@tylertech/forge-tokens': minor
---

The `theme.properties` and `theme.properties-dark` mixins now also emit `--forge-color-{hue}-{step}` custom properties for the 26 Radix accent hues (`gray` through `sky`) at the `a2`, `a3`, `a6`, `a11`, `a12`, `9`, `solid`, and `contrast` steps, with values for each theme. `solid` is step 9, except for hues whose step 9 doesn't reach WCAG AA with their contrast color, which use step 11 in the light theme and step 8 in the dark theme. Use `theme.color-variable($hue, $step)` to reference them, and `theme.$accent-hues` to loop over the hues.
