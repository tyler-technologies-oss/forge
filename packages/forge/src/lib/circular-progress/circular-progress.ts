import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { GlobalConfiguration } from '../core/configuration/global-configuration.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';
import { CIRCULAR_PROGRESS_CONSTANTS, CircularProgressTheme } from './circular-progress-constants.js';

import styles from './circular-progress.scss';

const DEFAULT_THEME: CircularProgressTheme = 'primary';
const PROGRESS_SCALE = 100;

/** @deprecated - This will be removed in the future. Please switch to using CircularProgressComponent. */
export interface ICircularProgressComponent extends BaseLitElement {
  determinate: boolean;
  progress: number;
  theme: CircularProgressTheme;
  track: boolean;
}

/**
 * @tag forge-circular-progress
 *
 * @summary Circular progress indicators display progress by animating along a circular track in a clockwise direction. They can be used to represent both determinate and indeterminate progress.
 *
 * @description
 * Progress indicators inform users about the status of ongoing processes.
 * - Determinate indicators display how long a process will take.
 * - Indeterminate indicators express an unspecified amount of wait time.
 *
 * @globalconfig track
 *
 * @slot - The is the default/unnamed slot. Renders content at the center of the progress indicator.
 *
 * @cssproperty --forge-circular-progress-size - The height and width of the indicator container.
 * @cssproperty --forge-circular-progress-padding - The padding inside the bounding box of the container.
 * @cssproperty --forge-circular-progress-track-width - The track indicator width.
 * @cssproperty --forge-circular-progress-track-color - The track background color.
 * @cssproperty --forge-circular-progress-indicator-color - The track indicator color.
 * @cssproperty --forge-circular-progress-arc-duration - The duration of the arc animation.
 * @cssproperty --forge-circular-progress-theme-transition-duration - The duration of the theme transition.
 * @cssproperty --forge-circular-progress-theme-transition-timing - The easing function to use for the theme transition.
 *
 * @csspart progressbar - Styles the progress bar container element
 */
export class CircularProgressComponent extends BaseLitElement implements ICircularProgressComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = CIRCULAR_PROGRESS_CONSTANTS.elementName;

  #internals: ElementInternals;
  #progress = 0;

  /**
   * Controls the determinate state.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public determinate = false;

  /**
   * Controls the progress while in a determinate state. Accepts values from `0` to `1`.
   * @default 0
   * @attribute
   */
  @property({
    type: Number,
    reflect: true,
    converter: { toAttribute: (value: number) => (value ? `${value}` : null) }
  })
  public set progress(value: number) {
    this.#progress = value == null || isNaN(value) ? 0 : value;
  }
  public get progress(): number {
    return this.#progress;
  }

  /**
   * Controls the theme of the progress indicator.
   * @default 'primary'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: CircularProgressTheme) => removeDefaultAttribute(value, DEFAULT_THEME) }
  })
  public theme: CircularProgressTheme = DEFAULT_THEME;

  /**
   * Controls the visibility of the track background.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public track = false;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#applyGlobalConfiguration();
    setDefaultAria(this, this.#internals, {
      role: 'progressbar',
      ariaValueMin: '0',
      ariaValueMax: '1'
    });
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('determinate') || changedProperties.has('progress') || !this.hasUpdated) {
      setDefaultAria(this, this.#internals, { ariaValueNow: this.determinate ? `${this.progress}` : null });
    }
  }

  public render(): TemplateResult {
    const classes = {
      'forge-circular-progress': true,
      [CIRCULAR_PROGRESS_CONSTANTS.classes.INDETERMINATE]: !this.determinate
    };
    return html`
      <div class=${classMap(classes)} part="progressbar">
        <slot class="center-content"></slot>
        ${this.determinate ? this.#renderDeterminate() : this.#renderIndeterminate()}
      </div>
    `;
  }

  #renderDeterminate(): TemplateResult {
    return html`
      <svg viewBox="0 0 4800 4800">
        <circle class="track-background" pathLength="100"></circle>
        <circle class="track" pathLength="100"></circle>
        <circle class="progress" pathLength="100" stroke-dashoffset=${(1 - this.progress) * PROGRESS_SCALE}></circle>
      </svg>
    `;
  }

  #renderIndeterminate(): TemplateResult {
    return html`
      <svg viewBox="0 0 4800 4800">
        <circle class="track-background" pathLength="100"></circle>
      </svg>

      <div class="spinner">
        <div class="left">
          <div class="circle"></div>
        </div>
        <div class="right">
          <div class="circle"></div>
        </div>
      </div>
    `;
  }

  #applyGlobalConfiguration(): void {
    const entry = GlobalConfiguration.get(CIRCULAR_PROGRESS_CONSTANTS.elementName);
    if (entry?.has('track')) {
      const value = entry.valueOf('track');
      if (value) {
        this.track = value;
      }
    }
  }
}

tryDefine(CIRCULAR_PROGRESS_CONSTANTS.elementName, CircularProgressComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-circular-progress': ICircularProgressComponent;
  }
}
