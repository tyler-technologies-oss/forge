# Avatar

A non-interactive circle that represents an entity — with an image, initials, or an icon.

## Usage

`forge-avatar` represents an entity through `imageUrl`, `text` (rendered as initials via `letterCount`), or a slotted icon when neither is set. Use it for people, accounts, or records that are genuinely identifiable by image or initials, most often in a list, table row, card, or navigation header. Skip it when the image or initials add no real information, like using a category's first letter as a stand-in avatar.

## Rules

**Do**

- Use a real photo when one is likely to be available and the person is likely to be recognizable.
- Fall back to initials when no image is available, rather than leaving the avatar empty.
- Use a larger avatar in a card or profile header, and a smaller one in a list or table row.

**Don't**

- Don't use an avatar when the image or initials don't add information — an icon or plain text may fit better.
- Don't rely on an avatar's initials alone to distinguish records with the same first letter — pair it with a visible name.
- Don't imply interactivity — avatars have no hover or focus state of their own.

## Basic usage

Set `text` for an avatar that renders initials — by default, the first letter of each word, controlled by `letterCount`.

Example (An avatar rendering initials from its text.): `get_forge_blocks(blockId: "components/avatar/demo/demo")`

## With an icon

Slot a `forge-icon` instead of setting `text` or `imageUrl` when the avatar represents something other than a named person — like a generic account or object type.

Example (An icon slotted in place of text or an image.): `get_forge_blocks(blockId: "components/avatar/with-icon/with-icon")`

## With an image

Set `imageUrl` to show a photo instead of initials or an icon.

Example (An avatar showing a photo instead of initials.): `get_forge_blocks(blockId: "components/avatar/with-image/with-image")`

## Accessibility

### Screen reader visibility

An avatar isn't inherently meaningful to assistive technology. Add `aria-hidden="true"` when one is purely decorative, and avoid relying on an avatar for essential navigation.

### Composing with an icon button

When an avatar is nested inside an icon button — a profile trigger, for example — give the icon button its own accessible label. The avatar's image or initials aren't announced as a label on their own.

### Color and contrast

If an avatar's color conveys meaning, such as a status ring, pair it with another visual cue for users with color vision deficiencies. Foreground text still needs to meet WCAG 2.2 contrast requirements against the background.
