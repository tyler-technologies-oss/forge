# Icon

Icons render a registered SVG from the Tyler Forge icon library, or a custom source, to represent information or reinforce an action.

**Looking for an icon?**

Browse and search all 8,500+ icons in the [icon library](https://tylerforge.design/icons/library/)

## Overview

Icons are visual symbols used to communicate the intention of content or actions, enhancing user experience by making interfaces more intuitive and scannable. The icon component in Forge renders SVG icons and supports direct integration with the Tyler icons library, providing a consistent visual language across applications.

Use an icon:

- **To reinforce a label.** An icon next to a button or menu item label helps users find it faster.
- **For familiar actions in tight spaces.** Common actions like close, search, edit, delete, and more options can be icon-only buttons in toolbars and table rows.
- **To show status.** A check, warning, or error icon reinforces a status message.

## Sizing

An icon takes the size of the text around it by default, so it lines up with an adjacent label without extra work. Inside components like buttons, icon buttons, list items, and toolbars, the component sets the icon size for you. Only set a size for a standalone icon, like one in an empty state.

## Color

Icons inherit the color of the text around them. Use the same [text emphasis](../design/color.md#text) tokens as text, and use a status color only when the icon communicates that status. An icon's color must meet the same contrast requirements as text. See the [accessibility](./icon.md) guidance for decorative and semantic icons.

## Usage

`forge-icon` renders an SVG by `name` from icons registered via `IconRegistry.define(...)`, or a raw string passed to `src`, through `theme`, `lazy`, and `viewbox`. Register every icon a page uses up front in `IconRegistry.define(...)`; an unregistered `name` with `external` set can fetch from the network instead, but registering ahead of time keeps icons from popping in. Use icons to represent information visually or reinforce an action's meaning — never as the sole way to convey something essential, since not every icon's meaning is obvious to every user.

**Register icons where a bundler won't tree-shake the call away**

`IconRegistry.define(...)` is side-effectful but not statically analyzable, so bundlers can identify the call as dead code and strip it from a production build even though it worked in dev. Call it inside a class constructor, a static initialization block, or a module that's part of the app's entry point — not a module that's only reachable through an import a bundler could otherwise decide is unused.

```js
class MyComponent extends HTMLElement {
  static {
    IconRegistry.define([tylIconForgeLogo]);
  }
}
```

## Rules

**Do**

- Use icons from the Tyler icons library.
- Pair an icon with a text label wherever there's room.
- Add a tooltip to every icon-only button.
- Let components set icon size, and inherit color from the surrounding text.
- Maintain consistent sizing within the same interface context.
- Register every icon a page needs in IconRegistry.define(...) rather than relying on external fetches.
- Import icons from the @tylertech/tyler-icons package root only; it has no /standard, /extended, or /custom subpaths.
- Pair an icon with a visible label or an accessible name whenever it conveys essential meaning on its own.
- Use icons consistently across a set of related items — either every item has one, or none does.

**Don't**

- Don't rely on an icon alone to convey information essential to completing a task.
- Don't use an icon-only button for an unfamiliar or domain-specific action.
- Don't use two different icons for the same action in one application.
- Don't use external for icons on every page load — it adds a network request the registry avoids.
- Don't mix icon styles or weights within the same group of related items.
- Don't mix icons from other libraries or design systems with Tyler icons.
- Don’t make icons too small to be easily recognizable or accessible.
- Don’t rely solely on color to convey meaning in icons.

## Custom SVG

Set `src` to a raw SVG string for a one-off icon that isn't in the registry.

Example (A custom SVG passed directly via src.): `get_forge_blocks(blockId: "components/icon/custom-svg/custom-svg")`

## Contribution

The icon library is hosted on GitHub and is open source. To view the source or contribute, see the [tyler-icons repository](https://github.com/tyler-technologies-oss/tyler-icons).

Tyler Technologies uses the Material Design Icons as a base for the standard and extended icon sets. These icons are licensed by Google but self-hosted by Forge to ensure availability and performance. We do not modify the icons in any way, and they are distributed under the original licensing terms.

The custom icons are created by Tyler Technologies and are licensed under Apache 2.0.

## Installation

### NPM

Install the Tyler icons package from NPM. This is the recommended way to consume icons in your applications or libraries.

```bash
npm install @tylertech/tyler-icons
```

Icons are distributed as ES modules. Import the ones you need from the package root. Each icon object has a `name` and a `data` property, where `data` is the raw SVG string.

```javascript
import { tylIconFavorite, tylIconHeart, tylIconForgeLogo } from '@tylertech/tyler-icons';
```

Register each icon with the `IconRegistry`, then reference it by name:

```javascript
import { IconRegistry } from '@tylertech/forge';

IconRegistry.define([tylIconFavorite, tylIconHeart, tylIconForgeLogo]);
```

```html
<forge-icon name="favorite"></forge-icon>
<forge-icon name="heart"></forge-icon>
<forge-icon name="forge-logo"></forge-icon>
```

If you can't determine an icon's name at build time, set the `external` attribute. The component fetches the icon from the CDN at runtime, which is useful for icons chosen from dynamic data.

```html
<forge-icon name="favorite" external></forge-icon>
```

### CDN

The icons are also available from the CDN as `.svg` files, which is useful if you want to use them as images or fetch them manually.

```html
<img src="https://cdn.forge.tylertech.com/v1/icons/svg/standard/cake.svg" alt="Cake icon" />
```

You can also fetch the SVG with the `fetch` API and render it yourself. This is what `forge-icon` does under the hood when `external` is set.

```javascript
const response = await fetch('https://cdn.forge.tylertech.com/v1/icons/svg/standard/cake.svg');
const svg = await response.text();
```

**Note:** The `standard` segment of the URL is the icon set the icon belongs to. Replace it with `extended` or `custom` to access icons from those sets. These are CDN URL path segments only, not npm import paths. The `@tylertech/tyler-icons` package exports only its root and `./tyler-icons-metadata.json`, so always import icons from the package root.

## Accessibility

### Decorative icons

Most icons in an interface are decorative — they reinforce a label or action that's already conveyed some other way. Add `aria-hidden="true"` to remove a decorative icon from the accessibility tree, so assistive technology doesn't announce content that adds no information.

### Semantic icons

Treat an icon as semantic when it's the only way a user gets a piece of information — an icon-only button, a status indicator with no adjacent text. Give it:

- `role="img"`, so it's recognized as an image rather than arbitrary markup.
- An accessible name, via `aria-label`, `aria-describedby`, or a `<title>` element wired to `aria-labelledby` on the `<svg>`.

Either way, treat an icon's color like any other text color — it still has to meet the same contrast ratio requirements.
