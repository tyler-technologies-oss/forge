export interface RowMeta {
  name: string;
  nameId: string;
}

const rowMetaByRow = new WeakMap<object, RowMeta>();
let nextId = 0;

const createId = (prefix: string): string => `${prefix}-${nextId++}`;

/**
 * Stores the accessible name of a row, creating the element id that labels the row the first time the row is seen.
 */
export function setRowName(row: object, name: string): RowMeta {
  const meta = rowMetaByRow.get(row) ?? { name, nameId: createId('row-name') };
  meta.name = name;
  rowMetaByRow.set(row, meta);
  return meta;
}

export function getRowMeta(row: object): RowMeta | undefined {
  return rowMetaByRow.get(row);
}

/**
 * The id of the element that contains the text of a column header.
 */
export function getColumnHeaderTextId(columnId: string): string {
  return `column-header-text-${columnId}`;
}

/**
 * Builds an `aria-labelledby` value from the row name and the column header text, so a cell's content is named `{row name} {column header}`.
 *
 * Returns `undefined` when the row has no name, which is the case for rows rendered outside of a data table.
 */
export function getCellLabelledBy(cell: { row: object; column: { id: string; columnDef: { header?: unknown } } }): string | undefined {
  const meta = rowMetaByRow.get(cell.row);
  if (!meta) {
    return undefined;
  }
  const { header } = cell.column.columnDef;
  return typeof header === 'string' && header.length > 0 ? `${meta.nameId} ${getColumnHeaderTextId(cell.column.id)}` : meta.nameId;
}

/**
 * Names an element that has its own `aria-label` as `{label} {row name}`.
 *
 * Does nothing when the row has no name, which is the case for rows rendered outside of a data table.
 */
export function labelWithRowName(element: HTMLElement, row: object): void {
  const meta = rowMetaByRow.get(row);
  if (!meta) {
    return;
  }
  if (!element.id) {
    element.id = createId('row-label');
  }
  element.setAttribute('aria-labelledby', `${element.id} ${meta.nameId}`);
}
