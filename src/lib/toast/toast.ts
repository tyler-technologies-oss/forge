import { attachShadowTemplate, coerceBoolean, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { tylIconClose } from '@tylertech/tyler-icons/standard';
import { ButtonComponent } from '../button';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { IconComponent, IconRegistry } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { ToastAdapter } from './toast-adapter';
import { ToastBuilder, ToastPlacement, TOAST_CONSTANTS } from './toast-constants';
import { ToastFoundation } from './toast-foundation';

import template from './toast.html';
import styles from './toast.scss?inline';

export interface IToastComponent extends IBaseComponent {
  message: string;
  actionText: string;
  duration: number;
  placement: ToastPlacement;
  showClose: boolean;
  builder: ToastBuilder | string;
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
 * The custom element class behind the `<forge-toast>` web component.
 * 
 * @tag forge-toast
 */
@CustomElement({
  name: TOAST_CONSTANTS.elementName,
  dependencies: [
    ButtonComponent,
    IconButtonComponent,
    IconComponent
  ]
})
export class ToastComponent extends BaseComponent implements IToastComponent {
  public static get observedAttributes(): string[] {
    return [
      TOAST_CONSTANTS.attributes.MESSAGE,
      TOAST_CONSTANTS.attributes.ACTION_TEXT,
      TOAST_CONSTANTS.attributes.DURATION,
      TOAST_CONSTANTS.attributes.PLACEMENT,
      TOAST_CONSTANTS.attributes.SHOW_CLOSE
    ];
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
      case TOAST_CONSTANTS.attributes.SHOW_CLOSE:
        this.showClose = coerceBoolean(newValue);
        break;
    }
  }

  /** The message to display in the toast. */
  @FoundationProperty()
  public declare message: string;

  /** The text to display in the action button. */
  @FoundationProperty()
  public declare actionText: string;

  /** The time in milliseconds to show the toast. */
  @FoundationProperty()
  public declare duration: number;

  /** The placement of the toast. */
  @FoundationProperty()
  public declare placement: ToastPlacement;

  /** Sets the toast builder function for displaying custom content. */
  @FoundationProperty()
  public declare builder: ToastBuilder | string;

  /** Controls the visibility of the close button. */
  @FoundationProperty()
  public declare showClose: boolean;

  /** Hides the toast and removes it from the DOM. */
  public hide(): void {
    this._foundation.hide();
  }
}
