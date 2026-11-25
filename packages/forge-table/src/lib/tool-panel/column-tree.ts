import { hasChildColumns, resolveColumnId } from '../data-table/columns/column-utils.js';
import type { ColumnDef, Row } from '../data-table/types.js';

export interface ColumnTreeNode {
  id: string;
  label: string;
  hideable: boolean;
  children: ColumnTreeNode[];
}

export function buildColumnTree<TData extends Row>(
  columns: ColumnDef<TData>[],
  columnOrder: readonly string[],
  parentIndices: number[] = []
): ColumnTreeNode[] {
  const nodes = columns.flatMap((column, index): ColumnTreeNode[] => {
    const indexPath = [...parentIndices, index];
    const id = resolveColumnId(column, indexPath);
    const children = hasChildColumns(column) ? buildColumnTree(column.columns as ColumnDef<TData>[], columnOrder, indexPath) : [];
    const hasHeader = typeof column.header === 'string' && column.header.length > 0;

    if (children.length && !hasHeader) {
      return children;
    }
    return [{ id, label: hasHeader ? (column.header as string) : id, hideable: column.hideable !== false, children }];
  });

  return columnOrder.length ? sortByOrder(nodes, columnOrder) : nodes;
}

export function getColumnTreeIds(nodes: readonly ColumnTreeNode[]): string[] {
  return nodes.flatMap(node => [node.id, ...getColumnTreeIds(node.children)]);
}

export function getLeafNodes(node: ColumnTreeNode): ColumnTreeNode[] {
  return node.children.length ? node.children.flatMap(getLeafNodes) : [node];
}

export function findColumnTreeNode(nodes: readonly ColumnTreeNode[], id: string): ColumnTreeNode | undefined {
  for (const node of nodes) {
    const found = node.id === id ? node : findColumnTreeNode(node.children, id);
    if (found) {
      return found;
    }
  }
  return undefined;
}

/**
 * Moves a node to an index among its siblings, which are the root nodes when `parentId` is `undefined`.
 * Returns the same nodes when the parent is not found.
 */
export function moveColumnTreeNode(nodes: readonly ColumnTreeNode[], parentId: string | undefined, id: string, index: number): ColumnTreeNode[] {
  if (parentId === undefined) {
    return reinsert(nodes, id, index);
  }
  return nodes.map(node => ({
    ...node,
    children: node.id === parentId ? reinsert(node.children, id, index) : moveColumnTreeNode(node.children, parentId, id, index)
  }));
}

function reinsert(nodes: readonly ColumnTreeNode[], id: string, index: number): ColumnTreeNode[] {
  const moving = nodes.find(node => node.id === id);
  if (!moving) {
    return [...nodes];
  }
  const others = nodes.filter(node => node !== moving);
  others.splice(index, 0, moving);
  return others;
}

function sortByOrder(nodes: ColumnTreeNode[], columnOrder: readonly string[]): ColumnTreeNode[] {
  const rank = (node: ColumnTreeNode): number => {
    const position = columnOrder.indexOf(node.id);
    return position < 0 ? Number.MAX_SAFE_INTEGER : position;
  };
  return [...nodes].sort((a, b) => rank(a) - rank(b));
}
