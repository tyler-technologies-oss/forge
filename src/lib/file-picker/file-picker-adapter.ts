import { getShadowElement } from '@tylertech/forge-core';
import { BUTTON_CONSTANTS, IButtonComponent } from '../button';
import { BaseFilePickerAdapter, IBaseFilePickerAdapter } from './base';
import { IFilePickerComponent } from './file-picker';
import { FILE_PICKER_CONSTANTS } from './file-picker-constants';

export interface IFilePickerAdapter extends IBaseFilePickerAdapter {
  registerButtonSlotListener(listener: EventListener): void;
  initializeButton(): void;
  setCompact(value: boolean): void;
  setBorderless(value: boolean): void;
}

export class FilePickerAdapter extends BaseFilePickerAdapter implements IFilePickerAdapter {
  private _container: HTMLElement;
  private _buttonSlot: HTMLSlotElement;
  private _button: IButtonComponent | undefined;

  protected _inputElement: HTMLInputElement;
  protected _dropTargetElement: HTMLElement;
  protected _clickTargetElement: HTMLElement;

  constructor(component: IFilePickerComponent) {
    super(component);
    this._container = getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.CONTAINER);
    this._inputElement = getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.INPUT) as HTMLInputElement;
    this._dropTargetElement = this._container;
    this._clickTargetElement = this._container;
    this._buttonSlot = getShadowElement(component, FILE_PICKER_CONSTANTS.selectors.BUTTON_SLOT) as HTMLSlotElement;
  }

  public initializeButton(): void {
    const button = this._component.querySelector(BUTTON_CONSTANTS.elementName) as IButtonComponent;
    this._button = button || undefined;
  }

  public registerButtonSlotListener(listener: EventListener): void {
    this._buttonSlot.addEventListener('slotchange', listener);
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
   * Sets the disabled state of the file picker.
   * @param value The disabled state.
   */
  public override setDisabled(value: boolean): void {
    super.setDisabled(value);
    if (value) {
      this._button?.setAttribute('disabled', '');
      this._container.setAttribute('disabled', '');
    } else {
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
