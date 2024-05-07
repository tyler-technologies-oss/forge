import { getShadowElement, isDeepEqual } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IFocusIndicatorComponent } from '../../focus-indicator/focus-indicator';
import { IStateLayerComponent } from '../../state-layer/state-layer';
import { IListComponent } from '../list/list';
import { LIST_CONSTANTS } from '../list/list-constants';
import { IListItemComponent } from './list-item';
import { LIST_ITEM_CONSTANTS } from './list-item-constants';
import { setDefaultAria } from '../../constants';

export interface IListItemAdapter extends IBaseAdapter<IListItemComponent> {
  readonly isInteractive: boolean;
  readonly interactiveElement: HTMLElement | HTMLAnchorElement | undefined;
  initialize(): void;
  destroy(): void;
  addRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void;
  removeRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void;
  setInteractiveStateChangeListener(listener: (value: boolean) => void): void;
  setActive(value: boolean): void;
  trySelect(value: unknown): boolean | null;
  animateStateLayer(): void;
  tempDeactivateFocusIndicator(): void;
}

export class ListItemAdapter extends BaseAdapter<IListItemComponent> implements IListItemAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _defaultSlotElement: HTMLSlotElement;
  private _focusIndicatorElement: IFocusIndicatorComponent | undefined;
  private _stateLayerElement: IStateLayerComponent | undefined;
  private _disabledAttrObserver: MutationObserver | undefined;
  private _anchorAttrObserver: MutationObserver | undefined;
  private _slotListener: EventListener = this._onSlotChange.bind(this);
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
    const list = this._getParentList();
    if (list) {
      this._inheritParentListProps(list);
    }
  
    this._rootElement.addEventListener('slotchange', this._slotListener);
    this._component[setDefaultAria]({ role: 'listitem' }, { setAttribute: !this._component.hasAttribute('role') });
    this._syncInteractiveState();
  }

  public destroy(): void {
    this._rootElement.removeEventListener('slotchange', this._slotListener);

    this._disabledAttrObserver?.disconnect();
    this._disabledAttrObserver = undefined;

    this._anchorAttrObserver?.disconnect();
    this._anchorAttrObserver = undefined;
  }

  public addRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void {
    this._rootElement.addEventListener(type, listener, options);
  }

  public removeRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void {
    this._rootElement.removeEventListener(type, listener, options);
  }

  public setInteractiveStateChangeListener(listener: (value: boolean) => void): void {
    this._interactiveStateChangeListener = listener;
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
    return isSelected;
  }

  public animateStateLayer(): void {
    this._stateLayerElement?.playAnimation();
  }

  public tempDeactivateFocusIndicator(): void {
    if (this._focusIndicatorElement) {
      this._focusIndicatorElement.active = false;
    }
  }

  private _onSlotChange(evt: Event): void {
    const isInteractiveSlot = ['', 'leading', 'trailing'].includes((evt.target as HTMLSlotElement).name);
    if (!isInteractiveSlot) {
      return;
    }
    this._syncInteractiveState();
  }

  private _syncInteractiveState(): void {
    const slottedFormControl = this._component.querySelector(LIST_ITEM_CONSTANTS.selectors.FORM_CONTROL_LIKE) as HTMLElement | null;

    if (slottedFormControl) {
      this._anchorAttrObserver?.disconnect();
      this._anchorAttrObserver = undefined;

      this._disabledAttrObserver?.disconnect();
      this._disabledAttrObserver = undefined;

      this._interactiveElement = slottedFormControl as HTMLElement;
      this._setInteractive(!!this._interactiveElement);
      
      if (this._focusIndicatorElement) {
        this._focusIndicatorElement.targetElement = slottedFormControl;
      }
      
      this._syncDisabled(slottedFormControl);
      this._disabledAttrObserver = new MutationObserver(() => this._syncDisabled(slottedFormControl as HTMLElement));
      this._disabledAttrObserver.observe(slottedFormControl, { attributes: true, attributeFilter: ['disabled', 'aria-disabled'] });
      return;
    }

    const assignedElements = this._defaultSlotElement.assignedElements({ flatten: true });
    const slottedAnchor = assignedElements.find(e => e.tagName === 'A') as HTMLAnchorElement | undefined;
    const slottedButton = assignedElements.find(e => e.matches(LIST_ITEM_CONSTANTS.selectors.BUTTON_LIKE)) as HTMLElement | undefined;
    
    if (!slottedAnchor) {
      const internalAnchor = getShadowElement(this._component, LIST_ITEM_CONSTANTS.selectors.INTERNAL_ANCHOR);
      if (internalAnchor) {
        internalAnchor.remove();
      }

      this._anchorAttrObserver?.disconnect();
      this._anchorAttrObserver = undefined;
    }
    if (!slottedButton) {
      this._disabledAttrObserver?.disconnect();
      this._disabledAttrObserver = undefined;
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
      this._syncDisabled(slottedButton);
      
      if (this._focusIndicatorElement) {
        this._focusIndicatorElement.targetElement = slottedButton;
      }

      this._disabledAttrObserver = new MutationObserver(() => this._syncDisabled(slottedButton));
      this._disabledAttrObserver.observe(slottedButton, { attributes: true, attributeFilter: ['disabled', 'aria-disabled'] });
    }
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

  private _syncDisabled(element: HTMLElement): void {
    const isDisabled = element.hasAttribute('disabled') || element.getAttribute('aria-disabled') === 'true';
    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.DISABLED, isDisabled);
    this._setInteractive(!isDisabled);
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
