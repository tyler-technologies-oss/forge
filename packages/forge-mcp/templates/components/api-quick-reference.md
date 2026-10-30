════════════════════════════════════════════════════════════════════════════════
                    API QUICK REFERENCE: {{tagName}}
          USE EXACTLY AS SHOWN — DO NOT GUESS OR ASSUME STANDARD HTML APIS
════════════════════════════════════════════════════════════════════════════════

{{#if hasEvents}}
EVENTS — Use these EXACT event names (standard HTML events like 'change' will NOT work):
{{#each events}}
  - {{name}}{{#if description}} — {{description}}{{/if}}
{{/each}}
{{else}}
EVENTS: None
{{/if}}

{{#if hasProperties}}
PROPERTIES (JavaScript):
{{#each properties}}
  - {{name}}: {{formatType type}}{{#if description}} — {{description}}{{/if}}
{{/each}}
{{else}}
PROPERTIES: None
{{/if}}

{{#if hasAttributes}}
ATTRIBUTES (HTML):
{{#each attributes}}
  - {{name}}{{#if type}} ({{formatType type}}){{/if}}{{#if description}} — {{description}}{{/if}}
{{/each}}
{{else}}
ATTRIBUTES: None
{{/if}}

{{#if hasCssProperties}}
CSS CUSTOM PROPERTIES:
{{#each cssProperties}}
  - {{name}}{{#if description}} — {{description}}{{/if}}
{{/each}}
{{/if}}

{{#if hasSlots}}
SLOTS:
{{#each slots}}
  - {{#if name}}{{name}}{{else}}(default){{/if}}{{#if description}} — {{description}}{{/if}}
{{/each}}
{{/if}}

{{#if hasCssParts}}
CSS PARTS:
{{#each cssParts}}
  - {{name}}{{#if description}} — {{description}}{{/if}}
{{/each}}
{{/if}}

════════════════════════════════════════════════════════════════════════════════

