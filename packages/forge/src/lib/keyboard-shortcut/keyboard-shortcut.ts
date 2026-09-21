import { CUSTOM_ELEMENT_NAME_PROPERTY, matchesSelectors, tryDefine } from '@tylertech/forge-core';
import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { locateElementById } from '../core/utils/utils.js';
import { KEYBOARD_SHORTCUT_CONSTANTS, WARNING_PREFIX, KeyboardShortcutActivateCallback } from './keyboard-shortcut-constants.js';
import type { KeyboardShortcutAnchorAccessibility, IKeyboardShortcutRegistration } from './keyboard-shortcut-constants.js';
import { registerKeyboardShortcut } from './keyboard-shortcut-registry.js';
import { findScopeMarker, formatAriaKeyShortcuts } from './keyboard-shortcut-utils.js';

/** @deprecated This will be removed in the future. Please switch to using KeyboardShortcutComponent. */
export interface IKeyboardShortcutComponent extends BaseLitElement {
  key: string | null | undefined;
  keyBinding: string | null | undefined;
  anchor: string | null;
  anchorElement: HTMLElement | null;
  scope: string | null;
  scopeElement: HTMLElement | null;
  /** @deprecated Use anchor and scope instead. */
  target: string;
  global: boolean;
  allowWhileTyping: boolean;
  allowRepeat: boolean;
  fallthrough: boolean;
  preventDefault: boolean;
  capture: boolean;
  useCode: boolean;
  disabled: boolean;
  anchorAccessibility: KeyboardShortcutAnchorAccessibility;
  activateCallback: KeyboardShortcutActivateCallback | null | undefined;
}

/**
 * @tag forge-keyboard-shortcut
 *
 * @summary A utility component that listens for keyboard shortcut combinations and triggers callbacks or events when the specified key bindings are activated.
 *
 * @event {CustomEvent<KeyboardEvent>} forge-keyboard-shortcut-activate - Event fired when the keyboard shortcut is activated.
 */
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
   * Gets/sets the id of the anchor element in the shortcut's root node.
   * @default null
   * @attribute
   */
  @property()
  public anchor: string | null = null;

  /**
   * Gets/sets the name of an ancestor scope marker.
   * @default null
   * @attribute
   */
  @property()
  public scope: string | null = null;

  /**
   * Gets/sets the target element selector.
   * @deprecated Use anchor and scope instead.
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
   * Gets/sets whether held-key repeat events activate the shortcut.
   * @default false
   * @attribute allow-repeat
   */
  @property({ type: Boolean, attribute: 'allow-repeat' })
  public allowRepeat = false;

  /**
   * Gets/sets whether the shortcut allows outer scopes to also handle the key.
   * @default false
   * @attribute
   */
  @property({ type: Boolean })
  public fallthrough = false;

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
   * Gets/sets whether aria-keyshortcuts is automatically set on the anchor.
   * @default 'auto'
   * @attribute anchor-accessibility
   */
  @property({ attribute: 'anchor-accessibility' })
  public anchorAccessibility: KeyboardShortcutAnchorAccessibility = 'auto';

  /**
   * Gets/sets the activation callback.
   */
  @property({ attribute: false })
  public activateCallback: KeyboardShortcutActivateCallback | null | undefined;

  #explicitAnchorElement: HTMLElement | null = null;
  #resolvedAnchorElement: HTMLElement | null = null;

  /**
   * Gets/sets the anchor element directly.
   * @default null
   */
  @property({ attribute: false })
  public set anchorElement(value: HTMLElement | null) {
    this.#explicitAnchorElement = value;
  }
  public get anchorElement(): HTMLElement | null {
    const result = this.#explicitAnchorElement ?? this.#resolvedAnchorElement;
    if (!result && this.isConnected) {
      this.#resolveAnchor();
      return this.#explicitAnchorElement ?? this.#resolvedAnchorElement;
    }
    return result;
  }

  #explicitScopeElement: HTMLElement | null = null;
  #resolvedScopeElement: Element | null = null;

  /**
   * Gets/sets the scope element directly.
   * @default null
   */
  @property({ attribute: false })
  public set scopeElement(value: HTMLElement | null) {
    this.#explicitScopeElement = value;
  }
  public get scopeElement(): HTMLElement | null {
    const result = this.#explicitScopeElement ?? this.#resolvedScopeElement;
    if (!result && this.isConnected) {
      this.#resolveScope();
      return (this.#explicitScopeElement ?? this.#resolvedScopeElement) as HTMLElement | null;
    }
    return result as HTMLElement | null;
  }

  #registration: IKeyboardShortcutRegistration | null = null;
  #anchorNeedsLateResolve = false;
  #anchorWarned = false;
  #scopeWarned = false;
  #ariaSetByThis = false;
  #ariaAnchor: HTMLElement | null = null;

  public override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.style.display = 'none';
    this.#resolveAnchor();
    this.#resolveScope();
    this.#syncRegistration();
    this.#refreshAria();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#disposeRegistration();
    this.#clearAria();
    this.#resolvedAnchorElement = null;
    this.#resolvedScopeElement = null;
    this.#anchorNeedsLateResolve = false;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (!this.isConnected) {
      return;
    }

    if (changedProperties.has('anchor') || changedProperties.has('target')) {
      this.#anchorWarned = false;
      this.#anchorNeedsLateResolve = false;
    }
    if (changedProperties.has('scope')) {
      this.#scopeWarned = false;
    }

    this.#resolveAnchor();
    this.#resolveScope();
    this.#syncRegistration();
    this.#refreshAria();
  }

  #refreshAria(): void {
    const anchor = this.anchorElement;

    if (this.anchorAccessibility !== 'auto' || !anchor || this.useCode || !this.key) {
      this.#clearAria();
      return;
    }

    if (this.#ariaAnchor && this.#ariaAnchor !== anchor) {
      this.#clearAria();
    }

    if (anchor.hasAttribute('aria-keyshortcuts') && !this.#ariaSetByThis) {
      return;
    }

    const value = formatAriaKeyShortcuts(this.key);
    if (!value) {
      this.#clearAria();
      return;
    }
    anchor.setAttribute('aria-keyshortcuts', value);
    this.#ariaSetByThis = true;
    this.#ariaAnchor = anchor;
  }

  #clearAria(): void {
    if (this.#ariaSetByThis && this.#ariaAnchor) {
      this.#ariaAnchor.removeAttribute('aria-keyshortcuts');
    }
    this.#ariaSetByThis = false;
    this.#ariaAnchor = null;
  }

  #resolveAnchor(): void {
    if (!this.isConnected) {
      return;
    }

    this.#resolvedAnchorElement = null;

    if (this.#explicitAnchorElement) {
      return;
    }

    if (this.anchor) {
      const found = locateElementById(this, this.anchor);
      if (found) {
        this.#resolvedAnchorElement = found;
        return;
      }
      this.#anchorNeedsLateResolve = true;
    }

    if (this.target && this.parentElement) {
      if (matchesSelectors(this.parentElement, this.target)) {
        this.#resolvedAnchorElement = this.parentElement;
        return;
      }
      const found = this.parentElement.querySelector(this.target) as HTMLElement | null;
      if (found) {
        this.#resolvedAnchorElement = found;
        return;
      }
      if (!this.anchor) {
        this.#anchorNeedsLateResolve = true;
      }
    }

    const skipSelectors = `${KEYBOARD_SHORTCUT_CONSTANTS.selectors.TOOLTIP}, ${KEYBOARD_SHORTCUT_CONSTANTS.selectors.KEYBOARD_SHORTCUT}`;
    let sibling = this.previousElementSibling;
    while (sibling) {
      if (!matchesSelectors(sibling, skipSelectors)) {
        this.#resolvedAnchorElement = sibling as HTMLElement;
        return;
      }
      sibling = sibling.previousElementSibling;
    }

    this.#resolvedAnchorElement = this.parentElement;
  }

  #resolveScope(): void {
    if (!this.isConnected) {
      return;
    }

    this.#resolvedScopeElement = null;

    if (this.global) {
      this.#resolvedScopeElement = (this.ownerDocument ?? document).documentElement;
      return;
    }

    if (this.#explicitScopeElement) {
      return;
    }

    if (this.scope) {
      const found = locateElementById(this, this.scope);
      if (found) {
        this.#resolvedScopeElement = found;
        return;
      }
      if (!this.#scopeWarned) {
        console.warn(`${WARNING_PREFIX} Unable to locate a scope element with id "${this.scope}". Falling back to the nearest scope marker.`, this);
        this.#scopeWarned = true;
      }
    }

    const marker = findScopeMarker(this);
    if (marker) {
      this.#resolvedScopeElement = marker;
      return;
    }

    if (this.target && this.parentElement) {
      if (matchesSelectors(this.parentElement, this.target)) {
        this.#resolvedScopeElement = this.parentElement;
        return;
      }
      const found = this.parentElement.querySelector(this.target);
      if (found) {
        this.#resolvedScopeElement = found;
        return;
      }
    }

    const anchor = this.#explicitAnchorElement ?? this.#resolvedAnchorElement;
    if (anchor) {
      this.#resolvedScopeElement = anchor;
      return;
    }

    this.#resolvedScopeElement = this.parentElement;
  }

  #syncRegistration(): void {
    this.#disposeRegistration();

    if (!this.isConnected || this.disabled || !this.key) {
      return;
    }

    const scopeEl = this.#explicitScopeElement ?? this.#resolvedScopeElement;
    if (!scopeEl) {
      return;
    }

    this.#registration = registerKeyboardShortcut({
      key: this.key,
      scopeElement: scopeEl,
      anchorElement: this.anchorElement,
      useCode: this.useCode,
      capture: this.capture,
      preventDefault: this.preventDefault,
      allowWhileTyping: this.allowWhileTyping,
      allowRepeat: this.allowRepeat,
      fallthrough: this.fallthrough,
      ownerElement: this,
      onActivate: evt => this.#handleActivate(evt)
    });
  }

  #disposeRegistration(): void {
    this.#registration?.dispose();
    this.#registration = null;
  }

  #handleActivate(evt: KeyboardEvent): void {
    if (this.#anchorNeedsLateResolve) {
      this.#tryLateAnchorResolve();
    }
    const event = new CustomEvent(KEYBOARD_SHORTCUT_CONSTANTS.events.ACTIVATE, { detail: evt, bubbles: true });
    this.dispatchEvent(event);
    this.activateCallback?.call(null, evt);
  }

  #tryLateAnchorResolve(): void {
    this.#anchorNeedsLateResolve = false;
    let resolved = false;

    if (this.anchor) {
      const found = locateElementById(this, this.anchor);
      if (found) {
        this.#resolvedAnchorElement = found;
        resolved = true;
      }
    }

    if (!resolved && this.target && this.parentElement) {
      if (matchesSelectors(this.parentElement, this.target)) {
        resolved = true;
      } else {
        const found = this.parentElement.querySelector(this.target) as HTMLElement | null;
        if (found) {
          this.#resolvedAnchorElement = found;
          resolved = true;
        }
      }
    }

    if (!resolved && !this.#anchorWarned) {
      const value = this.anchor || this.target;
      console.warn(`${WARNING_PREFIX} Unable to locate the anchor element for "${value}". Falling back to heuristics.`, this);
      this.#anchorWarned = true;
    }

    if (resolved) {
      queueMicrotask(() => {
        if (this.isConnected) {
          this.#resolveScope();
          this.#syncRegistration();
        }
      });
    }
  }
}

tryDefine(KEYBOARD_SHORTCUT_CONSTANTS.elementName, KeyboardShortcutComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-keyboard-shortcut': IKeyboardShortcutComponent;
  }

  interface HTMLElementEventMap {
    'forge-keyboard-shortcut-activate': CustomEvent<KeyboardEvent>;
  }
}
