# Inline Message

Inline messages provide contextual feedback about a specific action or state, inside the component they refer to.

## Overview

Inline messages are persistent visual elements that communicate contextual information inside a component—such as a card, dialog, or form. They help users understand state, feedback, or important guidance related to the content they’re viewing.

In forms, inline messages may appear:

- At the top of the form to share important informational content users should read first.
- Above or below fields to provide field-specific context or validation.
- At the bottom of the form to display confirmation or error information.

## Usage

`forge-inline-message` communicates persistent, contextual guidance through `theme`, with optional `icon` and `title` slots. Place it directly beside or inside the component it refers to, such as a form, field, or card. For a page-level announcement, use a [banner](./banner.md) instead; for a reactive confirmation of an action, use a [toast](./toast.md) instead; for high-priority information that needs a decision, use a [dialog](./dialog.md) instead.

## Rules

**Do**

- Place inline messages close to their related content (e.g., directly above a field).
- Use an inline message for reference or helper information scoped to a single component, like a form or field.
- Match the theme to the message severity; use the mildest theme that conveys the message accurately.
- Keep the message succinct — two lines or fewer where possible.
- Choose an icon that matches the message's theme (info, warning, success, error).
- Use title and message when emphasis or clarity is needed; omit the title for short messages.

**Don't**

- Don't overuse multiple inline messages on one screen; this dilutes their impact.
- Don't stack conflicting themes together (e.g., success and error in the same region).
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
