# {{name}} - Methods

{{#if hasMethods}}
{{#each methods}}
## `{{name}}()`

{{#if description}}
{{description}}
{{/if}}

**Signature:**
```typescript
{{name}}({{#each parameters}}{{name}}{{#if type.text}}: {{type.text}}{{/if}}{{#if default}} = {{default}}{{/if}}{{#unless @last}}, {{/unless}}{{/each}}){{#if return.type.text}}: {{return.type.text}}{{/if}}
```

{{#if parameters}}
**Parameters:**
{{#each parameters}}
- `{{name}}`{{#if type.text}} (`{{type.text}}`){{/if}}{{#if default}} - Default: `{{default}}`{{/if}}
{{/each}}
{{/if}}

{{/each}}
{{else}}
No public methods available for this component.
{{/if}}