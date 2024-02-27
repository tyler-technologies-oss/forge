import { getShadowElement } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { setDefaultAria } from '../constants';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { ICON_BUTTON_CONSTANTS } from '../icon-button/icon-button-constants';
import { RADIO_CONSTANTS } from '../radio/radio/radio-constants';
import { SWITCH_CONSTANTS } from '../switch/switch-constants';
import { IDialogComponent } from './dialog';

export interface IDialogAdapter extends IBaseAdapter {
  initialize(): void;
  show(): void;
  hide(): void;
  addDialogFormSubmitListener(listener: EventListener): void;
  removeDialogFormSubmitListener(listener: EventListener): void;
  addEscapeDismissListener(listener: EventListener): void;
  removeEscapeDismissListener(listener: EventListener): void;
  addBackdropDismissListener(listener: EventListener): void;
  removeBackdropDismissListener(listener: EventListener): void;
}

export class DialogAdapter extends BaseAdapter<IDialogComponent> implements IDialogAdapter {
  private _dialogElement: HTMLDialogElement;
  private _backdropElement: IBackdropComponent;

  constructor(component: IDialogComponent) {
    super(component);
    this._dialogElement = getShadowElement(component, 'dialog') as HTMLDialogElement;
    this._backdropElement = getShadowElement(component, 'forge-backdrop') as IBackdropComponent;
  }

  public initialize(): void {
    this._component[setDefaultAria]({
      role: 'dialog',
      ariaModal: 'true' // TODO: set via `mode` attribute
    });
  }

  public show(): void {
    // this._backdropElement.fadeIn();
    this._backdropElement.setAttribute('state', 'enter');
    this._dialogElement.showModal();
  }

  public hide(): void {
    this._backdropElement.removeAttribute('state');
    this._dialogElement.close();
  }

  public addDialogFormSubmitListener(listener: EventListener): void {
    this._dialogElement.addEventListener('submit', listener);
  }

  public removeDialogFormSubmitListener(listener: EventListener): void {
    this._dialogElement.removeEventListener('submit', listener);
  }

  public addEscapeDismissListener(listener: EventListener): void {
    this._dialogElement.addEventListener('cancel', listener);
  }

  public removeEscapeDismissListener(listener: EventListener): void {
    this._dialogElement.removeEventListener('cancel', listener);
  }

  public addBackdropDismissListener(listener: EventListener): void {
    this._backdropElement.addEventListener('click', listener);
  }

  public removeBackdropDismissListener(listener: EventListener): void {
    this._backdropElement.removeEventListener('click', listener);
  }
}
