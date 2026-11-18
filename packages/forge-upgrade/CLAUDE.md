# Forge Upgrade

CLI (`forge-upgrade`) that upgrades projects using Tyler Forge™. Root conventions (pnpm, turbo, conventional commits, changesets) apply; see the root CLAUDE.md. This package was migrated from the standalone `forge-upgrade` repo, which used `auto` for releases; releases are now driven by changesets like every other package.

## Architecture

Plain ESM/CJS JavaScript with no build step — the files in the repo are the files that get published.

- `index.mjs` — CLI entry (`bin`). Parses args with yargs, loads a configuration, runs replace operations, then migrations. `CONFIGURATION_MIGRATION_MAP` maps a configuration name to the migrations to run per file type (`html`, `jsx`, `js`, `json`).
- `migration-utils.mjs` — runners for each migration type (posthtml for HTML, jscodeshift for JS/TS/JSX/TSX, plain functions for JSON).
- `configurations/*.json` — named configurations. `operations` are regex find/replace rules applied via `replace-in-file`; `once` operations only run on the first upgrade of a project.
- `migrations/html/**/*.mjs` — posthtml transforms.
- `migrations/{js,jsx}/**/*.cjs` — jscodeshift transforms. These must stay CommonJS because jscodeshift loads them with `require()`.
- `migrations/json/**/*.cjs` — `package.json` rewrites.

To add a migration: create the transform under `migrations/`, then register it in `CONFIGURATION_MIGRATION_MAP` in `index.mjs` (and add replace operations to a `configurations/<name>.json` if needed). Document new configurations in the README's table.

## Quirks

- The `files` field in `package.json` lists the runtime `.mjs` files explicitly so config files like `eslint.config.mjs` are not published. Add new top-level runtime files there.
- `--help` is handled by yargs' built-in help before the custom usage text runs, so the custom text only shows with `--usage`.

## Testing

Vitest in the Node environment (`test/**/*.test.js`). Tests run the real CLI against a temp project directory with `--no-replace` (replace operations prompt on stdin), and assert on the resulting files through the public CLI interface.

## Commands

```bash
pnpm run --filter @tylertech/forge-upgrade test          # Vitest
pnpm run --filter @tylertech/forge-upgrade lint          # ESLint
pnpm run --filter @tylertech/forge-upgrade format        # Prettier
node packages/forge-upgrade/index.mjs --path <dir> --configuration <name> --dry-run
```
