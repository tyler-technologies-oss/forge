# Page State

Page state displays a full-height message — for an empty result, an error, or general information — with an optional graphic and actions.

## Usage

`forge-page-state` centers a `graphic`, `title`, `message`, and one or more `action` buttons. It adapts to whatever container it's in, so use it for a full-page empty state or server error, or scale it down inside a card or side sheet when space is limited.

## Rules

**Do**

- Always include a graphic — it's the part users register first.
- Write a header that describes the situation without sounding actionable, and body text that's concise and specific.
- Include an action only when there's a genuine, logical next step, like "Add attachment" or "Refresh".
- Use a greyscale illustration for a low-emphasis or secondary page state, and full color when it's the primary focus of the screen.

**Don't**

- Don't invent an action just to fill the slot — leave it empty when there's nothing useful for the user to do.
- Don't use a full-color illustration for a mini, low-emphasis empty state inside a card — prefer greyscale there.
- Don't write header text that reads like an accusation or a dead end — keep the tone conversational.

## Basic usage

Slot a `graphic`, `title`, `message`, and one or more `action` buttons.

Example (A full page-state with a graphic, title, message, and two actions.): `get_forge_blocks(blockId: "components/page-state/demo/demo")`

## Accessibility

### Graphic alt text

If the page state's graphic communicates meaning, give it a descriptive `alt` attribute. If it's purely decorative, use an empty `alt=""` so assistive technology skips over it.

### Action buttons

If a page state includes action buttons, verify each one has an appropriate role — this only needs attention if you're not using a real `forge-button`.
