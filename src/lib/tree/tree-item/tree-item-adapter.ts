import { getShadowElement } from '@tylertech/forge-core';

import { IOpenIconComponent } from '@tylertech/forge/open-icon';
import { setDefaultAria } from '../../constants';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IIconComponent } from '../../icon';
import { getLevel } from '../tree-utils';
import { ITreeItemComponent } from './tree-item';
import { TREE_ITEM_CONSTANTS } from './tree-item-constants';

export interface ITreeItemAdapter extends IBaseAdapter {
  toggleRootClass(className: string, force?: boolean): void;
  addSlotChangeListener(listener: EventListener): void;
  getLevel(): number;
  setLevel(level: number): void;
  setCheckboxIcon(state: 'selected' | 'unselected' | 'indeterminate'): void;
  placeInParent(): void;
  hasChildren(): boolean;
  setExpandable(leaf: boolean): void;
  updateAria(): void;
  trySyncOpenIcon(): void;
}

export class TreeItemAdapter extends BaseAdapter<ITreeItemComponent> implements ITreeItemAdapter {
  private _root: HTMLElement;
  private _checkbox: IIconComponent;
  private _childrenSlot: HTMLSlotElement;

  constructor(component: ITreeItemComponent) {
    super(component);
    this._root = getShadowElement(this._component, TREE_ITEM_CONSTANTS.selectors.ROOT);
    this._checkbox = getShadowElement(this._component, TREE_ITEM_CONSTANTS.selectors.CHECKBOX) as IIconComponent;
    this._childrenSlot = getShadowElement(this._component, TREE_ITEM_CONSTANTS.selectors.CHILDREN_SLOT) as HTMLSlotElement;
  }

  public toggleRootClass(className: string, force?: boolean): void {
    this._root.classList.toggle(className, force);
  }

  public addSlotChangeListener(listener: EventListener): void {
    this._root.addEventListener('slotchange', listener);
  }

  public getLevel(): number {
    return getLevel(this._component);
  }

  public setLevel(level: number): void {
    this._component[setDefaultAria]({ ariaLevel: `${level}` });
    this._root.style.setProperty(TREE_ITEM_CONSTANTS.cssCustomProperties.LEVEL, `${level}`);
  }

  public setCheckboxIcon(state: 'selected' | 'unselected' | 'indeterminate'): void {
    this._checkbox.name =
      state === 'selected'
        ? TREE_ITEM_CONSTANTS.icons.CHECK
        : state === 'indeterminate'
          ? TREE_ITEM_CONSTANTS.icons.INDETERMINATE
          : TREE_ITEM_CONSTANTS.icons.UNCHECK;
  }

  /**
   * Checks if the component is a nested item and sets the slot accordingly.
   */
  public placeInParent(): void {
    const parent = this._component.parentElement;
    if (parent?.tagName.toLowerCase() === TREE_ITEM_CONSTANTS.elementName) {
      this._component.slot = TREE_ITEM_CONSTANTS.slots.CHILDREN;
    }
  }

  /**
   * Checks whether the component has child items.
   *
   * @returns Whether the component has children.
   */
  public hasChildren(): boolean {
    return !!this._childrenSlot.assignedElements({ flatten: true }).length;
  }

  public setExpandable(leaf: boolean): void {
    this._root.classList.toggle(TREE_ITEM_CONSTANTS.classes.LEAF, leaf);
  }

  /**
   * Syncs the component's accessibility attributes with the component's state.
   */
  public updateAria(): void {
    this._component[setDefaultAria]({
      ariaExpanded: this._component.leaf ? null : this._component.open ? 'true' : 'false',
      ariaSelected: this._component.selected ? 'true' : 'false'
    });
  }

  /**
   * Sets the open icon state to match the component's open state.
   */
  public trySyncOpenIcon(): void {
    const openIconElement =
      getShadowElement(this._component, TREE_ITEM_CONSTANTS.selectors.OPEN_ICON) ?? this._component.querySelector(TREE_ITEM_CONSTANTS.selectors.OPEN_ICON);
    if (openIconElement) {
      (openIconElement as IOpenIconComponent).open = this._component.open;
    }
  }
}
