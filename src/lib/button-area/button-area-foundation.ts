import { ICustomElementFoundation, getEventPath } from '@tylertech/forge-core';

import { IButtonAreaAdapter } from './button-area-adapter';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';

export interface IButtonAreaFoundation extends ICustomElementFoundation {
  disabled: boolean;
}

export class ButtonAreaFoundation implements IButtonAreaFoundation {
  private _disabled = false;
  private _attached = false;
  private _deferred = true;
  private _clickListener: (event: Event) => void;
  private _keydownListener: (event: KeyboardEvent) => void;
  private _pointerdownListener: (event: Event) => void;
  private _ignoreStateLayerListener: (event: Event) => void;
  private _slotListener: () => void;

  constructor(private _adapter: IButtonAreaAdapter) {
    this._clickListener = event => this._handleClick(event);
    this._keydownListener = event => this._handleKeydown(event);
    this._pointerdownListener = event => this._handlePointerdown(event);
    this._ignoreStateLayerListener = event => this._handleIgnoreStateLayer(event);
    this._slotListener = () => this._handleSlotChange();
  }

  public initialize(): void {
    this._adapter.addButtonSlotListener('slotchange', this._slotListener);

    // Clicks could be triggered programmatically so we need to listen for them regardless
    this._adapter.addListener('click', this._clickListener);

    // We defer initialization until the first pointerenter event is received.
    //
    // This is a performance optimization to avoid attaching many listeners to the target element
    // until the user is first interacting with it.
    this._deferInitialization();
  }

  public disconnect(): void {
    this._removeListeners();
    this._adapter.destroy();
    this._adapter.stopButtonObserver();
  }

  private _deferInitialization(): void {
    this._adapter.deferInitialization(this._onDeferredInitialize.bind(this));
  }

  private _applyListeners(): void {
    if (this._disabled) {
      return;
    }

    this._adapter.addListener('keydown', this._keydownListener);
    this._adapter.addListener('pointerdown', this._pointerdownListener);
    this._adapter.addContentListener('click', this._ignoreStateLayerListener.bind(this));
    this._adapter.addContentListener('pointerdown', this._ignoreStateLayerListener.bind(this));
    this._adapter.addContentListener('pointerup', this._ignoreStateLayerListener.bind(this));
    this._attached = true;
  }

  private _removeListeners(): void {
    this._adapter.removeListener('click', this._clickListener);
    this._adapter.removeListener('keydown', this._keydownListener);
    this._adapter.removeListener('pointerdown', this._pointerdownListener);
    this._adapter.removeContentListener('click', this._ignoreStateLayerListener.bind(this));
    this._adapter.removeContentListener('pointerdown', this._ignoreStateLayerListener.bind(this));
    this._adapter.removeContentListener('pointerup', this._ignoreStateLayerListener.bind(this));
    this._adapter.removeButtonSlotListener('slotchange', this._slotListener);
    this._attached = false;
  }

  private _onDeferredInitialize(event?: PointerEvent): void {
    if (!this._adapter.isConnected) {
      return;
    }

    this._applyListeners();
    this._deferred = false;
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

  public get isAttached(): boolean {
    return this._attached;
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;

      if (this._adapter.isConnected) {
        if (this._disabled) {
          this._removeListeners();
        } else if (!this._deferred) {
          this._deferInitialization();
        }
      }

      this._adapter.setDisabled(this._disabled);
      this._adapter.toggleHostAttribute(BUTTON_AREA_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }
}
