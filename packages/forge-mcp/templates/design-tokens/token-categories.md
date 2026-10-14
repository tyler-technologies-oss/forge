# {{#if query}}Design Tokens matching "{{{query}}}"{{else}}Tyler Forge Design Tokens{{/if}}

{{#if query}}Found {{tokenCount}} matching token{{#unless (eq tokenCount 1)}}s{{/unless}}.

{{/if}}
{{#each categories}}
## {{{name}}}

{{#if description}}{{{description}}}

{{/if}}
{{#if themed}}
| Token | Light | Dark | Description |
|-------|-------|------|-------------|
{{#each tokens}}| `{{{name}}}` | `{{{light}}}` | `{{{dark}}}` | {{{description}}} |
{{/each}}
{{else}}
| Token | Value | Description |
|-------|-------|-------------|
{{#each tokens}}| `{{{name}}}` | `{{{value}}}` | {{{description}}} |
{{/each}}
{{/if}}

{{/each}}
---

> 💡 **Related Resources:**
> - All categories? Use `get_design_tokens` with no arguments
> - Checking tokens in generated CSS? Use `validate_tokens`
