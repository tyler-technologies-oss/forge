# Secret

Conceals sensitive content with a blur, mask, or noise effect, revealing it on user interaction.

## Usage

`forge-secret` conceals its default-slot content until a user reveals it, through `open`, `variant` (`blur`, `masked`, or `noise`), `block`, `buttonPosition`, `showOnHover`, and `name`. Use it for sensitive values a user might not want visible by default, like an account number or password, in a context where someone else could be looking at the screen.

**Not a security control**

Concealed content is still present in the DOM and can be read from the page source — `forge-secret` only prevents _visual_ exposure. It's useful for shoulder-surfing and accidental-glance protection, but it does not protect against a determined user. The only way to truly secure sensitive information is to not send it to the client at all.

## Rules

**Do**

- Use a secret for a value someone might not want visible by default, like an account number.
- Set name to group related secrets so revealing one conceals the others.
- Set block for a secret that wraps a larger piece of content, like a paragraph or image.

**Don't**

- Don't treat a secret as a security boundary — the concealed content is still in the DOM and page source.
- Don't use a secret for content that's fine to always show — it adds an interaction step with no benefit.

## Basic usage

Content stays concealed until a user clicks the reveal button.

Example (A secret concealing inline content until revealed.): `get_forge_blocks(blockId: "components/secret/demo/demo")`

## Named groups

Give multiple secrets the same `name` and they behave like a radio group — revealing one conceals any other open secret sharing that name.

Example (Secrets sharing a name, so revealing one conceals the others.): `get_forge_blocks(blockId: "components/secret/named-group/named-group")`

## Block layout

Set `block` for a secret that wraps a larger piece of content, like a paragraph or image, instead of displaying inline with surrounding text.

Example (A block secret concealing a larger piece of content.): `get_forge_blocks(blockId: "components/secret/block/block")`

## Accessibility

### Roles and states

`forge-secret` uses `role="group"` to semantically group its content with the reveal button. The button carries `aria-expanded` to convey whether the content is currently visible, and `aria-controls` to associate it with the group. When content is revealed, that change is announced to screen readers through a live region. While concealed, the content is marked `inert` so it can't receive keyboard focus or be read by assistive technology.

### Keyboard interaction

The reveal button is focusable and can be toggled with Enter or Space. Pressing Escape while a secret is open closes it. Clicking the concealed content itself also reveals it and moves focus to the button.
