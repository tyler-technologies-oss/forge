import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, randomChars } from '@tylertech/forge-core';
import { html, type PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { COMPONENT_NAME_PREFIX } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { toggleState } from '../../core/utils/utils.js';
import { TAB_CONSTANTS } from '../tab/tab-constants.js';
import type { TabComponent } from '../tab/tab.js';
import { FocusIndicatorComponent } from '../../focus-indicator/index.js';

import styles from './tab-panel.scss';

export const TAB_PANEL_TAG_NAME: keyof HTMLElementTagNameMap = `${COMPONENT_NAME_PREFIX}tab-panel`;

export type TabPanelFocusMode = 'auto' | 'off';

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
 * @fires {BeforeToggleEvent} beforetoggle - Dispatched before the tab panel opens or closes. This event is cancelable.
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

  /**
   * The ID of the tab that controls this tab panel.
   * @default ''
   */
  @property()
  public for = '';

  /**
   * A reference to the associated tab element. This is typically set automatically based on the `for` property, but can also be set directly for more dynamic use cases.
   * @default null
   */
  @property({ attribute: false })
  public forElement: TabComponent | null = null;

  /**
   * Whether the tab panel is open (visible). This is typically controlled by the associated tab,
   * but can also be set directly.
   * @default false
   */
  @property({ type: Boolean })
  public open = false;

  /**
   * Controls how focus is managed when the tab panel is opened. When set to 'auto' focus is set to
   * the panel when it opens. Set to 'off' to disable this behavior.
   * @default 'auto'
   * @attribute focus-mode
   */
  @property({ attribute: 'focus-mode' })
  public focusMode: TabPanelFocusMode = 'auto';

  #abortController: AbortController | null = null;
  #tabObserver: MutationObserver | null = null;

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
    this.#connectToTab(this.forElement);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this.#disconnectFromTab(this.forElement);
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('for')) {
      this.forElement = this.#getTabById(this.for);
    }

    if (changedProperties.has('forElement')) {
      this.#disconnectFromTab(changedProperties.get('forElement') ?? null);
      this.#connectToTab(this.forElement);
    }
  }

  public updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('open')) {
      toggleState(this.#internals, 'open', this.open);
    }
  }

  public render(): TemplateResult {
    return html`
      <slot></slot>
      <forge-focus-indicator target=":host" part="focus-indicator"></forge-focus-indicator>
    `;
  }

  #getTabById(id: string): TabComponent | null {
    if (!id || !this.isConnected) {
      return null;
    }

    const rootNode = this.getRootNode() as Document | ShadowRoot;
    const element = rootNode.getElementById(id);

    if (!element) {
      console.warn(`[forge-tab-panel] No element found with id "${id}" to associate with the tab panel.`, { elementId: id });
      return null;
    }

    if (element instanceof HTMLElement && element.tagName.toLowerCase() === TAB_CONSTANTS.elementName) {
      return element as TabComponent;
    }

    console.warn(`[forge-tab-panel] Element with id "${id}" is not a <forge-tab> and cannot be associated with the tab panel.`, { elementId: id, element });
    return null;
  }

  async #connectToTab(tab: TabComponent | null): Promise<void> {
    if (!tab) {
      this.open = false;
      this.#watchForTabConnected();
      return;
    }

    this.#setupAriaRelationships(tab);

    await tab.updateComplete;
    this.open = tab.active;
    toggleState(this.#internals, 'open', this.open);

    this.#abortController?.abort();
    this.#abortController = new AbortController();
    const signal = this.#abortController.signal;
    tab.addEventListener('forge-tab-request-sync', this.#handleSync, { signal });

    this.#startTabObserver(tab);
  }

  #disconnectFromTab(tab: TabComponent | null): void {
    this.#stopTabObserver();

    if (this.#abortController) {
      this.#abortController.abort();
      this.#abortController = null;
    }

    this.#clearAriaRelationships(tab);
    if (this.forElement === tab) {
      this.forElement = null;
    }
  }

  #startTabObserver(tab: TabComponent | null): void {
    if (!tab) {
      return;
    }

    this.#tabObserver = new MutationObserver(() => {
      if (tab && !tab.isConnected) {
        this.#handleTabDisconnected(tab);
      }
    });

    const parent = tab.parentElement;
    if (parent) {
      this.#tabObserver.observe(parent, {
        childList: true,
        subtree: false
      });
    }
  }

  #stopTabObserver(): void {
    if (this.#tabObserver) {
      this.#tabObserver.disconnect();
      this.#tabObserver = null;
    }
  }

  #handleTabDisconnected(tab: TabComponent | null): void {
    this.#stopTabObserver();
    this.#disconnectFromTab(tab);
    this.open = false;
    this.#watchForTabConnected();
  }

  #watchForTabConnected(): void {
    if (this.#abortController) {
      return;
    }

    this.#abortController = new AbortController();
    const signal = this.#abortController.signal;

    window.addEventListener('forge-tab-connected', this.#handleTabConnected, { signal });
  }

  #setupAriaRelationships(tab: TabComponent | null): void {
    if (!tab) {
      return;
    }

    // Set aria-controls on the tab
    if (Object.prototype.hasOwnProperty.call(tab, 'ariaControlsElements')) {
      tab.ariaControlsElements = [this];
    } else {
      if (!this.id) {
        this.id = `forge-tab-panel-${randomChars()}`;
      }
      tab.setAttribute('aria-controls', this.id);
    }

    // Set aria-labelledby on the tab panel
    if (Object.prototype.hasOwnProperty.call(this.#internals, 'ariaLabelledByElements')) {
      this.#internals.ariaLabelledByElements = [tab];
    } else {
      if (!tab.id) {
        tab.id = `forge-tab-${randomChars()}`;
      }
      this.setAttribute('aria-labelledby', tab.id);
    }
  }

  #clearAriaRelationships(tab: TabComponent | null): void {
    if (!tab) {
      return;
    }

    // Clear aria-controls on the tab
    if (Object.prototype.hasOwnProperty.call(tab, 'ariaControlsElements')) {
      tab.ariaControlsElements = null;
    } else {
      if (tab.getAttribute('aria-controls') === this.id) {
        tab.removeAttribute('aria-controls');
      }
    }

    // Clear aria-labelledby on the tab panel
    if (Object.prototype.hasOwnProperty.call(this.#internals, 'ariaLabelledByElements')) {
      this.#internals.ariaLabelledByElements = null;
    } else {
      if (this.getAttribute('aria-labelledby') === tab.id) {
        this.removeAttribute('aria-labelledby');
      }
    }
  }

  #handleSync: EventListener = evt => {
    if (!this.forElement || evt.target !== this.forElement) {
      return;
    }

    const shouldOpen = this.forElement.active;
    if (shouldOpen === this.open) {
      // No change
      return;
    }

    // Dispatch a beforetoggle event that can be canceled to prevent the tab panel from opening or closing
    const beforeToggleEvent = this.#dispatchBeforeToggleEvent(!this.forElement.active);
    if (beforeToggleEvent.defaultPrevented) {
      evt.preventDefault();
      this.forElement.active = !shouldOpen;
      return;
    }

    // Sync the open state with the tab's active state
    this.open = this.forElement.active;
    this.#dispatchToggleEvent(this.open);

    // Set focus if the tab was focused at the time the panel opened
    if (this.open && this.focusMode === 'auto' && this.forElement.matches(':focus')) {
      this.forElement.updateComplete.then(() => this.focus());
    }
  };

  #handleTabConnected: EventListener = event => {
    const customEvent = event as CustomEvent<TabComponent>;
    const element = customEvent.detail;
    const id = customEvent.detail?.id;

    if (this.forElement && this.forElement === element) {
      this.#connectToTab(element);
    } else if (!this.forElement && id === this.for) {
      this.forElement = element;
    }
  };

  #dispatchBeforeToggleEvent(willOpen: boolean): ToggleEvent {
    const oldState = this.open ? 'open' : 'closed';
    const newState = willOpen ? 'open' : 'closed';
    const event = new ToggleEvent('beforetoggle', { oldState, newState, bubbles: true, cancelable: true, composed: true });
    this.dispatchEvent(event);
    return event;
  }

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
