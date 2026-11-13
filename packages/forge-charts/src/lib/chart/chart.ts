import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { mountChart } from '@tanstack/charts/dom';
import type { ChartMark, ChartPoint, ChartScale, DomChartDefinition } from '@tanstack/charts';

import styles from './chart.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-chart': ChartComponent;
  }
}

export const ChartComponentTagName: keyof HTMLElementTagNameMap = 'forge-chart';

const DEFAULT_HEIGHT = 320;

const NAME_ATTRIBUTES = ['aria-label', 'aria-labelledby'];

const HOST_PROPERTIES: ReadonlySet<PropertyKey> = new Set(['height', 'aspectRatio']);

export interface ForgeChartSelectEventData {
  point: ChartPoint | null;
}

/**
 * @tag forge-chart
 *
 * @summary Renders a TanStack Charts definition with Forge theming.
 *
 * The host gets `role="figure"` unless a role is already set. Name it with `aria-label` or `aria-labelledby` and describe it with `aria-describedby` on the element itself.
 * The focusable chart graphic inside the shadow root is named from the host's `aria-label` or `aria-labelledby`.
 *
 * Chart type components (for example `forge-bar-chart`) extend this class and build the definition from their own properties by overriding `_createDefinition()`.
 *
 * @event {CustomEvent<ForgeChartSelectEventData>} forge-chart-select - Fires when a data point is clicked or activated with the keyboard. `point` is `null` when empty space is clicked.
 */
@customElement(ChartComponentTagName)
export class ChartComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  public static override get observedAttributes(): string[] {
    return [...super.observedAttributes, ...NAME_ATTRIBUTES];
  }

  /**
   * The chart definition to render. Create it with `defineChart()` from `@tanstack/charts`.
   * Replace the definition to update the chart; mutating it in place has no effect.
   */
  @property({ attribute: false })
  public definition?: DomChartDefinition<any>;

  @property({ attribute: false })
  public marks?: ChartMark | ChartMark[];

  @property({ attribute: false })
  public scales?: ChartScale | ChartScale[];

  /**
   * The height of the chart in pixels. Defaults to 320 unless `aspect-ratio` is set.
   */
  @property({ type: Number })
  public height?: number;

  /**
   * The width-to-height ratio of the chart. Ignored when `height` is set.
   */
  @property({ type: Number, attribute: 'aspect-ratio' })
  public aspectRatio?: number;

  @query('.container')
  private readonly _container!: HTMLElement;

  #host?: ReturnType<typeof mountChart>;
  #resolvedDefinition?: DomChartDefinition<any>;

  public override attributeChangedCallback(name: string, previous: string | null, value: string | null): void {
    super.attributeChangedCallback(name, previous, value);
    if (NAME_ATTRIBUTES.includes(name)) {
      this.requestUpdate();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'figure');
    }
    if (this.hasUpdated) {
      this.requestUpdate();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#destroy();
  }

  public override updated(changed: PropertyValues<this>): void {
    const affectsDefinition = [...changed.keys()].some(key => !HOST_PROPERTIES.has(key));
    if (affectsDefinition || !this.#host) {
      this.#resolvedDefinition = this._createDefinition();
    }

    if (!this.#resolvedDefinition) {
      this.#destroy();
      return;
    }

    const options = {
      definition: this.#resolvedDefinition,
      ariaLabel: this.#getAccessibleName(),
      height: this.height ?? (this.aspectRatio ? undefined : DEFAULT_HEIGHT),
      aspectRatio: this.aspectRatio,
      onSelect: (point: ChartPoint | null): void => {
        this.dispatchEvent(new CustomEvent<ForgeChartSelectEventData>('forge-chart-select', { detail: { point }, bubbles: true, composed: true }));
      }
    };

    if (this.#host) {
      this.#host.update(options);
    } else {
      this.#host = mountChart(this._container, options);
    }
  }

  public override render(): TemplateResult {
    return html`<div class="container"></div>`;
  }

  /**
   * Creates the definition to render. Called when any property other than the host sizing properties changes.
   * Chart type components override this to build a definition from their own properties.
   * Return `undefined` to render nothing.
   */
  protected _createDefinition(): DomChartDefinition<any> | undefined {
    return this.definition;
  }

  #getAccessibleName(): string {
    const label = this.getAttribute('aria-label');
    if (label) {
      return label;
    }
    const root = this.getRootNode() as Document | ShadowRoot;
    const ids = this.getAttribute('aria-labelledby')?.split(/\s+/).filter(Boolean) ?? [];
    return ids
      .map(id => root.getElementById?.(id)?.textContent?.trim())
      .filter(Boolean)
      .join(' ');
  }

  #destroy(): void {
    this.#host?.destroy();
    this.#host = undefined;
  }
}
