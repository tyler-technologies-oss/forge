import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { createRef, Ref } from 'lit/directives/ref.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { proxyShadowScrollEvent } from '../../core/utils/event-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { BASE_DRAWER_CONSTANTS, DrawerDirection } from './base-drawer-constants.js';

/** @deprecated - This will be removed in the future. Please switch to using BaseDrawerComponent. */
export interface IBaseDrawerComponent extends BaseLitElement {
  open: boolean;
  direction: DrawerDirection;
}

export abstract class BaseDrawerComponent extends BaseLitElement implements IBaseDrawerComponent {
  /**
   * Whether the drawer is open.
   * @default true
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public open = true;

  /**
   * The layout and animation direction of the drawer.
   * @default 'left'
   * @attribute
   */
  @property({ reflect: true })
  public direction: DrawerDirection = 'left';

  protected _drawerElement: Ref<HTMLElement> = createRef();
  protected _fixContentWidthWhileAnimating = true;
  protected _internals: ElementInternals;

  #transitionEndListener: (evt: TransitionEvent) => void = evt => this.#handleTransitionEnd(evt);
  #unproxyScroll?: () => void;

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      this.#handleOpenChange();
    }
    if (changedProperties.has('direction')) {
      toggleState(this._internals, 'right', this.direction === 'right');
    }
  }

  public override firstUpdated(): void {
    if (this.shadowRoot) {
      this.#unproxyScroll = proxyShadowScrollEvent(this.shadowRoot, this);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#unproxyScroll?.();
    this.#unproxyScroll = undefined;
  }

  async #handleOpenChange(): Promise<void> {
    // Wait for the before open/close logic to complete
    if (this.open) {
      await this._onBeforeOpen();
    } else {
      await this._onBeforeClose();
    }

    // Toggling the open state triggers the animation
    toggleState(this._internals, 'open', this.open);
    if (!this._drawerElement.value) {
      return;
    }
    if (this._fixContentWidthWhileAnimating) {
      this._drawerElement.value.classList.add('animating');
    }
    this._drawerElement.value.inert = !this.open;
    this._drawerElement.value.addEventListener('transitionend', this.#transitionEndListener);
  }

  protected _onBeforeOpen(): Promise<void> {
    return Promise.resolve();
  }

  protected _onBeforeClose(): Promise<void> {
    return Promise.resolve();
  }

  protected _onAfterOpen(): void {}

  protected _onAfterClose(): void {}

  #handleTransitionEnd(evt: TransitionEvent): void {
    // Only handle transitionend events from the drawer element
    if (!this._drawerElement.value || evt.target !== this._drawerElement.value) {
      return;
    }

    this._drawerElement.value.classList.remove('animating');

    if (this.open) {
      this._onAfterOpen();
    } else {
      this._onAfterClose();
    }

    const event = new CustomEvent(this.open ? BASE_DRAWER_CONSTANTS.events.AFTER_OPEN : BASE_DRAWER_CONSTANTS.events.AFTER_CLOSE, {
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);

    // Remove the event listener after it has been handled once
    this._drawerElement.value.removeEventListener('transitionend', this.#transitionEndListener);
  }
}

declare global {
  interface HTMLElementEventMap {
    'forge-drawer-after-open': CustomEvent<void>;
    'forge-drawer-after-close': CustomEvent<void>;
  }
}
