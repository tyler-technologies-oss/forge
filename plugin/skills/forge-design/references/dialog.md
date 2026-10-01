# Dialog

Dialogs use `<forge-scaffold>` for proper layout with header, body, and footer regions.

---

## Opening Dialogs

```javascript
const dialog = document.querySelector('forge-dialog');

// Control visibility via the `open` property
dialog.open = true;

// Dialogs can also be created dynamically
const dynamicDialog = document.createElement('forge-dialog');
dynamicDialog.innerHTML = `<p>Dynamic content</p>`;
document.body.appendChild(dynamicDialog);
dynamicDialog.open = true;
```

---

## Rules

1. **CRITICAL: All dialogs MUST use the standard scaffold structure** - Every dialog must have a `<forge-scaffold>` inside with three regions: header, body, and footer. This is non-negotiable unless the user explicitly requests otherwise. **Reference the basic dialog block (`blocks/dialogs/basic`) for the overall structural shell** (scaffold, toolbar placement, slots). The body content itself is flexible—forms, cards, lists, data displays, or any UI appropriate to the task can go inside the body slot.
2. **Use `aria-labelledby` on dialogs** pointing to the title element
3. **Close button must have `aria-label="Close dialog"`**
4. **Dialog titles use `text-heading3`** (same as card headers)
5. **Body content uses `p-medium` padding**
6. **Use `<forge-toolbar>` in the header slot** of the inner scaffold for dialog headers with title and actions. Check the "simple toolbar" block (`blocks/toolbar/simple`) for the correct pattern.
7. **Use `<forge-toolbar inverted>` in the footer slot** for dialog footers with action buttons. The `inverted` attribute provides proper visual distinction for footer regions.
8. **Dialogs should have a minimum width of 500px** unless the user specifies otherwise. Set via `style="--forge-dialog-width: 500px;"` on the `<forge-dialog>` element.

---

## Notes

- For Angular: Use `DialogService` from `@tylertech/forge-angular` for programmatic dialogs
- Use MCP tools to get the latest component API details for dialog and scaffold components
