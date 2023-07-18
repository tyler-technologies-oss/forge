
import { getShadowElement, toggleAttribute } from '@tylertech/forge-core';
import { tylIconKeyboardArrowLeft, tylIconKeyboardArrowRight, tylIconKeyboardArrowUp, tylIconKeyboardArrowDown } from '@tylertech/tyler-icons/standard';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { ITabComponent } from '../tab/tab';
import { TAB_CONSTANTS } from '../tab/tab-constants';
import { ITabBarComponent } from './tab-bar';
import { TAB_BAR_CONSTANTS } from './tab-bar-constants';

export interface ITabBarAdapter extends IBaseAdapter {
  initializeContainerSizeObserver(listener: () => void): void;
  destroyContainerSizeObserver(): void;
  initializeScrollObserver(listener: EventListener): void;
  destroyScrollObserver(listener: EventListener): void;
  setVertical(value: boolean): void;
  setScrollBackwardButtonListener(listener: EventListener): void;
  setScrollForwardButtonListener(listener: EventListener): void;
  addSlotListener(listener: EventListener): void;
  getTabs(): ITabComponent[];
  tryScrollTabIntoView(tab: ITabComponent): Promise<void>;
  isScrollable(): boolean;
  getScrollState(): ITabBarScrollInfo;
  setScrollButtons(value: boolean): void;
  syncScrollButtons(state: ITabBarScrollButtonState): void;
  scroll(which: 'backward' | 'forward'): void;
  updateScrollButtonIcons(vertical: boolean): void;
}

export interface ITabBarScrollInfo {
  isScrolledStart: boolean;
  isScrolledEnd: boolean;
}

export interface ITabBarScrollButtonState {
  backwardEnabled: boolean;
  forwardEnabled: boolean;
}

export class TabBarAdapter extends BaseAdapter<ITabBarComponent> implements ITabBarAdapter {
  private readonly _defaultSlotElement: HTMLSlotElement;
  private readonly _container: HTMLElement;
  private readonly _scrollContainer: HTMLElement;
  private _resizeObserver: ResizeObserver | undefined;
  private _backwardScrollButton: HTMLElement | undefined;
  private _forwardScrollButton: HTMLElement | undefined;

  constructor(component: ITabBarComponent) {
    super(component);

    this._defaultSlotElement = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.DEFAULT_SLOT) as HTMLSlotElement;
    this._container = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.CONTAINER);
    this._scrollContainer = getShadowElement(this._component, TAB_BAR_CONSTANTS.selectors.SCROLL_CONTAINER);
  }

  public initializeContainerSizeObserver(listener: () => void): void {
    this._resizeObserver = new ResizeObserver(() => listener());
    this._resizeObserver.observe(this._component);
  }
  
  public initializeScrollObserver(listener: EventListener): void {
    this._scrollContainer.addEventListener('scroll', listener, { passive: true });
  }

  public destroyContainerSizeObserver(): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
  }

  public destroyScrollObserver(listener: EventListener): void {
    this._scrollContainer.removeEventListener('scroll', listener, { passive: true } as AddEventListenerOptions);
  }

  public setVertical(value: boolean): void {
    toggleAttribute(this._scrollContainer, !!value, 'aria-orientation', 'vertical');
  }

  public setScrollBackwardButtonListener(listener: EventListener): void {
    this._backwardScrollButton?.querySelector('button')?.addEventListener('click', listener);
  }
  
  public setScrollForwardButtonListener(listener: EventListener): void {
    this._forwardScrollButton?.querySelector('button')?.addEventListener('click', listener);
  }

  public addSlotListener(listener: EventListener): void {
    this._defaultSlotElement.addEventListener('slotchange', listener);
  }

  public getTabs(): ITabComponent[] {
    return Array.from(this._component.querySelectorAll(TAB_CONSTANTS.elementName));
  }

  public async tryScrollTabIntoView(tab: ITabComponent): Promise<void> {
    await new Promise(requestAnimationFrame);

    // Due to the async nature of this method, make sure we still need to scroll this tab into view...
    if (!tab.isConnected || (!tab.selected && !tab.matches(':focus'))) {
      return;
    }

    const isVertical = this._component.vertical;
    const scrollContainerOffset = isVertical ? this._scrollContainer.offsetTop : this._scrollContainer.offsetLeft;
    const offset = isVertical ? tab.offsetTop : tab.offsetLeft;
    const extent = isVertical ? tab.offsetHeight : tab.offsetWidth;
    const scroll = isVertical ? this._scrollContainer.scrollTop : this._scrollContainer.scrollLeft;
    const hostExtent = isVertical ? this._scrollContainer.offsetHeight : this._scrollContainer.offsetWidth;
    const min = offset - (TAB_BAR_CONSTANTS.numbers.SCROLL_MARGIN + scrollContainerOffset);
    const max = offset + extent - hostExtent + (TAB_BAR_CONSTANTS.numbers.SCROLL_MARGIN - scrollContainerOffset);
    const to = Math.min(min, Math.max(max, scroll));
    const behavior = tab.matches(':focus') ? 'smooth' : 'instant' as ScrollBehavior;

    this._scrollContainer.scrollTo({
      behavior,
      [isVertical ? 'left' : 'top']: 0,
      [isVertical ? 'top' : 'left']: to
    });
  }

  public getScrollState(): ITabBarScrollInfo {
    const { scrollHeight, scrollWidth, scrollLeft, scrollTop, clientHeight, clientWidth } = this._scrollContainer;
    const scrollPosition = this._component.vertical ? clientHeight + scrollTop : clientWidth + scrollLeft;
    const scrollSize = this._component.vertical ? scrollHeight : scrollWidth;
    const isScrolledEnd = scrollPosition === scrollSize;
    const isScrolledStart = (this._component.vertical ? scrollPosition - clientHeight : scrollPosition - clientWidth) === 0;
    return { isScrolledStart, isScrolledEnd };
  }

  public isScrollable(): boolean {
    const { scrollHeight, scrollWidth, clientHeight, clientWidth } = this._scrollContainer;
    return this._component.vertical ? scrollHeight > clientHeight : scrollWidth > clientWidth;
  }

  public setScrollButtons(value: boolean): void {
    if (value) {
      this._backwardScrollButton = this._createScrollButton(this._component.vertical ? tylIconKeyboardArrowUp.name : tylIconKeyboardArrowLeft.name);
      this._container.insertAdjacentElement('afterbegin', this._backwardScrollButton);

      this._forwardScrollButton = this._createScrollButton(this._component.vertical ? tylIconKeyboardArrowDown.name : tylIconKeyboardArrowRight.name);
      this._container.insertAdjacentElement('beforeend', this._forwardScrollButton);
    } else {
      this._backwardScrollButton?.remove();
      this._backwardScrollButton = undefined;

      this._forwardScrollButton?.remove();
      this._forwardScrollButton = undefined;
    }
  }

  public syncScrollButtons({ backwardEnabled, forwardEnabled }: ITabBarScrollButtonState): void {
    const backButton = this._backwardScrollButton?.querySelector('button');
    const forwardButton = this._forwardScrollButton?.querySelector('button');

    if (backButton) {
      const disabled = !backwardEnabled;
      if (disabled && backButton.matches(':focus')) {
        forwardButton?.focus();
      }
      backButton.disabled = disabled;
    }

    if (forwardButton) {
      const disabled = !forwardEnabled;
      if (disabled && forwardButton.matches(':focus')) {
        backButton?.focus();
      }
      forwardButton.disabled = disabled;
    }
  }

  public scroll(which: 'backward' | 'forward'): void {
    const amount = this._component.vertical ? this._scrollContainer.offsetHeight : this._scrollContainer.offsetWidth;
    this._scrollContainer.scrollBy({
      behavior: 'smooth',
      [this._component.vertical ? 'top' : 'left']: amount * (which === 'forward' ? 1 : -1)
    });
  }

  public updateScrollButtonIcons(vertical: boolean): void {
    const backButtonIcon = this._backwardScrollButton?.querySelector('forge-icon');
    if (backButtonIcon) {
      backButtonIcon.name = vertical ? tylIconKeyboardArrowUp.name : tylIconKeyboardArrowLeft.name;
    }

    const nextButtonIcon = this._forwardScrollButton?.querySelector('forge-icon');
    if (nextButtonIcon) {
      nextButtonIcon.name = vertical ? tylIconKeyboardArrowDown.name : tylIconKeyboardArrowRight.name;
    }
  }

  private _createScrollButton(iconName: string): HTMLElement {
    const iconButton = document.createElement('forge-icon-button');
    iconButton.classList.add(TAB_BAR_CONSTANTS.classes.SCROLL_BUTTON);

    const button = document.createElement('button');
    button.type = 'button';
    button.tabIndex = -1;
    button.setAttribute('aria-hidden', 'true');
    iconButton.appendChild(button);

    const icon = document.createElement('forge-icon');
    icon.name = iconName;
    button.appendChild(icon);

    return iconButton;
  }
}
