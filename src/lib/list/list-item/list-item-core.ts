import { composedPathFrom } from '../../core/utils/event-utils';
import { IListItemAdapter } from './list-item-adapter';
import { IListItemSelectEventData, LIST_ITEM_CONSTANTS, ListItemFocusPropagation } from './list-item-constants';

export interface IListItemCore {
  selected: boolean;
  active: boolean;
  value: unknown;
  dense: boolean;
  indented: boolean;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
  noninteractive: boolean;
  focusPropagation: ListItemFocusPropagation;
}

export class ListItemCore implements IListItemCore {
  private _selected = false;
  private _active = false;
  private _value: unknown;
  private _dense = false;
  private _indented = false;
  private _twoLine = false;
  private _threeLine = false;
  private _wrap = false;
  private _noninteractive = false;
  private _focusPropagation: ListItemFocusPropagation = LIST_ITEM_CONSTANTS.defaults.FOCUS_PROPAGATION;

  private _interactiveStateChangeListener: (value: boolean) => void = this._onInteractiveStateChange.bind(this);
  private _mousedownListener: EventListener = this._onMousedown.bind(this);
  private _clickListener: EventListener = this._onClick.bind(this);
  private _keydownListener: EventListener = this._onKeydown.bind(this);

  constructor(private _adapter: IListItemAdapter) {}

  public initialize(): void {
    this._adapter.initialize();

    if (this._noninteractive) {
      this._adapter.destroyInteractiveObserver();
    } else {
      this._adapter.initializeInteractiveObserver(this._interactiveStateChangeListener);
    }
  }

  public destroy(): void {
    this._adapter.destroy();
  }

  private _onMousedown(evt: MouseEvent): void {
    const composedElements = composedPathFrom(this._adapter.hostElement, evt);
    const fromInteractiveElement = composedElements.some(el => el === this._adapter.interactiveElement);
    if (this._focusPropagation === 'off' || !fromInteractiveElement) {
      evt.preventDefault();
    }
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const composedElements = composedPathFrom(this._adapter.hostElement, evt);
    const ignoredElements = composedElements.some(el => (el as HTMLElement).matches(LIST_ITEM_CONSTANTS.selectors.IGNORE));
    if (ignoredElements) {
      return;
    }

    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.stopPropagation();
    }

    const isFromStartEndSlot = composedElements.some((el: HTMLElement) => el.matches(LIST_ITEM_CONSTANTS.selectors.SLOTTED_START_END));
    if (isFromStartEndSlot) {
      if (evt.key === 'Enter' || evt.key === ' ') {
        this._adapter.animateStateLayer();
      }
      if (evt.key === 'Enter') {
        this._adapter.interactiveElement?.click();
      }
      return;
    }

    if (evt.key === ' ') {
      evt.preventDefault();
      this._adapter.interactiveElement?.click();
    }
  }

  private _onClick(evt: MouseEvent): void {
    const composedElements = composedPathFrom(this._adapter.hostElement, evt);

    // Ignore clicks from elements that should not trigger selection
    const fromIgnoredElement = composedElements.some(el => (el as HTMLElement).matches(LIST_ITEM_CONSTANTS.selectors.IGNORE));
    if (fromIgnoredElement) {
      return;
    }

    // Ignore clicks from <label> elements that have a for attribute that matches our interactive elements' id
    const labelElementWithFor = (el: HTMLElement): el is HTMLLabelElement => el.matches('label[for]');
    const fromLabelFor = composedElements.filter(labelElementWithFor).some(el => el.htmlFor === this._adapter.interactiveElement?.id);
    if (fromLabelFor) {
      evt.stopPropagation();
      return;
    }

    // Check if our internal anchor was clicked and forward the click to the slotted interactive element
    const isInternalAnchor = (el: HTMLElement): el is HTMLAnchorElement => el.tagName === 'A' && el.id === LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR;
    const fromInternalAnchor = composedElements.some(isInternalAnchor);
    if (fromInternalAnchor) {
      const isCtrlClick = evt.ctrlKey || evt.metaKey;
      const hasTarget = this._adapter.interactiveElement?.hasAttribute('target');

      evt.preventDefault();
      evt.stopImmediatePropagation();

      // Workaround to temporarily set the target attribute to '_blank' if the user is holding the ctrl key and remove it after the click
      const forceTempAnchorTarget = isCtrlClick && !hasTarget;
      /* c8 ignore next 3 */
      if (forceTempAnchorTarget) {
        this._adapter.interactiveElement?.setAttribute('target', '_blank');
      }

      this._clickInteractiveElement();

      /* c8 ignore next 3 */
      if (forceTempAnchorTarget) {
        this._adapter.interactiveElement?.removeAttribute('target');
      }
      return;
    }

    // If the click did not originate from the interactive element, forward the click to it
    const fromInteractiveElement = composedElements.some(el => el === this._adapter.interactiveElement);
    if (!fromInteractiveElement) {
      evt.stopImmediatePropagation();
      this._clickInteractiveElement();
      return;
    }

    this._dispatchSelectEvent();
  }

  private _clickInteractiveElement(): void {
    if (this._focusPropagation === 'allow') {
      this._adapter.interactiveElement?.focus();
    }
    this._adapter.tempDeactivateFocusIndicator(); // Workaround until we can call `focus({ focusVisible: false })` to prevent focus ring from showing
    this._adapter.interactiveElement?.click();
  }

  private _onInteractiveStateChange(value: boolean): void {
    if (value && !this._noninteractive) {
      this._adapter.addRootListener('mousedown', this._mousedownListener, { capture: true });
      this._adapter.addHostListener('click', this._clickListener, { capture: true });
      this._adapter.addHostListener('keydown', this._keydownListener);
    } else {
      this._adapter.removeRootListener('mousedown', this._mousedownListener, { capture: true });
      this._adapter.removeHostListener('click', this._clickListener, { capture: true });
      this._adapter.removeHostListener('keydown', this._keydownListener);
    }
  }

  private _dispatchSelectEvent(): void {
    const detail: IListItemSelectEventData = { value: this._value };
    const event = new CustomEvent<IListItemSelectEventData>(LIST_ITEM_CONSTANTS.events.SELECT, {
      bubbles: true,
      detail
    });
    this._adapter.dispatchHostEvent(event);
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    value = Boolean(value);
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.SELECTED, this._selected);
    }
  }

  public get active(): boolean {
    return this._active;
  }
  public set active(value: boolean) {
    value = Boolean(value);
    if (this._active !== value) {
      this._active = value;
      this._adapter.setActive(this._active);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.ACTIVE, this._active);
    }
  }

  public get value(): unknown {
    return this._value;
  }
  public set value(value: unknown) {
    this._value = value;
    const isSelected = this._adapter.trySelect(this._value);
    if (isSelected !== null && isSelected !== this._selected) {
      this.selected = isSelected;
    }
  }

  public get dense(): boolean {
    return this._dense;
  }
  public set dense(value: boolean) {
    value = Boolean(value);
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get indented(): boolean {
    return this._indented;
  }
  public set indented(value: boolean) {
    value = Boolean(value);
    if (this._indented !== value) {
      this._indented = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.INDENTED, this._indented);
    }
  }

  public get twoLine(): boolean {
    return this._twoLine;
  }
  public set twoLine(value: boolean) {
    value = Boolean(value);
    if (this._twoLine !== value) {
      this._twoLine = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE, this._twoLine);
    }
  }

  public get threeLine(): boolean {
    return this._threeLine;
  }
  public set threeLine(value: boolean) {
    value = Boolean(value);
    if (this._threeLine !== value) {
      this._threeLine = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE, this._threeLine);
    }
  }

  public get wrap(): boolean {
    return this._wrap;
  }
  public set wrap(value: boolean) {
    value = Boolean(value);
    if (this._wrap !== value) {
      this._wrap = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP, this._wrap);
    }
  }

  public get noninteractive(): boolean {
    return this._noninteractive;
  }
  public set noninteractive(value: boolean) {
    value = Boolean(value);
    if (this._noninteractive !== value) {
      this._noninteractive = value;

      if (this._adapter.isConnected) {
        if (this._noninteractive) {
          this._adapter.destroyInteractiveObserver();
        } else {
          this._adapter.initializeInteractiveObserver(this._interactiveStateChangeListener);
        }
      }

      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.NONINTERACTIVE, this._noninteractive);
    }
  }

  public get focusPropagation(): ListItemFocusPropagation {
    return this._focusPropagation;
  }
  public set focusPropagation(value: ListItemFocusPropagation) {
    if (!['allow', 'off'].includes(value)) {
      value = LIST_ITEM_CONSTANTS.defaults.FOCUS_PROPAGATION;
    }
    if (this._focusPropagation !== value) {
      this._focusPropagation = value;
      this._adapter.toggleHostAttribute(
        LIST_ITEM_CONSTANTS.attributes.FOCUS_PROPAGATION,
        this._focusPropagation !== LIST_ITEM_CONSTANTS.defaults.FOCUS_PROPAGATION,
        this._focusPropagation
      );
    }
  }
}
