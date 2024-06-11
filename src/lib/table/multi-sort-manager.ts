import { ColorPickerAdapter } from '../color-picker';
import { ISortedItem, ISortedItemUpdate, SortDirection } from './types';

export class MultiSortManager {
  private _sortedColumns: ISortedItem[] = [];

  public get sortedColumns(): ISortedItem[] {
    return [...this._sortedColumns.map(c => ({ ...c }))];
  }

  public addSortColumn(column: ISortedItem): void {
    this._sortedColumns.push({ ...column });
    this._updateSortNumbers();
  }

  public updateSortColumn(column: ISortedItemUpdate): void {
    const col = this._sortedColumns.find(c => c.columnIndex === column.columnIndex);
    if (col) {
      switch (col.direction) {
        case SortDirection.Ascending:
          this.removeSortColumn(column);
          break;
        case SortDirection.Descending:
          col.direction = SortDirection.Ascending;
          break;
        case SortDirection.Unset:
          col.direction = SortDirection.Descending;
          break;
      }
    }
  }

  public setSortColumns(columns: ISortedItem[]): void {
    this._sortedColumns = [...columns.map(c => ({ ...c }))];
  }

  public removeSortColumn(columnOrIndex: ISortedItem | number): void {
    if (typeof columnOrIndex === 'number') {
      this._sortedColumns.splice(columnOrIndex, 1);
    } else {
      this._sortedColumns.splice(this._sortedColumns.indexOf(columnOrIndex), 1);
    }

    this._updateSortNumbers();
  }

  public isSortColumn(columnOrIndex: ISortedItem | number): boolean {
    if (typeof columnOrIndex === 'number') {
      return this._sortedColumns.some(c => c.columnIndex === columnOrIndex);
    } else {
      return this._sortedColumns.includes(columnOrIndex);
    }
  }

  public clearMultiSort(): void {
    this._sortedColumns = [];
  }

  public getSortColumn(columnIndex: number): ISortedItem | undefined {
    return this._sortedColumns.find(c => c.columnIndex === columnIndex);
  }

  private _updateSortNumbers(): void {
    // only do a real sort if every sortNumber is actually a number
    if (this._sortedColumns.every(c => typeof c.sortOrder === 'number')) {
      this._sortedColumns.sort((col1, col2) => (col1.sortOrder as number) - (col2.sortOrder as number));
    }

    this._sortedColumns.forEach((column, index) => (column.sortOrder = index + 1));
  }
}
