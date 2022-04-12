import { ICustomElementFoundation, Platform, isNumber } from '@tylertech/forge-core';

import { ITabBarAdapter } from './tab-bar-adapter';
import { TabBarLayoutMode, TabBarLayoutAlign, TAB_BAR_CONSTANTS, ITabBarActivateEventData, ACCEPTABLE_KEYS, KEYCODE_MAP } from './tab-bar-constants';
import { TAB_CONSTANTS, ITabDimensions } from '../tab/tab-constants';
import { ITabComponent } from '../tab/tab';

export interface ITabBarFoundation extends ICustomElementFoundation {
  activeTab: number;
  layoutMode: TabBarLayoutMode;
  layoutAlign: TabBarLayoutAlign;
  underline: boolean;
  autoActivate: boolean;
  stacked: boolean;
  scrollButtons: boolean;
  forceScrollButtons: boolean;
  activateTab(index: number): void;
  scrollIntoView(index: number): void;
}

export class TabBarFoundation implements ITabBarFoundation {
  private _isInitialized = false;
  private _activeTab = -1;
  private _layoutMode: TabBarLayoutMode = 'fixed';
  private _layoutAlign: TabBarLayoutAlign = 'start';
  private _underline = false;
  private _autoActivate = false;
  private _stacked = false;
  private _scrollButtons = true;
  private _forceScrollButtons = false;
  private _tabsChangedListener: (evt: Event) => void;
  private _tabInteractedListener: (evt: CustomEvent<void>) => void;
  private _keydownListener: (evt: KeyboardEvent) => void;
  private _scrollPrevClickListener: (evt: MouseEvent) => void;
  private _scrollPrevMousedownListener: (evt: MouseEvent) => void;
  private _scrollNextClickListener: (evt: MouseEvent) => void;
  private _scrollNextMousedownListener: (evt: MouseEvent) => void;
  private _scrollListener: (evt: Event) => void;

  constructor(private _adapter: ITabBarAdapter) {
    this._tabsChangedListener = evt => this._onTabsChanged(evt);
    this._tabInteractedListener = evt => this._onTabInteracted(evt);
    this._keydownListener = evt => this._onKeydown(evt);
    this._scrollPrevClickListener = evt => this._onScrollPrevious(evt);
    this._scrollPrevMousedownListener = evt => evt.preventDefault();
    this._scrollNextClickListener = evt => this._onScrollNext(evt);
    this._scrollNextMousedownListener = evt => evt.preventDefault();
    this._scrollListener = evt => this._onScroll(evt);
  }

  public initialize(): void {
    this._adapter.initializeTabs(this._activeTab, this._isFixed);
    this._adapter.initializeTabScroller();
    this._adapter.initializeAccessibility();
    this._adapter.addTabChangeListener(this._tabsChangedListener);
    this._adapter.addScrollPreviousListener('click', this._scrollPrevClickListener);
    this._adapter.addScrollPreviousListener('mousedown', this._scrollPrevMousedownListener);
    this._adapter.addScrollNextListener('click', this._scrollNextClickListener);
    this._adapter.addScrollNextListener('mousedown', this._scrollNextMousedownListener);
    this._adapter.addHostListener(TAB_CONSTANTS.events.INTERACTED, this._tabInteractedListener);
    this._adapter.addHostListener('keydown', this._keydownListener);
    this._adapter.addScrollListener(this._scrollListener);
    this._adapter.setUnderline(this._underline);
    this._adapter.setLayoutMode(this._layoutMode);
    this._adapter.setLayoutAlign(this._layoutAlign);
    window.requestAnimationFrame(() => {
      this._syncScrollButtons();
      this._adapter.ensureFocusableTab();
    });
    this._isInitialized = true;
  }
  
  public disconnect(): void {
    this._adapter.destroyTabScroller();
    this._adapter.removeTabChangeListener(this._tabsChangedListener);
    this._adapter.removeHostListener(TAB_CONSTANTS.events.INTERACTED, this._tabInteractedListener);
    this._adapter.removeHostListener('keydown', this._keydownListener);
    this._isInitialized = false;
  }

  private _onTabsChanged(evt: Event): void {
    this._adapter.initializeTabs(this._activeTab, this._isFixed);
    this._adapter.ensureFocusableTab();

    // We need to wait a full cycle to scroll the active tab into view
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        this.scrollIntoView(this._activeTab);
        this._syncScrollButtons();
      });
    });
  }

  private _onTabInteracted(evt: CustomEvent<void>): void {
    const activatedTab = evt.target as ITabComponent;
    const activatedTabIndex = this._adapter.getTabIndex(activatedTab);
    
    // Check if the event and requested tab index is valid
    const isTabEvent = activatedTab.tagName.toLowerCase() === TAB_CONSTANTS.elementName;
    const isValidTabIndex = activatedTabIndex !== this._activeTab && this._indexIsInRange(activatedTabIndex);
    if (!isTabEvent || !isValidTabIndex) {
      return;
    }

    // Emit the activate event
    const activateEventData: ITabBarActivateEventData = { index: activatedTabIndex };
    const canActivate = this._adapter.emitHostEvent(TAB_BAR_CONSTANTS.events.ACTIVATE, activateEventData, true, true);
    
    // Check if listener prevented default on the activate event, and stop now if so
    if (!canActivate) {
      return;
    }

    this.activateTab(activatedTabIndex);
    this._adapter.focusTabAtIndex(activatedTabIndex);
  }

  private _onKeydown(evt: KeyboardEvent): void {
    const key = this._getKeyFromEvent(evt);

    // Early exit if the event key isn't one of the keyboard navigation keys
    if (!key) {
      return;
    }

    // Prevent default behavior for movement keys, but not for activation keys, since :active is used to apply ripple
    if (!this._isActivationKey(key)) {
      evt.preventDefault();
    }

    if (this._autoActivate) {
      if (this._isActivationKey(key)) {
        return;
      }

      const index = this._determineTargetFromKey(this._activeTab, key);
      if (this._activeTab === index) {
        return;
      }

      const activateEventData: ITabBarActivateEventData = { index };
      const canActivate = this._adapter.emitHostEvent(TAB_BAR_CONSTANTS.events.ACTIVATE, activateEventData, true, true);

      if (canActivate) {
        this.activateTab(index);
        this._adapter.focusTabAtIndex(index);
      }
    } else {
      const focusedTabIndex = this._adapter.getFocusedTabIndex();
      if (focusedTabIndex === -1) {
        return;
      }

      if (this._isActivationKey(key)) {
        const activateEventData: ITabBarActivateEventData = { index: focusedTabIndex };
        const canActivate = this._adapter.emitHostEvent(TAB_BAR_CONSTANTS.events.ACTIVATE, activateEventData, true, true);
        if (canActivate) {
          this.activateTab(focusedTabIndex);
        }
      } else {
        const index = this._determineTargetFromKey(focusedTabIndex, key);
        if (focusedTabIndex === index) {
          return;
        }
        this._adapter.focusTabAtIndex(index);
        this.scrollIntoView(index);
      }
    }
  }

  private _onScrollPrevious(evt: MouseEvent): void {
    const scrollAmount = -this._adapter.getOffsetWidth();
    this._adapter.incrementScroll(scrollAmount);
    this._syncScrollButtons();
  }
  
  private _onScrollNext(evt: MouseEvent): void {
    const scrollAmount = this._adapter.getOffsetWidth();
    this._adapter.incrementScroll(scrollAmount);
    this._syncScrollButtons();
  }

  private _onScroll(evt: Event): void {
    this._syncScrollButtons();
  }

  private _syncScrollButtons(): void {
    const isScrollable = this._isScrollable();
    this._adapter.setPreviousButtonVisibility(isScrollable);
    this._adapter.setNextButtonVisibility(isScrollable);
    if (isScrollable) {
      this._adapter.setPreviousButtonEnabled(this._adapter.isScrolled());
      this._adapter.setNextButtonEnabled(!this._adapter.isScrolledEnd());
    }
  }

  /**
   * Determines the index of the adjacent tab closest to either edge of the Tab Bar
   * @param index The index of the tab
   * @param tabDimensions The dimensions of the tab
   * @param scrollPosition The current scroll position
   * @param barWidth The width of the tab bar
   */
  private _findAdjacentTabIndexClosestToEdge(index: number, tabDimensions: ITabDimensions, scrollPosition: number, barWidth: number): number {
    const relativeRootLeft = tabDimensions.rootLeft - scrollPosition;
    const relativeRootRight = tabDimensions.rootRight - scrollPosition - barWidth;
    const relativeRootDelta = relativeRootLeft + relativeRootRight;
    const leftEdgeIsCloser = relativeRootLeft < 0 || relativeRootDelta < 0;
    const rightEdgeIsCloser = relativeRootRight > 0 || relativeRootDelta > 0;

    if (leftEdgeIsCloser) {
      return index - 1;
    }

    if (rightEdgeIsCloser) {
      return index + 1;
    }

    return -1;
  }

  /**
   * Calculates the scroll increment that will make the tab at the given index visible
   * @param index The index of the tab
   * @param nextIndex The index of the next tab
   * @param scrollPosition The current scroll position
   * @param barWidth The width of the tab-bar
   */
  private _calculateScrollIncrement(index: number, nextIndex: number, scrollPosition: number, barWidth: number): number {
    const nextTabDimensions = this._adapter.getTabDimensionsAtIndex(nextIndex);
    const relativeContentLeft = nextTabDimensions.contentLeft - scrollPosition - barWidth;
    const relativeContentRight = nextTabDimensions.contentRight - scrollPosition;
    const leftIncrement = relativeContentRight - TAB_BAR_CONSTANTS.numbers.EXTRA_SCROLL_AMOUNT;
    const rightIncrement = relativeContentLeft + TAB_BAR_CONSTANTS.numbers.EXTRA_SCROLL_AMOUNT;

    if (nextIndex < index) {
      return Math.min(leftIncrement, 0);
    }

    return Math.max(rightIncrement, 0);
  }

  /**
   * Private method for determining the index of the destination tab based on what key was pressed
   * @param origin The original index from which to determine the destination
   * @param key The name of the key
   */
  private _determineTargetFromKey(origin: number, key: string, nextIndex?: number): number {
    if (origin === nextIndex) {
      return origin;
    }

    const maxIndex = this._adapter.getTabCount() - 1;
    const shouldGoToEnd = key === TAB_BAR_CONSTANTS.strings.END_KEY;
    const shouldDecrement = key === TAB_BAR_CONSTANTS.strings.ARROW_LEFT_KEY;
    const shouldIncrement = key === TAB_BAR_CONSTANTS.strings.ARROW_RIGHT_KEY;
    let index = nextIndex !== undefined ? nextIndex : origin;

    if (shouldGoToEnd) {
      index = maxIndex;
    } else if (shouldDecrement) {
      index -= 1;
    } else if (shouldIncrement) {
      index += 1;
    } else {
      index = 0;
    }

    if (index < 0) {
      index = maxIndex;
    } else if (index > maxIndex) {
      index = 0;
    }

    // If this tab is disabled, then we'll try again...
    if (this._adapter.isTabDisabled(index)) {
      return this._determineTargetFromKey(origin, key, index);
    }

    return index;
  }

  private _isScrollable(): boolean {
    return this._forceScrollButtons ||
          (this._scrollButtons &&
          !Platform.isMobile &&
          !this._isFixed &&
          this._adapter.getScrollContentWidth() > this._adapter.getOffsetWidth());
  }

  private _getKeyFromEvent(evt: KeyboardEvent): string {
    if (ACCEPTABLE_KEYS.includes(evt.key)) {
      return evt.key;
    }
    return KEYCODE_MAP[evt.keyCode];
  }

  private _isActivationKey(key: string): boolean {
    return key === TAB_BAR_CONSTANTS.strings.SPACE_KEY || key === TAB_BAR_CONSTANTS.strings.ENTER_KEY;
  }

  private _indexIsInRange(index: number): boolean {
    return index >= 0 && index < this._adapter.getTabCount();
  }

  public activateTab(index: number): void {
    if (!isNumber(index)) {
      index = -1;
    }

    // If we have a currently selected tab we need to deactivate that now
    if (this._activeTab !== -1) {
      this._adapter.deactivateTab(this._activeTab);
    }

    // Activate the requested tab
    const previousTabBounds = this._adapter.getTabBounds(this._activeTab);
    this._adapter.activateTab(index, previousTabBounds);
    this._adapter.syncTabIndex(index);
    this._adapter.ensureFocusableTab();
    this.scrollIntoView(index);
    this._activeTab = index;
    this._syncScrollButtons();
    this._adapter.setHostAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB, this._activeTab.toString());
  }

  public scrollIntoView(index: number): void {
    if (!this._indexIsInRange(index)) {
      return;
    }

    if (index === 0) {
      return this._adapter.scrollTo(0);
    }

    if (index === this._adapter.getTabCount() - 1) {
      return this._adapter.scrollTo(this._adapter.getScrollContentWidth());
    }

    const scrollPosition = this._adapter.getScrollPosition();
    const barWidth = this._adapter.getOffsetWidth();
    const tabDimensions = this._adapter.getTabDimensionsAtIndex(index);
    const nextIndex = this._findAdjacentTabIndexClosestToEdge(index, tabDimensions, scrollPosition, barWidth);

    if (!this._indexIsInRange(nextIndex)) {
      return;
    }

    const scrollIncrement = this._calculateScrollIncrement(index, nextIndex, scrollPosition, barWidth);
    this._adapter.incrementScroll(scrollIncrement);
  }

  /** Gets and sets the active tab index. */
  public get activeTab(): number {
    return this._activeTab;
  }
  public set activeTab(value: number) {
    if (this._activeTab !== value) {
      if (!this._isInitialized) {
        this._activeTab = value;
        this._adapter.setHostAttribute(TAB_BAR_CONSTANTS.attributes.ACTIVE_TAB, this._activeTab.toString());
      } else {
        this.activateTab(value);
      }
    }
  }

  private get _isFixed(): boolean {
    return this._layoutMode === 'fixed';
  }

  public get layoutMode(): TabBarLayoutMode {
    return this._layoutMode;
  }
  public set layoutMode(value: TabBarLayoutMode) {
    if (this._layoutMode !== value) {
      this._layoutMode = value;
      this._adapter.setLayoutMode(this._layoutMode);
      this._syncScrollButtons();
    }
  }

  public get layoutAlign(): TabBarLayoutAlign {
    return this._layoutAlign;
  }
  public set layoutAlign(value: TabBarLayoutAlign) {
    if (this._layoutAlign !== value) {
      this._layoutAlign = value;
      this._adapter.setLayoutAlign(this._layoutAlign);
    }
  }

  public get underline(): boolean {
    return this._underline;
  }
  public set underline(value: boolean) {
    if (this._underline !== value) {
      this._underline = value;
      this._adapter.setUnderline(this._underline);
      this._adapter.toggleHostAttribute(TAB_BAR_CONSTANTS.attributes.UNDERLINE, this._underline);
    }
  }

  public get stacked(): boolean {
    return this._stacked;
  }
  public set stacked(value: boolean) {
    if (this._stacked !== value) {
      this._stacked = value;
      this._adapter.setStacked(this._stacked);
      if (this._stacked) {
        this._adapter.setHostAttribute(TAB_BAR_CONSTANTS.attributes.STACKED);
      } else {
        this._adapter.removeHostAttribute(TAB_BAR_CONSTANTS.attributes.STACKED);
      }
    }
  }

  public get scrollButtons(): boolean {
    return this._scrollButtons;
  }
  public set scrollButtons(value: boolean) {
    if (this._scrollButtons !== value) {
      this._scrollButtons = value;
      this._adapter.setHostAttribute(TAB_BAR_CONSTANTS.attributes.SCROLL_BUTTONS, this._scrollButtons.toString());
      if (this._isInitialized) {
        this._syncScrollButtons();
      }
    }
  }

  public get forceScrollButtons(): boolean {
    return this._forceScrollButtons;
  }
  public set forceScrollButtons(value: boolean) {
    if (this._forceScrollButtons !== value) {
      this._forceScrollButtons = value;
      if (this._isInitialized) {
        this._syncScrollButtons();
      }
    }
  }

  public get autoActivate(): boolean {
    return this._autoActivate;
  }
  public set autoActivate(value: boolean) {
    if (this._autoActivate !== value) {
      this._autoActivate = value;
      this._adapter.setHostAttribute(TAB_BAR_CONSTANTS.attributes.AUTO_ACTIVATE, this._autoActivate.toString());
    }
  }
}
