---
'@tylertech/forge': major
---

feat(list): migrate list and list-item to Lit

**BREAKING CHANGE:** `forge-list` and `forge-list-item` now extend `BaseLitElement` instead of `BaseComponent`. Properties, attributes, the `forge-list-item-select` event, slots, parts, CSS properties, and CSS classes are unchanged.

- `ListCore`, `ListAdapter`, `ListItemCore`, and `ListItemAdapter` have been removed.
- `IListComponent` and `IListItemComponent` are deprecated and no longer include the `WithElementInternals` and `WithDefaultAria` mixin members.
- Changes to list properties (`dense`, `indented`, `twoLine`, `threeLine`, `wrap`, `noninteractive`, and `selectedValue`) are applied to child list items as part of Lit's asynchronous update cycle. Await `updateComplete` before inspecting list items after changing them.
- A list item's `selected` state is derived from its `value` and the parent list's `selectedValue` during its next update instead of synchronously.
- Reflected attributes, the interactive state layer and focus indicator, and the internal anchor of a list item are rendered as part of Lit's asynchronous update cycle. List items render a second time after first render to detect their interactive element.
- A list item that becomes `noninteractive` now also removes its state layer and focus indicator.
