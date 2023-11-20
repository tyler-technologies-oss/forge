/**
 * Detects if the browser supports the `popover` attribute.
 * @returns {boolean}
 */
export function supportsPopover(): boolean {
  return HTMLElement.prototype.hasOwnProperty('popover');
}

/**
 * Detects if the browser supports ARIA properties in Element Internals.
 * @returns {boolean}
 */
export function supportsElementInternalsAria(): boolean {
  return ElementInternals.prototype.hasOwnProperty('role');
}
