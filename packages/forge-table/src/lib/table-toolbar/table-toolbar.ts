import type { ColumnVisibilityState } from '@tanstack/lit-table';
import { IconRegistry } from '@tylertech/forge';
import type { IDropdownMenuItemSelectEventData } from '@tylertech/forge/dropdown-menu';
import {
  tylIconCheckboxMultipleMarked,
  tylIconExport,
  tylIconFilterList,
  tylIconRefresh,
  tylIconSearch,
  tylIconViewColumn,
  tylIconPrint
} from '@tylertech/tyler-icons';
import { html, LitElement, nothing, type PropertyValues, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { map } from 'lit/directives/map.js';
import { repeat } from 'lit/directives/repeat.js';
import { getAllLeafColumns, resolveColumnId } from '../data-table/columns/column-utils.js';
import type { DataTableElement } from '../data-table/data-table.js';
import type { TableToolbarFeature } from './constants.js';
import { TABLE_TOOLBAR_FEATURE_ICONS, TABLE_TOOLBAR_FEATURE_LABELS, TABLE_TOOLBAR_TAG_NAME } from './constants.js';

import '@tylertech/forge/divider';
import '@tylertech/forge/dropdown-menu';
import '@tylertech/forge/dropdown-menu/dropdown-menu-item';
import '@tylertech/forge/dropdown-menu/dropdown-menu-item-checkbox';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';

import styles from './table-toolbar.scss';

const TOGGLE_FEATURES: ReadonlySet<TableToolbarFeature> = new Set(['select', 'filter']);
const MENU_FEATURES: ReadonlySet<TableToolbarFeature> = new Set(['columns']);
const COLUMN_VISIBILITY_EVENT = 'forge-data-table-column-visibility';

interface ColumnOption {
  id: string;
  label: string;
  visible: boolean;
}

/**
 * A toolbar for a `forge-data-table`.
 *
 * Shows how many rows are selected, offers a menu to show and hide the table's columns, and provides slots for a title and extra actions.
 * Connect a data table by setting `table` to its id, or by assigning the element to `tableElement`.
 *
 * @tag forge-data-table-toolbar
 *
 * @slot title - The table's title.
 */
@customElement(TABLE_TOOLBAR_TAG_NAME)
export class TableToolbarElement extends LitElement {
  static {
    IconRegistry.define([tylIconExport, tylIconFilterList, tylIconSearch, tylIconCheckboxMultipleMarked, tylIconPrint, tylIconRefresh, tylIconViewColumn]);
  }

  public static override styles = unsafeCSS(styles);

  /**
   * The id of the data table that the toolbar controls. The table is looked up in the same root as the toolbar and assigned to `tableElement`.
   */
  @property()
  public table: string | undefined;

  /**
   * The data table that the toolbar controls. Set by `table`, or assign it directly.
   */
  @property({ attribute: false })
  public tableElement: DataTableElement<any> | null = null;

  @property({ attribute: 'features', converter: value => (value ? value.split(',').map(v => v.trim()) : []) })
  public features: TableToolbarFeature[] = [];

  #observedTable: DataTableElement<any> | undefined;

  #onTableChange = (): void => this.requestUpdate();

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#observe(this.tableElement);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#observe(null);
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (!this.isConnected) {
      return;
    }
    const elementAssigned = changedProperties.has('tableElement') && this.tableElement !== null;
    if (changedProperties.has('table') && !elementAssigned) {
      this.tableElement = this.#findTable();
    }
    if (changedProperties.has('tableElement') || this.tableElement !== this.#observedTable) {
      this.#observe(this.tableElement);
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="forge-table-toolbar">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="end">
          ${map(
            this.features,
            feature => html`
              <forge-icon-button
                id=${this.#getButtonId(feature)}
                shape="squared"
                ?toggle=${TOGGLE_FEATURES.has(feature)}
                .on=${this.#isFeatureOn(feature)}
                @click=${() => this.#onFeatureClick(feature)}
                @forge-icon-button-toggle=${(evt: CustomEvent<boolean>) => this.#onFeatureToggle(feature, evt)}>
                <forge-icon .name="${TABLE_TOOLBAR_FEATURE_ICONS[feature]}"></forge-icon>
                ${TOGGLE_FEATURES.has(feature) ? html`<forge-icon slot="on" .name="${TABLE_TOOLBAR_FEATURE_ICONS[feature]}"></forge-icon>` : nothing}
              </forge-icon-button>
              <forge-tooltip type="label" placement="top"> ${TABLE_TOOLBAR_FEATURE_LABELS[feature]} </forge-tooltip>
              ${this.#renderMenu(feature)}
            `
          )}
        </div>
      </div>
    `;
  }

  #getButtonId(feature: TableToolbarFeature): string {
    return `${feature}-button`;
  }

  #renderMenu(feature: TableToolbarFeature): TemplateResult | typeof nothing {
    if (!MENU_FEATURES.has(feature)) {
      return nothing;
    }
    return html`
      <forge-dropdown-menu dense trigger=${this.#getButtonId(feature)} @toggle=${this.#onMenuToggle}>${this.#renderMenuItems(feature)}</forge-dropdown-menu>
    `;
  }

  #renderMenuItems(feature: TableToolbarFeature): TemplateResult | typeof nothing {
    if (feature === 'columns') {
      const options = this.#getColumnOptions();
      return html`
        <forge-dropdown-menu-item ?disabled=${options.every(({ visible }) => visible)} @forge-dropdown-menu-item-select=${this.#onShowAllSelect}>
          Show all
        </forge-dropdown-menu-item>
        <forge-divider></forge-divider>
        ${repeat(
          options,
          ({ id }) => id,
          ({ id, label, visible }) => html`
            <forge-dropdown-menu-item-checkbox .value=${id} .checked=${live(visible)} @forge-dropdown-menu-item-select=${this.#onColumnSelect}>
              ${label}
            </forge-dropdown-menu-item-checkbox>
          `
        )}
      `;
    }
    return nothing;
  }

  #onFeatureClick(feature: TableToolbarFeature): void {
    if (feature === 'export') {
      this.tableElement?.exportToCsv();
    } else if (feature === 'print') {
      this.tableElement?.print();
    }
  }

  #isFeatureOn(feature: TableToolbarFeature): boolean {
    if (!this.tableElement) {
      return false;
    }
    if (feature === 'select') {
      return this.tableElement.rowSelection !== 'off';
    }
    return feature === 'filter' && this.tableElement.filterable;
  }

  #onFeatureToggle(feature: TableToolbarFeature, evt: CustomEvent<boolean>): void {
    if (!this.tableElement) {
      return;
    }
    if (feature === 'select') {
      this.tableElement.rowSelection = evt.detail ? 'multiple' : 'off';
    } else if (feature === 'filter') {
      this.tableElement.filterable = evt.detail;
    }
    this.requestUpdate();
  }

  #getColumnOptions(): ColumnOption[] {
    const { tableElement: table } = this;
    if (!table) {
      return [];
    }

    const visibility: ColumnVisibilityState = table.columnVisibility;
    return getAllLeafColumns(table.columns)
      .filter(({ column }) => column.hideable !== false)
      .map(({ column, indexPath }) => {
        const id = resolveColumnId(column, indexPath);
        return { id, label: column.header || id, visible: visibility[id] !== false };
      });
  }

  #findTable(): DataTableElement<any> | null {
    if (!this.table) {
      return null;
    }
    const root = this.getRootNode() as Document | ShadowRoot;
    return root.getElementById?.(this.table) as DataTableElement<any> | null;
  }

  #observe(table: DataTableElement<any> | null): void {
    this.#observedTable?.removeEventListener(COLUMN_VISIBILITY_EVENT, this.#onTableChange);
    this.#observedTable = table ?? undefined;
    table?.addEventListener(COLUMN_VISIBILITY_EVENT, this.#onTableChange);
  }

  #onMenuToggle = (evt: ToggleEvent): void => {
    if (evt.newState === 'open') {
      this.requestUpdate();
    }
  };

  #onShowAllSelect = (evt: CustomEvent<IDropdownMenuItemSelectEventData>): void => {
    evt.preventDefault();
    this.#getColumnOptions()
      .filter(({ visible }) => !visible)
      .forEach(({ id }) => this.tableElement?.showColumn(id));
  };

  #onColumnSelect = (evt: CustomEvent<IDropdownMenuItemSelectEventData>): void => {
    evt.preventDefault();
    const { value, checked } = evt.detail;
    if (checked) {
      this.tableElement?.showColumn(value as string);
    } else {
      this.tableElement?.hideColumn(value as string);
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [TABLE_TOOLBAR_TAG_NAME]: TableToolbarElement;
  }
}
