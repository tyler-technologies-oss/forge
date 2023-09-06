import { getShadowElement, isDeepEqual, toggleAttribute } from '@tylertech/forge-core';
import { replaceElement } from '../../../core/utils/utils';
import { BaseAdapter, IBaseAdapter } from '../../../core/base/base-adapter';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../../state-layer';
import { IListComponentExp } from '../list/list';
import { LIST_CONSTANTS_EXP } from '../list/list-constants';
import { IListItemComponentExp } from './list-item';
import { LIST_ITEM_CONSTANTS_EXP } from './list-item-constants';

export interface IListItemAdapterExp extends IBaseAdapter<IListItemComponentExp> {
  initialize(): void;
  setHref(href: string, target: string): void;
  setHrefTarget(target: string): void;
  setNonInteractive(value: boolean): void;
  setDisabled(value: boolean): void;
  setActive(value: boolean): void;
  trySelect(value: unknown): boolean | null;
  tryToggleSelectionControl(value?: boolean): void;
  isFocused(): boolean;
  setFocus(): void;
  animateStateLayer(): void;
}

export class ListItemAdapterExp extends BaseAdapter<IListItemComponentExp> implements IListItemAdapterExp {
  private _rootElement: HTMLElement | HTMLAnchorElement;
  private _focusIndicatorElement: IFocusIndicatorComponent;
  private _stateLayerElement: IStateLayerComponent;

  constructor(component: IListItemComponentExp) {
    super(component);
    this._rootElement = getShadowElement(component, LIST_ITEM_CONSTANTS_EXP.selectors.ROOT);
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public initialize(): void {
    // Attempt to inherit state for corresponding properties from our parent list
    const list = this._getParentList();
    if (list) {
      this._inheritParentListProps(list);
    }

    this._component.tabIndex = this._component.static || this._component.disabled ? -1 : 0;

    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'listitem');
    }
  }

  public setHref(href: string, target: string): void {
    if (href) {
      if (this._rootElement.tagName !== 'A') {
        const anchor = this._createAnchorRootElement(target);
        this._rootElement = replaceElement(this._rootElement, anchor);
      }
      (this._rootElement as HTMLAnchorElement).href = href;
    } else if (this._rootElement.tagName === 'A') {
      const defaultEl = this._createDefaultRootElement();
      this._rootElement = replaceElement(this._rootElement, defaultEl);
    }
  }

  public setHrefTarget(target: string): void {
    if (this._rootElement.tagName === 'A') {
      (this._rootElement as HTMLAnchorElement).target = target;
    }
  }

  public setNonInteractive(value: boolean): void {
    this._component.tabIndex = value ? -1 : 0;

    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }
  }

  public setDisabled(value: boolean): void {
    this._component.tabIndex = value ? -1 : 0;
    toggleAttribute(this._component, value, 'aria-disabled', 'true');

    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }
  }

  public setActive(value: boolean): void {
    this._focusIndicatorElement.active = value;
  }

  /**
   * Attempts to set the selected state of the list item element and it's visual indicators
   * @param value The value to compare to the parent list element's selected value
   * @returns Returns whether the list item is selected, or null otherwise.
   */
  public trySelect(value: unknown): boolean | null {
    const list = this._getParentList();
    if (list?.selectedValue === undefined) {
      return null;
    }

    const listValues = Array.isArray(list.selectedValue) ? list.selectedValue : [list.selectedValue];
    const isSelected = listValues.some(v => isDeepEqual(v, value));

    this.tryToggleSelectionControl(isSelected);
    return isSelected;
  }

  /**
   * Attempts to toggle a checkbox or radio button within the list item if it can find one.
   */
  public tryToggleSelectionControl(value?: boolean): void {
    const checkable = this._component.querySelector(LIST_ITEM_CONSTANTS_EXP.selectors.CHECKBOX_RADIO_SELECTOR) as HTMLInputElement;
    if (checkable) {
      const force = typeof value === 'boolean';
      const currentState = checkable.checked;
      
      // Check if we are just toggling or forcing to a specific checked state
      checkable.checked = force ? value as boolean : !checkable.checked;

      // TODO: This seems weird... Should we be dispatching events on slotted elements when changes are made programmatically?
      if (!force || currentState !== value) {
        checkable.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  }

  public isFocused(): boolean {
    return this._component.matches(':focus');
  }

  public setFocus(): void {
    this._component.focus({ preventScroll: true });
  }

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
  }

  private _createAnchorRootElement(target: string): HTMLAnchorElement {
    const a = document.createElement('a');
    a.classList.add(LIST_ITEM_CONSTANTS_EXP.classes.ROOT);
    a.setAttribute('part', 'root');
    a.target = target;
    return a;
  }

  private _createDefaultRootElement(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add(LIST_ITEM_CONSTANTS_EXP.classes.ROOT);
    div.setAttribute('part', 'root');
    div.tabIndex = this._component.nonInteractive || this._component.disabled ? -1 : 0;
    return div;
  }

  private _getParentList(): IListComponentExp | null {
    return this._component.closest(LIST_CONSTANTS_EXP.elementName);
  }

  private _inheritParentListProps(list: IListComponentExp): void {
    if (list.hasAttribute(LIST_CONSTANTS_EXP.attributes.NON_INTERACTIVE) || list.hasAttribute(LIST_CONSTANTS_EXP.attributes.STATIC)) {
      this._component.nonInteractive = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS_EXP.attributes.DISABLED)) {
      this._component.disabled = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS_EXP.attributes.DENSE)) {
      this._component.dense = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS_EXP.attributes.INDENTED)) {
      this._component.indented = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS_EXP.attributes.TWO_LINE)) {
      this._component.twoLine = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS_EXP.attributes.THREE_LINE)) {
      this._component.threeLine = true;
    }
  }
}
