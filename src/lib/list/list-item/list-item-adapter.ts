import { getShadowElement, isDeepEqual, toggleAttribute } from '@tylertech/forge-core';
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
  initializeAnchor(): void;
  removeAnchor(): void;
  setAnchorHref(href: string): void;
  setAnchorTarget(target: string): void;
  setAnchorDownload(download: string): void;
  setAnchorRel(rel: string): void;
  setNonInteractive(value: boolean): void;
  setDisabled(value: boolean): void;
  setActive(value: boolean): void;
  trySelect(value: unknown): boolean | null;
  tryToggleSelectionControl(value?: boolean): void;
  isFocused(): boolean;
  animateStateLayer(): void;
  syncDisabledState(value: boolean): void;
  clickAnchor(): void;
  clickHost(): void;
}

export class ListItemAdapter extends BaseAdapter<IListItemComponent> implements IListItemAdapter {
  private _rootElement: HTMLElement;
  protected _anchorElement: HTMLAnchorElement | undefined;
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

    this._applyHostSemantics(list);
  }

  public initializeAnchor(): void {
    this._anchorElement = this._createAnchorRootElement();
    this._rootElement.insertAdjacentElement('afterend', this._anchorElement);
    this._applyHostSemantics();
  }

  public removeAnchor(): void {
    this._anchorElement?.remove();
    this._anchorElement = undefined;
    this._applyHostSemantics();
  }

  public setAnchorHref(href: string): void {
    if (this._anchorElement) {
      this._anchorElement.href = href;
    }
  }

  public setAnchorTarget(target: string): void {
    if (this._anchorElement) {
      this._anchorElement.target = target;
    }
  }

  public setAnchorDownload(download: string): void {
    if (this._anchorElement) {
      this._anchorElement.download = download;
    }
  }

  public setAnchorRel(rel: string): void {
    if (this._anchorElement) {
      this._anchorElement.rel = rel;
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
    if (this._anchorElement) {
      return; // Anchor elements are always enabled
    }
    this.syncDisabledState(value);
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

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
  }

  public syncDisabledState(value: boolean): void {
    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }

    this._component.tabIndex = value || this._component.nonInteractive ? -1 : 0;
    toggleAttribute(this._component, value, 'aria-disabled', 'true');
  }

  public clickAnchor(): void {
    this._anchorElement?.click();
  }

  public clickHost(): void {
    // Calling click() on the prototype ensures we don't end up in an infinite
    // recursion since the host overrides the HTMLElement.click() method
    HTMLElement.prototype.click.call(this._component);
  }

  /**
   * Our anchor element is the interactive element that will be used to trigger the click event when it is present.
   * 
   * We use the <a> element as an overlay on top of all content to ensure that it provides the native functionality,
   * while removing it from the accessibility tree and tab order so that it does not interfere with the host semantics.
   */
  private _createAnchorRootElement(): HTMLAnchorElement {
    const a = document.createElement('a');
    a.setAttribute('aria-hidden', 'true');
    a.tabIndex = -1;
    if (this._component.href) {
      a.href = this._component.href;
    }
    if (this._component.target) {
      a.target = this._component.target;
    }
    if (this._component.download) {
      a.download = this._component.download;
    }
    if (this._component.rel) {
      a.rel = this._component.rel;
    }
    return a;
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

  private _applyHostSemantics(list?: IListComponent | null): void {
    if (!this._component.hasAttribute('role')) {
      const listRole = list?.getAttribute('role');
      const role = ListComponentItemRole[listRole as string] ?? 'listitem';
      this._component.setAttribute('role', role);
    }
    
    this._component.tabIndex = !this._anchorElement && (this._component.nonInteractive || this._component.disabled) ? -1 : 0;
  }
}
