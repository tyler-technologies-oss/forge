import '@tylertech/forge/meter';
import type { MeterComponent } from '@tylertech/forge/meter';
import '@tylertech/forge/tooltip';
import type { TooltipComponent } from '@tylertech/forge/tooltip';
import type { TemplateFn } from '../types.js';

export type MeterCellOptions = Partial<
  Pick<MeterComponent, 'min' | 'max' | 'low' | 'high' | 'optimum' | 'tickmarks' | 'valueMode' | 'direction' | 'shape' | 'innerShape' | 'theme' | 'muted'>
>;

const DEFAULT_LABEL = 'Meter';
const PERCENTAGE_FACTOR = 100;

function getTooltipText({ value, min, max, valueMode }: MeterComponent): string {
  if (valueMode !== 'percentage') {
    return `${value} out of ${max}`;
  }
  const range = max - min;
  const percentage = range > 0 ? ((value - min) / range) * PERCENTAGE_FACTOR : 0;
  return `${Math.round(Math.min(Math.max(percentage, 0), PERCENTAGE_FACTOR))}%`;
}

/**
 * Creates a column `template` that renders the cell value as a small `forge-meter` with a tooltip that shows the value.
 *
 * @example
 * ```ts
 * { header: 'Usage', property: 'usage', template: meterCell({ min: 0, max: 100, low: 30, high: 70, optimum: 100, valueMode: 'percentage' }) }
 * ```
 */
export function meterCell(options: MeterCellOptions = {}): TemplateFn {
  const { low, high, optimum, ...rest } = options;

  return ({ cell, column }) => {
    const rawValue = Number(cell.getValue());

    const meter = document.createElement('forge-meter') as MeterComponent;
    Object.assign(meter, rest);
    meter.density = 'small';
    meter.value = Number.isFinite(rawValue) ? rawValue : (rest.min ?? 0);
    meter.setAttribute('aria-label', column.columnDef.header || DEFAULT_LABEL);

    if (low != null) {
      meter.low = low;
    }
    if (high != null) {
      meter.high = high;
    }
    if (optimum != null) {
      meter.optimum = optimum;
    }

    const tooltip = document.createElement('forge-tooltip') as TooltipComponent;
    tooltip.textContent = getTooltipText(meter);
    tooltip.anchorElement = meter;

    const container = document.createElement('div');
    container.classList.add('meter-cell');
    container.append(meter, tooltip);

    return container;
  };
}
