import { provide } from '@lit/context';
import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, ForgeResizeObserver, isDefined } from '@tylertech/forge-core';
import { tylIconKeyboardArrowDown, tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp } from '@tylertech/tyler-icons';
import { html, nothing, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { live } from 'lit/directives/live.js';
import { playStateLayerAnimation } from '../../constants.js';
import { BaseLitElement } from '../../core/base/base-lit-element.js';
import { setDefaultAria } from '../../core/utils/a11y-utils.js';
import { composedPathFrom } from '../../core/utils/event-utils.js';
import { supportsScrollIntoViewContainerOption } from '../../core/utils/feature-detection.js';
import { createFocusGroupRef, focusGroup } from '../../core/utils/focus-group.js';
import { KeyActionController } from '../../core/utils/key-action.js';
import { toggleState } from '../../core/utils/utils.js';
import { IconButtonComponent } from '../../icon-button/icon-button.js';
import { IconRegistry } from '../../icon/icon-registry.js';
import { IconComponent } from '../../icon/icon.js';
import { TAB_CONSTANTS } from '../tab/tab-constants.js';
import { TabComponent } from '../tab/tab.js';
import {
  ITabBarChangeEventData,
  TAB_BAR_CLOSABLE,
  TAB_BAR_CONSTANTS,
  TAB_BAR_DISABLED,
  TAB_BAR_INVERTED,
  TAB_BAR_SECONDARY,
  TAB_BAR_STACKED,
  TAB_BAR_VERTICAL,
  TabBarTheme
} from './tab-bar-constants.js';

import styles from './tab-bar.scss';

/** @deprecated - This will be removed in the future. Please switch to using TabBarComponent. */
export interface ITabBarComponent extends BaseLitElement {
  disabled: boolean;
  activeTab: number | null | undefined;
  activeTabName: string;
  vertical: boolean;
  clustered: boolean;
  stacked: boolean;
  /** @deprecated This will be removed in a future version */
  secondary: boolean;
  inverted: boolean;
  closable: boolean;
  autoActivate: boolean;
  scrollButtons: boolean;
  theme: TabBarTheme;
}

type TabBarScrollDirection = 'backward' | 'forward';

/**
 * @tag forge-tab-bar
 *
 * @summary Tab bars organize a set of tabs, holding active state and enabling navigation between different views or sections of content.
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
 * @cssproperty --forge-tab-bar-justify - The justify-content value for the tab bar flex container.
 * @cssproperty --forge-tab-bar-stretch - The flex value for the child `<forge-tab>` elements.
 * @cssproperty --forge-tab-bar-divider-color - The color of the divider.
 * @cssproperty --forge-tab-bar-divider-thickness - The thickness of the divider.
 * @cssproperty --forge-tab-bar-overflow-divider-color - The color of the overflow divider.
 * @cssproperty --forge-tab-bar-overflow-divider-thickness - The thickness of the overflow divider.
 *
 * @csspart container - The container element.
 * @csspart scroll-container - The scroll container element.
 *
 * @state disabled - Applied when the tab bar is disabled.
 * @state vertical - Applied when the tab bar is vertical.
 *
 * @slot - The tabs to display.
 */
@customElement(TAB_BAR_CONSTANTS.elementName)
export class TabBarComponent extends BaseLitElement implements ITabBarComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = TAB_BAR_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [TabComponent, IconButtonComponent, IconComponent];

  static {
    IconRegistry.define([tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp, tylIconKeyboardArrowDown]);
  }

  #internals: ElementInternals;

  // TODO: Remove attribute reflection

  /**
   * Sets the disabled state of all child tabs. If true, any new tabs added to the DOM will be
   * disabled by default. This can be used instead of setting individual tab disabled properties,
   * mixing the two methods of disabling is not supported. Disabled tabs remain focusable but are
   * not interactive.
   * @default false
   * @attribute
   */
  @provide({ context: TAB_BAR_DISABLED })
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * The index of the active tab.
   * @default undefined
   * @attribute active-tab
   */
  @property({ type: Number, reflect: true, attribute: 'active-tab' })
  public set activeTab(value: number | null | undefined) {
    // Don't handle an undefined value on the first update to avoid accidentally overriding an
    // active tab set on the tab element
    if (this.hasUpdated || isDefined(value)) {
      this.#activateTabByIndex(value ?? undefined);
    }
  }
  public get activeTab(): number | null | undefined {
    const index = this._tabs.findIndex(t => t === this._activeTabElement);
    return index >= 0 ? index : undefined;
  }

  /**
   * The name of the active tab.
   * @default ''
   * @attribute active-tab-name
   */
  @property({ attribute: 'active-tab-name' })
  public set activeTabName(value: string) {
    // Don't handle an empty name on the first update to avoid accidentally overriding an active tab
    // set by index
    if (this.hasUpdated || value) {
      this.#activateTabByName(value);
    }
  }
  public get activeTabName(): string {
    return this._activeTabElement?.name ?? '';
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
   * Controls whether the tabs stretch the full width of their container or cluster together at
   * their minimum width.
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
   * Controls whether the tabs can be closed with the delete key.
   * @default false
   * @attribute
   */
  @provide({ context: TAB_BAR_CLOSABLE })
  @property({ type: Boolean })
  public closable = false;

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

  /**
   * The tab bar's theme.
   */
  @property()
  public theme: TabBarTheme = 'default';

  @state() private _activeTabElement: TabComponent | null = null;
  @state() private _scrollable = false;
  @state() private _scrolledToStart = false;
  @state() private _scrolledToEnd = false;

  @query('.scroll-container', true) private _scrollContainer!: HTMLElement;
  @query('.scroll-button-previous') private _previousButton?: IconButtonComponent;
  @query('.scroll-button-next') private _nextButton?: IconButtonComponent;

  @queryAssignedElements({ selector: `${TAB_CONSTANTS.elementName}` }) private _tabs!: TabComponent[];

  #focusGroupRef = createFocusGroupRef({
    selector: 'forge-tab',
    orientation: this.vertical ? 'vertical' : 'horizontal',
    wrap: true,
    onFocusChange: (_, element) => this.#handleTabFocus(element)
  });

  constructor() {
    super();
    this.#internals = this.attachInternals();
    new KeyActionController(this, {
      actions: [
        {
          key: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'],
          handler: this.#handleNavigationKey.bind(this),
          allowRepeat: true,
          allowDefault: true
        },
        { key: ['Home', 'End'], handler: this.#handleNavigationKey.bind(this), allowDefault: true },
        { key: ['Enter', ' '], handler: this.#handleActivateKey.bind(this), allowDefault: true },
        { key: ['Backspace', 'Delete'], handler: this.#handleCloseKey.bind(this), allowDefault: true },
        { key: { key: 'F10', modifier: 'shift' }, handler: this.#handleMenuKey.bind(this), allowDefault: true }
      ]
    });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    setDefaultAria(this, this.#internals, {
      role: 'tablist',
      ariaOrientation: this.vertical ? 'vertical' : null
    });
    this.#connectResizeObserver();
  }

  public willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      toggleState(this.#internals, 'disabled', this.disabled);
    }

    if (changedProperties.has('vertical')) {
      toggleState(this.#internals, 'vertical', this.vertical);
      setDefaultAria(this, this.#internals, { ariaOrientation: this.vertical ? 'vertical' : null });
      this.#focusGroupRef.orientation = this.vertical ? 'vertical' : 'horizontal';
    }
  }

  public firstUpdated(): void {
    if (!this._activeTabElement) {
      this.#trySetActiveTabFromElements();
    }
  }

  public async updated(changedProperties: PropertyValues<this>): Promise<void> {
    // Scroll active tab into view after render
    if (changedProperties.has('_activeTabElement' as keyof TabBarComponent)) {
      this.#tryScrollActiveTabIntoView();
    }

    if (changedProperties.has('scrollButtons')) {
      await this.updateComplete;
      this.#setScrolledToStartOrEnd();
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
    const showingScrollButtons = this.scrollButtons && this._scrollable;
    return html`
      <div class=${classMap(classes)} part="container" @click=${this.#handleClick}>
        ${showingScrollButtons ? this.#scrollButton('backward') : nothing}
        <div
          class="scroll-container"
          part="scroll-container"
          @scroll=${this.#handleScroll}
          @forge-tab-request-sync=${this.#handleRequestSync}
          ${focusGroup(this.#focusGroupRef)}>
          <slot @slotchange=${this.#handleSlotChange}></slot>
        </div>
        ${showingScrollButtons ? this.#scrollButton('forward') : nothing}
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
    this.#userActivateTab(tab);
    tab.focus();
  }

  #handleActivateKey(evt: KeyboardEvent): void {
    const tab = this.#getTabFromEvent(evt);
    if (!tab) {
      return;
    }
    evt.preventDefault();
    tab[playStateLayerAnimation]();
    this.#userActivateTab(tab);
  }

  #handleNavigationKey(evt: KeyboardEvent): void {
    if (this.#getTabFromEvent(evt)) {
      this.#focusGroupRef.fromEvent(evt);
    }
  }

  #handleCloseKey(evt: KeyboardEvent): void {
    const tab = this.#getTabFromEvent(evt);
    if (!tab || !tab.closable) {
      return;
    }
    evt.preventDefault();
    if (this.#dispatchCloseEvent(tab)) {
      this.#closeTab(tab);
    }
  }

  #handleMenuKey(evt: KeyboardEvent): void {
    const tab = this.#getTabFromEvent(evt);
    if (!tab) {
      return;
    }
    evt.preventDefault();
    this.#dispatchMenuEvent(tab);
  }

  #handleTabFocus(element: HTMLElement): void {
    this.#scrollTabIntoView(element as TabComponent);
    if (!this.autoActivate) {
      return;
    }
    if (element.matches(':focus-visible')) {
      this.#userActivateTab(element as TabComponent);
    } else {
      (element as TabComponent).active = true;
    }
  }

  #handleSlotChange(): void {
    this.#focusGroupRef.update();
    // Handle the active tab being removed from the DOM
    if (this._activeTabElement && !this._tabs.includes(this._activeTabElement)) {
      this._activeTabElement = null;
      this.#focusGroupRef.currentElement = null;
    }

    // Check if scroll buttons need to be enabled or disabled due to content changes
    if (this.scrollButtons) {
      this._scrollable = this.#isScrollable();
    }
    this.#tryScrollActiveTabIntoView();
  }

  #handleResize(): void {
    this._scrollable = this.#isScrollable();
    if (this.scrollButtons) {
      this.#setScrolledToStartOrEnd();
    }
  }

  #handleScrollButton(direction: TabBarScrollDirection): void {
    const scrollAmount = this.vertical ? this._scrollContainer.offsetHeight : this._scrollContainer.offsetWidth;
    const multiplier = direction === 'forward' ? 1 : -1;
    this._scrollContainer.scrollBy({
      behavior: 'smooth',
      [this.vertical ? 'top' : 'left']: scrollAmount * multiplier
    });
  }

  #handleScroll(): void {
    this.#setScrolledToStartOrEnd();
  }

  #handleRequestSync(evt: Event): void {
    evt.stopPropagation();
    const tab = this.#getTabFromEvent(evt);
    if (tab && this.#isDesynced(tab)) {
      this.#syncActiveTab();
    }
  }

  // *****
  // Tab Activation
  // *****

  #syncActiveTab(): void {
    const tabs = this._tabs;
    let oldActiveTab: TabComponent | undefined;
    tabs.forEach(tab => {
      if (tab.active && tab !== this._activeTabElement) {
        oldActiveTab = tab;
      }
      tab.active = tab === this._activeTabElement;
    });
    if (this._activeTabElement) {
      this.#scrollTabIntoView(this._activeTabElement);
      this.#animateIndicator(oldActiveTab, this._activeTabElement);
    }
    this.#focusGroupRef.currentElement = this._activeTabElement;
  }

  /**
   * Activates a tab after emitting the activate and change events, handling focus and animation.
   * @param tab The tab to activate.
   */
  #userActivateTab(tab: TabComponent): void {
    // Do nothing if the tab is not activatable (i.e. already active or disabled)
    if (tab.active || this.disabled || tab.disabled) {
      return;
    }

    // Dispatching the select event for backwards compatibility even though it doesn't reflect the state of the component and is not cancelable
    this.#dispatchSelectEvent(tab);

    const eventAllowed = this.#dispatchChangeEvent(tab);
    if (!eventAllowed) {
      return;
    }

    this._activeTabElement = tab;
    this.#syncActiveTab();
  }

  /**
   * Dispatches the select event on the given tab.
   * @param tab The activated tab.
   */
  #dispatchSelectEvent(tab: TabComponent): void {
    const selectEvent = new CustomEvent(TAB_CONSTANTS.events.SELECT, {
      bubbles: true,
      composed: true
    });
    tab.dispatchEvent(selectEvent);
  }

  /**
   * Dispatches the change event on the given tab.
   * @param tab The active tab.
   * @returns `true` if the event was not canceled, `false` otherwise.
   */
  #dispatchChangeEvent(tab: TabComponent): boolean {
    const tabs = this._tabs;
    const index = tabs.indexOf(tab);
    const event = new CustomEvent(TAB_BAR_CONSTANTS.events.CHANGE, {
      detail: { index },
      bubbles: true,
      cancelable: true,
      composed: true
    });
    this.dispatchEvent(event);
    const allowed = !event.defaultPrevented;

    return allowed;
  }

  /**
   * Animates the active indicator from one tab to another, or fades it in or out if only one tab is provided.
   * @param from The previous tab displaying the indicator.
   * @param to The next tab to display the indicator.
   */
  #animateIndicator(from: TabComponent | undefined, to: TabComponent): void {
    const fromIndicator = from?.shadowRoot?.querySelector(TAB_CONSTANTS.selectors.INDICATOR) as HTMLElement | undefined;
    const toIndicator = to.shadowRoot?.querySelector(TAB_CONSTANTS.selectors.INDICATOR) as HTMLElement | undefined;

    if (!toIndicator) {
      return;
    }

    fromIndicator?.getAnimations().forEach(animation => animation.cancel());
    toIndicator.getAnimations().forEach(animation => animation.cancel());

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!fromIndicator) {
      if (!reduceMotion) {
        toIndicator.animate([{ opacity: String(TAB_BAR_CONSTANTS.numbers.OPACITY_HIDDEN) }, { opacity: String(TAB_BAR_CONSTANTS.numbers.OPACITY_VISIBLE) }], {
          duration: TAB_CONSTANTS.numbers.ANIMATION_DURATION,
          easing: TAB_CONSTANTS.strings.EASING
        });
      }
      return;
    }

    const fromRect = fromIndicator.getBoundingClientRect();
    const toRect = toIndicator.getBoundingClientRect();

    const fromPos = this.vertical ? fromRect.top : fromRect.left;
    const fromExtent = this.vertical ? fromRect.height : fromRect.width;
    const toPos = this.vertical ? toRect.top : toRect.left;
    const toExtent = this.vertical ? toRect.height : toRect.width;

    const axis = this.vertical ? 'Y' : 'X';
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
      keyframes.push({ opacity: String(TAB_BAR_CONSTANTS.numbers.OPACITY_HIDDEN) });
      keyframes.push({ opacity: String(TAB_BAR_CONSTANTS.numbers.OPACITY_VISIBLE) });
    }

    toIndicator.animate(keyframes, {
      duration: TAB_CONSTANTS.numbers.ANIMATION_DURATION,
      easing: TAB_CONSTANTS.strings.EASING
    });
  }

  /**
   * Activates a tab by its index, or deactivates all tabs if no index is provided.
   * @param index The index of the tab to set active or undefined if no tab should be active.
   */
  async #activateTabByIndex(index?: number): Promise<void> {
    if (!this.hasUpdated) {
      await this.updateComplete;
    }

    if (index === undefined) {
      this._activeTabElement = null;
      return this.#syncActiveTab();
    }

    const tabs = this._tabs;
    if (index >= 0 && index < tabs.length) {
      this._activeTabElement = tabs[index];
      return this.#syncActiveTab();
    }
    console.warn('Out of bounds index provided for active tab, no tab made active.');
  }

  /**
   * Activates a tab by its name, or deactivates all tabs if no name is provided.
   * @param name The name of the tab to set active or empty string if no tab should be active.
   */
  async #activateTabByName(name: string): Promise<void> {
    if (!this.hasUpdated) {
      await this.updateComplete;
    }

    if (name && name === this._activeTabElement?.name) {
      // The tab is already selected
      return;
    }

    if (!name) {
      this._activeTabElement = null;
      return this.#syncActiveTab();
    }

    const tabs = this._tabs;
    const tab = tabs.find(t => t.name === name);
    if (tab) {
      this._activeTabElement = tab;
      return this.#syncActiveTab();
    }
    console.warn(`No tab found with name "${name}", no tab made active.`);
  }

  /**
   * Attempts to set the active tab based on the active state of the child tab elements. This is
   * used to synchronize the active tab on first update when it hasn't been set on the tab bar.
   */
  #trySetActiveTabFromElements(): void {
    const tabs = this._tabs;
    const activeTab = tabs.find(t => t.active);
    if (activeTab) {
      this._activeTabElement = activeTab;
      this.#syncActiveTab();
    }
  }

  /**
   * Determines if a tab's active state is out of sync with the tab bar's active tab.
   * @param tab The tab to check.
   * @returns True if the tab's active state is out of sync, false otherwise.
   */
  #isDesynced(tab: TabComponent): boolean {
    return tab.active !== (tab === this._activeTabElement);
  }

  // *****
  // Tab Closure
  // *****

  /**
   * Closes a tab and moves focus and active status to another tab if necessary.
   * @param tab The tab to close.
   */
  async #closeTab(tab: TabComponent): Promise<void> {
    const tabs = this._tabs.filter(t => !t.disabled);
    const index = tabs.indexOf(tab);
    const wasFocused = tab.ownerDocument.activeElement === tab;
    const wasActive = tab.active;

    tab.remove();

    if (index === -1) {
      return;
    }

    await this.updateComplete;
    const updatedTabs = this._tabs.filter(t => !t.disabled);
    const newTab = updatedTabs[index] || updatedTabs[index - 1];

    // Maintain focus at the same index or set it to the first tab
    if (wasFocused) {
      if (!newTab) {
        this.#focusGroupRef.focusFirst();
      } else {
        newTab.focus();
      }
    }

    // If the closed tab was active, set a new active tab as if the user activated it
    if (wasActive && newTab) {
      this.#userActivateTab(newTab);
    }
  }

  /**
   * Dispatches the close event for the given tab.
   * @param tab The tab to close.
   * @returns True if the event was not canceled, false if it was canceled.
   */
  #dispatchCloseEvent(tab: TabComponent): boolean {
    const event = new Event(TAB_BAR_CONSTANTS.events.TAB_CLOSE, {
      bubbles: true,
      cancelable: true,
      composed: true
    });
    tab.dispatchEvent(event);
    return !event.defaultPrevented;
  }

  // *****
  // Tab Utilities
  // *****

  /**
   * Gets the tab element from an event path.
   * @param evt The event.
   * @returns A tab element or `undefined`.
   */
  #getTabFromEvent(evt: Event): TabComponent | undefined {
    const path = composedPathFrom(this, evt);
    return path.find(el => el.tagName.toLowerCase() === TAB_CONSTANTS.elementName) as TabComponent | undefined;
  }

  #dispatchMenuEvent(tab: TabComponent): void {
    const event = new Event(TAB_BAR_CONSTANTS.events.TAB_MENU, {
      bubbles: true,
      composed: true
    });
    tab.dispatchEvent(event);
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

    // TODO: Do not set `aria-hidden` on elements that can receive focus, find a better workaround for placing buttons within a tablist
    return html`
      <forge-icon-button
        class=${classMap(classes)}
        type="button"
        shape="squared"
        tabindex=${live(-1)}
        aria-hidden="true"
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
    ForgeResizeObserver.observe(this, this.#handleResize.bind(this));
  }

  /**
   * Disconnects the ResizeObserver from the tab bar container.
   */
  #disconnectResizeObserver(): void {
    ForgeResizeObserver.unobserve(this);
  }

  /**
   * Determines whether the scroll container is currently overflowing its bounds.
   * @returns True if the tabs overflow the container, false otherwise.
   */
  #isScrollable(): boolean {
    const isOverflowing = this.vertical
      ? this._scrollContainer.scrollHeight > this._scrollContainer.clientHeight
      : this._scrollContainer.scrollWidth > this._scrollContainer.clientWidth;
    return isOverflowing;
  }

  /**
   * Updates the scroll position state and manages focus when scroll buttons become disabled.
   */
  #setScrolledToStartOrEnd(): void {
    const scrollStart = this.vertical ? this._scrollContainer.scrollTop : this._scrollContainer.scrollLeft;
    const scrollInlineSize = this.vertical ? this._scrollContainer.scrollHeight : this._scrollContainer.scrollWidth;
    const clientInlineSize = this.vertical ? this._scrollContainer.clientHeight : this._scrollContainer.clientWidth;

    this._scrolledToStart = scrollStart === 0;
    this._scrolledToEnd = scrollStart + clientInlineSize >= scrollInlineSize - 1;

    // Only attempt to manage focus if the scroll buttons are present
    if (!this.scrollButtons) {
      return;
    }

    const activeElement = this.shadowRoot?.activeElement;

    if (activeElement === this._previousButton && this._scrolledToStart) {
      this._previousButton?.blur();
      return this.#focusGroupRef.focusFirst();
    } else if (activeElement === this._nextButton && this._scrolledToEnd) {
      this._nextButton?.blur();
      return this.#focusGroupRef.focusLast();
    }
  }

  /**
   * Attempts to scroll the currently active tab into view if one is set.
   */
  #tryScrollActiveTabIntoView(): void {
    if (this._activeTabElement) {
      this.#scrollTabIntoView(this._activeTabElement);
    }
  }

  /**
   * Scrolls the given tab into view within the scroll container if it's not fully visible.
   * @param tab The tab to scroll into view.
   */
  async #scrollTabIntoView(tab: TabComponent): Promise<void> {
    await new Promise(requestAnimationFrame);

    if (!this._scrollable) {
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
