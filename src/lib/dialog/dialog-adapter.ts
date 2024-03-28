import { getShadowElement } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { setDefaultAria } from '../constants';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { DialogComponent, IDialogComponent } from './dialog';
import { dialogStack, DIALOG_CONSTANTS, hideBackdrop, showBackdrop } from './dialog-constants';

export interface IDialogAdapter extends IBaseAdapter {
  readonly hostElement: IDialogComponent;
  readonly moveHandleElement: HTMLElement;
  readonly surfaceElement: HTMLElement;
  triggerElement: HTMLElement | null;
  show(): void;
  hide(): Promise<void>;
  addDialogFormSubmitListener(listener: EventListener): void;
  removeDialogFormSubmitListener(listener: EventListener): void;
  addEscapeDismissListener(listener: EventListener): void;
  removeEscapeDismissListener(listener: EventListener): void;
  addBackdropDismissListener(listener: EventListener): void;
  removeBackdropDismissListener(listener: EventListener): void;
  tryAutofocus(): void;
  tryLocateTriggerElement(id: string | null): void;
  addTriggerInteractionListener(listener: EventListener): void;
  removeTriggerInteractionListener(listener: EventListener): void;
  hideBackdrop(): void;
  showBackdrop(): void;
  addSurfaceClass(className: string): void;
  removeSurfaceClass(className: string): void;
}

export class DialogAdapter extends BaseAdapter<IDialogComponent> implements IDialogAdapter {
  private _dialogElement: HTMLDialogElement;
  private _surfaceElement: HTMLDivElement;
  private _backdropElement: IBackdropComponent;
  private _moveHandleElement: HTMLElement;

  public triggerElement: HTMLElement | null;

  public get moveHandleElement(): HTMLElement {
    return this._moveHandleElement;
  }

  public get surfaceElement(): HTMLElement {
    return this._surfaceElement;
  }

  constructor(component: IDialogComponent) {
    super(component);
    this._dialogElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.DIALOG) as HTMLDialogElement;
    this._backdropElement = getShadowElement(component, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
    this._surfaceElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
    this._moveHandleElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.MOVE_HANDLE) as HTMLElement;
  }

  public show(): void {
    this._component[setDefaultAria]({
      role: this._component.type,
      ariaModal: this._component.mode === 'modal' ? 'true' : 'false'
    }, { setAttribute: true });
    
    // Show the dialog (and backdrop) based on modal vs non-modal
    if (this._component.mode === 'modal') {
      if (this._component.animationType === 'none') {
        this._backdropElement.show();
      } else {
        this._backdropElement.fadeIn();
      }
      this._dialogElement.showModal();
    } else {
      this._dialogElement.show();
    }

    if (this._component.mode === 'modal') {
      this._hideBackdrops();
    }

    DialogComponent[dialogStack].add(this._component);
  }

  private _hideBackdrops(): void {
    DialogComponent[dialogStack].forEach(dialog => dialog[hideBackdrop]());
  }

  private _showBackdropMostRecent(): void {
    Array.from(DialogComponent[dialogStack]).filter(dialog => dialog.mode === 'modal').at(-1)?.[showBackdrop]();
  }

  public hide(): Promise<void> {
    this._component[setDefaultAria]({
      role: null,
      ariaModal: null
    }, { setAttribute: true });

    // If the dialog is not animatable, close it immediately
    if (this._component.animationType === 'none') {
      this._dialogElement.close();
      this._backdropElement.hide();
      DialogComponent[dialogStack].delete(this._component);
      this._showBackdropMostRecent();
      return Promise.resolve();
    }

    return new Promise<void>(resolve => {
      // Listen for the end of the exit animation and cleanup after
      this._surfaceElement.addEventListener('animationend', () => {
        this._surfaceElement.classList.remove(BACKDROP_CONSTANTS.classes.EXITING);
        this._dialogElement.close();
        DialogComponent[dialogStack].delete(this._component);
        this._showBackdropMostRecent();
        resolve();
      }, { once: true });

      // Hide the backdrop
      if (this._component.animationType === 'none') {
        this._backdropElement.hide();
      } else {
        this._backdropElement.fadeOut();
      }

      // Trigger the exit animation
      this._surfaceElement.classList.add(BACKDROP_CONSTANTS.classes.EXITING);
    });
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

  public tryLocateTriggerElement(id: string | null): void {
    if (!id) {
      this.triggerElement = null;
      return;
    }
    const rootNode = this._component.getRootNode() as Document | ShadowRoot;
    this.triggerElement = rootNode.querySelector<HTMLElement>(`#${id}`);
  }

  public addTriggerInteractionListener(listener: EventListener): void {
    this.triggerElement?.addEventListener('click', listener);
  }

  public removeTriggerInteractionListener(listener: EventListener): void {
    this.triggerElement?.removeEventListener('click', listener);
  }

  public hideBackdrop(): void {
    this._backdropElement.hide();
  }

  public showBackdrop(): void {
    this._backdropElement.show();
  }

  public addSurfaceClass(className: string): void {
    this._surfaceElement.classList.add(className);
  }

  public removeSurfaceClass(className: string): void {
    this._surfaceElement.classList.remove(className);
  }
}
