# Busy Indicator

A busy indicator blocks interaction with a fullscreen or inline region while a longer-running process completes.

## Usage

`forge-busy-indicator` blocks interaction with a region through `open`, `mode` (`fullscreen` or `inline`), and `variant` (`spinner`, `progress`, or `message-only`), plus optional `titleText`, `message`, and `cancelable`. Use it for an operation expected to take more than a second that genuinely needs to block the user, on either the whole page or a single component. For a shorter, purely visual loading cue, use a [circular progress](./circular-progress.md) or [linear progress](./linear-progress.md) indicator instead, and for a page's initial load where the eventual layout is already known, use a [skeleton](./skeleton.md) instead.

## Rules

**Do**

- Use a busy indicator only for an operation expected to take more than a second.
- Word the message as "\[Object] is being \[operation]" so the user knows exactly what's happening.
- Set cancelable when the operation can genuinely be interrupted, and leave it off otherwise.

**Don't**

- Don't use a busy indicator for a near-instant operation — a linear or circular progress indicator alone is enough.
- Don't block the whole page with mode="fullscreen" for a change scoped to a single component — use mode="inline" instead.
- Don't leave a busy indicator on screen with no message when the wait might run long.
