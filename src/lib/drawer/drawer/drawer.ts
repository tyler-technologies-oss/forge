import { CustomElement, attachShadowTemplate } from '@tylertech/forge-core';
import { DRAWER_CONSTANTS } from './drawer-constants';
import { BaseDrawerAdapter, BaseDrawerComponent, BaseDrawerFoundation, IBaseDrawerComponent } from '../base';

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
 * 
 * @csspart root - The component's root element.
 * @csspart content - The content container element.
 */
@CustomElement({
  name: DRAWER_CONSTANTS.elementName
})
export class DrawerComponent extends BaseDrawerComponent<BaseDrawerFoundation> implements IDrawerComponent {
  protected _foundation: BaseDrawerFoundation;
  
  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new BaseDrawerFoundation(new BaseDrawerAdapter(this));
  }
}
