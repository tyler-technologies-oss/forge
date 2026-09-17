---
'@tylertech/forge': minor
'@tylertech/forge-angular': minor
---

Added i18n slots/labels to `forge-theme-toggle` and synced its state with OS `prefers-color-scheme` changes. Added a `groupAriaLabel` property on `forge-theme-toggle` and a `themeToggleAriaLabel` pass-through on `forge-user-profile`, along with `theme-toggle-title`/`theme-toggle-light-label`/`theme-toggle-dark-label`/`theme-toggle-system-label` slots for translating the embedded theme toggle. Regenerated the Angular wrappers to expose the new inputs.
