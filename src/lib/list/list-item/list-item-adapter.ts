import { getShadowElement, isDeepEqual, toggleAttribute } from '@tylertech/forge-core';
import { replaceElement } from '../../core/utils/utils';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../../state-layer';
import { IListComponent } from '../list/list';
import { ListComponentItemRole, LIST_CONSTANTS } from '../list/list-constants';
import { IListItemComponent } from './list-item';
import { LIST_ITEM_CONSTANTS } from './list-item-constants';
import { ISwitchComponent } from '../../switch';

export interface IListItemAdapter extends IBaseAdapter<IListItemComponent> {
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

export class ListItemAdapter extends BaseAdapter<IListItemComponent> implements IListItemAdapter {
  private _rootElement: HTMLElement | HTMLAnchorElement;
  private _focusIndicatorElement: IFocusIndicatorComponent;
  private _stateLayerElement: IStateLayerComponent;

  constructor(component: IListItemComponent) {
    super(component);
    this._rootElement = getShadowElement(component, LIST_ITEM_CONSTANTS.selectors.ROOT);
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public initialize(): void {
    // Attempt to inherit state for corresponding properties from our parent list
    const list = this._getParentList();
    if (list) {
      this._inheritParentListProps(list);
    }

    this._rootElement.tabIndex = this._component.nonInteractive || this._component.disabled ? -1 : 0;

    if (!this._component.hasAttribute('role')) {
      this._setRole(list);
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
    this._rootElement.tabIndex = value ? -1 : 0;

    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }
  }

  public setDisabled(value: boolean): void {
    this._rootElement.tabIndex = value ? -1 : 0;
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
   * Attempts to toggle a checkbox radio button, or switch within the list item if it can find one.
   */
  public tryToggleSelectionControl(value?: boolean): void {
    const checkable = this._component.querySelector(LIST_ITEM_CONSTANTS.selectors.CHECKBOX_RADIO_SELECTOR) as HTMLInputElement;
    if (checkable) {
      const force = typeof value === 'boolean';
      const currentState = checkable.checked;
      
      // Check if we are just toggling or forcing to a specific checked state
      checkable.checked = force ? value as boolean : !checkable.checked;

      // TODO: This seems weird... Should we be dispatching events on slotted elements when changes are made programmatically?
      if (!force || currentState !== value) {
        checkable.dispatchEvent(new Event('change', { bubbles: true }));
      }
    } else {
      // Special case handling for the Forge switch element since it doesn't have a checked property
      const switchEl = this._component.querySelector(LIST_ITEM_CONSTANTS.selectors.SWITCH_SELECTOR) as ISwitchComponent;
      if (!switchEl) {
        return;
      }
      
      const force = typeof value === 'boolean';
      const currentState = switchEl.on;

      // Check if we are just toggling or forcing to a specific checked state
      switchEl.on = force ? value as boolean : !switchEl.on;

      // TODO: This seems weird... Should we be dispatching events on slotted elements when changes are made programmatically?
      if (!force || currentState !== value) {
        switchEl.dispatchEvent(new CustomEvent('forge-switch-change', { bubbles: true, detail: switchEl.on }));
      }
    }
  }

  public isFocused(): boolean {
    return this._component.matches(':focus');
  }

  public setFocus(): void {
    this._rootElement.focus({ preventScroll: true });
  }

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
  }

  private _createAnchorRootElement(target: string): HTMLAnchorElement {
    const a = document.createElement('a');
    a.classList.add(LIST_ITEM_CONSTANTS.classes.ROOT);
    a.setAttribute('part', 'root');
    a.target = target;
    return a;
  }

  private _createDefaultRootElement(): HTMLElement {
    const div = document.createElement('div');
    div.classList.add(LIST_ITEM_CONSTANTS.classes.ROOT);
    div.setAttribute('part', 'root');
    div.tabIndex = this._component.nonInteractive || this._component.disabled ? -1 : 0;
    return div;
  }

  private _getParentList(): IListComponent | null {
    return this._component.closest(LIST_CONSTANTS.elementName);
  }

  private _inheritParentListProps(list: IListComponent): void {
    if (list.hasAttribute(LIST_CONSTANTS.attributes.NON_INTERACTIVE) || list.hasAttribute(LIST_CONSTANTS.attributes.STATIC)) {
      this._component.nonInteractive = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.DISABLED)) {
      this._component.disabled = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.DENSE)) {
      this._component.dense = true;
    }
    if (list.getAttribute(LIST_CONSTANTS.attributes.PROPAGATE_CLICK) === 'false') {
      this._component.propagateClick = false;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.INDENTED)) {
      this._component.indented = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.TWO_LINE)) {
      this._component.twoLine = true;
    }
    if (list.hasAttribute(LIST_CONSTANTS.attributes.THREE_LINE)) {
      this._component.threeLine = true;
    }
  }

  private _setRole(list: IListComponent | null): void {
    const listRole = list?.getAttribute('role');
    const role = ListComponentItemRole[listRole as string] ?? 'listitem';
    this._component.setAttribute('role', role);
  }
}
