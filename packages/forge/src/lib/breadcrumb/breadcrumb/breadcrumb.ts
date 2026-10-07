import { CUSTOM_ELEMENT_NAME_PROPERTY, tryDefine } from '@tylertech/forge-core';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';

import styles from './breadcrumb.scss';

export const BREADCRUMB_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-breadcrumb';

/**
 * @tag forge-breadcrumb
 *
 * @summary Breadcrumbs show the user's location within a hierarchy and provide links back to parent pages.
 *
 * @slot - The default slot for breadcrumb items and breadcrumb overflow menus.
 *
 * @cssproperty --forge-breadcrumb-separator-content - The character used to separate breadcrumb items.
 * @cssproperty --forge-breadcrumb-separator-padding - The inline padding around the separator.
 * @cssproperty --forge-theme-primary - The color of breadcrumb items.
 * @cssproperty --forge-theme-text-high - The color of the current (non-link) breadcrumb item.
 * @cssproperty --forge-theme-text-medium - The color of the separator.
 *
 * @csspart root - The root list element.
 */
export class BreadcrumbComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = BREADCRUMB_TAG_NAME;

  private _internals: ElementInternals;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this._internals, {
      role: 'navigation'
    });
  }

  /* @internal */
  public render(): TemplateResult {
    return html`<ul part="root" class="forge-breadcrumb" role="list">
      <slot></slot>
    </ul>`;
  }
}

tryDefine(BREADCRUMB_TAG_NAME, BreadcrumbComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-breadcrumb': BreadcrumbComponent;
  }
}
