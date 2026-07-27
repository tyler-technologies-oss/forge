import { CUSTOM_ELEMENT_NAME_PROPERTY, formatDate } from '@tylertech/forge-core';
import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { TIMELINE_TAG_NAME } from '../timeline/timeline/timeline.js';

import styles from './timestamp.scss';

export type TimeStampSeparatorPosition = 'start' | 'end' | 'none';

export const TIMESTAMP_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-timestamp';

/**
 * @tag forge-timestamp
 *
 * @summary Timestamps display formatted dates and times.
 *
 * @slot - The default slot. Content in this slot will be displayed instead of the formatted date/time.
 *
 * @cssproperty --forge-timestamp-color - The color of the timestamp text.
 * @cssproperty --forge-timestamp-margin-block - The margin around the timestamp on the block axis.
 *
 * @csspart root - The root element.
 */
@customElement(TIMESTAMP_TAG_NAME)
export class TimestampComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TIMESTAMP_TAG_NAME;

  /**
   * The date/time value to display. Accepts a Date object, an ISO string, or an HTML `<time>`
   * element's `datetime` attribute value.
   * @default ''
   * @attribute datetime
   */
  @property({ attribute: 'datetime' })
  public datetime: Date | string = '';

  /**
   * The CLDR format string for displaying the date. Only applies when the value of `datetime` is a
   * valid Date object or date-convertible string. Any other `datetime` value will be displayed
   * as-is unless a custom element is slotted.
   * @default 'MM/dd/yyyy'
   * @attribute
   */
  @property()
  public format = 'MM/dd/yyyy';

  /**
   * The locale to use for formatting.
   * @default navigator.language
   * @attribute
   */
  @property()
  public locale: string = navigator.language;

  /**
   * Places a separator dot before or after the timestamp.
   * @default 'none'
   * @attribute
   */
  @property()
  public separator: TimeStampSeparatorPosition = 'none';

  @state()
  private _datetimeAttrValue: string | null = null;

  @state()
  private _formattedDate: string | null = null;

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: this.#getRole()
    });
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    const datetimeChanged = changedProperties.has('datetime');
    const formatChanged = changedProperties.has('format');
    const localeChanged = changedProperties.has('locale');

    if (datetimeChanged || formatChanged) {
      this._datetimeAttrValue = this.#getDateTimeAttrValue();
    }

    if (datetimeChanged || formatChanged || localeChanged) {
      this._formattedDate = this.#formatDateTime();
    }
  }

  public render(): TemplateResult {
    return html`<time
      part="root"
      class=${classMap({
        'forge-timestamp': true,
        [`separator-${this.separator}`]: this.separator !== 'none'
      })}
      datetime="${ifDefined(this._datetimeAttrValue)}"
      >${this._formattedDate}</time
    >`;
  }

  #getRole(): 'listitem' | 'presentation' {
    const listParents = [TIMELINE_TAG_NAME];
    if (this.closest(`:is(${listParents.join(',')})`)) {
      return 'listitem';
    }
    return 'presentation';
  }

  #parseDateTime(): Date | null {
    if (!this.datetime) {
      return null;
    }

    try {
      // If datetime is already a Date object, return it
      if (this.datetime instanceof Date) {
        return this.datetime;
      }

      const datetimeStr = this.datetime.toString();

      // Check if the string is an ISO date without timezone info (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss without Z or offset)
      // ISO dates without timezone are interpreted as UTC by default, but we want local time
      const isoDateWithoutTz = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?$/.test(datetimeStr);

      if (isoDateWithoutTz) {
        // Parse as local time by adding 'T00:00:00' if needed and using local date constructor
        const [datePart, timePart] = datetimeStr.split('T');
        const [year, month, day] = datePart.split('-').map(Number);

        if (timePart) {
          const [hours, minutes, secondsPart = '0'] = timePart.split(':');
          const [seconds, milliseconds = '0'] = secondsPart.split('.');
          return new Date(year, month - 1, day, Number(hours), Number(minutes), Number(seconds), Number(milliseconds.padEnd(3, '0').slice(0, 3)));
        } else {
          return new Date(year, month - 1, day);
        }
      }

      // For all other formats (including those with timezone info), use standard Date constructor
      return new Date(this.datetime);
    } catch {
      return null;
    }
  }

  #getDateTimeAttrValue(): string | null {
    if (!this.datetime) {
      return null;
    }

    const date = this.#parseDateTime();
    if (!date) {
      return this.datetime.toString();
    }

    try {
      return date.toISOString();
    } catch {
      return this.datetime.toString();
    }
  }

  #formatDateTime(): string {
    if (!this.datetime) {
      return '';
    }

    const date = this.#parseDateTime();
    if (!date || Number.isNaN(date.getTime())) {
      return this.datetime.toString();
    }

    try {
      return formatDate(date, this.format, { locale: this.locale });
    } catch {
      return this.datetime.toString();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-timestamp': TimestampComponent;
  }
}
