---
'@tylertech/forge-rich-text-editor': minor
---

Preserve schema-supported `style` declarations instead of stripping the attribute outright.
`sanitizeHTML` removed `style` from every element, and `TextAlign` declares no tag selector —
`element.style.textAlign` is its only carrier — so text alignment was discarded from all HTML
input. This was not limited to pasted content: feeding the editor's own `toHTML()` output back
through `content` dropped the alignment too, silently losing it on a save and reload cycle.

`style` is now rewritten to an allow-list of declarations, each validated against a value pattern
rather than passed through, so the attribute still cannot carry `url()`, `expression()`, a
dangerous protocol or `!important`. `text-align` is accepted for `left`, `right`, `center` and
`justify`; `color` and `background-color` are accepted as hex, `rgb()`/`rgba()`, `hsl()`/`hsla()`
or a keyword, so a future text color feature works without another sanitizer change.

Formatting held in `class` or `data-*` is still stripped. Extensions that keep attributes there —
a code block's `language-*` class, a task item's `data-checked` — will each need an allow-list
entry of the same shape when those features are added.
