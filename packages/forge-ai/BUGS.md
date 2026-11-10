# BUGS

Triage of bugs and oddities found during the forge-ai migration (TAI-438). Every item is RESOLVED, WONTFIX, or moved to Follow-ups.

**Delete this file before the PR is opened, after the Follow-ups and Release follow-ups are turned into tickets.**

## RESOLVED

- [F1] `plugins/cem/branch-name.mjs`: `.split('/')[2]` truncated slashed branch names and `.git`-as-a-file (worktrees) was unsupported. Rewritten to read `GIT_BRANCH_NAME`, then `GITHUB_HEAD_REF`, then `GITHUB_REF_NAME`, then `.git/HEAD` (slashes preserved, worktree `gitdir:` followed), then `main`. Tests: `plugins/cem/branch-name.test.mjs` (including relative `gitdir:` and a `.git` file without `gitdir:`). The same plugin and tests were ported to `packages/forge` and `packages/forge-rich-text-editor` (both gained a `test:plugins` script).
- [F6] `branchName` was `feat` for `feat/TAI-438-...`. Storybook `CustomArgTypes` reads forge's `cem.branchName` (`packages/forge/src/stories/utils.ts`), not forge-ai's, so the AI docs GitHub links depend on the forge copy of the plugin; fixed by porting the plugin to `packages/forge` (and the rte).
- [F1] forge-ai `lint` was part of `build`; split in F4 (lint is a separate script, build is vite + cem only).
- [F1] `@tylertech/forge/dist/*` CSS imports remain by design; tests need `@tylertech/forge` and `@tylertech/forge-tokens` built first (CI builds before testing; see Follow-ups).
- [F5] `package.json` `test`: `--passWithNoTests` dropped once tests landed.
- [F4] tsconfig `moduleResolution: bundler` made dts emit extensionless relative imports; all relative imports now use `.js` and tsconfig is NodeNext.
- [F2/F3] SCSS `@tylertech/forge/sass/core/styles/*` deprecation: token imports moved to `@tylertech/forge-tokens/sass/*`. The 290 `if()` warnings came from a stale prebuilt `packages/forge/sass`, not forge-ai SCSS.
- [F5: convert] The 5 WTR tests were converted to Vitest and their exclusions removed.
- [F5] `ai-tool-call.test.ts` covers rendering, tag registration, in-place update, render function, scroll request, and canvas paths.
- [F7] `ai-voice-input` JSDoc referenced a nonexistent event type; fixed, and the JSX plugin now throws on unresolvable event detail types.
- [F1] `plugins/eslint/no-forge-imports.mjs`: the forge suggestion message had a stray leading space and said "Use CSS-only components" while the rule blocks all `@tylertech/forge` subpaths. Messages corrected.
- [F1] `plugins/cem/member-deny-list.mjs`: `/^#|_/` denied any member containing `_`. Now `/^[#_]/` (leading `#` or `_` only). Tests: `plugins/cem/member-deny-list.test.mjs`.
- [F6/F7] `forge-ai-tool-data-table` and `forge-ai-tool-steps` were `@internal` yet exported from the public `/tools` subpath. Decision: public. `@internal` removed; both are in the CEM and `dist/jsx.d.ts` intentionally.
- [F6] `forge-ai-paginator` had no `@tag` and fired un-namespaced `page-change`. Added `@tag`/JSDoc, renamed the event to `forge-ai-paginator-page-change` with the exported `ForgeAiPaginatorPageChangeEventData` type, updated the data-table listener and story. Tests: `tools/ai-paginator/ai-paginator.test.ts`, `tools/ai-data-table/ai-data-table.test.ts`. Breaking, listed in MIGRATION.
- [F6/F7] `forge-prompt-button` lacked the `forge-ai-` prefix. Renamed to `forge-ai-prompt-button` (class `PromptButtonComponent` and `PromptButtonComponentTagName` already follow the nested-component convention, like `ReasoningContentComponent`). It is now re-exported from the `ai-prompt` index, so `import '@tylertech/forge-ai/ai-prompt'` registers it and the story no longer needs the nested subpath. Test: `ai-prompt/prompt-button/prompt-button.test.ts`. Breaking, listed in MIGRATION.
- [F6/F7] `forge-ai-overlay` summary said "for internal use" although it is exported from `/core` and in the manifest. Reworded.
- [F3/F6] Composition wording in primitives: `ai-sidebar` resize label, `ai-dialog` drag handle label, `ai-fab` default label, and the data-table CSV filename fallback now use neutral wording (`Resize sidebar...`, `Move dialog`, `Open AI assistant`, `data-table`). Tests: `ai-sidebar.test.ts`, `ai-dialog.test.ts`, `ai-fab.test.ts`, `ai-data-table.test.ts`. Listed in MIGRATION under "Changed defaults".
- [F6] `DropdownMenuSelectionMode` (and `DropdownChangeEventDetail`) were not exported from the `ai-dropdown-menu` index. Now exported.
- [F6] `ai-sidebar`/`ai-dialog`/`ai-chain-of-thought` stories used global `document.querySelector`, so they targeted the first instance on a docs page. Now use `createRef`/`ref` (or `closest` / `event.currentTarget`).
- [F7] Untyped events. `@event`/`@fires` entries lacked a detail type or were missing: `ai-sidebar` (open/close/resize), `ai-chat-header` (expand/minimize/clear/export, plus the previously undocumented agent-change and conversations-toggle), `ai-agent-selector` (change), `ai-prompt` (command, context-remove), `ai-file-picker` (error), `ai-dropdown-menu` (change/open/close; the literal `eventName` manifest entry is gone because the dispatch no longer uses a variable event name), `ai-context-items` (remove, new `ForgeAiContextItemsRemoveEventData`), `ai-threads-search` (new-chat), `ai-tool-call` (scroll-request). `ForgeAiPromptContextRemoveEventData` is also new. JSX handlers with a bare `CustomEvent` went from 17 to 0 (83 event handlers total).
- [F2] `word-break: break-word` replaced with `overflow-wrap: anywhere` in `ai-tool-call-indicator.scss`. Verified in a browser test that a 1500 character unbroken string wraps inside a 300px container without horizontal overflow. Test: `ai-tool-call-indicator/ai-tool-call-indicator.test.ts`.
- [F7] Un-namespaced bubbling `toggle` event on `forge-ai-reasoning-header` collided with the native popover `toggle` event: `forge-ai-dialog` (`<dialog popover @toggle>`) and `forge-ai-overlay` read `event.newState` (undefined) and closed themselves when a reasoning header inside them was clicked. Renamed to `forge-ai-reasoning-header-toggle` (typed `ForgeAiReasoningHeaderToggleEventData`), `forge-ai-reasoning`/`forge-ai-chain-of-thought` listeners updated, and the dialog and overlay native-toggle handlers now ignore events whose target is not their own popover element. Tests: `ai-reasoning-header.test.ts`, `ai-dialog.test.ts`, `core/overlay/overlay.test.ts`. Audit of other bubbling CustomEvents with native names: none remain (`forge-ai-prompt` no longer re-dispatches a synthetic `input`; see the `ai-prompt` input entry below). Listeners on native names in primitives: `@toggle` (dialog, overlay; now guarded), `@change`/`@input` on native inputs inside shadow roots (not affected, internal elements).
- [F3] `--forge-ai-chatbot-icon-color` CSS custom property on `forge-ai-icon`: added `--forge-ai-icon-color` with the old name as a fallback; the old one is deprecated in MIGRATION. Test: `ai-icon/ai-icon.test.ts`.
- [F4] plop component template and `plopfile.mjs` index template emit `.js` extensions.
- [F9 review/F10] `ai-prompt` dispatched `input` twice per keystroke (the native, composed textarea `input` escaping the shadow root, plus an explicit `Event('input')` re-dispatch from `_handleInput`). Confirmed with a test (2 events per keystroke, 6 for 3 typed characters). The re-dispatch is removed; the native `InputEvent` (with `inputType`/`data`) is now the only host `input` event, and `value` is already updated when it reaches host listeners. Tests: `ai-prompt/ai-prompt.test.ts`. No in-repo or foundry-chatbot consumer listens for `input` on `forge-ai-prompt`. Listed in MIGRATION.
- [F9 review/F10] The overlay and dialog toggle-guard tests used a fixed 50ms `setTimeout`. Replaced with `updateComplete` plus two `requestAnimationFrame` waits (`settle`). Verified the plain-`toggle` tests still fail (3/3 runs) with the `event.target !== event.currentTarget` guard removed from both components.
- **HIGH** Security: `renderMarkdown`/`renderInlineMarkdown` kept `style` attributes and remote images (UI redress, data exfiltration). Fixed by porting forge-ai#134.

## WONTFIX

- [F1] tsconfig `include` pulled `src/dev` + `src/stories` into type-checking: not a bug; stories moved to `packages/forge` and the include is gone.
- [F1] `cem` script passed a redundant `--globs`: dropped, nothing to fix.
- [F1] plopfile `demo` generator targeted a nonexistent template: dropped, nothing to fix.
- [F1] Component test template used `@esm-bundle/chai`/`@open-wc/testing`: ported to Vitest, nothing to fix.
- [F1] Storybook template used `@storybook/blocks` and a `$lib` alias: fixed in the ported template, nothing to fix.
- [F5] `@esm-bundle/chai`, `@open-wc/testing`, `sinon` unused: none were ever in `package.json`.
- [F3] `dist/utils/index.mjs` cannot be imported in plain Node (`DOMPurify.addHook is not a function`): the module is browser-only by design.
- [F3] `ai-tool-call/index.ts` re-exports the canvas helpers (`resolveToolCanvas*`, `createToolCanvas`, `toolCanvasHostContext`). Intentional: `@ai-foundry/chatbot` composition needs them. Documented in MIGRATION.
- [F6] `stories/utils.ts` merged `forgeTypes` lets shared type names (`TooltipPlacement`, `OverlayPlacement`, `HeadingLevel`, `DragController`) link to forge's source on AI pages (forge wins name clashes). Cosmetic, docs-only.
- [F6] `stories/blocks/CustomArgTypes.tsx` GitHub links for forge and rte components previously omitted the package directory; the per-manifest `packagePath` fixes them as a side effect. Nothing to fix.
- [F7] `@wc-toolkit/jsx-types` evaluated and rejected in favor of the in-house `plugins/cem/jsx-types.mjs` generator: its `ref` is callback-only, `style` rejects `React.CSSProperties`, DOM event props are off by default, it emits `declare module` blocks for unrelated frameworks and a global `JSX`, and it imports types from modules that do not export them.
- [F7] Root `package.json` `pnpm.overrides` pins `@types/react-router-dom>@types/react` to 17.0.93: required so adding `@types/react@19` to forge-ai does not re-resolve forge-react's transitive types. The unmet-peer warnings (reactify-wc, angular skew) pre-date this work.

## Follow-ups

Suggested owner in parentheses.

- No Storybook stories exist for ai-assistant-response, ai-canvas, ai-confirmation-prompt, ai-context-chip, ai-context-items, ai-copy-button, ai-edit-thread, ai-file-picker, ai-slash-command-menu, ai-spinner, ai-thread-actions-menu, ai-tool-call. None existed in the source repo either. (forge-ai team, docs ticket)
- Test coverage is intentionally thin; full primitive coverage and enforced thresholds are TAI-439. (TAI-439)
- CDN packaging: the old repo's `ci:package` tarred `cdn-deployment/@tylertech/forge-ai` for CDN upload, and the CDN `forge-ai-button` item belongs with that. Nothing in this repo reproduces it. Decide with foundry whether a CDN bundle is still needed. (foundry / release engineering)
- forge-ai SCSS still imports `@tylertech/forge/sass/core/styles/scrollbar` (14 files, `forge-scrollbar.base`). It is not deprecated but has no forge-tokens equivalent (forge-tokens has no scrollbar module). Revisit if forge deprecates it. (forge core / forge-tokens, next major)
- Forge's own build emits `Deprecated @warn` from `core/styles/tokens/*` (for example via breadcrumb). Out of scope for forge-ai. (forge core)
- vitest cannot map `@tylertech/forge-tokens/sass/*` to sources because `sass/` is generated and gitignored, so forge-ai tests require forge-tokens and forge to be built. There is no turbo dependency for `test` (matches every other package; CI runs build then test), so on a fresh clone run the root `pnpm build` (or `pnpm turbo run build --filter=@tylertech/forge-ai...`) first. Consider a source mapping or a `pretest` step. (forge-tokens / build tooling)
- Pre-existing turbo races (not introduced here): `forge-schematics#test` runs `pnpm run build && vitest run`, which rewrites `dist/` while a concurrent `forge-schematics#build` does the same; `forge-tokens#test` reads generated `sass/` output but has no build dependency, so it can race with a concurrent `forge-tokens#build` (which `rm`s `sass/` first). Both are only safe because CI runs build before test. (forge core)
- Forge types win name clashes when merged with forge-ai types in the docs (`HeadingLevel`, `TooltipPlacement`, ...). Namespace the maps per package if AI-specific type links matter. (forge docs)
- `npm deprecate @tylertech/forge-ai-react` after `@tylertech/forge-ai@0.16.0` publishes (outside this repo). `@tylertech/forge-ai-react` is currently at 0.15.1 on npm. (release engineering)
- Vitest 5 is available (forge-ai and the other packages stay on `^4.1.x`). Bump `vitest`, `@vitest/browser`, `@vitest/browser-playwright` and `@vitest/coverage-v8` monorepo-wide in one pass rather than in a single package. (forge core / build tooling)
- `typescript-eslint` (`^8.58.0`, newest 14-day-old release 8.72.0) and `@types/react` (19.2.14, newest eligible 19.3.0) are behind. Pinning them in forge-ai alone re-resolves eslint plugin peers and radix/inspector `@types/react` copies across the monorepo, so bump both monorepo-wide. (forge core)

## Release follow-ups

Findings from reviewing `.github/workflows/*` for forge-ai. No workflow files were changed.

1. **Publishing works as is.** `changesets.yml` runs `pnpm run version-packages` and `pnpm run release` (`pnpm run build && changeset publish`). The root build covers forge-ai, and `publishConfig.access` is `public`. Confirm that `FORGE_NPM_TOKEN` has publish rights to the existing `@tylertech/forge-ai` package, which was published from the old repo with its own token.
2. **Planned version.** `pnpm changeset status` plans `@tylertech/forge-ai` 0.15.2 to 0.16.0 (minor).
3. **Storybook docs are not redeployed for a forge-ai-only release.** `deploy-storybook-forge.yml` only deploys when a `@tylertech/forge@` tag points at HEAD (or on manual `workflow_dispatch`). A forge-ai-only release leaves `forge.tylerdev.io/forge/v3` stale even though the AI docs are built from forge-ai's `dist`. Either also match `^@tylertech/forge-ai@` (and `forge-tokens`, `forge-rich-text-editor`) in `detect-release`, or run the deploy manually. The first 0.16.0 release will redeploy only because forge changesets (`forge-depends-on-tokens`, `forge-ai-stylesheet`) are also pending.
4. **Storybook PR previews ignore forge-ai.** `storybook-preview-forge.yml` (and its cleanup) trigger on `paths: packages/forge/**`, so a PR that only touches `packages/forge-ai/**` gets no preview. Add `packages/forge-ai/**` (and `packages/forge-tokens/**`).
5. **CDN deploy is forge-only.** `changesets.yml` syncs `packages/forge/cdn/` to S3 only when a forge tag is present. If foundry or consumers load forge-ai from a CDN, a forge-ai artifact and a tag-gated step are needed; otherwise drop the requirement.
6. **Teams notification** (`post-release-to-teams.yml`) matches any `@tylertech/*` tag at HEAD, so forge-ai releases are covered. Release notes come from the GitHub release `changesets/action` creates per package.
7. **PR build** (`build.yml`) runs root `format:check`, `lint`, `build`, `test` in the Playwright 1.59.0 container, which matches the vitest browser tests. `paths-ignore` skips `.changeset/**`, `docs/**`, `blocks/**`. No forge-ai change needed.
8. **Archive the old repo** after 0.16.0 publishes, and make sure its `deploy.yml` (publishes docs to `gh-pages` under `docs/v1`) cannot run again. Its Storybook becomes stale; point to the new docs in the archived README.
9. **Dependency review** (`dependency_enforcement.yml`) fails on high severity advisories in runtime and development scopes. Confirm on the PR that the new `@types/react` and `@lit/context` entries pass.
