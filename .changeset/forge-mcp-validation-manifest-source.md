---
'@tylertech/forge-mcp': minor
---

feat(forge-mcp): show which `@tylertech/forge` version `validate_component_api` checked against

Validation results now name the package version and whether it came from the project's install, the latest published release, or the bundled snapshot. When an API is unmatched against an installed version, the response notes that it may have been added in a newer release, rather than presenting it as a typo.
