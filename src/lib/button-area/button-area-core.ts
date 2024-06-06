import { ICustomElementCore, getEventPath } from '@tylertech/forge-core';

import { IButtonAreaAdapter } from './button-area-adapter';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';

export interface IButtonAreaCore extends ICustomElementCore {
  disabled: boolean;
}

export class ButtonAreaCore implements IButtonAreaCore {
  private _disabled = false;
  private _clickListener = this._handleClick.bind(this);
  private _keydownListener = this._handleKeydown.bind(this);
  private _pointerdownListener = this._handlePointerdown.bind(this);
  private _ignoreStateLayerListener = this._handleIgnoreStateLayer.bind(this);
  private _slotListener = this._handleSlotChange.bind(this);

  constructor(private _adapter: IButtonAreaAdapter) {}

  public initialize(): void {
    this._adapter.addListener('click', this._clickListener);
    this._adapter.addListener('keydown', this._keydownListener);
    this._adapter.addListener('pointerdown', this._pointerdownListener);
    this._adapter.addContentSlotListener('click', this._ignoreStateLayerListener.bind(this));
    this._adapter.addContentSlotListener('pointerdown', this._ignoreStateLayerListener.bind(this));
    this._adapter.addContentSlotListener('pointerup', this._ignoreStateLayerListener.bind(this));
    this._adapter.addButtonSlotListener('slotchange', this._slotListener);
  }

  public disconnect(): void {
    this._adapter.removeListener('click', this._clickListener);
    this._adapter.removeListener('keydown', this._keydownListener);
    this._adapter.removeListener('pointerdown', this._pointerdownListener);
    this._adapter.removeContentSlotListener('click', this._ignoreStateLayerListener.bind(this));
    this._adapter.removeContentSlotListener('pointerdown', this._ignoreStateLayerListener.bind(this));
    this._adapter.removeContentSlotListener('pointerup', this._ignoreStateLayerListener.bind(this));
    this._adapter.removeButtonSlotListener('slotchange', this._slotListener);
    this._adapter.destroy();
    this._adapter.stopButtonObserver();
  }

  private _handleClick(event: Event): void {
    // Prevent the click if disabled
    if (this._disabled) {
      event.stopPropagation();
    }

    // Prevent the click if a selection was made
    const selection = window.getSelection();
    if (selection?.type === 'Range' && selection?.toString().trim() !== '') {
      event.stopPropagation();
    }

    // Prevent the click if it originates from an ignored element
    if (this._shouldIgnoreEvent(event)) {
      event.stopPropagation();
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.key !== ' ' && event.key !== 'Enter') {
      return;
    }

    // Prevent the keydown if it originates from an ignored element
    if (this._shouldIgnoreEvent(event)) {
      event.stopPropagation();
    } else {
      this._adapter.animateStateLayer();
    }
  }

  private _handlePointerdown(event: Event): void {
    if (this._disabled) {
      return;
    }

    // Prevent the pointerdown if it originates from an ignored element
    if (this._shouldIgnoreEvent(event)) {
      this._adapter.requestDisabledButtonFrame();
    }
  }

  private _handleIgnoreStateLayer(event: Event): void {
    if (this._disabled) {
      return;
    }

    // Prevent the state layer animation if the event originates from an ignored element
    if (this._shouldIgnoreEvent(event)) {
      event.stopPropagation();
    }
  }

  private _handleSlotChange(): void {
    // Clear old button-connected listeners
    this._adapter.stopButtonObserver();

    this._adapter.detectSlottedButton();
    this._adapter.startButtonObserver(() => this._handleButtonDisabled());

    // Match the component and button states if either is disabled
    if (this._adapter.isButtonDisabled()) {
      this.disabled = true;
    } else if (this._disabled) {
      this._adapter.setDisabled(true);
    }
  }

  private _handleButtonDisabled(): void {
    this.disabled = this._adapter.isButtonDisabled();
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
