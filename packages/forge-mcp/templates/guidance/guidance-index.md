# Forge guidance

Guidance pages generated from the Forge docs site. Call `get_forge_guidance(topic: "...")` with a topic below to read a page; load only the ones relevant to the task. The rules and workflow are `get_forge_guidance(topic: "rules")`.

{{#each sections}}
## {{{this.title}}}

| Topic | Title | Description |
|-------|-------|-------------|
{{#each this.pages}}| `{{{this.topic}}}` | {{{this.title}}}{{#if this.experimental}} (experimental){{/if}} | {{{this.description}}} |
{{/each}}

{{/each}}
## Next step

Read the component, design, and development pages for what you are building, then fetch the matching block with `get_forge_blocks` before writing markup.
