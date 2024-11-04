import { LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { setDefaultAria } from '../../core/utils/a11y-utils';
import { KEY_CONSTANTS } from './key-constants';

import styles from './key.scss';

export interface IKeyComponent extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-key': IKeyComponent;
  }
}

/**
 * @tag forge-key
 *
 * @summary Keys present key items to label a chart or data visualization.
 */
@customElement(KEY_CONSTANTS.elementName)
export class KeyComponent extends LitElement implements IKeyComponent {
  /* @ignore */
  public static styles = unsafeCSS(styles);

  /* @ignore */
  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
    console.log('KeyComponent constructor');
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
