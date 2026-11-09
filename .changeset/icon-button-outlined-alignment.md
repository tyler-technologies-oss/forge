---
'@tylertech/forge': patch
---

fix(icon-button): align the outlined variant with the outlined button. Themed outlined icon buttons use the `{theme}-container-minimum` background, `on-{theme}-container-minimum` icon, and `border-{theme}-default` border. The default outlined icon button uses the new `outlined-icon-color` token (`text-medium`) and a `border-neutral-default` border. `outlined-border-color` no longer follows `icon-color`, so set `--forge-icon-button-outlined-icon-color` and `--forge-icon-button-outlined-border-color` to recolor an outlined icon button.
