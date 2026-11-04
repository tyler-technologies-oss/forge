{{{content}}}

---

**Source:** {{{url}}}

{{#if tagName}}
**Next step:** call `get_forge_blocks(component: "{{{tagName}}}")` for working markup and `get_component_docs(component: "{{{tagName}}}")` for the API. Markup always comes from blocks.
{{else if isComponent}}
**Next step:** call `find_components(query: "{{{title}}}")` for the tag names on this page, then `get_forge_blocks(component: "<tag>")` for working markup and `get_component_docs(component: "<tag>")` for the API. Markup always comes from blocks.
{{else}}
**Next step:** links to other guidance pages resolve with `get_forge_guidance(topic: "...")`, e.g. a `../components/card.md` link is topic `components/card`. Fetch markup with `get_forge_blocks`.
{{/if}}
