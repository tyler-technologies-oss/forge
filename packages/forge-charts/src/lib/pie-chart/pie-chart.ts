import { customElement, property } from 'lit/decorators.js';
import type { DomChartDefinition } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';

import { ChartComponent } from '../chart/chart.js';
import { defineForgeChart } from '../chart/define-chart.js';
import type { ChartDatum } from '../chart/cartesian-chart.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-pie-chart': PieChartComponent;
  }
}

export const PieChartComponentTagName: keyof HTMLElementTagNameMap = 'forge-pie-chart';

const RADIUS_RATIO = 0.82;
const CORNER_RADIUS = 4;

/**
 * @tag forge-pie-chart
 *
 * @summary Shows how a total is divided among categories. Set `inner-radius` to render a donut.
 */
@customElement(PieChartComponentTagName)
export class PieChartComponent extends ChartComponent {
  /**
   * The rows to plot, one slice per row.
   */
  @property({ attribute: false })
  public data: readonly ChartDatum[] = [];

  /**
   * The field in each row that provides the slice's category (its name and color).
   */
  @property()
  public category?: string;

  /**
   * The field in each row that provides the slice's value.
   */
  @property()
  public value?: string;

  /**
   * The size of the hole in the middle as a fraction of the radius, from `0` (a pie) to `1`.
   */
  @property({ type: Number, attribute: 'inner-radius' })
  public innerRadius = 0;

  protected override _createDefinition(): DomChartDefinition<any> | undefined {
    const { data, category, value, innerRadius } = this;
    if (!data.length || !category || !value) {
      return undefined;
    }

    const slices = pie(data, { value });
    return defineForgeChart({
      marks: [
        polar({
          radiusRatio: RADIUS_RATIO,
          marks: [
            radialArc(slices, {
              innerRadius: ({ radius }: { radius: number }) => radius * innerRadius,
              cornerRadius: CORNER_RADIUS,
              color: category,
              key: category
            })
          ],
          scales: { angle: null, radius: null }
        })
      ],
      scales: { x: null, y: null }
    });
  }
}
