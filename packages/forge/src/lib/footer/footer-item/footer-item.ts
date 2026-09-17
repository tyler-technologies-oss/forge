import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';

import styles from './footer-item.scss';

declare global {
  interface HTMLElementTagNameMap {
    'forge-footer-item': FooterItemComponent;
  }
}

export const FOOTER_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-footer-item';

/**
 * @tag forge-footer-item
 *
 * @summary A footer item component for displaying individual items within a footer, such as links, text, or copyright information.
 *
 * @meta extended
 *
 * @slot - Slot for footer item content (e.g., text, links, or icons).
 *
 * @cssproperty --forge-footer-item-color - Controls the text color of the footer item.
 *
 * @csspart root - The root container element.
 */
@customElement(FOOTER_ITEM_TAG_NAME)
export class FooterItemComponent extends BaseLitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = FOOTER_ITEM_TAG_NAME;

  public static styles = unsafeCSS(styles);

  #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, { role: 'listitem' });
  }

  public render(): TemplateResult {
    return html`<div class="footer-item" part="root"><slot></slot></div>`;
  }
}
