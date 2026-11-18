# Tabs

Tabs organize and switch between groups of related content that sit at the same level of hierarchy.

## Overview

Tabs are used to group different but related pieces of content in one area without having to navigate to new pages. They organize information into distinct sections that users can switch between easily, maintaining context while providing access to related content. Tab labels should clearly and succinctly describe the content they represent, while tab content should contain cohesive items that share common characteristics.

Tabs may be paired with, or nested within, components like cards, dialogs, or sidesheets to provide flexible content organization across different interface contexts.

## Usage

`forge-tab-bar` groups `forge-tab` children and tracks which one is active through `activeTab`/`activeTabName`, `vertical`, `clustered`, and `scrollButtons`. Pair each tab with a `forge-tab-panel` (matched by `for`) to show and hide its content. Use tabs for closely related content at the same level, inside a card, dialog, or side sheet, or as primary navigation when an app has fewer than five destinations; beyond that, use a [drawer](./drawer.md) instead.

## Rules

**Do**

- Keep tab labels succinct but clear for easy scanning and comprehension.
- Use icons consistently across a tab bar's tabs — either every tab has one, or none does.
- Place tabs directly above the content they control.
- Let tabs scroll horizontally on narrow screens instead of wrapping or shrinking to illegibility.

**Don't**

- Don't use tabs for sequential content that must be read in a specific order — use a stepper instead.
- Don't use tabs to compare content across tabs, like different sizes of the same item — show them together instead.
- Don't nest a tab bar inside another tab bar's content.
- Don't disable tabs at both the tab-bar level and the individual-tab level at once — pick one, since mixing the two causes their disabled states to conflict.
- Don’t truncate labels unless absolutely necessary as it impedes comprehension.
- Don’t resize text labels to force single-line display — use wrapping or scrollable tabs instead.

## Basic usage

Each `forge-tab`'s `id` pairs with a `forge-tab-panel`'s `for` attribute to show that panel only while its tab is active.

Example (Three tabs, each paired with a tab panel.): `get_forge_blocks(blockId: "components/tabs/demo/demo")`

## Named tabs

Track the active tab by name instead of index — set `activeTabName` on the tab bar, and name each tab to match:

```html
<forge-tab-bar active-tab-name="two">
  <forge-tab name="one">Tab one</forge-tab>
  <forge-tab name="two">Tab two</forge-tab>
</forge-tab-bar>
```

Read the active tab's name off the `forge-tab-bar-change` event's `detail.name`, rather than tracking index and looking it up yourself:

```js
tabBar.addEventListener("forge-tab-bar-change", (event) => {
  console.log("Active tab name:", event.detail.name);
});
```

## With icons

Pair each tab's label with a leading icon via the `start` slot.

Example (Tabs with a leading icon on every label.): `get_forge_blocks(blockId: "components/tabs/with-icons/with-icons")`

## Vertical

Set `vertical` on the tab bar (and each `forge-tab`) to stack tabs down the side of their content instead of across the top.

Example (A vertical tab bar beside its content.): `get_forge_blocks(blockId: "components/tabs/vertical/vertical")`

## Clustered

Set `clustered` so tabs cluster together at their minimum width instead of stretching to fill the tab bar.

Example (Clustered tabs sit together instead of stretching to fill the bar.): `get_forge_blocks(blockId: "components/tabs/clustered/clustered")`

## Accessibility

### Tab list and panel roles

A tab bar and its content follow the standard `tablist`/`tab`/`tabpanel` pattern: the container needs a `tablist` role, each tab needs an `aria-controls` pointing at its corresponding content, and each content element needs to be labelled by its tab.

`forge-tab-panel` automatically manages these ARIA relationships and focus for you when paired with `forge-tab-bar` — you don't need to hand-wire `aria-controls` or `aria-labelledby` yourself in that setup.

### Keyboard interaction

`forge-tab-bar` uses a single tab stop. Tab moves focus to the active tab, and the arrow keys move between tabs. By default, moving focus doesn't change the active tab. Set `auto-activate` to activate tabs as they receive focus.

| Key                      | Action                                                                             |
| ------------------------ | ---------------------------------------------------------------------------------- |
| Arrow left / Arrow right | Moves focus to the previous or next tab, wrapping at the ends (horizontal layout). |
| Arrow up / Arrow down    | Moves focus to the previous or next tab, wrapping at the ends (vertical layout).   |
| Home / End               | Moves focus to the first or last tab.                                              |
| Enter / Space            | Activates the focused tab.                                                         |
| Backspace / Delete       | Closes the focused tab if it's `closable`.                                         |
| Shift + F10              | Dispatches a menu event for the focused tab.                                       |

Inactive `forge-tab-panel` elements are hidden with `display: none`, so their content is removed from the tab order automatically.
