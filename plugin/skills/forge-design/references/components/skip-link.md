# Skip Link

Skip links let a user bypass repetitive content and navigate directly to a section of the page, meeting WCAG's bypass-blocks requirement.

## Usage

`forge-skip-link` targets another element by id through `target`, and controls its own visibility and placement through `persistent`, `inline`, `muted`, and `theme`. Place one as the first child of `<body>`, targeting the page's main content, on any page that repeats navigation or other content across multiple pages — this satisfies <a href="https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html">WCAG 2.4.1</a>, not just a nice-to-have.

## Rules

**Do**

- Place a skip link as the first child of the body, targeting the page's main content.
- Give the target element tabindex="-1" if it isn't otherwise focusable, so the browser can focus it without adding it to the tab order.
- Write skip link text that clearly states what it navigates to.

**Don't**

- Don't add more skip links than a page genuinely needs — assistive technology users already have their own ways to navigate between landmarks.
- Don't assume a skip link behaves identically everywhere — see the Accessibility tab for a Safari-specific difference.

## Basic usage

Set `target` to the id of the element the link should jump to.

Example (A skip link targeting the page's main content.): `get_forge_blocks(blockId: "components/skip-link/demo/demo")`

## Inline skip links

A skip link doesn't have to sit only at the top of the page — set `inline` to position one within the normal page flow, useful for bypassing a specific section, like search filters, to jump straight to its results.

## Appearance

Set `persistent` to keep the link visible even when it isn't focused, and `muted` for a lower-contrast color scheme. Set `theme` to match the link's color to the surrounding UI.

## Accessibility

### Skip target

The target element needs `tabindex="-1"` if it isn't already focusable, so the browser can move focus to it after navigation without adding it to the normal tab order.

### Don't overuse it

You may use more than one skip link to reach multiple areas of a page, but be judicious — assistive technology users already have their own methods for navigating between landmarks, and too many skip links can become their own source of frustration rather than a convenience.

### Safari behavior

In Safari, a skip link doesn't behave quite like it does in other browsers, because Safari never includes anchor links in the tab order. Screen reader users can still perceive and use the skip link to navigate the page — this only affects sighted keyboard-only navigation.
