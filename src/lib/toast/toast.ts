import { attachShadowTemplate, coerceBoolean, customElement, coreProperty } from '@tylertech/forge-core';
import { tylIconClose } from '@tylertech/tyler-icons';
import { ButtonComponent } from '../button';
import { setDefaultAria } from '../constants';
import { BaseComponent } from '../core/base/base-component';
import { IWithDefaultAria, WithDefaultAria } from '../core/mixins/internals/with-default-aria';
import { IWithElementInternals, WithElementInternals } from '../core/mixins/internals/with-element-internals';
import { DialogComponent, dialogStack } from '../dialog';
import { IconComponent, IconRegistry, IIconProperties } from '../icon';
import { IconButtonComponent } from '../icon-button';
import { OverlayComponent } from '../overlay';
import { ToastAdapter } from './toast-adapter';
import { ToastPlacement, ToastTheme, TOAST_CONSTANTS } from './toast-constants';
import { ToastCore } from './toast-core';

import template from './toast.html';
import styles from './toast.scss';

export interface IToastProperties {
  open: boolean;
  duration: number;
  placement: ToastPlacement;
  actionText: string;
  dismissible: boolean;
  dismissLabel: string;
  theme: ToastTheme;
}

export interface IToastPresentConfiguration extends Partial<IToastProperties> {
  message?: string;
  element?: HTMLElement;
  className?: string | string[];
  icon?: Partial<IIconProperties>;
  topLayer?: boolean;
}

export interface IToastComponent extends IToastProperties, IWithElementInternals, IWithDefaultAria {
  show(): void;
  hide(): Promise<void>;
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
 *
 * @summary Toasts are non-modal notifications that appear in response to user interactions. Use toasts to provide brief messages about app processes at the bottom or top of the screen. They automatically disappear after a timeout, but can also include an action button and a dismiss button.
 *
 * @dependency forge-overlay
 * @dependency forge-button
 * @dependency forge-icon-button
 * @dependency forge-icon
 *
 * @property {boolean} [open=false] - The open state.
 * @property {number} [duration=2750] - The duration in milliseconds that the toast is displayed.
 * @property {ToastPlacement} [placement="bottom"] - The placement of the toast.
 * @property {string} actionText - The text for the action button. This controls the visibility of the action button.
 * @property {boolean} [dismissible=false] - Whether the toast is dismissible (displays a close button).
 * @property {string} dismissLabel - The accessible label for the dismiss button.
 * @property {ToastTheme} [theme="default"] - The theme of the toast.
 *
 * @globalconfig duration
 * @globalconfig placement
 * @globalconfig dismissible
 *
 * @attribute {boolean} [open=false] - The open state.
 * @attribute {number} [duration=2750] - The duration in milliseconds that the toast is displayed.
 * @attribute {ToastPlacement} placement - The placement of the toast.
 * @attribute {string} action-text - The text for the action button. This controls the visibility of the action button.
 * @attribute {boolean} [dismissible=false] - Whether the toast is dismissible (displays a close button).
 * @attribute {string} dismiss-label - The accessible label for the dismiss button.
 * @attribute {ToastTheme} [theme="default"] - The theme of the toast.
 *
 * @event {CustomEvent<void>} forge-toast-action - Dispatched when the action button is clicked.
 * @event {CustomEvent<void>} forge-toast-close - Dispatched when the toast is closed.
 *
 * @cssproperty --forge-toast-background - The background color of the toast.
 * @cssproperty --forge-toast-color - The text color of the toast.
 * @cssproperty --forge-toast-offset - The offset of the toast from the edge of the viewport.
 * @cssproperty --forge-toast-shape - The shape of the toast.
 * @cssproperty --forge-toast-elevation - The elevation of the toast.
 * @cssproperty --forge-toast-action-color - The text color of the action button.
 * @cssproperty --forge-toast-min-width - The minimum width of the toast.
 * @cssproperty --forge-toast-max-width - The maximum width of the toast.
 * @cssproperty --forge-toast-min-height - The minimum height of the toast.
 * @cssproperty --forge-toast-inline-padding - The padding of the toast when inline.
 * @cssproperty --forge-toast-spacing - The spacing between toasts.
 * @cssproperty --forge-toast-message-padding - The padding of the toast message.
 * @cssproperty --forge-toast-enter-duration - The duration of the enter animation.
 * @cssproperty --forge-toast-enter-timing - The timing function of the enter animation.
 * @cssproperty --forge-toast-exit-duration - The duration of the exit animation.
 * @cssproperty --forge-toast-exit-timing - The timing function of the exit animation.
 * @cssproperty --forge-toast-slide-origin - The origin of the slide animation.
 *
 * @csspart surface - The surface container.
 * @csspart message - The message container.
 * @csspart action-button - The action button.
 * @csspart close-button - The close button.
 * @csspart overlay - The `<forge-overlay>` element.
 */
@customElement({
  name: TOAST_CONSTANTS.elementName,
  dependencies: [OverlayComponent, ButtonComponent, IconButtonComponent, IconComponent]
})
export class ToastComponent extends WithElementInternals(WithDefaultAria(BaseComponent)) implements IToastComponent {
  public static get observedAttributes(): string[] {
    return Object.values(TOAST_CONSTANTS.observedAttributes);
  }

  private _core: ToastCore;

  constructor() {
    super();
    IconRegistry.define(tylIconClose);
    attachShadowTemplate(this, template, styles);
    this._core = new ToastCore(new ToastAdapter(this));
  }

  public connectedCallback(): void {
    const hasRole = this.hasAttribute('role') || this.getAttribute('aria-hidden') === 'true';
    if (!hasRole) {
      this[setDefaultAria]({
        role: 'alert',
        ariaLive: 'assertive',
        ariaAtomic: 'true'
      });
    }
    this._core.initialize();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case TOAST_CONSTANTS.attributes.OPEN:
        this.open = coerceBoolean(newValue);
        break;
      case TOAST_CONSTANTS.attributes.DURATION: {
        const value = Number(newValue);
        this.duration = value && value > 0 ? value : TOAST_CONSTANTS.defaults.DURATION;
        break;
      }
      case TOAST_CONSTANTS.attributes.PLACEMENT:
        this.placement = (newValue as ToastPlacement) || TOAST_CONSTANTS.defaults.PLACEMENT;
        break;
      case TOAST_CONSTANTS.attributes.ACTION_TEXT:
        this.actionText = newValue;
        break;
      case TOAST_CONSTANTS.attributes.DISMISSIBLE:
        this.dismissible = coerceBoolean(newValue);
        break;
      case TOAST_CONSTANTS.attributes.DISMISS_LABEL:
        this.dismissLabel = newValue;
        break;
      case TOAST_CONSTANTS.attributes.THEME:
        this.theme = newValue as ToastTheme;
        break;
    }
  }

  @coreProperty()
  declare public open: boolean;

  @coreProperty()
  declare public duration: number;

  @coreProperty()
  declare public placement: ToastPlacement;

  @coreProperty()
  declare public actionText: string;

  @coreProperty()
  declare public dismissible: boolean;

  @coreProperty()
  declare public dismissLabel: string;

  @coreProperty()
  declare public theme: ToastTheme;

  /**
   * Shows the toast.
   */
  public show(): void {
    this._core.show();
  }

  /**
   * Hides the toast.
   * @returns A promise that resolves when the toast animation completes.
   */
  public hide(): Promise<void> {
    return this._core.hide();
  }

  /**
   * Presents a toast notification.
   * @param config The configuration for the toast.
   * @returns A promise that resolves when the toast is closed.
   * @ignore CEM
   */
  public static present({ message, element, icon, className, topLayer, ...config }: IToastPresentConfiguration): IToastComponent {
    const toast = document.createElement(TOAST_CONSTANTS.elementName) as IToastComponent;

    if (element) {
      toast.appendChild(element);
    } else if (message) {
      toast.append(message);
    }

    if (icon) {
      const iconEl = document.createElement('forge-icon');
      Object.assign(iconEl, icon);
      iconEl.slot = 'icon';
      toast.appendChild(iconEl);
    }

    if (className) {
      const classes = Array.isArray(className) ? className : [className];
      toast.classList.add(...classes);
    }

    if (config) {
      Object.assign(toast, config);
    }

    const hostEl = (topLayer && Array.from(DialogComponent[dialogStack]).at(-1)) || document.body;
    hostEl.appendChild(toast);

    toast.open = true;
    toast.addEventListener(TOAST_CONSTANTS.events.CLOSE, () => toast.remove());

    return toast;
  }
}
