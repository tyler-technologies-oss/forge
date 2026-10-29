# Split View

Split view lays out two or more panels side by side, at least one of which a user can resize by dragging.

## Overview

The split view component presents page elements side-by-side as resizable panels, allowing users to adjust how much screen space is devoted to different parts of the interface. It typically consists of one or more resizable panels alongside at least one non-resizable panel. This component is particularly useful for interfaces where users benefit from controlling the relative size of content areas, such as displaying maps, image viewers, or data tables alongside related information.

## Usage

`forge-split-view` lays out `forge-split-view-panel` children through `orientation` (`horizontal` or `vertical`), while each panel controls its own `resizable` edge, `size`, `min`/`max`, and `open` state. Use it when a user benefits from adjusting how much space two related regions get, like a data grid next to a map or preview. Keep it to two or three panels — more becomes unwieldy, especially on smaller screens.

## Rules

**Do**

- Give at least one panel a resizable edge so the split actually serves a purpose.
- Set a sensible min so a panel can't be resized into illegibility.
- Keep a split view to two or three panels — more gets unwieldy quickly, especially on smaller screens.
- Provide a way to reopen a panel once a user has closed it — don't leave them unable to get it back.

**Don't**

- Don't use a split view when the two regions aren't actually related — separate pages or a dialog may fit better.
- Don't rely on split view alone on narrow viewports — collapse to a single panel or stacked layout instead.
- Don't make every panel resizable when only one really needs to flex — fix the others' size instead.

## Basic usage

Set `resizable` on a panel to give it a drag handle on that edge, and `autoCloseThreshold` on the split view so a panel dragged small enough closes automatically.

Example (Two panels, the second resizable from its start edge.): `get_forge_blocks(blockId: "components/split-view/demo/demo")`

## Vertical

Set `orientation="vertical"` to stack panels instead of placing them side by side.

Example (Panels stacked vertically instead of side by side.): `get_forge_blocks(blockId: "components/split-view/vertical/vertical")`

## Accessibility

### Accessible panel labels

Give every panel a unique `accessibleLabel` describing its content — its resize handle relies on that label to provide an accessible name and size information to assistive technology.

### Reopening a closed panel

If a panel can be closed, provide a way for the user to reopen it, and set `aria-controls` and `aria-expanded` on the control that toggles it.

### Responsive content

Verify slotted content stays usable across a panel's full resizable range — set `min`/`max` if content becomes inaccessible at an extreme size.
