import { ISelectDropdownAdapter } from './select-dropdown-adapter';
import { BaseSelectCore, IBaseSelectCore } from '../core/base-select-core';
import { SELECT_DROPDOWN_CONSTANTS } from './select-dropdown-constants';

export interface ISelectDropdownCore extends IBaseSelectCore {
  target: string;
  selectedTextTarget: string;
  syncSelectedText: boolean;
}

export class SelectDropdownCore extends BaseSelectCore<ISelectDropdownAdapter> implements ISelectDropdownCore {
  private _target: string;
  private _selectedTextTarget: string;
  private _syncSelectedText = false;
  private _originalTargetText = '';
  private _targetDisconnectedListener: () => void;
  private _targetDisconnectedDestructor: () => void;

  constructor(adapter: ISelectDropdownAdapter) {
    super(adapter);
    this._targetDisconnectedListener = () => this._onTargetDisconnected();
  }

  public initialize(): void {
    this._tryAttach();
    super.initialize();
  }

  public destroy(): void {
    super.destroy();
    if (this._adapter.isAttached()) {
      this._detach();
    }
  }

  protected _onDropdownScrollEnd(): void {
    this._adapter.emitHostEvent(SELECT_DROPDOWN_CONSTANTS.events.SCROLLED_BOTTOM);
  }

  protected _applyValue(value: string | string[]): void {
    super._applyValue(value);
    this._applySelection();
  }

  protected _applySelection(): void {
    super._applySelection();
    if (this._syncSelectedText || typeof this._selectedTextBuilder === 'function') {
      let text = this._getSelectedText();
      if (!text) {
        text = this._originalTargetText;
      }
      this._adapter.setTargetText(text || '', this._selectedTextTarget);
    }
  }

  private _tryAttach(): void {
    this._adapter.attach(this._target);
    if (this._adapter.isAttached()) {
      this._targetDisconnectedDestructor = this._adapter.setTargetDisconnectedListener(this._targetDisconnectedListener);
      this._originalTargetText = this._adapter.getTargetText(this._selectedTextTarget);
      this.initializeTarget();
    }
  }

  private _detach(): void {
    this._adapter.detach();
    if (this._targetDisconnectedDestructor) {
      this._targetDisconnectedDestructor();
      this._targetDisconnectedDestructor = undefined as any;
    }
  }

  private _onTargetDisconnected(): void {
    this._adapter.detach();
  }

  public get target(): string {
    return this._target;
  }
  public set target(value: string) {
    if (this._target !== value) {
      this._target = value;
      if (this._adapter.isAttached()) {
        this._detach();
      }
      this._tryAttach();
    }
  }

  public get selectedTextTarget(): string {
    return this._selectedTextTarget;
  }
  public set selectedTextTarget(value: string) {
    if (this._selectedTextTarget !== value) {
      this._selectedTextTarget = value;
    }
  }

  public get syncSelectedText(): boolean {
    return this._syncSelectedText;
  }
  public set syncSelectedText(value: boolean) {
    if (this._syncSelectedText !== value) {
      this._syncSelectedText = value;
    }
  }
}
