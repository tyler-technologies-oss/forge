import { ICustomElementFoundation } from '@tylertech/forge-core';
import { IListItemAdapter } from './list-item-adapter';
import { IListItemSelectEventData, LIST_ITEM_CONSTANTS } from './list-item-constants';

export interface IListItemFoundation extends ICustomElementFoundation {
  selected: boolean;
  active: boolean;
  value: unknown;
  dense: boolean;
  indented: boolean;
  twoLine: boolean;
  threeLine: boolean;
  wrap: boolean;
}

export class ListItemFoundation implements IListItemFoundation {
  private _selected = false;
  private _active = false;
  private _value: unknown;
  private _dense = false;
  private _indented = false;
  private _twoLine = false;
  private _threeLine = false;
  private _wrap = false;

  private _interactiveStateChangeListener: (value: boolean) => void = this._onInteractiveStateChange.bind(this);
  private _clickListener: EventListener = this._onClick.bind(this);
  private _keydownListener: EventListener = this._onKeydown.bind(this);

  constructor(private _adapter: IListItemAdapter) {}

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.setInteractiveStateChangeListener(this._interactiveStateChangeListener);
  }

  public disconnect(): void {
    this._adapter.destroy();
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === ' ') {
      evt.preventDefault();
      this._adapter.animateStateLayer();
      this._adapter.interactiveElement?.click();
    }
  }

  private _onClick(event: MouseEvent): void {
    const isElementNode = (el: Element): el is HTMLElement => el.nodeType === Node.ELEMENT_NODE;
    const composedPath =  event.composedPath().filter(isElementNode);

    // Ignore clicks from elements that should not trigger selection
    const fromIgnoredElement = composedPath.some(el => (el as HTMLElement).matches(LIST_ITEM_CONSTANTS.selectors.IGNORE));
    if (fromIgnoredElement) {
      return;
    }

    // Check if our internal anchor was clicked and forward the click to the slotted interactive element
    const isInternalAnchor = (el: HTMLElement): el is HTMLAnchorElement => el.tagName === 'A' && el.id === LIST_ITEM_CONSTANTS.ids.INTERNAL_ANCHOR;
    const fromInternalAnchor = composedPath.filter(isElementNode).some(isInternalAnchor);
    if (fromInternalAnchor) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this._adapter.interactiveElement?.focus();
      this._adapter.interactiveElement?.click();
      return;
    }

    // If the click did not originate from the interactive element, forward the click to it
    const fromInteractiveElement = composedPath.some(el => el === this._adapter.interactiveElement);
    if (!fromInteractiveElement) {
      event.preventDefault();
      event.stopImmediatePropagation();
      this._adapter.interactiveElement?.focus();
      this._adapter.interactiveElement?.click();
      return;
    }

    this._select(event.target as HTMLElement);
  }

  private _onInteractiveStateChange(value: boolean): void {
    if (value) {
      this._adapter.addHostListener('click', this._clickListener, { capture: true });
      this._adapter.addHostListener('keydown', this._keydownListener);
    } else {
      this._adapter.removeHostListener('click', this._clickListener, { capture: true });
      this._adapter.removeHostListener('keydown', this._keydownListener);
    }
  }

  private _select(targetElement: HTMLElement): void {
    const ignoreElement = targetElement?.matches(LIST_ITEM_CONSTANTS.selectors.IGNORE);
    if (ignoreElement) {
      return;
    }

    // If the target was not a checkbox or radio button, attempt to find one and toggle its checked state
    if (!targetElement.matches(LIST_ITEM_CONSTANTS.selectors.CHECKBOX_RADIO_SELECTOR) &&
        !targetElement.matches(LIST_ITEM_CONSTANTS.selectors.SWITCH_SELECTOR)) {
      this._adapter.tryToggleSelectionControl();
    }

    const detail: IListItemSelectEventData = { value: this._value };
    const event = new CustomEvent<IListItemSelectEventData>(LIST_ITEM_CONSTANTS.events.SELECT, { bubbles: true, detail });
    this._adapter.dispatchHostEvent(event);
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    value = Boolean(value);
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.tryToggleSelectionControl(this._selected);
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
}
