import { IKeyboardShortcutAdapter } from './keyboard-shortcut-adapter';
import { IKeyCombination, KEYBOARD_SHORTCUT_CONSTANTS, KeyboardShortcutActivateCallback } from './keyboard-shortcut-constants';
import { elementAcceptsTextInput, matchKeyCombination, parseKeyCombinations } from './keyboard-shortcut-utils';

export interface IKeyboardShortcutCore {
  key: string | null | undefined;
  target: string;
  global: boolean;
  allowWhileTyping: boolean;
  preventDefault: boolean;
  capture: boolean;
  useCode: boolean;
  disabled: boolean;
  activateCallback: KeyboardShortcutActivateCallback | null | undefined;
}

export class KeyboardShortcutCore implements IKeyboardShortcutCore {
  private _key: string | null | undefined;
  private _target: string;
  private _global = false;
  private _allowWhileTyping = false;
  private _preventDefault = true;
  private _capture = false;
  private _useCode = false;
  private _disabled = false;
  private _activateCallback: KeyboardShortcutActivateCallback | null | undefined;
  private _keyCombinations: IKeyCombination[] = [];
  private _keyDownListener: (evt: KeyboardEvent) => void;

  constructor(private _adapter: IKeyboardShortcutAdapter) {
    this._keyDownListener = evt => this._onKeyDown(evt);
  }

  public initialize(): void {
    this._initializeTargetElement();
    this._adapter.setHostStyles();
  }

  public destroy(): void {
    this._disconnectTargetElement();
    this._adapter.destroy();
  }

  private _initializeTargetElement(): void {
    this._disconnectTargetElement();
    this._adapter.setTargetElement(this._target, this._global);

    if (!this._adapter.hasTargetElement()) {
      throw new Error('Unable to locate the target element.');
    }

    if (!this._disabled) {
      this._connectTargetElement();
    }
  }

  private _connectTargetElement(): void {
    if (!this._adapter.hasTargetElement) {
      return;
    }
    this._adapter.addTargetEventListener('keydown', this._keyDownListener, this._capture);
  }

  private _disconnectTargetElement(): void {
    if (!this._adapter.hasTargetElement) {
      return;
    }
    this._adapter.removeTargetEventListener('keydown', this._keyDownListener, this._capture);
  }

  private _onKeyDown(evt: KeyboardEvent): void {
    // Here we may check if the target element is disabled, but disabled elements typically can't receive focus anyway

    // Ignore the event if it originates from a text field
    // TODO: bypass this and allow it if a modifier key is used?
    if (!this._allowWhileTyping && elementAcceptsTextInput(evt.target)) {
      return;
    }

    if (matchKeyCombination(evt, this._keyCombinations, this._useCode)) {
      if (this._preventDefault) {
        evt.preventDefault();
      }
      this._adapter.emitHostEvent(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, evt);
      this._activateCallback?.call(null, evt);
    }
  }

  /** Sets the key combinations. */
  private _setKeyCombinations(): void {
    this._keyCombinations = parseKeyCombinations(this._key, this._useCode);
  }

  /** Gets/sets the key binding. */
  public get key(): string | null | undefined {
    return this._key;
  }
  public set key(value: string | null | undefined) {
    if (this._key !== value) {
      this._key = value;
      this._adapter.toggleHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.KEY, !!this.key, this._key || '');
      this._setKeyCombinations();
    }
    // TODO: prevent multiple shortcuts with the same keys on an element (possible?)
  }

  /** Gets/sets the target element selector. */
  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value;
      this._adapter.setHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.TARGET, this._target);
      if (this._adapter.isConnected) {
        this._initializeTargetElement();
      }
    }
  }

  /** Gets/sets the global listener state. */
  public get global(): boolean {
    return this._global;
  }
  public set global(value: boolean) {
    if (this._global !== value) {
      this._global = value;
      this._adapter.toggleHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.GLOBAL, this._global);
      if (this._adapter.isConnected) {
        this._initializeTargetElement();
      }
    }
  }

  /** Gets/sets whether the callback will be trigger while a text input has focus. */
  public get allowWhileTyping(): boolean {
    return this._allowWhileTyping;
  }
  public set allowWhileTyping(value: boolean) {
    if (this._allowWhileTyping !== value) {
      this._allowWhileTyping = value;
      this._adapter.toggleHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.ALLOW_WHILE_TYPING, this._allowWhileTyping);
    }
  }

  /** Gets/sets whether to prevent default on keyboard events. */
  public get preventDefault(): boolean {
    return this._preventDefault;
  }
  public set preventDefault(value: boolean) {
    if (this._preventDefault !== value) {
      this._preventDefault = value;
      this._adapter.toggleHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.PREVENT_DEFAULT, this._preventDefault);
    }
  }

  /** Gets/sets whether to use capturing on keyboard events. */
  public get capture(): boolean {
    return this._capture;
  }
  public set capture(value: boolean) {
    if (this._capture !== value) {
      this._disconnectTargetElement(); // We need to disconnect first to ensure our listener is removed properly based on capturing state
      this._capture = value;
      this._adapter.toggleHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.CAPTURE, this.capture);
      this._connectTargetElement();
    }
  }

  /** Gets/sets whether to match codes instead of keys on keyboard events. */
  public get useCode(): boolean {
    return this._useCode;
  }
  public set useCode(value: boolean) {
    if (this._useCode !== value) {
      this._useCode = value;
      this._adapter.toggleHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.USE_CODE, this._useCode);
      this._setKeyCombinations();
    }
  }

  /** Gets/sets whether the event will be emitted. */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.toggleHostAttribute(KEYBOARD_SHORTCUT_CONSTANTS.attributes.DISABLED, this._disabled);

      if (this._disabled) {
        this._disconnectTargetElement();
      } else {
        this._connectTargetElement();
      }
    }
  }

  /** Gets/sets the activation callback. */
  public get activateCallback(): KeyboardShortcutActivateCallback | null | undefined {
    return this._activateCallback;
  }
  public set activateCallback(value: KeyboardShortcutActivateCallback | null | undefined) {
    this._activateCallback = value;
  }
}
