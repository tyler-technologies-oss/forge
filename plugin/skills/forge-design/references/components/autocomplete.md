# Autocomplete

Autocomplete components provide real-time typeahead suggestions as users type in a text field.

## Overview

Autocomplete enhances text input fields by providing dynamic suggestions as users type. It can be applied to various input components including single selects, multi-selects, and search fields to help users quickly find and select options from large datasets. The component filters and displays relevant suggestions based on the user's input, reducing typing effort and improving accuracy.

## Usage

`forge-autocomplete` wraps a [text field](./text-field.md) and filters a list of options as the user types, through `mode`, `multiple`, `debounce`, and `emptyMessage`. Use it when a dropdown has too many options to scan comfortably; for a short, finite list, a [select](./select.md) is simpler and doesn't require typing.

## Rules

**Do**

- Use autocomplete when a dropdown has more options than a user can scan at a glance.
- Use when users might not know exact option names and need suggestions to guide their selection.
- Debounce keystrokes so filtering doesn't run on every character against a large data set.
- Set a clear empty-message so a no-results state doesn't look broken.
- Give the field a visible label, and use helper text to describe what it searches.

**Don't**

- Don't use autocomplete for a short, finite list of options — use a select instead.
- Don’t use lengthy or unclear hint text that doesn't set proper expectations.
- Don't leave the field without hint text; a blank autocomplete is ambiguous.
- Don't overload the suggestion list with extra information — keep each option lightweight.

## Modes

`mode` has two values: `default` (the common case) manages selection state for you as a form control. `stateless` doesn't track a selection at all — use it when you just want the typing/filtering behavior and intend to handle selection yourself.

## Initial value

Pre-populating a bound value on load needs the matching option available to show its label, not just the raw value. Either pass the full `IOption` object (`value` and `label`) to the `value` property directly, or return it from the `filter` callback's second parameter — the autocomplete calls the callback with that parameter specifically when it can't find a matching option already in its current list, so you can fetch it from wherever the rest of your options come from.

## Basic filtering

Wrap a `forge-text-field` (typically with `popover-icon` and `show-clear`) in a `forge-autocomplete` to filter its dropdown options as the user types.

Example (A text field filters its dropdown options as the user types.): `get_forge_blocks(blockId: "components/autocomplete/demo/demo")`

## Infinite scroll

Set `observe-scroll` to fire `forge-autocomplete-scrolled-bottom` as the user nears the bottom of the dropdown, so more options can be appended with `appendOptions()` instead of loading the entire set up front.

Example (observe-scroll fires an event near the bottom of the dropdown to load more options.): `get_forge_blocks(blockId: "components/autocomplete/infinite-scroll/infinite-scroll")`

## Multi-select

Set `multiple` to let a user select more than one option instead of replacing the previous selection.

Example (Multiple lets a user select more than one option.): `get_forge_blocks(blockId: "components/autocomplete/multi-select/multi-select")`

## Empty state

Set `emptyMessage` to show custom text in the dropdown when no options match the current filter.

Example (An empty-message shows when no options match the filter. Search for something not in the list to see the empty state): `get_forge_blocks(blockId: "components/autocomplete/empty-state/empty-state")`

## Accessibility

### Keyboard shortcuts

| Key                   | Action                                                                       |
| --------------------- | ---------------------------------------------------------------------------- |
| Down / Arrow Down     | Opens the dropdown and activates the first option                            |
| Arrow Up / Arrow Down | Moves through the list of options                                            |
| Enter                 | Selects the active option                                                    |
| Home / End            | Jumps to the first or last option                                            |
| Tab                   | Single-select: selects the active option and closes the dropdown             |
| Escape                | Closes an open dropdown                                                      |
| Backspace / Delete    | Edits the input's text; clears a single-select value when the input is empty |

### Screen reader behavior

The input automatically receives `role="combobox"`, `aria-live`, and `aria-owns`. You're still responsible for labeling it yourself — with a `<label>`, `aria-label`, or `aria-labelledby` — the component doesn't provide one for you.

Verify you can tab into the autocomplete and reach every option in the dropdown using only the keyboard.
