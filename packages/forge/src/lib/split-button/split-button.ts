import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { BUTTON_CONSTANTS, ButtonComponent, ButtonTheme } from '../button/index.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { removeDefaultAttribute } from '../core/utils/lit-utils.js';
import { SPLIT_BUTTON_CONSTANTS, SplitButtonVariant } from './split-button-constants.js';

import styles from './split-button.scss';

type SyncedProperty = 'variant' | 'theme' | 'disabled' | 'dense' | 'pill';

/** @deprecated - This will be removed in the future. Please switch to using SplitButtonComponent. */
export interface ISplitButtonComponent extends BaseLitElement {
  variant: SplitButtonVariant;
  theme: ButtonTheme;
  disabled: boolean;
  dense: boolean;
  pill: boolean;
}

/**
 * @tag forge-split-button
 *
 * @summary Split buttons are used for splitting an action into two parts, typically a primary action and a secondary action that opens a menu or performs an alternative action. Split buttons expect child Forge buttons as their content.
 *
 * @dependency forge-button
 *
 * @cssproperty --forge-split-button-min-width - The minimum width of the slotted buttons.
 * @cssproperty --forge-split-button-gap - The gap between the slotted buttons.
 * @cssproperty --forge-split-button-focus-indicator-offset - The offset of the focus indicator around the buttons.
 * @cssproperty --forge-split-button-focus-indicator-divider-offset - The offset of the focus indicator divider when using outlined buttons.
 *
 * @slot - This is a default/unnamed slot.
 */
export class SplitButtonComponent extends BaseLitElement implements ISplitButtonComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = SPLIT_BUTTON_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ButtonComponent];

  #variant: SplitButtonVariant = SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT;
  #theme: ButtonTheme = SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;
  #buttonChangeObserver: MutationObserver | undefined;

  /**
   * The variant of the buttons. Valid values are `text`, `outlined`, `tonal`, `filled`, and `raised`.
   * @default 'text'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: SplitButtonVariant) => removeDefaultAttribute(value, SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT) }
  })
  public set variant(value: SplitButtonVariant) {
    this.#variant = value ?? SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_VARIANT;
  }
  public get variant(): SplitButtonVariant {
    return this.#variant;
  }

  /**
   * The theme of the buttons. Valid values are `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`.
   * @default 'primary'
   * @attribute
   */
  @property({
    reflect: true,
    converter: { toAttribute: (value: ButtonTheme) => removeDefaultAttribute(value, SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_THEME) }
  })
  public set theme(value: ButtonTheme) {
    this.#theme = value ?? SPLIT_BUTTON_CONSTANTS.defaults.DEFAULT_THEME;
  }
  public get theme(): ButtonTheme {
    return this.#theme;
  }

  /**
   * Whether or not the buttons are disabled.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Whether or not the buttons are dense.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public dense = false;

  /**
   * Whether or not the buttons are pill-shaped.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public pill = false;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#startButtonObserver();

    if (this.hasUpdated) {
      this.#syncAllButtons();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#buttonChangeObserver?.disconnect();
    this.#buttonChangeObserver = undefined;
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    const isChanged = (name: SyncedProperty): boolean => !this.hasUpdated || changedProperties.has(name);
    const buttons = this.#getButtons();

    if (isChanged('variant')) {
      buttons.forEach(button => (button.variant = this.variant));
    }
    if (isChanged('theme')) {
      buttons.forEach(button => (button.theme = this.theme));
    }
    if (isChanged('disabled')) {
      buttons.forEach(button => (button.disabled = this.disabled));
    }
    if (isChanged('dense')) {
      buttons.forEach(button => (button.dense = this.dense));
    }
    if (isChanged('pill')) {
      this.#syncPill();
    }
  }

  public render(): TemplateResult {
    return html`<slot></slot>`;
  }

  #getButtons(): ButtonComponent[] {
    return Array.from(this.querySelectorAll<ButtonComponent>(BUTTON_CONSTANTS.elementName));
  }

  #syncAllButtons(): void {
    this.#getButtons().forEach(button => this.#syncButtonState(button));
    this.#syncPill();
  }

  #syncButtonState(button: ButtonComponent): void {
    button.variant = this.variant;
    button.theme = this.theme;
    button.disabled = this.disabled;
    button.dense = this.dense;
  }

  #syncPill(): void {
    const buttons = this.#getButtons();

    // First we reset all the middle buttons to not be pill buttons
    if (buttons.length > 2) {
      buttons
        .slice(1, buttons.length - 1)
        .filter(({ pill }) => pill)
        .forEach(button => (button.pill = false));
    }

    // Only the first and last buttons need to be pill shaped
    const firstButton = buttons[0];
    if (firstButton) {
      firstButton.pill = this.pill;
    }

    const lastButton = buttons[buttons.length - 1];
    if (lastButton) {
      lastButton.pill = this.pill;
    }
  }

  #startButtonObserver(): void {
    this.#buttonChangeObserver?.disconnect();

    // This observer is used to keep the buttons in sync with the split button state when they are added to DOM
    this.#buttonChangeObserver = new MutationObserver(mutations => {
      // Find all `<forge-button>` elements that are contained within the added nodes
      const addedButtons = mutations.reduce((buttons, { addedNodes }) => {
        const addedButtonNodes = Array.from(addedNodes)
          .filter((node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE)
          .map(node => (node.nodeName.toLowerCase() === BUTTON_CONSTANTS.elementName ? node : node.querySelector(BUTTON_CONSTANTS.elementName)))
          .filter(node => !!node) as ButtonComponent[];
        return buttons.concat(addedButtonNodes);
      }, [] as ButtonComponent[]);

      if (!addedButtons.length) {
        return;
      }

      addedButtons.forEach(button => this.#syncButtonState(button));
      this.#syncPill();
    });
    this.#buttonChangeObserver.observe(this, { childList: true, subtree: true });
  }
}

tryDefine(SPLIT_BUTTON_CONSTANTS.elementName, SplitButtonComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-split-button': ISplitButtonComponent;
  }
}
