import { getShadowElement } from '@tylertech/forge-core';

import { BaseAdapter, IBaseAdapter } from '../core';
import { FOCUS_INDICATOR_TAG_NAME, IFocusIndicatorComponent } from '../focus-indicator';
import { IStateLayerComponent, STATE_LAYER_CONSTANTS } from '../state-layer';
import { IButtonAreaComponent } from './button-area';
import { BUTTON_AREA_CONSTANTS } from './button-area-constants';

export interface IButtonAreaAdapter extends IBaseAdapter {
  setDisabled(value: boolean): void;
  addListener(type: string, listener: EventListener, capture?: boolean): void;
  removeListener(type: string, listener: EventListener, capture?: boolean): void;
  addButtonSlotListener(type: string, listener: EventListener): void;
  removeButtonSlotListener(type: string, listener: EventListener): void;
  addContentSlotListener(type: string, listener: EventListener): void;
  removeContentSlotListener(type: string, listener: EventListener): void;
  animateStateLayer(): void;
  startButtonObserver(callback: MutationCallback): void;
  stopButtonObserver(): void;
  detectSlottedButton(): void;
  isButtonDisabled(): boolean;
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

  constructor(component: IButtonAreaComponent) {
    super(component);
    this._rootElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.ROOT);
    this._buttonSlotElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.BUTTON_SLOT) as HTMLSlotElement;
    this._contentSlotElement = getShadowElement(component, BUTTON_AREA_CONSTANTS.selectors.CONTENT_SLOT) as HTMLSlotElement;
    this._focusIndicatorElement = getShadowElement(component, FOCUS_INDICATOR_TAG_NAME) as IFocusIndicatorComponent;
    this._stateLayerElement = getShadowElement(component, STATE_LAYER_CONSTANTS.elementName) as IStateLayerComponent;
  }

  public setDisabled(value: boolean): void {
    this._buttonElement?.toggleAttribute(BUTTON_AREA_CONSTANTS.attributes.DISABLED, value);
    if (value) {
      this._focusIndicatorElement.remove();
      this._stateLayerElement.remove();
    } else {
      this._rootElement.append(this._focusIndicatorElement, this._stateLayerElement);
    }
  }

  public addListener(type: string, listener: EventListener, capture?: boolean): void {
    this._rootElement.addEventListener(type, listener, { capture });
  }

  public removeListener(type: string, listener: EventListener, capture?: boolean): void {
    this._rootElement.removeEventListener(type, listener, { capture });
  }

  public addButtonSlotListener(type: string, listener: EventListener): void {
    this._buttonSlotElement.addEventListener(type, listener);
  }

  public removeButtonSlotListener(type: string, listener: EventListener): void {
    this._buttonSlotElement.removeEventListener(type, listener);
  }

  public addContentSlotListener(type: string, listener: EventListener): void {
    this._contentSlotElement.addEventListener(type, listener);
  }

  public removeContentSlotListener(type: string, listener: EventListener): void {
    this._contentSlotElement.removeEventListener(type, listener);
  }

  public animateStateLayer(): void {
    this._stateLayerElement.playAnimation();
  }

  public startButtonObserver(callback: MutationCallback): void {
    if (this._buttonElement) {
      this._buttonObserver = new MutationObserver(callback);
      this._buttonObserver.observe(this._buttonElement, {
        attributeFilter: [BUTTON_AREA_CONSTANTS.attributes.DISABLED]
      });
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

  public isButtonDisabled(): boolean {
    return this._buttonElement?.disabled ?? true;
  }

  public requestDisabledButtonFrame(): void {
    if (this._buttonElement) {
      this._buttonElement.disabled = true;
      requestAnimationFrame(() => {
        if (this._buttonElement) {
          this._buttonElement.disabled = false;
        }
      });
    }
  }
}
