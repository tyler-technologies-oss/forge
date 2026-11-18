---
'@tylertech/forge': patch
---

Fix icons that stayed blank when moved while waiting for their icon to be registered. For example, the text field's clear button icon could be invisible when the field started with a value. An icon now picks up its icon again when it's reconnected.
