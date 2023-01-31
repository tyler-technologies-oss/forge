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
 * The web component class behind the `<forge-drawer>` custom element.
 * 
 * @tag forge-drawer
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
