# Forge UI Blocks

Pre-built code patterns demonstrating correct Forge component usage.
**Results are ranked by functionality match.** Top results may fit your needs directly; others can serve as starting points for similar UI patterns.

{{#if query}}**Search:** "{{{query}}}"
{{/if}}{{#if category}}**Category:** {{{category}}}
{{/if}}{{#if component}}**Component:** {{{component}}}
{{/if}}**Found:** {{foundCount}} block(s)

## Categories

{{#each categories}}- {{{this.name}}}
{{/each}}
## Available Blocks

| Name | Description | Components Used | ID |
|------|-------------|-----------------|-----|
{{#each blocks}}| {{{this.name}}} | {{{this.description}}} | {{{this.componentsPreview}}} | {{{this.id}}} |
{{/each}}
{{#if hasMore}}
*Showing {{shownCount}} of {{totalCount}} blocks. Use `limit` parameter to see more.*
{{/if}}
## Usage

To get the full code for a specific block, call this tool with the `blockId` parameter:
```
get_forge_blocks(blockId: "src/blocks/forms/login")
```
