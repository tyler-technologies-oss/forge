# Card

Cards group related content and actions about a single topic into one surface.

## Overview

Cards are flexible container surfaces that display content and actions focused on a single topic or related set of information. They serve as discrete units that organize information into scannable, actionable containers with clear visual hierarchy and consistent styling.

Cards function as versatile building blocks that can contain various types of content while maintaining visual consistency and providing users with predictable interaction patterns across different interface contexts.

## Usage

`forge-card` groups content and actions about one topic through `raised` and `no-padding`. When a card needs a header or footer, nest a `forge-scaffold` inside it with a `forge-toolbar` in each of the `header` and `footer` slots. Use a card to organize related information or preview a record that links to the full one; avoid it when the content inside isn't actually related, or when scanning and comparing homogeneous data matters more than grouping.

## Rules

**Do**

- Keep everything inside a card related to a single topic or record.
- Build a card's header and footer from a `forge-scaffold` with a `forge-toolbar` in each slot, and set `no-padding` on the card so the toolbars reach its edges.
- Use `inverted` on the footer toolbar so its divider sits above the actions.
- Apply consistent padding and spacing throughout card content.
- Group related information logically within card boundaries.
- Align content inside a card consistently — centered or left-aligned, not mixed.
- Show a hover or focus state on a card that's clickable or draggable, so its interactivity is obvious.

**Don't**

- Don't group unrelated content into the same card.
- Don't use a card when scanning and comparing homogeneous data matters more than grouping — a table or list fits better.
- Don't mix alignment styles for content within the same card.
- Don't hand-build a card header or footer from flex `div`s — use a scaffold and toolbars.

## Basic usage

A card applies consistent padding and shape to its content by default.

Example (A basic card with default padding.): `get_forge_blocks(blockId: "components/card/demo/demo")`

## Header, body, and footer

When a card needs a header or footer, nest a `forge-scaffold` inside it. Put a `forge-toolbar` in the `header` slot for the title (`text-heading3`) and any icon actions, the content in the `body` slot with `p-medium` padding, and an `inverted` `forge-toolbar` in the `footer` slot for the actions. Set `no-padding` on the card so the toolbars run edge to edge. The header and footer stay pinned while the body scrolls. Each part is optional, so a card with only a header uses just the header toolbar.

Example (A card structured with a scaffold, with a toolbar in its header and footer.): `get_forge_blocks(blockId: "components/card/scaffold/scaffold")`

## Raised

Set `raised` for a stronger shadow that lifts the card above its surroundings.

Example (A raised card sits above its surroundings with a stronger shadow.): `get_forge_blocks(blockId: "components/card/raised/raised")`

## Accessibility

### Tab order

A card shouldn't interfere with the page's natural tab order — it's a container, not an interactive control, by default.

### Grouping related content

If a card's content forms a distinct, related unit that should be announced together, add a `role` attribute — `role="group"` is a common choice when the content is related and separate from surrounding items.
