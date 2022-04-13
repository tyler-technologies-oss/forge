import { getShadowElement, playKeyframeAnimation, removeAllChildren, tryScrollIntoView } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../../core';
import { CalendarMenuAnimationType, CALENDAR_MENU_CONSTANTS, ICalendarMenuOption } from './calendar-menu-constants';
import { ICalendarMenuComponent } from './calendar-menu';
import { getGrid, getList, getListItems, removeAllExceptLastChild } from './calendar-menu-utils';

export interface ICalendarMenuAdapter extends IBaseAdapter {
  appendListItemsToEnd(options: ICalendarMenuOption[]): void;
  appendListItemsToStart(options: ICalendarMenuOption[]): void;
  animateInFromLeft(options: ICalendarMenuOption[], callback?: () => void): void;
  animateInFromRight(options: ICalendarMenuOption[], callback?: () => void): void;
  registerClickListener(listener: (evt: Event) => void): void;
  registerIntersectionObserver(callback: IntersectionObserverCallback): void;
  setAnimationType(value: CalendarMenuAnimationType): void;
  setClosed(): void;
  setFocusAtIndex(index: number, setFocus: boolean, preventFocus: boolean): void;
  setOpenAsGrid(options: ICalendarMenuOption[], focusedIndex: number, setFocus: boolean, preventFocus: boolean, replace?: boolean): void;
  setOpenAsList(options: ICalendarMenuOption[], focusedIndex: number, setFocus: boolean, preventFocus: boolean, replace?: boolean): void;
  unregisterClickListener(listener: (evt: Event) => void): void;
  unregisterIntersectionObserver(): void;
}

export class CalendarMenuAdapter extends BaseAdapter<ICalendarMenuComponent> implements ICalendarMenuAdapter {
  private _container: HTMLElement;
  private _intersectionObserver: IntersectionObserver | undefined;

  constructor(private component: ICalendarMenuComponent) {
    super(component);
    this._container = getShadowElement(component, CALENDAR_MENU_CONSTANTS.selectors.CONTAINER);
  }

  public registerClickListener(listener: (evt: Event) => void): void {
    this._container.addEventListener('click', listener);
  }

  public unregisterClickListener(listener: (evt: Event) => void): void {
    this._container.removeEventListener('click', listener);
  }

  public registerIntersectionObserver(callback: IntersectionObserverCallback): void {
    const root = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.LIST_WRAPPER);
    if (!root) {
      return;
    }
    const options = {
      root
    };
    this._intersectionObserver = new IntersectionObserver(callback, options);

    const scrollSpyBottom = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.SCROLL_SPY_BOTTOM);
    const scrollSpyTop = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.SCROLL_SPY_TOP);
    if (scrollSpyBottom) {
      this._intersectionObserver.observe(scrollSpyBottom);
    }
    if (scrollSpyTop) {
      this._intersectionObserver.observe(scrollSpyTop);
    }
  }

  public unregisterIntersectionObserver(): void {
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
      this._intersectionObserver = undefined;
    }
  }

  public setAnimationType(value: CalendarMenuAnimationType): void {
    this._container.setAttribute(CALENDAR_MENU_CONSTANTS.attributes.DATA_ANIMATION, value);
  }

  public setClosed(): void {
    this._container.classList.remove(CALENDAR_MENU_CONSTANTS.classes.OPEN);
    this._container.classList.add(CALENDAR_MENU_CONSTANTS.classes.CLOSING);
    playKeyframeAnimation(this._container, CALENDAR_MENU_CONSTANTS.classes.CLOSING, true).then(() => {
      removeAllChildren(this._container);
      this.toggleHostAttribute('hidden', true);
    });
  }

  public setOpenAsGrid(options: ICalendarMenuOption[], focusedIndex: number, setFocus: boolean, preventFocus: boolean, replace?: boolean): void {
    const element = getGrid(options);
    if (replace) {
      playKeyframeAnimation(this._container, CALENDAR_MENU_CONSTANTS.classes.REPLACING_VIEW, true).then(() => {
        removeAllExceptLastChild(this._container);
        this.setFocusAtIndex(focusedIndex, setFocus, preventFocus);
      });
    }
    this._container.appendChild(element);
    this.toggleHostAttribute('hidden', false);
    this._container.classList.add(CALENDAR_MENU_CONSTANTS.classes.OPEN);
    if (!replace) {
      this.setFocusAtIndex(focusedIndex, setFocus, preventFocus);
    }
  }

  public setOpenAsList(options: ICalendarMenuOption[], focusedIndex: number, setFocus: boolean, preventFocus: boolean, replace?: boolean): void {
    const element = getList(options);
    if (replace) {
      playKeyframeAnimation(this._container, CALENDAR_MENU_CONSTANTS.classes.REPLACING_VIEW, true).then(() => {
        removeAllExceptLastChild(this._container);
        this.setFocusAtIndex(focusedIndex, setFocus, preventFocus);
      });
    }
    this._container.appendChild(element);
    this.toggleHostAttribute('hidden', false);
    this._container.classList.add(CALENDAR_MENU_CONSTANTS.classes.OPEN);
    this._scrollItemIntoView('selected');
    if (!replace) {
      this.setFocusAtIndex(focusedIndex, setFocus, preventFocus);
    }
  }

  public appendListItemsToStart(options: ICalendarMenuOption[]): void {
    const wrapper = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.LIST_WRAPPER);
    const list = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.LIST);
    const firstItem = list?.querySelector(CALENDAR_MENU_CONSTANTS.selectors.ITEM);
    if (wrapper && list && firstItem) {
      const oldScrollTop = wrapper.scrollTop;
      const oldScroll = wrapper.scrollHeight - wrapper.clientHeight;

      getListItems(options).forEach(l => {
        list.insertBefore(l, firstItem);
      });

      const newScroll = wrapper.scrollHeight - wrapper.clientHeight;
      wrapper.scrollTop = oldScrollTop + (newScroll - oldScroll);
    }
  }

  public appendListItemsToEnd(options: ICalendarMenuOption[]): void {
    const list = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.LIST);
    const scrollSpyBottom = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.SCROLL_SPY_BOTTOM);
    if (list && scrollSpyBottom) {
      getListItems(options).forEach(l => {
        list.insertBefore(l, scrollSpyBottom);
      });
    }
  }

  public animateInFromLeft(options: ICalendarMenuOption[], callback?: () => void): void {
    playKeyframeAnimation(this._container, CALENDAR_MENU_CONSTANTS.classes.SLIDE_RIGHT, true).then(() => {
      removeAllExceptLastChild(this._container);
      if (callback) {
        callback();
      }
    });
    const element = getGrid(options);
    this._container.appendChild(element);
  }

  public animateInFromRight(options: ICalendarMenuOption[], callback?: () => void): void {
    playKeyframeAnimation(this._container, CALENDAR_MENU_CONSTANTS.classes.SLIDE_LEFT, true).then(() => {
      removeAllExceptLastChild(this._container);
      if (callback) {
        callback();
      }
    });
    const element = getGrid(options);
    this._container.appendChild(element);
  }

  public setFocusAtIndex(index: number, setFocus: boolean, preventFocus: boolean): void {
    const previouslyFocusedElement = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.FOCUSED);
    previouslyFocusedElement?.classList.remove(CALENDAR_MENU_CONSTANTS.classes.ITEM_FOCUSED, CALENDAR_MENU_CONSTANTS.classes.MDC_RIPPLE_UPGRADED_FOCUSED);
    previouslyFocusedElement?.setAttribute('tabindex', '-1');
    const item = this._container.querySelectorAll(CALENDAR_MENU_CONSTANTS.selectors.ITEM)?.[index];
    if (item) {
      item.classList.add(CALENDAR_MENU_CONSTANTS.classes.ITEM_FOCUSED);
      item.setAttribute('tabindex', preventFocus ? '-1' : '0' );
      if (setFocus && !preventFocus) {
        (item as HTMLElement).focus();
      } else if (preventFocus) {
        item.classList.add(CALENDAR_MENU_CONSTANTS.classes.MDC_RIPPLE_UPGRADED_FOCUSED);
      }
      this._scrollItemIntoView('focused');
    }
  }

  private _scrollItemIntoView(type: 'selected' | 'focused'): void {
    const list = this._container.querySelector(CALENDAR_MENU_CONSTANTS.selectors.LIST);
    const item = list?.querySelector(type === 'selected' ? CALENDAR_MENU_CONSTANTS.selectors.SELECTED : CALENDAR_MENU_CONSTANTS.selectors.FOCUSED);
    if (list && item) {
      tryScrollIntoView(list.parentElement as HTMLElement, item as HTMLElement, type === 'selected' ? 'auto' : 'smooth', type === 'selected' ? 'center' : 'nearest');
    }
  }


}
