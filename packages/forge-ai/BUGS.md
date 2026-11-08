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
- [F2] src/lib/ai-tool-call-indicator/ai-tool-call-indicator.scss: `word-break: break-word` is deprecated (stylelint error under forge's rules); replaced with `overflow-wrap: anywhere` (minor behavior difference: affects min-content sizing). Verify visually.
- [F2/F3] all source: `@tylertech/forge/sass/core/styles/*` and `@tylertech/forge/dist/*` SCSS imports still in place (290 Sass `if()` deprecation warnings during build, none are errors). F4 migrates.
- [F3] ai-tool-call-indicator/ai-message-thread/ai-assistant-response import `forge-ai-tool-call` via side-effect imports; `ai-tool-call/index.ts` also re-exports the canvas helpers `resolveToolCanvas*`/`createToolCanvas`/`toolCanvasHostContext` (previously internal to ai-chatbot). Needed by the foundry composition layer; widen/narrow in review.
- [F3] ai-sidebar.ts aria-label "Resize chatbot panel...", ai-dialog.ts aria-label "Move chatbot", ai-fab.ts default label "Launch chatbot", ai-data-table.ts CSV filename fallback 'chatbot-data-table': composition-flavored user-facing strings left unchanged (behavior). Consider neutral wording.
- [F3] `--forge-ai-chatbot-icon-color` CSS var (ai-icon.scss) kept as public styling API despite the chatbot name.
- [F3] dist `utils/index.mjs` cannot be imported in plain Node (`DOMPurify.addHook is not a function` outside a browser); browser-only module, expected.
- [F5: convert] 5 WTR tests excluded by explicit file list from tsconfig, eslint (`wtrTests` in eslint.config.js), and vitest (`exclude`): ai-steps, ai-artifact-card, ai-artifact-card-group, tools/ai-steps, ai-tool-call/tool-canvas. Remove those entries when converting.
- [F3/foundry] `tools/ai-steps/ai-steps.test.ts` had its `displayStepsTool` definition test removed; that test must land in foundry together with the `displayStepsTool` definition.
