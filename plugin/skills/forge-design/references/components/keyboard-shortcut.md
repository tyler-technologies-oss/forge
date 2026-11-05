# Keyboard Shortcut

Attaches a keyboard shortcut to an element, or the whole page, without any visible UI of its own.

## Usage

`forge-keyboard-shortcut` listens for a key combination and fires `forge-keyboard-shortcut-activate` when it's pressed, through `key`, `target`, `global`, and `disabled` — it renders nothing itself, so it doesn't affect layout on its own. Placed as a sibling right after an element, the shortcut activates while focus is within that element by default; set `target` to a CSS selector to activate it for a different element instead, or `global` to activate it anywhere on the page.

## Rules

**Do**

- Describe the shortcut's function and key combination somewhere visible on the page, not just in code.
- Set aria-keyshortcuts on the element a global or targeted shortcut activates.

**Don't**

- Don't override a browser, operating system, or assistive technology shortcut.
- Don't use the accesskey attribute alongside it.
- Don't duplicate behavior the browser already provides — a form submits on Enter without any extra wiring.

## Basic usage

Placed as a sibling after an element, the shortcut activates while focus is within that element.

Example (A keyboard shortcut scoped to focus within a specific element.): `get_forge_blocks(blockId: "components/keyboard-shortcut/demo/demo")`

## Targeting a different element

Set `target` to a CSS selector to activate the shortcut for an element it isn't a sibling of.

```html
<forge-button id="shortcut-target">
  <button type="button">Button</button>
</forge-button>
<forge-keyboard-shortcut key="shift+a" target="#shortcut-target"></forge-keyboard-shortcut>
```

## Targeting the whole page

Set `global` to activate the shortcut anywhere on the page, regardless of focus.

```html
<forge-keyboard-shortcut key="shift+a" global></forge-keyboard-shortcut>
```

## Accessibility

### Don't fight the platform

Never override a shortcut the browser, operating system, or assistive technology already owns. Avoid the `accesskey` attribute for the same reason — it conflicts unpredictably across browsers and screen readers. And don't duplicate behavior the platform already provides — a form already submits on Enter when it has a submit button, with no shortcut needed.

### Announce what you're activating

Set `aria-keyshortcuts` on whichever element a global or targeted shortcut ultimately activates, so assistive technology can announce it. Also describe the shortcut's function and key combination somewhere visible on the page — a shortcut a user can't discover isn't accessible just because it technically works.
