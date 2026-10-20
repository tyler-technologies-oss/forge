---
name: component-docs-header
description: This skill should be used when the user asks to "add a component header", "add a ComponentHeader to the X docs page", "create the docs page for a new component", or otherwise discusses the live demo shown at the top of a component's usage page in the `docs/` site.
---

# Component Docs Header

Every component page in `docs/src/content/components/<slug>/usage.mdx` opens with a `<ComponentHeader>`: a live, clipped demo of the real component that replaces static screenshots. Reference pages: `button/usage.mdx` (centered) and `app-layout/usage.mdx` (cover + inset).

## Placement

Directly after the imports and before `## Usage`:

```mdx
import ComponentHeader from '../../../components/ComponentHeader.astro';

<ComponentHeader>
  <forge-button>Button</forge-button>
</ComponentHeader>

## Usage
```

## Props (`docs/src/components/ComponentHeader.astro`)

| Prop          | Default    | Purpose                                                                                          |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `fit`         | `"center"` | `"center"` centers the demo both ways; `"cover"` fills the frame and clips overflow              |
| `height`      | `"12rem"`  | Frame height                                                                                     |
| `zoom`        | `1`        | Above 1 magnifies a region (anchored at `origin`); below 1 shrinks to show more, top-left        |
| `origin`      | `"center"` | CSS `transform-origin` for `zoom` > 1 in cover mode (e.g. `"top left"`)                          |
| `inset`       | none       | Cover mode only: CSS inset shorthand; shows the frame background around a rounded, bordered demo |
| `interactive` | `true`     | Pass `{false}` to make the demo `inert`                                                          |

## Choosing a style

- **Small components** (button, badge, chip, switch): `fit="center"` with 1–3 variants side by side. Use the default height unless the component is tall.
- **Large components** (app layout, scaffold, table, drawer): `fit="cover"` with `inset="2rem"`, a taller `height` (~`18rem`), and `zoom` below 1 to show the overall shape, or above 1 with `origin` to spotlight one region. It is an abstract but real representation; never show the whole thing.
- Overlay components (dialog, menu, popover): show a closed trigger or a static, non-overlay representation. Don't open a modal on page load.

## Rules

- Use real Forge markup. Get snippets from the Forge MCP (`get_forge_blocks`, `get_component_docs`) rather than guessing; follow the root CLAUDE.md block guidelines (no placeholder attributes, h2 under app layout, etc.).
- Register every component and icon the demo uses in `docs/src/scripts/forge-components.ts` (side-effect import for components, `IconRegistry.define` for icons). Unregistered icons render blank; substitute a registered one or add it.
- Style with Forge components and Tailwind utilities only. No custom CSS (see `docs/CLAUDE.md`).
- Keep the demo static and self-contained: no scripts, no external assets, no content that needs a network.
- A new page also needs complete frontmatter (`title`, `description`, `status`, `source`, `category`, optional `storybookId`) matching `docs/src/content.config.ts`.
- Don't start the dev server to verify (see `docs/CLAUDE.md`); ask the user to check the rendered page.
