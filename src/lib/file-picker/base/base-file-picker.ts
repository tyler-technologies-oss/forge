import { coerceBoolean, coerceNumber, coreProperty } from '@tylertech/forge-core';
import { BaseComponent, IBaseComponent } from '../../core/base/base-component';
import { IBaseFilePickerAdapter } from './base-file-picker-adapter';
import { BASE_FILE_PICKER_CONSTANTS, IFilePickerChangeEventData } from './base-file-picker-constants';
import { BaseFilePickerCore } from './base-file-picker-core';

export interface IBaseFilePicker extends IBaseComponent {
  value: string;
  files: File[] | null | undefined;
  accept: string | null | undefined;
  maxSize: number | null | undefined;
  capture: string | null | undefined;
  multiple: boolean;
  disabled: boolean;
}

declare global {
  interface HTMLElementEventMap {
    'forge-file-picker-change': CustomEvent<IFilePickerChangeEventData>;
  }
}

export abstract class BaseFilePicker<T extends BaseFilePickerCore<IBaseFilePickerAdapter>> extends BaseComponent implements IBaseFilePicker {
  public static get observedAttributes(): string[] {
    return Object.values(BASE_FILE_PICKER_CONSTANTS.observedAttributes);
  }

  protected abstract _core: T;

  public connectedCallback(): void {
    this._core.initialize();
  }

  public disconnectedCallback(): void {
    this._core.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case BASE_FILE_PICKER_CONSTANTS.attributes.ACCEPT:
        this.accept = newValue;
        break;
      case BASE_FILE_PICKER_CONSTANTS.attributes.MAX_SIZE:
        this.maxSize = coerceNumber(newValue);
        break;
      case BASE_FILE_PICKER_CONSTANTS.attributes.CAPTURE:
        this.capture = newValue;
        break;
      case BASE_FILE_PICKER_CONSTANTS.attributes.MULTIPLE:
        this.multiple = coerceBoolean(newValue);
        break;
      case BASE_FILE_PICKER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets the path of the first selected file */
  @coreProperty({ set: false })
  public declare value: string;

  /** Gets the files that have been selected */
  @coreProperty({ set: false })
  public declare files: File[] | null | undefined;

  /** Gets and sets the allowed file types */
  @coreProperty()
  public declare accept: string | null | undefined;

  /** Gets and sets the maximum allowed file size */
  @coreProperty()
  public declare maxSize: number | null | undefined;

  /** Gets and sets the camera to use when capturing video or images */
  @coreProperty()
  public declare capture: string | null | undefined;

  /** Gets and sets whether multiple files are allowed */
  @coreProperty()
  public declare multiple: boolean;

  /** Gets and sets whether the file picker is disabled */
  @coreProperty()
  public declare disabled: boolean;
}
