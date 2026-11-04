# REFERENCE: Color Design Tokens

**Tyler Forge Design System** | **Category:** Colors | **Type:** CSS Custom Properties

**PURPOSE:** Semantic color tokens provide consistent theming across Tyler Forge components. Use these CSS variables for component styling and custom implementations.

**USAGE:** Apply via CSS custom properties: `color: var(--forge-theme-primary);`

## PALETTE: Surface Colors

**Background colors for content areas and containers:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-surface` | Primary content background | Main content areas, cards, panels |
| `--forge-theme-surface-dim` | Subtle background | Behind surfaces for contrast |
| `--forge-theme-surface-bright` | Elevated background | Floating surfaces, modals |
| `--forge-theme-surface-inverse` | High contrast background | Emphasized floating surfaces |
| `--forge-theme-surface-container` | Standard container | Component containers |
| `--forge-theme-surface-container-minimum` | Minimal container | Low emphasis containers |
| `--forge-theme-surface-container-low` | Low emphasis container | Secondary containers |
| `--forge-theme-surface-container-medium` | Medium emphasis container | Standard containers |
| `--forge-theme-surface-container-high` | High emphasis container | Prominent containers |

## PALETTE: Brand Colors

**Primary brand identity colors:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-brand` | Brand identity color | App bars, headers, brand elements |

## PALETTE: Primary Colors

**Main accent colors for interactive elements:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-primary` | Primary accent | Buttons, links, key interactions |
| `--forge-theme-primary-container-minimum` | Minimal primary container | Subtle primary backgrounds |
| `--forge-theme-primary-container-low` | Low primary container | Light primary backgrounds |
| `--forge-theme-primary-container` | Standard primary container | Primary component backgrounds |
| `--forge-theme-primary-container-high` | High primary container | Emphasized primary backgrounds |

## PALETTE: Secondary Colors

**Supporting colors that complement primary colors:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-secondary` | Secondary accent | Alternative actions, complementary elements |
| `--forge-theme-secondary-container-minimum` | Minimal secondary container | Subtle secondary backgrounds |
| `--forge-theme-secondary-container-low` | Low secondary container | Light secondary backgrounds |
| `--forge-theme-secondary-container` | Standard secondary container | Secondary component backgrounds |
| `--forge-theme-secondary-container-high` | High secondary container | Emphasized secondary backgrounds |

## PALETTE: Tertiary Colors

**Additional accent colors for visual interest:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-tertiary` | Tertiary accent | Third-level actions, decorative elements |
| `--forge-theme-tertiary-container-minimum` | Minimal tertiary container | Subtle tertiary backgrounds |
| `--forge-theme-tertiary-container-low` | Low tertiary container | Light tertiary backgrounds |
| `--forge-theme-tertiary-container` | Standard tertiary container | Tertiary component backgrounds |
| `--forge-theme-tertiary-container-high` | High tertiary container | Emphasized tertiary backgrounds |

## SEMANTIC: Success Colors

**Colors for positive feedback and successful states:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-success` | Success indicator | Success messages, checkmarks, positive actions |
| `--forge-theme-success-container-minimum` | Minimal success container | Subtle success backgrounds |
| `--forge-theme-success-container-low` | Low success container | Light success backgrounds |
| `--forge-theme-success-container` | Standard success container | Success component backgrounds |
| `--forge-theme-success-container-high` | High success container | Emphasized success backgrounds |

## SEMANTIC: Error Colors

**Colors for error states and negative feedback:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-error` | Error indicator | Error messages, validation failures, destructive actions |
| `--forge-theme-error-container-minimum` | Minimal error container | Subtle error backgrounds |
| `--forge-theme-error-container-low` | Low error container | Light error backgrounds |
| `--forge-theme-error-container` | Standard error container | Error component backgrounds |
| `--forge-theme-error-container-high` | High error container | Emphasized error backgrounds |

## SEMANTIC: Warning Colors

**Colors for caution and warning states:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-warning` | Warning indicator | Warning messages, caution alerts, potentially destructive actions |
| `--forge-theme-warning-container-minimum` | Minimal warning container | Subtle warning backgrounds |
| `--forge-theme-warning-container-low` | Low warning container | Light warning backgrounds |
| `--forge-theme-warning-container` | Standard warning container | Warning component backgrounds |
| `--forge-theme-warning-container-high` | High warning container | Emphasized warning backgrounds |

## SEMANTIC: Info Colors

**Colors for informational content and neutral feedback:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-info` | Information indicator | Info messages, help text, neutral notifications |
| `--forge-theme-info-container-minimum` | Minimal info container | Subtle info backgrounds |
| `--forge-theme-info-container-low` | Low info container | Light info backgrounds |
| `--forge-theme-info-container` | Standard info container | Info component backgrounds |
| `--forge-theme-info-container-high` | High info container | Emphasized info backgrounds |

## TYPOGRAPHY: Text Colors

**Text colors with hierarchical emphasis levels:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-text-high` | High emphasis text | Headlines, primary content, important text |
| `--forge-theme-text-high-inverse` | High emphasis on dark backgrounds | Light text on dark surfaces |
| `--forge-theme-text-medium` | Medium emphasis text | Body text, secondary content |
| `--forge-theme-text-medium-inverse` | Medium emphasis on dark backgrounds | Light body text on dark surfaces |
| `--forge-theme-text-low` | Low emphasis text | Supporting text, captions |
| `--forge-theme-text-low-inverse` | Low emphasis on dark backgrounds | Light supporting text on dark surfaces |
| `--forge-theme-text-lowest` | Minimal emphasis text | Disabled text, placeholders |
| `--forge-theme-text-lowest-inverse` | Minimal emphasis on dark backgrounds | Light disabled text on dark surfaces |

## STYLING: Outline Colors

**Border and outline colors with hierarchical emphasis:**

| Token | Purpose | Usage Context |
|-------|---------|---------------|
| `--forge-theme-outline` | Standard borders | Input borders, card outlines, dividers |
| `--forge-theme-outline-low` | Subtle borders | Low emphasis dividers, subtle separators |
| `--forge-theme-outline-medium` | Medium borders | Standard component borders |
| `--forge-theme-outline-high` | Prominent borders | Focus indicators, emphasized outlines |

---

**INTEGRATION:** Framework and component usage:
- **Token categories:** Use `get_design_tokens` with `spacing`, `typography`, `animation`, `border`, `elevation`, `layering`, `shape`
- **Component search:** Use `find_components` with `query=color` or `list_components` to find color-enabled components
- **Border tokens:** Use `get_design_tokens border` for complementary outline and border tokens
- **Complete reference:** Use `get_design_tokens` for comprehensive design system token guide
