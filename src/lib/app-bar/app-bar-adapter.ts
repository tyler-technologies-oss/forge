import { getShadowElement } from '@tylertech/forge-core';
import { toggleClass } from '../core/utils';
import { BaseAdapter, IBaseAdapter } from '../core/adapters/base-adapter';
import { IAppBarComponent } from './app-bar';
import { APP_BAR_CONSTANTS } from './app-bar-constants';

export interface IAppBarAdapter extends IBaseAdapter {
  setTitleText(value: string): void;
  setDense(value: boolean): void;
  setRaised(value: boolean): void;
  setFixed(value: boolean): void;
  addBottomClass(name: string): void;
  removeBottomClass(name: string): void;
  addBottomSlotListener(listener: (evt: Event) => void): void;
  addCenterSlotListener(listener: (evt: Event) => void): void;
  setCenterSlotVisibility(): void;
}

/**
 * Provides facilities for interacting with the internal DOM of `AppBarComponent`.
 */
export class AppBarAdapter extends BaseAdapter<IAppBarComponent> implements IAppBarAdapter {
  private _rootElement: HTMLElement;
  private _titleElement: HTMLElement;
  private _bottomElement: HTMLElement;
  private _bottomSlotElement: HTMLSlotElement;
  private _centerSlotElement: HTMLSlotElement;
  private _centerSectionElement: HTMLElement;

  constructor(component: IAppBarComponent) {
    super(component);
    this._rootElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.ROOT);
    this._titleElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.TITLE);
    this._bottomElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.BOTTOM);
    this._bottomSlotElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.BOTTOM_SLOT) as HTMLSlotElement;
    this._centerSlotElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.CENTER_SLOT) as HTMLSlotElement;
    this._centerSectionElement = getShadowElement(component, APP_BAR_CONSTANTS.selectors.CENTER_SECTION);
  }

  /**
   * Sets the title text value.
   * @param {string} value The title text.
   */
  public setTitleText(value: string): void {
    this._titleElement.textContent = value;
  }

  public setDense(value: boolean): void {
    toggleClass(this._rootElement, value, APP_BAR_CONSTANTS.classes.DENSE);
  }

  public setRaised(value: boolean): void {
    toggleClass(this._rootElement, value, APP_BAR_CONSTANTS.classes.RAISED);
  }

  public setFixed(value: boolean): void {
    toggleClass(this._rootElement, value, APP_BAR_CONSTANTS.classes.FIXED);
  }

  public addBottomClass(name: string): void {
    this._bottomElement.classList.add(name);
  }

  public removeBottomClass(name: string): void {
    this._bottomElement.classList.remove(name);
  }

  public addBottomSlotListener(listener: (evt: Event) => void): void {
    this._bottomSlotElement.addEventListener('slotchange', listener);
  }

  public addCenterSlotListener(listener: (evt: Event) => void): void {
    this._centerSlotElement.addEventListener('slotchange', listener);
  }

  public setCenterSlotVisibility(): void {
    if (this._centerSlotElement.assignedNodes().length) {
      this._centerSectionElement.style.removeProperty('display');
      this._rootElement.classList.remove(APP_BAR_CONSTANTS.classes.NO_CENTER);
    } else {
      this._centerSectionElement.style.display = 'none';
      this._rootElement.classList.add(APP_BAR_CONSTANTS.classes.NO_CENTER);
    }
  }
}
