import type { Row as TanstackRow } from '@tanstack/lit-table';
import type { DataTableFeatures } from '../table-features.js';
import { labelWithRowName } from './row-meta.js';
import type { ColumnDef, Row } from '../types.js';

import '@tylertech/forge/icon-button';
import '@tylertech/forge/icon';

export interface ExpanderColumnOptions {
  /**
   * Optional identifier applied to the column.
   * Defaults to `expander`.
   */
  id?: string;
  /**
   * Optional header content. Defaults to an empty string
   * to keep the header area visually compact.
   */
  header?: string;
  /**
   * Accessible label applied to the toggle button.
   */
  ariaLabel?: string;
  /**
   * Icon name rendered when the row is expanded.
   */
  expandedIcon?: string;
  /**
   * Icon name rendered when the row is collapsed.
   */
  collapsedIcon?: string;
}

interface ExpandableRow {
  getIsExpanded(): boolean;
  toggleExpanded(): void;
}

export function createExpanderColumn<TData extends Row = Row>(options: ExpanderColumnOptions = {}): ColumnDef<TData> {
  const { id = 'expander', header = '', ariaLabel = 'Toggle row expansion', expandedIcon = 'chevron_down', collapsedIcon = 'chevron_right' } = options;

  return {
    id,
    header,
    hideable: false,
    resizable: false,
    width: 56,
    stopRowClickPropagation: true,
    template: ({ row }) => {
      const expandableRow = row as TanstackRow<DataTableFeatures, TData> & ExpandableRow;
      const iconButton = document.createElement('forge-icon-button');
      const icon = document.createElement('forge-icon');

      const updateIconState = (): void => {
        const isExpanded = expandableRow.getIsExpanded();
        icon.name = isExpanded ? expandedIcon : collapsedIcon;
        iconButton.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      };

      icon.external = true;
      iconButton.setAttribute('aria-label', ariaLabel);
      labelWithRowName(iconButton, row);
      iconButton.appendChild(icon);

      iconButton.addEventListener('click', evt => {
        evt.stopPropagation();
        expandableRow.toggleExpanded();
        updateIconState();
      });

      updateIconState();

      return iconButton;
    }
  };
}
