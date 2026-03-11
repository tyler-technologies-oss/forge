import { CUSTOM_ELEMENT_NAME_PROPERTY, matchesSelectors } from '@tylertech/forge-core';
import { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { IKeyCombination, KEYBOARD_SHORTCUT_CONSTANTS, KeyboardShortcutActivateCallback } from './keyboard-shortcut-constants.js';
import { elementAcceptsTextInput, matchKeyCombination, parseKeyCombinations } from './keyboard-shortcut-utils.js';

/** @deprecated This will be removed in the future. Please switch to using KeyboardShortcutComponent. */
export interface IKeyboardShortcutComponent extends BaseLitElement {
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

/**
 * @tag forge-keyboard-shortcut
 *
 * @summary A utility component that listens for keyboard shortcut combinations and triggers callbacks or events when the specified key bindings are activated.
 *
 * @event {CustomEvent<KeyboardEvent>} forge-keyboard-shortcut-activate - Event fired when the keyboard shortcut is activated.
 */
@customElement(KEYBOARD_SHORTCUT_CONSTANTS.elementName)
export class KeyboardShortcutComponent extends BaseLitElement implements IKeyboardShortcutComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = KEYBOARD_SHORTCUT_CONSTANTS.elementName;

  // TODO: Remove attribute reflection

  /**
   * Gets/sets the key binding.
   * @attribute
   */
  @property({ reflect: true })
  public key: string | null | undefined;

  /**
   * Alias for `key`.
   */
  public get keyBinding(): typeof this.key {
    return this.key;
  }
  public set keyBinding(value: typeof this.key) {
    this.key = value;
  }

  /**
   * Gets/sets the target element selector.
   * @attribute
   */
  @property({ reflect: true })
  public target = '';

  /**
   * Gets/sets the global listener state.
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public global = false;

  /**
   * Gets/sets whether the callback will be called while in a text entry field.
   * @default false
   * @attribute allow-while-typing
   */
  @property({ type: Boolean, reflect: true, attribute: 'allow-while-typing' })
  public allowWhileTyping = false;

  /**
   * Gets/sets whether to prevent default on keyboard events.
   * @default true
   * @attribute prevent-default
   */
  @property({ type: Boolean, reflect: true, attribute: 'prevent-default' })
  public preventDefault = true;

  /**
   * Gets/sets whether to use capturing on keyboard events.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public capture = false;

  /**
   * Gets/sets whether to match codes instead of keys on keyboard events.
   * @default false
   * @attribute use-code
   */
  @property({ type: Boolean, reflect: true, attribute: 'use-code' })
  public useCode = false;

  /**
   * Gets/sets whether the callback will be called.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Gets/sets the activation callback.
   */
  @property({ attribute: false })
  public activateCallback: KeyboardShortcutActivateCallback | null | undefined;

  #targetElement: HTMLElement | null = null;
  #keyCombinations: IKeyCombination[] = [];
  #keyDownListener: (evt: KeyboardEvent) => void = evt => this.#handleKeyDown(evt);

  public override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.style.display = 'none';
    this.#tryInitializeTargetElement();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#disconnectTargetElement();
    this.#targetElement = null;
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('key') || changedProperties.has('useCode')) {
      this.#keyCombinations = parseKeyCombinations(this.key, this.useCode);
    }
    if (changedProperties.has('target') || changedProperties.has('global')) {
      this.#tryInitializeTargetElement();
    }
    if (changedProperties.has('capture')) {
      const oldCapture = changedProperties.get('capture');
      this.#disconnectTargetElement(oldCapture);
      this.#connectTargetElement();
    }
    if (changedProperties.has('disabled')) {
      if (this.disabled) {
        this.#disconnectTargetElement();
      } else {
        this.#connectTargetElement();
      }
    }
  }

  #tryInitializeTargetElement(): void {
    if (!this.isConnected) {
      return;
    }

    this.#disconnectTargetElement();
    this.#setTargetElement();

    if (!this.#targetElement) {
      console.error('[forge-keyboard-shortcut]: Unable to locate the target element.');
      return;
    }

    if (!this.disabled) {
      this.#connectTargetElement();
    }
  }

  #setTargetElement(): void {
    if (this.global) {
      this.#targetElement = (this.ownerDocument ?? document).documentElement;
      return;
    }

    if (this.target) {
      if (this.parentElement) {
        if (matchesSelectors(this.parentElement, this.target)) {
          this.#targetElement = this.parentElement;
          return;
        }
        this.#targetElement = this.parentElement.querySelector(this.target);
        return;
      }
    } else {
      let sibling = this.previousElementSibling;
      while (sibling) {
        if (!matchesSelectors(sibling, KEYBOARD_SHORTCUT_CONSTANTS.selectors.TOOLTIP)) {
          this.#targetElement = sibling as HTMLElement;
          return;
        }
        sibling = sibling.previousElementSibling;
      }
      this.#targetElement = this.parentElement;
    }
  }

  #connectTargetElement(): void {
    this.#targetElement?.addEventListener('keydown', this.#keyDownListener, { capture: this.capture });
  }

  #disconnectTargetElement(capture = this.capture): void {
    this.#targetElement?.removeEventListener('keydown', this.#keyDownListener, { capture });
  }

  #handleKeyDown(evt: KeyboardEvent): void {
    if (!this.allowWhileTyping && elementAcceptsTextInput(evt.target)) {
      return;
    }

    if (matchKeyCombination(evt, this.#keyCombinations, this.useCode)) {
      if (this.preventDefault) {
        evt.preventDefault();
      }
      this.dispatchEvent(new CustomEvent(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, { detail: evt, bubbles: true }));
      this.activateCallback?.call(null, evt);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-keyboard-shortcut': IKeyboardShortcutComponent;
  }

  interface HTMLElementEventMap {
    'forge-keyboard-shortcut-activate': CustomEvent<KeyboardEvent>;
  }
}
