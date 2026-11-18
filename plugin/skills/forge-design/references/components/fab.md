# Floating Action Button

Floating action buttons represent the single most important action on a page, positioned above other content to draw attention to it.

## Overview

A floating action button (FAB) is a prominent, circular button that performs the primary or most common action on a screen. Primarily designed for mobile interfaces, it appears in front of all screen content and provides immediate access to the most important user action within the current context.

FABs are characterized by their elevated appearance, circular shape with centered icons, and persistent positioning that remains visible as users scroll through content.

## Usage

`forge-fab` represents a page's single most important action through `theme`, `density`, and `elevation`. Use the default slot alone for an icon-only FAB, or add the `label` slot for an extended FAB with a text label. Reserve it for pages that truly have one primary action; when several actions are equally likely, reach for a [button](./button.md) instead.

## Rules

**Do**

- Use a FAB only when a page has one clear primary action.
- Use when the primary action is constructive (creating, adding, or starting something new).
- Mobile interfaces benefit from prominent, easily accessible action buttons.
- Use when the action is relevant across most or all content on the screen.
- Place the icon before the label in an extended FAB.
- Use where users frequently perform the same action throughout their workflow.
- Reserve elevation="lowered" for a FAB that already sits on a raised surface, like a card.

**Don't**

- Don't display more than one FAB on a page.
- Don't use a FAB for a minor or destructive action, like archiving or showing an error.
- Don't position a FAB where it obscures important content or controls.
- Don't use when multiple primary actions are equally likely - for example, if adding and editing records are equally probable, use regular buttons instead.

## Positioning

`forge-fab` doesn't position itself — fix it to a corner of the viewport (or a scroll container) yourself, typically with `position: fixed` and a spacing token for the offset:

```css
.bottom-right {
  position: fixed;
  bottom: var(--forge-spacing-medium);
  right: var(--forge-spacing-medium);
}
```

## Density

Set `density` to `small`, `medium` (the default), or `large` to match the FAB's surrounding context.

Example (Small, medium (default), and large density.): `get_forge_blocks(blockId: "components/floating-action-button/density/density")`

## Extended

Add a `label` slot for an extended FAB with a text label — use it for actions that don't have a familiar icon.

Example (An icon paired with a label slot switches the FAB into its extended form.): `get_forge_blocks(blockId: "components/floating-action-button/extended/extended")`

## As a link

Wrap an `<a>` in the default slot to get a navigating FAB instead of one that fires a click action.

Example (A FAB wrapping an anchor for navigation.): `get_forge_blocks(blockId: "components/floating-action-button/with-anchor/with-anchor")`

## Accessibility

### Labeling

A FAB that only contains an icon needs a meaningful accessible name via `aria-label` or `aria-labelledby` — the icon alone doesn't convey its purpose to assistive technology.

Avoid capitalized label text; screen readers read capitalized words character-by-character. Use `text-transform: uppercase` instead so the visual style doesn't affect what gets announced.

### Keyboard and contrast

- Make sure the FAB can be reached by keyboard navigation, with a distinct visual cue when it's focused.
- Verify sufficient contrast between the FAB's foreground and background to meet WCAG requirements — including against whatever page content it floats above.
