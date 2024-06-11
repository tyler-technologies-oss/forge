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
  readonly interactiveElement: HTMLElement | HTMLAnchorElement | undefined;
  initialize(): void;
  destroy(): void;
  initializeInteractiveObserver(listener: (value: boolean) => void): void;
  destroyInteractiveObserver(): void;
  addRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void;
  removeRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void;
  setActive(value: boolean): void;
  trySelect(value: unknown): boolean | null;
  animateStateLayer(): void;
  tempDeactivateFocusIndicator(): void;
}

export class ListItemAdapter extends BaseAdapter<IListItemComponent> implements IListItemAdapter {
  private readonly _rootElement: HTMLElement;
  private readonly _defaultSlotElement: HTMLSlotElement;
  private readonly _startSlotElement: HTMLSlotElement;
  private readonly _endSlotElement: HTMLSlotElement;
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
    this._startSlotElement = getShadowElement(component, 'slot[name=start]') as HTMLSlotElement;
    this._endSlotElement = getShadowElement(component, 'slot[name=end]') as HTMLSlotElement;
  }

  public get interactiveElement(): HTMLElement | HTMLAnchorElement | undefined {
    return this._interactiveElement;
  }

  public initialize(): void {
    const list = this._getParentList();
    if (list) {
      this._inheritParentListProps(list);
    }
    this._component[setDefaultAria]({ role: 'listitem' }, { setAttribute: !this._component.hasAttribute('role') });
  }

  public destroy(): void {
    this._rootElement.removeEventListener('slotchange', this._slotListener);
    this._tryCleanupObservers();
  }

  public initializeInteractiveObserver(listener: (value: boolean) => void): void {
    this._interactiveStateChangeListener = listener;
    this._rootElement.addEventListener('slotchange', this._slotListener);
    this._initializeInteractiveElement();
  }

  public destroyInteractiveObserver(): void {
    this._rootElement.removeEventListener('slotchange', this._slotListener);
    this._tryCleanupObservers();
    this._interactiveStateChangeListener?.(false);
    this._interactiveStateChangeListener = undefined;
  }

  public addRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void {
    this._rootElement.addEventListener(type, listener, options);
  }

  public removeRootListener(type: string, listener: EventListener, options?: EventListenerOptions): void {
    this._rootElement.removeEventListener(type, listener, options);
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
    // We only care about slot changes in the default slot, start/leading slot, and end/trailing slot to search for interactive elements
    const interactiveSlotNames = ['', 'start', 'end', 'leading', 'trailing'];
    const isInteractiveSlot = interactiveSlotNames.includes((evt.target as HTMLSlotElement).name);
    if (!isInteractiveSlot) {
      return;
    }
    this._initializeInteractiveElement();
  }

  private _initializeInteractiveElement(): void {
    this._tryCleanupObservers();

    // We always want to check for form control-like elements first as those take precedence over slotted anchor and button
    // elements as the interactive element.
    const assignedStartElements = this._startSlotElement.assignedElements({ flatten: true });
    const assignedEndElements = this._endSlotElement.assignedElements({ flatten: true });
    const assignedStartEndElements = [...assignedStartElements, ...assignedEndElements];
    const slottedFormControl = assignedStartEndElements.find(e => e.matches(LIST_ITEM_CONSTANTS.selectors.FORM_CONTROL_LIKE)) as HTMLElement | undefined;
    if (slottedFormControl) {
      this._attachInteractiveFormControl(slottedFormControl);
      return;
    }

    // If no form control-like elements are found, we check for slotted anchor or button elements within the default slot next.
    // If an anchor element is found, we create an internal anchor element to prevent the list item from being focusable.
    // If a button element is found, we sync the disabled state and attach a mutation observer to watch for changes.
    const assignedElements = this._defaultSlotElement.assignedElements({ flatten: true });
    const slottedAnchor = assignedElements.find(e => e.tagName === 'A') as HTMLAnchorElement | undefined;
    const slottedButtonLike = assignedElements.find(e => e.matches(LIST_ITEM_CONSTANTS.selectors.BUTTON_LIKE)) as HTMLElement | undefined;

    // Attempt to remove the internal anchor element if it exists before we attach to a different interactive element
    const internalAnchor = getShadowElement(this._component, LIST_ITEM_CONSTANTS.selectors.INTERNAL_ANCHOR);
    if (internalAnchor) {
      internalAnchor.remove();
    }

    // Slotted anchors take precedence over slotted button-like elements
    this._interactiveElement = slottedAnchor ?? slottedButtonLike;
    this._setInteractive(!!this._interactiveElement);

    if (slottedAnchor) {
      this._attachInteractiveAnchor(slottedAnchor);
    } else if (slottedButtonLike) {
      this._attachInteractiveButtonLike(slottedButtonLike);
    }
  }

  private _attachInteractiveFormControl(element: HTMLElement): void {
    this._interactiveElement = element;
    this._setInteractive(!!this._interactiveElement);

    if (this._focusIndicatorElement) {
      this._focusIndicatorElement.targetElement = element;
    }

    // Listen for changes to the disabled attribute and aria-disabled attribute to synchronize our disabled state
    this._syncDisabled(element);
    this._disabledAttrObserver = new MutationObserver(() => this._syncDisabled(element as HTMLElement));
    this._disabledAttrObserver.observe(element, { attributes: true, attributeFilter: ['disabled', 'aria-disabled'] });
  }

  private _attachInteractiveAnchor(element: HTMLAnchorElement): void {
    // Create an internal (facade) anchor element that covers the entire list item to show the href in the status bar
    // but is not focusable or presented to assistive technology. All clicks on the internal anchor are forwarded to the
    // slotted anchor element.
    const internalAnchor =
      (getShadowElement(this._component, LIST_ITEM_CONSTANTS.selectors.INTERNAL_ANCHOR) as HTMLAnchorElement | null) ?? document.createElement('a');
    internalAnchor.href = element.href;
    internalAnchor.tabIndex = -1;
    internalAnchor.id = LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR;
    internalAnchor.classList.add(LIST_ITEM_CONSTANTS.classes.INTERNAL_ANCHOR);
    internalAnchor.setAttribute('aria-hidden', 'true');
    this._rootElement.appendChild(internalAnchor);

    if (this._focusIndicatorElement) {
      this._focusIndicatorElement.targetElement = element;
    }

    // Listen for changes to the href attribute to synchronize our internal anchor's href
    this._anchorAttrObserver = new MutationObserver(() => (internalAnchor.href = element.href));
    this._anchorAttrObserver.observe(element, { attributes: true, attributeFilter: ['href'] });
  }

  private _attachInteractiveButtonLike(element: HTMLElement): void {
    if (this._focusIndicatorElement) {
      this._focusIndicatorElement.targetElement = element;
    }

    this._syncDisabled(element);
    this._disabledAttrObserver = new MutationObserver(() => this._syncDisabled(element));
    this._disabledAttrObserver.observe(element, { attributes: true, attributeFilter: ['disabled', 'aria-disabled'] });
  }

  private _setInteractive(value: boolean): void {
    this._rootElement.classList.toggle(LIST_ITEM_CONSTANTS.classes.INTERACTIVE, value);

    // Notify ourselves that the interactive state has changed so we can attach/remove event listeners
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
    if (list.hasAttribute(LIST_CONSTANTS.attributes.NONINTERACTIVE)) {
      this._component.noninteractive = true;
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

  private _tryCleanupObservers(): void {
    this._disabledAttrObserver?.disconnect();
    this._disabledAttrObserver = undefined;

    this._anchorAttrObserver?.disconnect();
    this._anchorAttrObserver = undefined;
  }
}
