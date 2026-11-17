---
'@tylertech/forge': patch
---

Respect reduced motion in more components, fading instead of moving where possible.

- Tooltips fade in without sliding.
- Drawers and modal drawers fade in place instead of sliding in and out.
- Split view panels fade instead of sliding when they open and close.
- View switchers with the slide animation switch views at once, without animating height. The fade animation still fades.
- Tab bars scroll to the selected tab, and with the scroll buttons, without smooth scrolling.
- Skeletons no longer show the loading shimmer.
- Checkboxes and switches keep their color fade, but the checkmark appears at once and the switch handle moves without sliding or scaling. Before, reduced motion turned off every transition.
- Expansion panel content fades in instead of opening and closing with no transition.
- View switchers no longer wait forever for a transition that doesn't run, such as when the duration is set to 0.
