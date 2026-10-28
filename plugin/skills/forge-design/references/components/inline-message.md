# Inline Message

Inline messages provide contextual feedback about a specific action or state, inside the component they refer to.

## Usage

`forge-inline-message` communicates persistent, contextual guidance through `theme`, with optional `icon` and `title` slots. Place it directly beside or inside the component it refers to, such as a form, field, or card. For a page-level announcement, use a [banner](./banner.md) instead; for a reactive confirmation of an action, use a [toast](./toast.md) instead; for high-priority information that needs a decision, use a [dialog](./dialog.md) instead.

## Rules

**Do**

- Use an inline message for reference or helper information scoped to a single component, like a form or field.
- Keep the message succinct — two lines or fewer where possible.
- Choose an icon that matches the message's theme (info, warning, success, error).

**Don't**

- Don't use an inline message for a page-level announcement — use a banner instead.
- Don't use an inline message to confirm an action the user just took — use a toast instead.
- Don't use an inline message for high-priority information that requires a decision — use a dialog instead.

## With a title

Add a `title` slot above the message body when the message needs a short heading of its own.

Example (A title slot sits above the message body.): `get_forge_blocks(blockId: "components/inline-message/with-title/with-title")`

## Theme

Set `theme` to `error`, `warning`, `success`, `info` (the default), or `info-secondary` to match the message's meaning, and pair it with an icon in the `icon` slot that reinforces the same meaning.

Example (Every inline message theme, each paired with an icon.): `get_forge_blocks(blockId: "components/inline-message/themed/themed")`

## Accessibility

### Live-region behavior

For an important or urgent inline message, set `role="alert"` on `forge-inline-message` — this is equivalent to `aria-live="assertive"` and announces the message immediately. For something less urgent, use `aria-live="polite"` instead so it waits until the user finishes their current task before announcing.
