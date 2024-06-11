import { ICustomElementCore } from '@tylertech/forge-core';

import { ITabAdapter } from './tab-adapter';
import { TAB_CONSTANTS } from './tab-constants';

export interface ITabCore extends ICustomElementCore {
  disabled: boolean;
  selected: boolean;
  vertical: boolean;
  stacked: boolean;
  secondary: boolean;
  inverted: boolean;
}

export class TabCore implements ITabCore {
  // State
  private _selected = false;
  private _disabled = false;
  private _vertical = false;
  private _stacked = false;
  private _secondary = false;
  private _inverted = false;

  // Listeners
  private _clickListener: EventListener;
  private _keydownListener: EventListener;

  constructor(private _adapter: ITabAdapter) {
    this._clickListener = () => this._onClick();
    this._keydownListener = (evt: KeyboardEvent) => this._onKeydown(evt);
  }

  public initialize(): void {
    this._adapter.initialize();
    this._adapter.addInteractionListener('click', this._clickListener);
    this._adapter.addInteractionListener('keydown', this._keydownListener);
  }

  private _onClick(): void {
    if (this._disabled || this._selected) {
      return;
    }
    this._dispatchSelectEvent();
  }

  private _onKeydown(evt: KeyboardEvent): void {
    if (this._disabled || this._selected) {
      return;
    }

    const isSelectionKey = evt.key === ' ' || evt.key === 'Enter';
    if (isSelectionKey) {
      evt.preventDefault();
      this._adapter.animateStateLayer();
      this._dispatchSelectEvent();
    }
  }

  private _dispatchSelectEvent(): void {
    this._adapter.dispatchHostEvent(new CustomEvent(TAB_CONSTANTS.events.SELECT, { bubbles: true, composed: true }));
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get selected(): boolean {
    return this._selected;
  }
  public set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      this._adapter.setSelected(this._selected);
      this._adapter.animateSelected();
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.SELECTED, this._selected);
    }
  }

  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    if (this._vertical !== value) {
      this._vertical = value;
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.VERTICAL, this._vertical);
    }
  }

  public get stacked(): boolean {
    return this._stacked;
  }
  public set stacked(value: boolean) {
    if (this._stacked !== value) {
      this._stacked = value;
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.STACKED, this._stacked);
    }
  }

  public get secondary(): boolean {
    return this._secondary;
  }
  public set secondary(value: boolean) {
    if (this._secondary !== value) {
      this._secondary = value;
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.SECONDARY, this._secondary);
    }
  }

  public get inverted(): boolean {
    return this._inverted;
  }
  public set inverted(value: boolean) {
    if (this._inverted !== value) {
      this._inverted = value;
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.INVERTED, this._inverted);
    }
  }
}
