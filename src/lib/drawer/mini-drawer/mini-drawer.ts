import { attachShadowTemplate, CustomElement } from '@tylertech/forge-core';
import { BaseDrawerAdapter, BaseDrawerComponent, BaseDrawerFoundation, IBaseDrawerComponent } from '../base';
import { MINI_DRAWER_CONSTANTS } from './mini-drawer-constants';

import template from './mini-drawer.html';
import styles from './mini-drawer.scss';

export interface IMiniDrawerComponent extends IBaseDrawerComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-mini-drawer': IMiniDrawerComponent;
  }
}

/**
 * @tag forge-mini-drawer
 * 
 * @property {boolean} [hover=false] - The drawer will expand open when hovered.
 * 
 * @attribute {boolean} [hover=false] - The drawer will expand open when hovered.
 * 
 * @cssproperty --forge-mini-drawer-width - The width of the drawer.
 * @cssproperty --forge-mini-drawer-hover-width - The width of the drawer when hovered.
 * @cssproperty --forge-mini-drawer-transition-duration - The transition duration of the drawer.
 * @cssproperty --forge-mini-drawer-transition-easing - The transition timing function of the drawer.
 * @cssproperty --forge-mini-drawer-delay - The delay before the drawer closes when the mouse leaves the drawer.
 * @cssproperty --forge-mini-drawer-hover-transition-duration - The transition duration of the drawer when hovered.
 * @cssproperty --forge-mini-drawer-hover-transition-easing - The transition timing function of the drawer when hovered.
 * @cssproperty --forge-mini-drawer-hover-transition-delay - The delay before the drawer closes when the mouse leaves the drawer when hovered.
 * @cssproperty --forge-drawer-width - The width of the drawer.
 * @cssproperty --forge-drawer-background - The background color of the drawer.
 * @cssproperty --forge-drawer-border-color - The border of the drawer.
 * @cssproperty --forge-drawer-border-width - The border width of the drawer.
 * @cssproperty --forge-drawer-transition-duration - The transition duration of the drawer.
 * @cssproperty --forge-drawer-transition-easing - The transition timing function of the drawer.
 * @cssproperty --forge-drawer-duration-close - The duration of the drawer closing animation.
 * 
 * @slot - The content to display in the scrollable content container.
 * @slot header - The header content above the main content.
 * @slot footer - The footer content below the main content.
 * 
 * @csspart root - The component's root element.
 * @csspart content - The content container element.
 */
@CustomElement({
  name: MINI_DRAWER_CONSTANTS.elementName
})
export class MiniDrawerComponent extends BaseDrawerComponent<BaseDrawerFoundation> implements IMiniDrawerComponent {
  protected _foundation: BaseDrawerFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new BaseDrawerFoundation(new BaseDrawerAdapter(this));
  }

  public get hover(): boolean {
    return this.hasAttribute('hover');
  }
  public set hover(value: boolean) {
    this.toggleAttribute('hover', value);
  }
}
