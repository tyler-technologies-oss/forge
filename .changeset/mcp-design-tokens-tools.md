---
'@tylertech/forge-mcp': minor
---

Generate design token docs from the `design-tokens.json` manifest. `get_design_tokens` now accepts any manifest category and a `query` to search token names, descriptions, and values. The new `validate_tokens` tool checks the `--forge-*` tokens used in generated code. `forge://design-tokens/{category}` resources now follow the manifest's categories, so theme colors are split into `primary`, `surface`, `text`, `error`, and so on.
