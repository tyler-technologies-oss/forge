import { ICustomElementFoundation } from '@tylertech/forge-core';

import { IFilePickerAdapter } from './file-picker-adapter';
import { FILE_PICKER_CONSTANTS, IFilePickerChangeEventData } from './file-picker-constants';

export interface IFilePickerFoundation extends ICustomElementFoundation {
  accept: string | null;
  maxSize: number | null;
  capture: string | null;
  multiple: boolean;
  disabled: boolean;
  compact: boolean;
  borderless: boolean;
}

export class FilePickerFoundation implements IFilePickerFoundation {
  private _accept: string | null = null;
  private _maxSize: number | null = null;
  private _capture: string | null = null;
  private _multiple = false;
  private _disabled = false;
  private _compact = false;
  private _borderless = false;
  private _buttonSlotListener: (evt: Event) => void;
  private _inputChangeListener: (evt: Event) => void;
  private _dragEnterListener: (evt: DragEvent) => void;
  private _dragLeaveListener: (evt: DragEvent) => void;
  private _dragOverListener: (evt: DragEvent) => void;
  private _dropListener: (evt: DragEvent) => void;

  constructor(private _adapter: IFilePickerAdapter) {
    this._buttonSlotListener = evt => this._onButtonSlotChanged(evt);
    this._inputChangeListener = evt => this._onInputChange(evt);
    this._dragEnterListener = evt => this._onDragEnter(evt);
    this._dragLeaveListener = evt => this._onDragLeave(evt);
    this._dragOverListener = evt => this._onDragOver(evt);
    this._dropListener = evt => this._onDrop(evt);

    this._adapter.registerButtonSlotListener(this._buttonSlotListener);
    this._adapter.registerInputChangeListener(this._inputChangeListener);
    if (!this._compact) {
      this._registerDragListeners();
    }
  }

  public initialize(): void {
    this._adapter.initializeButton();
  }

  private _onButtonSlotChanged(evt: Event): void {
    this._adapter.initializeButton();
  }

  private _onInputChange(evt: Event): void {
    const files = (evt.target as HTMLInputElement).files;
    if (files) {
      this._handleFiles(files);
    }
  }

  private _onDragEnter(evt: DragEvent): void {
    this._handleDragEvent(evt, true);
  }

  private _onDragLeave(evt: DragEvent): void {
    this._handleDragEvent(evt, false);
  }

  private _onDragOver(evt: DragEvent): void {
    this._handleDragEvent(evt, true);
  }

  private _onDrop(evt: DragEvent): void {
    this._handleDragEvent(evt, false);

    if (!this._disabled) {
      const dataTransfer = evt.dataTransfer;
      if (dataTransfer) {
        const files = dataTransfer.files;
        this._handleFiles(files);
      }
    }
  }

  private _registerDragListeners(): void {
    this._adapter.registerDragEnterListener(this._dragEnterListener);
    this._adapter.registerDragLeaveListener(this._dragLeaveListener);
    this._adapter.registerDragOverListener(this._dragOverListener);
    this._adapter.registerDropListener(this._dropListener);
  }

  private _removeDragListeners(): void {
    this._adapter.removeDragEnterListener(this._dragEnterListener);
    this._adapter.removeDragLeaveListener(this._dragLeaveListener);
    this._adapter.removeDragOverListener(this._dragOverListener);
    this._adapter.removeDropListener(this._dropListener);
  }

  private _handleFiles(fileList: FileList): void {
    let data: IFilePickerChangeEventData = {};
    if (fileList) {
      const sortedFiles = this._sortFiles(fileList);
      let files = sortedFiles.legalFiles || null;

      // Ensure that we can only drop 1 file if not in multiple mode
      if (!this._multiple && files && files.length > 1) {
        files = files.splice(1);
      }

      data = sortedFiles;
    }
    this._adapter.emitHostEvent(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, data);
  }

  private _sortFiles(files: FileList): IFilePickerChangeEventData {
    let legalFiles: File[] = [];
    const illegalFiles: File[] = [];

    if (!this._accept && !this.maxSize) {
      legalFiles = Array.from(files);
      return { legalFiles, illegalFiles };
    }

    const formats = this._accept ? this._accept.split(',').map(f => f.trim().toLowerCase()) : [''];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < files.length; i++) {
      if (!formats.some(f => {
        return files[i].type.toLowerCase().match(f) || files[i].name.toLowerCase().match('\\' + f);
      }) || (this._maxSize && files[i].size > this._maxSize)) {
        illegalFiles.push(files[i]);
      } else {
        legalFiles.push(files[i]);
      }
    }

    return { legalFiles, illegalFiles };
  }

  private _handleDragEvent(evt: DragEvent, isOverTarget: boolean): void {
    if (!this._disabled) {
      evt.preventDefault();
      evt.stopPropagation();
      this._adapter.setHighlightState(isOverTarget);
    }
  }

  /** Get and set the allowed file types */
  public get accept(): string | null {
    return this._accept;
  }
  public set accept(value: string | null) {
    if (this._accept !== value) {
      this._accept = value;
      this._adapter.setAccept(value);
      if (value) {
        this._adapter.setHostAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT, value);
      } else {
        this._adapter.removeHostAttribute(FILE_PICKER_CONSTANTS.attributes.ACCEPT);
      }
    }
  }

  /** Get and set the maximum allowed file size */
  public get maxSize(): number | null {
    return this._maxSize;
  }
  public set maxSize(value: number | null) {
    if (this._maxSize !== value) {
      this._maxSize = value;
      if (value) {
        this._adapter.setHostAttribute(FILE_PICKER_CONSTANTS.attributes.MAX_SIZE, value.toString());
      } else {
        this._adapter.removeHostAttribute(FILE_PICKER_CONSTANTS.attributes.MAX_SIZE);
      }
    }
  }

  /** Get and set the camera to use when capturing video or images */
  public get capture(): string | null {
    return this._capture;
  }
  public set capture(value: string | null) {
    if (this._capture !== value) {
      this._capture = value;
      this._adapter.setCapture(value);
      if (value) {
        this._adapter.setHostAttribute(FILE_PICKER_CONSTANTS.attributes.CAPTURE, value);
      } else {
        this._adapter.removeHostAttribute(FILE_PICKER_CONSTANTS.attributes.CAPTURE);
      }
    }
  }

  /** Get and set whether multiple files are allowed */
  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    if (this._multiple !== value) {
      this._multiple = value;
      this._adapter.setMultiple(value);
      if (value) {
        this._adapter.setHostAttribute(FILE_PICKER_CONSTANTS.attributes.MULTIPLE);
      } else {
        this._adapter.removeHostAttribute(FILE_PICKER_CONSTANTS.attributes.MULTIPLE);
      }
    }
  }

  /** Get and set whether the file picker is disabled */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._adapter.setDisabled(value);
      if (value) {
        this._adapter.setHostAttribute(FILE_PICKER_CONSTANTS.attributes.DISABLED);
      } else {
        this._adapter.removeHostAttribute(FILE_PICKER_CONSTANTS.attributes.DISABLED);
      }
    }
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
        this._adapter.setHostAttribute(FILE_PICKER_CONSTANTS.attributes.COMPACT);
        this._removeDragListeners();
      } else {
        this._adapter.removeHostAttribute(FILE_PICKER_CONSTANTS.attributes.COMPACT);
        this._registerDragListeners();
      }
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
      if (value) {
        this._adapter.setHostAttribute(FILE_PICKER_CONSTANTS.attributes.BORDERLESS);
      } else {
        this._adapter.removeHostAttribute(FILE_PICKER_CONSTANTS.attributes.BORDERLESS);
      }
    }
  }
}
