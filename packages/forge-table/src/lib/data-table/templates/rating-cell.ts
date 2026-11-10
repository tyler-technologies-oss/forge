import '@tylertech/forge/tooltip';
import type { TooltipComponent } from '@tylertech/forge/tooltip';
import type { TemplateFn } from '../types.js';

export interface RatingOptions {
  min?: number;
  max?: number;
  steps?: number;
}

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;
const DEFAULT_STEPS = 5;
const DEFAULT_LABEL = 'Rating';

/**
 * Creates a column `template` that renders the cell value as a row of stars.
 *
 * The value is mapped from the `min`/`max` range onto `steps` stars, with partially filled stars for in-between values.
 * The stars are exposed as an ARIA `meter` and a tooltip shows the value on hover.
 *
 * @example
 * ```ts
 * { header: 'Score', property: 'score', template: ratingCell({ min: 0, max: 10, steps: 5 }) }
 * ```
 */
export function ratingCell(options: RatingOptions = {}): TemplateFn {
  const { min = DEFAULT_MIN, max = DEFAULT_MAX, steps = DEFAULT_STEPS } = options;
  const starCount = Math.max(1, Math.round(steps));
  const range = max - min;

  return ({ cell, column }) => {
    const rawValue = Number(cell.getValue());
    const value = Number.isFinite(rawValue) ? rawValue : min;
    const clampedValue = Math.min(Math.max(value, min), max);
    const progress = range > 0 ? (clampedValue - min) / range : 0;
    const valueText = `${value} out of ${max}`;
    const { header } = column.columnDef;

    const container = document.createElement('span');
    container.classList.add('rating-cell');
    container.style.setProperty('--rating-cell-steps', `${starCount}`);
    container.style.setProperty('--rating-cell-fill', `${progress * 100}%`);

    const meter = document.createElement('span');
    meter.classList.add('rating-cell__meter');
    meter.setAttribute('role', 'meter');
    meter.setAttribute('aria-label', typeof header === 'string' && header ? header : DEFAULT_LABEL);
    meter.setAttribute('aria-valuemin', `${min}`);
    meter.setAttribute('aria-valuemax', `${max}`);
    meter.setAttribute('aria-valuenow', `${clampedValue}`);
    meter.setAttribute('aria-valuetext', valueText);

    const tooltip = document.createElement('forge-tooltip') as TooltipComponent;
    tooltip.textContent = valueText;
    tooltip.anchorElement = meter;

    container.append(meter, tooltip);

    return container;
  };
}
