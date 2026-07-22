import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../../core/base/base-lit-element.js';

import styles from './timeline.scss';

export const TIMELINE_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-timeline';

/**
 * @tag forge-timeline
 *
 * @summary Timelines display a list of events in chronological order.
 *
 * @slot - The default slot for timeline items.
 *
 * @cssproperty --forge-timeline-gap - The spacing between timeline items.
 * @cssproperty --forge-timeline-timestamp-margin - The block margin around slotted timestamps.
 *
 * @csspart root - The root element.
 */
@customElement(TIMELINE_TAG_NAME)
export class TimelineComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TIMELINE_TAG_NAME;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'list'
    });
  }

  /* @internal */
  public render(): TemplateResult {
    return html`<div part="root" class="forge-timeline"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-timeline': TimelineComponent;
  }
}
