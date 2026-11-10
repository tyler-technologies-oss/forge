# Theme and Variant Updates

How to update banners, inline messages, badges, and fields to the semantic theme and variant pattern, and what changed in the tokens.

Feedback components and fields now share one semantic theme pattern: a neutral `default` plus `info`, `success`, `warning`, and `error`. Decorative colors for categories use a separate `color` attribute on badges. Deprecated themes and properties keep working and render as described below. They'll be removed in the next major version.

## Banner and inline message

| If your code has                                  | Change it to                                               | Why                                                                                                                 |
| ------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| No `theme`, and you want the blue look            | `theme="info"`                                             | The default is now neutral instead of blue. This includes the CSS-only `.forge-banner` and `.forge-inline-message`. |
| `theme="info-secondary"`                          | No `theme`                                                 | `info-secondary` renders as the neutral default.                                                                    |
| `theme="primary"`, `"secondary"`, or `"tertiary"` | No `theme`, or the semantic theme that matches the meaning | These render as the neutral default.                                                                                |
| `theme="danger"`                                  | `theme="error"` (or `theme="critical"`)                    | `danger` still renders as `error`.                                                                                  |
| `--forge-inline-message-border-style: solid`      | `variant="outlined"`                                       | The outlined variant draws a matching border with a lighter background. The border properties are deprecated.       |

Both components have a new `variant="outlined"`, with a lighter background and a border in the theme color, at the same size as the default `tonal` variant. Text and icons are now tinted with the theme color.

## Badge

| If your code has                                                      | Change it to                                           | Why                                                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `theme="primary"`, `"secondary"`, or `"tertiary"` to label a category | `color="indigo"`, `color="plum"`, or another Radix hue | Category colors moved to `color`. These themes render as the neutral default. |
| `theme="info-secondary"`                                              | No `theme`                                             | `info-secondary` renders as the neutral default.                              |
| `theme="info-primary"`                                                | `theme="info"`                                         | `info-primary` still renders as `info`.                                       |
| `theme="danger"`                                                      | `theme="error"` (or `theme="critical"`)                | `danger` still renders as `error`.                                            |

The default theme was already neutral, so badges without a `theme` don't change. Badges also have a new `variant="outlined"`. Setting it turns off `strong`, and setting `strong` resets the variant to `tonal`. Use a `theme` for status and `color` for categories.

## Text field, select, and field

| If your code has                                                         | Change it to                                                  | Why                                                                                             |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `theme="primary"`, `"secondary"`, `"tertiary"`, `"success"`, or `"info"` | No `theme`                                                    | Only `error` and `warning` change a field's appearance. The other themes render as the default. |
| `theme="error"` to show an error                                         | `invalid`                                                     | `invalid` is the validation state. `theme="error"` renders the same way.                        |
| `variant="tonal"` to show a readonly value                               | `readonly` on the `<input>` (or `readonly` on `forge-select`) | Fields now have a readonly state with a transparent background and a lighter border.            |
| A status icon added in the `end` slot                                    | No slotted icon                                               | Invalid and warning fields show a built-in status icon.                                         |

Tonal fields no longer change on hover, and `--forge-field-tonal-background-hover` is deprecated. Plain fields no longer draw an error or warning border. The status icon and support text show the state instead.

## Surfaces

- Popovers, dialogs, and raised cards draw a hairline ring around their edge in both themes, using the `surface-elevated-ring` token.
- Toolbars inside cards, dialogs, and popovers are transparent so they match the surface behind them. To give one toolbar its own background, set `--forge-toolbar-background` on that toolbar.
- The toolbar's backdrop blur is now `--forge-toolbar-backdrop-filter` and is off by default. Set it with a translucent background for sticky toolbars over scrolling content.

## Tokens

| Token                                          | Use                                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `bg-{role}-subtle`, `bg-{role}-default`        | Alpha backgrounds (a2 and a3) for tinted surfaces, paired with `border-{role}-*`           |
| `border-neutral-*`, `border-{role}-strongest`  | The neutral role and the a11 step of the role border family                                |
| `--forge-color-{hue}-{step}`                   | Radix accent hues for categorical color. In Sass, use `theme.color-variable($hue, $step)`. |
| `surface-transparent`, `surface-elevated-ring` | A transparent surface, and the ring color for elevated surfaces                            |
| `control-bg-tonal`                             | The tonal control background                                                               |
| `brand.9`, `brand.contrast`, `brand.surface`   | Brand primitives behind the `brand` and `on-brand` theme tokens                            |

Use the `outline` tokens for dividers and control borders, and `border-{role}` for borders that follow a component's theme. See <a href={`${import.meta.env.BASE_URL}designing/color/`}>Color</a> for details.
