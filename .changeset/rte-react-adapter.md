---
'@tylertech/forge-react-rich-text-editor': minor
---

Initial release of the Tyler Forge™ rich text editor adapter library for React. Provides a React
component for each custom element in `@tylertech/forge-rich-text-editor`, named after its tag:
`ForgeRichTextEditor`, `ForgeRichTextRenderer`, `ForgeRichTextContent`, `ForgeRichTextContext` and
the `ForgeRte*` feature components.

This is deliberately separate from `@tylertech/forge-react` so that consumers who do not need a
rich text editor never take on TipTap as a dependency.

The components are generated from the editor package's custom elements manifest rather than
hand-maintained, so the React surface cannot drift from the elements it wraps.
