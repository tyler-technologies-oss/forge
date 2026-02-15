import { customElement, attachShadowTemplate } from '@tylertech/forge-core';
import { DRAWER_CONSTANTS } from './drawer-constants.js';
import { BaseDrawerAdapter, BaseDrawerComponent, BaseDrawerCore, IBaseDrawerComponent } from '../base/index.js';

import template from './drawer.html';
import styles from './drawer.scss';

export interface IDrawerComponent extends IBaseDrawerComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-drawer': IDrawerComponent;
  }

  interface HTMLElementEventMap {
    'forge-drawer-after-open': CustomEvent<void>;
    'forge-drawer-after-close': CustomEvent<void>;
  }
}

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
@customElement({
  name: DRAWER_CONSTANTS.elementName
})
export class DrawerComponent extends BaseDrawerComponent<BaseDrawerCore> implements IDrawerComponent {
  protected _core: BaseDrawerCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new BaseDrawerCore(new BaseDrawerAdapter(this));
  }
}
