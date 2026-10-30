# {{name}} - CSS Properties

{{#if hasCssProperties}}
| CSS Property | Type | Description | Default |
|--------------|------|-------------|---------|
{{#each cssProperties}}
| `{{name}}` | {{#if type.text}}`{{type.text}}`{{else}}-{{/if}} | {{#if description}}{{description}}{{else}}No description{{/if}} | {{#if default}}`{{default}}`{{else}}-{{/if}} |
{{/each}}
{{else}}
No CSS custom properties available for this component.
{{/if}}