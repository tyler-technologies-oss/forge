---
'@tylertech/forge-mcp': minor
---

feat(forge-mcp): serve Forge rules and guidance live from the docs site

The server now sends the Forge rules and workflow as MCP `instructions`, and the new `get_forge_guidance` tool returns component, design, and developer guidance pages, all fetched from tylerforge.design so docs changes reach users without a release. The `forge_mode` prompt includes the rules, and `generate_ui_plan` reads the subpath-only component list from the docs site.
