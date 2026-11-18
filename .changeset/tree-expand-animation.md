---
'@tylertech/forge': minor
---

Tree items now grow open and shrink closed over 200ms with `easing-move` when opened or closed by pointer or from code, and the default expand icon turns in step. Opening and closing with the keyboard stays instant, and so does everything under reduced motion. Collapsed children are still removed from layout once closed, so large trees stay fast. New `--forge-tree-item-expand-duration` and `--forge-tree-item-expand-easing` tokens control the timing. The `children` part now wraps a new inner element that holds the header, children and footer.
