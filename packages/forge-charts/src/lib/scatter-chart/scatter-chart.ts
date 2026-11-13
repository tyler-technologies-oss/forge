import { customElement } from 'lit/decorators.js';
import { dot } from '@tanstack/charts';
import type { ChartMark } from '@tanstack/charts';

import '../scales/point/index.js';
import { CartesianChartComponent, type ChartDatum } from '../chart/cartesian-chart.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-scatter-chart': ScatterChartComponent;
  }
}

export const ScatterChartComponentTagName: keyof HTMLElementTagNameMap = 'forge-scatter-chart';

/**
 * @tag forge-scatter-chart
 *
 * @summary Shows the relationship between two values, with one color per `color` series.
 */
@customElement(ScatterChartComponentTagName)
export class ScatterChartComponent extends CartesianChartComponent {
  protected override _createMark(data: readonly ChartDatum[], x: string, y: string): ChartMark<any, any, any, any, any, any, any> {
    return dot(data, { x, y, color: this.color });
  }
}
