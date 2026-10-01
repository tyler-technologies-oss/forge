# Layout Patterns

Use standard CSS/HTML layout techniques with Tailwind utilities. **Do NOT use `<forge-stack>` for general layout** - only use for specialized spacing/alignment scenarios.

---

## Layout Best Practices

1. **Inline/side-by-side layouts** - Always use `items-center` when placing elements horizontally. This prevents misalignment when elements have different heights, labels, or validation states.

2. **Use `gap-*` for spacing** - Never use margins between flex/grid children.

3. **Responsive grids** - Use `grid-min-320` for card grids, `sm:grid-cols-6` for form layouts.

---

## Common Flexbox Patterns

| Pattern | Classes |
|---------|---------|
| Vertical stack with gaps | `flex flex-col gap-medium` |
| Horizontal with centering | `flex items-center gap-small` |
| Space between items | `flex items-center justify-between` |
| Right-aligned buttons | `flex gap-small justify-end` |

---

## Common Grid Patterns

| Pattern | Classes |
|---------|---------|
| Auto-fit card grid | `grid grid-min-320 gap-medium` |
| Two-column responsive | `grid grid-cols-1 md:grid-cols-2 gap-medium` |
| Six-column form grid | `grid grid-cols-1 gap-x-medium gap-y-large sm:grid-cols-6` |

---

## Grid Column Spans

| Width | Class |
|-------|-------|
| Full width | `col-span-full` |
| Half width (3/6) | `sm:col-span-3` |
| Two-thirds (4/6) | `sm:col-span-4` |
| One-third (2/6) | `sm:col-span-2` |
