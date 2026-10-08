---
'@tylertech/forge-rich-text-editor': minor
---

Added `toRichTextDocument(html, features?)`, which converts HTML to the document the editor would produce from it. It defaults to the `forge-rte-standard-tools` features, and `RICH_TEXT_FEATURES` lists every feature name it accepts. The editor, renderer and converter now share one set of extension configs.
