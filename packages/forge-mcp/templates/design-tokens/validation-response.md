# Design Token Validation Results

**Total Tokens Validated:** {{totalValidated}}

## Summary

- ✅ **Valid tokens:** {{valid.length}}
- ❌ **Unknown tokens:** {{unknown.length}}
{{#if componentProperties.length}}
- 🧩 **Component CSS properties:** {{componentProperties.length}}
{{/if}}
{{#if ignored.length}}
- ⏭️ **Ignored (not Forge tokens):** {{ignored.length}}
{{/if}}

{{#if unknown.length}}
## ❌ Unknown Tokens

These custom properties are not Tyler Forge design tokens. Replace them with an existing token, or use `get_design_tokens` with `query` to find the right one:

{{#each unknown}}
- **`{{{name}}}`**{{#if suggestions.length}} - did you mean {{#each suggestions}}`{{{this}}}`{{#unless @last}}, {{/unless}}{{/each}}?{{/if}}
{{/each}}

{{/if}}
{{#if componentProperties.length}}
## 🧩 Component CSS Properties

These are component-level CSS custom properties, not global design tokens. They are valid on the listed components; use `validate_component_api` with `cssProperties` to check them:

{{#each componentProperties}}
- **`{{{name}}}`** - {{#each components}}`{{{this}}}`{{#unless @last}}, {{/unless}}{{/each}}
{{/each}}

{{/if}}
{{#if valid.length}}
## ✅ Valid Tokens

{{#each valid}}
- **`{{{name}}}`**{{#if description}} - {{{description}}}{{/if}}
{{/each}}

{{/if}}
{{#if ignored.length}}
## ⏭️ Ignored

These custom properties are outside the `--forge-` namespace and were not validated:

{{#each ignored}}
- `{{{this}}}`
{{/each}}

{{/if}}
{{#unless unknown.length}}
🎉 **All Forge tokens are valid!**
{{/unless}}
