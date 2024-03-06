import { getShadowElement } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { setDefaultAria } from '../constants';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { IDialogComponent } from './dialog';
import { DialogMode, DialogType, DIALOG_CONSTANTS } from './dialog-constants';

export interface IDialogAdapter extends IBaseAdapter {
  show(): void;
  hide(): Promise<void>;
  addDialogFormSubmitListener(listener: EventListener): void;
  removeDialogFormSubmitListener(listener: EventListener): void;
  addEscapeDismissListener(listener: EventListener): void;
  removeEscapeDismissListener(listener: EventListener): void;
  addBackdropDismissListener(listener: EventListener): void;
  removeBackdropDismissListener(listener: EventListener): void;
  tryAutofocus(): void;
}

export class DialogAdapter extends BaseAdapter<IDialogComponent> implements IDialogAdapter {
  private _dialogElement: HTMLDialogElement;
  private _surfaceElement: HTMLDivElement;
  private _backdropElement: IBackdropComponent;

  constructor(component: IDialogComponent) {
    super(component);
    this._dialogElement = getShadowElement(component, 'dialog') as HTMLDialogElement;
    this._backdropElement = getShadowElement(component, 'forge-backdrop') as IBackdropComponent;
    this._surfaceElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
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

  public show(): void {
    this._component[setDefaultAria]({
      role: this._component.type,
      ariaModal: this._component.mode === 'modal' ? 'true' : 'false'
    }, { setAttribute: true });

    this._backdropElement.fadeIn();

    if (this._component.mode === 'modal') {
      this._dialogElement.showModal();
    } else {
      this._dialogElement.show();
    }
  }

  public hide(): Promise<void> {
    this._component[setDefaultAria]({
      role: null,
      ariaModal: null
    }, { setAttribute: true });

    return new Promise<void>(resolve => {
      this._surfaceElement.addEventListener('animationend', () => {
        this._surfaceElement.classList.remove(BACKDROP_CONSTANTS.classes.EXITING);
        this._dialogElement.close();
        resolve();
      }, { once: true });
      this._backdropElement.fadeOut();
      this._surfaceElement.classList.add(BACKDROP_CONSTANTS.classes.EXITING);
    });
  }

  public tryAutofocus(): void {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (this._component.open && this._dialogElement.isConnected && !this._component.matches(':focus-within')) {
          const autofocusElement = this._component.querySelector<HTMLElement>('[autofocus]');
          autofocusElement?.focus();
        }
      });
    });
  }
}
