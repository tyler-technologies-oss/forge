# {{name}} - Events

{{#if hasEvents}}
| Event | Type | Description |
|-------|------|-------------|
{{#each events}}
| `{{name}}` | {{#if type.text}}`{{type.text}}`{{else}}-{{/if}} | {{#if description}}{{description}}{{else}}No description{{/if}} |
{{/each}}
{{else}}
No events available for this component.
{{/if}}