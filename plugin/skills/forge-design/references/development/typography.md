# Typography

Forge's typography font, stylesheet, and typographic scale.

Typography defines a set of consistent font styles use throughout your application(s).

## Font

Forge provides a default font that is available for use in your applications. The default font family is `Roboto`.

The Tyler font is hosted on the Forge CDN, and can be included in your application by adding the following `<link>` to your HTML:

```html
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
```

Note: The font includes only the weights and styles from Roboto that are governed by the design system.

## Stylesheet

The Forge typography styles are available as a CSS stylesheet that can be included in your application. The stylesheet includes a
set of classes that can be used to apply the Forge typography styles to your content.

```css
@use '@tylertech/forge/dist/typography/forge-typography';
```

Note: When loading this stylesheet, default styles will be automatically applied to the `<body>` element to set the `body2` style
(16px), the page default. `body1` is the smaller 14px style.

Don't set custom `font-size`, `font-weight`, or `line-height` values. Use a typography class or a `--forge-typography-*` token instead.

## Semantic HTML vs Typography Styles

It's important to prioritize using the correct semantic HTML hierarchy over visual typography classes. For example, use `<h1>` for page titles,
`<h2>` for section headings, and so on. Typography classes should then be used for applying the correct design to your page, but it should never
drive which semantic HTML element you use.

For example, you can create an `<h1>` that uses the `heading6` style, and that is perfectly valid. You do not need to need to use a matching
semantic heading element for each typography class.

## Scale

Forge uses a typographic scale to define the sizes of text elements. The scale is based on a modular scale, which is a sequence of numbers that
are related to each other by a consistent ratio. This ratio is used to determine the size of each text element in the scale. The scale uses an incremental
numbering system, where the number represents the size of the text element from smallest to largest for each style.

**These scale sizes should never drive which semantic HTML element you use.**

## Display

Display styles are used for large, prominent text such as page titles and headings.

| Class                        | Example   |
| ---------------------------- | --------- |
| `forge-typography--display1` | Display 1 |
| `forge-typography--display2` | Display 2 |
| `forge-typography--display3` | Display 3 |
| `forge-typography--display4` | Display 4 |
| `forge-typography--display5` | Display 5 |
| `forge-typography--display6` | Display 6 |
| `forge-typography--display7` | Display 7 |
| `forge-typography--display8` | Display 8 |

## Heading

Heading styles are used for page titles and section headings.

| Class                        | Example   |
| ---------------------------- | --------- |
| `forge-typography--heading1` | Heading 1 |
| `forge-typography--heading2` | Heading 2 |
| `forge-typography--heading3` | Heading 3 |
| `forge-typography--heading4` | Heading 4 |
| `forge-typography--heading5` | Heading 5 |
| `forge-typography--heading6` | Heading 6 |
| `forge-typography--heading7` | Heading 7 |
| `forge-typography--heading8` | Heading 8 |

## Subheading

Subheading styles are used for section subheadings.

| Class                           | Example      |
| ------------------------------- | ------------ |
| `forge-typography--subheading1` | Subheading 1 |
| `forge-typography--subheading2` | Subheading 2 |
| `forge-typography--subheading3` | Subheading 3 |
| `forge-typography--subheading4` | Subheading 4 |
| `forge-typography--subheading5` | Subheading 5 |
| `forge-typography--subheading6` | Subheading 6 |
| `forge-typography--subheading7` | Subheading 7 |
| `forge-typography--subheading8` | Subheading 8 |

## Body

Body styles are used for paragraph text and general content text.

| Class                     | Example |
| ------------------------- | ------- |
| `forge-typography--body1` | Body 1  |
| `forge-typography--body2` | Body 2  |
| `forge-typography--body3` | Body 3  |
| `forge-typography--body4` | Body 4  |

## Label

Label styles are used for small text such as form labels and captions.

| Class                      | Example |
| -------------------------- | ------- |
| `forge-typography--label1` | Label 1 |
| `forge-typography--label2` | Label 2 |
| `forge-typography--label3` | Label 3 |

## Button

Button styles are used for button text.

| Class                      | Example |
| -------------------------- | ------- |
| `forge-typography--button` | Button  |

## Link

Link styles are used for hyperlinks within your application. These styles are typically used for anchor (`<a>`) elements
that are used to navigate to other pages.

| Class                            | Example |
| -------------------------------- | ------- |
| `forge-hyperlink`                | Link    |
| `forge-typography--link` (alias) | Link    |

## Overline

Overline styles are used for small, uppercase text such as section headers.

| Class                        | Example  |
| ---------------------------- | -------- |
| `forge-typography--overline` | Overline |
