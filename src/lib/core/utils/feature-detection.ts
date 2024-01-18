/**
 * Detects if the browser supports the `popover` attribute.
 * @returns {boolean}
 */
export function supportsPopover(): boolean {
  return HTMLElement.prototype.hasOwnProperty('popover');
}

/**
 * Detects if the browser supports ARIA properties in Element Internals.
 * 
 * This currently always returns false because tooling is not yet able able to detect properties
 * set on Element Internals.
 * @returns {boolean}
 */
export function supportsElementInternalsAria(): boolean {
  return ElementInternals.prototype.hasOwnProperty('role');
}

/**
 * Detects if the browser supports the hovering elements as the users primary input mechanism.
 * @returns {boolean}
 */
export function supportsHover(): boolean {
  const canTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  return !canTouch;
}
