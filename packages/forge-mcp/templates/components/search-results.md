# Search Results for "{{{query}}}"

{{#if multipleTerms}}**Search terms:** {{{join searchTerms ", "}}}

{{/if}}Found {{count}} matching component{{#unless (eq count 1)}}s{{/unless}}{{#if hasMore}} (showing top results){{/if}}:

| Component | Summary | Matches | Score |
|-----------|---------|---------|-------|
{{#each rows}}| {{{this.tagName}}} | {{{this.summary}}} | {{{this.matchInfo}}} | {{this.score}} |
{{/each}}
## Individual Documentation

For detailed documentation of each component:

{{#each rows}}- [{{{this.tagName}}}](forge://component/{{{this.tagName}}})
{{/each}}{{#if hasMore}}
*Tip: Use the `limit` parameter to see more results, or refine your search terms for more specific matches.*
{{/if}}