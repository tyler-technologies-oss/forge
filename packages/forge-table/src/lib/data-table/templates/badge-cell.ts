import '@tylertech/forge/icon';
import type { BadgeTheme } from '@tylertech/forge/badge';
import type { TemplateFn } from '../types.js';

export interface BadgeCellConfig {
  text: string;
  icon?: string;
  theme?: BadgeTheme;
  strong?: boolean;
}

export type BadgeCellFn = (props: Parameters<TemplateFn>[0]) => BadgeCellConfig | BadgeCellConfig[];

export interface BadgeCellOptions {
  badges?: BadgeCellFn;
}

const DEFAULT_THEME: BadgeTheme = 'default';

const createBadge = ({ text, icon, theme = DEFAULT_THEME, strong }: BadgeCellConfig): HTMLElement => {
  const badge = document.createElement('span');
  badge.classList.add('forge-badge');

  if (theme !== DEFAULT_THEME) {
    badge.classList.add(`forge-badge--${theme}`);
  }
  if (strong) {
    badge.classList.add('forge-badge--strong');
  }

  if (icon) {
    const iconElement = document.createElement('forge-icon');
    iconElement.setAttribute('name', icon);
    badge.appendChild(iconElement);
  }

  badge.appendChild(document.createTextNode(text));

  return badge;
};

/**
 * Creates a column `template` that renders one or more CSS-only `forge-badge` elements.
 *
 * Without `badges`, a single default badge containing the cell value is rendered. With `badges`, the callback receives the same
 * props as a `TemplateFn` and returns a badge config or an array of them.
 *
 * @example
 * ```ts
 * {
 *   header: 'Status',
 *   property: 'status',
 *   template: badgeCell({ badges: ({ cell }) => ({ text: cell.getValue(), theme: 'success', icon: 'check', strong: true }) })
 * }
 * ```
 */
export function badgeCell(options: BadgeCellOptions = {}): TemplateFn {
  const { badges } = options;

  return props => {
    const rawValue = props.cell.getValue();
    const configs = badges ? badges(props) : { text: rawValue == null ? '' : String(rawValue) };
    const badgeConfigs = Array.isArray(configs) ? configs : [configs];

    const container = document.createElement('span');
    container.classList.add('badge-cell');
    container.append(...badgeConfigs.map(createBadge));

    return container;
  };
}
