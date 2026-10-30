# {{name}} - States

{{#if hasStates}}
| State | Description |
|-------|-------------|
{{#each states}}
| `{{name}}` | {{#if description}}{{description}}{{else}}No description{{/if}} |
{{/each}}
{{else}}
No custom states available for this component.
{{/if}}