import { customElement } from 'lit/decorators.js';
import { areaY } from '@tanstack/charts';
import type { ChartMark } from '@tanstack/charts';

import '../scales/point/index.js';
import { CartesianChartComponent, type ChartDatum } from '../chart/cartesian-chart.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-area-chart': AreaChartComponent;
  }
}

export const AreaChartComponentTagName: keyof HTMLElementTagNameMap = 'forge-area-chart';

/**
 * @tag forge-area-chart
 *
 * @summary Shows how a total changes over an ordered x axis. When `color` is set, the series are stacked.
 */
@customElement(AreaChartComponentTagName)
export class AreaChartComponent extends CartesianChartComponent {
  protected override _createMark(data: readonly ChartDatum[], x: string, y: string): ChartMark<any, any, any, any, any, any, any> {
    return areaY(data, { x, y, color: this.color });
  }
}
