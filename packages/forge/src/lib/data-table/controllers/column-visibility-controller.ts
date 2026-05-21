import type { VisibilityState } from '@tanstack/lit-table';
import type { ReactiveController } from 'lit';
import type { ColumnDef, DataTableElement } from '../data-table.js';
import { ColumnHierarchyHelper } from './column-hierarchy-helper.js';

export interface ColumnVisibilityControllerOptions<TData> {
  selectColumnId: string;
  resolveColumnId(column: ColumnDef<TData>, indexPath: number | number[]): string;
  onVisibilityChange(nextState: VisibilityState): void;
}

export class ColumnVisibilityController<TData> implements ReactiveController {
  private _hierarchyHelper: ColumnHierarchyHelper<TData>;

  constructor(
    private _host: DataTableElement<TData>,
    private _options: ColumnVisibilityControllerOptions<TData>
  ) {
    this._host.addController(this);
    this._hierarchyHelper = new ColumnHierarchyHelper(() => this._host.columns, this._options.resolveColumnId);
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

    const column = this._hierarchyHelper.findColumn(columnId);
    if (column && this._hierarchyHelper.hasChildren(column) && column.columns) {
      this._hierarchyHelper.collectAllDescendantIds(column.columns, [], childId => {
        nextState[childId] = false;
      });
    }

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

    this._collectColumnIds(this._host.columns, [], validIds, visibility, (id, shouldShow) => {
      if (visibility[id] !== shouldShow) {
        visibility[id] = shouldShow;
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

  private _collectColumnIds(
    columns: ColumnDef<TData>[],
    parentIndices: number[],
    validIds: Set<string>,
    visibility: VisibilityState,
    callback: (id: string, shouldShow: boolean) => void
  ): void {
    columns.forEach((column, index) => {
      const indexPath = [...parentIndices, index];
      const columnId = this._options.resolveColumnId(column, indexPath);
      validIds.add(columnId);

      if (column.hideable === false) {
        callback(columnId, true);
      } else if (column.hidden === true) {
        callback(columnId, false);
      }

      if (this._hierarchyHelper.hasChildren(column) && column.columns) {
        this._collectColumnIds(column.columns, indexPath, validIds, visibility, callback);
      }
    });
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

    const column = this._hierarchyHelper.findColumn(columnId);
    return column?.hideable ?? true;
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
