import { ITreeItemComponent } from './tree-item/tree-item';
import { setIndeterminate, setSelected, TREE_ITEM_CONSTANTS } from './tree-item/tree-item-constants';
import { ITreeComponent } from './tree/tree';
import { ITreeItemSnapshot, TREE_CONSTANTS } from './tree/tree-constants';

/**
 * Checks if the given element is a tree component.
 *
 * @param el - The element to check.
 * @returns True if the element is a tree component, false otherwise.
 */
export function isTree(el: Element): el is ITreeComponent {
  return el.tagName.toLowerCase() === TREE_CONSTANTS.elementName;
}
/**
 * Checks if an element is a tree item component.
 *
 * @param el - The element to check.
 * @returns True if the element is a tree item component, false otherwise.
 */
export function isTreeItem(el: Element): el is ITreeItemComponent {
  return el.tagName.toLowerCase() === TREE_ITEM_CONSTANTS.elementName;
}

/**
 * Checks if the given element is a root node in the tree.
 *
 * @param el - The tree item component to check.
 * @returns `true` if the element is a root node, `false` otherwise.
 */
export function isRootNode(el: ITreeItemComponent): boolean {
  return !el.parentElement || isTree(el.parentElement);
}

/**
 * Returns the parent tree component of the given tree item component.
 *
 * @param el - The tree item component.
 * @returns The parent tree component or null if not found.
 */
export function getParentTree(el: ITreeItemComponent): ITreeComponent | null {
  return el.closest(TREE_CONSTANTS.elementName);
}

/**
 * Retrieves the parent item of a given tree item component.
 *
 * @param el - The tree item component for which to find the parent item.
 * @returns The parent item of the given tree item component, or `null` if the parent item is not found.
 */
export function getParentItem(el: ITreeItemComponent): ITreeItemComponent | null {
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
export function getChildItems(el: ITreeComponent | ITreeItemComponent, flatten = false): ITreeItemComponent[] {
  if (!flatten) {
    return Array.from(el.children).filter(child => isTreeItem(child));
  }
  return Array.from(el.querySelectorAll<ITreeItemComponent>(TREE_ITEM_CONSTANTS.elementName));
}

/**
 * Returns the first child item of a tree component or tree item component.
 *
 * @param el - The tree component or tree item component.
 * @returns The first child item if found, or `null` if no child item exists.
 */
export function getFirstChildItem(el: ITreeComponent | ITreeItemComponent): ITreeItemComponent | null {
  return Array.from(el.children).find(child => isTreeItem(child)) ?? null;
}

/**
 * Returns the last child item of a tree component or tree item component.
 *
 * @param el - The tree component or tree item component.
 * @returns The last child item, or `null` if there are no child items.
 */
export function getLastChildItem(el: ITreeComponent | ITreeItemComponent): ITreeItemComponent | null {
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
export function getSiblingItems(el: ITreeItemComponent, includeSelf = false): ITreeItemComponent[] {
  const parent = getParentItem(el) ?? getParentTree(el);
  return parent ? getChildItems(parent).filter(item => includeSelf || item !== el) : [];
}

/**
 * Retrieves the next tree item component in the tree hierarchy.
 *
 * @param el - The current tree item component.
 * @returns The next tree item component, or `null` if there is no next item.
 */
export function getNextItem(el: ITreeItemComponent, includeChildren = true): ITreeItemComponent | null {
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
    return nextElement as ITreeItemComponent;
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
export function getPreviousItem(el: ITreeItemComponent): ITreeItemComponent | null {
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
 * Collapses the specified tree item.
 *
 * @param el - The tree item component to collapse.
 * @param flatten - Optional. Specifies whether to also collapse all child items. Default is false.
 */
export function collapseItem(el: ITreeItemComponent, flatten = false): void {
  el.open = false;
  if (flatten) {
    getChildItems(el, true).forEach(item => (item.open = false));
  }
}

/**
 * Searches for an item in a tree based on a query string, starting from the position of a given item and wrapping around the
 * beginning of the tree if necessary.
 *
 * @param from The starting item to search from.
 * @param query The query string to search for.
 * @returns The matching item if found, otherwise null.
 */
export function searchItems(from: ITreeItemComponent, query: string): ITreeItemComponent | null {
  // Check if the item matches the query
  const matchesQuery = (item: ITreeItemComponent): boolean => {
    return item.textContent?.trim().toLowerCase().startsWith(query) ?? false;
  };

  // Recursively search the children of an item
  const searchChildren = (item: ITreeItemComponent): ITreeItemComponent | null => {
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
  const searchSiblings = (item: ITreeItemComponent, skipFirst = true): ITreeItemComponent | null => {
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
  let result: ITreeItemComponent | null = null;
  let current: ITreeItemComponent | null = from;
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

/**
 * Returns the level of the given tree item component.
 * The level represents the depth of the item in the tree hierarchy.
 *
 * @param el - The tree item component.
 * @returns The level of the tree item component.
 */
export function getLevel(el: ITreeItemComponent): number {
  let level = 0;
  let parent = getParentItem(el);
  while (parent) {
    level++;
    parent = getParentItem(parent);
  }
  return level;
}

/**
 * Checks if an item in a tree is indeterminate.
 *
 * @param el - The tree item component to check.
 * @returns True if any child items are indeterminate or if the selected states of the child items are not all the same, false otherwise.
 */
export function isIndeterminate(el: ITreeItemComponent): boolean {
  return getChildItems(el).some((child, _, children) => child.indeterminate || child.selected !== children[0].selected);
}

/**
 * Adds an item to a snapshot array.
 *
 * @param item - The item to add to the snapshot.
 * @param snapshot - The snapshot array to add the item to.
 * @param options - An optional set of properties to override.
 */
export function addToSnapshot(
  item: ITreeItemComponent,
  snapshot: ITreeItemSnapshot[],
  options?: { indeterminate?: boolean; open?: boolean; selected?: boolean }
): void {
  const exisitingState = snapshot.find(state => state.el === item);
  if (exisitingState) {
    options = options ?? { indeterminate: true, open: true, selected: true };
    exisitingState.indeterminate = options.indeterminate ? item.indeterminate : exisitingState.indeterminate;
    exisitingState.open = options.open ? item.open : exisitingState.open;
    exisitingState.selected = options.selected ? item.selected : exisitingState.selected;
    return;
  }
  snapshot.push({
    el: item,
    indeterminate: item.indeterminate,
    open: item.open,
    selected: item.selected
  });
}

/**
 * Restores the state of tree items based on a given snapshot.
 *
 * @param snapshot - An array of tree item snapshots.
 */
export function restoreSnapshot(snapshot: ITreeItemSnapshot[]): void {
  snapshot.forEach(state => {
    state.el[setIndeterminate](state.indeterminate);
    state.el[setSelected](state.selected);
    state.el.open = state.open;
  });
}
