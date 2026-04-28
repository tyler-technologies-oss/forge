import { createContext, provide } from '@lit/context';
import { CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver, isDefined } from '@tylertech/forge-core';
import { tylIconKeyboardArrowDown, tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { composedPathFrom } from '../../core/utils/event-utils.js';
import { supportsScrollIntoViewContainerOption } from '../../core/utils/feature-detection.js';
import { createFocusGroupRef, focusGroup } from '../../core/utils/focus-group.js';
import { KeyActionController } from '../../core/utils/key-action.js';
import { toggleState } from '../../core/utils/utils.js';
import { IconButtonComponent } from '../../icon-button/icon-button.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { TAB_CONSTANTS } from '../tab/tab-constants.js';
import { TabComponent } from '../tab/tab.js';
import { ITabBarChangeEventData, TAB_BAR_CONSTANTS, TabBarTheme } from './tab-bar-constants.js';

import styles from './tab-bar.scss';

/** @deprecated - This will be removed in the future. Please switch to using TabBarComponent. */
export interface ITabBarComponent extends BaseLitElement {
  disabled: boolean;
  activeTab: number | null | undefined;
  vertical: boolean;
  clustered: boolean;
  stacked: boolean;
  /** @deprecated This will be removed in a future version */
  secondary: boolean;
  inverted: boolean;
  removable: boolean;
  autoActivate: boolean;
  scrollButtons: boolean;
}

export const TAB_BAR_DISABLED = createContext<boolean>('tab-bar-disabled');
export const TAB_BAR_VERTICAL = createContext<boolean>('tab-bar-vertical');
export const TAB_BAR_STACKED = createContext<boolean>('tab-bar-stacked');
export const TAB_BAR_SECONDARY = createContext<boolean>('tab-bar-secondary');
export const TAB_BAR_INVERTED = createContext<boolean>('tab-bar-inverted');
export const TAB_BAR_REMOVABLE = createContext<boolean>('tab-bar-removable');

type TabBarScrollDirection = 'backward' | 'forward';

/**
 * @tag forge-tab-bar
 *
 * @summary Tab bars organize a set of tabs, holding selection state and enabling navigation between different views or sections of content.
 *
 * @description
 * Use tabs to group content into helpful categories. Tabs are typically placed
 * above the content they relate to. Tabs can be used to navigate between screens,
 * or to group related content within a screen.
 *
 * @dependency forge-tab
 * @dependency forge-icon-button
 * @dependency forge-icon
 *
 * @event {CustomEvent<ITabBarChangeEventData>} forge-tab-bar-change - Dispatches when the active tab changes.
 *
 * @cssproperty --forge-tab-bar-justify - The `justify-content` value for the tab bar flex container.
 * @cssproperty --forge-tab-bar-stretch - The `flex` value for the child `<forge-tab>` elements.
 * @cssproperty --forge-tab-bar-divider-color - The color of the divider.
 * @cssproperty --forge-tab-bar-divider-thickness - The thickness of the divider.
 *
 * @csspart container - The container element.
 * @csspart scroll-container - The scroll container element.
 *
 * @slot - The tabs to display.
 */
@customElement(TAB_BAR_CONSTANTS.elementName)
export class TabBarComponent extends BaseLitElement implements ITabBarComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TAB_BAR_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  // public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [TabComponent, IconButtonComponent, IconComponent];

  static {
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp, tylIconKeyboardArrowDown]);
  }

  #internals: ElementInternals;

  // TODO: Remove attribute reflection

  /**
   * Sets the disabled state of all child tabs. If true, any new tabs added to the DOM will be disabled by default.
   * This can be used instead of setting individual tab disabled properties, mixing the two methods of disabling is not supported.
   * @default false
   * @attribute
   */
  @provide({ context: TAB_BAR_DISABLED })
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The active tab element.
   * @default undefined
   */
  @property({ type: Object, attribute: false })
  public activeTabElement: TabComponent | null | undefined;

  /**
   * The name of the active tab element.
   * @default undefined
   * @attribute active-tab-name
   */
  @property({ attribute: 'active-tab-name' })
  public activeTabName: string | null | undefined;

  /**
   * The index of the active tab.
   * @default undefined
   * @attribute active-tab-index
   */
  @property({ type: Number, reflect: true, attribute: 'active-tab-index' })
  public activeTabIndex: number | null | undefined;

  /**
   * The index of the active tab.
   * @deprecated Use activeTabIndex, activeTabElement, or activeTabName instead
   * @default undefined
   * @attribute active-tab
   */
  @property({ type: Number, reflect: true, attribute: 'active-tab' })
  public set activeTab(value: typeof this.activeTabIndex) {
    this.activeTabIndex = value;
  }
  public get activeTab(): typeof this.activeTabIndex {
    return this.activeTabIndex;
  }

  /**
   * Controls whether the tab bar is vertical or horizontal.
   * @default false
   * @attribute
   */
  @provide({ context: TAB_BAR_VERTICAL })
  @property({ type: Boolean, reflect: true })
  public vertical = false;

  /**
   * Controls whether the tabs stretch the full width of their container or cluster together at their minimum width.
   * @default false
   * @attribute
   */
  @property({ type: Boolean, reflect: true })
  public clustered = false;

  /**
   * Controls whether the tabs are taller to allow for slotted leading/trailing elements.
   * @default false
   * @attribute
   */
  @provide({ context: TAB_BAR_STACKED })
  @property({ type: Boolean, reflect: true })
  public stacked = false;

  /**
   * Deprecated. Controls whether the tabs are styled as secondary tab navigation.
   * @default false
   * @attribute
   * @deprecated This will be removed in a future version.
   */
  @provide({ context: TAB_BAR_SECONDARY })
  @property({ type: Boolean, reflect: true })
  public secondary = false;

  /**
   * Controls whether the tabs are rendered inverted (tab indicator at top instead of bottom).
   * @default false
   * @attribute
   */
  @provide({ context: TAB_BAR_INVERTED })
  @property({ type: Boolean, reflect: true })
  public inverted = false;

  /**
   * Controls whether the tabs can be removed with the delete key.
   * @default false
   * @attribute
   */
  @provide({ context: TAB_BAR_REMOVABLE })
  @property({ type: Boolean })
  public removable = false;

  /**
   * Controls whether the tabs are automatically activated when receiving focus.
   * @default false
   * @attribute auto-activate
   */
  @property({ type: Boolean, reflect: true, attribute: 'auto-activate' })
  public autoActivate = false;

  /**
   * Controls whether scroll buttons are displayed when the tabs overflow their container.
   * @default false
   * @attribute scroll-buttons
   */
  @property({ type: Boolean, reflect: true, attribute: 'scroll-buttons' })
  public scrollButtons = false;

  @property()
  public theme: TabBarTheme = 'default';

  @state() private _scrollable = false;
  @state() private _scrolledToStart = false;
  @state() private _scrolledToEnd = false;

  @query('.forge-tab-bar', true) private _rootElement?: HTMLElement;
  @query('.scroll-container', true) private _scrollContainer?: HTMLElement;
  @query('.scroll-button-previous') private _previousButton?: IconButtonComponent;
  @query('.scroll-button-next') private _nextButton?: IconButtonComponent;

  #focusGroupRef = createFocusGroupRef({
    selector: 'forge-tab:not(:state(disabled))',
    orientation: this.vertical ? 'vertical' : 'horizontal',
    wrap: false,
    onFocusChange: element => this.#handleTabFocus(element)
  });

  constructor() {
    super();
    this.#internals = this.attachInternals();
    new KeyActionController(this, {
      actions: [
        { key: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], handler: this.#handleNavigationKey.bind(this), allowRepeat: true },
        { key: ['Home', 'End'], handler: this.#handleNavigationKey.bind(this) },
        { key: ['Enter', ' '], handler: this.#handleSelectKey.bind(this) },
        { key: ['Backspace'], handler: this.#handleRemoveKey.bind(this) },
        { key: ['Shift+F10'], handler: this.#handleMenuKey.bind(this) }
      ]
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'tablist',
      ariaOrientation: this.vertical ? 'vertical' : null
    });
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    // Sync properties to child tabs
    if (changedProperties.has('activeTab')) {
      this.#setActiveTab();
    }

    if (changedProperties.has('disabled')) {
      toggleState(this.#internals, 'disabled', this.disabled);
    }

    if (changedProperties.has('vertical')) {
      toggleState(this.#internals, 'vertical', this.vertical);
      setDefaultAria(this, this.#internals, { ariaOrientation: this.vertical ? 'vertical' : null });
      this.#focusGroupRef.orientation = this.vertical ? 'vertical' : 'horizontal';
    }
  }

  public updated(changedProperties: PropertyValues<this>): void {
    // Scroll active tab into view after render
    if (changedProperties.has('activeTab')) {
      this.#tryScrollActiveTabIntoView();
    }

    // Enable/disable scroll controller
    if (changedProperties.has('scrollButtons')) {
      if (this.scrollButtons) {
        this.#connectResizeObserver();
      } else {
        this.#disconnectResizeObserver();
      }
    }
  }

  public disconnectedCallback(): void {
    this.#disconnectResizeObserver();
  }

  public render(): TemplateResult {
    const classes = {
      'forge-tab-bar': true,
      vertical: this.vertical,
      clustered: this.clustered,
      inverted: this.inverted,
      'app-bar': this.theme === 'app-bar'
    };
    return html`
      <div class=${classMap(classes)} part="container" @click=${this.#handleClick}>
        ${this._scrollable ? this.#scrollButton('backward') : nothing}
        <div
          class="scroll-container"
          part="scroll-container"
          @scroll=${this.#handleScroll}
          @forge-tab-request-remove=${this.#handleRemoveRequest}
          ${focusGroup(this.#focusGroupRef)}>
          <slot @slotchange=${this.#handleSlotChange}></slot>
        </div>
        ${this._scrollable ? this.#scrollButton('forward') : nothing}
      </div>
    `;
  }

  // *****
  // Event Handlers
  // *****

  #handleClick(evt: PointerEvent): void {
    const tab = this.#getTabFromEvent(evt);
    if (!tab) {
      return;
    }
    this.#selectTab(tab);
    this.#focusGroupRef.focus(tab);
  }

  #handleSelectKey(evt: KeyboardEvent): void {
    const tab = this.#getTabFromEvent(evt);
    if (!tab) {
      return;
    }
    evt.preventDefault();
    tab.playStateLayerAnimation();
    this.#selectTab(tab);
  }

  #handleNavigationKey(evt: KeyboardEvent): void {
    if (this.#getTabFromEvent(evt)) {
      this.#focusGroupRef.fromEvent(evt);
    }
  }

  #handleRemoveKey(evt: KeyboardEvent): void {
    const tab = this.#getTabFromEvent(evt);
    if (!tab || !tab.removable) {
      return;
    }
    evt.preventDefault();
    if (this.#dispatchRemoveEvent(tab)) {
      this.#removeTab(tab);
    }
  }

  #handleMenuKey(evt: KeyboardEvent): void {
    const tab = this.#getTabFromEvent(evt);
    if (!tab) {
      return;
    }
    evt.preventDefault();
    console.warn('Menu key pressed on tab, but no menu is implemented.');
    // TODO: Open the tab's associated menu if it has one
  }

  #handleTabFocus(element: HTMLElement): void {
    this.#scrollTabIntoView(element as TabComponent);
    if (this.autoActivate) {
      // Automatically select the tab when it receives focus
      this.#selectTab(element as TabComponent);
    }
  }

  async #handleSlotChange(): Promise<void> {
    await this.#setActiveTab();

    if (this.scrollButtons) {
      this._scrollable = this.#isScrollable();
    }
    this.#tryScrollActiveTabIntoView();
  }

  #handleResize(): void {
    this._scrollable = this.#isScrollable();
    this.#setScrolledToStartOrEnd();
  }

  #handleScrollButton(direction: TabBarScrollDirection): void {
    if (!this._scrollContainer) {
      return;
    }

    const scrollAmount = this.vertical ? this._scrollContainer.offsetHeight : this._scrollContainer.offsetWidth;
    this._scrollContainer.scrollBy({
      behavior: 'smooth',
      [this.vertical ? 'top' : 'left']: scrollAmount * (direction === 'forward' ? 1 : -1)
    });
  }

  #handleScroll(): void {
    this.#setScrolledToStartOrEnd();
  }

  // *****
  // Tab Selection
  // *****

  /**
   * Selects a tab after emitting the select and change events, handling focus and animation.
   * @param tab The tab to select.
   */
  async #selectTab(tab: TabComponent): Promise<void> {
    if (this.disabled || tab.disabled) {
      return;
    }

    const tabs = this.#getTabs();
    const oldSelectedTab = tabs.find(t => t.selected);
    if (oldSelectedTab === tab) {
      return;
    }

    const eventAllowed = await this.#dispatchSelectEvents(tab);
    if (!eventAllowed) {
      return;
    }

    tab.selected = true;
    this.#focusGroupRef.focus(tab, { preventScroll: true });
    this.#scrollTabIntoView(tab);
    this.#animateIndicator(oldSelectedTab, tab);
    if (oldSelectedTab) {
      oldSelectedTab.selected = false;
    }
  }

  /**
   * Dispatches the tab select and tab bar change events for the given tab.
   * @param tab
   * @returns True if the change event was not canceled, false if it was canceled.
   */
  async #dispatchSelectEvents(tab: TabComponent): Promise<boolean> {
    // Maintaining these as they were pre Lit conversion for compatibility
    const tabs = this.#getTabs();
    const index = tabs.indexOf(tab);
    const selectEvent = new CustomEvent(TAB_CONSTANTS.events.SELECT, {
      bubbles: true,
      composed: true
    });
    const changeEvent = new CustomEvent(TAB_BAR_CONSTANTS.events.CHANGE, {
      detail: { index },
      bubbles: true,
      composed: true
    });
    tab.dispatchEvent(selectEvent);
    this.dispatchEvent(changeEvent);

    return !changeEvent.defaultPrevented;
  }

  /**
   * Animates the active indicator from one tab to another, or fades it in or out if only one tab is provided.
   * @param from The previous tab displaying the indicator.
   * @param to The next tab to display the indicator.
   */
  #animateIndicator(from: TabComponent | undefined, to: TabComponent): void {
    const toIndicator = to.shadowRoot?.querySelector(TAB_CONSTANTS.selectors.INDICATOR) as HTMLElement;
    if (!toIndicator) {
      return;
    }

    toIndicator.getAnimations().forEach(animation => animation.cancel());

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!from) {
      if (reduceMotion) {
        return;
      }
      toIndicator.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: TAB_CONSTANTS.numbers.ANIMATION_DURATION,
        easing: TAB_CONSTANTS.strings.EASING
      });
      return;
    }

    const fromIndicator = from.shadowRoot?.querySelector(TAB_CONSTANTS.selectors.INDICATOR) as HTMLElement;
    if (!fromIndicator) {
      if (!reduceMotion) {
        toIndicator.animate([{ opacity: '0' }, { opacity: '1' }], {
          duration: TAB_CONSTANTS.numbers.ANIMATION_DURATION,
          easing: TAB_CONSTANTS.strings.EASING
        });
      }
      return;
    }

    const isVertical = this.vertical;
    const fromRect = fromIndicator.getBoundingClientRect();
    const toRect = toIndicator.getBoundingClientRect();

    const fromPos = isVertical ? fromRect.top : fromRect.left;
    const fromExtent = isVertical ? fromRect.height : fromRect.width;
    const toPos = isVertical ? toRect.top : toRect.left;
    const toExtent = isVertical ? toRect.height : toRect.width;

    const axis = isVertical ? 'Y' : 'X';
    const scale = fromExtent / toExtent;

    const keyframes: Keyframe[] = [];

    if (!reduceMotion && !isNaN(scale)) {
      const translateDistance = fromPos - toPos;
      keyframes.push({
        transform: `translate${axis}(${translateDistance.toFixed(4)}px) scale${axis}(${scale.toFixed(4)})`
      });
      keyframes.push({
        transform: 'none'
      });
    } else {
      keyframes.push({ opacity: '0' });
      keyframes.push({ opacity: '1' });
    }

    toIndicator.animate(keyframes, {
      duration: TAB_CONSTANTS.numbers.ANIMATION_DURATION,
      easing: TAB_CONSTANTS.strings.EASING
    });
  }

  // *****
  // Tab Removal
  // *****

  /**
   * Removes a tab from the DOM and moves focus and active status to another tab if necessary.
   * @param tab The tab to remove.
   */
  async #removeTab(tab: TabComponent): Promise<void> {
    const tabs = this.#getEnabledTabs();
    const index = tabs.indexOf(tab);
    const wasFocused = tab.ownerDocument.activeElement === tab;
    const wasActive = tab.selected;

    tab.remove();

    if (index === -1) {
      return;
    }

    await this.updateComplete;
    const newTab = this.#getEnabledTabs()[index] || this.#getEnabledTabs()[index - 1];

    // Maintain focus at the same index or set it to the scroll container
    if (wasFocused) {
      if (!newTab) {
        this.#focusGroupRef.focusRoot();
      } else {
        newTab.focus();
      }
    }

    // Set a new active tab if the removed tab was active
    if (wasActive && newTab) {
      newTab.selected = true;
      this.#setActiveTab();
    }
  }

  /**
   * Dispatches the remove event for the given tab.
   * @param tab The tab to remove.
   * @returns True if the event was not canceled, false if it was canceled.
   */
  #dispatchRemoveEvent(tab: TabComponent): boolean {
    const event = new Event('forge-tab-remove', {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    tab.dispatchEvent(event);
    return !event.defaultPrevented;
  }

  /**
   * Removes a tab that signals its own removal.
   * @param evt A forge-tab-request-remove event.
   */
  #handleRemoveRequest(evt: Event): void {
    const tab = this.#getTabFromEvent(evt);
    if (tab) {
      this.#removeTab(tab);
    }
  }

  // *****
  // Tab Utilities
  // *****

  /**
   * Returns all tabs slotted into the tab bar.
   * @returns All tabs.
   */
  #getTabs(): TabComponent[] {
    return Array.from(this.querySelectorAll<TabComponent>(TAB_CONSTANTS.elementName));
  }

  /**
   * Returns all enabled tabs slotted into the tab bar.
   * @returns All enabled tabs.
   */
  #getEnabledTabs(): TabComponent[] {
    return Array.from(this.querySelectorAll<TabComponent>(`${TAB_CONSTANTS.elementName}:not(:state(disabled))`));
  }

  /**
   * Gets the tab element from an event path.
   * @param evt The event.
   * @returns A tab element or `undefined`.
   */
  #getTabFromEvent(evt: Event): TabComponent | undefined {
    const path = composedPathFrom(this, evt);
    return path.find(el => el.tagName.toLowerCase() === TAB_CONSTANTS.elementName) as TabComponent | undefined;
  }

  /**
   * Syncs the selected state of all tabs based on the activeTab property.
   */
  async #setActiveTab(): Promise<void> {
    if (!this.hasUpdated) {
      await this.updateComplete;
    }

    const tabs = this.#getTabs();
    let activeTab: TabComponent | null = null;
    tabs.forEach((tab, index) => {
      tab.selected = index === this.activeTab;
      if (tab.selected) {
        activeTab = tab;
      }
    });
    this.#focusGroupRef.currentElement = activeTab;
    this.#focusGroupRef.updateTabIndices();
  }

  // *****
  // Scrolling
  // *****

  /**
   * Renders a scroll button for the given direction.
   * @param direction The scroll direction ('backward' or 'forward').
   * @returns A template for the scroll button.
   */
  #scrollButton(direction: TabBarScrollDirection): TemplateResult {
    const disabled = direction === 'backward' ? this._scrolledToStart : this._scrolledToEnd;
    const classes = {
      [TAB_BAR_CONSTANTS.classes.SCROLL_BUTTON]: true,
      'scroll-button-previous': direction === 'backward',
      'scroll-button-next': direction === 'forward',
      enabled: !disabled
    };
    const icon = this.vertical
      ? direction === 'backward'
        ? 'keyboard_arrow_up'
        : 'keyboard_arrow_down'
      : direction === 'backward'
        ? 'keyboard_arrow_left'
        : 'keyboard_arrow_right';

    return html`
      <forge-icon-button
        class=${classMap(classes)}
        type="button"
        shape="squared"
        tabindex=${live('-1')}
        .disabled=${disabled}
        @click=${() => this.#handleScrollButton(direction)}>
        <forge-icon .name=${icon}></forge-icon>
      </forge-icon-button>
    `;
  }

  /**
   * Connects a ResizeObserver to monitor when the tab bar container size changes.
   */
  #connectResizeObserver(): void {
    if (this._rootElement) {
      ForgeResizeObserver.observe(this._rootElement, this.#handleResize.bind(this));
    }
  }

  /**
   * Disconnects the ResizeObserver from the tab bar container.
   */
  #disconnectResizeObserver(): void {
    if (this._rootElement) {
      ForgeResizeObserver.unobserve(this._rootElement);
    }
  }

  /**
   * Determines whether the scroll container is currently overflowing its bounds.
   * @returns True if the tabs overflow the container, false otherwise.
   */
  #isScrollable(): boolean {
    if (!this._scrollContainer) {
      return false;
    }
    const isOverflowing = this.vertical
      ? this._scrollContainer.scrollHeight > this._scrollContainer.clientHeight
      : this._scrollContainer.scrollWidth > this._scrollContainer.clientWidth;
    return isOverflowing;
  }

  /**
   * Updates the scroll position state and manages focus when scroll buttons become disabled.
   */
  async #setScrolledToStartOrEnd(): Promise<void> {
    if (!this._scrollContainer) {
      this._scrolledToStart = false;
      this._scrolledToEnd = false;
      return;
    }
    const scrollLeft = this._scrollContainer.scrollLeft;
    const scrollWidth = this._scrollContainer.scrollWidth;
    const clientWidth = this._scrollContainer.clientWidth;

    this._scrolledToStart = scrollLeft === 0;
    this._scrolledToEnd = scrollLeft + clientWidth >= scrollWidth - 1;

    if (this.shadowRoot?.activeElement === this._previousButton && this._scrolledToStart) {
      await this.updateComplete;
      return this._nextButton?.disabled ? this.#focusGroupRef.focusFirst() : this._nextButton?.focus({ focusVisible: false });
    } else if (this.shadowRoot?.activeElement === this._nextButton && this._scrolledToEnd) {
      await this.updateComplete;
      return this._previousButton?.disabled ? this.#focusGroupRef.focusLast() : this._previousButton?.focus({ focusVisible: false });
    }
  }

  /**
   * Attempts to scroll the currently active tab into view if one is set.
   */
  #tryScrollActiveTabIntoView(): void {
    if (isDefined(this.activeTab)) {
      const tabs = this.#getTabs();
      const activeTabElement = tabs[this.activeTab];
      if (activeTabElement) {
        this.#scrollTabIntoView(activeTabElement);
      }
    }
  }

  /**
   * Scrolls the given tab into view within the scroll container if it's not fully visible.
   * @param tab The tab to scroll into view.
   */
  async #scrollTabIntoView(tab: TabComponent): Promise<void> {
    await new Promise(requestAnimationFrame);

    if (!this.#isScrollable || !this._scrollContainer) {
      return;
    }

    // Progressive enhancement for scrollIntoView's container option
    if (supportsScrollIntoViewContainerOption()) {
      return tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest', container: 'nearest' } as ScrollIntoViewOptions);
    }

    // TODO: Remove this manual scroll logic when scrollIntoView's container option is widely supported
    const tabRect = tab.getBoundingClientRect();
    const tabStart = this.vertical ? tabRect.top : tabRect.left;
    const tabEnd = this.vertical ? tabRect.bottom : tabRect.right;
    const tabSize = this.vertical ? tabRect.height : tabRect.width;

    const containerRect = this._scrollContainer.getBoundingClientRect();
    const containerStart = this.vertical ? containerRect.top : containerRect.left;
    const containerEnd = this.vertical ? containerRect.bottom : containerRect.right;
    const containerSize = this.vertical ? containerRect.height : containerRect.width;

    if (tabStart < containerStart || tabEnd > containerEnd || tabSize + 2 * TAB_BAR_CONSTANTS.numbers.SCROLL_MARGIN > containerSize) {
      const to = this._scrollContainer[this.vertical ? 'scrollTop' : 'scrollLeft'] + tabStart - containerStart - TAB_BAR_CONSTANTS.numbers.SCROLL_MARGIN;
      this._scrollContainer[this.vertical ? 'scrollTop' : 'scrollLeft'] = to;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-tab-bar': ITabBarComponent;
  }

  interface HTMLElementEventMap {
    'forge-tab-bar-change': CustomEvent<ITabBarChangeEventData>;
  }
}
