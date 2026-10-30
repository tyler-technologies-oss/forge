# {{{tagName}}} - Component Summary

**Purpose:** {{#if summary}}{{{summary}}}{{else if description}}{{{description}}}{{else}}Tyler Forge web component{{/if}}

## API Surface
{{#if hasAttributes}}✓ **HTML Attributes** - {{attributes.length}} configurable attributes{{/if}}
{{#if hasProperties}}✓ **JavaScript Properties** - {{properties.length}} programmatic properties{{/if}}
{{#if hasMethods}}✓ **Methods** - {{methods.length}} public methods{{/if}}
{{#if hasEvents}}✓ **Events** - {{events.length}} emitted events{{/if}}
{{#if hasSlots}}✓ **Content Slots** - {{slots.length}} content insertion points{{/if}}
{{#if hasCssProperties}}✓ **CSS Variables** - {{cssProperties.length}} customizable styles{{/if}}
{{#if hasCssParts}}✓ **CSS Parts** - {{cssParts.length}} styleable parts{{/if}}
{{#if hasStates}}✓ **CSS States** - {{states.length}} styleable states{{/if}}
{{#if hasCssClasses}}✓ **CSS Classes** - {{cssClasses.length}} styleable classes{{/if}}
{{#if hasDependencies}}✓ **Dependencies** - {{dependencies.length}} related components{{/if}}

{{#if hasAttributes}}
## Key Attributes
{{#each attributes}}
- `{{{name}}}`{{#if type}} ({{formatType type}}){{/if}}{{#if description}} - {{{description}}}{{/if}}
{{/each}}
{{/if}}

{{#if hasStates}}
## CSS States
{{#each states}}
- `{{{name}}}`{{#if description}} - {{{description}}}{{/if}}
{{/each}}
{{/if}}

{{#if hasCssClasses}}
## CSS Classes
{{#each cssClasses}}
- `{{{name}}}`{{#if description}} - {{{description}}}{{/if}}
{{/each}}
{{/if}}

{{#if hasDependencies}}
## Dependencies
{{#each dependencies}}
- `{{{name}}}`{{#if description}} - {{{description}}}{{/if}}
{{/each}}
{{/if}}

**Get full documentation:** Use `get_component_docs` with `component="{{{tagName}}}"`