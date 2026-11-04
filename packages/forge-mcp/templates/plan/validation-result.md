# UI Plan Validation

**Valid:** {{validLabel}}
**Summary:** {{{summary}}}

{{#if isValid}}Proceed: call `get_forge_blocks` for the block IDs in the plan, then write the markup. Call `validate_component_api` for each Forge tag before finalizing.
{{else}}## Errors

{{#each errors}}- **`{{{this.path}}}`** — {{{this.message}}}
{{#if this.hint}}  - *Hint:* {{{this.hint}}}
{{/if}}{{/each}}
Fix the errors above and call `validate_ui_plan` again. Do NOT write markup until the plan validates.

```json
{{{resultJson}}}
```
{{/if}}