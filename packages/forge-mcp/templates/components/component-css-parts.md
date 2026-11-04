# {{name}} - CSS Parts

{{#if hasCssParts}}
| CSS Part | Description |
|----------|-------------|
{{#each cssParts}}
| `{{name}}` | {{#if description}}{{description}}{{else}}No description{{/if}} |
{{/each}}
{{else}}
No CSS parts available for this component.
{{/if}}