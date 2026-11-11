---
'@tylertech/forge': minor
---

State layers no longer show a ripple by default. Pressing an element now shows a flat pressed overlay across the element, which fades in over `--forge-state-layer-pressed-duration` and stays for at least 225ms. To keep the ripple, set the new `ripple` attribute on a `forge-state-layer`, or turn it on for every state layer with `window.TylerForgeGlobalConfiguration = { 'forge-state-layer': { ripple: true } }`. The ripple is not shown when the user prefers reduced motion.
