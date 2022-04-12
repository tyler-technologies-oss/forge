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
}
