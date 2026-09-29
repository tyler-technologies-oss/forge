# {{name}} - Slots

{{#if hasSlots}}
| Slot | Description |
|------|-------------|
{{#each slots}}
| `{{#if name}}{{name}}{{else}}default{{/if}}` | {{#if description}}{{description}}{{else}}No description{{/if}} |
{{/each}}
{{else}}
No content slots available for this component.
{{/if}}