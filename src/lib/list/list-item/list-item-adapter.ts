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
import { isFocusable, setDefaultAria } from '../../constants';

export interface IListItemAdapter extends IBaseAdapter<IListItemComponent> {
  initialize(): void;
  updateTabIndex(): void;
  setNonInteractive(value: boolean): void;
  setDisabled(value: boolean): void;
  setActive(value: boolean): void;
  trySelect(value: unknown): boolean | null;
  tryToggleSelectionControl(value?: boolean): void;
  animateStateLayer(): void;
  clickHost(): void;
}

export class ListItemAdapter extends BaseAdapter<IListItemComponent> implements IListItemAdapter {
  private _rootElement: HTMLElement;
  private _focusIndicatorElement: IFocusIndicatorComponent;
  private _stateLayerElement: IStateLayerComponent;
  private _defaultSlotElement: HTMLSlotElement;
  private _slotListener: EventListener = this._onDefaultSlotChange.bind(this);

  constructor(component: IListItemComponent) {
    super(component);
    this._rootElement = getShadowElement(component, LIST_ITEM_CONSTANTS.selectors.ROOT);
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
    this._defaultSlotElement = getShadowElement(component, 'slot:not([name])') as HTMLSlotElement;
  }

  public initialize(): void {
    // Attempt to inherit state for corresponding properties from our parent list
    const list = this._getParentList();
    if (list) {
      this._inheritParentListProps(list);
    }

    this._defaultSlotElement.addEventListener('slotchange', this._slotListener);

    this._component[setDefaultAria]({
      role: ListComponentItemRole[list?.getAttribute('role') as string] ?? 'listitem'
    }, { setAttribute: !this._component.hasAttribute('role') });

    this.updateTabIndex();
    this._onDefaultSlotChange();
  }

  private _onDefaultSlotChange(): void {
    const slottedAnchor = this._defaultSlotElement.assignedElements().find(e => e.tagName === 'A') as HTMLAnchorElement;
    const slottedButton = this._defaultSlotElement.assignedElements().find(e => e.tagName === 'BUTTON') as HTMLButtonElement;

    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.WITH_ANCHOR, !!slottedAnchor);
    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.WITH_BUTTON, !!slottedButton);

    const targetSlottedElement = (element: HTMLElement): void => {
      if (this._focusIndicatorElement.targetElement !== element) {
        this._focusIndicatorElement.targetElement = element;
      }
      if (this._stateLayerElement.targetElement !== element) {
        this._stateLayerElement.targetElement = element;
      }
    };

    const removeTabIndex = (): void => {
      this._component[isFocusable] = false;
      this._component.removeAttribute('tabindex');
    };

    if (slottedAnchor) {
      targetSlottedElement(slottedAnchor);
      removeTabIndex();
    } else if (slottedButton) {
      targetSlottedElement(slottedButton);
      if (this._component.disabled) {
        slottedButton.disabled = true;
      }
      removeTabIndex();
    } else {
      targetSlottedElement(this._component);
      this.updateTabIndex();
    }
  }

  public updateTabIndex(): void {
    this._component[isFocusable] = this._component.getAttribute('role') !== 'presentation' &&
                                   !this._rootElement.classList.contains(LIST_ITEM_CONSTANTS.classes.WITH_ANCHOR) &&
                                   !this._rootElement.classList.contains(LIST_ITEM_CONSTANTS.classes.WITH_BUTTON) &&
                                   !this._component.nonInteractive &&
                                   !this._component.disabled;
  }

  public setNonInteractive(value: boolean): void {
    this.updateTabIndex();
    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }
  }

  public setDisabled(value: boolean): void {
    this.updateTabIndex();
    toggleAttribute(this._component, value, 'aria-disabled', 'true');

    const slottedButton = this._defaultSlotElement.assignedElements().find(e => e.tagName === 'BUTTON') as HTMLButtonElement;
    if (slottedButton) {
      slottedButton.disabled = value;
    }

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

      // We don't uncheck radio buttons unless we are forcing a value from the selection state
      if (!force && checkable.matches(':is(forge-radio[checked],input[type=radio]:checked)')) {
        return;
      }
      
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

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
  }

  public clickHost(): void {
    // Calling click() on the prototype ensures we don't end up in an infinite
    // recursion since the host overrides the HTMLElement.click() method
    HTMLElement.prototype.click.call(this._component);
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
}
