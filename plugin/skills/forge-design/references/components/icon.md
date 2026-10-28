# Icon

Icons render a registered SVG from the Tyler Forge icon library, or a custom source, to represent information or reinforce an action.

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

- Register every icon a page needs in IconRegistry.define(...) rather than relying on external fetches.
- Import icons from the @tylertech/tyler-icons package root only; it has no /standard, /extended, or /custom subpaths.
- Pair an icon with a visible label or an accessible name whenever it conveys essential meaning on its own.
- Use icons consistently across a set of related items — either every item has one, or none does.

**Don't**

- Don't rely on an icon alone to convey information essential to completing a task.
- Don't use external for icons on every page load — it adds a network request the registry avoids.
- Don't mix icon styles or weights within the same group of related items.

## Custom SVG

Set `src` to a raw SVG string for a one-off icon that isn't in the registry.

Example (A custom SVG passed directly via src.): `get_forge_blocks(blockId: "components/icon/custom-svg/custom-svg")`

## Accessibility

### Decorative icons

Most icons in an interface are decorative — they reinforce a label or action that's already conveyed some other way. Add `aria-hidden="true"` to remove a decorative icon from the accessibility tree, so assistive technology doesn't announce content that adds no information.

### Semantic icons

Treat an icon as semantic when it's the only way a user gets a piece of information — an icon-only button, a status indicator with no adjacent text. Give it:

- `role="img"`, so it's recognized as an image rather than arbitrary markup.
- An accessible name, via `aria-label`, `aria-describedby`, or a `<title>` element wired to `aria-labelledby` on the `<svg>`.

Either way, treat an icon's color like any other text color — it still has to meet the same contrast ratio requirements.
