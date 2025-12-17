import { TreeItemComponent } from './tree-item/tree-item';
import { TreeComponent } from './tree/tree';

export interface ITreeItemSnapshot {
  el: TreeItemComponent;
  indeterminate: boolean;
  open: boolean;
  selected: boolean;
}

/**
 * A symbol property to represent the indeterminate state of a tree item.
 */
export const indeterminate = Symbol('indeterminate');

//
// Identity
//

/**
 * Checks if the given element is a tree component.
 *
 * @param el - The element to check.
 * @returns True if the element is a tree component, false otherwise.
 */
export function isTree(el: Element): el is TreeComponent {
  return el.tagName.toLowerCase() === 'forge-tree';
}
/**
 * Checks if an element is a tree item component.
 *
 * @param el - The element to check.
 * @returns True if the element is a tree item component, false otherwise.
 */
export function isTreeItem(el: Element): el is TreeItemComponent {
  return el.tagName.toLowerCase() === 'forge-tree-item';
}

//
// Events
//

/**
 * Returns whether an event originates from within a tree item.
 *
 * @param evt An event dispatched from a tree item.
 * @returns Whether the event includes a tree item.
 */
export function getTreeItemFromEvent(evt: Event): TreeItemComponent | null {
  return (evt.target as HTMLElement).closest('forge-tree-item') as TreeItemComponent;
}

/**
 * Gets all tree item components in an event path.
 *
 * @param evt An event dispatched from a tree item.
 * @returns The dispatching tree item and all tree item ancestors.
 */
export function getTreeItemsInEventPath(evt: Event): TreeItemComponent[] {
  const path = evt.composedPath();
  return path.filter((el): el is TreeItemComponent => el instanceof HTMLElement && isTreeItem(el));
}

/**
 * Returns whether an event includes a tree item header.
 *
 * @param evt An event dispatched from a tree item.
 * @returns Whether the event includes a header element within a tree item.
 */
export function eventPathIncludesTreeItemHeader(evt: Event): boolean {
  const path = evt.composedPath();
  const treeItemIndex = path.findIndex((el): el is HTMLElement => el instanceof HTMLElement && isTreeItem(el));
  const headerIndex = path.findIndex((el): el is HTMLElement => el instanceof HTMLElement && el.matches('.header'));
  return treeItemIndex >= 0 && headerIndex >= 0 && headerIndex < treeItemIndex;
}

/**
 * Returns whether an event includes a tree item expand icon.
 *
 * @param evt An event dispatched from a tree item.
 * @returns Whether the event includes an expand icon element within a tree item.
 */
export function eventPathIncludesTreeItemExpandIcon(evt: Event): boolean {
  const path = evt.composedPath();
  const treeItemIndex = path.findIndex((el): el is HTMLElement => el instanceof HTMLElement && isTreeItem(el));
  const expandIconIndex = path.findIndex((el): el is HTMLElement => el instanceof HTMLElement && el.matches('.expand-icon'));
  return treeItemIndex >= 0 && expandIconIndex >= 0 && expandIconIndex < treeItemIndex;
}

/**
 * Gets the target tree item component from an event.
 *
 * @param evt An event dispatched from the target item.
 * @returns The tree item component or null if not found.
 */
export function getTreeItemTarget(evt: Event): TreeItemComponent | null {
  const target = evt.target as HTMLElement;
  return target.closest('forge-tree-item') as TreeItemComponent;
}

//
// DOM
//

/**
 * Returns the level of the given tree item component.
 * The level represents the depth of the item in the tree hierarchy.
 *
 * @param el - The tree item component.
 * @returns The level of the tree item component.
 */
export function getLevel(el: TreeItemComponent): number {
  let level = 0;
  let parent = getParentItem(el);
  while (parent) {
    level++;
    parent = getParentItem(parent);
  }
  return level;
}

/**
 * Returns the parent tree component of the given tree item component.
 *
 * @param el - The tree item component.
 * @returns The parent tree component or null if not found.
 */
export function getParentTree(el: TreeItemComponent): TreeComponent | null {
  return el.closest('forge-tree');
}

/**
 * Retrieves the parent item of a given tree item component.
 *
 * @param el - The tree item component for which to find the parent item.
 * @returns The parent item of the given tree item component, or `null` if the parent item is not found.
 */
export function getParentItem(el: TreeItemComponent): TreeItemComponent | null {
  if (!el.parentElement) {
    return null;
  }
  return isTreeItem(el.parentElement) ? el.parentElement : null;
}

/**
 * Retrieves the child items of a tree component or tree item component.
 *
 * @param el The tree component or tree item component.
 * @param flatten - If `true`, the function will return all child items recursively.
 * @returns An array of child tree item components.
 */
export function getChildItems(el: TreeComponent | TreeItemComponent, flatten = false): TreeItemComponent[] {
  if (!flatten) {
    return Array.from(el.children).filter(child => isTreeItem(child));
  }
  return Array.from(el.querySelectorAll<TreeItemComponent>('forge-tree-item'));
}

/**
 * Returns the first child item of a tree component or tree item component.
 *
 * @param el - The tree component or tree item component.
 * @returns The first child item if found, or `null` if no child item exists.
 */
export function getFirstChildItem(el: TreeComponent | TreeItemComponent): TreeItemComponent | null {
  return Array.from(el.children).find(child => isTreeItem(child)) ?? null;
}

/**
 * Returns the last child item of a tree component or tree item component.
 *
 * @param el - The tree component or tree item component.
 * @returns The last child item, or `null` if there are no child items.
 */
export function getLastChildItem(el: TreeComponent | TreeItemComponent): TreeItemComponent | null {
  // TODO: use `findLast()`
  const children = Array.from(el.children).filter(child => isTreeItem(child));
  return children[children.length - 1] ?? null;
}

/**
 * Retrieves the sibling items of a given tree item.
 *
 * @param el - The tree item for which to retrieve the sibling items.
 * @param includeSelf - Optional parameter to include the given tree item itself in the result.
 * @returns An array of sibling tree items.
 */
export function getSiblingItems(el: TreeItemComponent, includeSelf = false): TreeItemComponent[] {
  const parent = getParentItem(el) ?? getParentTree(el);
  return parent ? getChildItems(parent).filter(item => includeSelf || item !== el) : [];
}

/**
 * Retrieves the next tree item component in the tree hierarchy.
 *
 * @param el - The current tree item component.
 * @returns The next tree item component, or `null` if there is no next item.
 */
export function getNextItem(el: TreeItemComponent, includeChildren = true): TreeItemComponent | null {
  // If the item is open and has children, return the first child
  if (includeChildren && el.open && !!getFirstChildItem(el)) {
    return getFirstChildItem(el);
  }

  // Next search for the next tree item sibling
  let nextElement = el.nextElementSibling;
  while (nextElement && !isTreeItem(nextElement)) {
    nextElement = nextElement.nextElementSibling;
  }
  if (nextElement) {
    return nextElement as TreeItemComponent;
  }

  // Repeat the process on the parent item until the next item is found
  const parentItem = getParentItem(el);
  if (!parentItem) {
    return null;
  }
  return getNextItem(parentItem, false);
}

/**
 * Retrieves the previous sibling tree item component of the given element.
 * If there are no previous sibling items, it returns the parent item.
 *
 * @param el - The current tree item component.
 * @returns The previous sibling tree item component or the parent item if there are no previous siblings.
 */
export function getPreviousItem(el: TreeItemComponent): TreeItemComponent | null {
  // Get the previous sibling item
  let previousElement = el.previousElementSibling;
  while (previousElement && !isTreeItem(previousElement)) {
    previousElement = previousElement.previousElementSibling;
  }

  // There's no previous sibling, return the parent item or null
  if (!previousElement) {
    return getParentItem(el);
  }

  // If the previous sibling is closed or a leaf, return it
  if (!previousElement.open || previousElement.leaf) {
    return previousElement;
  }

  // If it's open, recursively check the last child item until we find a closed or leaf item
  let lastChild = getLastChildItem(previousElement);
  while (lastChild && lastChild.open) {
    lastChild = getLastChildItem(lastChild);
  }
  return lastChild;
}

/**
 * Searches for an item in a tree based on a query string, starting from the position of a given item and wrapping around the
 * beginning of the tree if necessary.
 *
 * @param from The starting item to search from.
 * @param query The query string to search for.
 * @returns The matching item if found, otherwise null.
 */
export function searchItems(from: TreeItemComponent, query: string): TreeItemComponent | null {
  // Check if the item matches the query
  const matchesQuery = (item: TreeItemComponent): boolean => item.textContent?.trim().toLowerCase().startsWith(query) ?? false;

  // Recursively search the children of an item
  const searchChildren = (item: TreeItemComponent): TreeItemComponent | null => {
    const children = getChildItems(item);
    for (const child of children) {
      if (matchesQuery(child)) {
        return child;
      }
      if (!child.open) {
        continue;
      }
      result = searchChildren(child);
      if (result) {
        return result;
      }
    }
    return null;
  };

  // Search the siblings of an item and their children
  const searchSiblings = (item: TreeItemComponent, skipFirst = true): TreeItemComponent | null => {
    const siblings = getSiblingItems(item, true);
    const startIndex = siblings.indexOf(item) + (skipFirst ? 1 : 0);
    for (let i = startIndex; i < siblings.length; i++) {
      if (matchesQuery(siblings[i])) {
        return siblings[i];
      }
      if (!siblings[i].open) {
        continue;
      }
      result = searchChildren(siblings[i]);
      if (result) {
        return result;
      }
    }
    return null;
  };

  query = query.toLowerCase();
  let result: TreeItemComponent | null = null;
  let current: TreeItemComponent | null = from;
  let didSearchStart = false;

  while (!result && current) {
    result = searchSiblings(current, didSearchStart);
    if (!result) {
      didSearchStart = true;
      current = getParentItem(current);
    }
  }
  if (result) {
    return result;
  }

  // All of the tree after the starting item has been searched, now start from the beginning
  // TODO: stop the search if it wraps around to the starting point
  const tree = getParentTree(from);
  if (!tree) {
    return null;
  }
  current = getFirstChildItem(tree);
  if (!current) {
    return null;
  }
  return searchSiblings(current, false);
}

//
// State
//

/**
 * Checks if an item in a tree is indeterminate.
 *
 * @param el - The tree item component to check.
 * @returns True if any child items are indeterminate or if the selected states of the child items are not all the same, false otherwise.
 */
export function isIndeterminate(el: TreeItemComponent): boolean {
  return getChildItems(el).some((child, _, children) => child.indeterminate || child.selected !== children[0].selected);
}

/**
 * Closes all descendant items of a tree or tree item component.
 * @param el The tree or tree item component to close the descendants of.
 */
export function closeDescendants(el: TreeComponent | TreeItemComponent): void {
  getChildItems(el, true).forEach(item => (item.open = false));
}
