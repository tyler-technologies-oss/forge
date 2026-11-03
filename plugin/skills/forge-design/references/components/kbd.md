# Kbd

Kbd displays a keyboard key combination, such as a shortcut in documentation or a hint within the UI.

## Overview

Kbd shows the keys that make up a keyboard shortcut as individual, key-shaped glyphs. It lets users recognize a shortcut at a glance, whether it's described in help text or documentation, or surfaced as a hint next to a menu item or button.

Kbd is typically paired with menu items, buttons, tooltips, and help content that describe an action alongside the shortcut that triggers it.

## Usage

`forge-kbd` renders the modifier keys you turn on with `ctrl`, `alt`, `shift`, `meta`, and `mod`, followed by the keys listed in `keys`. It only displays a shortcut; use [keyboard shortcut](./keyboard-shortcut.md) to actually listen for one. Use `mod` for the primary modifier of the current platform, which shows `⌘` on Apple platforms and `Ctrl` elsewhere, and `dense`, `muted`, and `theme` to adapt the appearance to its surroundings.

## Rules

**Do**

- Use mod instead of hard-coding ctrl or meta so the shortcut matches the user's platform.
- Place a kbd next to the label of the action it triggers.
- Use dense when a kbd sits inside compact UI such as a menu item.
- Use muted when the shortcut is secondary information.

**Don't**

- Don't use kbd to make buttons or other controls look like keys.
- Don't show a shortcut that isn't wired up to anything.
- Don't rely on the key glyphs alone to describe an action; always include a text label.

## Basic usage

Set the modifier properties you need and list the remaining keys in `keys`.

Example (A kbd showing the Shift and K keys.): `get_forge_blocks(blockId: "components/kbd/demo/demo")`

## Key strings

`keys` takes an array of strings. As an attribute it takes a space-separated list. Some keys are shown as glyphs or friendlier names: `ArrowUp`, `ArrowDown`, `ArrowLeft`, and `ArrowRight` show arrows, `Escape` shows `Esc`, and `Enter` shows `Return` on Apple platforms. Every other key is shown as provided, converted to title case.

Example (A kbd showing arrow keys and a named key.): `get_forge_blocks(blockId: "components/kbd/key-strings/key-strings")`

## Modifier keys

Modifiers are shown with platform-appropriate glyphs, in the order Control, Alt, Shift, Meta, then Mod, followed by `keys`.

```html
<forge-kbd mod keys="S"></forge-kbd>
```

Example (Kbd with each modifier key turned on.): `get_forge_blocks(blockId: "components/kbd/modifier-keys/modifier-keys")`

## Dense

Set `dense` to render smaller keys that fit within compact UI.

Example (A dense kbd.): `get_forge_blocks(blockId: "components/kbd/dense/dense")`

## Muted

Set `muted` to render the keys without outlines when the shortcut is secondary information.

Example (A muted kbd.): `get_forge_blocks(blockId: "components/kbd/muted/muted")`

## Theme

Set `theme` to one of `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, or `error` to color the keys.

Example (Kbd in each theme.): `get_forge_blocks(blockId: "components/kbd/theme/theme")`

## Accessibility

### Screen reader behavior

`forge-kbd` renders native `<kbd>` elements, which assistive technology recognizes as keyboard input. Each key is rendered in its own `<kbd>` inside a wrapping `<kbd>`, so a screen reader can read the combination in order. When only one key is shown, the wrapper gets `role="presentation"` so the key isn't announced twice.

### Labeling

`forge-kbd` isn't focusable and has no accessible name of its own. Always describe the action in nearby text, and don't rely on the glyphs alone.

If the shortcut is actually bound to an element, expose it with `aria-keyshortcuts` on that element, since `forge-kbd` is only a visual representation. Use [keyboard shortcut](./keyboard-shortcut.md) to wire up the behavior itself.

### Platform glyphs

Modifier keys and some named keys are shown with different glyphs on Apple platforms (for example `⌘` instead of `Ctrl`). Screen readers may read symbols such as `⌘` and `⇧` differently than the key names, so describe the shortcut in text wherever it matters.
