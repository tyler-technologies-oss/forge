# Form Rules

## Rules

1. **Never use placeholder attributes** on form fields unless explicitly requested
2. **Associate labels with inputs** via `for`/`id` attributes for accessibility
3. **Use `gap-medium`** between form fields
4. **Use `gap-xlarge`** between form sections with `<forge-divider>` separators
5. **Button groups** use `flex gap-small justify-end`
6. **Always use `<forge-file-picker>`** for file or image uploads - never use `<input type="file">`
7. **DO NOT use `<forge-field>` directly** - it's an internal component

---

## Component Guidelines

- Use the MCP tools to get the latest component API details for form components
- Check the component manifest for required inner elements and proper composition
