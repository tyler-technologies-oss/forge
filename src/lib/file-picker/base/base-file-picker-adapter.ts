import { toggleAttribute } from '@tylertech/forge-core';
import { BaseAdapter, IBaseAdapter } from '../../core/base/base-adapter';
import { IBaseFilePicker } from './base-file-picker';
import { FilePickerDragEventName } from './base-file-picker-constants';

export interface IBaseFilePickerAdapter extends IBaseAdapter {
  initialize(): void;
  registerInputChangeListener(listener: EventListener): void;
  registerDragEventListener(name: FilePickerDragEventName, listener: EventListener): void;
  removeInputChangeListener(listener: EventListener): void;
  removeDragEventListener(name: string, listener: EventListener): void;
  setInputAttribute(name: string, value: string | boolean | null | undefined): void;
  setDisabled(value: boolean): void;
  setHighlightState(value: boolean): void;
}

export abstract class BaseFilePickerAdapter extends BaseAdapter<IBaseFilePicker> implements IBaseFilePickerAdapter {
  protected abstract _inputElement: HTMLInputElement;
  protected abstract _dropTargetElement: HTMLElement;
  protected abstract _clickTargetElement: HTMLElement;

  private _inputEventListener: EventListener = () => {
    this._inputElement.value = '';
    this._inputElement.click();
  };

  public initialize(): void {
    this._clickTargetElement.addEventListener('click', this._inputEventListener);
  }

  public registerInputChangeListener(listener: EventListener): void {
    this._inputElement.addEventListener('change', listener);
  }

  public registerDragEventListener(name: FilePickerDragEventName, listener: EventListener): void {
    this._dropTargetElement.addEventListener(name, listener);
  }

  public removeInputChangeListener(listener: EventListener): void {
    this._inputElement.removeEventListener('change', listener);
  }

  public removeDragEventListener(name: string, listener: EventListener): void {
    this._dropTargetElement.removeEventListener(name, listener);
  }

  public setInputAttribute(name: string, value: string | boolean | null | undefined): void {
    if (typeof value === 'boolean') {
      toggleAttribute(this._inputElement, value, name);
      return;
    }
    toggleAttribute(this._inputElement, value != null, name, value ?? '');
  }

  public setDisabled(value: boolean): void {
    if (value) {
      this._clickTargetElement.removeEventListener('click', this._inputEventListener);
    } else {
      this._clickTargetElement.addEventListener('click', this._inputEventListener);
    }
  }

  public abstract setHighlightState(value: boolean): void;
}
