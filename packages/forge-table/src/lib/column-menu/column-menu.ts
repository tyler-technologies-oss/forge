import type { Column, ColumnOrderState, Table } from '@tanstack/lit-table';
import { IconRegistry } from '@tylertech/forge';
import type { IMenuComponent, IMenuOption, IMenuSelectEventData } from '@tylertech/forge/menu';
import {
  tylIconArrowBack,
  tylIconArrowDownward,
  tylIconArrowForward,
  tylIconArrowUpward,
  tylIconMoreVert,
  tylIconOpenInFull,
  tylIconPushPin,
  tylIconVisibilityOff
} from '@tylertech/tyler-icons';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { canColumnBeReordered } from '../data-table/columns/column-utils.js';
import { SELECT_COLUMN_ID } from '../data-table/constants.js';
import type { Row } from '../data-table/types.js';
import { COLUMN_MENU_ACTION_EVENT, COLUMN_MENU_TAG_NAME } from './constants.js';
import type { ColumnMenuAction, ColumnMenuActionEventDetail } from './types.js';

import '@tylertech/forge/icon';
import '@tylertech/forge/icon-button';
import '@tylertech/forge/menu';

type MoveDirection = -1 | 1;

const DIVIDER_OPTION: IMenuOption = { value: undefined, label: '', divider: true };

/**
 * A menu button with actions for a single table column.
 *
 * Sorting, moving, and hiding are applied directly to the table through the TanStack `column` and `table`.
 * Pinning and maximizing are only announced through the `forge-data-table-column-menu-action` event.
 *
 * @tag forge-data-table-column-menu
 *
 * @event {CustomEvent<ColumnMenuActionEventDetail>} forge-data-table-column-menu-action - Dispatches after the user chooses an action.
 */
@customElement(COLUMN_MENU_TAG_NAME)
export class ColumnMenuElement<TData extends Row = unknown> extends LitElement {
  /**
   * The column that the menu actions apply to.
   */
  @property({ attribute: false })
  public column: Column<TData, unknown> | undefined;

  /**
   * The table that owns the column. Required to reorder columns.
   */
  @property({ attribute: false })
  public table: Table<TData> | undefined;

  /**
   * The accessible label for the menu button.
   */
  @property({ attribute: 'button-label' })
  public buttonLabel = 'Column options';

  constructor() {
    super();
    IconRegistry.define([
      tylIconMoreVert,
      tylIconArrowBack,
      tylIconArrowForward,
      tylIconArrowUpward,
      tylIconArrowDownward,
      tylIconVisibilityOff,
      tylIconPushPin,
      tylIconOpenInFull
    ]);
  }

  @query('forge-menu')
  private _menu?: IMenuComponent;

  #getOptions = (): IMenuOption[] => {
    const { column } = this;
    if (!column) {
      return [];
    }

    const canSort = column.getCanSort();
    const isPinned = !!column.getIsPinned();

    const item = (value: ColumnMenuAction, label: string, leadingIcon: string, disabled = false): IMenuOption<ColumnMenuAction> => ({
      value,
      label,
      leadingIcon,
      leadingIconType: 'component',
      disabled
    });

    return [
      item('move-left', 'Move left', 'arrow_back', !this.#getMoveTarget(-1)),
      item('move-right', 'Move right', 'arrow_forward', !this.#getMoveTarget(1)),
      DIVIDER_OPTION,
      item('sort-ascending', 'Sort ascending', 'arrow_upward', !canSort),
      item('sort-descending', 'Sort descending', 'arrow_downward', !canSort),
      DIVIDER_OPTION,
      item('hide', 'Hide', 'visibility_off', !column.getCanHide()),
      item(isPinned ? 'unpin' : 'pin', isPinned ? 'Unpin' : 'Pin', 'push_pin'),
      item('maximize', 'Maximize', 'open_in_full')
    ];
  };

  #getMoveTarget(direction: MoveDirection): Column<TData, unknown> | undefined {
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

    const order: ColumnOrderState = table.getState().columnOrder.length ? [...table.getState().columnOrder] : table.getAllLeafColumns().map(({ id }) => id);
    const from = order.indexOf(column.id);
    const to = order.indexOf(target.id);
    if (from < 0 || to < 0) {
      return;
    }

    [order[from], order[to]] = [order[to], order[from]];
    table.setColumnOrder(order);
  }

  #applyAction(action: ColumnMenuAction): void {
    const { column } = this;
    if (!column) {
      return;
    }

    switch (action) {
      case 'move-left':
        this.#move(-1);
        break;
      case 'move-right':
        this.#move(1);
        break;
      case 'sort-ascending':
        column.toggleSorting(false);
        break;
      case 'sort-descending':
        column.toggleSorting(true);
        break;
      case 'hide':
        column.toggleVisibility(false);
        break;
    }
  }

  #onMenuSelect(evt: CustomEvent<IMenuSelectEventData<ColumnMenuAction>>): void {
    evt.stopPropagation();

    const { column } = this;
    const action = evt.detail.value;
    if (!column || !action) {
      return;
    }

    this.#applyAction(action);
    this.dispatchEvent(
      new CustomEvent<ColumnMenuActionEventDetail>(COLUMN_MENU_ACTION_EVENT, {
        detail: { columnId: column.id, action },
        bubbles: true,
        composed: true
      })
    );
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override firstUpdated(): void {
    if (this._menu) {
      this._menu.options = this.#getOptions;
    }
  }

  // eslint-disable-next-line @tylertech-eslint/require-private-modifier
  protected override render(): TemplateResult {
    return html`
      <forge-menu placement="bottom-end" @forge-menu-select=${this.#onMenuSelect}>
        <forge-icon-button aria-label=${this.buttonLabel} dense shape="squared">
          <forge-icon name="more_vert"></forge-icon>
        </forge-icon-button>
      </forge-menu>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [COLUMN_MENU_TAG_NAME]: ColumnMenuElement<unknown>;
  }

  interface HTMLElementEventMap {
    [COLUMN_MENU_ACTION_EVENT]: CustomEvent<ColumnMenuActionEventDetail>;
  }
}
