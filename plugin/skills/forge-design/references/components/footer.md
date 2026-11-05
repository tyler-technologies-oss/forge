# Footer

Footers display secondary links, legal text, and branding at the bottom of an app or page.

## Overview

A footer sits at the bottom of an app or page and holds the content users rarely need but should always be able to find: links to about, contact, and privacy pages, copyright text, and a brand graphic. It adapts to the available width, laying items out in a row on wide screens and stacking them on narrow ones.

Footers are typically paired with an [app layout](./app-layout.md), which places the footer below the main content.

## Usage

`forge-footer` wraps one `forge-footer-item` per link or line of text, and accepts a `graphic` slot for a logo. Set `layout` to `standard`, `alternative`, or `auto` (the default); in `auto`, the footer switches to the alternative layout below `layoutBreakpoint` (900px by default). Use a footer for persistent, low-priority links and legal text; for primary navigation, use a [tab bar](./tabs.md) or drawer instead.

## Rules

**Do**

- Keep the footer to a few short, stable links.
- Wrap each link or line of text in its own `forge-footer-item`.
- Give a graphic image meaningful `alt` text, or an empty one if it is decorative.
- Leave `layout` on `auto` so the footer adapts to narrow screens.

**Don't**

- Don't put primary navigation or key actions in the footer.
- Don't put loose content in the footer without a `forge-footer-item` — it won't be exposed as a list item.
- Don't add so many links that the footer dominates the page.

## Basic usage

Each `forge-footer-item` holds a link or text, and the `graphic` slot holds a logo.

Example (A footer with links, copyright text, and a graphic.): `get_forge_blocks(blockId: "components/footer/demo/demo")`

## Accessibility

### Landmark and list roles

`forge-footer` has the `contentinfo` role, so assistive technology exposes it as the page's footer landmark. Its items are wrapped in a `list`, and each `forge-footer-item` has the `listitem` role, so screen readers announce the number of items.

Only one `contentinfo` landmark should be exposed per page. Don't add `role="contentinfo"` to other elements on the page.

### Keyboard interaction

The footer doesn't manage focus itself. Interactive content you slot into it, like links, follows the normal tab order.

| Key         | Action                                          |
| ----------- | ----------------------------------------------- |
| Tab         | Moves focus to the next link in the footer.     |
| Shift + Tab | Moves focus to the previous link in the footer. |
| Enter       | Activates the focused link.                     |

### Labeling

Give a slotted graphic link an accessible name through the image's `alt` text, such as "Empowered by Tyler Technologies". If a page has more than one footer-like region, set `aria-label` on the footer to tell them apart.
