import '@tylertech/forge/meter';
import type { MeterComponent } from '@tylertech/forge/meter';
import type { TemplateFn } from '../types.js';

export type MeterCellOptions = Partial<
  Pick<MeterComponent, 'min' | 'max' | 'low' | 'high' | 'optimum' | 'tickmarks' | 'valueMode' | 'direction' | 'shape' | 'innerShape' | 'theme' | 'muted'>
>;

/**
 * Creates a column `template` that renders the cell value as a small `forge-meter`.
 *
 * @example
 * ```ts
 * { header: 'Usage', property: 'usage', template: meterCell({ min: 0, max: 100, low: 30, high: 70, optimum: 100, valueMode: 'percentage' }) }
 * ```
 */
export function meterCell(options: MeterCellOptions = {}): TemplateFn {
  const { low, high, optimum, ...rest } = options;

  return ({ cell }) => {
    const rawValue = Number(cell.getValue());

    const meter = document.createElement('forge-meter') as MeterComponent;
    Object.assign(meter, rest);
    meter.density = 'small';
    meter.value = Number.isFinite(rawValue) ? rawValue : (rest.min ?? 0);

    if (low != null) {
      meter.low = low;
    }
    if (high != null) {
      meter.high = high;
    }
    if (optimum != null) {
      meter.optimum = optimum;
    }

    return meter;
  };
}
