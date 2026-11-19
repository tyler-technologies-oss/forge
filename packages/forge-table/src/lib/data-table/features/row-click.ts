import { SELECT_COLUMN_ID } from '../constants.js';

export function dispatchRowClick<TData>(host: HTMLElement, evt: MouseEvent, index: number, data: TData): void {
  const isProtectedCell = evt
    .composedPath()
    .filter(el => (el as Node).nodeType === Node.ELEMENT_NODE)
    .some(el => (el as Element).matches(`:where([id="${SELECT_COLUMN_ID}"],[data-forge-stop-row-click-propagation])`));
  if (isProtectedCell) {
    return;
  }

  host.dispatchEvent(new CustomEvent('forge-data-table-row-click', { detail: { data, index }, bubbles: true, composed: true }));
}
