import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { BaseDrawerComponent, IBaseDrawerComponent } from '../base/base-drawer.js';
import { DRAWER_CONSTANTS } from './drawer-constants.js';

import styles from './drawer.scss';

/** @deprecated - This will be removed in the future. Please switch to using DrawerComponent. */
export interface IDrawerComponent extends IBaseDrawerComponent {}

/**
 * @tag forge-drawer
 *
 * @summary A persistent side navigation drawer component that provides the ability to dismiss and open the drawer with smooth animations. Use for navigation or to display additional content alongside the main application content.
 *
 * @slot - The content to display in the scrollable content container.
 * @slot header - The header content above the main content.
 * @slot footer - The footer content below the main content.
 *
 * @cssproperty --forge-drawer-width - The width of the drawer.
 * @cssproperty --forge-drawer-background - The background color of the drawer.
 * @cssproperty --forge-drawer-border-color - The border of the drawer.
 * @cssproperty --forge-drawer-border-width - The border width of the drawer.
 * @cssproperty --forge-drawer-transition-duration - The transition duration of the drawer.
 * @cssproperty --forge-drawer-transition-easing - The transition timing function of the drawer.
 * @cssproperty --forge-drawer-duration-close - The duration of the drawer closing animation.
 *
 * @csspart root - The component's root element.
 * @csspart content - The content container element.
 *
 * @cssclass forge-drawer - The drawer element.
 * @cssclass forge-drawer--right - The drawer element when positioned to the right.
 * @cssclass forge-drawer--mini - Renders a smaller width variant of the drawer for rail navigation.
 * @cssclass forge-drawer--closing - Triggers the drawer dismiss animation.
 * @cssclass forge-drawer--closed - Applied when the drawer is dismissed.
 */
@customElement(DRAWER_CONSTANTS.elementName)
export class DrawerComponent extends BaseDrawerComponent implements IDrawerComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = DRAWER_CONSTANTS.elementName;

  public render(): TemplateResult {
    return html`
      <div class="forge-drawer" part="root" ${ref(this._drawerElement)}>
        <slot name="header"></slot>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-drawer': IDrawerComponent;
  }

  interface HTMLElementEventMap {
    'forge-drawer-after-open': CustomEvent<void>;
    'forge-drawer-after-close': CustomEvent<void>;
  }
}
