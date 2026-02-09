import { getShadowElement } from '@tylertech/forge-core';

import { IFilePickerComponent } from './file-picker.js';
import { FILE_PICKER_CONSTANTS } from './file-picker-constants.js';
import { BaseAdapter, IBaseAdapter } from '../core/index.js';
import { IButtonComponent } from '../button/index.js';

export interface IFilePickerAdapter extends IBaseAdapter {
  destroy(): void;
  registerButtonSlotListener(listener: (evt: Event) => void): void;
  registerInputChangeListener(listener: (evt: Event) => void): void;
  registerDragEnterListener(listener: (evt: DragEvent) => void): void;
  registerDragLeaveListener(listener: (evt: DragEvent) => void): void;
  registerDragOverListener(listener: (evt: DragEvent) => void): void;
  registerDropListener(listener: (evt: DragEvent) => void): void;
  removeDragEnterListener(listener: (evt: DragEvent) => void): void;
  removeDragLeaveListener(listener: (evt: DragEvent) => void): void;
  removeDragOverListener(listener: (evt: DragEvent) => void): void;
  removeDropListener(listener: (evt: DragEvent) => void): void;
  initializeButton(): void;
  setHighlightState(value: boolean): void;
  setAccept(value: string | null | undefined): void;
  setCapture(value: string | null | undefined): void;
  setMultiple(value: boolean): void;
  setDisabled(value: boolean): void;
  setCompact(value: boolean): void;
  setBorderless(value: boolean): void;
}

export class FilePickerAdapter extends BaseAdapter<IFilePickerComponent> implements IFilePickerAdapter {
  private _container: HTMLElement;
  private _buttonSlot: HTMLSlotElement;
  private _button: IButtonComponent | undefined;
  private _input: HTMLInputElement;
  private _inputEventListener: EventListener | undefined;

  constructor(component: IFilePickerComponent) {
    super(component);

    this._container = getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.CONTAINER);
    this._buttonSlot = getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.BUTTON_SLOT) as HTMLSlotElement;
    this._input = getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;

    this._inputEventListener = () => {
      this._input.value = '';
      this._input.click();
    };

    this._container.addEventListener('click', this._inputEventListener);
  }

  public destroy(): void {
    if (this._inputEventListener) {
      this._container.removeEventListener('click', this._inputEventListener);
      this._inputEventListener = undefined;
    }
  }

  public registerButtonSlotListener(listener: (evt: Event) => void): void {
    this._buttonSlot.addEventListener('slotchange', listener);
  }

  public registerInputChangeListener(listener: (evt: Event) => void): void {
    this._input.addEventListener('change', listener);
  }

  public registerDragEnterListener(listener: (evt: DragEvent) => void): void {
    this._container.addEventListener('dragenter', listener);
  }

  public registerDragLeaveListener(listener: (evt: DragEvent) => void): void {
    this._container.addEventListener('dragleave', listener);
  }

  public registerDragOverListener(listener: (evt: DragEvent) => void): void {
    this._container.addEventListener('dragover', listener);
  }

  public registerDropListener(listener: (evt: DragEvent) => void): void {
    this._container.addEventListener('drop', listener);
  }

  public removeDragEnterListener(listener: (evt: DragEvent) => void): void {
    this._container.removeEventListener('dragenter', listener);
  }

  public removeDragLeaveListener(listener: (evt: DragEvent) => void): void {
    this._container.removeEventListener('dragleave', listener);
  }

  public removeDragOverListener(listener: (evt: DragEvent) => void): void {
    this._container.removeEventListener('dragover', listener);
  }

  public removeDropListener(listener: (evt: DragEvent) => void): void {
    this._container.removeEventListener('drop', listener);
  }

  public initializeButton(): void {
    const button = this._component.querySelector('forge-button') as IButtonComponent;
    this._button = button || undefined;
  }

  /**
   * Sets the highlight state of the file picker.
   * @param value True if the highlight should be applied and false if not.
   */
  public setHighlightState(value: boolean): void {
    if (this._container.classList.contains(FILE_PICKER_CONSTANTS.classes.HIGHLIGHT) !== value) {
      this._container.classList.toggle(FILE_PICKER_CONSTANTS.classes.HIGHLIGHT);
    }
  }

  /**
   * Sets the accept attribute of the input.
   * @param value The accept string.
   */
  public setAccept(value: string | null | undefined): void {
    if (value) {
      this._input.setAttribute('accept', value);
    } else {
      this._input.removeAttribute('accept');
    }
  }

  /**
   * Sets the capture attribute of the input.
   * @param value The capture string.
   */
  public setCapture(value: string | null | undefined): void {
    if (value) {
      this._input.setAttribute('capture', value);
    } else {
      this._input.removeAttribute('capture');
    }
  }

  /**
   * Sets the multiple attribute of the input.
   * @param value The multiple state.
   */
  public setMultiple(value: boolean): void {
    if (value) {
      this._input.setAttribute('multiple', '');
    } else {
      this._input.removeAttribute('multiple');
    }
  }

  /**
   * Sets the disabled state of the file picker.
   * @param value The disabled state.
   */
  public setDisabled(value: boolean): void {
    if (value) {
      this._container.removeEventListener('click', this._inputEventListener as EventListener);
      this._button?.setAttribute('disabled', '');
      this._container.setAttribute('disabled', '');
    } else {
      this._container.addEventListener('click', this._inputEventListener as EventListener);
      this._button?.removeAttribute('disabled');
      this._container.removeAttribute('disabled');
    }
  }

  /**
   * Sets the compact state of the file picker.
   * @param value The compact state.
   */
  public setCompact(value: boolean): void {
    if (this._container.classList.contains(FILE_PICKER_CONSTANTS.classes.COMPACT) !== value) {
      this._container.classList.toggle(FILE_PICKER_CONSTANTS.classes.COMPACT);
    }
  }

  /**
   * Sets the borderless state of the file picker.
   * @param value The borderless state.
   */
  public setBorderless(value: boolean): void {
    if (this._container.classList.contains(FILE_PICKER_CONSTANTS.classes.BORDERLESS) !== value) {
      this._container.classList.toggle(FILE_PICKER_CONSTANTS.classes.BORDERLESS);
    }
  }
}
