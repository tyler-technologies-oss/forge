import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setDefaultAria } from '../../core/utils/a11y-utils';

import styles from './key.scss';

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
@customElement('forge-key')
export class KeyComponent extends LitElement {
  public static styles = unsafeCSS(styles);

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
