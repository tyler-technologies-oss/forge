import { attachShadowTemplate, CustomElement } from '@tylertech/forge-core';
import { BackdropComponent } from '../../backdrop';
import { BaseDrawerComponent, IBaseDrawerComponent } from '../base';
import { ModalDrawerAdapter } from './modal-drawer-adapter';
import { MODAL_DRAWER_CONSTANTS } from './modal-drawer-constants';
import { ModalDrawerFoundation } from './modal-drawer-foundation';

import template from './modal-drawer.html';
import styles from './modal-drawer.scss?inline';

export interface IModalDrawerComponent extends IBaseDrawerComponent {}

declare global {
  interface HTMLElementTagNameMap {
    'forge-modal-drawer': IModalDrawerComponent;
  }

  interface HTMLElementEventMap {
    'forge-modal-drawer-close': CustomEvent<void>;
  }
}

/**
 * The web component class behind the `<forge-modal-drawer>` custom element.
 * 
 * @tag forge-modal-drawer
 */
@CustomElement({
  name: MODAL_DRAWER_CONSTANTS.elementName,
  dependencies: [BackdropComponent]
})
export class ModalDrawerComponent extends BaseDrawerComponent<ModalDrawerFoundation> implements IModalDrawerComponent {
  protected _foundation: ModalDrawerFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new ModalDrawerFoundation(new ModalDrawerAdapter(this));
  }
}
