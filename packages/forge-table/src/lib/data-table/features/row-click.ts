import type { Row as TanstackRow } from '@tanstack/lit-table';
import { nothing, type ReactiveController } from 'lit';
import { SELECT_COLUMN_ID } from '../constants.js';
import type { DataTableElement } from '../data-table.js';
import type { DataTableFeatures } from '../table-features.js';
import type { Row } from '../types.js';

export const DEFAULT_ACTION_CLASS = 'has-default-action';
export const CLICKABLE_CLASS = 'clickable';

const DEFAULT_ACTION_SELECTOR = '[forge-default-action]';
const DATA_ROW_SELECTOR = 'tbody tr[part~="body-tr"]:not([part~="group-tr"], [part~="detail-tr"])';
const INTERACTIVE_SELECTOR = `:where(a, button, input, select, textarea, label, [contenteditable], [role="button"], forge-icon-button, forge-button, forge-checkbox, [id="${SELECT_COLUMN_ID}"], [data-forge-stop-row-click-propagation])`;

type DataRow<TData extends Row> = TanstackRow<DataTableFeatures, TData>;

/**
 * Returns whether the event came from interactive content (links, buttons, form controls, checkboxes, ...) inside the element it is handled on,
 * which handles its own clicks.
 */
export function isFromInteractiveContent(evt: Event): boolean {
  const path = evt.composedPath();
  return path
    .slice(0, path.indexOf(evt.currentTarget as EventTarget))
    .some(el => (el as Node).nodeType === Node.ELEMENT_NODE && (el as Element).matches(INTERACTIVE_SELECTOR));
}

/**
 * Finds the element marked with `forge-default-action` in a row, including content slotted into its cells.
 */
export function findDefaultAction(rowElement: Element): HTMLElement | undefined {
  const rendered = rowElement.querySelector<HTMLElement>(DEFAULT_ACTION_SELECTOR);
  if (rendered) {
    return rendered;
  }

  for (const slot of rowElement.querySelectorAll('slot')) {
    for (const element of slot.assignedElements({ flatten: true })) {
      const match = element.matches(DEFAULT_ACTION_SELECTOR) ? element : element.querySelector(DEFAULT_ACTION_SELECTOR);
      if (match) {
        return match as HTMLElement;
      }
    }
  }
  return undefined;
}

/**
 * Returns whether clicking the row can select or expand it. Group rows toggle through their own controls, so they never can.
 */
export function hasRowClickAction<TData extends Row>(row: DataRow<TData>): boolean {
  return !row.getIsGrouped() && (row.getCanSelect() || row.getCanExpand());
}

/**
 * Handles a click on a row that is clickable: it has an element with `forge-default-action`, can be selected, or can be expanded.
 *
 * Dispatches `forge-data-table-row-click`, then clicks the `forge-default-action` element if there is one, otherwise toggles the row selection if it
 * can be selected, otherwise toggles the expansion. Clicks on interactive content, including the default action element itself, are ignored.
 */
function handleRowClick<TData extends Row>(host: DataTableElement<TData>, evt: MouseEvent, row: DataRow<TData>): void {
  const defaultAction = findDefaultAction(evt.currentTarget as Element);
  if (!defaultAction && !hasRowClickAction(row)) {
    return;
  }
  if (isFromInteractiveContent(evt) || (defaultAction && evt.composedPath().includes(defaultAction))) {
    return;
  }

  host.dispatchEvent(new CustomEvent('forge-data-table-row-click', { detail: { data: row.original, index: row.index }, bubbles: true, composed: true }));

  if (defaultAction) {
    defaultAction.click();
  } else if (row.getCanSelect()) {
    row.toggleSelected();
  } else {
    row.toggleExpanded();
  }
}

export function getRowClickHandler<TData extends Row>(host: DataTableElement<TData>, row: DataRow<TData>): ((evt: MouseEvent) => void) | typeof nothing {
  return host.allowRowClick && !row.getIsGrouped() ? (evt: MouseEvent) => handleRowClick(host, evt, row) : nothing;
}

/**
 * Marks the rows that have a `forge-default-action` element once the host has rendered, so the clickable row styles apply to them.
 *
 * It looks at the committed DOM because the element can be in light DOM content slotted into a cell, which a render template cannot see.
 */
export class RowClickController<TData extends Row> implements ReactiveController {
  readonly #host: DataTableElement<TData>;

  constructor(host: DataTableElement<TData>) {
    this.#host = host;
    host.addController(this);
  }

  public hostConnected(): void {}

  public hostUpdated(): void {
    this.#host.shadowRoot?.querySelectorAll(DATA_ROW_SELECTOR).forEach(rowElement => {
      rowElement.classList.toggle(DEFAULT_ACTION_CLASS, this.#host.allowRowClick && !!findDefaultAction(rowElement));
    });
  }
}
