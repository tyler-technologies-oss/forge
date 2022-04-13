import { getShadowElement, toggleClass } from '@tylertech/forge-core';
import { MDCRipple, MDCRippleFoundation, MDCRippleCapableSurface } from '@material/ripple';
import { MDCTabIndicator } from '@material/tab-indicator';

import { IBaseAdapter, BaseAdapter } from '../../core/base/base-adapter';
import { ITabComponent } from './tab';
import { TAB_CONSTANTS } from './tab-constants';

export interface ITabAdapter extends IBaseAdapter {
  initialize(): void;
  initializeIndicator(): void;
  destroyIndicator(): void;
  computeIndicatorBounds(): DOMRect | undefined;
  activateIndicator(previousIndicatorClientRect?: DOMRect): void;
  deactivateIndicator(): void;
  initializeRipple(): void;
  destroyRipple(): void;
  addButtonListener(type: string, listener: (evt: Event) => void): void;
  removeButtonListener(type: string, listener: (evt: Event) => void): void;
  setDisabled(value: boolean): void;
  setActive(value: boolean): void;
  getOffsetLeft(): number;
  getOffsetWidth(): number;
  getContentOffsetLeft(): number;
  getContentOffsetWidth(): number;
  focus(): void;
  setTabIndex(value: number): void;
}

class TabRippleSurface implements MDCRippleCapableSurface {
  constructor(private _root: HTMLButtonElement) {}

  public get root(): Element {
    return this._root;
  }

  public get unbounded(): boolean | undefined {
    return false;
  }

  public get disabled(): boolean | undefined {
    return this._root.disabled;
  }
}

export class TabAdapter extends BaseAdapter<ITabComponent> implements ITabAdapter {
  private _buttonElement: HTMLButtonElement;
  private _content: HTMLElement;
  private _rippleElement: HTMLElement;
  private _rippleInstance: MDCRipple | undefined;
  private _tabIndicatorElement: HTMLElement;
  private _tabIndicator: MDCTabIndicator | undefined;

  constructor(component: ITabComponent) {
    super(component);
    this._buttonElement = getShadowElement(this._component, TAB_CONSTANTS.selectors.BUTTON) as HTMLButtonElement;
    this._content = getShadowElement(this._component, TAB_CONSTANTS.selectors.CONTENT);
    this._rippleElement = getShadowElement(this._component, TAB_CONSTANTS.selectors.RIPPLE);
    this._tabIndicatorElement = getShadowElement(this._component, TAB_CONSTANTS.selectors.INDICATOR);
  }

  public initialize(): void {
    this._component.setAttribute('role', 'tab');
  }

  public initializeRipple(): void {
    const rippleCapableSurface = new TabRippleSurface(this._buttonElement);
    const rippleAdapter = {
      ...MDCRipple.createAdapter(rippleCapableSurface),
      addClass: (className: string) => this._rippleElement.classList.add(className),
      removeClass: (className: string) => this._rippleElement.classList.remove(className),
      updateCssVariable: (varName: string, value: string) => this._rippleElement.style.setProperty(varName, value)
    };
    const rippleFoundation = new MDCRippleFoundation(rippleAdapter);
    this._rippleInstance = new MDCRipple(this._buttonElement, rippleFoundation);
  }

  public destroyRipple(): void {
    if (this._rippleInstance) {
      this._rippleInstance.destroy();
    }
  }

  public initializeIndicator(): void {
    this._tabIndicator = new MDCTabIndicator(this._tabIndicatorElement);
  }

  public destroyIndicator(): void {
    if (this._tabIndicator) {
      this._tabIndicator.destroy();
      this._tabIndicator = undefined;
    }
  }

  public activateIndicator(previousIndicatorClientRect?: DOMRect): void {
    if (this._tabIndicator) {
      this._tabIndicator.activate(previousIndicatorClientRect);
    }
  }

  public deactivateIndicator(): void {
    if (this._tabIndicator) {
      this._tabIndicator.deactivate();
    }
  }

  public computeIndicatorBounds(): DOMRect | undefined {
    return this._tabIndicator ? this._tabIndicator.computeContentClientRect() as DOMRect : undefined;
  }

  public addButtonListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.addEventListener(type, listener);
  }

  public removeButtonListener(type: string, listener: (evt: Event) => void): void {
    this._buttonElement.removeEventListener(type, listener);
  }

  public setDisabled(value: boolean): void {
    this._buttonElement.disabled = value;
    this.setTabIndex(!value ? 0 : -1);
    this._component.setAttribute('aria-disabled', value.toString());
  }

  public setActive(value: boolean): void {
    toggleClass(this._buttonElement, value, TAB_CONSTANTS.classes.ACTIVE);
    this.setTabIndex(value ? 0 : -1);
    this._component.setAttribute('aria-selected', value.toString());
  }

  public getOffsetLeft(): number {
    return this._buttonElement.offsetLeft;
  }
  
  public getOffsetWidth(): number {
    return this._buttonElement.offsetWidth;
  }

  public getContentOffsetLeft(): number {
    return this._content.offsetLeft;
  }

  public getContentOffsetWidth(): number {
    return this._content.offsetWidth;
  }

  public focus(): void {
    this._buttonElement.focus();
  }

  public setTabIndex(value: number): void {
    this._buttonElement.tabIndex = value;
  }
}
