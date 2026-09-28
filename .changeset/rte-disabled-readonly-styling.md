---
'@tylertech/forge-rich-text-editor': minor
---

Make the disabled and readonly states visually distinct. Both dimmed through
`opacity: var(--forge-theme-disabled-opacity)`, a custom property forge does not define — forge
scopes disabled opacity per component rather than exposing a theme-level one — so the declaration
was invalid and nothing dimmed. A disabled editor rendered at full opacity, and disabled was
indistinguishable from readonly.

Both now resolve to forge's `emphasis(medium-low)` (0.38) behind the customizable
`--forge-rich-text-editor-disabled-opacity` and `--forge-rich-text-content-disabled-opacity`.

`forge-rich-text-content` also mirrors the context's disabled and readonly state onto its host.
It takes that state from the surrounding context rather than from attributes, so its own
`:host([disabled])` and `:host([readonly])` rules never matched and were dead — including the
readonly `cursor: default`. This matters most for composed layouts, where the content element is
used directly and there is no editor host to dim.

A disabled editor also sets `user-select: none`. `pointer-events: none` prevents a selection
starting inside the editor but not one dragged in from outside, so disabled content remained
selectable.

The two specs covering this asserted only that the attribute and property were set — one noted it
"triggers :host([disabled]) styles" without checking any — so they now assert computed opacity,
pointer-events and user-select instead.
