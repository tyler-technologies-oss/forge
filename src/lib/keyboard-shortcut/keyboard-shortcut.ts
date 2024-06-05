import { coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';

import { KeyboardShortcutAdapter } from './keyboard-shortcut-adapter';
import { KeyboardShortcutFoundation } from './keyboard-shortcut-foundation';
import { KEYBOARD_SHORTCUT_CONSTANTS, KeyboardShortcutActivateCallback } from './keyboard-shortcut-constants';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';

export interface IKeyboardShortcutComponent extends IBaseComponent {
  key: string | null | undefined;
  keyBinding: string | null | undefined;
  target: string;
  global: boolean;
  allowWhileTyping: boolean;
  preventDefault: boolean;
  capture: boolean;
  useCode: boolean;
  disabled: boolean;
  activateCallback: KeyboardShortcutActivateCallback | null | undefined;
}

declare global {
  // tslint:disable-next-line: interface-name
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
@CustomElement({
  name: KEYBOARD_SHORTCUT_CONSTANTS.elementName
})
export class KeyboardShortcutComponent extends BaseComponent implements IKeyboardShortcutComponent {
  public static get observedAttributes(): string[] {
    return [
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.KEY,
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.TARGET,
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.GLOBAL,
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.ALLOW_WHILE_TYPING,
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.PREVENT_DEFAULT,
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.CAPTURE,
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.USE_CODE,
      KEYBOARD_SHORTCUT_CONSTANTS.attributes.DISABLED
    ];
  }

  private _foundation: KeyboardShortcutFoundation;

  constructor() {
    super();
    this._foundation = new KeyboardShortcutFoundation(new KeyboardShortcutAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.disconnect();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.KEY:
        this.key = newValue;
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.TARGET:
        this.target = newValue;
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.GLOBAL:
        this.global = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.ALLOW_WHILE_TYPING:
        this.allowWhileTyping = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.PREVENT_DEFAULT:
        this.preventDefault = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.CAPTURE:
        this.capture = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.USE_CODE:
        this.useCode = coerceBoolean(newValue);
        break;
      case KEYBOARD_SHORTCUT_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  /**
   * Gets/sets the key binding.
   * @attribute
   */
  @FoundationProperty()
  public declare key: string | null | undefined;

  /**
   * Alias for key.
   * @attribute key-binding
   * 
   */
  public get keyBinding(): string | null | undefined {
    return this.key;
  }
  public set keyBinding(value: string | null | undefined) {
    this.key = value;
  }

  /**
   * Gets/sets the target element selector.
   * @attribute
   */
  @FoundationProperty()
  public declare target: string;

  /**
   * Gets/sets the global listener state.
   * @attribute
   */
  @FoundationProperty()
  public declare global: boolean;

  /**
   * Gets/sets whether the callback will be called while in a text entry field.
   * @attribute allow-while-typing
   * @default false
   */
  @FoundationProperty()
  public declare allowWhileTyping: boolean;
  
  /**
   * Gets/sets whether to prevent default on keyboard events
   * @attribute prevent-default
   * @default true
   */
  @FoundationProperty()
  public declare preventDefault: boolean;
  
  /**
   * Gets/sets whether to use capturing on keyboard events
   * @attribute
   * @default false
   */
  @FoundationProperty()
  public declare capture: boolean;
  
  /**
   * Gets/sets whether to match codes instead of keys on keyboard events.
   * @attribute use-code
   * @default false
   */
  @FoundationProperty()
  public declare useCode: boolean;

  /**
   * Gets/sets whether the callback will be called.
   * @attribute
   * @default false
   */
  @FoundationProperty()
  public declare disabled: boolean;

  /**
   * Gets/sets whether the activation callback.
   */
  @FoundationProperty()
  public declare activateCallback: KeyboardShortcutActivateCallback | null | undefined;
}
