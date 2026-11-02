# Typography

Guidance for using Tyler Forge's typography system in your designs.

Forge uses one font, Roboto, and a fixed set of type styles. Every piece of text in a design should use one of these styles rather than a custom size or weight. The full list of classes and how to load them is on the [developer typography](../development/typography.md) page, and the token values are on the [typography tokens](https://tylerforge.design/tokens/typography/) page.

## The scale

Each style family is numbered from smallest to largest. `heading1` is the smallest heading and `heading8` the largest.

| Family       | Range                       | Use                                                  |
| ------------ | --------------------------- | ---------------------------------------------------- |
| `display`    | `display1`–`display8`       | Large, prominent text, like a hero or an empty state |
| `heading`    | `heading1`–`heading8`       | Page, container, and section titles                  |
| `subheading` | `subheading1`–`subheading8` | Secondary titles that sit under a heading            |
| `body`       | `body1`–`body4`             | Paragraphs and general content                       |
| `label`      | `label1`–`label3`           | Field labels, group labels, and small metadata       |

`body2` is the page default. It's applied to `<body>` when the typography stylesheet loads. Use `body1` for dense or secondary content, like table cells or supporting text.

## Hierarchy

These are the styles to reach for in a Forge application. They match the [layout](./layout.md) patterns.

| Element                           | Style                |
| --------------------------------- | -------------------- |
| Page title (body header)          | `heading4`           |
| Card, dialog, and drawer titles   | `heading3`           |
| Section headings inside a surface | `heading2`           |
| Body text                         | `body2`              |
| Dense or secondary text           | `body1`              |
| Group labels and metadata         | `label1` or `label2` |

Container titles are one step smaller than the page title, so a card never competes with the page around it. When a container needs smaller headings, go smaller, not larger.

## Heading level vs visual style

The hierarchy above sets each title's visual style, which is what keeps a Forge application consistent. The HTML heading element (`h1`–`h6`) is separate: it follows the application's own document outline, so it depends on where a card or section ends up. A card title is always styled `heading3`, whether it's an `h2`, `h3`, or `h4` in a given page.

## Emphasis

Change emphasis with text color, not with size or weight. Use `text-high` for primary content, `text-medium` for descriptions and secondary text, and `text-low` for supporting text. See the [color system](./color.md#text) for the full set.

## Do and don't

**Do**

- Use a Forge type style for every piece of text.
- Keep container titles at `heading3` or smaller, one step below the page title.
- Choose the heading element from your page's outline, and the visual style from the hierarchy.
- Use text color to set emphasis.

**Don't**

- Don't set a custom font size, weight, or line height.
- Don't use a larger heading inside a card than the page title.
- Don't skip heading levels to get a smaller visual size; change the style instead.
- Don't use display styles for ordinary page or section titles.
