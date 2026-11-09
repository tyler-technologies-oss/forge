import type { TemplateFn } from '../types.js';

export interface RatingOptions {
  min?: number;
  max?: number;
  steps?: number;
}

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;
const DEFAULT_STEPS = 5;

/**
 * Creates a column `template` that renders the cell value as a row of stars.
 *
 * The value is mapped from the `min`/`max` range onto `steps` stars, with partially filled stars for in-between values.
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

  return ({ cell }) => {
    const rawValue = Number(cell.getValue());
    const value = Number.isFinite(rawValue) ? rawValue : min;
    const progress = range > 0 ? Math.min(Math.max((value - min) / range, 0), 1) : 0;

    const element = document.createElement('span');
    element.classList.add('rating-cell');
    element.setAttribute('role', 'img');
    element.setAttribute('aria-label', `${value} out of ${max}`);
    element.style.setProperty('--rating-cell-steps', `${starCount}`);
    element.style.setProperty('--rating-cell-fill', `${progress * 100}%`);

    return element;
  };
}
