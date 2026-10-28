# Toast

Toasts are brief, non-modal notifications that confirm a user's action and disappear automatically.

## Usage

`forge-toast` shows a brief, temporary confirmation through `open`, `duration`, `placement`, and `theme`, plus an optional `actionText` and `dismissible` close button. Trigger it imperatively by setting `open` (or calling the static `ToastComponent.present(...)` helper) in response to a user action; reserve it for confirming something that just happened, and show only one at a time. For a message that requires a decision, use a [dialog](./dialog.md) instead; for a page-level announcement, use a [banner](./banner.md) instead.

## Rules

**Do**

- Confirm an action the user just took, like creating, moving, or updating a record.
- Show only one toast at a time — queue successive toasts instead of stacking them.
- If you add an action label, keep it a genuine alternate action, never "Dismiss" or "Cancel" — the toast already disappears on its own.
- Display each toast for at least 5 seconds, adding more time for longer messages.

**Don't**

- Don't use a toast for an error or decision that needs user input — use a dialog instead.
- Don't use a toast for a page-level, persistent announcement — use a banner instead.
- Don't use a toast for information a user might need to reference again — use an inline message instead.

## Basic usage

A trigger fires the action, then sets the toast's `open` property (or calls `ToastComponent.present(...)`) to show it. A toast shown via `ToastComponent.present(...)` removes itself from the DOM once `duration` elapses; a declarative `<forge-toast open>` does not — toggle `open` yourself to hide it.

Example (A button triggers a toast confirming an action.): `get_forge_blocks(blockId: "components/toast/demo/demo")`

## With dialogs

A dismissible toast shown while a `forge-dialog` is open is non-interactive by default — the dialog makes everything outside it `inert`. Pass `topLayer: true` to keep it clickable; this appends the toast to the topmost open dialog instead of the page.

```js
ToastComponent.present({ message: "Save successful", topLayer: true });
```

## Action and dismiss button

Set `actionText` to add an inline action button, and `dismissible` to add a manual close button alongside the automatic timeout.

Example (A dismissible toast adds a manual close button.): `get_forge_blocks(blockId: "components/toast/dismissible/dismissible")`

## Placement

Set `placement` to move the toast to the top of the viewport instead of the default bottom.

Example (A toast placed at the top of the viewport instead of the default bottom.): `get_forge_blocks(blockId: "components/toast/placement/placement")`

## Theme

Set `theme` to reinforce the outcome being confirmed, such as `success`.

Example (A success-themed toast.): `get_forge_blocks(blockId: "components/toast/theme/theme")`

## Accessibility

### Keyboard interaction

If a toast is dismissible, make sure its dismiss button is reachable and operable by keyboard.

### Color

If a toast's theme color conveys meaning (success, error, and so on), don't rely on color alone — pair it with an icon or text so users with color perception deficiencies get the same information.
