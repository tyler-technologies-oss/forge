import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconMinus, tylIconPlus } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { TextFieldComponent } from '../text-field/index.js';

import '../icon-button/icon-button.js';
import '../icon/icon.js';
import '../text-field/text-field.js';

import styles from './quantity-field.scss';

export interface IQuantityFieldComponent extends BaseLitElement {
  invalid: boolean;
  required: boolean;
  decrementLabel: string;
  incrementLabel: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-quantity-field': IQuantityFieldComponent;
  }
}

export const QUANTITY_FIELD_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-quantity-field';

/**
 * @tag forge-quantity-field
 *
 * @summary A numeric input field with increment and decrement buttons for adjusting a quantity value.
 *
 * @meta extended
 *
 * @dependency forge-icon-button
 * @dependency forge-icon
 * @dependency forge-text-field
 *
 * @slot - Reserved for the `<input>` element.
 * @slot label - The label for the field.
 * @slot decrement-button - The decrement button.
 * @slot decrement-icon - The icon for the decrement button.
 * @slot increment-button - The increment button.
 * @slot increment-icon - The icon for the increment button.
 * @slot support-text - The support text for the field.
 *
 * @state required - Indicates whether the field is in its required state.
 * @state invalid - Indicates whether the field is in its invalid state.
 */
@customElement(QUANTITY_FIELD_TAG_NAME)
export class QuantityFieldComponent extends BaseLitElement implements IQuantityFieldComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = QUANTITY_FIELD_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [IconButtonComponent, IconComponent, TextFieldComponent];

  static {
    IconRegistry.define([tylIconMinus, tylIconPlus]);
  }

  public static styles = unsafeCSS(styles);

  /** Indicates whether the field is invalid. */
  @property({ type: Boolean })
  public invalid = false;

  /** Indicates whether the field is required. */
  @property({ type: Boolean })
  public required = false;

  /** The accessible label for the decrement button. */
  @property({ attribute: 'decrement-label' })
  public decrementLabel = 'Decrement';

  /** The accessible label for the increment button. */
  @property({ attribute: 'increment-label' })
  public incrementLabel = 'Increment';

  @queryAssignedElements()
  private readonly _defaultSlotElements!: HTMLElement[];

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('required')) {
      toggleState(this.#internals, 'required', this.required);
    }

    if (changedProperties.has('invalid')) {
      toggleState(this.#internals, 'invalid', this.invalid);
    }
  }

  public render(): TemplateResult {
    return html`
      <div class="container">
        <slot name="label"></slot>
        <div class="inner">
          <slot name="decrement-button" @click=${this.#onDecrement}>
            <forge-icon-button shape="squared" aria-label=${this.decrementLabel}>
              <slot name="decrement-icon">
                <forge-icon name="minus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
          <forge-text-field .invalid=${this.invalid} .required=${this.required}>
            <slot></slot>
          </forge-text-field>
          <slot name="increment-button" @click=${this.#onIncrement}>
            <forge-icon-button shape="squared" aria-label=${this.incrementLabel}>
              <slot name="increment-icon">
                <forge-icon name="plus"></forge-icon>
              </slot>
            </forge-icon-button>
          </slot>
        </div>
        <slot name="support-text"></slot>
      </div>
    `;
  }

  #tryGetInput(): HTMLInputElement | undefined {
    return this._defaultSlotElements.find(el => el.tagName === 'INPUT') as HTMLInputElement | undefined;
  }

  #onDecrement(): void {
    const input = this.#tryGetInput();
    input?.stepDown();
    input?.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    input?.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  #onIncrement(): void {
    const input = this.#tryGetInput();
    input?.stepUp();
    input?.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    input?.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }
}
