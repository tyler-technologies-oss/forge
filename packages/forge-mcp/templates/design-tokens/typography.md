# REFERENCE: Tyler Forge Typography

**Tyler Forge Design System** | **Category:** Typography | **Type:** CSS Classes & Design Tokens

**PURPOSE:** Consistent typography scale and styling system for clarity, readability, and visual hierarchy across Tyler Forge applications.

## SETUP: Tyler Font Integration

**Default Font Family:** Roboto (curated weights and styles for design system)

**CDN Integration:** Add to your HTML `<head>` section:

```html
<link rel="stylesheet" href="https://cdn.forge.tylertech.com/v1/css/tyler-font.css" />
```

## SETUP: Typography Stylesheet

**Complete Forge CSS (includes typography):**

```css
@use '@tylertech/forge/dist/forge.css';
```

**Typography-only stylesheet:**

```css
@use '@tylertech/forge/dist/typography/forge-typography';
```

**Auto-applied:** Typography stylesheet automatically sets `body2` style on `<body>` element.

## USAGE: Semantic HTML + Typography Classes

**PRINCIPLE:** Prioritize semantic HTML structure over visual appearance.

**CORRECT APPROACH:**
1. Choose semantic HTML element based on content meaning (`<h1>`, `<h2>`, `<p>`, etc.)
2. Apply typography class for visual styling (`forge-typography--heading4`)
3. Semantic level and visual style don't need to match, but **always** apply typography classes on heading elements.

**EXAMPLE:** `<h1 class="forge-typography--heading4">` is valid and recommended.

## REFERENCE: Typography Scale System

**SYSTEM:** Modular scale with consistent ratio-based sizing relationships.

**NUMBERING:** Incremental system from smallest (1) to largest (8) within the following categories:
- Display (for major titles)
- Heading (for section titles)
- Subheading (for subsection titles)
- Body (for paragraph text) max 4 levels
- Label (for form labels and captions) max 3 levels
- Button (single standardized style) 1 level
- Link (single standardized style) 1 level
- Overline (single standardized style) 1 level

**IMPORTANT:** Scale numbers are for visual sizing only - use semantic HTML elements based on content meaning, not visual appearance.

## SCALE: Display Styles

**Large, prominent text for page titles and major headings (smallest to largest):**

- `forge-typography--display1`
- `forge-typography--display2`
- `forge-typography--display3`
- `forge-typography--display4`
- `forge-typography--display5`
- `forge-typography--display6`
- `forge-typography--display7`
- `forge-typography--display8`

## SCALE: Heading Styles

**Page titles and section headings (smallest to largest):**

- `forge-typography--heading1`
- `forge-typography--heading2`
- `forge-typography--heading3`
- `forge-typography--heading4`
- `forge-typography--heading5`
- `forge-typography--heading6`
- `forge-typography--heading7`
- `forge-typography--heading8`

## SCALE: Subheading Styles

**Section subheadings and secondary headers (smallest to largest):**

- `forge-typography--subheading1`
- `forge-typography--subheading2`
- `forge-typography--subheading3`
- `forge-typography--subheading4`
- `forge-typography--subheading5`
- `forge-typography--subheading6`
- `forge-typography--subheading7`
- `forge-typography--subheading8`

## SCALE: Body Text Styles

**Paragraph and general content text (smallest to largest):**

- `forge-typography--body1`
- `forge-typography--body2`
- `forge-typography--body3`
- `forge-typography--body4`

## SCALE: Label Styles

**Small text for form labels, captions, and annotations (smallest to largest):**

- `forge-typography--label1`
- `forge-typography--label2`
- `forge-typography--label3`

## SCALE: Button Text

**Standardized button text styling:**

- `forge-typography--button`

## SCALE: Link Styles

**Hyperlink text styling for navigation and actions:**

- `forge-hyperlink`
- `forge-typography--link` (alias)

## SCALE: Overline Text

**Small, uppercase text for section headers and labels:**

- `forge-typography--overline`

## BEST PRACTICES: Typography Implementation

**Guidelines for effective typography usage:**
1. **Consistency:** Always use the defined typography scale classes
2. **Semantic Structure:** Maintain logical HTML heading hierarchy (don't skip levels)
3. **Customization:** Use CSS custom properties for theme and brand variations
4. **Responsive Design:** Test typography at different screen sizes and zoom levels
5. **Accessibility:** Ensure sufficient color contrast and readable font sizes

**INTEGRATION:** Framework and design resources:
- **Design tokens:** Use `get_design_tokens color` for text color tokens and theming
- **Components:** Use `list_components` or `find_components` to find typography-enabled components
- **Installation:** Use `get_usage_guide` with `type=installation` for Tyler Forge typography setup instructions
- **Complete reference:** Use `get_design_tokens` for comprehensive design system token guide
