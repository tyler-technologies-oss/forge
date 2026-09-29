# Accessibility Rules

## Core Rules

1. **Always use `aria-label` on icon buttons**
2. **Use proper heading hierarchy** - don't skip levels (h1 → h2 → h3, etc.)
3. **Associate labels with inputs** via `for`/`id` attributes
4. **Use `aria-labelledby` on dialogs** pointing to the title element
5. **Use semantic elements** - `<nav>`, `<main>`, `<footer>`, `<form>`

---

## Heading Hierarchy

When using `forge-app-layout` or `forge-app-bar`, the page title is the h1, so **content headings should start at h2**.

---

## Form Accessibility

Use `autocomplete` attributes for better autofill support:
- `autocomplete="email"` for email fields
- `autocomplete="tel"` for phone fields
- `autocomplete="username"` for username fields
- `autocomplete="current-password"` for password fields
