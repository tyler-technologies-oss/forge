# Dialog

Dialogs are modal windows that interrupt the user to convey critical information or request a decision.

## Usage

`forge-dialog` shows modal (or non-modal) content through `open`, `mode`, `type`, `preset`, `placement`, `fullscreen`, and `persistent`, and typically composes with a `forge-scaffold`'s header/body/footer slots for structure. Use it sparingly, only for critical information or a decision that truly needs to block the rest of the app. For the common confirm/cancel prompt, reach for the pre-built `forge-confirmation-dialog` instead of hand-building one. For lower-priority feedback, use a [toast](./toast.md), [banner](./banner.md), or [inline message](./inline-message.md) instead.

## Rules

**Do**

- Reserve a dialog for critical information or a decision that truly needs to block the rest of the app.
- Use a filled button for the confirming action and a tonal button for the dismissive one, with the confirming action on the right.
- Disable the confirming action until every required field in the dialog is filled.
- Confirm before discarding unsaved changes when a user tries to close a dialog containing form input.

**Don't**

- Don't stack a dialog on top of another dialog.
- Don't let a click outside the dialog close it when the dialog contains a form — that risks accidental data loss.
- Don't place two filled buttons next to each other in a dialog's footer.
- Don't use a vague action label like "OK" or "Done" — use a specific verb like "Save" or "Send".

## Structure

A dialog's content is typically a `forge-scaffold` with a `header` toolbar (title plus a close icon button), a `body` (the message or form), and a `footer` toolbar (actions) — pinning the header and footer so only the body scrolls. The title goes in the header toolbar's `start` slot and the close icon button in its `end` slot. The footer toolbar sets `inverted` so its divider sits above it.

```html
<forge-dialog labelledby="edit-profile-title">
  <forge-scaffold>
    <forge-toolbar slot="header">
      <h2 slot="start" id="edit-profile-title" class="forge-typography--heading3">Edit profile</h2>
      <forge-icon-button slot="end" density="medium" aria-label="Close dialog">
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
    </forge-toolbar>
    <div slot="body" class="p-medium">...</div>
    <forge-toolbar slot="footer" inverted>
      <div slot="end" class="flex items-center gap-medium">
        <forge-button variant="tonal">Cancel</forge-button>
        <forge-button variant="filled">Save</forge-button>
      </div>
    </forge-toolbar>
  </forge-scaffold>
</forge-dialog>
```

Example (A dialog built from a scaffold's header, body, and footer slots.): `get_forge_blocks(blockId: "components/dialog/demo/demo")`

## Opening a dialog

Set `open` on a dialog already in the page to show it, and remove it (or set `open = false`) to close it. To create one on demand, build it in script, append it to `document.body`, then set `open`:

```js
const dialog = document.createElement("forge-dialog");
dialog.label = "Edit profile";
dialog.append(content);
document.body.append(dialog);
dialog.open = true;
```

In Angular apps, open dialogs through `DialogService` from `@tylertech/forge-angular` instead of creating the element yourself.

## Modes

`mode` controls how a dialog sits relative to the rest of the page. `modal` (the default) renders above everything with a backdrop and makes the rest of the page inert. `nonmodal` renders in the normal page flow, above other content, with no backdrop and nothing made inert. `inline-modal` is the middle ground — a backdrop is shown, but unlike `modal`, the rest of the page is not made inert.

## Prevent close

Listen for `forge-dialog-before-close` and call `event.preventDefault()` to block a close — useful for validating input or waiting on an async save before letting the dialog close. This event only fires for light-dismiss actions (clicking the backdrop or pressing Escape), not for an explicit close triggered from your own button.

```js
dialogEl.addEventListener("forge-dialog-before-close", (event) => {
  if (!formIsValid) {
    event.preventDefault();
  }
});
```

## Confirmation dialog

For the common confirm/cancel prompt, use the pre-built `forge-confirmation-dialog` instead of hand-building a scaffold — it handles the title, message, and button slots for you.

Example (A pre-built confirmation dialog handles the title, message, and button slots.): `get_forge_blocks(blockId: "components/dialog/confirmation-dialog/confirmation-dialog")`

Listen for `forge-confirmation-dialog-action` to handle the result. `detail.value` is `true` when the user clicks the primary button, and `false` when they click the secondary button or press Escape (`detail.reason` is `'light-dismiss'`). The dialog closes on its own afterward. To keep it open while an async action runs, call `preventDefault()` and set `isBusy`, then close it yourself when the action finishes.

```js
confirmationDialog.addEventListener("forge-confirmation-dialog-action", async (event) => {
  if (!event.detail.value) {
    return;
  }
  event.preventDefault();
  confirmationDialog.isBusy = true;
  await deleteRecord();
  confirmationDialog.open = false;
});
```

## Presets

**Looking for Bottom Sheet?**

Bottom Sheet is now a Dialog preset rather than its own component — use `preset="bottom-sheet"` below instead.

Set `preset` to `bottom-sheet`, `top-sheet`, `left-sheet`, or `right-sheet` to slide the dialog in from an edge instead of the default, centered `dialog` preset — common on mobile.

Example (A dialog sliding in from the bottom of the screen.): `get_forge_blocks(blockId: "components/dialog/bottom-sheet/bottom-sheet")`

Example (A dialog sliding in from the top of the screen.): `get_forge_blocks(blockId: "components/dialog/top-sheet/top-sheet")`

Example (A dialog sliding in from the left edge of the screen.): `get_forge_blocks(blockId: "components/dialog/left-sheet/left-sheet")`

Example (A dialog sliding in from the right edge of the screen.): `get_forge_blocks(blockId: "components/dialog/right-sheet/right-sheet")`

## Fullscreen

Set `fullscreen` (or let `fullscreenThreshold` trigger it automatically below a given viewport width) to expand the dialog to fill the screen — use it for a multi-step task, like a form paired with a [stepper](./stepper.md), and reserve it for mobile.

Example (A fullscreen dialog fills the entire viewport.): `get_forge_blocks(blockId: "components/dialog/fullscreen/fullscreen")`

## Accessibility

### Labeling

You can't set `aria-labelledby` or `aria-describedby` directly on `<forge-dialog>` — the native `<dialog>` element underneath it lives across a shadow boundary those attributes can't reach. Use `labelledby` and `describedby` instead: the id (or space-separated ids) of elements inside the dialog that label or describe it, such as the title in its header toolbar. The dialog resolves them across the shadow boundary, wires up the equivalent ARIA relationships, and announces them correctly when it opens. Note there's no `aria-` prefix.

```html
<forge-dialog labelledby="dialog-title" describedby="dialog-message">
  <h2 id="dialog-title" class="forge-typography--heading3">Delete file?</h2>
  <p id="dialog-message">This can't be undone.</p>
</forge-dialog>
```

`labelledby` and `describedby` were added in Forge 3.24.0. On earlier versions, or for a dialog without a visible title, set `label` and `description` to plain-text values instead. When both are set, `labelledby` and `describedby` take precedence.

```html
<forge-dialog label="Delete file?" description="This can't be undone.">
  <p>Are you sure you want to delete this file?</p>
</forge-dialog>
```

Give the close icon button in the header an accessible name with `aria-label="Close dialog"`.

### Keyboard interaction

Keyboard navigation needs to behave the way it looks — a modal dialog makes the rest of the page inert, so interactive content outside it shouldn't be reachable while it's open. If there's a mouse-only way to close the dialog, make sure there's a keyboard equivalent too. When the dialog closes, return focus to a logical element on the page rather than losing it.

### Screen reader behavior

The dialog automatically applies `role="dialog"` and `aria-modal="true"` for you.
