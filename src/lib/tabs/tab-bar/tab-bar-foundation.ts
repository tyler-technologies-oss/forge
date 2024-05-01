import { ICustomElementFoundation } from '@tylertech/forge-core';
import { ITabBarChangeEventData, NAVIGATION_KEYS, TAB_BAR_CONSTANTS } from './tab-bar-constants';
import { ITabComponent } from '../tab/tab';
import { TAB_CONSTANTS } from '../tab/tab-constants';

import { ITabBarAdapter, ITabBarScrollButtonState } from './tab-bar-adapter';

export interface ITabBarFoundation extends ICustomElementFoundation {
  disabled: boolean;
  activeTab: number | null | undefined;
  vertical: boolean;
  clustered: boolean;
  stacked: boolean;
  secondary: boolean;
  inverted: boolean;
  autoActivate: boolean;
  scrollButtons: boolean;
  initialize(): void;
  destroy(): void;
}

export class TabBarFoundation implements ITabBarFoundation {
  // State
  private _isInitialized = false;
  private _activeTab: number | null | undefined;
  private _disabled = false;
  private _vertical = false;
  private _clustered = false;
  private _stacked = false;
  private _secondary = false;
  private _inverted = false;
  private _autoActivate = false;
  private _scrollButtons = false;
  private _tabs: ITabComponent[] = [];
  private _scrollButtonsVisible = false;
  private _tabScrollAnimationFrame: number | undefined;

  // Listeners
  private _tabsChangedListener: EventListener;
  private _tabSelectedListener: EventListener;
  private _keydownListener: EventListener;
  private _resizeListener: () => void;
  private _scrollListener: EventListener;
  private _scrollBackwardButtonListener: EventListener;
  private _scrollForwardButtonListener: EventListener;

  constructor(private _adapter: ITabBarAdapter) {
    this._tabsChangedListener = () => this._onTabsChanged();
    this._tabSelectedListener = (evt: CustomEvent<void>) => this._onTabSelected(evt);
    this._keydownListener = (evt: KeyboardEvent) => this._onKeydown(evt);
    this._resizeListener = () => this._onResize();
    this._scrollListener = () => this._onScroll();
    this._scrollBackwardButtonListener = () => this._onScrollBackward();
    this._scrollForwardButtonListener = () => this._onScrollForward();
  }

  public initialize(): void {
    this._adapter.addSlotListener(this._tabsChangedListener);
    this._adapter.addHostListener(TAB_CONSTANTS.events.SELECT, this._tabSelectedListener);
    this._adapter.addHostListener('keydown', this._keydownListener);
    this._adapter.setVertical(this._vertical);

    if (this._scrollButtons) {
      this._adapter.initializeContainerSizeObserver(this._resizeListener);
      this._adapter.initializeScrollObserver(this._scrollListener);
      this._updateScrollState();
    }

    this._tryScrollActiveTabIntoView();
    this._isInitialized = true;
  }

  public destroy(): void {
    this._adapter.destroyContainerSizeObserver();
    this._adapter.destroyScrollObserver(this._scrollListener);
    this._isInitialized = false;
  }

  private async _onTabsChanged(): Promise<void> {
    this._tabs = this._adapter.getTabs();
    this._syncTabState();
    this._tryScrollActiveTabIntoView();
  }

  private _onTabSelected(evt: CustomEvent<void>): void {
    this._selectTab(evt.target as ITabComponent);
  }

  private async _onKeydown(evt: KeyboardEvent): Promise<void> {
    const orientation = this._vertical ? 'vertical' : 'horizontal';
    const isNavigationKey = NAVIGATION_KEYS.get('default')?.has(evt.key) ||
                            NAVIGATION_KEYS.get(orientation)?.has(evt.key);

    if (!isNavigationKey) {
      return;
    }

    evt.preventDefault();
    let index = -1;

    if (evt.key === 'Home') {
      // Locate the first non-disabled tab
      index = this._tabs.findIndex(tab => !tab.disabled);
    } else if (evt.key === 'End') {
      // Locate the last non-disabled tab
      index = this._tabs.reduceRight((acc, tab, i) => !tab.disabled && acc === -1 ? i : acc, -1);
    } else {
      // Locate the next or previous tab based on the key that was pressed
      const currentIndex = this._tabs.findIndex(tab => tab.matches(':focus'));
      const isPrevKey = evt.key === 'ArrowLeft' || evt.key === 'ArrowUp';
      const calcIndex = (startIndex: number): void => {
        index = startIndex + (isPrevKey ? -1 : 1);
        index = index < 0 ? this._tabs.length - 1 : index % this._tabs.length;

        // Try to recurse until we find a non-disabled tab (unless all tabs are disabled already)
        const isAllTabsDisabled = this._tabs.every(tab => tab.disabled);
        if (!isAllTabsDisabled && this._tabs[index]?.disabled) {
          calcIndex(index);
        }
      };
      calcIndex(currentIndex);
    }

    if (index === -1) {
      return;
    }

    if (this._autoActivate) {
      this._selectTab(this._tabs[index]);
    } else {
      this._tabs[index].focus({ preventScroll: true });
      await this._adapter.tryScrollTabIntoView(this._tabs[index]);
    }
  }

  private async _selectTab(tab: ITabComponent, emitEvent = true): Promise<void> {
    if (!tab || tab.disabled) {
      return;
    }

    const currentSelectedTab = this._tabs.find(t => t.selected);
    if (currentSelectedTab === tab) {
      return;
    }

    if (emitEvent) {
      const index = this._tabs.indexOf(tab);
      const event = new CustomEvent<ITabBarChangeEventData>(TAB_BAR_CONSTANTS.events.CHANGE, { detail: { index }, bubbles: true, cancelable: true, composed: true });
      this._adapter.dispatchHostEvent(event);
      if (event.defaultPrevented) {
        return;
      }
    }

    // Selecting a tab causes an animation of the indicator to start relative to the currently selected tab
    tab.selected = true;
    tab.focus({ preventScroll: true });
    await this._adapter.tryScrollTabIntoView(tab);

    // Always deselect the currently selected tab after selecting a new tab to allow
    // for the tab indicator animation to run properly (the newly selected tab attempts
    // to locate the current selected tab for its calculations)
    if (currentSelectedTab) {
      currentSelectedTab.selected = false;
    }

    this._activeTab = this._tabs.indexOf(tab);
  }

  /**
   * Ensures that all tabs have the correct state based on the tab bar state.
   * 
   * This is called whenever a child tab is added to the DOM.
   */
  private _syncTabState(): void {
    this._tabs.forEach((tab, index) => {
      tab.selected = index === this._activeTab;
      tab.disabled = this._disabled;
      tab.vertical = this._vertical;
      tab.stacked = this._stacked;
      tab.secondary = this._secondary;
      tab.inverted = this._inverted;
    });
  }

  /** Called when the container size changes, but only if scroll buttons are enabled. */
  private _onResize(): void {
    this._detectScrollableStatus();
  }

  /** Called when the scroll container scrolls, but only if scroll buttons are enabled. */
  private _onScroll(): void {
    this._updateScrollState();
  }

  /** Handles clicking the scroll backward button. */
  private _onScrollBackward(): void {
    this._adapter.scroll('backward');
  }

  /** Handles clicking the scroll forward button. */
  private _onScrollForward(): void {
    this._adapter.scroll('forward');
  }

  /** Determines whether scroll buttons should be displayed based on the size of the container. */
  private _detectScrollableStatus(): void {
    const scrollable = this._adapter.isScrollable();

    if (this._scrollButtonsVisible === scrollable) {
      return;
    }
    
    this._adapter.setScrollButtons(scrollable);

    if (scrollable) {
      this._adapter.initializeScrollObserver(this._scrollListener);
      this._updateScrollState();
      this._adapter.setScrollBackwardButtonListener(this._scrollBackwardButtonListener);
      this._adapter.setScrollForwardButtonListener(this._scrollForwardButtonListener);
    } else {
      this._adapter.destroyScrollObserver(this._scrollListener);
    }

    this._scrollButtonsVisible = scrollable;
  }

  /** Updates the enabled/disabled state of the scroll buttons. */
  private _updateScrollState(): void {
    const { isScrolledEnd, isScrolledStart } = this._adapter.getScrollState();
    const state: ITabBarScrollButtonState = {
      backwardEnabled: !isScrolledStart,
      forwardEnabled: !isScrolledEnd
    };
    this._adapter.syncScrollButtons(state);
  }

  private _tryScrollActiveTabIntoView(): void {
    if (this._tabScrollAnimationFrame) {
      window.cancelAnimationFrame(this._tabScrollAnimationFrame);
    }

    // We batch the tab scrolling into a single animation frame to unnecessarily scrolling for each tab
    this._tabScrollAnimationFrame = window.requestAnimationFrame(() => {
      this._tabScrollAnimationFrame = undefined;
      if (this._adapter.isScrollable()) {
        if (typeof this._activeTab === 'number' && this._activeTab >= 0 && this._tabs[this._activeTab]) {
          this._adapter.tryScrollTabIntoView(this._tabs[this._activeTab]);
        }
      }
    });
  }

  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    value = Boolean(value);
    if (this._disabled !== value) {
      this._disabled = value;
      this._tabs.forEach(tab => tab.disabled = this._disabled);
      this._adapter.toggleHostAttribute(TAB_BAR_CONSTANTS.attributes.DISABLED, this._disabled);
    }
  }

  public get activeTab(): number | null | undefined {
    return this._activeTab;
  }
  public set activeTab(value: number | null | undefined) {
    if (this._activeTab !== value) {
      this._activeTab = value ?? undefined;

      if (typeof this._activeTab === 'number') {
        const newSelectedTab = this._tabs[this._activeTab];
        this._selectTab(newSelectedTab, false);
        this._adapter.setHostAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB, String(this._activeTab));
      } else {
        this._tabs.forEach(tab => tab.selected = false);
        this._adapter.removeHostAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB);
      }
    }
  }

  public get vertical(): boolean {
    return this._vertical;
  }
  public set vertical(value: boolean) {
    value = Boolean(value);
    if (this._vertical !== value) {
      this._vertical = value;

      if (this._isInitialized) {
        this._adapter.setVertical(this._vertical);
      }

      this._tabs.forEach(tab => tab.vertical = this._vertical);
      if (this._scrollButtonsVisible) {
        this._adapter.updateScrollButtonIcons(this._vertical);
      }
      this._adapter.toggleHostAttribute(TAB_CONSTANTS.attributes.VERTICAL, this._vertical);
    }
  }

  public get clustered(): boolean {
    return this._clustered;
  }
  public set clustered(value: boolean) {
    value = Boolean(value);
    if (this._clustered !== value) {
      this._clustered = value;
      this._adapter.toggleHostAttribute(TAB_BAR_CONSTANTS.attributes.CLUSTERED, this._clustered);
    }
  }

  public get stacked(): boolean {
    return this._stacked;
  }
  public set stacked(value: boolean) {
    value = Boolean(value);
    if (this._stacked !== value) {
      this._stacked = value;
      this._tabs.forEach(tab => tab.stacked = this._stacked);
      this._adapter.toggleHostAttribute(TAB_BAR_CONSTANTS.attributes.STACKED, this._stacked);
    }
  }

  public get secondary(): boolean {
    return this._secondary;
  }
  public set secondary(value: boolean) {
    value = Boolean(value);
    if (this._secondary !== value) {
      this._secondary = value;
      this._tabs.forEach(tab => tab.secondary = this._secondary);
      this._adapter.toggleHostAttribute(TAB_BAR_CONSTANTS.attributes.SECONDARY, this._secondary);
    }
  }

  public get inverted(): boolean {
    return this._inverted;
  }
  public set inverted(value: boolean) {
    value = Boolean(value);
    if (this._inverted !== value) {
      this._inverted = value;
      this._tabs.forEach(tab => tab.inverted = this._inverted);
      this._adapter.toggleHostAttribute(TAB_BAR_CONSTANTS.attributes.INVERTED, this._inverted);
    }
  }

  public get autoActivate(): boolean {
    return this._autoActivate;
  }
  public set autoActivate(value: boolean) {
    value = Boolean(value);
    if (this._autoActivate !== value) {
      this._autoActivate = value;
      this._adapter.toggleHostAttribute(TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE, this._autoActivate);
    }
  }

  public get scrollButtons(): boolean {
    return this._scrollButtons;
  }
  public set scrollButtons(value: boolean) {
    value = Boolean(value);
    if (this._scrollButtons !== value) {
      this._scrollButtons = Boolean(value);

      if (this._isInitialized) {
        if (this._scrollButtons) {
          this._adapter.initializeContainerSizeObserver(this._resizeListener);
          this._adapter.initializeScrollObserver(this._scrollListener);
          this._detectScrollableStatus();
          this._updateScrollState();
          this._tryScrollActiveTabIntoView();
        } else {
          this._adapter.destroyContainerSizeObserver();
          this._adapter.destroyScrollObserver(this._scrollListener);
          this._adapter.setScrollButtons(this._scrollButtons);
          this._scrollButtonsVisible = false;
        }
      }

      this._adapter.setHostAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS, String(this._scrollButtons));
    }
  }
}
