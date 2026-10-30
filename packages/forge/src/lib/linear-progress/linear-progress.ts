import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';
import { LINEAR_PROGRESS_CONSTANTS, LinearProgressTheme } from './linear-progress-constants.js';

import styles from './linear-progress.scss';

const DEFAULT_THEME: LinearProgressTheme = 'primary';
const DEFAULT_BUFFER = 1;
const PERCENT = 100;

/** @deprecated - This will be removed in the future. Please switch to using LinearProgressComponent. */
export interface ILinearProgressComponent extends BaseLitElement {
  determinate: boolean;
  progress: number;
  buffer: number;
  theme: LinearProgressTheme;
}

/**
 * @tag forge-linear-progress
 *
 * @summary Linear progress indicators display progress by animating along a linear track in a horizontal direction. They can be used to show determinate or indeterminate progress.
 *
 * @description
 * Progress indicators inform users about the status of ongoing processes.
 * - Determinate indicators display how long a process will take.
 * - Indeterminate indicators express an unspecified amount of wait time.
 *
 * @cssproperty --forge-linear-progress-height - The height of the element.
 * @cssproperty --forge-linear-progress-track-color - The background color of the indicator.
 * @cssproperty --forge-linear-progress-track-shape - The shape of the indicator.
 * @cssproperty --forge-linear-progress-indicator-color - The color of the indicator.
 * @cssproperty --forge-linear-progress-indicator-height - The height of the indicator only.
 * @cssproperty --forge-linear-progress-determinate-duration - The duration of the determinate animation.
 * @cssproperty --forge-linear-progress-indeterminate-duration - The duration of the indeterminate animation.
 * @cssproperty --forge-linear-progress-determinate-easing - The easing function to use for the determinate animation.
 * @cssproperty --forge-linear-progress-theme-transition-duration - The duration of the theme transition.
 * @cssproperty --forge-linear-progress-theme-transition-timing - The easing function to use for the theme transition.
 *
 * @csspart progressbar - Styles the progress bar container element
 */
export class LinearProgressComponent extends BaseLitElement implements ILinearProgressComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = LINEAR_PROGRESS_CONSTANTS.elementName;

  #internals: ElementInternals;
  #progress = 0;
  #buffer = DEFAULT_BUFFER;

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
    this.#progress = value == null || value < 0 || value > 1 || isNaN(value) ? 0 : value;
  }
  public get progress(): number {
    return this.#progress;
  }

  /**
   * Controls the buffer progress while in a determinate state. Accepts values from `0` to `1`.
   * @default 1
   * @attribute
   */
  @property({
    type: Number,
    reflect: true,
    converter: { toAttribute: (value: number) => (value === DEFAULT_BUFFER ? null : `${value}`) }
  })
  public set buffer(value: number) {
    this.#buffer = value == null || value < 0 || isNaN(value) ? 0 : value;
  }
  public get buffer(): number {
    return this.#buffer;
  }

  /**
   * Sets the theme.
   * @default 'primary'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: LinearProgressTheme) => removeDefaultAttribute(value, DEFAULT_THEME) }
  })
  public theme: LinearProgressTheme = DEFAULT_THEME;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
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
      'forge-linear-progress': true,
      [LINEAR_PROGRESS_CONSTANTS.classes.INDETERMINATE]: !this.determinate
    };
    const trackStyles = { transform: `scaleX(${(this.determinate ? this.buffer : DEFAULT_BUFFER) * PERCENT}%)` };
    const progressStyles = { transform: this.determinate ? `scaleX(${this.progress * PERCENT}%)` : '' };
    return html`
      <div class=${classMap(classes)} part="progressbar">
        <div class="dots"></div>
        <div class="track" style=${styleMap(trackStyles)}></div>
        <div class="bar primary-bar" style=${styleMap(progressStyles)}>
          <div class="bar-inner"></div>
        </div>
        <div class="bar secondary-bar">
          <div class="bar-inner"></div>
        </div>
      </div>
    `;
  }
}

tryDefine(LINEAR_PROGRESS_CONSTANTS.elementName, LinearProgressComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-linear-progress': ILinearProgressComponent;
  }
}
