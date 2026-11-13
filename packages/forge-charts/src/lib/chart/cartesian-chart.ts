import { property } from 'lit/decorators.js';
import type { ChartMark, DomChartDefinition } from '@tanstack/charts';

import { scaleLinear } from '../scales/linear/index.js';
import { resolveChartScale, type ChartScaleType } from '../scales/scale-registry.js';
import { ChartComponent } from './chart.js';
import { defineForgeChart } from './define-chart.js';

export type ChartDatum = Record<string, any>;

export type ChartXScaleType = 'auto' | ChartScaleType;

/**
 * Base class for chart types that plot `data` against an `x` and `y` field.
 *
 * Subclasses provide the mark through `_createMark()`.
 */
export abstract class CartesianChartComponent extends ChartComponent {
  /**
   * The rows to plot.
   */
  @property({ attribute: false })
  public data: readonly ChartDatum[] = [];

  /**
   * The field in each row that provides the x value.
   */
  @property()
  public x?: string;

  /**
   * The field in each row that provides the y value.
   */
  @property()
  public y?: string;

  /**
   * The field in each row that splits the data into colored series.
   */
  @property()
  public color?: string;

  /**
   * The scale used for the x axis. `auto` picks `time` for dates, `linear` for numbers, and `point` otherwise.
   *
   * Scales are tree-shakable: the chart only knows the scales that have been imported from `@tylertech/forge-charts/scales/<type>`.
   * `linear` is always available, `forge-bar-chart` imports `band`, and the other charts import `point`.
   */
  @property({ attribute: 'x-scale' })
  public xScale: ChartXScaleType = 'auto';

  /**
   * The title of the x axis.
   */
  @property({ attribute: 'x-label' })
  public xLabel?: string;

  /**
   * The title of the y axis.
   */
  @property({ attribute: 'y-label' })
  public yLabel?: string;

  protected abstract _createMark(data: readonly ChartDatum[], x: string, y: string): ChartMark<any, any, any, any, any, any, any>;

  protected override _createDefinition(): DomChartDefinition<any> | undefined {
    const { data, x, y } = this;
    if (!data.length || !x || !y) {
      return undefined;
    }

    const xScale = this.#createXScale(data, x);
    if (!xScale) {
      return undefined;
    }

    return defineForgeChart({
      marks: [this._createMark(data, x, y)],
      scales: {
        x: { scale: xScale, ...(this.xLabel && { axis: { label: this.xLabel } }) },
        y: { scale: scaleLinear, nice: true, grid: true, ...(this.yLabel && { axis: { label: this.yLabel } }) }
      }
    });
  }

  #createXScale(data: readonly ChartDatum[], x: string): (() => any) | undefined {
    const type = this.xScale === 'auto' ? this.#inferXScale(data, x) : this.xScale;
    const scale = resolveChartScale(type, () => this.#getCategories(data, x));
    if (!scale) {
      console.warn(`The "${type}" x-scale is not registered. Import "@tylertech/forge-charts/scales/${type}" to use it.`);
    }
    return scale;
  }

  #inferXScale(data: readonly ChartDatum[], x: string): Exclude<ChartXScaleType, 'auto'> {
    const sample = data.find(row => row[x] != null)?.[x];
    if (sample instanceof Date) {
      return 'time';
    }
    return typeof sample === 'number' ? 'linear' : 'point';
  }

  #getCategories(data: readonly ChartDatum[], x: string): unknown[] {
    return [...new Set(data.map(row => row[x]))];
  }
}
