/**
 * Detects if the browser supports the `popover` attribute.
 * @returns {boolean}
 */
export function supportsPopover(): boolean {
  return HTMLElement.prototype.hasOwnProperty('popover');
}
