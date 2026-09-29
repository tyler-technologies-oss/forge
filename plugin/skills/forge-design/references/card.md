# Card Rules

**In this file:**
- [Default Component](#default-component)
- [Import Rule](#import-rule)
- [Examples](#examples)
- [Structure Rules](#structure-rules)
- [Typography Rules](#typography-rules)
- [Choosing Between Card Components](#choosing-between-card-components)

## Default Component

**Use `<forge-structured-card>` from `@tylertech/forge` for all cards** unless explicitly told otherwise.

This component has header/body/footer structure, padding, and spacing built-in - no need for nested scaffolds or manual padding configuration.

---

## Import Rule

**ALWAYS use a side-effect import for `forge-structured-card`:**

```typescript
import '@tylertech/forge/structured-card';
```

---

## Examples

Use the `after-header-actions` slot for icon buttons that need to run up against the card edge (overflow menus, close buttons). All other header content — badges, text buttons, tabs — belongs in `header-actions`.

- `get_forge_blocks(component: "forge-structured-card")` — HTML usage patterns.
- `get_component_docs(component: "forge-structured-card", format: "summary")` — slots, attributes, events.

---

## Structure Rules

1. **Header action slots - CRITICAL distinction:**
   - `slot="after-header-actions"` - **ONLY for `<forge-icon-button>`** (overflow menus, close buttons, etc.)
   - `slot="header-actions"` - For everything else (badges, regular buttons, text)
2. **Use built-in slots** for card sections: `slot="title"`, `slot="body"`, `slot="footer-primary-action"`, `slot="footer-secondary-action"`
3. **Configure body padding** via `body-spacing` attribute (e.g., `body-spacing="none"`, `body-spacing="medium"`)
4. **Set heading level** via `heading-level` attribute for accessibility
5. **Use `<forge-divider>` for content separation** within the body - never CSS borders

---

## Typography Rules

**STRICT**: Card headers use `text-heading3` as default, **never larger**.

- `text-heading3`, `text-heading2`, `text-heading1` are allowed in cards
- `text-heading4` and `text-heading5` are **FORBIDDEN** in cards - reserved for PAGE-LEVEL titles only

---

## Choosing Between Card Components

Both `<forge-structured-card>` and `<forge-card>` can be used:

| Component | Package | Use When |
|-----------|---------|----------|
| `forge-structured-card` | `@tylertech/forge` (subpath import) | **Default choice.** Has built-in guardrails for consistent header/body/footer layout, padding, and spacing. |
| `forge-card` | `@tylertech/forge` | Simple content containers, or when you need full layout control. |

### Using `<forge-card>` with Proper Structure

If `<forge-card>` must be used, nest a `<forge-scaffold>` inside for header/body/footer layout — this mirrors the structure that `forge-structured-card` provides automatically. Fetch `get_forge_blocks(component: "forge-card")` for the concrete pattern.
