# Application Layout Rules

**In this file:**
- [Body Styles Required (Critical)](#-critical-body-styles-required)
- [App Bar Integration](#app-bar-integration)
- [Auto-Close Drawer on Navigation](#auto-close-drawer-on-navigation)
- [Mini Drawer Mode](#mini-drawer-mode)
- [Available Slots](#available-slots)
- [Rules](#rules)
- [Import](#import)

**All Forge apps start with `forge-app-layout`** - it scaffolds the entire app structure.

---

## ⚠️ CRITICAL: Body Styles Required

**When using `forge-app-layout` or `forge-scaffold` for a full application, the `<body>` tag MUST have these styles:**

```css
body {
  background-color: var(--forge-theme-surface-dim, #fafafa);
  height: 100dvh;
  width: 100dvw;
  margin: 0;
}
```

**Why this is required:** These styles allow the scaffold or app-layout component to fill the full height of the browser window. Without them, the layout will not render correctly.

---

## App Bar Integration

The app bar exposes named slots for logo, start actions, center content, and end actions — see [Available Slots](#available-slots) for the full list.

---

## Auto-Close Drawer on Navigation

Add `data-forge-app-layout-close` to any navigation item to automatically close the drawer when it is clicked.

---

## Mini Drawer Mode

Use the `use-mini-drawer` attribute for a collapsed sidebar that shows only icons. Add `mini-hover` to expand the drawer on hover.

---

## Available Slots

| Slot | Purpose |
|------|---------|
| `body` | Main content area (use on `<main slot="body">`) |
| `navigation` | Sidebar navigation content |
| `footer` | Footer content |
| `app-bar-logo` | Logo/branding in the app bar |
| `app-bar-start` | Actions at the start of the app bar |
| `app-bar-center` | Center content in the app bar |
| `app-bar-end` | Actions at the end of the app bar |

---

## Rules

1. **Body styles are mandatory** - See critical section above
2. **Content headings start at h2** - the app bar title is h1
3. **Use `navlist` attribute** on navigation lists for proper styling
4. **Use `data-forge-app-layout-close`** on navigation to auto-close drawer on mobile

---

## Import

**CRITICAL: This is a subpath-only component. It is not registered by `defineComponents()` and requires a side-effect import.**

```typescript
import '@tylertech/forge/app-layout';
```
