import { attachShadowTemplate, coerceBoolean, coerceNumber, CustomElement, FoundationProperty } from '@tylertech/forge-core';
import { ButtonComponent } from '../button';
import { BaseComponent, IBaseComponent } from '../core/base/base-component';
import { FilePickerAdapter } from './file-picker-adapter';
import { FILE_PICKER_CONSTANTS, IFilePickerChangeEventData } from './file-picker-constants';
import { FilePickerFoundation } from './file-picker-foundation';

import template from './file-picker.html';
import styles from './file-picker.scss';

export interface IFilePickerComponent extends IBaseComponent {
  accept: string | null | undefined;
  maxSize: number | null | undefined;
  capture: string | null | undefined;
  multiple: boolean;
  disabled: boolean;
  compact: boolean;
  borderless: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-file-picker': IFilePickerComponent;
  }

  interface HTMLElementEventMap {
    'forge-file-picker-change': CustomEvent<IFilePickerChangeEventData>;
  }
}

/**
 * The web component class behind the `<forge-file-picker>` custom element.
 * 
 * @tag forge-file-picker
 */
@CustomElement({
  name: FILE_PICKER_CONSTANTS.elementName,
  dependencies: [ButtonComponent]
})
export class FilePickerComponent extends BaseComponent implements IFilePickerComponent {
  public static get observedAttributes(): string[] {
    return [
      FILE_PICKER_CONSTANTS.attributes.ACCEPT,
      FILE_PICKER_CONSTANTS.attributes.MAX_SIZE,
      FILE_PICKER_CONSTANTS.attributes.CAPTURE,
      FILE_PICKER_CONSTANTS.attributes.MULTIPLE,
      FILE_PICKER_CONSTANTS.attributes.DISABLED,
      FILE_PICKER_CONSTANTS.attributes.COMPACT,
      FILE_PICKER_CONSTANTS.attributes.BORDERLESS
    ];
  }

  private _foundation: FilePickerFoundation;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._foundation = new FilePickerFoundation(new FilePickerAdapter(this));
  }

  public connectedCallback(): void {
    this._foundation.initialize();
  }

  public disconnectedCallback(): void {
    this._foundation.destroy();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    switch (name) {
      case FILE_PICKER_CONSTANTS.attributes.ACCEPT:
        this.accept = newValue;
        break;
      case FILE_PICKER_CONSTANTS.attributes.MAX_SIZE:
        this.maxSize = coerceNumber(newValue);
        break;
      case FILE_PICKER_CONSTANTS.attributes.CAPTURE:
        this.capture = newValue;
        break;
      case FILE_PICKER_CONSTANTS.attributes.MULTIPLE:
        this.multiple = coerceBoolean(newValue);
        break;
      case FILE_PICKER_CONSTANTS.attributes.DISABLED:
        this.disabled = coerceBoolean(newValue);
        break;
      case FILE_PICKER_CONSTANTS.attributes.COMPACT:
        this.compact = coerceBoolean(newValue);
        break;
      case FILE_PICKER_CONSTANTS.attributes.BORDERLESS:
        this.borderless = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets and sets the allowed file types */
  @FoundationProperty()
  public declare accept: string | null | undefined;

  /** Gets and sets the maximum allowed file size */
  @FoundationProperty()
  public declare maxSize: number | null | undefined;

  /** Gets and sets the camera to use when capturing video or images */
  @FoundationProperty()
  public declare capture: string | null | undefined;

  /** Gets and sets whether multiple files are allowed */
  @FoundationProperty()
  public declare multiple: boolean;

  /** Gets and sets whether the file picker is disabled */
  @FoundationProperty()
  public declare disabled: boolean;

  /** Gets and sets whether the file picker is compact */
  @FoundationProperty()
  public declare compact: boolean;

  /** Gets and sets whether the file picker is borderless */
  @FoundationProperty()
  public declare borderless: boolean;
}
