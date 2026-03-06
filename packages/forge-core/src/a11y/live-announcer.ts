import { createVisuallyHiddenElement } from '../utils/a11y.js';

const LIVE_ANNOUNCER_KEY = Symbol('forgeLiveAnnouncer');

export type LiveAnnouncerPoliteness = 'polite' | 'assertive';

declare global {
  interface Window {
    [LIVE_ANNOUNCER_KEY]: LiveAnnouncer;
  }
}

export class LiveAnnouncer {
  private _politeElement: HTMLElement | null = null;
  private _assertiveElement: HTMLElement | null = null;

  private constructor() {}

  public static get instance(): LiveAnnouncer {
    if (!window[LIVE_ANNOUNCER_KEY]) {
      window[LIVE_ANNOUNCER_KEY] = new LiveAnnouncer();
    }
    return window[LIVE_ANNOUNCER_KEY];
  }

  public announce(message: string, politeness: LiveAnnouncerPoliteness = 'polite'): void {
    const element = this._getElement(politeness);
    element.textContent = '';
    setTimeout(() => {
      element.textContent = message;
    }, 100);
  }

  private _getElement(politeness: LiveAnnouncerPoliteness): HTMLElement {
    const isPolite = politeness === 'polite';
    const existing = isPolite ? this._politeElement : this._assertiveElement;

    if (existing && document.body.contains(existing)) {
      return existing;
    }

    const element = createVisuallyHiddenElement(`data-forge-live-announcer-${politeness}`);
    element.setAttribute('aria-live', politeness);
    element.setAttribute('aria-atomic', 'true');
    document.body.appendChild(element);

    if (isPolite) {
      this._politeElement = element;
    } else {
      this._assertiveElement = element;
    }

    return element;
  }
}
