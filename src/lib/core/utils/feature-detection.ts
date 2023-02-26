/**
 * Returns whether the browser supports `ElementInternals` APIs or not.
 */
export function supportsElementInternals(): boolean {
  return 'ElementInternals' in window && 'setFormValue' in window.ElementInternals.prototype;
}
