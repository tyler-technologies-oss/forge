# Tyler Forge Task

{{{task}}}

---

{{#if rules}}
Follow these Forge rules and workflow exactly. Read any linked guidance page with `get_forge_guidance(topic: "...")`.

{{{rules}}}
{{else}}
Call `get_forge_guidance(topic: "rules")` first and follow the Forge rules and workflow it returns exactly. If you are building a full application, prototype, or app shell, call `get_forge_blocks(category: "application-layout")` and let the user choose a layout before writing markup.
{{/if}}

**Use MCP tools for ALL Tyler Forge information. Never rely on general knowledge or assumptions.**
