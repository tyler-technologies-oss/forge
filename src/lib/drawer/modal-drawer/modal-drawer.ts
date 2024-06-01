import { attachShadowTemplate, CustomElement } from '@tylertech/forge-core';
import { BackdropComponent } from '../../backdrop';
import { BaseDrawerComponent, IBaseDrawerComponent } from '../base';
import { ModalDrawerAdapter } from './modal-drawer-adapter';
import { MODAL_DRAWER_CONSTANTS } from './modal-drawer-constants';
import { ModalDrawerFoundation } from './modal-drawer-foundation';

import template from './modal-drawer.html';
import styles from './modal-drawer.scss';

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
 * @tag forge-modal-drawer
 *
 * @dependency forge-backdrop
 * 
 * @event {CustomEvent<void>} forge-modal-drawer-close - Dispatched when the modal drawer is closed by clicking the backdrop.
 * 
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
 * @csspart backdrop - The backdrop root element.
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
