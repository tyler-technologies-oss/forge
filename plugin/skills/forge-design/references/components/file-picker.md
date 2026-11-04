# File Picker

Lets a user upload one or more files via drag-and-drop or a system file chooser, with visual cues for valid and invalid drops.

## Overview

File pickers enable users to upload single or multiple files through drag-and-drop interaction or traditional file browser selection. This component provides flexible upload options with clear visual feedback and file management capabilities, making it suitable for both standalone use and integration within forms. Once files are selected, they display as a list or grid of thumbnails, providing visual confirmation of the uploaded content.

## Usage

`forge-file-picker` combines a drag-and-drop target with a slotted trigger [button](./button.md), controlled through `accept`, `max-size`, `capture`, `multiple`, `disabled`, `compact`, and `borderless`. The component only handles the picking gesture; render uploaded files yourself afterward, typically as a list with a progress indicator per file while it uploads.

Always set `type="button"` on the slotted trigger button — without it, clicking the trigger inside a `<form>` submits that form. The system file-chooser dialog also returns focus to whichever element triggered it, so don't move focus yourself once it closes.

```html
<forge-file-picker>
  <button slot="trigger" type="button">Select files</button>
</forge-file-picker>
```

## Rules

**Do**

- Always use `forge-file-picker` for file and image uploads.
- Always pair the drag-and-drop target with a button — it's the only way to pick files with a keyboard or screen reader.
- State any file-type or size constraints in the secondary or helper-text slot so they're visible before a user tries to upload.
- Show per-file upload progress and completion, and let a user remove or retry a file after it's added.
- Truncate long filenames with an ellipsis instead of wrapping or overflowing.

**Don't**

- Don't use a native `<input type="file">` for uploads — use `forge-file-picker` instead.
- Don't accept a file past the accept or max-size constraint without immediate, specific error feedback.
- Don't use a full-size file picker where space is tight — use compact instead.
- Don't customize the trigger button's label without keeping it a clear, actionable verb, like "Select files".

## Constraints

Set `accept` and `max-size` to restrict which files can be chosen, and state the limits in the helper text so they're visible up front.

Example (Accept and max-size restrict which files can be chosen; helper text states the limits.): `get_forge_blocks(blockId: "components/file-picker/constraints/constraints")`

## Compact

Set `compact` to remove the drag-and-drop target, leaving only the trigger button — useful where space is tight.

Example (Compact removes the drag-and-drop target, leaving only the trigger button.): `get_forge_blocks(blockId: "components/file-picker/compact/compact")`

## Borderless

Set `borderless` to drop the picker's own border, for use inside another bordered container.

Example (Borderless drops the picker's own border, for use inside another bordered container.): `get_forge_blocks(blockId: "components/file-picker/borderless/borderless")`

## Disabled

Set `disabled` so the picker can't be interacted with.

Example (A disabled file picker can't be interacted with.): `get_forge_blocks(blockId: "components/file-picker/disabled/disabled")`

## Accessibility

### Trigger button

Give the trigger button text or a label that accurately describes what it does, and set `type="button"` on it — without that, clicking it inside a `<form>` can trigger an accidental submit.

### Focus after the system dialog closes

Once the native file-chooser dialog closes, focus should return to the element that triggered it, so keyboard users don't lose their place on the page.
