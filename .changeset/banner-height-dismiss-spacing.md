---
'@tylertech/forge': minor
---

Banners now have a 56px minimum height (`--forge-banner-min-height`) with 8px block padding, so banners with a button are 56px instead of 60px and longer messages still wrap. When the dismiss button is visible, the inline end padding is 4px (`--forge-banner-dismissible-padding-inline-end`), so the 48px dismiss button sits 4px from the top, bottom, and end edges and its icon 16px. Persistent banners keep the regular padding on both sides.
