---
'@tylertech/forge-rich-text-editor': patch
---

Setting `content` to the document the editor already holds no longer resets it, so passing each `change` back as `content` keeps the cursor in place.
