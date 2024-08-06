import { FILE_PICKER_CONSTANTS } from '../file-picker-constants';
import { IBaseFilePickerAdapter } from './base-file-picker-adapter';
import { BASE_FILE_PICKER_CONSTANTS } from './base-file-picker-constants';

export interface IBaseFilePickerCore {
  value: string;
  files: File[] | null | undefined;
  accept: string | null | undefined;
  maxSize: number | null | undefined;
  capture: string | null | undefined;
  multiple: boolean;
  disabled: boolean;
}

export abstract class BaseFilePickerCore<T extends IBaseFilePickerAdapter> implements IBaseFilePickerCore {
  protected _files: File[] | null | undefined = null;
  protected _accept: string | null | undefined = null;
  protected _maxSize: number | null | undefined = null;
  protected _capture: string | null | undefined = null;
  protected _multiple = false;
  protected _disabled = false;
  protected _useDragAndDrop = false;
  protected _isInitialized = false;

  protected abstract _errorEventName: string;

  private _inputChangeListener = this._onInputChange.bind(this);
  private _dragEnterListener = this._onDragEvent.bind(this);
  private _dragLeaveListener = this._onDragEvent.bind(this);
  private _dragOverListener = this._onDragEvent.bind(this);
  private _dropListener = this._onDragEvent.bind(this);

  constructor(protected _adapter: T) {
    this._adapter.registerInputChangeListener(this._inputChangeListener);
  }

  public initialize(): void {
    if (this._useDragAndDrop) {
      this._registerDragListeners();
    }
    this._adapter.initialize();
    this._adapter.setDisabled(this._disabled);
    this._isInitialized = true;
  }

  public destroy(): void {
    this._adapter.removeInputChangeListener(this._inputChangeListener);
    this._removeDragListeners();
    this._isInitialized = false;
  }

  protected _registerDragListeners(): void {
    this._adapter.registerDragEventListener('dragenter', this._dragEnterListener);
    this._adapter.registerDragEventListener('dragleave', this._dragLeaveListener);
    this._adapter.registerDragEventListener('dragover', this._dragOverListener);
    this._adapter.registerDragEventListener('drop', this._dropListener);
  }

  protected _removeDragListeners(): void {
    this._adapter.removeDragEventListener('dragenter', this._dragEnterListener);
    this._adapter.removeDragEventListener('dragleave', this._dragLeaveListener);
    this._adapter.removeDragEventListener('dragover', this._dragOverListener);
    this._adapter.removeDragEventListener('drop', this._dropListener);
  }

  private _onInputChange(evt: Event): void {
    const files = (evt.target as HTMLInputElement).files;
    if (files) {
      this._handleFiles(files);
    }
  }

  private _onDragEvent(evt: DragEvent): void {
    if (this._disabled) {
      return;
    }
    const isOverTarget = evt.type === 'dragenter' || evt.type === 'dragover';
    evt.preventDefault();
    evt.stopPropagation();
    this._adapter.setHighlightState(isOverTarget);

    if (evt.type === 'drop') {
      this._handleDrop(evt);
    }
  }

  private _handleDrop(evt: DragEvent): void {
    const dataTransfer = evt.dataTransfer;
    if (dataTransfer) {
      const files = dataTransfer.files;
      this._handleFiles(files);
    }
  }

  private _handleFiles(files: FileList): void {
    const sortedFiles = this._sortFiles(files);
    const validFiles = sortedFiles[0];
    const invalidFiles = sortedFiles[1];

    // Ensure that we can only drop one file if multiple are not allowed
    if (!this._multiple && validFiles.length > 1) {
      validFiles.splice(1);
    }

    this._files = validFiles;

    // Emit both change and input events per the <input type="file"> spec
    if (validFiles.length) {
      const changeEvent = new Event(BASE_FILE_PICKER_CONSTANTS.events.CHANGE, { bubbles: true, cancelable: false });
      const inputEvent = new Event(BASE_FILE_PICKER_CONSTANTS.events.INPUT, { bubbles: true, cancelable: false, composed: true });
      this._adapter.dispatchHostEvent(changeEvent);
      this._adapter.dispatchHostEvent(inputEvent);
    }

    // Emit an error event if there are any invalid files
    if (invalidFiles.length) {
      const errorEvent = new CustomEvent(this._errorEventName, { detail: invalidFiles });
      this._adapter.dispatchHostEvent(errorEvent);
    }

    // Emit the deprecated files-changed event for backwards compatibility
    this._adapter.emitHostEvent(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, { legalFiles: validFiles, illegalFiles: invalidFiles });
  }

  private _sortFiles(files: FileList): [File[], File[]] {
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];

    if (!this._accept && !this._maxSize) {
      return [Array.from(files), []];
    }

    const formats = this._accept ? this._accept?.split(',').map(f => f.trim().toLowerCase()) : [''];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < files.length; i++) {
      const typeValid = formats.some(f => files[i].type.toLowerCase().match(f) || files[i].name.toLowerCase().match('\\' + f));
      const sizeValid = !this._maxSize || files[i].size <= this._maxSize;
      if (typeValid && sizeValid) {
        validFiles.push(files[i]);
      } else {
        invalidFiles.push(files[i]);
      }
    }
    return [validFiles, invalidFiles];
  }

  /** Get the value */
  public get value(): string {
    return this._files?.[0]?.name || '';
  }

  /** Get the files */
  public get files(): File[] | null | undefined {
    return this._files;
  }

  /** Get and set the allowed file types */
  public get accept(): string | null | undefined {
    return this._accept;
  }
  public set accept(value: string | null | undefined) {
    if (this._accept !== value) {
      this._accept = value;
      this._adapter.setInputAttribute('accept', value);
      this._adapter.toggleHostAttribute(BASE_FILE_PICKER_CONSTANTS.attributes.ACCEPT, !!value, String(value));
    }
  }

  /** Get and set the maximum allowed file size */
  public get maxSize(): number | null | undefined {
    return this._maxSize;
  }
  public set maxSize(value: number | null | undefined) {
    if (this._maxSize !== value) {
      this._maxSize = value;
      this._adapter.toggleHostAttribute(BASE_FILE_PICKER_CONSTANTS.attributes.MAX_SIZE, !!value, String(value));
    }
  }

  /** Get and set the camera to use when capturing video or images */
  public get capture(): string | null | undefined {
    return this._capture;
  }
  public set capture(value: string | null | undefined) {
    if (this._capture !== value) {
      this._capture = value;
      this._adapter.setInputAttribute('capture', value);
      this._adapter.toggleHostAttribute(BASE_FILE_PICKER_CONSTANTS.attributes.CAPTURE, !!value, String(value));
    }
  }

  /** Get and set whether multiple files are allowed */
  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    if (this._multiple !== value) {
      this._multiple = value;
      this._adapter.setInputAttribute('multiple', value);
      this._adapter.toggleHostAttribute(BASE_FILE_PICKER_CONSTANTS.attributes.MULTIPLE, value);
    }
  }

  /** Get and set whether the file picker is disabled */
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      if (this._isInitialized) {
        this._adapter.setDisabled(value);
      }
      this._adapter.toggleHostAttribute(BASE_FILE_PICKER_CONSTANTS.attributes.DISABLED, value);
    }
  }
}
