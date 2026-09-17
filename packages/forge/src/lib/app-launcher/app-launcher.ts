import { PropertyValues, TemplateResult, html, nothing, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedNodes, state } from 'lit/decorators.js';
import { cache } from 'lit/directives/cache.js';
import { when } from 'lit/directives/when.js';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { tylIconApplication, tylIconApps, tylIconArrowBack, tylIconChevronRight, tylIconClose, tylIconSearch } from '@tylertech/tyler-icons';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { toggleState } from '../core/utils/utils.js';
import { AvatarComponent } from '../avatar/index.js';
import { ButtonComponent } from '../button/index.js';
import { CardComponent } from '../card/index.js';
import { DialogComponent } from '../dialog/index.js';
import { IconButtonComponent } from '../icon-button/index.js';
import { IconComponent, IconRegistry } from '../icon/index.js';
import { ListComponent } from '../list/list/index.js';
import { ListItemComponent } from '../list/list-item/index.js';
import { IPopoverToggleEventData, PopoverComponent } from '../popover/index.js';
import { SkeletonComponent } from '../skeleton/index.js';
import { TextFieldComponent } from '../text-field/index.js';
import { ToolbarComponent } from '../toolbar/index.js';
import { AppLauncherOption, AppLauncherView } from './app-launcher-constants.js';

import '../avatar/avatar.js';
import '../button/button.js';
import '../card/card.js';
import '../dialog/dialog.js';
import '../icon-button/icon-button.js';
import '../icon/icon.js';
import '../list/list/list.js';
import '../list/list-item/list-item.js';
import '../popover/popover.js';
import '../skeleton/skeleton.js';
import '../text-field/text-field.js';
import '../toolbar/toolbar.js';

import styles from './app-launcher.scss';

export interface IAppLauncherComponent extends BaseLitElement {
  open: boolean;
  relatedApps: AppLauncherOption[];
  allApps: AppLauncherOption[];
  launcherAriaLabel: string;
  backAriaLabel: string;
  closeAriaLabel: string;
  searchPlaceholder: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-app-launcher': IAppLauncherComponent;
  }
}

export const APP_LAUNCHER_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-app-launcher';

/**
 * @tag forge-app-launcher
 *
 * @summary A navigation component that enables users to switch between applications and contexts, presenting as a
 * popover on desktop devices and a full-screen dialog on mobile devices.
 *
 * @meta extended
 *
 * @dependency forge-avatar
 * @dependency forge-button
 * @dependency forge-card
 * @dependency forge-dialog
 * @dependency forge-icon-button
 * @dependency forge-icon
 * @dependency forge-list
 * @dependency forge-list-item
 * @dependency forge-popover
 * @dependency forge-skeleton
 * @dependency forge-text-field
 * @dependency forge-toolbar
 *
 * @slot header-title - Title text for the app launcher header
 * @slot related-apps-title - Title text for the related apps section
 * @slot all-apps-title - Title text for the all apps view
 * @slot view-all-apps-button-text - Text for the button that switches to all apps view
 * @slot app-launcher-links-title - Title text for the custom links section
 * @slot app-launcher-link - Individual custom link items using forge-app-launcher-link
 * @slot empty-state-text - Text shown when no applications match the search filter
 * @slot loading-text - Text shown while the app launcher is in the loading state
 *
 * @state small - The component is displayed in mobile/small screen mode (dialog)
 * @state large - The component is displayed in desktop/large screen mode (popover)
 */
@customElement(APP_LAUNCHER_TAG_NAME)
export class AppLauncherComponent extends BaseLitElement implements IAppLauncherComponent {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = APP_LAUNCHER_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [
    AvatarComponent,
    ButtonComponent,
    CardComponent,
    DialogComponent,
    IconButtonComponent,
    IconComponent,
    ListComponent,
    ListItemComponent,
    PopoverComponent,
    SkeletonComponent,
    TextFieldComponent,
    ToolbarComponent
  ];

  static {
    IconRegistry.define([tylIconApplication, tylIconApps, tylIconArrowBack, tylIconChevronRight, tylIconClose, tylIconSearch]);
  }

  public static styles = unsafeCSS(styles);

  /** Indicates whether the dialog or popover is open. */
  @property({ type: Boolean })
  public open = false;

  /** An array of related apps for the related apps view. */
  @property({ type: Array, attribute: false })
  public relatedApps: AppLauncherOption[] = [];

  /** An array of all available apps for the all apps view. */
  @property({ type: Array, attribute: false })
  public allApps: AppLauncherOption[] = [];

  /** ARIA label for the app launcher trigger button. */
  @property({ type: String, attribute: 'launcher-aria-label' })
  public launcherAriaLabel = 'Open app launcher';

  /** ARIA label for the back button. */
  @property({ type: String, attribute: 'back-aria-label' })
  public backAriaLabel = 'Go back';

  /** ARIA label for the close button. */
  @property({ type: String, attribute: 'close-aria-label' })
  public closeAriaLabel = 'Close app launcher';

  /** Placeholder text for the search input in the all apps view. */
  @property({ type: String, attribute: 'search-placeholder' })
  public searchPlaceholder = 'Search by product or app';

  @state()
  private _appView: AppLauncherView = 'related';

  @state()
  private _filterText = '';

  @state()
  private _smallScreen = false;

  @query('#search-field')
  private readonly _searchField!: HTMLInputElement;

  @query('#app-launcher-popover')
  private readonly _appLauncherPopover!: PopoverComponent;

  @queryAssignedNodes({ slot: 'app-launcher-link', flatten: true })
  private readonly _slottedAppLauncherLinkNodes!: Node[];

  #mediaQuery?: MediaQueryList;
  readonly #internals: ElementInternals;
  readonly #breakpoint = 768;
  readonly #numberOfSkeletons = 5;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  readonly #headerTitleSlot = html`<slot name="header-title" id="header-title-slot">App Launcher</slot>`;

  readonly #emptyStateTextSlot = html`<slot name="empty-state-text" id="empty-state-text-slot">No applications found</slot>`;

  readonly #loadingTextSlot = html`<slot name="loading-text" id="loading-text-slot">Loading apps</slot>`;

  readonly #relatedAppsTitleSlot = html`<h2><slot name="related-apps-title" id="related-apps-title-slot">Related apps</slot></h2>`;

  readonly #allAppsTitleSlot = html`<slot name="all-apps-title" id="all-apps-title-slot">All apps</slot>`;

  readonly #viewAllAppsButtonSlot = html`<slot name="view-all-apps-button-text" id="view-all-apps-button-text-slot">View all apps</slot>`;

  readonly #appLauncherLinksTitleSlot = html`<slot name="app-launcher-links-title" id="app-launcher-links-title-slot"></slot>`;

  readonly #appLauncherLinkSlot = html`<slot name="app-launcher-link" id="app-launcher-link-slot"></slot>`;

  readonly #emptyState = html`
    <div class="empty-state">
      <forge-icon name="search"></forge-icon>
      <p>${this.#emptyStateTextSlot}</p>
    </div>
  `;

  public override connectedCallback(): void {
    super.connectedCallback();
    if (this.#isLoading) {
      this._appView = 'loading';
    } else if (!this.relatedApps?.length) {
      this._appView = 'all';
    }
    this.#setupMediaQuery();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#mediaQuery?.removeEventListener('change', this.#handleMediaChange);
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('relatedApps') || changedProperties.has('allApps')) {
      if (this.#isLoading) {
        this._appView = 'loading';
      } else if (!this.relatedApps?.length) {
        this._appView = 'all';
      } else {
        this._appView = 'related';
      }
    }
  }

  public render(): TemplateResult {
    return when(
      !this._smallScreen,
      () =>
        html`${cache(html`
          ${this.#appLauncherIcon}
          <forge-popover
            arrow
            placement="bottom-end"
            position-strategy="fixed"
            anchor="app-launcher-trigger"
            @slotchange=${this.#handleSlotChange}
            @forge-popover-toggle=${async (e: CustomEvent<IPopoverToggleEventData>) => {
              const { newState } = e.detail;
              if (newState === 'closed') {
                await this._appLauncherPopover.hideAsync();
                this.#resetState();
              } else if (newState === 'open') {
                this.open = true;
              }
            }}
            id="app-launcher-popover">
            ${this.#containerContent}
          </forge-popover>
        `)}`,
      () => html`
        ${cache(html`
          ${this.#appLauncherIcon}
          <forge-dialog
            persistent
            .open=${this.open}
            @slotchange=${this.#handleSlotChange}
            @forge-dialog-close=${() => {
              this.#resetState();
            }}>
            ${this.#containerContent}
          </forge-dialog>
        `)}
      `
    );
  }

  get #appLauncherIcon(): TemplateResult {
    return html`<forge-icon-button
      theme="app-bar"
      aria-label=${this.launcherAriaLabel}
      id="app-launcher-trigger"
      @click=${this._smallScreen ? () => (this.open = !this.open) : null}>
      <forge-icon name="apps"></forge-icon>
    </forge-icon-button>`;
  }

  get #backButton(): TemplateResult | typeof nothing {
    const showBackButton = this._appView === 'all' && this.relatedApps?.length;
    return when(
      showBackButton,
      () => html`
        <forge-icon-button aria-label=${this.backAriaLabel} slot="before-start" @click=${async () => await this.#transitionToView('related')}>
          <forge-icon name="arrow_back"></forge-icon>
        </forge-icon-button>
      `,
      () => nothing
    );
  }

  get #header(): TemplateResult {
    return html`
      <forge-toolbar class="header" no-divider>
        <h1 slot="start">${this.#headerTitleSlot}</h1>
        ${this.#backButton}
        <forge-icon-button
          aria-label=${this.closeAriaLabel}
          class="close-button"
          slot="end"
          @click=${() => {
            this.#resetState();
          }}>
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>
      </forge-toolbar>
    `;
  }

  get #relatedApps(): TemplateResult | typeof nothing {
    const showRelatedApps = this._appView === 'related';
    return when(
      showRelatedApps,
      () => html`
        ${this.#relatedAppsTitleSlot}
        <forge-list>${this.relatedApps?.map(app => html` ${this.#appListItem(app)} `)}</forge-list>
      `,
      () => nothing
    );
  }

  get #searchAllAppsField(): TemplateResult | typeof nothing {
    const showSearchInput = this._appView === 'all';
    return when(
      showSearchInput,
      () => html`
        <forge-text-field density=${this._smallScreen ? 'large' : 'small'}>
          <forge-icon name="search" slot="leading"></forge-icon>
          <input type="text" placeholder=${this.searchPlaceholder} @input=${this.#onInputChange} id="search-field" autocomplete="off" />
        </forge-text-field>
      `,
      () => nothing
    );
  }

  get #allApps(): TemplateResult | typeof nothing {
    const showAllApps = this._appView === 'all';
    return when(
      showAllApps,
      () => html`
        ${when(
          !this.#filteredApps?.length && this._filterText,
          () => html`${this.#emptyState}`,
          () => html`
            <h2>${this.#allAppsTitleSlot}</h2>
            <forge-list>${this.#filteredApps?.map(app => html` ${this.#appListItem(app)} `)}</forge-list>
          `
        )}
      `,
      () => nothing
    );
  }

  get #loading(): TemplateResult | typeof nothing {
    return when(
      this._appView === 'loading',
      () => html`
        <div class="loading-state">
          <forge-skeleton class="title-skeleton" aria-hidden="true"></forge-skeleton>
          ${Array.from({ length: this.#numberOfSkeletons }, () => html`<forge-skeleton aria-hidden="true"></forge-skeleton>`)}
          <forge-skeleton class="button-skeleton" aria-hidden="true"></forge-skeleton>
          <span class="loading-text">${this.#loadingTextSlot}</span>
        </div>
      `,
      () => nothing
    );
  }

  get #viewAllAppsButton(): TemplateResult | typeof nothing {
    const showAllAppsButton = this._appView === 'related';
    return when(
      showAllAppsButton,
      () => html`
        <forge-button variant="raised" ?disabled=${this.#isLoading} @click=${this.#switchToAllAppsView}>
          <span>${this.#viewAllAppsButtonSlot}</span>
          <forge-icon name="chevron_right"></forge-icon>
        </forge-button>
      `,
      () => nothing
    );
  }

  get #appLauncherLinks(): TemplateResult | typeof nothing {
    const showLinks = this._slottedAppLauncherLinkNodes.length > 0;
    return when(
      showLinks,
      () => html`
        <forge-card class="app-launcher-links-card">
          <div class="app-launcher-links">
            <h2>${this.#appLauncherLinksTitleSlot}</h2>
            <forge-list>${this.#appLauncherLinkSlot}</forge-list>
          </div>
        </forge-card>
      `,
      () => this.#appLauncherLinkSlot
    );
  }

  get #searchContainer(): TemplateResult | typeof nothing {
    return when(
      this._appView === 'all',
      () => html`<div class="search-container">${this.#searchAllAppsField}</div>`,
      () => nothing
    );
  }

  get #appContent(): TemplateResult {
    return html`
      <div class="app-list-container v-stack">
        <div class="scroll-container v-stack">${this.#relatedApps} ${this.#allApps} ${this.#loading}</div>
      </div>
    `;
  }

  get #viewAllAppsButtonContainer(): TemplateResult | typeof nothing {
    return when(
      this._appView === 'related',
      () => html`<div class="view-all-apps-button">${this.#viewAllAppsButton}</div>`,
      () => nothing
    );
  }

  get #mainCard(): TemplateResult {
    return html` <forge-card no-padding>${this.#searchContainer} ${this.#appContent} ${this.#viewAllAppsButtonContainer}</forge-card> `;
  }

  get #containerContent(): TemplateResult {
    const innerContainerClass = this._appView === 'related' && this._smallScreen ? 'inner-container related-view' : 'inner-container';
    return html`
      <div class="outer-container">
        ${this.#header}
        <div class="${innerContainerClass}">${this.#mainCard} ${this.#appLauncherLinks}</div>
      </div>
    `;
  }

  get #filteredApps(): AppLauncherOption[] {
    return this.allApps?.filter(app => app.label.toLowerCase().includes(this._filterText));
  }

  get #isLoading(): boolean {
    return !this.relatedApps?.length && !this.allApps?.length;
  }

  #appListItem(app: AppLauncherOption): TemplateResult {
    return html`
      <forge-list-item class="app-list-item">
        <forge-avatar class="app-avatar" slot="start">
          <forge-icon name=${app.iconName || 'application'} ?external=${!!app.iconName}></forge-icon>
        </forge-avatar>
        <a href="${app.uri}" target="${app.target || '_blank'}">${app.label}</a>
      </forge-list-item>
    `;
  }

  #setupMediaQuery(): void {
    this.#mediaQuery?.removeEventListener('change', this.#handleMediaChange);
    this.#mediaQuery = window.matchMedia(`(max-width: ${this.#breakpoint}px)`);
    this.#mediaQuery.addEventListener('change', this.#handleMediaChange);
    this.#handleMediaChange(this.#mediaQuery, true);
  }

  #handleMediaChange = (e: MediaQueryList | MediaQueryListEvent, isInitial?: boolean): void => {
    this._smallScreen = e.matches;

    toggleState(this.#internals, 'small', this._smallScreen);
    toggleState(this.#internals, 'large', !this._smallScreen);

    if (!isInitial && this.isConnected) {
      requestAnimationFrame(() => {
        if (this._appLauncherPopover && this.open) {
          this._appLauncherPopover.open = true;
        }
      });
    }
  };

  #onInputChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    this._filterText = target.value.toLowerCase();
  };

  async #transitionToView(newView: AppLauncherView): Promise<void> {
    if (this._appView === newView) {
      return;
    }

    this._appView = newView;

    await this.updateComplete;

    if (newView === 'related') {
      this._filterText = '';
      const input = this._searchField;
      if (input) {
        input.value = '';
      }
    }

    if (newView === 'all') {
      const input = this._searchField;
      input?.focus();
    }
  }

  #resetState(): void {
    this._appView = this.#isLoading ? 'loading' : this.relatedApps?.length ? 'related' : 'all';
    this._filterText = '';
    this.open = false;
    if (this._appLauncherPopover) {
      this._appLauncherPopover.open = false;
    }
  }

  #switchToAllAppsView = async (): Promise<void> => {
    await this.#transitionToView('all');
  };

  #handleSlotChange = (evt: Event): void => {
    const slotName = (evt.target as HTMLSlotElement).name;
    if (
      [
        'app-launcher-link',
        'app-launcher-links-title',
        'related-apps-title',
        'view-all-apps-button-text',
        'all-apps-title',
        'header-title',
        'empty-state-text',
        'loading-text'
      ].includes(slotName)
    ) {
      this.requestUpdate();
    }
  };
}
