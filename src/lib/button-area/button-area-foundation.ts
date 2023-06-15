import { ICustomElementFoundation, getEventPath } from '@tylertech/forge-core';

import { IButtonAreaAdapter } from './button-area-adapter';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';

export interface IButtonAreaFoundation extends ICustomElementFoundation {
  disabled: boolean;
}

export class ButtonAreaFoundation implements IButtonAreaFoundation {
  private _disabled = false;
  private _clickListener: (event: Event) => void;
  private _pointerdownListener: (event: Event) => void;
  private _slotListener: () => void;

  constructor(private _adapter: IButtonAreaAdapter) {
    this._clickListener = event => this._handleClick(event);
    this._pointerdownListener = event => this._handlePointerdown(event);
    this._slotListener = () => this._handleSlotChange();
  }

  public initialize(): void {
    this._adapter.addListener('click', this._clickListener);
    this._adapter.addListener('pointerdown', this._pointerdownListener);
    this._adapter.addSlotChangeListener(this._slotListener);
    this._adapter.createRipple();
  }

  public disconnect(): void {
    this._adapter.removeListener('click', this._clickListener);
    this._adapter.removeSlotChangeListener(this._slotListener);
    this._adapter.stopButtonObserver();
  }

  private _handleClick(event: Event): void {
    // Prevent the click if disabled
    if (this._disabled) {
      event.stopPropagation();
    }

    // Prevent the click if a selection was made
    const selectionType = window.getSelection()?.type;
    if (selectionType === 'Range') {
      event.stopPropagation();
    }

    // Prevent the click if it originates from an ignored element
    if (this._shouldIgnoreEvent(event)) {
      event.stopPropagation();
    }
  }

  private _handlePointerdown(event: Event): void {
    if (this._disabled) {
      return;
    }

    // Prevent the ripple animation when ignored children are clicked
    if (this._shouldIgnoreEvent(event)) {
      this._adapter.requestDisabledButtonFrame();
    }
  }

  private _handleSlotChange(): void {
    // Clear old button-connected listeners
    this._adapter.stopButtonObserver();

    this._adapter.detectSlottedButton();
    this._adapter.startButtonObserver(() => this._handleButtonDisabled());

    // Match the component and button states if either is disabled
    if (this._adapter.buttonIsDisabled()) {
      this.disabled = true;
    } else if (this._disabled) {
      this._adapter.setDisabled(true);
    }
  }

  private _handleButtonDisabled(): void {
    this.disabled = this._adapter.buttonIsDisabled();
  }

  private _shouldIgnoreEvent(event: Event): boolean {
    const eventPath = getEventPath(event);
    return eventPath.some(el => el.nodeType === 1 && (el.hasAttribute(BUTTON_AREA_CONSTANTS.attributes.IGNORE) || el.hasAttribute(BUTTON_AREA_CONSTANTS.attributes.IGNORE_ALT)));
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(BUTTON_AREA_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }
}
