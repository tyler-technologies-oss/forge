import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';

import '../../focus-indicator/focus-indicator.js';

import styles from './breadcrumb-item.scss';

export const BREADCRUMB_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-breadcrumb-item';

/**
 * @tag forge-breadcrumb-item
 *
 * @summary Breadcrumb items link to a page in the hierarchy, or represent the current page.
 *
 * @slot - The default slot for the item's content.
 *
 * @csspart root - The root element.
 * @csspart link - The anchor element. Not rendered when `current` is set.
 */
export class BreadcrumbItemComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BREADCRUMB_ITEM_TAG_NAME;

  /**
   * The URL that the anchor links to.
   * @attribute
   */
  @property() public href?: string;

  /**
   * Whether this item represents the current page. Replaces the anchor with a non-interactive element.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true }) public current = false;

  @state() private _isMenuItem = false;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, {
      role: 'listitem'
    });
    this.#detectMenuItem();
  }

  /* @internal */
  public render(): TemplateResult {
    return html`
      <div part="root" class="${classMap({ 'forge-breadcrumb-item': true, current: this.current, 'menu-item': this._isMenuItem })}">
        ${this.current ? html`<slot></slot>` : this.#renderLink()}
      </div>
    `;
  }

  #renderLink(): TemplateResult {
    const link = html`
      <a part="link" class="link" href=${ifDefined(this.href)}><slot></slot></a>
      <forge-focus-indicator ?inward=${this._isMenuItem}></forge-focus-indicator>
    `;
    return this._isMenuItem ? link : html`<span class="positioning-container">${link}</span>`;
  }

  #detectMenuItem(): void {
    this._isMenuItem = !!this.closest('forge-breadcrumb-overflow-menu');
  }
}

tryDefine(BREADCRUMB_ITEM_TAG_NAME, BreadcrumbItemComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-breadcrumb-item': BreadcrumbItemComponent;
  }
}
