import { coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';

import { KeyboardShortcutAdapter } from './keyboard-shortcut-adapter';
import { KeyboardShortcutCore } from './keyboard-shortcut-core';
import { KEYBOARD_SHORTCUT_CONSTANTS, KeyboardShortcutActivateCallback } from './keyboard-shortcut-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { Nullable } from '../core';

export interface IKeyboardShortcutComponent extends IBaseComponent {
  key: Nullable<string>;
  keyBinding: Nullable<string>;
  target: string;
  global: boolean;
  allowWhileTyping: boolean;
  preventDefault: boolean;
  capture: boolean;
  useCode: boolean;
  disabled: boolean;
  activateCallback: Nullable<KeyboardShortcutActivateCallback>;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-keyboard-shortcut': IKeyboardShortcutComponent;
  }

  interface HTMLElementEventMap {
    'forge-keyboard-shortcut-activate': CustomEvent<KeyboardEvent>;
  }
}

/**
 * @tag forge-keyboard-shortcut
 *
 * @event {CustomEvent<KeyboardEvent>} forge-keyboard-shortcut-activate - Event fired when the keyboard shortcut is activated.
 */
@customElement({
  name: KEYBOARD_SHORTCUT_CONSTANTS.elementName
})
export class KeyboardShortcutComponent extends BaseComponent implements IKeyboardShortcutComponent {
  public static get observedAttributes(): string[] {
    return Object.values(KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes);
  }

  private _core: KeyboardShortcutCore;

  constructor() {
    super();
    this._core = new KeyboardShortcutCore(new KeyboardShortcutAdapter(this));
  }

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.KEY:
        this.key = newValue;
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.TARGET:
        this.target = newValue;
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.GLOBAL:
        this.global = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.ALLOW_WHILE_TYPING:
        this.allowWhileTyping = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.PREVENT_DEFAULT:
        this.preventDefault = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.CAPTURE:
        this.capture = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.USE_CODE:
        this.useCode = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.observedAttributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  /**
   * Gets/sets the key binding.
   * @attribute
   */
  @coreProperty()
  declare public key: Nullable<string>;

  /**
   * Alias for key.
   * @attribute key-binding
   *
   */
  public get keyBinding(): Nullable<string> {
    return this.key;
  }
  public set keyBinding(value: Nullable<string>) {
    this.key = value;
  }

  /**
   * Gets/sets the target element selector.
   * @attribute
   */
  @coreProperty()
  declare public target: string;

  /**
   * Gets/sets the global listener state.
   * @attribute
   */
  @coreProperty()
  declare public global: boolean;

  /**
   * Gets/sets whether the callback will be called while in a text entry field.
   * @attribute allow-while-typing
   * @default false
   */
  @coreProperty()
  declare public allowWhileTyping: boolean;

  /**
   * Gets/sets whether to prevent default on keyboard events
   * @attribute prevent-default
   * @default true
   */
  @coreProperty()
  declare public preventDefault: boolean;

  /**
   * Gets/sets whether to use capturing on keyboard events
   * @attribute
   * @default false
   */
  @coreProperty()
  declare public capture: boolean;

  /**
   * Gets/sets whether to match codes instead of keys on keyboard events.
   * @attribute use-code
   * @default false
   */
  @coreProperty()
  declare public useCode: boolean;

  /**
   * Gets/sets whether the callback will be called.
   * @attribute
   * @default false
   */
  @coreProperty()
  declare public disabled: boolean;

  /**
   * Gets/sets whether the activation callback.
   */
  @coreProperty()
  declare public activateCallback: Nullable<KeyboardShortcutActivateCallback>;
}
