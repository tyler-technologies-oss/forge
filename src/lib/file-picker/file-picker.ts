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
 * @tag forge-file-picker
 * 
 * @summary
 * The file-picker component allows for a user to upload files of their own to the system. The component provides a slot for a 
 * button, as well as drag-and-drop functionality to launch the system file chooser dialog. There are visual queues to let the 
 * user know when files they are dragging can be dropped, as well as events that are relayed to the developer to handle files 
 * that are legal and/or illegal based on the parameters set on the component.
 * 
 * The expectation of this component is that it will be used as a familiar element on the page that will let users upload files, 
 * while providing that visual and functional consistency.
 *  
 * @property {string | null} accept - Gets/sets the allowed file types.
 * @property {string | null} maxSize - Gets/sets the maximum allowed file size.
 * @property {string | null} capture - Gets/sets the camera to use when capturing video or images.
 * @property {boolean} multiple - Gets/sets whether multiple files are allowed.
 * @property {boolean} disabled - Gets/sets whether the file picker is disabled.
 * @property {boolean} compact - Gets/sets whether the file picker uses the compact variant.
 * @property {boolean} borderless - Gets and sets whether the file picker is borderless.
 * 
 * @attribute {string | null} accept - Gets/sets the allowed file types.
 * @attribute {string | null} maxSize - Gets/sets the maximum allowed file size.
 * @attribute {string | null} capture - Gets/sets the camera to use when capturing video or images.
 * @attribute {boolean} multiple - Gets/sets whether multiple files are allowed.
 * @attribute {boolean} disabled - Gets/sets whether the file picker is disabled.
 * @attribute {boolean} compact - Gets/sets whether the file picker uses the compact variant.
 * @attribute {boolean} borderless - Gets and sets whether the file picker is borderless.
 * 
 * @cssproperty --forge-file-picker-background - Controls the background color.
 * @cssproperty --forge-file-picker-width - Controls the width.
 * @cssproperty --forge-file-picker-height - Controls the height.
 * @cssproperty --forge-file-picker-max-width - Controls the maximum width.
 * @cssproperty --forge-file-picker-border-width - Controls the border width.
 * @cssproperty --forge-file-picker-border-style - Controls the border style.
 * @cssproperty --forge-file-picker-border-color - Controls the border color.
 * @cssproperty --forge-file-picker-gap - Controls gap between each element.
 * @cssproperty --forge-file-picker-padding - Controls the padding.
 * @cssproperty --forge-file-picker-padding-block - Controls the top and bottom padding.
 * @cssproperty --forge-file-picker-padding-inline - Controls the left and right padding.
 * @cssproperty --forge-file-picker-disabled-opacity - Controls the opacity value of the file picker when it's disabled.
 * @cssproperty --forge-file-picker-highlight-background - Controls the background color of the file picker when dragging files into the form.
 * @cssproperty --forge-file-picker-highlight-border-color - Controls the border color of the file picker when dragging files into the form.
 * 
 * @csspart form - The <form> element at the root.
 * @csspart primary - The container element around the primary slot.
 * @csspart secondary - The container element around the secondary slot.
 * @csspart input - The <input type="file"> element.
 * @csspart helper-text-container - The container around the helper-text slot.
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
