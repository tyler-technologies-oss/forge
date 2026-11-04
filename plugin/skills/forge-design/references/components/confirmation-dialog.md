# Confirmation Dialog

A confirmation dialog is a modal that presents a brief message or alert and asks the user to make a primary or secondary decision.

## Overview

A confirmation dialog interrupts the user to confirm a decision before the app acts on it, such as deleting data or discarding changes. It has a message and two actions: a primary action that confirms the decision and a secondary action that lets the user back out.

For a succinct alert of a sentence or less, the title is usually omitted to keep the dialog focused. Use a title for longer messages or critical actions. Confirmation dialogs look the same on mobile and desktop.

## Usage

`forge-confirmation-dialog` is opened by setting `open`, and takes its content through the `title`, `message`, `secondary-button-text`, and `primary-button-text` slots. Listen for `forge-confirmation-dialog-action`: `detail.value` is `true` for the primary action and `false` for the secondary action or an Escape dismissal. Call `preventDefault()` on the event to keep the dialog open, and set `isBusy` while an async action runs. Use a confirmation dialog for a quick yes-or-no decision; for content that needs its own layout or form fields, use a [dialog](./dialog.md) instead.

## Rules

**Do**

- Phrase the message as a clear question or statement of the consequence.
- Label the primary action with the specific verb, like Delete or Discard, rather than Yes or OK.
- Offer a secondary action that lets the user cancel without proceeding.
- Set isBusy and call preventDefault() on the action event while an async action finishes.
- Return focus to a logical element on the page after the dialog closes.

**Don't**

- Don't use a confirmation dialog for routine actions that are easy to undo.
- Don't use one to show information the user doesn't need to act on.
- Don't put forms or long content in it — use a dialog instead.
- Don't expect a backdrop click to dismiss it; the backdrop is ignored.

## Basic usage

Slot text into `title`, `message`, `secondary-button-text`, and `primary-button-text`. Every slot is optional; the secondary button is hidden when its slot is empty, and the primary button defaults to "Confirm".

Example (A confirmation dialog opened by a button, with a title, message, and two actions.): `get_forge_blocks(blockId: "components/confirmation-dialog/demo/demo")`

## Handling the action

Read `detail.value` from the `forge-confirmation-dialog-action` event to see which action the user chose.

```js
const dialog = document.querySelector('forge-confirmation-dialog');

dialog.addEventListener('forge-confirmation-dialog-action', async event => {
  if (!event.detail.value) {
    return;
  }
  event.preventDefault();
  dialog.isBusy = true;
  await deleteImages();
  dialog.open = false;
});
```

## Accessibility

### Screen reader behavior

The confirmation dialog applies `role="dialog"` and `aria-modal="true"` for you, and its title is rendered as a heading when one is slotted. When it opens, a screen reader announces the dialog's name and description.

When `isBusy` is set, the primary button shows a progress indicator and both buttons are disabled. Use `busyLabel` to give that indicator a descriptive accessible name (the default is "Loading").

### Labeling

`aria-labelledby` and `aria-describedby` are set automatically from the `label` and `description` properties. If you don't set them, the dialog uses the text in the `title` and `message` slots. Set `label` and `description` when the slotted content isn't plain text or isn't the best announcement.

```html
<forge-confirmation-dialog label="Delete images" description="This permanently removes the selected images." busy-label="Deleting images">
  <span slot="title">Delete selected images?</span>
  <span slot="message">Images will be permanently removed from your account and all synced devices.</span>
</forge-confirmation-dialog>
```

### Keyboard interaction

The dialog is modal, so the rest of the page is inert while it's open. When a title is slotted, the close button is named "Close confirmation dialog" and receives focus when the dialog opens.

| Key         | Action                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------- |
| Tab         | Moves focus to the next control inside the dialog.                                                |
| Shift + Tab | Moves focus to the previous control inside the dialog.                                            |
| Enter/Space | Activates the focused button or the close button.                                                 |
| Escape      | Dismisses the dialog as the secondary action (`detail.value` is `false`, reason `light-dismiss`). |

Closing with the close button also counts as the secondary action. Make sure focus returns to a logical element, such as the trigger, after the dialog closes.
