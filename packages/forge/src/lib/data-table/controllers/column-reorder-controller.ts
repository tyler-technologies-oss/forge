import type { Column } from '@tanstack/lit-table';
import { ReactiveController } from 'lit';
import type { ColumnDef, DataTableElement } from '../data-table.js';
import { ColumnHierarchyHelper } from './column-hierarchy-helper.js';

export interface ColumnReorderControllerOptions<TData> {
  selectColumnId?: string;
  onColumnOrderChange: (newColumnOrder: string[]) => void;
  resolveColumnId: (column: ColumnDef<TData>, indexPath: number | number[]) => string;
}

export class ColumnReorderController<TData> implements ReactiveController {
  public movingColumn: string | null = null;
  public targetColumn: string | null = null;
  public dropSide: 'before' | 'after' | null = null;
  private _dragGhostElement: HTMLElement | null = null;
  private _dropIndicator: HTMLElement | null = null;
  private _childDropIndicator: HTMLElement | null = null;
  private _draggingHeaderElement: HTMLElement | null = null;
  private _hierarchyHelper: ColumnHierarchyHelper<TData>;

  constructor(
    private _host: DataTableElement<TData>,
    private _options: ColumnReorderControllerOptions<TData>
  ) {
    this._host.addController(this);
    this._hierarchyHelper = new ColumnHierarchyHelper(
      () => this._host.columns,
      this._options.resolveColumnId,
      () => this._host.columnOrder
    );
  }

  public hostConnected(): void {}

  public hostDisconnected(): void {
    this._cleanup();
  }

  public onDragStart(evt: DragEvent, column: Column<TData>): void {
    this.movingColumn = column.id;
    this.targetColumn = null;
    this.dropSide = null;

    if (evt.dataTransfer) {
      evt.dataTransfer.effectAllowed = 'move';
    }

    const thEl = (evt.target as HTMLElement).closest('th');
    if (thEl) {
      this._draggingHeaderElement = thEl;
      thEl.classList.add('column-dragging');

      const ghostElement = this._createDragGhost(column);
      this._dragGhostElement = ghostElement;
      document.body.appendChild(ghostElement);

      const innerGhost = ghostElement.firstElementChild as HTMLElement;
      if (innerGhost) {
        evt.dataTransfer?.setDragImage(ghostElement, innerGhost.offsetWidth / 2 + 20, innerGhost.offsetHeight / 2 + 20);
      }

      setTimeout(() => {
        if (this._dragGhostElement && document.body.contains(this._dragGhostElement)) {
          document.body.removeChild(this._dragGhostElement);
          this._dragGhostElement = null;
        }
      });
    }
    this._host.requestUpdate();
  }

  public onDragOver(evt: DragEvent, column: Column<TData>): void {
    evt.preventDefault();

    if (!this.movingColumn || !this.canDropOnTarget(column.id)) {
      this._removeDropIndicator();
      this.targetColumn = null;
      this.dropSide = null;
      return;
    }

    const dropTarget = this._resolveDropTarget(evt, column);
    if (!dropTarget) {
      this._removeDropIndicator();
      return;
    }

    this.targetColumn = column.id;
    this.dropSide = dropTarget.dropSide;
    this._updateDropIndicator(dropTarget.hoveredThEl, dropTarget.dropSide, dropTarget.indicatorColumnId, dropTarget.indicatorSide);
    this._host.requestUpdate();
  }

  public onDrop(_evt: DragEvent, column: Column<TData>): void {
    const movingColumnId = this.movingColumn;
    if (!movingColumnId) {
      return;
    }

    let targetColumnId = column.id;
    const dropSide = this.dropSide;

    const movingParent = this._hierarchyHelper.getColumnParent(movingColumnId);
    const targetParent = this._hierarchyHelper.getColumnParent(column.id);

    if (targetParent !== undefined && movingParent !== targetParent) {
      targetColumnId = targetParent;
    }

    this._cleanup();
    this._updateColumnOrder(movingColumnId, targetColumnId, dropSide);
    this._host.requestUpdate();
  }

  public onDragEnd(_evt: DragEvent): void {
    this._cleanup();
    this._host.requestUpdate();
  }

  private _updateColumnOrder(movingColumnId: string | null, targetColumnId: string | null, dropSide: 'before' | 'after' | null): void {
    if (!movingColumnId || !targetColumnId || !dropSide || movingColumnId === targetColumnId) {
      return;
    }

    const movingParent = this._hierarchyHelper.getColumnParent(movingColumnId);
    const targetParent = this._hierarchyHelper.getColumnParent(targetColumnId);

    if (movingParent !== targetParent) {
      return;
    }

    const newColumnOrder = [...this._host.columnOrder];
    const columnsToMove = this._hierarchyHelper.getColumnAndDescendants(movingColumnId);
    const targetAndDescendants = this._hierarchyHelper.getColumnAndDescendants(targetColumnId);

    const calculatedIndex = this._calculateInsertPosition(newColumnOrder, columnsToMove, targetAndDescendants, dropSide);
    if (calculatedIndex === null) {
      return;
    }

    let insertIndex = calculatedIndex;

    const currentIndex = newColumnOrder.indexOf(movingColumnId);
    if (currentIndex === insertIndex || (currentIndex < insertIndex && currentIndex === insertIndex - columnsToMove.length)) {
      return;
    }

    columnsToMove.forEach(colId => {
      const index = newColumnOrder.indexOf(colId);
      if (index > -1) {
        if (index < insertIndex) {
          insertIndex--;
        }
        newColumnOrder.splice(index, 1);
      }
    });

    if (movingParent !== undefined) {
      insertIndex = this._constrainInsertIndexToParent(newColumnOrder, insertIndex, movingParent, columnsToMove);
    }

    newColumnOrder.splice(insertIndex, 0, ...columnsToMove);

    if (this._host.rowSelection !== 'off') {
      this.ensureSelectColumnOrder(newColumnOrder);
    }

    this._options.onColumnOrderChange(newColumnOrder);
  }

  private _resolveDropTarget(
    evt: DragEvent,
    column: Column<TData>
  ): { hoveredThEl: HTMLElement; dropSide: 'before' | 'after'; indicatorColumnId: string; indicatorSide: 'before' | 'after' } | null {
    if (!this.movingColumn) {
      return null;
    }

    const thEl = evt.currentTarget as HTMLElement;
    const rect = thEl.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    const dropSide = evt.clientX < midpoint ? 'before' : 'after';

    const movingIsParent = this._hierarchyHelper.isParentColumn(this.movingColumn);
    const movingParent = this._hierarchyHelper.getColumnParent(this.movingColumn);
    const targetParent = this._hierarchyHelper.getColumnParent(column.id);

    if (!movingIsParent && movingParent !== undefined && movingParent === targetParent) {
      return { hoveredThEl: thEl, dropSide, indicatorColumnId: column.id, indicatorSide: dropSide };
    }

    let parentColumnId: string;
    let parentThEl: HTMLElement | null;

    if (targetParent !== undefined) {
      parentColumnId = targetParent;
      parentThEl = this._host.shadowRoot?.querySelector(`[data-column-id="${parentColumnId}"]`) as HTMLElement | null;
    } else {
      const targetIsParent = this._hierarchyHelper.isParentColumn(column.id);
      if (targetIsParent) {
        parentColumnId = column.id;
        parentThEl = thEl;
      } else {
        return { hoveredThEl: thEl, dropSide, indicatorColumnId: column.id, indicatorSide: dropSide };
      }
    }

    if (!parentThEl) {
      return null;
    }

    const parentRect = parentThEl.getBoundingClientRect();
    const parentMidpoint = parentRect.left + parentRect.width / 2;
    const parentDropSide = evt.clientX < parentMidpoint ? 'before' : 'after';

    const { firstChild, lastChild } = this._hierarchyHelper.getFirstAndLastChildIds(parentColumnId);
    if (!firstChild || !lastChild) {
      return null;
    }

    const childColumnId = parentDropSide === 'before' ? firstChild : lastChild;
    return { hoveredThEl: parentThEl, dropSide: parentDropSide, indicatorColumnId: childColumnId, indicatorSide: parentDropSide };
  }

  private _calculateInsertPosition(
    columnOrder: string[],
    columnsToMove: string[],
    targetAndDescendants: string[],
    dropSide: 'before' | 'after'
  ): number | null {
    const firstTargetId = targetAndDescendants[0];
    const lastTargetId = targetAndDescendants[targetAndDescendants.length - 1];

    let insertBeforeId: string | null = null;
    if (dropSide === 'before') {
      insertBeforeId = firstTargetId;
    } else {
      const lastTargetIndex = columnOrder.indexOf(lastTargetId);
      insertBeforeId = lastTargetIndex < columnOrder.length - 1 ? columnOrder[lastTargetIndex + 1] : null;
    }

    if (columnsToMove.includes(insertBeforeId ?? '')) {
      return null;
    }

    if (insertBeforeId === null) {
      return columnOrder.length;
    }

    const insertIndex = columnOrder.indexOf(insertBeforeId);
    return insertIndex === -1 ? null : insertIndex;
  }

  private _constrainInsertIndexToParent(columnOrder: string[], insertIndex: number, parentId: string, columnsToMove: string[]): number {
    const parentIndex = columnOrder.indexOf(parentId);
    if (parentIndex === -1) {
      return insertIndex;
    }

    const parentAndDescendants = this._hierarchyHelper.getColumnAndDescendants(parentId);
    const parentChildren = parentAndDescendants.slice(1);

    if (parentChildren.length === 0) {
      return insertIndex;
    }

    const minIndex = parentIndex + 1;
    const maxIndex = parentIndex + parentChildren.length;

    if (insertIndex < minIndex) {
      return minIndex;
    }
    if (insertIndex > maxIndex) {
      return maxIndex;
    }

    return insertIndex;
  }

  public canDropOnTarget(targetColumnId: string): boolean {
    if (!this.movingColumn || !targetColumnId || this.movingColumn === targetColumnId) {
      return false;
    }

    const movingDescendants = this._hierarchyHelper.getColumnAndDescendants(this.movingColumn);
    if (movingDescendants.includes(targetColumnId)) {
      return false;
    }

    const movingParent = this._hierarchyHelper.getColumnParent(this.movingColumn);
    const targetParent = this._hierarchyHelper.getColumnParent(targetColumnId);

    if (movingParent === targetParent) {
      return true;
    }

    if (targetParent !== undefined) {
      const targetGrandParent = this._hierarchyHelper.getColumnParent(targetParent);
      if (movingParent === targetGrandParent) {
        return true;
      }
    }

    return false;
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

  private _createDragGhost(column: Column<TData>): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '-9999px';
    wrapper.style.left = '-9999px';
    wrapper.style.pointerEvents = 'none';
    wrapper.style.zIndex = '9999';
    wrapper.style.padding = '20px';

    const ghost = document.createElement('div');
    ghost.className = 'forge-data-table-drag-ghost';

    const icon = document.createElement('span');
    icon.className = 'drag-ghost-icon';
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
    </svg>`;
    icon.style.marginRight = '8px';
    icon.style.display = 'inline-flex';
    icon.style.alignItems = 'center';
    icon.style.width = '16px';
    icon.style.height = '16px';

    const header = column.columnDef.header;
    const headerText = typeof header === 'string' || typeof header === 'number' ? String(header) : column.id;

    const textSpan = document.createElement('span');
    textSpan.textContent = headerText;

    ghost.appendChild(icon);
    ghost.appendChild(textSpan);

    ghost.style.display = 'inline-flex';
    ghost.style.alignItems = 'center';
    ghost.style.padding = '8px 12px';
    ghost.style.borderRadius = 'var(--forge-shape-large, 8px)';
    ghost.style.backgroundColor = 'var(--forge-theme-surface-bright, white)';
    ghost.style.border = '1px solid var(--forge-theme-outline, rgba(0, 0, 0, 0.38))';
    ghost.style.color = 'var(--forge-theme-on-surface, black)';
    ghost.style.fontSize = '14px';
    ghost.style.fontFamily = 'Roboto, sans-serif';
    ghost.style.whiteSpace = 'nowrap';
    ghost.style.boxShadow = 'var(--forge-elevation-1)';

    wrapper.appendChild(ghost);
    return wrapper;
  }

  private _createDropIndicatorElement(): HTMLElement {
    const indicator = document.createElement('div');
    indicator.className = 'forge-data-table-drop-indicator';
    indicator.style.position = 'absolute';
    indicator.style.width = '3px';
    indicator.style.pointerEvents = 'none';
    indicator.style.zIndex = '10';
    return indicator;
  }

  private _updateDropIndicator(hoveredThEl: HTMLElement, dropSide: 'before' | 'after', indicatorColumnId: string, indicatorSide: 'before' | 'after'): void {
    if (!this._dropIndicator) {
      this._dropIndicator = this._createDropIndicatorElement();
    }

    if (!this._childDropIndicator) {
      this._childDropIndicator = this._createDropIndicatorElement();
    }

    this._positionIndicator(this._dropIndicator, hoveredThEl, dropSide);

    const indicatorTargetEl = this._host.shadowRoot?.querySelector(`[data-column-id="${indicatorColumnId}"]`) as HTMLElement | null;

    if (indicatorTargetEl && indicatorTargetEl !== hoveredThEl) {
      this._positionIndicator(this._childDropIndicator, indicatorTargetEl, indicatorSide);
    } else if (indicatorTargetEl === hoveredThEl) {
      const allColumnCells = this._host.shadowRoot?.querySelectorAll(`[data-column-id="${indicatorColumnId}"]`) as NodeListOf<HTMLElement>;
      if (allColumnCells.length > 1) {
        const otherCell = Array.from(allColumnCells).find(cell => cell !== hoveredThEl);
        if (otherCell) {
          this._positionIndicator(this._childDropIndicator, otherCell, indicatorSide);
        } else {
          this._removeChildDropIndicator();
        }
      } else {
        this._removeChildDropIndicator();
      }
    } else {
      this._removeChildDropIndicator();
    }
  }

  private _positionIndicator(indicator: HTMLElement, thEl: HTMLElement, side: 'before' | 'after'): void {
    const rect = thEl.getBoundingClientRect();
    const tableContainer = this._host.shadowRoot?.querySelector('.table-container') as HTMLElement;

    if (!tableContainer) {
      return;
    }

    const containerRect = tableContainer.getBoundingClientRect();
    const scrollTop = tableContainer.scrollTop;
    const scrollLeft = tableContainer.scrollLeft;

    const topPos = rect.top - containerRect.top + scrollTop;
    const leftPos = side === 'before' ? rect.left - containerRect.left + scrollLeft : rect.right - containerRect.left + scrollLeft - 3;

    indicator.style.top = `${topPos}px`;
    indicator.style.left = `${leftPos}px`;
    indicator.style.height = `${rect.height}px`;

    if (!indicator.parentElement) {
      tableContainer.appendChild(indicator);
    }
  }

  private _removeDropIndicator(): void {
    this._dropIndicator?.parentElement?.removeChild(this._dropIndicator);
    this._dropIndicator = null;
    this._removeChildDropIndicator();
  }

  private _removeChildDropIndicator(): void {
    this._childDropIndicator?.parentElement?.removeChild(this._childDropIndicator);
    this._childDropIndicator = null;
  }

  private _cleanup(): void {
    this.movingColumn = null;
    this.targetColumn = null;
    this.dropSide = null;

    if (this._draggingHeaderElement) {
      this._draggingHeaderElement.classList.remove('column-dragging');
      this._draggingHeaderElement = null;
    }

    if (this._dragGhostElement && document.body.contains(this._dragGhostElement)) {
      document.body.removeChild(this._dragGhostElement);
      this._dragGhostElement = null;
    }

    this._removeDropIndicator();
  }
}
