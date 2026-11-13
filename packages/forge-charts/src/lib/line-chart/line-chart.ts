import { customElement, property } from 'lit/decorators.js';
import { lineY } from '@tanstack/charts';
import type { ChartMark } from '@tanstack/charts';

import '../scales/point/index.js';
import { CartesianChartComponent, type ChartDatum } from '../chart/cartesian-chart.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-line-chart': LineChartComponent;
  }
}

export const LineChartComponentTagName: keyof HTMLElementTagNameMap = 'forge-line-chart';

/**
 * @tag forge-line-chart
 *
 * @summary Shows how values change across an ordered x axis, with one line per `color` series.
 */
@customElement(LineChartComponentTagName)
export class LineChartComponent extends CartesianChartComponent {
  /**
   * Hides the markers drawn on each data point.
   */
  @property({ type: Boolean, attribute: 'hide-points' })
  public hidePoints = false;

  protected override _createMark(data: readonly ChartDatum[], x: string, y: string): ChartMark<any, any, any, any, any, any, any> {
    return lineY(data, { x, y, color: this.color, points: !this.hidePoints });
  }
}
