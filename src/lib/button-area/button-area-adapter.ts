import { getShadowElement, toggleClass } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter, createUserInteractionListener } from '../core';
import { FOCUS_INDICATOR_CONSTANTS, IFocusIndicatorComponent } from '../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer';
import { IButtonAreaComponent } from './button-area';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';

export interface IButtonAreaAdapter extends IBaseAdapter {
  destroy(): void;
  deferInitialization(listener: (evt?: PointerEvent) => void): void;
  setDisabled(value: boolean): void;
  addListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  removeListener(type: string, listener: (event: Event) => void, capture?: boolean): void;
  addButtonSlotListener(type: string, listener: (event: Event) => void): void;
  removeButtonSlotListener(type: string, listener: (event: Event) => void): void;
  addContentSlotListener(type: string, listener: (event: Event) => void): void;
  removeContentSlotListener(type: string, listener: (event: Event) => void): void;
  animateStateLayer(): void;
  startButtonObserver(callback: MutationCallback): void;
  stopButtonObserver(): void;
  detectSlottedButton(): void;
  buttonIsDisabled(): boolean;
  requestDisabledButtonFrame(): void;
}

export class ButtonAreaAdapter extends BaseAdapter<IButtonAreaComponent> implements IButtonAreaAdapter {
  private _rootElement: HTMLElement;
  private _buttonSlotElement: HTMLSlotElement;
  private _contentSlotElement: HTMLSlotElement;
  private _buttonElement?: HTMLButtonElement;
  private _buttonObserver?: MutationObserver;
  private _focusIndicatorElement: IFocusIndicatorComponent;
  private _stateLayerElement: IStateLayerComponent;
  private _destroyUserInteractionListener: (() => void) | undefined;
  private _destroyDeferListener: (() => void) | undefined;


  constructor(component: IButtonAreaComponent) {
    super(component);
    this._rootElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.ROOT);
    this._buttonSlotElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.BUTTON_SLOT) as HTMLSlotElement;
    this._contentSlotElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.CONTENT_SLOT) as HTMLSlotElement;
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_CONSTANTS.elementName) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public destroy(): void {
    if (typeof this._destroyUserInteractionListener === 'function') {
      this._destroyUserInteractionListener();
      this._destroyUserInteractionListener = undefined;
    }
    if (typeof this._destroyDeferListener === 'function') {
      this._destroyDeferListener();
      this._destroyDeferListener = undefined;
    }
  }

  public async deferInitialization(listener: (evt?: PointerEvent) => void): Promise<void> {
    if (!this._rootElement) {
      return;
    }
    const { userInteraction, destroy } = createUserInteractionListener(this._rootElement);
    this._destroyDeferListener = destroy;
    const evt = await userInteraction;
    listener(evt.type === 'pointerenter' ? evt as PointerEvent : undefined);
  }

  public get root(): HTMLElement {
    return this._rootElement;
  }

  public get unbounded(): boolean | undefined {
    return false;
  }

  public get disabled(): boolean | undefined {
    return this.buttonIsDisabled();
  }

  public setDisabled(value: boolean): void {
    toggleClass(this._rootElement, value, BUTTON_AREA_CONSTANTS.classes.DISABLED);
    this._buttonElement?.toggleAttribute(BUTTON_AREA_CONSTANTS.attributes.DISABLED, value);
    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }
  }

  public addListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    this._rootElement.addEventListener(type, listener, { capture });
  }

  public removeListener(type: string, listener: (event: Event) => void, capture?: boolean): void {
    this._rootElement.removeEventListener(type, listener, { capture });
  }

  public addButtonSlotListener(type: string, listener: (event: Event) => void): void {
    this._buttonSlotElement.addEventListener(type, listener);
  }

  public removeButtonSlotListener(type: string, listener: (event: Event) => void): void {
    this._buttonSlotElement.removeEventListener(type, listener);
  }

  public addContentSlotListener(type: string, listener: (event: Event) => void): void {
    this._contentSlotElement.addEventListener(type, listener);
  }

  public removeContentSlotListener(type: string, listener: (event: Event) => void): void {
    this._contentSlotElement.removeEventListener(type, listener);
  }

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
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

  public buttonIsDisabled(): boolean {
    return this._buttonElement?.disabled ?? true;
  }

  public requestDisabledButtonFrame(): void {
    if (this._buttonElement) {
      this._buttonElement.disabled = true;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      requestAnimationFrame(() => this._buttonElement!.disabled = false);
    }
  }
}
