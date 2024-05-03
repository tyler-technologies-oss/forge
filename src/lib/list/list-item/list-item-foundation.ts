import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IListItemAdapter } from './list-item-adapter';
import { IListItemSelectEventData, LIST_ITEM_CONSTANTS } from './list-item-constants';

export interface IListItemFoundation extends ICustomElementFoundation {
  static: boolean;
  nonInteractive: boolean;
  disabled: boolean;
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
  private _nonInteractive = false;
  private _disabled = false;
  private _selected = false;
  private _active = false;
  private _value: unknown;
  private _dense = false;
  private _indented = false;
  private _twoLine = false;
  private _threeLine = false;
  private _wrap = false;

  private _clickListener: EventListener;
  private _keydownListener: EventListener;

  constructor(private _adapter: IListItemAdapter) {
    this._clickListener = this._onClick.bind(this);
    this._keydownListener = this._onKeydown.bind(this);
  }

  public initialize(): void {
    this._adapter.initialize();

    if (!this._nonInteractive && !this._disabled) {
      this._adapter.addHostListener('click', this._clickListener);
      this._adapter.addHostListener('keydown', this._keydownListener);
    }
  }

  public disconnect(): void {
    this._adapter.removeHostListener('click', this._clickListener);
    this._adapter.removeHostListener('keydown', this._keydownListener);
  }

  public click(): void {
    this._adapter.clickHost();
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter' || evt.key === ' ') {
      if (evt.target === this._adapter.hostElement || evt.key === 'Enter') {
        this._adapter.animateStateLayer();
      }
      if (evt.target === this._adapter.hostElement) {
        this._select(evt.target as HTMLElement);
      }
    }
  }

  private _onClick(event: MouseEvent): void {
    this._select(event.target as HTMLElement);
  }

  private _select(targetElement: HTMLElement): void {
    const ignoreElement = targetElement?.matches(LIST_ITEM_CONSTANTS.selectors.IGNORE);
    if (this._nonInteractive || this._disabled || ignoreElement) {
      return;
    }

    // If the target was not a checkbox or radio button, attempt to find one and toggle its checked state
    if (!targetElement.matches(LIST_ITEM_CONSTANTS.selectors.CHECKBOX_RADIO_SELECTOR) &&
        !targetElement.matches(LIST_ITEM_CONSTANTS.selectors.SWITCH_SELECTOR)) {
      this._adapter.tryToggleSelectionControl();
    }

    const detail: IListItemSelectEventData = {
      value: this._value
    };
    const event = new CustomEvent<IListItemSelectEventData>(LIST_ITEM_CONSTANTS.events.SELECT, { bubbles: true, detail });
    this._adapter.dispatchHostEvent(event);
  }

  public get static(): boolean {
    return this.nonInteractive;
  }
  public set static(value: boolean) {
    this.nonInteractive = value;
  }

  public get nonInteractive(): boolean {
    return this._nonInteractive;
  }
  public set nonInteractive(value: boolean) {
    if (this._nonInteractive !== value) {
      this._nonInteractive = value;
      if (this._nonInteractive) {
        this._adapter.removeHostListener('click', this._clickListener);
      } else {
        this._adapter.addHostListener('click', this._clickListener);
      }
      this._adapter.setNonInteractive(this._nonInteractive);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.STATIC, this._nonInteractive);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.NON_INTERACTIVE, this._nonInteractive);
    }
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._disabled) {
        this._adapter.removeHostListener('click', this._clickListener);
      } else {
        this._adapter.addHostListener('click', this._clickListener);
      }
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
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
    if (this._dense !== value) {
      this._dense = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.DENSE, this._dense);
    }
  }

  public get indented(): boolean {
    return this._indented;
  }
  public set indented(value: boolean) {
    if (this._indented !== value) {
      this._indented = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.INDENTED, this._indented);
    }
  }

  public get twoLine(): boolean {
    return this._twoLine;
  }
  public set twoLine(value: boolean) {
    if (this._twoLine !== value) {
      this._twoLine = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.TWO_LINE, this._twoLine);
    }
  }

  public get threeLine(): boolean {
    return this._threeLine;
  }
  public set threeLine(value: boolean) {
    if (this._threeLine !== value) {
      this._threeLine = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.THREE_LINE, this._threeLine);
    }
  }

  public get wrap(): boolean {
    return this._wrap;
  }
  public set wrap(value: boolean) {
    if (this._wrap !== value) {
      this._wrap = value;
      this._adapter.toggleHostAttribute(LIST_ITEM_CONSTANTS.attributes.WRAP, this._wrap);
    }
  }
}
