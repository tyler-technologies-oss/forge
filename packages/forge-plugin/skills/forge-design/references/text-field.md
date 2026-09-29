# Text Field

## Search / Filter Input (No Label)

Use for simple filter inputs in cards, facets, or search bars. Hide the label with `label-position="none"`, add a leading search icon via `slot="start"`, and enable `show-clear` to let users reset the value.

## Notes

- Requires a `<label>` and `<input>` or `<textarea>` as children
- Associate label with input via `for`/`id` attributes
- Supports text, password, email, and other input types
- Use `<textarea>` for multi-line text input
- The `required` attribute must be set on both the `<forge-text-field>` element (for visual indicator) and the nested `<input>` (for form validation)
