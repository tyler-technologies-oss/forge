import { BaseFilePickerCore, IBaseFilePickerCore } from './base';
import { IFilePickerAdapter } from './file-picker-adapter';
import { FILE_PICKER_CONSTANTS } from './file-picker-constants';

export interface IFilePickerCore extends IBaseFilePickerCore {
  compact: boolean;
  borderless: boolean;
}

export class FilePickerCore extends BaseFilePickerCore<IFilePickerAdapter> implements IFilePickerCore {
  private _compact = false;
  private _borderless = false;
  private _buttonSlotListener = this._onButtonSlotChanged.bind(this);

  protected _errorEventName = FILE_PICKER_CONSTANTS.events.ERROR;

  constructor(protected _adapter: IFilePickerAdapter) {
    super(_adapter);
    this._useDragAndDrop = !this._compact;
    this._adapter.registerButtonSlotListener(this._buttonSlotListener);
  }

  public override initialize(): void {
    this._adapter.initializeButton();
    super.initialize();
  }

  private _onButtonSlotChanged(evt: Event): void {
    this._adapter.initializeButton();
  }

  /** Get and set whether the file picker is compact */
  public get compact(): boolean {
    return this._compact;
  }
  public set compact(value: boolean) {
    if (this._compact !== value) {
      this._compact = value;
      this._adapter.setCompact(value);
      if (value) {
        this._removeDragListeners();
      } else {
        this._registerDragListeners();
      }
      this._adapter.toggleHostAttribute(FILE_PICKER_CONSTANTS.attributes.COMPACT, value);
    }
  }

  /** Get and set whether the file picker is borderless */
  public get borderless(): boolean {
    return this._borderless;
  }
  public set borderless(value: boolean) {
    if (this._borderless !== value) {
      this._borderless = value;
      this._adapter.setBorderless(value);
      this._adapter.toggleHostAttribute(FILE_PICKER_CONSTANTS.attributes.BORDERLESS, value);
    }
  }
}
