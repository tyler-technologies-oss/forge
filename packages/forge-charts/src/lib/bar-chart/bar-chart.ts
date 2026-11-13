import { customElement, property } from 'lit/decorators.js';
import { barY } from '@tanstack/charts';
import type { ChartMark } from '@tanstack/charts';
import { group } from '@tanstack/charts/group';

import '../scales/band/index.js';
import { CartesianChartComponent, type ChartDatum } from '../chart/cartesian-chart.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-bar-chart': BarChartComponent;
  }
}

export const BarChartComponentTagName: keyof HTMLElementTagNameMap = 'forge-bar-chart';

const BAR_INSET = 2;

/**
 * @tag forge-bar-chart
 *
 * @summary Compares values across categories with vertical bars.
 *
 * When `color` is set, the series are stacked unless `grouped` is set.
 */
@customElement(BarChartComponentTagName)
export class BarChartComponent extends CartesianChartComponent {
  /**
   * Places the series side by side instead of stacking them.
   */
  @property({ type: Boolean })
  public grouped = false;

  constructor() {
    super();
    this.xScale = 'band';
  }

  protected override _createMark(data: readonly ChartDatum[], x: string, y: string): ChartMark<any, any, any, any, any, any, any> {
    return barY(data, { x, y, color: this.color, inset: BAR_INSET, ...(this.grouped && { layout: group() }) });
  }
}
