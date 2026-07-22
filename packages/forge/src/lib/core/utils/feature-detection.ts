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

let cachedScrollIntoViewContainerSupport: boolean | undefined;

/**
 * Detects whether the browser supports Element.prototype.scrollIntoView()'s container option.
 * Uses a Proxy to detect if the browser actually reads the container property.
 * The result is cached after the first call for performance.
 * @returns {boolean}
 */
export function supportsScrollIntoViewContainerOption(): boolean {
  if (cachedScrollIntoViewContainerSupport !== undefined) {
    return cachedScrollIntoViewContainerSupport;
  }

  let containerAccessed = false;

  const options = new Proxy(
    { behavior: 'auto', block: 'nearest', inline: 'nearest', container: 'nearest' },
    {
      get(target: any, prop: string) {
        if (prop === 'container') {
          containerAccessed = true;
        }
        return target[prop];
      }
    }
  );

  try {
    const div = document.createElement('div');
    div.scrollIntoView(options as any);
  } catch {
    // Ignore any errors
  }

  cachedScrollIntoViewContainerSupport = containerAccessed;
  return containerAccessed;
}

/**
 * Detects whether the browser supports the Invoker Commands API.
 * @returns {boolean}
 */
export function supportsInvokerCommands(): boolean {
  return typeof CommandEvent !== 'undefined';
}

/**
 * Custom CommandEvent class to be used if the browser does not support the Invoker Commands API.
 */
export class CommandEvent extends Event {
  public command: string;
  public source: HTMLElement;

  constructor(type: string, eventInitDict: EventInit & { command: string; source: HTMLElement }) {
    super(type, eventInitDict);
    this.command = eventInitDict?.command;
    this.source = eventInitDict?.source;
  }
}
