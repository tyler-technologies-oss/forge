import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Theme } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { hideWhenEmpty } from '@tylertech/forge/core/utils/lit-utils.js';

import styles from './timeline-item.scss';

export type TimelineSidebarPosition = 'auto' | 'start' | 'end' | 'both' | 'none';

export const TIMELINE_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-timeline-item';

/**
 * @tag forge-timeline-item
 *
 * @summary Timeline items represent an event or milestone in a timeline.
 *
 * @slot - The default slot for content displayed in the summary.
 * @slot marker - The marker to display (typically an icon or badge).
 * @slot start - The content to display at the start of the summary.
 * @slot end - The content to display at the end of the summary.
 * @slot detail - The content to display under the summary.
 *
 * @cssproperty --forge-timeline-item-marker-size - The size of the slotted icon marker.
 * @cssproperty --forge-timeline-item-marker-padding - The space around the marker that is filled with the background color.
 * @cssproperty --forge-timeline-item-marker-color - The color of the marker.
 * @cssproperty --forge-timeline-item-marker-background - The background color of the marker.
 * @cssproperty --forge-timeline-item-marker-shape - The corner radius of the marker.
 * @cssproperty --forge-timeline-item-default-marker-size - The size of the default marker displayed when no slotted marker is provided.
 * @cssproperty --forge-timeline-item-default-marker-shape - The corner radius of the default marker displayed when no slotted marker is provided.
 * @cssproperty --forge-timeline-item-sidebar-margin - The spacing between the marker and content.
 * @cssproperty --forge-timeline-item-line-color - The color of the line drawn between timeline items.
 * @cssproperty --forge-timeline-item-line-width - The width of the line drawn between timeline items.
 * @cssproperty --forge-timeline-item-line-inset - The distance from the left edge of the timeline item to the line drawn between timeline items.
 * @cssproperty --forge-timeline-item-summary-gap - The spacing between the start, center, and end slots.
 * @cssproperty --forge-timeline-item-detail-margin - The spacing between the summary and detail sections.
 *
 * @csspart root - The root element.
 * @csspart marker - The marker element.
 * @csspart default-marker - The default marker element.
 * @csspart summary - The element displayed inline with the marker.
 * @csspart start - The element displayed at the start of the summary.
 * @csspart center - The element displayed in the center of the summary.
 * @csspart end - The element displayed at the end of the summary.
 * @csspart detail - The element displayed in the detail slot.
 */
@customElement(TIMELINE_ITEM_TAG_NAME)
export class TimelineItemComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TIMELINE_ITEM_TAG_NAME;

  /**
   * The theme color of the marker.
   * @default ''
   * @attribute
   */
  @property()
  public theme: Theme | '' = '';

  /**
   * Which parts of the sidebar line should appear.
   * @default 'auto'
   * @attribute
   */
  @property()
  public sidebar: TimelineSidebarPosition = 'auto';

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'listitem'
    });
  }

  public render(): TemplateResult {
    return html`
      <div part="root" class=${classMap({ 'forge-timeline-item': true, [this.theme]: !!this.theme })}>
        <div class="sidebar">
          <div part="marker" class=${classMap({ marker: true, [`sidebar-${this.sidebar}`]: !!this.sidebar })}>
            <slot name="marker">
              <div part="default-marker" class="default-marker"></div>
            </slot>
          </div>
        </div>
        <div part="summary" class="summary">
          <div class="start" ${hideWhenEmpty()}>
            <slot name="start"></slot>
          </div>
          <div class="center">
            <slot></slot>
          </div>
          <div class="end" ${hideWhenEmpty()}>
            <slot name="end"></slot>
          </div>
        </div>
        <div part="detail" class="detail" ${hideWhenEmpty()}>
          <slot name="detail"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-timeline-item': TimelineItemComponent;
  }
}
