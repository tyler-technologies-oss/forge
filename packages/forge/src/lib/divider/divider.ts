import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/index.js';
import { DIVIDER_CONSTANTS } from './divider-constants.js';

import styles from './divider.scss';

/** @deprecated - This will be removed in the future. Please switch to using DividerComponent. */
export interface IDividerComponent extends BaseLitElement {
  vertical: boolean;
}

/**
 * @tag forge-divider
 *
 * @summary Dividers are used to separate elements with a thin line, either vertically or horizontally.
 *
 * @state vertical - Applied when the divider is vertical.
 *
 * @cssproperty --forge-divider-color - The color of the divider.
 * @cssproperty --forge-divider-width - The width of the divider.
 * @cssproperty --forge-divider-border-style - The border-style (dashed, solid) of the divider.
 * @cssproperty --forge-divider-margin - The margin of divider.
 *
 * @csspart root - The root container element.
 *
 * @cssclass forge-divider - The divider class.
 */
@customElement(DIVIDER_CONSTANTS.elementName)
export class DividerComponent extends BaseLitElement implements IDividerComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DIVIDER_CONSTANTS.elementName;

  #internals: ElementInternals;

  /**
   * Controls if the divider is displayed vertically or horizontally.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public vertical = false;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public willUpdate(changedProperties: PropertyValues): void {
    if (changedProperties.has('vertical')) {
      toggleState(this.#internals, 'vertical', this.vertical);
    }
  }

  public render(): TemplateResult {
    return html`<div class="forge-divider" part="root"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-divider': IDividerComponent;
  }
}
