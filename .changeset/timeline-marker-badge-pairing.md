---
'@tylertech/forge': patch
---

Badges in a timeline item's `marker` slot now keep their own `theme` or `color`, and a badge without either follows the item's theme. Icon markers use the same background and foreground colors as badges, which fixes low contrast for several themes. Both sit on an opaque backdrop so the line doesn't show through, set with `--forge-timeline-item-marker-backdrop`. Icon markers now take their color from `--forge-timeline-item-marker-icon-color` instead of `--forge-timeline-item-marker-color`, which still colors the default marker.
