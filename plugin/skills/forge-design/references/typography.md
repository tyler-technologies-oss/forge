# Typography

Use Tailwind utility classes that map to Forge typography tokens. **Never define custom font-size, font-weight, line-height, or other typography properties.**

---

## CSS Class Conversion

**ALWAYS convert raw Forge CSS classes to Tailwind utilities:**

| Forge CSS Class | Tailwind Utility |
|-----------------|------------------|
| `forge-typography--heading1` | `text-heading1` |
| `forge-typography--heading2` | `text-heading2` |
| `forge-typography--heading3` | `text-heading3` |
| `forge-typography--heading4` | `text-heading4` |
| `forge-typography--heading5` | `text-heading5` |
| `forge-typography--body1` | `text-body1` |
| `forge-typography--body2` | `text-body2` |
| `forge-typography--label1` | `text-label1` |
| `forge-typography--label2` | `text-label2` |

**Pattern**: `forge-typography--{name}` → `text-{name}`

---

## Typography Scale Classes

| Class | Usage |
|-------|-------|
| `text-heading1` - `text-heading8` | Section headings (1 = smallest, 8 = largest) |
| `text-body1` - `text-body4` | Paragraph text (1 = smallest, 4 = largest) |
| `text-label1` - `text-label3` | Form labels, captions (1 = smallest) |
| `text-display1` - `text-display8` | Large display text for heroes |

---

## Text Emphasis Classes

| Class | Purpose |
|-------|---------|
| `text-high` | High emphasis - primary content |
| `text-medium` | Medium emphasis - secondary content, descriptions |
| `text-low` | Low emphasis - supporting text |
| `text-lowest` | Minimal emphasis - disabled, placeholders |
| `text-primary` | Primary brand color text |

---

## Typography Hierarchy Rules

**Scale reference**: `text-heading1` (smallest) → `text-heading5` (largest)

- **Page titles**: `text-heading4` or `text-heading5` - reserved for main page headers only
- **Card headers**: `text-heading3` as default, never larger - can use `text-heading2` or `text-heading1` if card hierarchy warrants smaller text
- **Section headers within cards**: `text-heading2` or `text-heading1`
- **Body text**: `text-body1` (default) or `text-body2` (smaller/secondary)
- **Labels and captions**: `text-label1`, `text-label2`, or `text-caption`

**Hierarchy principle**: Typography should create clear visual hierarchy. Cards are contained elements, so their headers should never compete with page-level headings. When in doubt, go smaller.
