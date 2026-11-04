# REFERENCE: Spacing Design Tokens

**Tyler Forge Design System** | **Category:** Spacing | **Type:** CSS Custom Properties

**PURPOSE:** Consistent spacing scale for layout, padding, and margins across Tyler Forge components.

**USAGE:** Apply via CSS: `padding: var(--forge-spacing-medium);`

## SCALE: Spacing Values

**Hierarchical spacing scale from minimal to maximum:**

| Token | Value | Usage Context |
|-------|-------|---------------|
| `--forge-spacing-xxxsmall` | `2px` | Minimal spacing, fine adjustments |
| `--forge-spacing-xxsmall` | `4px` | Very small gaps, tight layouts |
| `--forge-spacing-xsmall` | `8px` | Small spacing, compact components |
| `--forge-spacing-small` | `12px` | Small to medium spacing |
| `--forge-spacing-medium` | `16px` | Standard spacing, most common |
| `--forge-spacing-medium-large` | `20px` | Medium-large spacing |
| `--forge-spacing-large` | `24px` | Large spacing, generous layouts |
| `--forge-spacing-xlarge` | `32px` | Extra large spacing |
| `--forge-spacing-xxlarge` | `48px` | Very large spacing, major sections |
| `--forge-spacing-xxxlarge` | `56px` | Maximum spacing, page-level separation |

**INTEGRATION:** Framework and component usage:
- **Other tokens:** Use `get_design_tokens` for `color`, `typography`, `elevation`, etc.
- **Components:** Use `list_components` or `find_components` to find spacing-enabled components
- **Complete reference:** Use `get_design_tokens` for comprehensive design system token guide
