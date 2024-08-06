import { attachShadowTemplate, coerceBoolean, coreProperty, customElement } from '@tylertech/forge-core';
import { ButtonComponent } from '../button';
import { BaseFilePicker, IBaseFilePicker } from './base';
import { FilePickerAdapter } from './file-picker-adapter';
import { FILE_PICKER_CONSTANTS } from './file-picker-constants';
import { FilePickerCore } from './file-picker-core';

import template from './file-picker.html';
import styles from './file-picker.scss';

export interface IFilePickerComponent extends IBaseFilePicker {
  compact: boolean;
  borderless: boolean;
}

declare global {
  interface HTMLElementTagNameMap {
    'forge-file-picker': IFilePickerComponent;
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
 * @property {string} [value=''] - Gets the path of the first selected file.
 * @property {File[] | null} [files=new FileList()] - Gets the files that have been selected.
 * @property {string | null} [accept=null] - Gets/sets the allowed file types.
 * @property {string | null} [maxSize=null] - Gets/sets the maximum allowed file size.
 * @property {string | null} [capture=null] - Gets/sets the camera to use when capturing video or images.
 * @property {boolean} [multiple=false] - Gets/sets whether multiple files are allowed.
 * @property {boolean} [disabled=false] - Gets/sets whether the file picker is disabled.
 * @property {boolean} [compact=false] - Gets/sets whether the file picker uses the compact variant.
 * @property {boolean} [borderless=false] - Gets and sets whether the file picker is borderless.
 *
 * @attribute {string | null} [accept=null] - Gets/sets the allowed file types.
 * @attribute {string | null} [maxSize=null] - Gets/sets the maximum allowed file size.
 * @attribute {string | null} [capture=null] - Gets/sets the camera to use when capturing video or images.
 * @attribute {boolean} [multiple=false] - Gets/sets whether multiple files are allowed.
 * @attribute {boolean} [disabled=false] - Gets/sets whether the file picker is disabled.
 * @attribute {boolean} [compact=false] - Gets/sets whether the file picker uses the compact variant.
 * @attribute {boolean} [borderless=false] - Gets and sets whether the file picker is borderless.
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
 * @event {Event} change - Dispatched when a valid file is chosen.
 * @event {Input} input - Dispatched when a valid file is chosen.
 * @event {CustomEvent<File[]>} forge-file-picker-error - Dispatched when an invalid file is chosen.
 * @event {CustomEvent<IFilePickerChangeEventData>} forge-file-picker-change - Dispatched when a file is chosen.
 *
 * @csspart container - The root element comprising the click and drop target.
 * @csspart primary - The container element around the primary slot.
 * @csspart secondary - The container element around the secondary slot.
 * @csspart support-text - The container around the supprt-text slot.
 */
@customElement({
  name: FILE_PICKER_CONSTANTS.elementName,
  dependencies: [ButtonComponent]
})
export class FilePickerComponent extends BaseFilePicker<FilePickerCore> implements IFilePickerComponent {
  public static get observedAttributes(): string[] {
    return [...Object.values(FILE_PICKER_CONSTANTS.observedAttributes)];
  }

  protected _core: FilePickerCore;

  constructor() {
    super();
    attachShadowTemplate(this, template, styles);
    this._core = new FilePickerCore(new FilePickerAdapter(this));
  }

  public override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case FILE_PICKER_CONSTANTS.attributes.COMPACT:
        this.compact = coerceBoolean(newValue);
        break;
      case FILE_PICKER_CONSTANTS.attributes.BORDERLESS:
        this.borderless = coerceBoolean(newValue);
        break;
    }
  }

  /** Gets and sets whether the file picker is compact */
  @coreProperty()
  public declare compact: boolean;

  /** Gets and sets whether the file picker is borderless */
  @coreProperty()
  public declare borderless: boolean;
}
