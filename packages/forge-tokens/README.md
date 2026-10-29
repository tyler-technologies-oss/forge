# @tylertech/forge-tokens

The global Tyler Forge™ design tokens, plus the Sass utilities for working with them.

The tokens are authored as JSON following the [design tokens format](https://styledictionary.com/info/tokens/) and are converted to other formats with [Style Dictionary](https://styledictionary.com). Sass is the only generated format for now.

Component-specific tokens are not part of this package, they live alongside their components in `@tylertech/forge`.

## Installation

```bash
npm install @tylertech/forge-tokens
```

## Tokens (JSON)

The JSON source files are exported from the package:

```js
import theme from '@tylertech/forge-tokens/tokens/theme/light.json' with { type: 'json' };
```

| File                       | Group                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------- |
| `tokens/color/palette.json`  | `color.palette` - the color palette that the theme is composed from                     |
| `tokens/color/emphasis.json` | `color.emphasis` - the opacity levels used to convey emphasis                           |
| `tokens/theme/light.json`    | `theme` - the default (light) theme                                                     |
| `tokens/theme/dark.json`     | `theme` - the dark theme, with the same token names as the light theme                  |
| `tokens/typography.json`     | `typography` - the base font, weights, scale, and every typography style                |
| `tokens/spacing.json`        | `spacing`                                                                               |
| `tokens/shape.json`          | `shape`                                                                                 |
| `tokens/border.json`         | `border`                                                                                |
| `tokens/elevation.json`      | `elevation` - the shadow colors and the shadow for each elevation level                 |
| `tokens/z-index.json`        | `z-index`                                                                               |
| `tokens/animation.json`      | `animation` - durations and easing curves                                               |

Tokens reference each other with the `{group.token}` syntax (for example, `{color.palette.indigo.500}`).

## Sass

The Sass modules are exported from the package and can be imported with `@use`:

```scss
@use '@tylertech/forge-tokens/sass/theme';
@use '@tylertech/forge-tokens/sass/spacing';

.my-class {
  color: theme.variable(primary); // => var(--forge-theme-primary, #3f51b5)
  padding: spacing.variable(medium); // => var(--forge-spacing-medium, 16px)
}
```

| Module                | Description                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| `sass/theme`          | Theme tokens, theme utility classes, and color functions (`contrast`, `scale`, ...) |
| `sass/theme/token-utils` | `get-color-theme()` for computing the dependent colors of a theme color          |
| `sass/typography`     | Typography styles and helpers                                                       |
| `sass/spacing`        | Spacing tokens                                                                      |
| `sass/shape`          | Shape (border radius) tokens                                                        |
| `sass/border`         | Border width tokens                                                                 |
| `sass/elevation`      | Elevation (shadow) and z-index tokens                                               |
| `sass/animation`      | Animation duration and easing tokens                                                |
| `sass/color-palette`  | The color palette as Sass variables (such as `$indigo-500`)                         |
| `sass/color-emphasis` | The color emphasis levels                                                           |
| `sass/utils`          | Functions and mixins for creating and providing custom properties                   |
| `sass/token-utils`    | Utilities for declaring and referencing a component's internal tokens               |

The `$prefix` for generated custom properties can be configured by `@use`-ing `sass/config` with a different value.

The generated token data used by these modules is in `sass/tokens/`. It is an implementation detail and may change.

## Development

```bash
pnpm build  # Generates sass/ from tokens/ and src/sass/
pnpm test
pnpm dev   # Builds sass/ and starts the token dev app
```

- `tokens/` - The JSON source of truth. Edit these files to change a token value.
- `src/sass/` - The hand-written Sass modules and utilities.
- `scripts/` - The Style Dictionary build.
- `dev/` - A Vite app that documents every token, in the light and dark themes. It is not published.
- `sass/` - Build output, not committed. It contains `src/sass/` plus the generated `sass/tokens/`.
