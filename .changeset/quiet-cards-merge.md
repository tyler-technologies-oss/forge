---
'@tylertech/forge-mcp': minor
---

Treat former `@tylertech/forge-extended` components as core Forge components. The bundled manifest and package discovery now only use `@tylertech/forge` (>=3.17.0), and side-effect imports point to `@tylertech/forge/<component>`.
