import { CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY, CUSTOM_ELEMENT_NAME_PROPERTY, coerceBoolean, coerceNumber, tryDefine } from '@tylertech/forge-core';
import { PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ButtonComponent } from '../button/index.js';
import { BaseLitElement } from '../core/base/base-lit-element.js';
import { FILE_PICKER_CONSTANTS, IFilePickerChangeEventData } from './file-picker-constants.js';

import styles from './file-picker.scss';

/** @deprecated - This will be removed in the future. Please switch to using FilePickerComponent. */
export interface IFilePickerComponent extends BaseLitElement {
  accept: string | null | undefined;
  maxSize: number | null | undefined;
  capture: string | null | undefined;
  multiple: boolean;
  disabled: boolean;
  compact: boolean;
  borderless: boolean;
}

const booleanConverter = {
  fromAttribute: (value: string | null): boolean => coerceBoolean(value as string),
  toAttribute: (value: boolean): string | null => (value ? '' : null)
};

const optionalStringConverter = {
  toAttribute: (value?: string | null): string | null => value || null
};

/**
 * @tag forge-file-picker
 *
 * @summary The file picker component allows for a user to upload files of their own to the system. The component provides a slot for a
 * button, as well as drag-and-drop functionality to launch the system file chooser dialog. There are visual cues to let the
 * user know when files they are dragging can be dropped, as well as events that are relayed to the developer to handle files
 * that are legal and/or illegal based on the parameters set on the component.
 *
 * The expectation of this component is that it will be used as a familiar element on the page that will let users upload files,
 * while providing that visual and functional consistency.
 *
 * @dependency forge-button
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
 * @event {CustomEvent<IFilePickerChangeEventData>} forge-file-picker-change - Dispatched when a file is chosen.
 *
 * @csspart form - The `<form>` element at the root.
 * @csspart primary - The container element around the primary slot.
 * @csspart secondary - The container element around the secondary slot.
 * @csspart input - The `<input type="file">` element.
 * @csspart helper-text-container - The container around the helper-text slot.
 *
 * @slot - The button that opens the system file chooser.
 * @slot primary - The primary text.
 * @slot secondary - The secondary text.
 * @slot helper-text - Helper text displayed below the file picker.
 */
export class FilePickerComponent extends BaseLitElement implements IFilePickerComponent {
  public static styles = unsafeCSS(styles);

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = FILE_PICKER_CONSTANTS.elementName;

  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_DEPENDENCIES_PROPERTY] = [ButtonComponent];

  /**
   * Gets/sets the allowed file types.
   * @default null
   * @attribute
   */
  @property({ reflect: true, converter: optionalStringConverter })
  public accept: string | null | undefined = null;

  /**
   * Gets/sets the maximum allowed file size.
   * @default null
   * @attribute max-size
   */
  @property({
    attribute: FILE_PICKER_CONSTANTS.attributes.MAX_SIZE,
    reflect: true,
    converter: {
      fromAttribute: (value: string | null): number | null => (value === null ? null : coerceNumber(value)),
      toAttribute: (value?: number | null): string | null => (value ? `${value}` : null)
    }
  })
  public maxSize: number | null | undefined = null;

  /**
   * Gets/sets the camera to use when capturing video or images.
   * @default null
   * @attribute
   */
  @property({ reflect: true, converter: optionalStringConverter })
  public capture: string | null | undefined = null;

  /**
   * Gets/sets whether multiple files are allowed.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanConverter })
  public multiple = false;

  /**
   * Gets/sets whether the file picker is disabled.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanConverter })
  public disabled = false;

  /**
   * Gets/sets whether the file picker uses the compact variant.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanConverter })
  public compact = false;

  /**
   * Gets/sets whether the file picker is borderless.
   * @default false
   * @attribute
   */
  @property({ reflect: true, converter: booleanConverter })
  public borderless = false;

  @state() private _highlighted = false;

  @query(FILE_PICKER_CONSTANTS.selectors.INPUT) private _input?: HTMLInputElement;

  #button?: ButtonComponent;

  public override updated(changedProperties: PropertyValues<this>): void {
    if (!this.hasUpdated || changedProperties.has('disabled')) {
      this.#initializeButton();
      this.#syncButtonDisabled();
    }
  }

  public render(): TemplateResult {
    return html`
      <form
        class=${classMap({
          'forge-file-picker': true,
          [FILE_PICKER_CONSTANTS.classes.HIGHLIGHT]: this._highlighted,
          [FILE_PICKER_CONSTANTS.classes.COMPACT]: this.compact,
          [FILE_PICKER_CONSTANTS.classes.BORDERLESS]: this.borderless
        })}
        id="container"
        part="form"
        ?disabled=${this.disabled}
        @click=${this.#handleClick}
        @dragenter=${this.#handleDragOver}
        @dragover=${this.#handleDragOver}
        @dragleave=${this.#handleDragLeave}
        @drop=${this.#handleDrop}>
        <div class="primary" id="primary" part="primary">
          <slot name="primary"></slot>
        </div>
        <slot id="button-slot" @slotchange=${this.#handleButtonSlotChange}></slot>
        <div class="secondary" id="secondary" part="secondary">
          <slot name="secondary"></slot>
        </div>
        <input
          type="file"
          class="input"
          id="input"
          part="input"
          accept=${ifDefined(this.accept || undefined)}
          capture=${ifDefined(this.capture || undefined)}
          ?multiple=${this.multiple}
          @change=${this.#handleInputChange} />
      </form>
      <div class="helper-text" part="helper-text-container">
        <slot name="helper-text"></slot>
      </div>
    `;
  }

  #initializeButton(): void {
    this.#button = this.querySelector<ButtonComponent>('forge-button') ?? undefined;
  }

  #syncButtonDisabled(): void {
    this.#button?.toggleAttribute('disabled', this.disabled);
  }

  #handleButtonSlotChange(): void {
    this.#initializeButton();
    if (this.disabled) {
      this.#syncButtonDisabled();
    }
  }

  #handleClick(): void {
    if (this.disabled || !this._input) {
      return;
    }
    this._input.value = '';
    this._input.click();
  }

  #handleInputChange(evt: Event): void {
    const files = (evt.target as HTMLInputElement).files;
    if (files) {
      this.#handleFiles(files);
    }
  }

  #handleDragOver(evt: DragEvent): void {
    this.#handleDragEvent(evt, true);
  }

  #handleDragLeave(evt: DragEvent): void {
    this.#handleDragEvent(evt, false);
  }

  #handleDrop(evt: DragEvent): void {
    this.#handleDragEvent(evt, false);

    if (!this.compact && !this.disabled && evt.dataTransfer) {
      this.#handleFiles(evt.dataTransfer.files);
    }
  }

  #handleDragEvent(evt: DragEvent, isOverTarget: boolean): void {
    if (this.compact || this.disabled) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();
    this._highlighted = isOverTarget;
  }

  #handleFiles(files: FileList): void {
    this.dispatchEvent(new CustomEvent(FILE_PICKER_CONSTANTS.events.FILES_CHANGED, { detail: this.#sortFiles(files), bubbles: true }));
  }

  #sortFiles(files: FileList): IFilePickerChangeEventData {
    if (!this.accept && !this.maxSize) {
      return { legalFiles: Array.from(files), illegalFiles: [] };
    }

    const legalFiles: File[] = [];
    const illegalFiles: File[] = [];
    const formats = this.accept ? this.accept.split(',').map(f => f.trim().toLowerCase()) : [''];

    for (const file of Array.from(files)) {
      const hasLegalFormat = formats.some(f => file.type.toLowerCase().match(f) || file.name.toLowerCase().match(`\\${f}`));
      const isTooLarge = !!this.maxSize && file.size > this.maxSize;
      (hasLegalFormat && !isTooLarge ? legalFiles : illegalFiles).push(file);
    }

    return { legalFiles, illegalFiles };
  }
}

tryDefine(FILE_PICKER_CONSTANTS.elementName, FilePickerComponent);

declare global {
  interface HTMLElementTagNameMap {
    'forge-file-picker': IFilePickerComponent;
  }

  interface HTMLElementEventMap {
    'forge-file-picker-change': CustomEvent<IFilePickerChangeEventData>;
  }
}
