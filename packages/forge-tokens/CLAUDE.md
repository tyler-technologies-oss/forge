# Forge Tokens

The global design tokens (JSON, design tokens format) and the Sass utilities that consume them. Published as `@tylertech/forge-tokens`; consumed by `@tylertech/forge`.

## Structure

- `tokens/` - Source of truth. DTCG-style JSON (`$value`, `$type`) consumed by Style Dictionary. Published as-is.
- `src/sass/` - Hand-written Sass modules (`theme`, `typography`, `spacing`, `utils`, ...). Copied to `sass/` on build.
- `scripts/` - The build. `build-sass.js` configures Style Dictionary, `sass-format.js` is the custom Sass format.
- `sass/` - Build output (gitignored): `src/sass/` plus the generated `sass/tokens/_*.scss` files.
- `dev/` - Vite app that renders every token (not published). It compiles the real Sass modules for its styles and reads `tokens/**/*.json` for names and values.
- `test/` - Vitest tests for the format, the JSON, and the compiled Sass.

## Rules

- Change token values in `tokens/**/*.json`, never in `sass/tokens/` (generated).
- Only global tokens belong here. Component tokens stay in `packages/forge/src/lib/core/styles/tokens/<component>`.
- The compiled CSS from the Sass modules must not change unless the change is intentional. When refactoring, compile the forge stylesheets before and after and diff them.
- A new Sass module directory needs an explicit entry in `package.json` `exports` (`"./sass/<name>": "./sass/<name>/index.scss"`), because Vite cannot resolve a directory import through the `./sass/*` pattern.
- Tokens reference each other with `{group.token}`. The light and dark themes (`tokens/theme/*.json`) must define the same token names.
- Generated map keys come from the token path below the `root` configured in `scripts/build-sass.js`. Renaming a token in JSON renames its Sass map key and its CSS custom property.

## Commands

```bash
pnpm build   # Generate sass/
pnpm test    # Builds, then runs Vitest
pnpm lint
pnpm dev    # Builds, then serves the dev app
pnpm dev:build
```
