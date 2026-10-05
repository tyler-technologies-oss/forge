---
'@tylertech/forge-rich-text-editor': minor
---

Make the `forge-rich-text-editor` toolbar a single tab stop, following the WAI-ARIA toolbar
pattern. Every button used to be its own tab stop, so reaching the content meant tabbing through
every toolbar button - fifteen with `forge-rte-standard-tools` alone. Tab now enters the toolbar
on the last button used, ArrowLeft and ArrowRight move between buttons (reversed in right-to-left
layouts), and Home and End jump to the first and last. Movement stops at either end rather than
wrapping.

Disabled buttons are skipped, consistent with forge's buttons, which drop their tabindex when
disabled. Keys typed into a feature's popover, such as the link URL field, are not intercepted.

Tool buttons outside an editor's own toolbar - in a composed layout built from
`forge-rich-text-context` - are unchanged and remain individually tabbable.
