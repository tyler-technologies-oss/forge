# Iconography

Guidance for using Tyler Forge icons in your designs.

> **Experimental:** this guidance is an early draft and will likely change. Prefer component docs, blocks, and the stable guides where they disagree.

Forge uses the [Tyler Icons](https://tylerforge.design/icons/library/) library for every icon in an interface. Icons help users scan and recognize actions, but they work best alongside text, not in place of it. For how to install and register icons in code, see the [developer icons](../development/icons.md) page.

## When to use an icon

- **To reinforce a label.** An icon next to a button or menu item label helps users find it faster.
- **For familiar actions in tight spaces.** Common actions like close, search, edit, delete, and more options can be icon-only buttons in toolbars and table rows.
- **To show status.** A check, warning, or error icon reinforces a status message.

Use an icon-only button only for actions users already recognize. For a domain-specific or unfamiliar action, use a text button. Give every icon-only button a tooltip with its name.

## Sizing

An icon takes the size of the text around it by default, so it lines up with an adjacent label without extra work. Inside components like buttons, icon buttons, list items, and toolbars, the component sets the icon size for you. Only set a size for a standalone icon, like one in an empty state.

## Decorative and meaningful icons

- **Decorative** icons repeat information that's already in nearby text, like an icon next to a "Save" label. Hide them from assistive technology.
- **Meaningful** icons are the only way a user gets the information, like an icon-only button or a status icon with no text. Give them an accessible name.

Either way, an icon's color must meet the same contrast requirements as text. See the icon [accessibility](../components/icon.md) guidance for the details.

## Color

Icons inherit the color of the text around them. Use the same [text emphasis](./color.md#text) tokens as text, and use a status color only when the icon communicates that status.

## Do and don't

**Do**

- Use icons from the Tyler Icons library.
- Pair an icon with a text label wherever there's room.
- Add a tooltip to every icon-only button.
- Let components set icon size, and inherit color from the surrounding text.

**Don't**

- Don't use an icon-only button for an unfamiliar or domain-specific action.
- Don't use two different icons for the same action in one application.
- Don't rely on an icon's color alone to communicate status.
- Don't mix icons from other libraries with Tyler Icons.
