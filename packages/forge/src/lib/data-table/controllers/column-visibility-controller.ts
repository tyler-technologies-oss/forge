import type { VisibilityState } from '@tanstack/lit-table';
import type { ReactiveController } from 'lit';
import type { ColumnDef, DataTableElement } from '../data-table.js';

export interface ColumnVisibilityControllerOptions<TData> {
  selectColumnId: string;
  resolveColumnId(column: ColumnDef<TData>, index: number): string;
  onVisibilityChange(nextState: VisibilityState): void;
}

export class ColumnVisibilityController<TData> implements ReactiveController {
  constructor(
    private _host: DataTableElement<TData>,
    private _options: ColumnVisibilityControllerOptions<TData>
  ) {
    this._host.addController(this);
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {}

  public hideColumn(columnId: string): void {
    if (!this._canColumnBeHidden(columnId)) {
      return;
    }

    if (this._host.columnVisibility[columnId] === false) {
      return;
    }

    const nextState: VisibilityState = {
      ...this._host.columnVisibility,
      [columnId]: false
    };

    this.setVisibilityState(nextState);
  }

  public showColumn(columnId: string): void {
    if (!columnId) {
      return;
    }

    const currentVisibility = this._host.columnVisibility[columnId];
    if (currentVisibility === undefined || currentVisibility === true) {
      return;
    }

    const nextState: VisibilityState = {
      ...this._host.columnVisibility,
      [columnId]: true
    };

    this.setVisibilityState(nextState);
  }

  public toggleColumnVisibility(columnId: string): void {
    if (!columnId) {
      return;
    }

    if (!this._canColumnBeHidden(columnId)) {
      return;
    }

    const currentVisibility = this._host.columnVisibility[columnId] ?? true;
    const nextState: VisibilityState = {
      ...this._host.columnVisibility,
      [columnId]: !currentVisibility
    };

    this.setVisibilityState(nextState);
  }

  public deriveVisibilityState(): VisibilityState | null {
    const visibility: VisibilityState = { ...this._host.columnVisibility };
    const validIds = new Set<string>();
    let hasChanges = false;

    this._host.columns.forEach((column, index) => {
      const columnId = this._options.resolveColumnId(column, index);
      validIds.add(columnId);

      if (column.hideable === false) {
        if (visibility[columnId] !== true) {
          visibility[columnId] = true;
          hasChanges = true;
        }
        return;
      }

      if (column.hidden === true && visibility[columnId] !== false) {
        visibility[columnId] = false;
        hasChanges = true;
      }
    });

    Object.keys(visibility).forEach(key => {
      if (!validIds.has(key) && key !== this._options.selectColumnId) {
        delete visibility[key];
        hasChanges = true;
      }
    });

    return hasChanges ? visibility : null;
  }

  public setVisibilityState(nextState: VisibilityState, options?: { notifyHost?: boolean }): void {
    const notifyHost = options?.notifyHost ?? true;

    if (this._areVisibilityStatesEqual(this._host.columnVisibility, nextState)) {
      return;
    }

    this._host.columnVisibility = { ...nextState };

    if (notifyHost) {
      this._options.onVisibilityChange(nextState);
    }
  }

  private _canColumnBeHidden(columnId: string): boolean {
    if (!columnId || columnId === this._options.selectColumnId) {
      return false;
    }

    const column = this._findColumn(columnId);
    return column?.hideable ?? true;
  }

  private _findColumn(columnId: string): ColumnDef<TData> | undefined {
    return this._host.columns.find((column, index) => this._options.resolveColumnId(column, index) === columnId);
  }

  private _areVisibilityStatesEqual(a: VisibilityState, b: VisibilityState): boolean {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    return aKeys.every(key => Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key]);
  }
}
