/**
 * Height reporter for blocks rendered in iframes.
 *
 * Observes the block's <body> size and posts its height to the parent window
 * whenever it changes, so the docs site can resize the iframe to fit the
 * block's content without scrollbars.
 *
 * Message format sent to parent:
 *   { type: 'forge-block-height-change', height: number }
 */

interface HeightChangeMessage {
  type: 'forge-block-height-change';
  height: number;
}

function reportHeight(height: number): void {
  const message: HeightChangeMessage = { type: 'forge-block-height-change', height };
  // `window.location.origin` here would be this block's own origin, not the parent's - it
  // only works if the parent happens to be same-origin. The docs site embedding a block may
  // be on a different origin, so target '*' instead; the payload is just a height number.
  window.parent.postMessage(message, '*');
}

if (window.self !== window.top) {
  const resizeObserver = new ResizeObserver(([entry]) => {
    reportHeight(Math.ceil(entry.target.getBoundingClientRect().height));
  });

  resizeObserver.observe(document.body);
}
