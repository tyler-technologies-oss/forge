import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, randomChars } from '@tylertech/forge-core';
import { html, type PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { COMPONENT_NAME_PREFIX } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { TAB_BAR_CONSTANTS } from '../tab-bar/tab-bar-constants.js';
import { TAB_CONSTANTS } from '../tab/tab-constants.js';
import type { TabComponent } from '../tab/tab.js';
import { FocusIndicatorComponent } from '../../focus-indicator/index.js';

import styles from './tab-panel.scss';

export const TAB_PANEL_TAG_NAME: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab-panel`;

/**
 * @tag forge-tab-panel
 *
 * @summary A component that displays content associated with a specific tab.
 *
 * @description
 * The tab panel component displays content that is associated with a specific tab. It handles
 * toggling its visibility based on the active state of the associated tab and manages ARIA
 * relationships for accessibility.
 *
 * @slot - Default slot for the tab panel content.
 *
 * @csspart focus-indicator - The focus indicator element.
 *
 * @state open - Indicates that the tab panel is visible.
 *
 * @fires {ToggleEvent} toggle - Dispatched when the tab panel opens or closes.
 */
@customElement(TAB_PANEL_TAG_NAME)
export class TabPanelComponent extends BaseLitElement {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TAB_PANEL_TAG_NAME;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [FocusIndicatorComponent];

  #internals: ElementInternals;
  #abortController: AbortController | null = null;

  /**
   * The name of the tab that controls this tab panel.
   * @default ''
   */
  @property()
  public for = ''; // TODO: Should this point to an id instead of a name to ensure uniqueness in the document?

  /**
   * Whether the tab panel is open (visible). This is typically controlled by the associated tab,
   * but can also be set directly.
   * @default false
   */
  @property({ type: Boolean })
  public open = false;

  /**
   * When true, prevents the tab panel from automatically receiving focus when it is opened.
   */
  @property({ type: Boolean, attribute: 'no-focus' })
  public noFocus = false;

  #tab: TabComponent | null = null;

  constructor() {
    super();
    this.#internals = this.attachInternals();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'tabpanel'
    });
    this.tabIndex = -1;
    this.#connectToTab();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#disconnectFromTab();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('for')) {
      this.#disconnectFromTab();
      this.#connectToTab();
    }

    if (changedProperties.has('open')) {
      // TODO: Implement a beforetoggle event that can be canceled to prevent the tab panel from
      // opening or closing
      toggleState(this.#internals, 'open', this.open);
      this.#dispatchToggleEvent(changedProperties.get('open') ?? false);
    }
  }

  public render(): TemplateResult {
    return html`
      <slot></slot>
      <forge-focus-indicator target=":host" part="focus-indicator"></forge-focus-indicator>
    `;
  }

  #findTabByName(name: string): TabComponent | null {
    if (!name || !this.isConnected) {
      return null;
    }

    const rootNode = this.getRootNode() as Document | ShadowRoot;
    return rootNode.querySelector<TabComponent>(`${TAB_CONSTANTS.elementName}[name="${name}"]`);
  }

  async #connectToTab(): Promise<void> {
    if (!this.for) {
      this.open = false;
      return;
    }

    const tab = this.#findTabByName(this.for);

    if (!tab) {
      this.open = false;
      this.#setupEventBasedDiscovery();
      return;
    }

    this.#tab = tab;

    this.#setupAriaRelationships();

    await this.#tab.updateComplete;

    this.open = tab.active;
    toggleState(this.#internals, 'open', this.open);

    this.#abortController = new AbortController();
    const signal = this.#abortController.signal;

    const tabBar = tab.closest(TAB_BAR_CONSTANTS.elementName);
    tabBar?.addEventListener(TAB_BAR_CONSTANTS.events.CHANGE, this.#handleTabBarChange, { signal });
  }

  #disconnectFromTab(): void {
    if (this.#abortController) {
      this.#abortController.abort();
      this.#abortController = null;
    }

    this.#clearAriaRelationships();
    this.#tab = null;
  }

  #setupEventBasedDiscovery(): void {
    if (this.#abortController) {
      return;
    }

    this.#abortController = new AbortController();
    const signal = this.#abortController.signal;

    window.addEventListener('forge-tab-registered', this.#handleTabRegistration, { signal });
  }

  #setupAriaRelationships(): void {
    if (!this.#tab) {
      return;
    }

    // Set aria-controls on the tab
    if (Object.prototype.hasOwnProperty.call(this.#tab, 'ariaControlsElements')) {
      this.#tab.ariaControlsElements = [this];
    } else {
      if (!this.id) {
        this.id = `forge-tab-panel-${randomChars()}`;
      }
      this.#tab.setAttribute('aria-controls', this.id);
    }

    // Set aria-labelledby on the tab panel
    if (Object.prototype.hasOwnProperty.call(this.#internals, 'ariaLabelledByElements')) {
      this.#internals.ariaLabelledByElements = [this.#tab];
    } else {
      if (!this.#tab.id) {
        this.#tab.id = `forge-tab-${randomChars()}`;
      }
      this.setAttribute('aria-labelledby', this.#tab.id);
    }
  }

  #clearAriaRelationships(): void {
    if (!this.#tab) {
      return;
    }

    // Clear aria-controls on the tab
    if (Object.prototype.hasOwnProperty.call(this.#tab, 'ariaControlsElements')) {
      this.#tab.ariaControlsElements = null;
    } else {
      if (this.#tab.getAttribute('aria-controls') === this.id) {
        this.#tab.removeAttribute('aria-controls');
      }
    }

    // Clear aria-labelledby on the tab panel
    if (Object.prototype.hasOwnProperty.call(this.#internals, 'ariaLabelledByElements')) {
      this.#internals.ariaLabelledByElements = null;
    } else {
      if (this.getAttribute('aria-labelledby') === this.#tab.id) {
        this.removeAttribute('aria-labelledby');
      }
    }
  }

  #handleTabBarChange: EventListener = async () => {
    if (this.#tab && this.#tab.isConnected) {
      // TODO: This is a significant timing issue - refactor the tab to stabilize its state within one
      // update cycle
      await this.#tab.updateComplete;
      await this.#tab.updateComplete;
      await this.#tab.updateComplete;
      this.open = this.#tab.active;
      if (this.open && !this.noFocus) {
        await this.updateComplete;
        this.focus();
      }
    } else if (this.#tab && !this.#tab.isConnected) {
      this.#disconnectFromTab();
      this.open = false;
    }
  };

  #handleTabRegistration: EventListener = event => {
    const customEvent = event as CustomEvent<{ name?: string }>;
    const tabName = customEvent.detail?.name;

    if (!this.#tab && tabName === this.for) {
      this.#connectToTab();
    }
  };

  #dispatchToggleEvent(wasOpen: boolean): void {
    const oldState = wasOpen ? 'open' : 'closed';
    const newState = this.open ? 'open' : 'closed';
    this.dispatchEvent(new ToggleEvent('toggle', { oldState, newState, bubbles: true, composed: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tab-panel': TabPanelComponent;
  }
}
