# BUGS

Scratch list of bugs found during the forge-ai migration (TAI-438). These are intentionally NOT fixed during the move; they are fixed in a dedicated phase afterward.

**This file is deleted before the PR is opened.**

<!-- Format: - [phase] path: description -->

- [F1] plugins/cem/branch-name.mjs: `getCurrentBranchName` uses `.split('/')[2]` on `.git/HEAD`, so `refs/heads/feat/x` yields `feat` (slashed branch names truncated). Same code exists in forge-rich-text-editor. Also breaks in git worktrees (`.git` is a file there).
- [F1] forge-ai tsconfig `include` pulled `src/dev` + `src/stories` into type-checking; stories move to packages/forge in F6 (not a bug, note for F3 cleanup).
- [F1] forge-ai `lint` was part of `build` (lit-analyzer + eslint + stylelint); split in F4.
- [F1] forge-ai `cem` script passed `--globs "src/lib/**/*.ts"` redundantly with config `globs`; dropped.
- [F1] forge-ai plopfile `demo` generator targets nonexistent `templates/demo` (dropped).
- [F1] forge-ai component test template used `@esm-bundle/chai`/`@open-wc/testing` (WTR); ported to Vitest browser style.
- [F1] forge-ai storybook template imported `@storybook/blocks` (should be `@storybook/addon-docs/blocks`) and `$lib/...` alias; fixed in ported template.
- [F1] plugins/eslint/no-forge-imports.mjs: forge suggestion message has a stray leading space and says "Use CSS-only components" while the rule blocks all `@tylertech/forge` subpaths.
- [F1] plugins/cem/member-deny-list.mjs: `/^\#|_/` denies any member containing `_` anywhere (not only a leading underscore).
- [F1] forge-ai src SCSS imports `@tylertech/forge/dist/*` (CSS-only component styles) in addition to `sass/*`; vitest importer only maps `sass/`, so `@tylertech/forge` must be built before tests/build once source lands (F4 migrates to forge-tokens).
- [F1/F6] templates/storybook: generated stories import `@tylertech/forge-ai/<name>`; needs an alias to the built package in packages/forge `.storybook/main.ts` (F6).
- [F5] package.json `test`: drop `--passWithNoTests` once tests land.
- [F4] tsconfig `moduleResolution: bundler` makes dts emit extensionless relative imports in `.d.ts`, which break node16/nodenext consumers; decide (explicit `.js` extensions vs. accept) in F4.
