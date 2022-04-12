import { MDCTabScroller } from '@material/tab-scroller';
import { getShadowElement, removeClass, isFunction, getActiveElement } from '@tylertech/forge-core';

import { toggleClass } from '../../core/utils';
import { IBaseAdapter, BaseAdapter } from '../../core/adapters/base-adapter';
import { ITabBarComponent } from './tab-bar';
import { TAB_BAR_CONSTANTS, TabBarLayoutMode, TabBarLayoutAlign } from './tab-bar-constants';
import { ITabComponent } from '../tab/tab';
import { TAB_CONSTANTS, ITabDimensions } from '../tab/tab-constants';

export interface ITabBarAdapter extends IBaseAdapter {
  initializeTabs(activeTabIndex: number, stretch: boolean): void;
  initializeTabScroller(): void;
  initializeAccessibility(): void;
  destroyTabScroller(): void;
  addTabChangeListener(listener: (evt: Event) => void): void;
  removeTabChangeListener(listener: (evt: Event) => void): void;
  addScrollListener(listener: (evt: Event) => void): void;
  getTabIndex(tab: ITabComponent): number;
  getTabCount(): number;
  activateTab(index: number, previousTabBounds?: DOMRect): void;
  deactivateTab(index: number): void;
  syncTabIndex(index: number): void;
  getTabBounds(index: number): DOMRect | undefined;
  setUnderline(value: boolean): void;
  setStacked(value: boolean): void;
  scrollTo(scrollX: number): void;
  getScrollContentWidth(): number;
  getScrollPosition(): number;
  getOffsetWidth(): number;
  getTabDimensionsAtIndex(index: number): ITabDimensions;
  incrementScroll(scrollXIncrement: number): void;
  isScrolled(): boolean;
  isScrolledEnd(): boolean;
  getFocusedTabIndex(): number;
  focusTabAtIndex(index: number): void;
  setLayoutMode(value: TabBarLayoutMode): void;
  setLayoutAlign(value: TabBarLayoutAlign): void;
  setPreviousButtonVisibility(value: boolean): void;
  setPreviousButtonEnabled(value: boolean): void;
  setNextButtonVisibility(value: boolean): void;
  setNextButtonEnabled(value: boolean): void;
  addScrollPreviousListener(type: string, listener: (evt: MouseEvent) => void): void;
  addScrollNextListener(type: string, listener: (evt: MouseEvent) => void): void;
  isTabDisabled(index: number): boolean;
  ensureFocusableTab(): void;
}

export class TabBarAdapter extends BaseAdapter<ITabBarComponent> implements ITabBarAdapter {
  private _rootElement: HTMLElement;
  private _defaultSlotElement: HTMLSlotElement;
  private _tabScrollElement: HTMLElement;
  private _tabScrollAreaElement: HTMLElement;
  private _tabScrollContentElement: HTMLElement;
  private _tabScroller: MDCTabScroller | undefined;
  private _tabs: ITabComponent[] = [];
  private _prevButtonContainerElement: HTMLElement;
  private _nextButtonContainerElement: HTMLElement;
  private _prevButtonElement: HTMLButtonElement;
  private _nextButtonElement: HTMLButtonElement;

  constructor(component: ITabBarComponent) {
    super(component);
    this._rootElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.ROOT);
    this._tabScrollElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.TAB_SCROLLER);
    this._tabScrollAreaElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.TAB_SCROLLER_AREA);
    this._tabScrollContentElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.TAB_SCROLLER_CONTENT);
    this._defaultSlotElement = getShadowElement(this._component, TAB_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
    this._prevButtonContainerElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON_CONTAINER);
    this._prevButtonElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.PREV_BUTTON) as HTMLButtonElement;
    this._nextButtonContainerElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON_CONTAINER);
    this._nextButtonElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.NEXT_BUTTON) as HTMLButtonElement;
  }

  public initializeTabs(activeTabIndex: number, stretch: boolean): void {
    this._tabs = this._getTabs();

    if (!this._tabs.length) {
      return;
    }

    this._tabs.forEach(tab => {
      tab.active = false;
      tab.stretch = stretch;
    });

    // Set the initial active tab
    if (activeTabIndex >= 0 && activeTabIndex < this._tabs.length) {
      this._tabs[activeTabIndex].active = true;
    } else {
      this.ensureFocusableTab();
    }
  }

  public initializeTabScroller(): void {
    this._tabScroller = new MDCTabScroller(this._tabScrollElement);
  }

  public initializeAccessibility(): void {
    if (!this._component.hasAttribute('role')) {
      this._component.setAttribute('role', 'tablist');
    }
  }

  public destroyTabScroller(): void {
    if (this._tabScroller) {
      this._tabScroller.destroy();
    }
  }

  public addTabChangeListener(listener: (evt: Event) => void): void {
    this._defaultSlotElement.addEventListener('slotchange', listener);
  }

  public removeTabChangeListener(listener: (evt: Event) => void): void {
    this._defaultSlotElement.removeEventListener('slotchange', listener);
  }

  public addScrollListener(listener: (evt: Event) => void): void {
    this._tabScrollAreaElement.addEventListener('scroll', listener);
  }

  public getTabIndex(tab: ITabComponent): number {
    return this._tabs.indexOf(tab);
  }

  public getTabCount(): number {
    return this._tabs.length;
  }

  public activateTab(index: number, previousTabBounds?: DOMRect): void {
    const tab = this._getTabByIndex(index);
    if (tab) {
      tab.activate(previousTabBounds);
    }
  }

  public deactivateTab(index: number): void {
    const tab = this._getTabByIndex(index);
    if (tab) {
      tab.deactivate();
    }
  }

  public syncTabIndex(index: number): void {
    const tabs = this._getTabs();
    const activeTab = tabs[index];
    tabs.filter(t => t !== activeTab)
        .forEach(t => t.setTabIndex(-1));
  }

  public getTabBounds(index: number): DOMRect | undefined {
    const tab = this._getTabByIndex(index);
    if (tab) {
      return tab.computeIndicatorBounds();
    }
    return undefined;
  }

  public setUnderline(value: boolean): void {
    toggleClass(this._rootElement, value, TAB_BAR_CONSTANTS.classes.UNDERLINED);
  }
  
  public setStacked(value: boolean): void {
    toggleClass(this._rootElement, value, TAB_BAR_CONSTANTS.classes.STACKED);
  }

  public scrollTo(scrollX: number): void {
    if (this._tabScroller) {
      this._tabScroller.scrollTo(scrollX);
    }
  }

  public getScrollContentWidth(): number {
    return this._tabScroller ? this._tabScroller.getScrollContentWidth() : 0;
  }

  public getScrollPosition(): number {
    return this._tabScroller ? this._tabScroller.getScrollPosition() : 0;
  }

  public getOffsetWidth(): number {
    return this._tabScrollElement.offsetWidth;
  }

  public getTabDimensionsAtIndex(index: number): ITabDimensions {
    const tab = this._getTabByIndex(index);
    if (tab) {
      return tab.computeDimensions();
    }
    return {
      rootLeft: 0,
      rootRight: 0,
      contentLeft: 0,
      contentRight: 0
    };
  }

  public incrementScroll(scrollXIncrement: number): void {
    if (this._tabScroller) {
      this._tabScroller.incrementScroll(scrollXIncrement);
    }
  }

  public isScrolled(): boolean {
    const position = this._tabScrollAreaElement.scrollLeft;
    return position > 0;
  }

  public isScrolledEnd(): boolean {
    const position = this._tabScrollAreaElement.scrollLeft;
    const scrollWidth = this._tabScrollContentElement.scrollWidth - this._tabScrollElement.offsetWidth;
    return position >= scrollWidth;
  }

  public getFocusedTabIndex(): number {
    const activeElement = getActiveElement() as ITabComponent;
    return this._tabs.findIndex(tab => {
      if (tab === activeElement) {
        return true;
      }
      return !!(tab.shadowRoot as ShadowRoot).contains(activeElement);
    });
  }

  public focusTabAtIndex(index: number): void {
    const tab = this._getTabByIndex(index);
    if (tab) {
      return tab.focus();
    }
  }

  public setLayoutMode(value: TabBarLayoutMode): void {
    const isFixed = value === 'fixed';
    toggleClass(this._rootElement, isFixed, TAB_BAR_CONSTANTS.classes.FIXED);
    this._tabs.forEach(tab => tab.stretch = isFixed);
  }

  public setLayoutAlign(value: TabBarLayoutAlign): void {
    removeClass([
      TAB_BAR_CONSTANTS.classes.ALIGN_CENTER,
      TAB_BAR_CONSTANTS.classes.ALIGN_END
    ], this._rootElement);
    switch (value) {
      case 'center':
        this._rootElement.classList.add(TAB_BAR_CONSTANTS.classes.ALIGN_CENTER);
        break;
      case 'end':
        this._rootElement.classList.add(TAB_BAR_CONSTANTS.classes.ALIGN_END);
        break;
    }
  }

  public setPreviousButtonVisibility(value: boolean): void {
    if (value) {
      this._prevButtonContainerElement.style.removeProperty('display');
    } else {
      this._prevButtonContainerElement.style.display = 'none';
    }
  }

  public setPreviousButtonEnabled(value: boolean): void {
    this._prevButtonElement.disabled = !value;
  }

  public setNextButtonVisibility(value: boolean): void {
    if (value) {
      this._nextButtonContainerElement.style.removeProperty('display');
    } else {
      this._nextButtonContainerElement.style.display = 'none';
    }
  }

  public setNextButtonEnabled(value: boolean): void {
    this._nextButtonElement.disabled = !value;
  }

  public addScrollPreviousListener(type: string, listener: (evt: MouseEvent) => void): void {
    this._prevButtonElement.addEventListener(type, listener);
  }
  
  public addScrollNextListener(type: string, listener: (evt: MouseEvent) => void): void {
    this._nextButtonElement.addEventListener(type, listener);
  }

  public isTabDisabled(index: number): boolean {
    const tab = this._getTabByIndex(index);
    return tab ? tab.disabled : true;
  }

  public ensureFocusableTab(): void {
    const tabs = this._getTabs();
    const hasActiveTab = tabs.some(tab => tab.active);
    if (!hasActiveTab && tabs.length) {
      const firstTab = tabs[0];
      if (isFunction(firstTab.setTabIndex)) {
        tabs[0].setTabIndex(0);
      }
    }
  }

  private _getTabs(): ITabComponent[] {
    return Array.from(this._component.querySelectorAll(TAB_CONSTANTS.elementName));
  }

  private _getTabByIndex(index: number): ITabComponent {
    return this._tabs[index];
  }
}
