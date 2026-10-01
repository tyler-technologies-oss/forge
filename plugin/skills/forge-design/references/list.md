# List

## List Item Slots

| Slot | Purpose |
|------|---------|
| `start` | Leading content (icons, avatars) |
| Default | Main content (text, buttons, links) |
| `end` | Trailing content (icons, badges, actions) |
| `additional-content` | Expandable content below the item |

---

## Rules

1. **Use `navlist` attribute** for navigation lists in sidebars/drawers
2. **Use `<forge-divider>`** between list sections
3. **All action icon buttons need `aria-label`** for accessibility
4. **For interactive items**, include `<button>` or `<a>` elements inside list items
5. **Use `indented` attribute** for nested lists
6. **Use `selected` attribute** on list items to indicate current selection
