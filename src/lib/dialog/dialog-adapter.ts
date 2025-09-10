import { getShadowElement, playKeyframeAnimation } from '@tylertech/forge-core';
import { BACKDROP_CONSTANTS, IBackdropComponent } from '../backdrop';
import { BaseAdapter, IBaseAdapter } from '../core/base/base-adapter';
import { DialogComponent, IDialogComponent } from './dialog';
import { DIALOG_CONSTANTS, dialogStack, hideBackdrop, showBackdrop } from './dialog-constants';

export interface IDialogAdapter extends IBaseAdapter<IDialogComponent> {
  readonly hostElement: IDialogComponent;
  readonly moveHandleElement: HTMLElement;
  readonly surfaceElement: HTMLElement;
  triggerElement: HTMLElement | null;
  destroy(): void;
  show(): void;
  hide(): Promise<void>;
  addDialogFormSubmitListener(listener: EventListener): void;
  removeDialogFormSubmitListener(listener: EventListener): void;
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
  resetSurfacePosition(): void;
  addFullscreenListener(breakpoint: number, listener: (value: boolean) => void): void;
  removeFullscreenListener(listener: (value: boolean) => void): void;
  setAccessibleLabel(label: string): void;
  setAccessibleDescription(description: string): void;
  isDialogCompletelyOffScreen(): boolean;
}

export class DialogAdapter extends BaseAdapter<IDialogComponent> implements IDialogAdapter {
  private _dialogElement: HTMLDialogElement;
  private _surfaceElement: HTMLDivElement;
  private _backdropElement: IBackdropComponent;
  private _moveHandleElement: HTMLElement;
  private _fullscreenMediaQuery: MediaQueryList | undefined;
  private _accessibleLabelElement: HTMLElement;
  private _accessibleDescriptionElement: HTMLElement;

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
    this._accessibleLabelElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.ACCESSIBLE_LABEL) as HTMLElement;
    this._accessibleDescriptionElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.ACCESSIBLE_DESCRIPTION) as HTMLElement;
    this._surfaceElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.SURFACE) as HTMLDivElement;
    this._moveHandleElement = getShadowElement(component, DIALOG_CONSTANTS.selectors.MOVE_HANDLE) as HTMLElement;

    this._backdropElement = getShadowElement(component, BACKDROP_CONSTANTS.elementName) as IBackdropComponent;
    if (!this._backdropElement.shadowRoot) {
      window.customElements.upgrade(this._backdropElement);
    }
  }

  public destroy(): void {
    this._forceClose();
  }

  public show(): void {
    /* c8 ignore next 3 */
    if (this._dialogElement.open) {
      return;
    }

    if (this._component.type !== 'dialog') {
      this._dialogElement.setAttribute('role', this._component.type);
    }

    const isModal = this._component.mode === 'modal' || this._component.mode === 'inline-modal';

    if (!isModal) {
      this._dialogElement.setAttribute('aria-modal', 'false');
    }

    // Show the dialog (and backdrop) based on modal vs non-modal
    if (isModal) {
      if (this._component.animationType === 'none') {
        this._backdropElement.show();
      } else {
        this._backdropElement.fadeIn();
      }
    }

    if (this._component.mode === 'modal') {
      this._dialogElement.showModal();
    } else {
      this._dialogElement.show();
    }

    if (isModal) {
      this._hideBackdrops();
    }

    DialogComponent[dialogStack].add(this._component);
  }

  private _hideBackdrops(): void {
    DialogComponent[dialogStack].forEach(dialog => dialog[hideBackdrop]());
  }

  private _showBackdropMostRecent(): void {
    Array.from(DialogComponent[dialogStack])
      .filter(dialog => dialog.mode === 'modal' || dialog.mode === 'inline-modal')
      .at(-1)
      ?.[showBackdrop]();
  }

  public async hide(): Promise<void> {
    if (this._component.animationType === 'none') {
      this._forceClose();
      return Promise.resolve();
    }

    this._backdropElement.fadeOut();
    await playKeyframeAnimation(this._surfaceElement, BACKDROP_CONSTANTS.classes.EXITING);
    this._forceClose();
  }

  public addDialogFormSubmitListener(listener: EventListener): void {
    this._dialogElement.addEventListener('submit', listener);
  }

  public removeDialogFormSubmitListener(listener: EventListener): void {
    this._dialogElement.removeEventListener('submit', listener);
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
        const alreadyHasFocus = this._component.matches(':focus-within');
        if (!alreadyHasFocus) {
          if (this._component.mode === 'modal') {
            this._dialogElement.focus();
          }

          if (this._component.open && this._dialogElement.isConnected) {
            const autofocusElement = this._component.querySelector<HTMLElement>(DIALOG_CONSTANTS.selectors.AUTOFOCUS);
            autofocusElement?.focus();
          }
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
    this._backdropElement.fadeOut();
  }

  public showBackdrop(): void {
    this._backdropElement.fadeIn();
  }

  public addSurfaceClass(className: string): void {
    this._surfaceElement.classList.add(className);
  }

  public removeSurfaceClass(className: string): void {
    this._surfaceElement.classList.remove(className);
  }

  public resetSurfacePosition(): void {
    this._surfaceElement.style.left = '';
    this._surfaceElement.style.top = '';
    this.removeSurfaceClass(DIALOG_CONSTANTS.classes.MOVED);
  }

  public addFullscreenListener(breakpoint: number, listener: (value: boolean) => void): void {
    this._fullscreenMediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    this._fullscreenMediaQuery.addEventListener('change', event => listener(event.matches));

    if (!this._component.fullscreen && this._fullscreenMediaQuery.matches) {
      listener(true);
    }
  }

  public removeFullscreenListener(listener: (value: boolean) => void): void {
    this._fullscreenMediaQuery?.removeEventListener('change', event => listener(event.matches));
    this._fullscreenMediaQuery = undefined;
  }

  public setAccessibleLabel(label: string): void {
    this._accessibleLabelElement.textContent = label;
  }

  public setAccessibleDescription(description: string): void {
    this._accessibleDescriptionElement.textContent = description;
  }

  public isDialogCompletelyOffScreen(): boolean {
    if (!this._surfaceElement) {
      return false;
    }

    const rect = this._surfaceElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return rect.right <= 0 || rect.left >= viewportWidth || rect.bottom <= 0 || rect.top >= viewportHeight;
  }

  private _forceClose(): void {
    this._surfaceElement.classList.remove(BACKDROP_CONSTANTS.classes.EXITING);
    this._dialogElement.close();
    DialogComponent[dialogStack].delete(this._component);
    this._showBackdropMostRecent();
  }
}
