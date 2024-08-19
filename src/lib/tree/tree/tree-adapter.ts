import { getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ITreeItemComponent, TREE_ITEM_CONSTANTS } from '../tree-item';
import { isTreeItem } from '../tree-utils';
import { ITreeComponent } from './tree';
import { TREE_CONSTANTS } from './tree-constants';

export interface ITreeAdapter extends IBaseAdapter {
  contains(el: HTMLElement): boolean;
  setFocusable(focusable: boolean): void;
  getTreeItemTarget(evt: Event): ITreeItemComponent | null;
  getTreeItemsInPath(evt: Event): ITreeItemComponent[];
  eventPathIncludesTreeItemHeader(evt: Event): boolean;
  eventPathIncludesOpenIcon(evt: Event): boolean;
  collapseChildren(skip?: ITreeItemComponent[]): void;
}

export class TreeAdapter extends BaseAdapter<ITreeComponent> implements ITreeAdapter {
  private _root: HTMLElement;

  constructor(component: ITreeComponent) {
    super(component);
    this._root = getShadowElement(this._component, TREE_CONSTANTS.selectors.ROOT);
  }

  public contains(el: HTMLElement): boolean {
    return this._component.contains(el);
  }

  public setFocusable(focusable: boolean): void {
    this._component.tabIndex = focusable ? 0 : -1;
  }

  /**
   * Gets the target tree item component from an event.
   *
   * @param evt An event dispatched from the target item.
   * @returns The tree item component or null if not found.
   */
  public getTreeItemTarget(evt: Event): ITreeItemComponent | null {
    const target = evt.target as HTMLElement;
    return target.closest(TREE_ITEM_CONSTANTS.elementName) as ITreeItemComponent;
  }

  /**
   * Gets all tree item components in an event path.
   *
   * @param evt An event dispatched from a tree item.
   * @returns The dispatching tree item and all tree item ancestors.
   */
  public getTreeItemsInPath(evt: Event): ITreeItemComponent[] {
    const path = evt.composedPath();
    return path.filter((el): el is ITreeItemComponent => el instanceof HTMLElement && isTreeItem(el));
  }

  /**
   * Returns whether an event includes a tree item header.
   *
   * @param evt An event dispatched from a tree item.
   * @returns Whether the event includes a header element within a tree item.
   */
  public eventPathIncludesTreeItemHeader(evt: Event): boolean {
    const path = evt.composedPath();
    const treeItemIndex = path.findIndex((el): el is HTMLElement => el instanceof HTMLElement && isTreeItem(el));
    const headerIndex = path.findIndex((el): el is HTMLElement => el instanceof HTMLElement && el.matches(TREE_ITEM_CONSTANTS.selectors.HEADER));
    return treeItemIndex >= 0 && headerIndex >= 0 && headerIndex < treeItemIndex;
  }

  /**
   * Checks whether an event includes an open icon.
   *
   * @param evt An event dispatched from a tree item.
   * @returns Whether the event includes an open icon.
   */
  public eventPathIncludesOpenIcon(evt: Event): boolean {
    const path = evt.composedPath();
    return path.some((el): el is HTMLElement => el instanceof HTMLElement && el.matches(TREE_CONSTANTS.selectors.EXPAND_ICON));
  }

  /**
   * Collapses all tree item components except for those in the skip list.
   *
   * @param skip An array of tree item components to keep open.
   */
  public collapseChildren(skip?: ITreeItemComponent[]): void {
    const openItems = this._component.querySelectorAll<ITreeItemComponent>(TREE_CONSTANTS.selectors.OPEN_ITEM);
    openItems.forEach(item => {
      if (skip && skip.includes(item)) {
        return;
      }
      item.open = false;
    });
  }
}
