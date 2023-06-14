import { addClass, getShadowElement, removeClass, toggleAttribute, toggleClass } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter, userInteractionListener } from '../core';
import { ForgeRipple, ForgeRippleAdapter, ForgeRippleCapableSurface, ForgeRippleFoundation } from '../ripple';
import { IButtonAreaComponent } from './button-area';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';

export interface IButtonAreaAdapter extends IBaseAdapter {
  buttonDisabled(): boolean;
  setDisabled(value: boolean): void;
  addListener(type: string, listener: (event: Event) => void): void;
  removeListener(type: string, listener: (event: Event) => void): void;
  addSlotChangeListener(listener: () => void): void;
  removeSlotChangeListener(listener: () => void): void;
  startButtonObserver(callback: MutationCallback): void;
  stopButtonObserver(): void;
  detectSlottedButton(): void;
  createRipple(): ForgeRipple;
  userInteractionListener(): ReturnType<typeof userInteractionListener>;
}

export class ButtonAreaAdapter extends BaseAdapter<IButtonAreaComponent> implements IButtonAreaAdapter, ForgeRippleCapableSurface {
  private _rootElement: HTMLElement;
  private _buttonSlotElement: HTMLSlotElement;
  private _buttonElement?: HTMLButtonElement;
  private _buttonObserver?: MutationObserver;

  constructor(component: IButtonAreaComponent) {
    super(component);
    this._rootElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.ROOT);
    this._buttonSlotElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.BUTTON_SLOT) as HTMLSlotElement;
  }

  public get root(): HTMLElement {
    return this._rootElement;
  }

  public get unbounded(): boolean | undefined {
    return false;
  }

  public get disabled(): boolean | undefined {
    return this.buttonDisabled();
  }

  public buttonDisabled(): boolean {
    return this._buttonElement?.disabled ?? true;
  }

  public setDisabled(value: boolean): void {
    toggleClass(this._rootElement, value, BUTTON_AREA_CONSTANTS.classes.DISABLED);
    
    if (this._buttonElement) {
      this._buttonElement?.toggleAttribute(BUTTON_AREA_CONSTANTS.attributes.DISABLED, value);
    }
  }

  public addListener(type: string, listener: (event: Event) => void): void {
    this._rootElement.addEventListener(type, listener);
  }

  public removeListener(type: string, listener: (event: Event) => void): void {
    this._rootElement.removeEventListener(type, listener);
  }

  public addSlotChangeListener(listener: () => void): void {
    this._buttonSlotElement.addEventListener('slotchange', listener);
  }

  public removeSlotChangeListener(listener: () => void): void {
    this._buttonSlotElement.removeEventListener('slotchange', listener);
  }

  public startButtonObserver(callback: MutationCallback): void {
    if (this._buttonElement) {
      this._buttonObserver = new MutationObserver(callback);
      this._buttonObserver.observe(this._buttonElement, { attributeFilter: [BUTTON_AREA_CONSTANTS.attributes.DISABLED] });
    }
  }

  public stopButtonObserver(): void {
    if (this._buttonObserver) {
      this._buttonObserver.disconnect();
      this._buttonObserver = undefined;
    }
  }

  public detectSlottedButton(): void {
    this._buttonElement = this._buttonSlotElement.assignedElements()[0] as HTMLButtonElement | undefined;
  }

  public createRipple(): ForgeRipple {
    const adapter: ForgeRippleAdapter = {
      ...ForgeRipple.createAdapter(this),
      isSurfaceActive: () => this._rootElement.matches(':active') || (this._buttonElement?.matches(':active') ?? false),
      isSurfaceDisabled: () => this.disabled ?? true,
      isUnbounded: () => !!this.unbounded,
      registerInteractionHandler: (evtType, handler) => {
        if (this._isRootEvent(evtType)) {
          this._rootElement.addEventListener(evtType, handler, { passive: true });
        } else {
          this._buttonElement?.addEventListener(evtType, handler, { passive: true});
        }
      },
      deregisterInteractionHandler: (evtType, handler) => {
        if (this._isRootEvent(evtType)) {
          this._rootElement.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions);
        } else {
          this._buttonElement?.removeEventListener(evtType, handler, { passive: true } as AddEventListenerOptions);
        }
      },
      addClass: (className) => addClass(className, this._rootElement),
      removeClass: (className) => removeClass(className, this._rootElement),
      updateCssVariable: (varName, value) => this._rootElement.style.setProperty(varName, value)
    };
    return new ForgeRipple(this._rootElement, new ForgeRippleFoundation(adapter));
  }

  public userInteractionListener(): ReturnType<typeof userInteractionListener> {
    return userInteractionListener(this._rootElement);
  }

  private _isRootEvent(evtType: string): boolean {
    return ['touchstart', 'pointerdown', 'mousedown'].includes(evtType);
  }
}
