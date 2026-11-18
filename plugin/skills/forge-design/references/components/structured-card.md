# Structured Card

Structured cards provide a pre-configured card layout with dedicated slots for a title, header actions, body content, and footer actions.

**Experimental**

Structured card is an experimental component in developer preview — its API and implementation may change in future versions, and there may be unresolved bugs. Use it with that in mind, and be prepared to update your code as it evolves.

## Overview

The structured card is a pre-configured card layout optimized for common patterns in Tyler Cloud applications. Its slot-based architecture provides designated areas for a title, header actions, body content, and footer buttons, so teams build consistent card UIs without hand-assembling the same header and footer structure every time. It's ideal for table containers and self-contained content sections that need their own actions.

## Usage

`forge-structured-card` lays out a [card](./card.md) through named slots — `before-title`, `title`, `header-actions`, `after-header-actions`, `body`, `footer-start`, `footer-secondary-action`, and `footer-primary-action` — plus `heading-level` to set the title's semantic level and `body-spacing` to remove body padding for edge-to-edge content. Every slot is optional, and the header and footer hide when nothing is slotted into them. Use it when a card needs a header, body, and footer; for a card that only groups content with no header or footer, use a plain `forge-card` instead.

## Rules

**Do**

- Use a structured card when a card needs a header, body, and footer, rather than hand-building one from a card, scaffold, and toolbars.
- Set `heading-level` so the title fits the page's heading hierarchy.
- Put icon buttons that should sit against the card's edge, like an overflow menu or close button, in `after-header-actions`.
- Put status indicators, like a badge, in `header-actions`.
- Set `body-spacing="none"` for full-width body content, like a table.
- Put the main action in `footer-primary-action` and the alternative, like Cancel, in `footer-secondary-action`.

**Don't**

- Don't style the title with a heading class — the card applies `heading3` to the `title` slot.
- Don't put more than one primary action in the footer.
- Don't use a structured card for a simple grouping of content with no header or footer — use a card.

## With a form

Put a form in the `body` slot and its submit and cancel buttons in the footer action slots. Use `header-actions` for status, like a badge.

Example (A structured card containing a form, with a status badge in the header and actions in the footer.): `get_forge_blocks(blockId: "components/structured-card/with-form/with-form")`

## Header icon button

Use the `after-header-actions` slot for icon buttons that need to run up against the card's edge, such as overflow menus or close buttons.

Example (A structured card with an overflow menu icon button at the end of the header.): `get_forge_blocks(blockId: "components/structured-card/header-icon-button/header-icon-button")`

## Back navigation

Use the `before-title` slot for a back button or navigation icon, such as in a detail panel.

Example (A structured card with a back icon button before the title.): `get_forge_blocks(blockId: "components/structured-card/with-before-title-slot/with-before-title-slot")`

## Tables

Set `body-spacing="none"` (or the `bodySpacing` property) for full-width content like a table. It removes the body padding and the footer's bottom padding so the content runs edge to edge. Put a paginator in `footer-primary-action`.

Example (A structured card containing a table, with refresh and download icon buttons in the header and a paginator in the footer.): `get_forge_blocks(blockId: "components/structured-card/with-table/with-table")`

Use `footer-start` for buttons or controls that belong at the start of the footer, opposite the paginator.

Example (A structured card containing a table, with buttons at the start of the footer and a paginator at the end.): `get_forge_blocks(blockId: "components/structured-card/with-table-and-start-buttons/with-table-and-start-buttons")`

## Scrollable body

Set `--forge-structured-card-body-height` to a fixed value to make the body scroll while the header and footer stay pinned.

Example (A structured card with a fixed body height and scrolling content.): `get_forge_blocks(blockId: "components/structured-card/scrollable-body-content/scrollable-body-content")`

## Multiple cards

Lay out related structured cards in a wrapping row so they share the same header, body, and footer structure and stay easy to scan.

Example (Three structured cards in a wrapping row, each with an icon title, status badge, and footer actions.): `get_forge_blocks(blockId: "components/structured-card/multiple-cards/multiple-cards")`

## Accessibility

### Heading level

The title is exposed as a heading, at level 2 by default. Set `heading-level` so it fits the page's heading hierarchy — for example, `3` for a card under a section's `h2`.

### Labeling icon buttons

Give every icon button in the header an `aria-label`, such as "More actions" or "Back", since it has no visible text.

### Tab order

A structured card is a container, not an interactive control. Its slotted controls follow the natural tab order: header, then body, then footer.
