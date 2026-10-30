# API REFERENCE: {{tagName}}

**Tyler Forge Component** | **Tag:** `<{{tagName}}>` | **Type:** Web Component

{{#if summary}}
**PURPOSE:** {{summary}}
{{/if}}

{{#if description}}
**DESCRIPTION:** {{description}}
{{/if}}

{{#if hasAttributes}}
## USAGE: HTML Attributes

Configure `<{{tagName}}>` behavior via HTML attributes:

| Attribute | Type | Description | Default |
|-----------|------|-------------|---------|
{{#each attributes}}
| `{{name}}` | `{{formatType type}}` | {{formatOptional description}} | {{formatOptional default "N/A"}} |
{{/each}}
{{/if}}

{{#if hasEvents}}
## INTEGRATION: Component Events

Listen for `<{{tagName}}>` events in your application:

| Event | Type | Description |
|-------|------|-------------|
{{#each events}}
| `{{name}}` | `{{formatType type}}` | {{formatOptional description}} |
{{/each}}
{{/if}}

{{#if hasProperties}}
## REFERENCE: JavaScript Properties

Access `<{{tagName}}>` functionality via JavaScript API:

| Property | Type | Description | Default | Readonly |
|----------|------|-------------|---------|----------|
{{#each properties}}
| `{{name}}` | `{{formatType type}}` | {{formatOptional description}} | {{formatOptional default "N/A"}} | {{formatBoolean readonly}} |
{{/each}}
{{/if}}

{{#if hasMethods}}
## REFERENCE: Component Methods

Call these methods on `<{{tagName}}>` element instances:

{{#each methods}}
### `{{name}}()`

{{#if description}}
{{description}}
{{/if}}

**API Signature:**
```typescript
{{name}}({{#each parameters}}{{name}}{{#if type}}: {{type.text}}{{/if}}{{#if default}} = {{default}}{{/if}}{{#unless @last}}, {{/unless}}{{/each}}){{#if return}}: {{return.type.text}}{{/if}}
```

{{#if parameters}}
**Parameters:**
{{#each parameters}}
- `{{name}}`{{#if type}} (`{{type.text}}`){{/if}}{{#if default}} - Default: `{{default}}`{{/if}}
{{/each}}
{{/if}}

{{/each}}
{{/if}}

{{#if hasCssProperties}}
## STYLING: CSS Custom Properties

Customize `<{{tagName}}>` appearance with CSS variables:

| CSS Property | Type | Description |
|--------------|------|-------------|
{{#each cssProperties}}
| `{{name}}` | `{{formatType type}}` | {{formatOptional description}} |
{{/each}}
{{/if}}

{{#if hasCssParts}}
## STYLING: CSS Parts

Target `<{{tagName}}>` internal elements with CSS `::part()`:

| Part Name | Description |
|-----------|-------------|
{{#each cssParts}}
| `{{name}}` | {{formatOptional description}} |
{{/each}}
{{/if}}

{{#if hasSlots}}
## USAGE: Content Slots

Insert content into `<{{tagName}}>` using these slots:

| Slot | Description |
|------|-------------|
{{#each slots}}
| `{{#if name}}{{name}}{{else}}default{{/if}}` | {{formatOptional description}} |
{{/each}}
{{/if}}

{{#if hasStates}}
## REFERENCE: Component States

`<{{tagName}}>` exposes these states for styling:

| State | Description |
|-------|-------------|
{{#each states}}
| `{{name}}` | {{formatOptional description}} |
{{/each}}
{{/if}}

{{#if hasCssClasses}}
## STYLING: CSS-Only Classes

Apply these classes to native HTML elements for styling purposes IF not using the Web Component:

| CSS Class | Description |
|-----------|-------------|
{{#each cssClasses}}
| `{{name}}` | {{formatOptional description}} |
{{/each}}
{{/if}}

**IMPORTANT:** Only use these classes IF you were told to use them explicitly.

{{#if hasDependencies}}
## DEPENDENCIES: Required Components

`<{{tagName}}>` depends on these Tyler Forge components, and they are automatically imported when using this component:

{{#each dependencies}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}


### Next Steps
- **Framework setup:** Use `setup_framework` for Angular, React, Vue, Svelte, or Lit integration
- **Usage examples:** Use `get_forge_blocks` with `component={{tagName}}` for structural HTML examples
- **Design system:** Use `get_design_tokens` for consistent styling values
- **Related components:** Use `find_components` to discover complementary components

---
