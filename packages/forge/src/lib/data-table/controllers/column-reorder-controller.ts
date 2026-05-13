import type { Column } from '@tanstack/lit-table';
import { ReactiveController } from 'lit';
import type { DataTableElement } from '../data-table.js';

export interface ColumnReorderControllerOptions {
  selectColumnId?: string;
  onColumnOrderChange: (newColumnOrder: string[]) => void;
}

export class ColumnReorderController<TData> implements ReactiveController {
  public movingColumn: string | null = null;
  public targetColumn: string | null = null;

  constructor(
    private _host: DataTableElement<TData>,
    private _options: ColumnReorderControllerOptions
  ) {
    this._host.addController(this);
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {}

  public onDragStart(evt: DragEvent, column: Column<TData>): void {
    this.movingColumn = column.id;
    this.targetColumn = null;

    if (evt.dataTransfer) {
      evt.dataTransfer.effectAllowed = 'move';
    }

    const thEl = (evt.target as HTMLElement).closest('th');
    if (thEl) {
      const { height } = thEl.getBoundingClientRect();
      evt.dataTransfer?.setDragImage(thEl, 0, height / 2);
    }
    this._host.requestUpdate();
  }

  public onDragOver(evt: DragEvent, column: Column<TData>): void {
    evt.preventDefault();
    this.targetColumn = column.id;
    this._host.requestUpdate();
  }

  public onDrop(_evt: DragEvent, column: Column<TData>): void {
    const movingColumnId = this.movingColumn;
    const targetColumnId = column.id;

    this.movingColumn = null;
    this.targetColumn = null;

    this._updateColumnOrder(movingColumnId, targetColumnId);
    this._host.requestUpdate();
  }

  public onDragEnd(_evt: DragEvent): void {
    this.movingColumn = null;
    this.targetColumn = null;
    this._host.requestUpdate();
  }

  private _updateColumnOrder(movingColumnId: string | null, targetColumnId: string | null): void {
    if (!movingColumnId || !targetColumnId || movingColumnId === targetColumnId) {
      return;
    }

    const newColumnOrder = [...this._host.columnOrder];
    const movingColumnIndex = newColumnOrder.indexOf(movingColumnId);
    const targetColumnIndex = newColumnOrder.indexOf(targetColumnId);

    newColumnOrder.splice(movingColumnIndex, 1);
    newColumnOrder.splice(targetColumnIndex, 0, movingColumnId);

    if (this._host.rowSelection !== 'off') {
      // Always include the row selection column at the beginning of the column order
      this.ensureSelectColumnOrder(newColumnOrder);
    }

    this._options.onColumnOrderChange(newColumnOrder);
  }

  public ensureSelectColumnOrder(newColumnOrder: string[]): void {
    if (this._options.selectColumnId === undefined) {
      return;
    }

    const rowSelectionIndex = newColumnOrder.indexOf(this._options.selectColumnId);
    if (rowSelectionIndex > -1) {
      newColumnOrder.splice(rowSelectionIndex, 1);
      newColumnOrder.unshift(this._options.selectColumnId);
    } else {
      newColumnOrder.unshift(this._options.selectColumnId);
    }
  }
}
