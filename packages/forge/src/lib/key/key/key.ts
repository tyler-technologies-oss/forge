import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { BaseLitElement } from '../../core/base/base-lit-element.js';

import styles from './key.scss';

export const KEY_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-key';

/**
 * @tag forge-key
 *
 * @summary Keys present key items to label a chart or data visualization.
 *
 * @slot - The default slot for key items.
 *
 * @cssproperty --forge-key-gap - The spacing between key items.
 * @cssproperty --forge-key-direction - The direction that items are laid out in the key.
 *
 * @csspart root - The root element.
 */
@customElement(KEY_TAG_NAME)
export class KeyComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = KEY_TAG_NAME;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, {
      role: 'list'
    });
  }

  /* @internal */
  public render(): TemplateResult {
    return html`<div part="root" class="forge-key"><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-key': KeyComponent;
  }
}
