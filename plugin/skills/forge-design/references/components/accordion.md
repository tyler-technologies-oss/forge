# Accordion

Wraps a set of expansion panels so that opening one automatically closes any other open panel.

## Overview

Accordions are vertically grouped sections with headers and associated expandable content areas that manage the display of multiple related content sections. The accordion ensures that only one section can be expanded at any given time, automatically collapsing other open panels when a new one is expanded. This creates a focused user experience where attention is directed to a single content area.

## Usage

`forge-accordion` wraps a set of [expansion panel](./expansion-panel.md) children and closes any other open panel whenever one of them opens, through its `panelSelector` property for scoping to panels that aren't direct children. It adds no visual styling of its own; pair it with a [divider](./divider.md) between panels for visual separation. If a design calls for more than one panel open at a time, skip the accordion wrapper entirely and use expansion panels on their own.

## Rules

**Do**

- Use clear, descriptive headers that indicate what content will be revealed.
- Consider default expanded state for the most important or commonly accessed section.
- Reserve an accordion for panels that represent mutually exclusive views of related information.
- Pair panels in an accordion with a divider between them, since the component adds no visual separation of its own.
- Set panelSelector when the panels it manages aren't its direct children.

**Don't**

- Don't wrap panels in an accordion if a design calls for more than one open at a time — use plain expansion panels instead.
- Don't nest an accordion group inside another accordion group's panel.
- Don't rely on the accordion for visual styling — it only manages which panel is open.
- Don’t use accordions for critical information that users must see immediately.
- Don’t make headers too long — keep them scannable and concise.
- Don’t hide essential navigation or primary actions within collapsed panels.

## Basic usage

Give each panel a `header`-slotted button; opening one panel automatically closes any other open panel in the same accordion.

Example (An accordion wrapping three panels, only one open at a time.): `get_forge_blocks(blockId: "components/accordion/demo/demo")`

## Accessibility

### Keyboard interaction

- Every panel in the accordion should be reachable by keyboard navigation, with a visible focus cue.
- Pressing Space or Enter on a focused panel should toggle it open or closed the same way a click would.

### Nested interactive content

If an open panel contains a link, button, or other navigation element, those should be included in the tab order while tabbing through the accordion. If a closed panel contains any of that content, it should be skipped instead.
