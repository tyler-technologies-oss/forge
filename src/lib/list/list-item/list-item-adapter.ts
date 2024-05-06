import { getShadowElement, isDeepEqual } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IFocusIndicatorComponent } from '../../focus-indicator/focus-indicator';
import { IStateLayerComponent } from '../../state-layer/state-layer';
import { IListComponent } from '../list/list';
import { LIST_CONSTANTS } from '../list/list-constants';
import { IListItemComponent } from './list-item';
import { LIST_ITEM_CONSTANTS } from './list-item-constants';
import { ISwitchComponent } from '../../switch/switch';
import { setDefaultAria } from '../../constants';

export interface IListItemAdapter extends IBaseAdapter<IListItemComponent> {
  readonly isInteractive: boolean;
  readonly interactiveElement: HTMLElement | HTMLAnchorElement | undefined;
  initialize(): void;
  destroy(): void;
  setInteractiveStateChangeListener(listener: (value: boolean) => void): void;
  setActive(value: boolean): void;
  trySelect(value: unknown): boolean | null;
  tryToggleSelectionControl(value?: boolean): void;
  animateStateLayer(): void;
}

export class ListItemAdapter extends BaseAdapter<IListItemComponent> implements IListItemAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _defaultSlotElement: HTMLSlotElement;
  private _focusIndicatorElement: IFocusIndicatorComponent | undefined;
  private _stateLayerElement: IStateLayerComponent | undefined;
  private _buttonAttrObserver: MutationObserver | undefined;
  private _anchorAttrObserver: MutationObserver | undefined;
  private _slotListener: EventListener = this._syncInteractiveState.bind(this);
  private _interactiveStateChangeListener: ((value: boolean) => void) | undefined;
  private _interactiveElement: HTMLElement | HTMLAnchorElement | undefined;

  constructor(component: IListItemComponent) {
    super(component);
    this._rootElement = getShadowElement(component, LIST_ITEM_CONSTANTS.selectors.ROOT);
    this._defaultSlotElement = getShadowElement(component, 'slot:not([name])') as HTMLSlotElement;
  }
  
  public get isInteractive(): boolean {
    return this._rootElement.classList.contains(LIST_ITEM_CONSTANTS.classes.INTERACTIVE);
  }

  public get interactiveElement(): HTMLElement | HTMLAnchorElement | undefined {
    return this._interactiveElement;
  }

  public initialize(): void {
    // Attempt to inherit state for corresponding properties from our parent list
    const list = this._getParentList();
    if (list) {
      this._inheritParentListProps(list);
    }
    
    this._defaultSlotElement.addEventListener('slotchange', this._slotListener);
    this._component[setDefaultAria]({ role: 'listitem' }, { setAttribute: !this._component.hasAttribute('role') });
    this._syncInteractiveState();
  }

  public destroy(): void {
    this._defaultSlotElement.removeEventListener('slotchange', this._slotListener);

    this._buttonAttrObserver?.disconnect();
    this._buttonAttrObserver = undefined;

    this._anchorAttrObserver?.disconnect();
    this._anchorAttrObserver = undefined;
  }

  public setInteractiveStateChangeListener(listener: (value: boolean) => void): void {
    this._interactiveStateChangeListener = listener;
  }

  private _syncInteractiveState(): void {
    const assignedElements = this._defaultSlotElement.assignedElements({ flatten: true });
    const slottedAnchor = assignedElements.find(e => e.tagName === 'A') as HTMLAnchorElement | undefined;
    const slottedButton = assignedElements.find(e => e.matches(LIST_ITEM_CONSTANTS.selectors.BUTTON_LIKE)) as HTMLElement | undefined;
    
    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.WITH_ANCHOR, !!slottedAnchor);
    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.WITH_BUTTON, !!slottedButton);
    
    if (!slottedAnchor) {
      const internalAnchor = getShadowElement(this._component, LIST_ITEM_CONSTANTS.selectors.INTERNAL_ANCHOR);
      if (internalAnchor) {
        internalAnchor.remove();
      }

      this._anchorAttrObserver?.disconnect();
      this._anchorAttrObserver = undefined;
    }
    if (!slottedButton) {
      this._buttonAttrObserver?.disconnect();
      this._buttonAttrObserver = undefined;
    }
    
    this._interactiveElement = slottedAnchor ?? slottedButton;
    this._setInteractive(!!this._interactiveElement);


    if (slottedAnchor) {
      const internalAnchor = getShadowElement(this._component, LIST_ITEM_CONSTANTS.selectors.INTERNAL_ANCHOR) as HTMLAnchorElement | null ?? document.createElement('a');
      internalAnchor.href = slottedAnchor.href;
      internalAnchor.tabIndex = -1;
      internalAnchor.id = LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR;
      internalAnchor.classList.add(LIST_ITEM_CONSTANTS.classes.INTERNAL_ANCHOR);
      internalAnchor.setAttribute('aria-hidden', 'true');
      this._rootElement.appendChild(internalAnchor);

      if (this._focusIndicatorElement) {
        this._focusIndicatorElement.targetElement = slottedAnchor;
      }

      this._anchorAttrObserver = new MutationObserver(() => internalAnchor.href = slottedAnchor.href);
      this._anchorAttrObserver.observe(slottedAnchor, { attributes: true, attributeFilter: ['href'] });
      return;
    }

    if (slottedButton) {
      this._syncDisabled();
      
      if (this._focusIndicatorElement) {
        this._focusIndicatorElement.targetElement = slottedButton;
      }

      this._buttonAttrObserver = new MutationObserver(() => this._syncDisabled());
      this._buttonAttrObserver.observe(slottedButton, { attributes: true, attributeFilter: ['disabled', 'aria-disabled'] });
    }
  }

  private _initializeInteractiveAnchor(): void {
    
  }

  private _setInteractive(value: boolean): void {
    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.INTERACTIVE, value);
    this._interactiveStateChangeListener?.(value);

    if (value) {
      if (!this._focusIndicatorElement) {
        this._focusIndicatorElement = document.createElement('forge-focus-indicator');
        this._focusIndicatorElement.setAttribute('part', 'focus-indicator');
        this._focusIndicatorElement.inward = true;
        this._rootElement.appendChild(this._focusIndicatorElement);
      }
      if (!this._stateLayerElement) {
        this._stateLayerElement = document.createElement('forge-state-layer');
        this._stateLayerElement.targetElement = this._rootElement;
        this._stateLayerElement.setAttribute('exportparts', 'surface:state-layer');
        this._rootElement.appendChild(this._stateLayerElement);
      }
    } else {
      this._focusIndicatorElement?.remove();
      this._focusIndicatorElement = undefined;
      this._stateLayerElement?.remove();
      this._stateLayerElement = undefined;
    }
  }

  private _syncDisabled(): void {
    const slottedButton = this._defaultSlotElement.assignedElements().find(e => e.matches(LIST_ITEM_CONSTANTS.selectors.BUTTON_LIKE)) as HTMLElement;
    const isDisabled = slottedButton.hasAttribute('disabled') || slottedButton.getAttribute('aria-disabled') === 'true';
    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.DISABLED, isDisabled);
    this._setInteractive(!isDisabled);
  }

  public setActive(value: boolean): void {
    if (this._focusIndicatorElement) {
      this._focusIndicatorElement.active = value;
    }
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
    }

    // Special case handling for the Forge switch element since it doesn't have a checked property
    const switchEl = this._component.querySelector(LIST_ITEM_CONSTANTS.selectors.SWITCH_SELECTOR) as ISwitchComponent;
    if (switchEl) {
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
    this._stateLayerElement?.playAnimation();
  }

  private _getParentList(): IListComponent | null {
    return this._component.closest(LIST_CONSTANTS.elementName);
  }

  private _inheritParentListProps(list: IListComponent): void {
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
