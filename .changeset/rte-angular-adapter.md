---
'@tylertech/forge-angular-rich-text-editor': minor
---

Initial release of the Tyler Forge™ rich text editor adapter library for Angular. Provides an
Angular proxy component and `NgModule` for each custom element in
`@tylertech/forge-rich-text-editor`, plus a `ForgeRteModule` aggregate that imports and exports all
of them.

This is deliberately separate from `@tylertech/forge-angular` so that consumers who do not need a
rich text editor never take on TipTap as a dependency.

The proxies are generated from the editor package's custom elements manifest with the same
`@tylertech/forge-schematics:custom-elements` schematic that `@tylertech/forge-angular` uses, so
the Angular surface cannot drift from the elements it wraps.
