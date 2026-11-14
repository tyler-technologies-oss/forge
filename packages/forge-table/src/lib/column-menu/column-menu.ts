import type { Column, ColumnOrderState, Table } from '@tanstack/lit-table';
import { IconRegistry } from '@tylertech/forge';
import {
  tylIconArrowBack,
  tylIconArrowDownward,
  tylIconArrowExpandHorizontal,
  tylIconArrowForward,
  tylIconArrowLeftRight,
  tylIconArrowUpward,
  tylIconDockLeft,
  tylIconDockRight,
  tylIconEdit,
  tylIconMoreVert,
  tylIconPin,
  tylIconPinOff,
  tylIconSort,
  tylIconVisibilityOff
} from '@tylertech/tyler-icons';
import { html, LitElement, nothing, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { canColumnBeReordered } from '../data-table/columns/column-utils.js';
import { SELECT_COLUMN_ID } from '../data-table/constants.js';
import type { DataTableFeatures } from '../data-table/table-features.js';
import type { Row } from '../data-table/types.js';
import { COLUMN_MENU_ACTION_EVENT, COLUMN_MENU_TAG_NAME } from './constants.js';
import type { ColumnMenuActionEventDetail } from './types.js';

import '@tylertech/forge/dropdown-menu';
import '@tylertech/forge/dropdown-menu/dropdown-menu-item';
import '@tylertech/forge/dropdown-menu/dropdown-menu-item-checkbox';
import '@tylertech/forge/dropdown-menu/dropdown-menu-item-radio';
import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';

import styles from './column-menu.scss';

type MoveDirection = -1 | 1;

/**
 * A menu button with actions for a single table column.
 *
 * Sorting, moving, hiding, and pinning are applied directly to the table through the TanStack `column` and `table`.
 * Maximizing and renaming are only announced through the `forge-data-table-column-menu-action` event, because the owner of the header decides how to present them.
 *
 * @tag forge-data-table-column-menu
 *
 * @event {CustomEvent<ColumnMenuActionEventDetail>} forge-data-table-column-menu-action - Dispatches after the user chooses an action.
 */
@customElement(COLUMN_MENU_TAG_NAME)
export class ColumnMenuElement<TData extends Row = Row> extends LitElement {
  static {
    IconRegistry.define([
      tylIconMoreVert,
      tylIconArrowBack,
      tylIconArrowForward,
      tylIconArrowLeftRight,
      tylIconArrowUpward,
      tylIconArrowDownward,
      tylIconEdit,
      tylIconVisibilityOff,
      tylIconPin,
      tylIconPinOff,
      tylIconDockLeft,
      tylIconDockRight,
      tylIconSort,
      tylIconArrowExpandHorizontal
    ]);
  }

  public static override styles = unsafeCSS(styles);

  /**
   * The column that the menu actions apply to.
   */
  @property({ attribute: false })
  public column: Column<DataTableFeatures, TData> | undefined;

  /**
   * The table that owns the column. Required to reorder columns.
   */
  @property({ attribute: false })
  public table: Table<DataTableFeatures, TData> | undefined;

  /**
   * Whether the table allows its columns to be reordered. The move actions are only offered when this is set.
   */
  @property({ type: Boolean })
  public reorderable = false;

  /**
   * The accessible label for the menu button.
   */
  @property({ attribute: 'button-label' })
  public buttonLabel = 'Column options';

  public render(): TemplateResult {
    return html`
      <forge-icon-button id="button" aria-label=${this.buttonLabel} dense shape="squared">
        <forge-icon name="more_vert"></forge-icon>
      </forge-icon-button>
      <forge-dropdown-menu class="menu" trigger="button" dense>
        ${this.reorderable
          ? html`
              <forge-dropdown-menu-item>
                <forge-icon slot="start" name="arrow_left_right"></forge-icon>
                <span>Move</span>
                <forge-dropdown-menu-item-radio slot="submenu" .disabled="${!this.#getMoveTarget(-1)}" @click="${() => this.#move(-1)}">
                  <forge-icon slot="start" name="arrow_back"></forge-icon>
                  <span>Move left</span>
                </forge-dropdown-menu-item-radio>
                <forge-dropdown-menu-item-radio slot="submenu" .disabled="${!this.#getMoveTarget(1)}" @click="${() => this.#move(1)}">
                  <forge-icon slot="start" name="arrow_forward"></forge-icon>
                  <span>Move right</span>
                </forge-dropdown-menu-item-radio>
              </forge-dropdown-menu-item>
            `
          : nothing}
        ${this.column?.getCanSort()
          ? html`
              <forge-dropdown-menu-item>
                <forge-icon slot="start" name="sort"></forge-icon>
                <span>Sort</span>
                <forge-dropdown-menu-item-radio slot="submenu" @click="${() => this.column?.toggleSorting(true)}">
                  <forge-icon slot="start" name="arrow_upward"></forge-icon>
                  <span>Ascending</span>
                </forge-dropdown-menu-item-radio>
                <forge-dropdown-menu-item-radio slot="submenu" @click="${() => this.column?.toggleSorting(false)}">
                  <forge-icon slot="start" name="arrow_downward"></forge-icon>
                  <span>Descending</span>
                </forge-dropdown-menu-item-radio>
              </forge-dropdown-menu-item>
            `
          : nothing}
        ${this.column?.columnDef.meta?.renamable && typeof this.column?.columnDef.header === 'string'
          ? html`
              <forge-dropdown-menu-item>
                <forge-icon slot="start" name="edit"></forge-icon>
                <span>Rename</span>
              </forge-dropdown-menu-item>
            `
          : nothing}
        ${this.column?.getCanHide()
          ? html`
              <forge-dropdown-menu-item @click="${() => this.column?.toggleVisibility(false)}">
                <forge-icon slot="start" name="visibility_off"></forge-icon>
                <span>Hide</span>
              </forge-dropdown-menu-item>
            `
          : nothing}
        ${this.column?.getCanPin()
          ? html`
              <forge-dropdown-menu-item>
                <forge-icon slot="start" name="pin"></forge-icon>
                <span>Pin</span>
                <forge-dropdown-menu-item-checkbox
                  slot="submenu"
                  ?checked="${this.column.getIsPinned() === 'start'}"
                  @click="${() => this.column?.pin('start')}">
                  <forge-icon slot="start" name="dock_left"></forge-icon>
                  <span>Start</span>
                </forge-dropdown-menu-item-checkbox>
                <forge-dropdown-menu-item-checkbox slot="submenu" ?checked="${this.column.getIsPinned() === 'end'}" @click="${() => this.column?.pin('end')}">
                  <forge-icon slot="start" name="dock_right"></forge-icon>
                  <span>End</span>
                </forge-dropdown-menu-item-checkbox>
                <forge-dropdown-menu-item slot="submenu" .disabled="${!this.column.getIsPinned()}" @click="${() => this.column?.pin(false)}">
                  <forge-icon slot="start" name="pin_off"></forge-icon>
                  <span>Unpin</span>
                </forge-dropdown-menu-item>
              </forge-dropdown-menu-item>
            `
          : nothing}
        ${this.column?.getCanResize()
          ? html`
              <forge-dropdown-menu-item>
                <forge-icon slot="start" name="arrow_expand_horizontal"></forge-icon>
                <span>Maximize</span>
              </forge-dropdown-menu-item>
            `
          : nothing}
      </forge-dropdown-menu>
    `;
  }

  #getMoveTarget(direction: MoveDirection): Column<DataTableFeatures, TData> | undefined {
    const { column, table } = this;
    if (!column || !table || !canColumnBeReordered(column)) {
      return undefined;
    }

    const siblings = table.getVisibleLeafColumns().filter(sibling => sibling.id !== SELECT_COLUMN_ID && sibling.parent?.id === column.parent?.id);
    const target = siblings[siblings.findIndex(sibling => sibling.id === column.id) + direction];
    return target && canColumnBeReordered(target) ? target : undefined;
  }

  #move(direction: MoveDirection): void {
    const { column, table } = this;
    const target = this.#getMoveTarget(direction);
    if (!column || !table || !target) {
      return;
    }

    const order: ColumnOrderState = table.atoms.columnOrder.get().length ? [...table.atoms.columnOrder.get()] : table.getAllLeafColumns().map(({ id }) => id);
    const from = order.indexOf(column.id);
    const to = order.indexOf(target.id);
    if (from < 0 || to < 0) {
      return;
    }

    [order[from], order[to]] = [order[to], order[from]];
    table.setColumnOrder(order);
  }

  public override focus(options?: FocusOptions): void {
    this.shadowRoot?.querySelector('forge-icon-button')?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [COLUMN_MENU_TAG_NAME]: ColumnMenuElement<any>;
  }

  interface HTMLElementEventMap {
    [COLUMN_MENU_ACTION_EVENT]: CustomEvent<ColumnMenuActionEventDetail>;
  }
}
