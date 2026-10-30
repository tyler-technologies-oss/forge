# {{name}} - Properties

{{#if hasProperties}}
| Property | Type | Description | Default | Readonly |
|----------|------|-------------|---------|----------|
{{#each properties}}
| `{{name}}` | {{#if type.text}}`{{type.text}}`{{else}}-{{/if}} | {{#if description}}{{description}}{{else}}No description{{/if}} | {{#if default}}`{{default}}`{{else}}-{{/if}} | {{#if readonly}}Yes{{else}}No{{/if}} |
{{/each}}
{{else}}
No public properties available for this component.
{{/if}}