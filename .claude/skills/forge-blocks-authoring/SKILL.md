---
name: forge-blocks-authoring
description: This skill should be used when the user asks to "create a block for X", "turn the storybook demo into a block", "make blocks for the migrated component", or otherwise discusses adding an entry to the `blocks/` package (the pre-built HTML/CSS/TS gallery of Forge component patterns) based on a component's Storybook stories.
---

# Forge Blocks Authoring

Convert a component's Storybook story into a standalone, copy-paste-ready block in the root-level `blocks/` package. Read `blocks/README.md` first — it documents the folder structure and build pipeline; this skill covers the parts that aren't obvious from reading it alone.

## Locating source material

- Stories live at `packages/forge/src/stories/components/<name>/<Name>.stories.ts` (and `.mdx`). Read the actual story `render` + `args`, not just the MDX prose — MDX can lag behind story renames.
- Check the component's `-constants.ts` for real accepted attribute/property values before copying a story's `args`. Stories carried over from `forge-extended` sometimes have stale arg values that don't match the current type union (e.g. an arg using a mode value that was renamed during migration) — trust the type definition, not the story.

## Where a block goes

`blocks/src/blocks/<category>/<block-name>/<block-name>.html`, optionally with a sibling `.ts` (interactivity) and/or `.css` (extra styles) of the exact same base name.

- A single component's usage examples go under `components/<component-name>/<variant>/`. `<variant>` is `demo` for the primary/default story, otherwise a short kebab-case name matching the story's purpose (e.g. `inline`, `css-only`, `dismissible`).
- Full-page shells (app bar + drawer + content, etc.) go under `application-layout/` instead, as standalone named templates — they don't nest under a `components/app-layout/` folder and don't need to map 1:1 to stories.
- Before creating anything, check whether the category/component folder already has blocks (`ls blocks/src/blocks/components/<component-name>`) — don't duplicate existing coverage.

## Required metadata header

Every block HTML file starts with a comment; `pnpm generate-manifest` (run from `blocks/`) parses it and warns on anything missing:

```html
<!--
  @block Component — Variant
  @type component
  @description One sentence describing the pattern, written for someone scanning a gallery.
  @tags comma, separated, lowercase, searchable, terms
-->
```

- `@type` is one of `component`, `pattern`, `template` (default `pattern` if omitted — always set it explicitly). Simple single-component usage examples under `components/` are `component`. Full-page shells under `application-layout/` are `template`. Multi-component compositions (a toolbar pattern, a card layout) are `pattern`.
- Name format for component variants: `"<Component Display Name> — <Variant Display Name>"` (em dash, e.g. `Busy Indicator — Inline`).
- Tags convention for simple component blocks: `<component-name>, <variant>, storybook, component-example`.

## Converting story markup to block markup

- Strip all Lit template syntax: `.property=${args.x}` bindings become plain attributes with a representative static value; `@event=${handler}` bindings are dropped unless you're wiring real interactivity (see below).
- Drop Storybook-only scaffolding: `argTypes`, `decorators`, `action()` calls, `storyStyles`.
- Keep the actual component markup and slot structure faithful to the story — don't invent a different composition than what's documented.

## Make interactive components actually work

Read `blocks/src/scripts/vite-plugin.ts` for how this works: if `<block-name>.ts` exists next to `<block-name>.html`, the build **auto-injects it as a module script** — do not add a `<script>` tag yourself.

Some existing blocks in this package only render a trigger button next to a closed/inert component (e.g. some `dialog`/`popover` variants) — that's a shortcut, not the standard to copy. **Default to wiring real behavior** whenever a block's whole point is an interaction (open/close, toggle, expand): query the trigger and the target element, add a real `addEventListener('click', ...)`, and mutate the actual property the component exposes (`.open = true`, not a class toggle, unless the component is genuinely CSS-driven). Example (`components/busy-indicator/demo/demo.ts`):

```ts
import type { IBusyIndicatorComponent } from '@tylertech/forge/busy-indicator';

const showButton = document.querySelector<HTMLElement>('forge-button');
const busyIndicator = document.querySelector<IBusyIndicatorComponent>('forge-busy-indicator');

showButton?.addEventListener('click', () => {
  if (!busyIndicator) {
    return;
  }
  busyIndicator.open = true;
  setTimeout(() => {
    busyIndicator.open = false;
  }, 3000);
});
```

Import the component's public interface type (`I<Name>Component`) from its package subpath (`@tylertech/forge/<name>`) for typed `querySelector` casts. If icons need registration, `IconRegistry.define([...])` from `@tylertech/forge/icon` (see existing `demo.ts` files under `components/dialog/`, `components/popover/` for the pattern) — but only register icons actually rendered without the `external` attribute.

## Styling: use Tailwind utility classes, not inline `style=`

`forge-tailwind` maps Forge design tokens onto Tailwind's utility scale — reach for a class before reaching for `style="..."`. Only fall back to inline styles for a one-off value with no token/utility equivalent.

Common mappings seen throughout `blocks/src/blocks/`:

| Need | Utility |
|---|---|
| spacing (padding/margin/gap) | `p-medium`, `gap-small`, `mt-small`, `mb-small` (scale: `xsmall`, `small`, `medium`, `large`, `xlarge`, ...) |
| flex/grid layout | `flex items-center gap-xsmall`, `grid grid-cols-1 lg:grid-cols-2 gap-medium` |
| surface/background color | `bg-surface`, `bg-surface-dim`, `bg-surface-container` |
| border color | `border-outline`, `border-outline-low`, `border-outline-high` (pair with plain Tailwind `border`) |
| border radius | `rounded-lg` / `rounded-xl` / `rounded-full` (mapped to Forge shape tokens) |
| positioning | plain Tailwind (`relative`, `absolute`, `z-10`) |
| arbitrary one-off size | Tailwind bracket syntax, e.g. `h-[300px]`, over a hand-written `style` attribute |

Example — a bounded demo container:

```html
<div class="relative h-[300px] rounded-lg border border-outline">
  <forge-busy-indicator open mode="inline" ...></forge-busy-indicator>
</div>
```

## Build and verify

Run everything from `blocks/`:

```bash
pnpm generate-manifest                                   # regenerates manifest.json, warns on missing/invalid metadata
pnpm generate-screenshots --filter "<component-name>" --force   # captures .webp for the new block(s)
```

`--filter` is a case-insensitive substring match against block `id`/`name` — it is **not** a regex, so `--filter "a|b"` will not match either; run it once per component name if creating blocks for multiple components in one session.

Then:

- Read the generated `.webp` back (`Read` tool supports images) and visually confirm it matches intent — a closed/inert trigger-only screenshot is expected for pure open/close overlays unless you scripted the open state directly into the markup (like the `inline` busy-indicator variant does with the `open` attribute).
- `npx prettier --check blocks/src/blocks/components/<component-name>` from repo root (blocks HTML/TS files are covered by the root Prettier config; there is no separate lint script for `blocks/`).
- Spot-check `blocks/manifest.json` for the new entries: correct `category`, `componentsUsed` list, and `screenshot` path.
