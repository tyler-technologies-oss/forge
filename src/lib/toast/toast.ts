import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { ButtonComponent } from '../button';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { OverlayComponent } from '../overlay';
import { ToastAdapter } from './toast-adapter';
import { ToastPlacement, TOAST_CONSTANTS } from './toast-constants';
import { ToastFoundation } from './toast-foundation';

import template from './toast.html';
import styles from './toast.scss';

export interface IToastComponent extends IBaseComponent {
  message: string;
  actionText: string;
  duration: number;
  placement: ToastPlacement;
  dismissible: boolean;
  hide(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-toast': IToastComponent;
  }

  interface HTMLElementEventMap {
    'forge-toast-action': CustomEvent<void>;
    'forge-toast-close': CustomEvent<void>;
  }
}

/**
 * @tag forge-toast
 */
@CustomElement({
  name: TOAST_CONSTANTS.elementName,
  dependencies: [
    OverlayComponent,
    ButtonComponent,
    IconButtonComponent,
    IconComponent
  ]
})
export class ToastComponent extends BaseComponent implements IToastComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TOAST_CONSTANTS.observedAttributes);
  }

  private _foundation: ToastFoundation;

  constructor() {
    super();
    IconRegistry.define(tylIconClose);
    attachShadowTemplate(this, template, styles);
    this._foundation = new ToastFoundation(new ToastAdapter(this));
  }

  public initializedCallback(): void {
    this._foundation.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TOAST_CONSTANTS.attributes.MESSAGE:
        this.message = newValue;
        break;
      case TOAST_CONSTANTS.attributes.ACTION_TEXT:
        this.actionText = newValue;
        break;
      case TOAST_CONSTANTS.attributes.DURATION:
        const value = Number(newValue);
        this.duration = value && value > 0 ? value : TOAST_CONSTANTS.defaults.DURATION;
        break;
      case TOAST_CONSTANTS.attributes.PLACEMENT:
        this.placement = newValue as ToastPlacement || TOAST_CONSTANTS.defaults.PLACEMENT;
        break;
      case TOAST_CONSTANTS.attributes.DISMISSIBLE:
        this.dismissible = coerceBoolean(newValue);
        break;
    }
  }

  @FoundationProperty()
  public declare message: string;

  @FoundationProperty()
  public declare actionText: string;

  @FoundationProperty()
  public declare duration: number;

  @FoundationProperty()
  public declare placement: ToastPlacement;

  @FoundationProperty()
  public declare dismissible: boolean;

  public hide(): void {
    this._foundation.hide();
  }
}
