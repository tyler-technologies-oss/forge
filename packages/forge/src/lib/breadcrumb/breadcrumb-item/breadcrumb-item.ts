import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { tylIconHome } from '@tylertech/tyler-icons';
import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { IconRegistry } from '../../icon/index.js';

import '../../button/button.js';
import '../../icon-button/icon-button.js';
import '../../list/list-item/list-item.js';
import '../../tooltip/tooltip.js';

import styles from './breadcrumb-item.scss';

export const BREADCRUMB_ITEM_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-breadcrumb-item';

/**
 * @tag forge-breadcrumb-item
 *
 * @summary Breadcrumb items link to a page in the hierarchy, or represent the current page.
 *
 * @slot - The default slot for the item's content.
 * @slot start - Content placed before the item's main content.
 *
 * @csspart root - The root element.
 * @csspart link - The anchor element. Not rendered when `current` is set.
 */
export class BreadcrumbItemComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BREADCRUMB_ITEM_TAG_NAME;

  static {
    IconRegistry.define([tylIconHome]);
  }

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
  @property({ type: Boolean }) public current = false;

  /**
   * Whether this item represents the home page. Renders a home icon when set to true.
   * @default false
   * @attribute
   */
  @property({ type: Boolean }) public home = false;

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

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('current')) {
      setDefaultAria(this, this._internals, {
        ariaCurrent: this.current ? 'page' : null
      });
    }
  }

  /* @internal */
  public render(): TemplateResult {
    const isText = !this.href || this.current;
    let content: TemplateResult;

    if (this._isMenuItem) {
      content = html`
        <forge-list-item class="list-item" role="presentation">
          <slot name="start" slot="start"></slot>
          ${this.home ? html`<forge-icon slot="start" name="home"></forge-icon>` : nothing}
          ${isText ? html`<span class="text"><slot></slot></span>` : html`<a href=${ifDefined(this.href)}><slot></slot></a>`}
        </forge-list-item>
      `;
    } else if (isText) {
      content = html`
        ${this.home
          ? html` <forge-icon class="text-icon" name="home"></forge-icon> `
          : html`
              <div class="start">
                <slot name="start"></slot>
                <span class="text"><slot></slot></span>
              </div>
            `}
      `;
    } else if (this.home) {
      content = html`
        <forge-icon-button part="button" class="icon-button" id="button" type="button" dense shape="squared">
          <a href=${ifDefined(this.href)}>
            <forge-icon name="home"></forge-icon>
          </a>
        </forge-icon-button>
        <forge-tooltip anchor="button" type="label" placement="bottom"><slot>Home</slot></forge-tooltip>
      `;
    } else {
      content = html`
        <div class="start">
          <slot name="start"></slot>
        </div>
        <forge-button part="button" class="button" type="button" dense>
          <a href=${ifDefined(this.href)}>
            <slot></slot>
          </a>
        </forge-button>
      `;
    }

    return html`<div part="root" class="${classMap({ 'forge-breadcrumb-item': true, current: this.current, 'menu-item': this._isMenuItem })}">${content}</div>`;
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
