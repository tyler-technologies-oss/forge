# Colors & Backgrounds

Use Tailwind classes that map to Forge color tokens. **Never define custom colors.**

---

## Background Classes

| Class | Usage |
|-------|-------|
| `bg-surface` | Primary content background |
| `bg-surface-dim` | Subtle background, behind surfaces |
| `bg-primary-container-low` | Light primary accent background |
| `gradient-bg` | Primary gradient background (custom utility) |

---

## Border Classes

| Class | Usage |
|-------|-------|
| `border-outline` | Standard border color |

---

## Custom Utility Classes

| Class | Usage |
|-------|-------|
| `.tonal-card` | Tonal card styling (no outline, dim background) |

---

## Gradient Guidelines

When implementing gradients without specific colors provided, **ALWAYS use subtle Forge color tokens** with `-low`, `-minimum`, or base variants.

- Avoid dark, saturated, or visually heavy colors
- Gradients should be understated and professional, not bold or attention-grabbing
- Example: use `surface-low` to `surface-minimum` rather than `primary` to `secondary`
