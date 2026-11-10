# Banner

Banners inform users of important, page-level information — such as errors, warnings, or success messages — without interrupting their workflow.

## Overview

A banner displays an important, succinct message, and provides actions for users to address (or dismiss the banner). It requires a user action to be dismissed.

Banners should be displayed at the top of the screen, below the app bar. The banner displays a short amount of information, but may be clicked to launch a dialog with rich text information.

## Usage

`forge-banner` displays a persistent, page-level message through `theme`, `dismissed`, and `persistent`, plus optional `icon` and `button` slots. Reserve it for a full-page announcement the user only needs to see once; for guidance scoped to a single field or section, use an [inline message](./inline-message.md) instead, for a reactive confirmation of an action use a [toast](./toast.md), and for a high-priority alert that requires a decision use a [dialog](./dialog.md).

## Rules

**Do**

- Use a banner for a page-level announcement the user only needs to see once, like a new feature or maintenance notice.
- Pair the message with a "Learn more" action when there's more detail to show, typically opening a dialog.
- Keep banner text succinct — a sentence or two, not a paragraph.
- Place a banner at the top of the page, below the app bar.

**Don't**

- Don't use a banner for information scoped to a single field or component — use an inline message instead.
- Don't use a banner for a reactive confirmation of an action, like a save or delete — use a toast instead.
- Don't use a banner for a high-priority alert that requires a decision — use a dialog instead.

## Theme

Leave `theme` unset for a neutral banner. Set it to `info`, `success`, `warning`, or `error` to match the message's meaning. `critical` is an alias for `error`. The `primary`, `secondary`, `tertiary`, and `info-secondary` themes are deprecated and render as the neutral default.

Example (Every banner theme, ordered from most to least urgent.): `get_forge_blocks(blockId: "components/banner/themed/themed")`

## Variant

The default `tonal` variant uses a tinted background. Set `variant="outlined"` for a lighter background with a rounded border in the same color, which suits a banner placed inside the page content rather than edge to edge below the app bar. Both variants work with every theme. For the CSS-only banner, add the `forge-banner--outlined` class.

```html
<forge-banner theme="warning" variant="outlined">
  <forge-icon slot="icon" name="warning"></forge-icon>
  <span>Scheduled maintenance starts at 10 PM.</span>
</forge-banner>
```

## With an icon and action

Pair the message with a leading icon in the `icon` slot to reinforce its severity, and a trailing action in the `button` slot when there's more detail to show.

Example (A banner with a leading icon and a Learn more action.): `get_forge_blocks(blockId: "components/banner/combined/combined")`

## Persistent

Set `persistent` to remove the banner's built-in dismiss button when the message shouldn't be dismissed by the user.

Example (A persistent banner has no built-in dismiss button.): `get_forge_blocks(blockId: "components/banner/persistent/persistent")`

## Accessibility

### Live region behavior

Set `role="alert"` on an urgent banner — equivalent to `aria-live="assertive"` — so it's announced immediately. For a less urgent banner, use `aria-live="polite"` instead, so assistive technology waits until the user finishes their current task before announcing it.
