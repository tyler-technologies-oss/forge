# Button Area

Makes an entire region of content — like a card — behave as a single clickable control, backed by a real button or link underneath.

## Overview

The button area is a container element for an interactive "area" of the page. It's common to make larger sections of the page (such as individual cards) interactive and respond to user pointer events. The button area provides an accessible way to do this.

## Usage

`forge-button-area` wraps a region of content and connects it to a real `<button>` or `<a>` in its `button` slot (or an existing one elsewhere via `target`/`targetElement`), through `disabled`, so the whole region acts as one clickable control while keeping accessible, keyboard-operable semantics. Clicking anywhere in the area dispatches a `click` event on the connected button. Use it for card-style regions — a whole card that navigates or selects — rather than for a single, already-obvious control like a plain button.

## Rules

**Do**

- Always include a slotted button/anchor, or connect an existing one with target or targetElement.
- Give the connected button or link a description of the area's action as its text content.
- Keep other interactive elements inside the area reachable and independently operable.

**Don't**

- Don't disable a button area that's connected to an anchor element — disabled has no effect on anchors.
- Don't use a button area for a region that's already a single, obvious control — a plain button is simpler.

## Basic usage

Slot a `<button>` into `button` and lay out the rest of the area's content in the default slot — the whole area becomes clickable while the button itself stays visually hidden but focusable.

Example (An entire content area acting as a single clickable button.): `get_forge_blocks(blockId: "components/button-area/demo/demo")`

## As a link

Slot an `<a>` instead of a `<button>` for a button area that navigates. `disabled` has no effect when the connected element is an anchor.

Example (A button area wrapping an anchor for navigation.): `get_forge_blocks(blockId: "components/button-area/as-a-link/as-a-link")`

## State reflection

The button area watches its connected button's ARIA attributes and reflects them as CSS states you can style directly on the `forge-button-area` element: `:state(pressed)` when the button has `aria-pressed="true"` (useful for a toggle), and `:state(current)` when it has `aria-current` set to any valid value (useful for marking the current item in a navigation list).

## Accessibility

### Accessible name

Give the connected button or link a concise, descriptive text content for its action — preferably matching the visible text within the area, or a portion of it if that text is long.

### Keyboard interaction

- Every nested button or link inside the area should be reachable by keyboard navigation, with a visible focus cue.
- Pressing Space or Enter while the connected button is focused should activate the area the same way a click would. When the connected element is an `<a>`, only Enter activates it, matching native link behavior.

### Contrast

Verify there's sufficient contrast between the area's foreground text and its background to meet WCAG requirements.

### Interactive content inside the area

An element nested inside a button area needs the same `forge-ignore` handling described in <a href={`${import.meta.env.BASE_URL}developing/accessibility/#nested-interactive-elements`}>nested interactive elements</a> to stay independently clickable instead of triggering the area's own button.
