# Scaffold

The scaffold lays out a header, scrollable body, and footer using named slots, for full pages or smaller sections alike.

## Overview

The scaffold is a foundational layout component that provides structured slots for header, body, and footer content. This versatile structural tool offers named locations where you can render any element, making it suitable for full application layouts or nested within other scaffolds for complex interface hierarchies. The component handles positioning, spacing, and responsive behavior automatically, serving as the structural foundation for pages, dialogs, cards, and other container elements that need consistent layout organization.

## Usage

`forge-scaffold` positions content through named slots — `header`, `body`, `footer`, `left`, `right`, and `body`-prefixed variants for a header/footer/left/right scoped to just the body — plus `viewport` to size itself to the full viewport height. Use it for a full page (typically [app bar](./app-bar.md) in `header`, a [drawer](./drawer.md) in `body-left`, and page content in `body`), or to structure a smaller surface like a [dialog](./dialog.md) or [card](./card.md) with its own header, scrollable body, and footer.

## Rules

**Do**

- Use the scaffold as the outermost structure for a full page, a dialog, or a card that needs a pinned header and footer.
- Let only the body scroll — keep header, footer, and side slots fixed in place.
- Reach for CSS grid or flexbox inside the body slot for more complex inner layouts.

**Don't**

- Don't put primary page content in a side slot — those are for navigation or supplementary panels.
- Don't set viewport on a scaffold that's structuring a smaller surface like a card, only a full-page layout.

## Structure

Every slot at once shows how the scaffold positions content: `left`/`right` frame everything, `header`/`footer` pin above and below, and the `body`-prefixed slots do the same scoped to just the scrollable body.

Example (Every scaffold slot filled in at once, to show how each one is positioned.): `get_forge_blocks(blockId: "components/scaffold/demo/demo")`

## Full page layout

Set `viewport` to size the scaffold to the full viewport height, with an app bar in `header`, a drawer in `body-left`, and page content in `body`.

A root-level, full-page scaffold also needs `<body>` styled to fill the window: load `forge-core.css` from `@tylertech/forge/dist/forge-core.css`, or set `height: 100dvh; width: 100dvw; margin: 0; background-color: var(--forge-theme-surface-dim)` yourself. Nested scaffolds in dialogs, cards, or panels need neither `viewport` nor these body styles.

Example (An app bar, a drawer, and page content, laid out with a scaffold.): `get_forge_blocks(blockId: "components/scaffold/full-page-layout/full-page-layout")`

## Accessibility

### No built-in semantics

The scaffold itself has no semantic meaning — it's a layout tool, not a landmark. Provide your own semantic elements for slotted content, like `<header>`, `<main>`, and `<aside>`, since the scaffold makes no assumptions about what you put in it.

### Keyboard reachability

Verify content in every slot stays reachable by tabbing — the scaffold only handles layout, not focus order.
