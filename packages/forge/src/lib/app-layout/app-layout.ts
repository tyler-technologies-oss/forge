import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, queryAssignedNodes, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconClose, tylIconTylerTalkingTLogo } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { AppBarComponent } from '../app-bar/app-bar/index.js';
import { AppBarMenuButtonComponent } from '../app-bar/menu-button/index.js';
import { DialogComponent } from '../dialog/index.js';
import { DrawerComponent } from '../drawer/drawer/index.js';
import { MiniDrawerComponent } from '../drawer/mini-drawer/index.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { ScaffoldComponent } from '../scaffold/index.js';
import { ToolbarComponent } from '../toolbar/index.js';
import { APP_LAYOUT_CLOSE_ATTRIBUTE, AppLayoutBreakpoint, AppLayoutBreakpointChangeEventData, AppLayoutDrawerChangeEventData } from './app-layout-constants.js';

import '../app-bar/app-bar/app-bar.js';
import '../app-bar/menu-button/app-bar-menu-button.js';
import '../dialog/dialog.js';
import '../drawer/drawer/drawer.js';
import '../drawer/mini-drawer/mini-drawer.js';
import '../icon-button/icon-button.js';
import '../icon/icon.js';
import '../scaffold/scaffold.js';
import '../toolbar/toolbar.js';

import styles from './app-layout.scss';

export interface IAppLayoutComponent extends BaseLitElement {
  appTitle: string;
  appTitleHref: string;
  breakpoint: number;
  useMiniDrawer: boolean;
  miniHover: boolean;
  readonly isLargeScreen: boolean;
  closeDrawer(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-layout': IAppLayoutComponent;
  }

  interface HTMLElementEventMap {
    'forge-app-layout-breakpoint-change': CustomEvent<AppLayoutBreakpointChangeEventData>;
    'forge-app-layout-drawer-change': CustomEvent<AppLayoutDrawerChangeEventData>;
  }
}

export const APP_LAYOUT_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-app-layout';

/**
 * @tag forge-app-layout
 *
 * @summary A responsive application layout component that provides an app bar with a navigation drawer. On small
 * screens, the navigation appears in a modal dialog. On large screens, it appears in a side drawer.
 *
 * @description
 * The navigation drawer on small screens can be automatically closed when a user clicks on a navigation item by
 * adding the `data-forge-app-layout-close` attribute to any clickable element within the navigation slot.
 * Alternatively, the `closeDrawer()` method can be called programmatically.
 *
 * @meta extended
 *
 * @dependency forge-scaffold
 * @dependency forge-app-bar
 * @dependency forge-app-bar-menu-button
 * @dependency forge-dialog
 * @dependency forge-drawer
 * @dependency forge-mini-drawer
 * @dependency forge-icon-button
 * @dependency forge-icon
 * @dependency forge-toolbar
 *
 * @slot - Default slot. Content without a slot attribute is placed in the body area.
 * @slot body - Explicit body slot. Alternative to using the default slot.
 * @slot header - Places content in the header
 * @slot footer - Places content in the footer
 * @slot left - Places content to the left of all content
 * @slot right - Places content to the right of all content
 * @slot body-header - Places content in the header of the body
 * @slot body-footer - Places content in the footer of the body
 * @slot body-left - Places content to the left of the body content
 * @slot body-right - Places content to the right of the body content
 * @slot navigation - Responsive navigation content that renders in left slot (small screens) or body-left slot (large screens)
 * @slot app-bar-logo - Places content in the app bar logo slot
 * @slot app-bar-start - Places content in the app bar start slot
 * @slot app-bar-center - Places content in the app bar center slot
 * @slot app-bar-end - Places content in the app bar end slot
 *
 * @cssproperty --forge-app-layout-drawer-width - Controls the width of the navigation drawer (default: 320px).
 * @cssproperty --forge-app-layout-dialog-width - Controls the width of the navigation dialog on small screens (default: 320px).
 * @cssproperty --forge-app-layout-mini-drawer-z-index - Controls the z-index of the mini drawer when using hover mode (default: 3).
 *
 * @state small - Screen width is below the breakpoint, navigation appears in modal drawer.
 * @state large - Screen width is at or above the breakpoint, navigation appears in body-left drawer.
 * @state drawer-open - The navigation drawer is currently open.
 * @state drawer-closed - The navigation drawer is currently closed.
 *
 * @event {CustomEvent<AppLayoutBreakpointChangeEventData>} forge-app-layout-breakpoint-change - Fired when the screen size crosses the breakpoint threshold.
 * @event {CustomEvent<AppLayoutDrawerChangeEventData>} forge-app-layout-drawer-change - Fired when the navigation drawer opens or closes.
 */
@customElement(APP_LAYOUT_TAG_NAME)
export class AppLayoutComponent extends BaseLitElement implements IAppLayoutComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = APP_LAYOUT_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [
    ScaffoldComponent,
    AppBarComponent,
    AppBarMenuButtonComponent,
    DialogComponent,
    DrawerComponent,
    MiniDrawerComponent,
    IconButtonComponent,
    IconComponent,
    ToolbarComponent
  ];

  static {
    IconRegistry.define([tylIconClose, tylIconTylerTalkingTLogo]);
  }

  public static styles = unsafeCSS(styles);

  /** The title text to display in the app bar. */
  @property({ type: String, attribute: 'app-title' })
  public appTitle = '';

  /** The URL that the app bar title links to. */
  @property({ type: String, attribute: 'app-title-href' })
  public appTitleHref = '';

  /** The screen width breakpoint in pixels for responsive behavior. */
  @property({ type: Number })
  public breakpoint = 960;

  /** Whether to use `forge-mini-drawer` instead of `forge-drawer` for large screens. */
  @property({ type: Boolean, attribute: 'use-mini-drawer' })
  public useMiniDrawer = false;

  /** Whether the mini drawer should expand on hover. */
  @property({ type: Boolean, attribute: 'mini-hover' })
  public miniHover = false;

  /** Whether the current screen width is above the breakpoint. */
  public get isLargeScreen(): boolean {
    return this._isLargeScreen;
  }

  @queryAssignedNodes({ slot: 'navigation', flatten: true })
  private readonly _navigationNodes!: Node[];

  @state()
  private _leftDrawerOpen = false;

  @state()
  private _isLargeScreen = false;

  #mediaQuery: MediaQueryList | null = null;
  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.#setupMediaQuery();
  }

  public override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    // Re-update states after first render when slotted content is available
    this.#updateStates();
    // Force drawer states to be applied immediately after render
    this.#applyDrawerStates();
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('breakpoint')) {
      this.#cleanupMediaQuery();
      this.#setupMediaQuery();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#cleanupMediaQuery();
  }

  /** Closes the navigation drawer. Only has effect on small screens where the drawer is modal. */
  public closeDrawer(): void {
    if (!this._isLargeScreen) {
      this.#setDrawerClosed();
    }
  }

  public render(): TemplateResult {
    const navigationSlot = html`<slot name="navigation" @slotchange=${this.#handleSlotChange}></slot>`;

    return html`
      <forge-scaffold>
        <forge-app-bar slot="header" .titleText=${this.appTitle} .href=${this.appTitleHref} theme-mode="scoped">
          <slot name="app-bar-logo" slot="logo">
            <forge-icon name="tyler_talking_t_logo"></forge-icon>
          </slot>
          <slot name="app-bar-start" slot="start"></slot>
          ${when(!this._isLargeScreen, () => html`<forge-app-bar-menu-button slot="start" @click=${this.#toggleLeftDrawer}></forge-app-bar-menu-button>`)}
          <slot name="app-bar-center" slot="center"></slot>
          <slot name="app-bar-end" slot="end"></slot>
        </forge-app-bar>

        <!-- Small screens: Navigation in left slot -->
        ${!this._isLargeScreen
          ? this.#hasNavigationContent
            ? html`
                <forge-dialog
                  class="left-sheet-dialog"
                  fullscreen-threshold="0"
                  preset="left-sheet"
                  slot="left"
                  ?open=${this._leftDrawerOpen}
                  @forge-dialog-close=${this.#handleLeftDrawerAfterClose}>
                  <div class="drawer-container">
                    <forge-toolbar no-divider>
                      <forge-icon-button
                        autofocus
                        class="close-drawer-button"
                        slot="before-start"
                        aria-label="Close navigation drawer"
                        @click=${this.#toggleLeftDrawer}>
                        <forge-icon name="close"></forge-icon>
                      </forge-icon-button>
                    </forge-toolbar>
                    <aside @click=${this.#handleNavigationClick}>${navigationSlot}</aside>
                  </div>
                </forge-dialog>
              `
            : navigationSlot
          : ''}
        <slot name="body-header" slot="body-header"></slot>

        <!-- Large screens: Navigation in body-left slot -->
        ${this._isLargeScreen
          ? this.#hasNavigationContent
            ? html`
                <div class="drawer-container ${this.miniHover ? 'mini-hover' : ''}" slot="body-left">
                  ${this.useMiniDrawer
                    ? html`
                        <forge-mini-drawer ?hover=${this.miniHover} ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${this.#handleLeftDrawerAfterClose}>
                          ${navigationSlot}
                        </forge-mini-drawer>
                      `
                    : html`
                        <forge-drawer ?open=${this._leftDrawerOpen} @forge-drawer-after-close=${this.#handleLeftDrawerAfterClose}
                          >${navigationSlot}</forge-drawer
                        >
                      `}
                </div>
              `
            : navigationSlot
          : ''}

        <slot name="body" slot="body"></slot>
        <slot slot="body"></slot>
        <slot name="right" slot="right"></slot>
        <slot name="body-right" slot="body-right"></slot>
        <slot name="body-footer" slot="body-footer"></slot>

        <slot name="footer" slot="footer"></slot>
      </forge-scaffold>
    `;
  }

  #setDrawerClosed(): void {
    if (!this._leftDrawerOpen) {
      return;
    }
    this._leftDrawerOpen = false;
    toggleState(this.#internals, 'drawer-open', false);
    toggleState(this.#internals, 'drawer-closed', true);
    this.#emitDrawerChange(false);
  }

  #setupMediaQuery(): void {
    this.#mediaQuery = window.matchMedia(`(min-width: ${this.breakpoint}px)`);
    this._isLargeScreen = this.#mediaQuery.matches;
    this.#updateStates();
    this.#mediaQuery.addEventListener('change', this.#handleMediaQueryChange);
  }

  #cleanupMediaQuery(): void {
    if (this.#mediaQuery) {
      this.#mediaQuery.removeEventListener('change', this.#handleMediaQueryChange);
      this.#mediaQuery = null;
    }
  }

  #handleMediaQueryChange = (event: MediaQueryListEvent): void => {
    this._isLargeScreen = event.matches;
    this.#updateStates();
    this.#emitBreakpointChange(this._isLargeScreen ? 'large' : 'small');
  };

  #updateStates(): void {
    toggleState(this.#internals, 'small', !this._isLargeScreen);
    toggleState(this.#internals, 'large', this._isLargeScreen);

    // Set drawer defaults based on breakpoint
    if (this._isLargeScreen) {
      // Large screens: navigation drawer always open if content is present
      this._leftDrawerOpen = true;
    } else {
      // Small screens: modal drawer closed by default
      this._leftDrawerOpen = false;
    }

    toggleState(this.#internals, 'drawer-open', this._leftDrawerOpen);
    toggleState(this.#internals, 'drawer-closed', !this._leftDrawerOpen);

    // Apply drawer states immediately after updating them
    if (this.hasUpdated) {
      this.#applyDrawerStates();
    }
  }

  #toggleLeftDrawer = (): void => {
    // Only allow toggling on small screens
    if (this._isLargeScreen) {
      return;
    }

    this._leftDrawerOpen = !this._leftDrawerOpen;

    toggleState(this.#internals, 'drawer-open', this._leftDrawerOpen);
    toggleState(this.#internals, 'drawer-closed', !this._leftDrawerOpen);

    this.#applyDrawerStates();
    this.#emitDrawerChange(this._leftDrawerOpen);
  };

  #handleLeftDrawerAfterClose = (): void => {
    this.#setDrawerClosed();
  };

  #handleSlotChange = (event: Event): void => {
    const slotName = (event.target as HTMLSlotElement).name;
    if (slotName === 'navigation') {
      this.requestUpdate();
    }
  };

  #handleNavigationClick = (event: Event): void => {
    const path = event.composedPath();
    const hasCloseAttribute = path.some(el => el instanceof HTMLElement && el.hasAttribute(APP_LAYOUT_CLOSE_ATTRIBUTE));
    if (hasCloseAttribute) {
      this.closeDrawer();
    }
  };

  #applyDrawerStates(): void {
    // Directly set the open property on drawer elements to ensure they match our state
    const drawerSelector = this.useMiniDrawer ? 'forge-mini-drawer' : 'forge-drawer';
    const leftDrawer = this.shadowRoot?.querySelector(drawerSelector) as (HTMLElement & { open: boolean }) | null;

    if (leftDrawer && leftDrawer.open !== this._leftDrawerOpen) {
      leftDrawer.open = this._leftDrawerOpen;
    }
  }

  #emitBreakpointChange(breakpoint: AppLayoutBreakpoint): void {
    const event = new CustomEvent<AppLayoutBreakpointChangeEventData>('forge-app-layout-breakpoint-change', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { breakpoint }
    });
    this.dispatchEvent(event);
  }

  #emitDrawerChange(open: boolean): void {
    const event = new CustomEvent<AppLayoutDrawerChangeEventData>('forge-app-layout-drawer-change', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: { open }
    });
    this.dispatchEvent(event);
  }

  get #hasNavigationContent(): boolean {
    return this._navigationNodes.length > 0;
  }
}
