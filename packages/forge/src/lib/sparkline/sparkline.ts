import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { PropertyValues, SVGTemplateResult, TemplateResult, html, nothing, svg, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { Theme } from '../constants.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { setDefaultAria } from '../core/utils/a11y-utils.js';

import styles from './sparkline.scss';

export const SPARKLINE_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-sparkline';

export type SparklineTheme = Theme | 'default';

/**
 * @tag forge-sparkline
 *
 * @summary Sparklines display compact line charts for visualizing data trends without axes or labels.
 *
 * @cssproperty --forge-sparkline-fill-color - The color of the filled area.
 * @cssproperty --forge-sparkline-stroke-color - The color of the line stroke.
 * @cssproperty --forge-sparkline-height - The block size.
 * @cssproperty --forge-sparkline-transition-duration - Animation duration.
 * @cssproperty --forge-sparkline-transition-easing - Animation easing.
 *
 * @csspart root - The root SVG element.
 * @csspart gradient - The linear gradient definition for the line stroke.
 * @csspart path - The SVG path element representing the line.
 */
@customElement(SPARKLINE_TAG_NAME)
export class SparklineComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SPARKLINE_TAG_NAME;

  #internals: ElementInternals;

  /**
   * Array of numeric data points to plot.
   * @default []
   * @attribute
   */
  @property({ type: Array, attribute: false })
  public value: number[] | Date[] = [];

  /**
   * Minimum value for normalization. Auto-calculated from data if not provided.
   * @attribute
   */
  @property({ type: Number })
  public min?: number | Date;

  /**
   * Maximum value for normalization. Auto-calculated from data if not provided.
   * @attribute
   */
  @property({ type: Number })
  public max?: number | Date;

  /**
   * Theme color variant.
   * @default 'primary'
   * @attribute
   */
  @property({ type: String })
  public theme: SparklineTheme = 'default';

  /**
   * Whether to render the path as a smooth curve using Bezier interpolation.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public smooth = false;

  /**
   * Custom gradient color stop values.
   */
  @property({ type: Array, attribute: false })
  public gradient?: string[];

  @state()
  protected _path = '';

  @state()
  protected _fill = '';

  @state()
  protected _fillMask?: SVGTemplateResult;

  get #numericMin(): number | undefined {
    if (this.min === undefined) {
      return undefined;
    }
    return Number(this.min);
  }

  get #numericMax(): number | undefined {
    if (this.max === undefined) {
      return undefined;
    }
    return Number(this.max);
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'img'
    });
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (
      changedProperties.has('value') ||
      changedProperties.has('min') ||
      changedProperties.has('max') ||
      changedProperties.has('smooth') ||
      changedProperties.has('gradient')
    ) {
      const normalized = this.#normalizeData(this.value);
      this._path = this.#createPath(normalized);
      this._fill = this.#createFill();
      this._fillMask = this.#createFillMaskTemplate();
    }
  }

  public render(): TemplateResult {
    const classes = {
      sparkline: true,
      [`theme--${this.theme}`]: true
    };
    const gradient = 'url(#gradient)';

    return html`
      <svg part="root" class=${classMap(classes)} aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
        <linearGradient part="gradient" class="gradient" id="gradient" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
          ${this.#createGradient()}
        </linearGradient>
        ${this._fillMask ?? nothing}
        <path part="path" class="path" stroke=${gradient} d=${this._path} />
        <path part="fill" class="fill" fill=${gradient} stroke=${gradient} mask="url(#fillMask)" d=${this._fill} />
      </svg>
    `;
  }

  #normalizeData(data: number[] | Date[]): number[] {
    const dataCopy = data.map(value => Number(value));
    const minVal = this.#numericMin ?? Math.min(...dataCopy);
    const maxVal = this.#numericMax ?? Math.max(...dataCopy);
    const range = maxVal - minVal;

    // Duplicate a single data point to create a valid path
    if (dataCopy.length === 1) {
      dataCopy.push(dataCopy[0]);
    }

    // Set all points to 0.5 if they are the same to create a flat line in the middle of the chart
    if (range === 0) {
      return dataCopy.map(() => 0.5);
    }

    return dataCopy.map(val => (val - minVal) / range);
  }

  #createPath(data: number[]): string {
    if (data.length === 0) {
      return '';
    }

    const normalized = this.#normalizeData(data);
    const points = this.#normalizedDataToPoints(normalized);

    if (this.smooth) {
      return this.#createSmoothPath(points);
    }

    return this.#createLinearPath(points);
  }

  #createFill(): string {
    if (this._path) {
      return `${this._path} L 100 100 L 0 100 Z`;
    }
    return '';
  }

  #createFillMaskTemplate(): SVGTemplateResult {
    // Use a mask to hide areas of the fill that may extend above the value path
    if (this._path) {
      return svg`
        <mask id="fillMask">
          <rect fill="white" x="-100" y="-100" width="300" height="300" />
          <path class="fill-mask" fill="black" stroke="none" d="${this._path} L 100 0 L 0 0 Z" />
        </mask>
      `;
    }
    return svg``;
  }

  #normalizedDataToPoints(normalized: number[]): Array<{ x: number; y: number }> {
    return normalized.map((value, index) => ({
      x: normalized.length === 1 ? 50 : (index / (normalized.length - 1)) * 100,
      y: 100 - value * 100
    }));
  }

  #createLinearPath(points: Array<{ x: number; y: number }>): string {
    // A path must have at least two points
    if (points.length <= 1) {
      return '';
    }

    const pathSegments = points.map(p => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    return `M ${pathSegments.join(' L ')}`;
  }

  #createSmoothPath(points: Array<{ x: number; y: number }>): string {
    // A path must have at least two points
    if (points.length <= 1) {
      return '';
    }

    // Two points create a straight line, so no need for a Bezier curve
    if (points.length === 2) {
      return this.#createLinearPath(points);
    }

    const pathSegments: string[] = [];
    pathSegments.push(`M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`);

    for (let i = 0; i < points.length - 1; i++) {
      const controlPoints = this.#getControlPoints(points, i);
      pathSegments.push(
        `C ${controlPoints.cp1.x.toFixed(2)} ${controlPoints.cp1.y.toFixed(2)}, ` +
          `${controlPoints.cp2.x.toFixed(2)} ${controlPoints.cp2.y.toFixed(2)}, ` +
          `${points[i + 1].x.toFixed(2)} ${points[i + 1].y.toFixed(2)}`
      );
    }

    return pathSegments.join(' ');
  }

  #getControlPoints(points: Array<{ x: number; y: number }>, i: number): { cp1: { x: number; y: number }; cp2: { x: number; y: number } } {
    const tension = 1;

    const p0 = i === 0 ? this.#mirrorPoint(points[0], points[1]) : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i === points.length - 2 ? this.#mirrorPoint(points[i + 1], points[i]) : points[i + 2];

    const cp1 = {
      x: p1.x + (p2.x - p0.x) / (6 * tension),
      y: p1.y + (p2.y - p0.y) / (6 * tension)
    };

    const cp2 = {
      x: p2.x - (p3.x - p1.x) / (6 * tension),
      y: p2.y - (p3.y - p1.y) / (6 * tension)
    };

    return { cp1, cp2 };
  }

  #mirrorPoint(point: { x: number; y: number }, reference: { x: number; y: number }): { x: number; y: number } {
    return {
      x: 2 * point.x - reference.x,
      y: 2 * point.y - reference.y
    };
  }

  #createGradient(): SVGTemplateResult {
    if (this.gradient?.length) {
      return svg`
        ${this.gradient.map((color, index) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const offset = (index / (this.gradient!.length - 1)) * 100;
          return svg`
            <stop offset="${offset}%" stop-color="${color}" />
          `;
        })}
      `;
    }
    return svg`
      <stop class="gradient-start" offset="0%" />
      <stop class="gradient-stop" offset="100%" />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-sparkline': SparklineComponent;
  }
}
