import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { createRef, ref, Ref } from 'lit/directives/ref.js';
import { BackdropComponent } from '../../backdrop/index.js';
import { BaseDrawerComponent, IBaseDrawerComponent } from '../base/base-drawer.js';
import { MODAL_DRAWER_CONSTANTS } from './modal-drawer-constants.js';

import styles from './modal-drawer.scss';

/** @deprecated - This will be removed in the future. Please switch to using ModalDrawerComponent. */
export interface IModalDrawerComponent extends IBaseDrawerComponent {}

/**
 * @tag forge-modal-drawer
 *
 * @summary A modal navigation drawer component that slides in from the side with a backdrop overlay, typically used for temporary navigation panels. Prefer to use the dialog component with the preset options for sidesheet styles drawers.
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
@customElement(MODAL_DRAWER_CONSTANTS.elementName)
export class ModalDrawerComponent extends BaseDrawerComponent implements IModalDrawerComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = MODAL_DRAWER_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [BackdropComponent];

  #backdropElement: Ref<BackdropComponent> = createRef();

  #backdropClickListener: EventListener = () => this.#handleBackdropClick();

  constructor() {
    super();
    // Modal drawer defaults to closed
    this.open = false;
  }

  public render(): TemplateResult {
    return html`
      <forge-backdrop
        class="scrim"
        .hidden=${!this.open}
        exportparts="root:backdrop"
        @click=${this.#backdropClickListener}
        ${ref(this.#backdropElement)}></forge-backdrop>
      <div class="forge-drawer modal" part="root" ${ref(this._drawerElement)}>
        <slot name="header"></slot>
        <div class="content" part="content">
          <slot></slot>
        </div>
        <slot name="footer"></slot>
      </div>
    `;
  }

  protected override _onBeforeOpen(): Promise<void> {
    if (this.#backdropElement.value) {
      void this.#backdropElement.value.fadeIn();
    }
    return Promise.resolve();
  }

  protected override _onBeforeClose(): Promise<void> {
    if (this.#backdropElement.value) {
      void this.#backdropElement.value.fadeOut();
    }
    return Promise.resolve();
  }

  #handleBackdropClick(): void {
    const canClose = this.dispatchEvent(new CustomEvent(MODAL_DRAWER_CONSTANTS.events.CLOSE, { bubbles: true, composed: true, cancelable: true }));
    if (canClose) {
      this.open = false;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-modal-drawer': IModalDrawerComponent;
  }

  interface HTMLElementEventMap {
    'forge-modal-drawer-close': CustomEvent<void>;
  }
}
