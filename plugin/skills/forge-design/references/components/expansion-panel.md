# Expansion Panel

Expansion panels show summary content and reveal additional detail on tap, for progressive disclosure inside a card, list, or table.

## Overview

Expansion panels are lightweight containers that support progressive disclosure by highlighting important summary information and revealing additional details when expanded. They help focus designs by displaying critical information first while keeping secondary details accessible but not overwhelming. Expansion panels can stand alone or be integrated within various components including cards, navigation items, lists, and tables.

## Usage

`forge-expansion-panel` reveals its default-slot content on toggle, through `open`, `orientation`, `trigger` (an external button's id), and `name` — pairing a `header` slot or an external button with a `forge-open-icon` for the chevron indicator. Give several panels the same `name` to form an accordion group where opening one closes the others, or wrap them in `forge-accordion` for the same effect scoped to a specific set of panels. Use it for progressive disclosure inside a [card](./card.md), [list](./list.md), or [table](./table.md) row. Content inside a closed panel stays findable by the browser's native find-in-page search — a match automatically opens the panel to reveal it.

## Rules

**Do**

- Make the entire header clickable to toggle the panel, not just the open icon.
- Persist the summary content when a panel opens, rather than replacing it with the expanded detail.
- Leave multiple panels open at once unless there's a specific reason — like editing — to allow only one.

**Don't**

- Don't rely on editing inside an expansion panel for anything beyond a quick edit — prefer a dialog or a dedicated page.
- Don't shrink the clickable header below a comfortable touch target.
- Don't nest an accordion group inside another accordion group's panel.
- Don’t hide critical information that users need to see immediately.

## Basic usage

A `header`-slotted button toggles the panel; a `forge-open-icon` inside it rotates to reflect the open state.

Example (A single expansion panel toggled by its header button.): `get_forge_blocks(blockId: "components/expansion-panel/demo/demo")`

## In a card

Nest an expansion panel inside a card to expand the whole card downward instead of navigating away.

Example (An expansion panel inside a card, with a custom header layout.): `get_forge_blocks(blockId: "components/expansion-panel/with-card/with-card")`

## Named group

Give several panels the same `name` to form an accordion group — opening one automatically closes the others sharing that name.

Example (Three panels sharing a name, so opening one closes the others.): `get_forge_blocks(blockId: "components/expansion-panel/named-group/named-group")`

## External trigger

Set `trigger` to the id of a button anywhere else in the DOM to toggle the panel from outside its own header slot — it also wires up that button's `aria-expanded` and `aria-controls` automatically. The referenced element needs to already be in the DOM when the panel initializes, so in an incrementally-rendered UI where that's not guaranteed, set the `triggerElement` property to a direct element reference instead — it isn't subject to that timing requirement.

Example (A button outside the panel toggles it via the trigger attribute.): `get_forge_blocks(blockId: "components/expansion-panel/with-unslotted-button/with-unslotted-button")`

## Open icon sync

A `forge-open-icon` placed in the `header` slot, or nested inside the panel's trigger button, automatically syncs its rotation to the panel's open state — no wiring required. To sync an open icon that lives elsewhere in the document, set `openIcon` to its id (subject to the same DOM-timing requirement as `trigger`), or set `openIconElement` to a direct reference when timing can't be guaranteed.

## Accordion

Wrap a set of panels in `forge-accordion` instead of giving them a shared `name` when you want the "only one open at a time" behavior scoped to a specific group of panels, regardless of `name`. It adds no visual styling of its own — pair it with a divider between panels for visual separation.

Example (An accordion wrapping three panels, with dividers between them.): `get_forge_blocks(blockId: "components/accordion/demo/demo")`

## Accessibility

### Trigger markup

Use a real `<button>` as the interactive element that toggles the panel, and give it a clear label. Don't place complex or interactive content inside that button — if the header needs more than the toggle itself, put a plain button in the header alongside that content instead of wrapping it all in one.

Make sure the trigger stays keyboard-focusable and can be activated from the keyboard, not just by pointer.

### ARIA wiring

- Set `aria-expanded` on the trigger button to reflect the panel's open state, and update it when the panel opens or closes.
- Set `aria-controls` on the trigger button to reference the id of the expandable content.
- Give the expandable content itself `role="group"` (or another non-generic role).

Associating a button via the `trigger` attribute manages `aria-expanded` and `aria-controls` for you automatically:

```html
<forge-expansion-panel trigger="button-id">
  <button slot="header" id="button-id">Toggle panel</button>
  <div id="expandable-content" role="group">Expandable content</div>
</forge-expansion-panel>
```

### Interactive elements in the header

Placing another interactive element (like an icon button) in the header slot alongside the trigger needs the same `forge-ignore` handling described in <a href={`${import.meta.env.BASE_URL}developing/accessibility/#nested-interactive-elements`}>nested interactive elements</a> — otherwise clicking it will also toggle the panel.
