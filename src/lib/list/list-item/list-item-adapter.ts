import { addClass, getShadowElement, removeClass, requireParent, isDeepEqual, toggleClass } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { createUserInteractionListener } from '../../core/utils';
import { IListComponent } from '../list/list';
import { LIST_CONSTANTS } from '../list/list-constants';
import { IListItemComponent } from './list-item';
import { LIST_ITEM_CONSTANTS } from './list-item-constants';
import { ForgeRipple } from '../../ripple';

export interface IListItemAdapter extends IBaseAdapter {
  initializeAccessibility(): void;
  getListItem(): IListItemComponent;
  addListener(type: string, listener: (evt: Event) => void, options?: AddEventListenerOptions): void;
  removeListener(type: string, listener: (evt: Event) => void): void;
  createRipple(): any;
  setStatic(value: boolean): void;
  setTwoLine(value: boolean): void;
  setThreeLine(value: boolean): void;
  getLineCount(): number;
  setActive(value: boolean): void;
  setSelected(value: boolean): void;
  tryToggleCheckboxRadio(value?: boolean): void;
  setFocus(): void;
  hasFocus(): boolean;
  setRole(role: string): void;
  setDisabled(disabled: boolean): void;
  setDense(dense: boolean): void;
  setIndented(indented: boolean): void;
  setWrap(value: boolean): void;
  trySelect(value: unknown): boolean | null;
  userInteractionListener(): ReturnType<typeof createUserInteractionListener>;
}

export class ListItemAdapter extends BaseAdapter<IListItemComponent> implements IListItemAdapter {
  private _listItemElement: HTMLElement;
  private _defaultSlot: HTMLSlotElement;

  constructor(component: IListItemComponent) {
    super(component);
    this._initialize();
  }

  private _initialize(): void {
    this._listItemElement = getShadowElement(this._component, LIST_ITEM_CONSTANTS.selectors.LIST_ITEM);
    this._defaultSlot = getShadowElement(this._component, LIST_ITEM_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
  }
  
  public initializeAccessibility(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'listitem');
    }
  }

  public getListItem(): IListItemComponent {
    return this._component;
  }

  /**
   * Adds an event listener to the `<forge-list-item>` host element.
   * @param {string} type The event type.
   * @param {Function} listener The event callback.
   */
  public addListener(type: string, listener: (evt: Event) => void, options?: AddEventListenerOptions): void {
    this._listItemElement.addEventListener(type, listener, options);
  }

  /**
   * Removes an event listener from the `<forge-list-item>` host element.
   * @param {string} type The event type.
   * @param {Function} listener The event callback.
   */
  public removeListener(type: string, listener: (evt: Event) => void): void {
    this._listItemElement.removeEventListener(type, listener);
  }

  /**
   * Creates a ripple instance on the list item.
   * @returns {ForgeRipple}
   */
  public createRipple(): any {
    return new ForgeRipple(this._listItemElement);
  }

  /**
   * Toggles the static state of this list item.
   * @param {boolean} value The static state.
   */
  public setStatic(value: boolean): void {
    if (value) {
      this._listItemElement.tabIndex = -1;
      addClass(LIST_ITEM_CONSTANTS.classes.STATIC, this._listItemElement);
    } else {
      this._listItemElement.tabIndex = 0;
      removeClass(LIST_ITEM_CONSTANTS.classes.STATIC, this._listItemElement);
    }
  }

  /**
   * Sets this list item as a two-line list item.
   * @param {boolean} value The two-line state.
   */
  public setTwoLine(value: boolean): void {
    if (value) {
      addClass(LIST_ITEM_CONSTANTS.classes.TWO_LINE, this._listItemElement);
    } else {
      removeClass(LIST_ITEM_CONSTANTS.classes.TWO_LINE, this._listItemElement);
    }
  }

  /**
   * Sets this list item as a three-line list item.
   * @param {boolean} value The three-line state.
   */
  public setThreeLine(value: boolean): void {
    if (value) {
      addClass(LIST_ITEM_CONSTANTS.classes.THREE_LINE, this._listItemElement);
    } else {
      removeClass(LIST_ITEM_CONSTANTS.classes.THREE_LINE, this._listItemElement);
    }
  }

  /**
   * Determines how many lines the list item is displaying.
   */
  public getLineCount(): number {
    return this._defaultSlot.assignedNodes().filter(e => e.nodeType === Node.ELEMENT_NODE).length; // assignedElements does not exist in the polyfilled version so filtering nodes instead
  }

  /**
   * Toggles the active class of the list item.
   * @param {boolean} value The active state.
   */
  public setActive(value: boolean): void {
    if (value) {
      addClass(LIST_ITEM_CONSTANTS.classes.ACTIVE, this._listItemElement);
    } else {
      removeClass(LIST_ITEM_CONSTANTS.classes.ACTIVE, this._listItemElement);
    }
  }

  /**
   * Toggles the selected class of the list item.
   * @param {boolean} value The active state.
   */
  public setSelected(value: boolean): void {
    if (value) {
      addClass(LIST_ITEM_CONSTANTS.classes.SELECTED, this._listItemElement);
      // We are treating selected and activated as the same state, and mdc-states hooks right into --activated
      // addClass(LIST_ITEM_CONSTANTS.classes.ACTIVATED, this._listItemElement);
    } else {
      removeClass(LIST_ITEM_CONSTANTS.classes.SELECTED, this._listItemElement);
      // removeClass(LIST_ITEM_CONSTANTS.classes.ACTIVATED, this._listItemElement);
    }
  }

  /**
   * Attemps to toggle a checkbox or radio button within the list item if it can find one.
   */
  public tryToggleCheckboxRadio(value?: boolean): void {
    const checkable = this._component.querySelector(LIST_ITEM_CONSTANTS.selectors.CHECKBOX_RADIO_SELECTOR) as HTMLInputElement;
    if (checkable) {
      const force = typeof value === 'boolean';
      const currentState = checkable.checked;
      
      // Check if we are just toggling or forcing to a specific checked state
      checkable.checked = force ? value as boolean : !checkable.checked;

      if (!force || currentState !== value) {
        checkable.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  /** Attempts to set focus to this list item. */
  public setFocus(): void {
    this._listItemElement.focus();
  }

  /** Returns whether the component has focus or not. */
  public hasFocus(): boolean {
    return document.activeElement === this._component || !!this._component.shadowRoot?.activeElement;
  }

  /**
   * Sets the role on the list item element.
   * @param role The role.
   */
  public setRole(role: string): void {
    this._listItemElement.setAttribute('role', role);
  }

  public setDisabled(disabled: boolean): void {
    toggleClass(this._listItemElement, disabled, LIST_ITEM_CONSTANTS.classes.DISABLED);
  }

  public setDense(dense: boolean): void {
    toggleClass(this._listItemElement, dense, LIST_ITEM_CONSTANTS.classes.DENSE);
  }

  public setIndented(indented: boolean): void {
    toggleClass(this._listItemElement, indented, LIST_ITEM_CONSTANTS.classes.INDENTED);
  }

  public setWrap(value: boolean): void {
    toggleClass(this._listItemElement, value, LIST_ITEM_CONSTANTS.classes.WRAP);
  }

  /**
   * Attempts to set the selected state of the list item element and it's visual indicators
   * @param value The value to compare to the parent list element's selected value
   * @returns Returns whether the list item is selected or not
   */
  public trySelect(value: unknown): boolean | null {
    const list = requireParent<IListComponent>(this._component, LIST_CONSTANTS.elementName);
    if (!list || list.selectedValue === undefined) {
      return null;
    }

    const listValues = list.selectedValue instanceof Array ? list.selectedValue : [list.selectedValue];
    const isSelected = listValues.some(v => isDeepEqual(v, value));

    this.setSelected(isSelected);
    this.tryToggleCheckboxRadio(isSelected);
    return isSelected;
  }

  public userInteractionListener(): ReturnType<typeof createUserInteractionListener> {
    return createUserInteractionListener(this._listItemElement);
  }
}
