---
'@tylertech/forge-tokens': patch
---

`surface-transparent` now aliases the palette color (white in light, slate 1 in dark) and sets its opacity through `$extensions["com.tylertech.forge"].alpha`, which the build applies. The generated values are unchanged.
