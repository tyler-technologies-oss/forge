import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';

import styles from './timeline-break.scss';

export const TIMELINE_BREAK_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-timeline-break';

/**
 * @tag forge-timeline-break
 *
 * @summary Timeline breaks display a line to indicate a gap or separation in a timeline.
 *
 * @cssproperty --forge-timeline-break-color - The color of the line.
 * @cssproperty --forge-timeline-break-height - The height of the line.
 * @cssproperty --forge-timeline-break-weight - The thickness of the line.
 * @cssproperty --forge-timeline-break-margin - The white space above and below the line.
 * @cssproperty --forge-timeline-break-smoothing - The smoothness of the line. Higher values result in subtler curves.
 *
 * @csspart root - The root element.
 */
@customElement(TIMELINE_BREAK_TAG_NAME)
export class TimelineBreakComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TIMELINE_BREAK_TAG_NAME;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { ariaHidden: 'true' });
  }

  public render(): TemplateResult {
    return html`<div part="root" class="forge-timeline-break"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-timeline-break': TimelineBreakComponent;
  }
}
