# Icon Button

## Notes

- **Always include `aria-label`** for accessibility - this is required
- **Always include `forge-tooltip`** as a child of the icon button to surface the action's label on hover and focus. Because icon buttons have no visible text, the tooltip gives sighted users the same context that `aria-label` provides to assistive technology.
- Place the icon in the default slot
- Use `toggle` attribute for toggle behavior (like/unlike, on/off)
- For toggles, use the `on` slot for the active state icon
