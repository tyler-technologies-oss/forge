# {{name}} - Attributes

{{#if hasAttributes}}
| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
{{#each attributes}}
| `{{name}}` | {{#if type.text}}`{{type.text}}`{{else}}-{{/if}} | {{#if description}}{{description}}{{else}}No description{{/if}} | {{#if default}}`{{default}}`{{else}}-{{/if}} |
{{/each}}
{{else}}
No attributes available for this component.
{{/if}}