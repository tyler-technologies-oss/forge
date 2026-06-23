import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Theme } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';

import styles from './timeline-item.scss';

export const TIMELINE_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-timeline-item';

/**
 * @tag forge-timeline-item
 *
 * @summary Timeline items represent an event or milestone in a timeline.
 *
 * @slot - The default slot for the content.
 * @slot marker - The marker to display (typically an icon or badge).
 *
 * @cssproperty --forge-timeline-item-marker-size - The size of the slotted icon marker.
 * @cssproperty --forge-timeline-item-marker-padding - Space around the marker that is filled with the background color.
 * @cssproperty --forge-timeline-item-marker-color - The color of the marker.
 * @cssproperty --forge-timeline-item-marker-background - The background color of the marker.
 * @cssproperty --forge-timeline-item-marker-shape - The corner radius of the marker.
 * @cssproperty --forge-timeline-item-default-marker-size - The size of the default marker displayed when no slotted marker is provided.
 * @cssproperty --forge-timeline-item-default-marker-shape - The corner radius of the default marker displayed when no slotted marker is provided.
 * @cssproperty --forge-timeline-item-default-marker-background - The background color of the default marker.
 * @cssproperty --forge-timeline-item-gap - The spacing between the marker and content.
 * @cssproperty --forge-timeline-item-line-gap - The spacing between the marker and the line.
 * @cssproperty --forge-timeline-item-line-color - The color of the line drawn between timeline items.
 * @cssproperty --forge-timeline-item-line-width - The width of the line drawn between timeline items.
 *
 * @csspart root - The root element.
 * @csspart marker - The marker element.
 * @csspart default-marker - The default marker element.
 * @csspart content - The content element.
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
    const classes = {
      'forge-timeline-item': true,
      [this.theme]: !!this.theme
    };
    return html`
      <div part="root" class=${classMap(classes)}>
        <div class="marker-wrapper">
          <div part="marker" class="marker">
            <slot name="marker">
              <div part="default-marker" class="default-marker"></div>
            </slot>
          </div>
        </div>
        <div part="content" class="content">
          <slot></slot>
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
