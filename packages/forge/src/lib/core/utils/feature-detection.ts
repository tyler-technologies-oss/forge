import { Platform } from '@tylertech/forge-core';

/**
 * Detects if the browser supports the `popover` attribute.
 * @returns {boolean}
 */
export function supportsPopover(): boolean {
  return Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');
}

/**
 * Detects if the browser supports ARIA properties in Element Internals.
 *
 * This currently always returns false because tooling is not yet able able to detect properties
 * set on Element Internals.
 * @returns {boolean}
 */
export function supportsElementInternalsAria(): boolean {
  return Object.prototype.hasOwnProperty.call(ElementInternals.prototype, 'role');
}

/**
 * Detects if the browser supports the hovering elements as the users primary input mechanism.
 * @returns {boolean}
 */
export function supportsHover(): boolean {
  // TODO: hover media query is not working in CI headless chrome, so we are using the Platform.isMobile flag for now.
  //       This should be reverted once we switch to using puppeteer or playwright for testing in CI.
  // return window.matchMedia('(hover: hover)').matches;
  return !Platform.isMobile;
}

/**
 * Detects if the browser is set to prefer reduced motion.
 * @returns {boolean}
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
