import type { ColumnDef } from '../data-table.js';

export class ColumnHierarchyHelper<TData> {
  constructor(
    private getColumns: () => ColumnDef<TData>[],
    private resolveColumnId: (column: ColumnDef<TData>, indexPath: number | number[]) => string,
    private getColumnOrder?: () => string[]
  ) {}

  public findColumn(columnId: string): ColumnDef<TData> | undefined {
    return this._findColumnRecursive(this.getColumns(), columnId, []);
  }

  public getColumnParent(columnId: string): string | undefined {
    const result = this._findParentRecursive(this.getColumns(), columnId, [], undefined);
    return result === null ? undefined : result;
  }

  public getColumnAndDescendants(columnId: string): string[] {
    const column = this.findColumn(columnId);
    if (!column) {
      return [columnId];
    }

    const result = [columnId];
    if (this.hasChildren(column) && column.columns) {
      this.collectAllDescendantIds(column.columns, [], childId => {
        result.push(childId);
      });
    }
    return result;
  }

  public collectAllDescendantIds(columns: ColumnDef<TData>[], parentIndices: number[], callback: (id: string) => void): void {
    columns.forEach((column, index) => {
      const indexPath = [...parentIndices, index];
      const columnId = this.resolveColumnId(column, indexPath);
      callback(columnId);

      if (this.hasChildren(column) && column.columns) {
        this.collectAllDescendantIds(column.columns, indexPath, callback);
      }
    });
  }

  public isParentColumn(columnId: string): boolean {
    const column = this.findColumn(columnId);
    return this.hasChildren(column);
  }

  public getFirstAndLastChildIds(columnId: string): { firstChild: string | null; lastChild: string | null } {
    const column = this.findColumn(columnId);

    if (!column || !this.hasChildren(column)) {
      return { firstChild: null, lastChild: null };
    }

    const descendants = this.getColumnAndDescendants(columnId);
    const childIds = descendants.slice(1);

    if (childIds.length === 0) {
      return { firstChild: null, lastChild: null };
    }

    const columnOrder = this.getColumnOrder?.();
    if (!columnOrder) {
      return {
        firstChild: childIds[0] ?? null,
        lastChild: childIds[childIds.length - 1] ?? null
      };
    }

    const childIdsInOrder = columnOrder.filter(id => childIds.includes(id));

    return {
      firstChild: childIdsInOrder[0] ?? null,
      lastChild: childIdsInOrder[childIdsInOrder.length - 1] ?? null
    };
  }

  public hasChildren(column: ColumnDef<TData> | undefined): boolean {
    return Array.isArray(column?.columns) && column.columns.length > 0;
  }

  private _findColumnRecursive(columns: ColumnDef<TData>[], targetId: string, parentIndices: number[]): ColumnDef<TData> | undefined {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const indexPath = [...parentIndices, i];
      const columnId = this.resolveColumnId(column, indexPath);

      if (columnId === targetId) {
        return column;
      }

      if (this.hasChildren(column) && column.columns) {
        const found = this._findColumnRecursive(column.columns, targetId, indexPath);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  private _findParentRecursive(
    columns: ColumnDef<TData>[],
    targetId: string,
    parentIndices: number[],
    parentId: string | undefined
  ): string | undefined | null {
    for (let i = 0; i < columns.length; i++) {
      const column = columns[i];
      const indexPath = [...parentIndices, i];
      const columnId = this.resolveColumnId(column, indexPath);

      if (columnId === targetId) {
        return parentId;
      }

      if (this.hasChildren(column) && column.columns) {
        const found = this._findParentRecursive(column.columns, targetId, indexPath, columnId);
        if (found !== null) {
          return found;
        }
      }
    }
    return null;
  }
}
