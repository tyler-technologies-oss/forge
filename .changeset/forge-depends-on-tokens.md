---
'@tylertech/forge': minor
---

The global design tokens and their Sass utilities now come from the new `@tylertech/forge-tokens` package, which is a new dependency. The `@tylertech/forge/sass/core/styles/*` modules (including `core/styles/tokens/*`) are deprecated. They continue to work and forward to the new package, but now warn at compile time and will be removed in the next major version. Import the equivalent modules from `@tylertech/forge-tokens/sass/*` instead, for example `@tylertech/forge-tokens/sass/theme`. The generated CSS is unchanged.
