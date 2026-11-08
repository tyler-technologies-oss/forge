# Forge AI

Lit-based presentational Web Components for AI chat interfaces, published as `@tylertech/forge-ai`.

## Purpose and boundary

This package contains **presentational primitives only**: messages, prompts, tool-call indicators, dialogs, sidebars, canvases, and similar building blocks, plus the small controllers and utilities they need.

It does **not** contain composition or chat logic. There is no chatbot element, no agent adapter or runner, no message state engine, and no form factors (floating, sidebar, launcher). That layer lives in `@ai-foundry/chatbot` (the `foundry-chatbot` repo), which composes these primitives. Do not add chat orchestration here.

Source was migrated from the standalone `tyler-technologies-oss/forge-ai` repo. See `MIGRATION.md` for what changed and `BUGS.md` for bugs found during the move (deleted before the PR).

## Commands

```bash
pnpm --filter @tylertech/forge-ai build     # rimraf dist, Vite library build, custom elements manifest
pnpm --filter @tylertech/forge-ai test      # Vitest browser mode (headless Chromium)
pnpm --filter @tylertech/forge-ai lint      # tsc --noEmit + eslint + stylelint
pnpm --filter @tylertech/forge-ai cem       # regenerate custom-elements.json
pnpm --filter @tylertech/forge-ai plop      # scaffold a new component
```

Storybook lives in `packages/forge`; this package has no Storybook of its own. See [Storybook](#storybook).

## Architecture

- **Lit web components** with TypeScript. Components extend `LitElement` and use decorators (`@customElement`, `@property`). `experimentalDecorators` is on and `useDefineForClassFields` is off.
- **Vite library build** (not rollup like the rich text editor). Entries are every `src/lib/**/index.ts`, modules are preserved under `dist/`, and all non-relative imports are externalized. Types come from `vite-plugin-dts`.
- **Exports**: `.` is the root barrel and `./*` maps to `dist/*/index.mjs`, so each component folder is a subpath (`@tylertech/forge-ai/ai-prompt`).
- **Custom Elements Manifest** is generated into `custom-elements.json` by `@custom-elements-manifest/analyzer` with plugins in `plugins/cem/`.

### Component structure

```
src/lib/[component-name]/
├── [component-name].ts           # Component class
├── [component-name].scss         # Styles (imported ?inline)
├── [component-name].test.ts      # Tests
└── index.ts                      # Exports
```

- Tag names follow `forge-[component-name]`.
- Styles are imported as `?inline` and applied with `unsafeCSS()`.
- New components must be exported from `src/lib/index.ts`. Plop handles this through the `// -- EXPORTS PLACEHOLDER (DO NOT REMOVE) --` marker, so never remove that line.
- Define component dependencies in static blocks.
- Use `pnpm --filter @tylertech/forge-ai plop component` to scaffold.

## Import rules

- **Never import runtime code from `@tylertech/forge`, `@tylertech/forge-core`, or `@tylertech/tyler-icons` in component TypeScript.** The `custom/no-forge-imports` ESLint rule (`plugins/eslint/`) enforces this for `src/lib/**/*.ts`. This package uses Forge only at build time (SCSS), so consumers need no Forge JS to use it. There is deliberately no peer dependency on `@tylertech/forge`.
- **Icons**: always inline `<svg>` in templates. Never use `<forge-icon>` inside component templates.
- **SCSS**: use `@use '@tylertech/forge-tokens/sass/<module>'` (spacing, theme, typography, shape, elevation, animation, border, ...). The old `@tylertech/forge/sass/core/styles/*` paths are deprecated. Never use `@use '@tylertech/forge-core/styles'`.
- `ifDefined` comes from `lit/directives/if-defined.js`.
- Slots: use `@queryAssignedNodes()` or `@queryAssignedElements()` for slotted content.

## Code conventions

- Always put return types on methods and functions.
- Always use `public`, `private`, or `protected` on class members.
- Use `#` private members for anything that does not carry a Lit decorator.
- Always use braces on `if` statements, even single-line.
- Prefer modern syntax: optional chaining, nullish coalescing, arrow functions, template literals.
- Prefer a config-object parameter for functions with multiple or optional parameters.
- Reference sibling components to decide on `readonly`, getters, and `#private` usage.
- If a feature could serve several components, build it as a utility or mixin in `src/lib/utils/`, or as a Lit reactive controller if it needs the Lit lifecycle.

### Styling

- Never use inline `style` on elements. Use classes and define styles in the component SCSS, or reuse an existing component.
- Always use Forge color tokens for color and spacing tokens for gap, padding, and so on.
- Use logical properties for margins and spacing: `margin-inline-start`, `margin-block-end`, etc.

### Properties

- Boolean properties that reflect default to `false`: `@property({ type: Boolean, reflect: true }) public myProp = false;`. They are turned on by setting the attribute without a value (`<forge-x my-prop>`).
- Name booleans positively (`has-header`, `enable-feature`), never negatively (`no-header`, `disable-feature`).
- When adding a property, event, or slot, update the component's JSDoc, add a Storybook control for each new property or slot, and update the MDX docs (in `packages/forge`). Do not document slots by hand in docs; they are generated from code.

### Storybook

Stories live in `packages/forge/src/stories/ai/<component-name>/` (`<Name>.stories.ts` + `<Name>.mdx`), alongside the rest of forge's Storybook. Titles are `AI/<Name>` (no `Ai` prefix). `AI/Introduction` is the section landing page.

- Run: `pnpm storybook:forge` from the repo root (or `pnpm turbo run storybook --filter=@tylertech/forge`). Build: `pnpm turbo run build:storybook --filter=@tylertech/forge`.
- forge cannot depend on forge-ai (forge-ai devDepends on forge, turbo rejects the cycle), so `packages/forge/.storybook/main.ts` aliases `@tylertech/forge-ai` and `@tylertech/forge-ai/*` to the **built** `packages/forge-ai/dist`. The `storybook` and `build:storybook` turbo tasks depend on `@tylertech/forge-ai#build`. After changing component source, rebuild this package (`pnpm --filter @tylertech/forge-ai build`) to see it in a running Storybook.
- Docs tables (`CustomArgTypes`) read `custom-elements.json`. `packages/forge/src/stories/utils.ts` merges the forge, rich-text-editor, and forge-ai manifests, so `cem` must have been run here (the build does it).
- Stories import from public subpaths only (`@tylertech/forge-ai/<component>`, `/types`, `/utils`, `/tools`), never `src/`. Forge components used in stories come from `@tylertech/forge/<component>` side-effect imports.
- Stories must be primitive-only: static data, no chatbot, agent adapters, or form factors (that lives in `@ai-foundry/chatbot`).
- Scaffold: `pnpm --filter @tylertech/forge-ai plop story <component-name>` (or `plop component`, which asks about a story). It writes `<Name>.stories.ts` and `<Name>.mdx` to `packages/forge/src/stories/ai/<component-name>/` with title `AI/<Name>`.
- Actions: `import { action } from 'storybook/actions';` (not `@storybook/addon-actions`).
- MDX: `import { Meta, Title, Canvas } from '@storybook/addon-docs/blocks';` and `import CustomArgTypes from '../../blocks/CustomArgTypes';` (not `@storybook/blocks`).
- Do not add `tags: ['autodocs']` to a CSF file that has an MDX page; Storybook 10 errors on that combination.

### Template reactivity: `readonly` vs `get`

Use `readonly` for static templates or those that only use bound properties. Use a getter for any template that depends on component state or computes content, otherwise it will not re-render.

```typescript
readonly #header = html`<h1>Static Title</h1>`;

get #threadList(): TemplateResult {
  return html`<ul>${this.threads.map(thread => html`<li>${thread.title}</li>`)}</ul>`;
}
```

A template that embeds a getter must itself be a getter.

### Conditional content via slots

Prefer slots with `@queryAssignedNodes` over boolean properties to show or hide optional wrappers:

- Query slotted nodes: `@queryAssignedNodes({ slot: 'name', flatten: true })`.
- Always render the slot itself, but only render its wrapper when the slot has content (`when()` with `slottedNodes.length > 0`, `nothing` for the else case where nothing should render).
- Add `@slotchange` handling that calls `requestUpdate()`.

```typescript
get #conditionalContent(): TemplateResult {
  return when(
    this._slottedNodes.length > 0,
    () => html`<wrapper-element>${this.#contentSlot}</wrapper-element>`,
    () => html`${this.#contentSlot}`
  );
}
```

Good for optional buttons, actions, and sections. See `ai-confirmation-prompt` and similar components for reference.

## Testing

Vitest browser mode in real Chromium, matching `packages/forge-rich-text-editor`. Tests are `src/lib/**/*.test.ts`.

- Use `renderFixture<T>(template, tagName)` from `src/testing/fixture.ts`. It renders via `vitest-browser-lit` and awaits the element's first `updateComplete`. Do not call `render()` directly (it is synchronous, so shadow DOM may be empty at assertion time).
- Use Vitest `expect`, `vi.fn`/`vi.spyOn`. No chai, sinon, or `@open-wc/testing`.
- Do not access private members in tests; assert through the public API.
- Assert effects, not attributes.
- Relative imports in tests and source need `.js` extensions (NodeNext resolution).
- `vitest.config.ts` maps `@tylertech/forge/sass/*` to forge source. `@tylertech/forge` (CSS under `dist/`) and `@tylertech/forge-tokens` (generated Sass) must still be built: the root `turbo.json` entry `@tylertech/forge-ai#test` depends on `@tylertech/forge-tokens#build` and `@tylertech/forge#build`, so run tests through turbo (`pnpm turbo run test --filter=@tylertech/forge-ai`) on a fresh clone.
- No coverage thresholds are enforced. Tests are intentionally thin for now: only the `ai-tool-call` module and a few components (steps, tools/ai-steps, artifact card/group, tool canvas) are covered. Full primitive coverage and thresholds are tracked in TAI-439.
- Every new feature gets a test. Do not update existing tests unless the task requires it.
