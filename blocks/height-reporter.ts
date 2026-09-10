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
  window.parent.postMessage(message, window.location.origin);
}

if (window.self !== window.top) {
  const resizeObserver = new ResizeObserver(([entry]) => {
    reportHeight(Math.ceil(entry.target.getBoundingClientRect().height));
  });

  resizeObserver.observe(document.body);
}
