import { LitElement, html, unsafeCSS, type TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import styles from './ai-file-picker.scss?inline';

import '../core/tooltip/tooltip.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-file-picker': AiFilePickerComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-file-picker-change': CustomEvent<ForgeAiFilePickerChangeEventData>;
    'forge-ai-file-picker-error': CustomEvent<ForgeAiFilePickerErrorEventData>;
  }
}

/**
 * Event data interface for the file picker change event.
 */
export interface ForgeAiFilePickerChangeEventData {
  /** The selected file */
  file: File;
  /** Timestamp when the file was selected */
  timestamp: number;
}

/**
 * Event data interface for the file picker error event.
 */
export interface ForgeAiFilePickerErrorEventData {
  /** The error type */
  type: 'size' | 'duplicate';
  /** The error message */
  message: string;
  /** The file that caused the error */
  filename: string;
}

export type AiFilePickerVariant = 'button' | 'icon-button';

/**
 * @summary An AI file picker component with button and icon-button variants.
 *
 * @description
 * A simple file picker component that allows users to select and upload files.
 * Provides both button and icon-button variants for different UI contexts.
 *
 * @slot - The default slot for button content when no file is selected.
 * @slot icon - The icon slot for icon-button variant.
 *
 * @event {CustomEvent<ForgeAiFilePickerChangeEventData>} forge-ai-file-picker-change - Fired when a file is selected via click or drag & drop.
 * The event detail contains the selected file and timestamp.
 * @event {CustomEvent<ForgeAiFilePickerErrorEventData>} forge-ai-file-picker-error - Fired when a selected file is rejected (too large or a duplicate).
 */
@customElement('forge-ai-file-picker')
export class AiFilePickerComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /**
   * The variant of the file picker button.
   */
  @property()
  public variant: AiFilePickerVariant = 'icon-button';

  /**
   * Whether the file picker is disabled.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Accepted file types (comma-separated MIME types or extensions).
   */
  @property()
  public accept = '';

  /**
   * Whether to allow multiple file selection.
   */
  @property({ type: Boolean })
  public multiple = false;

  /**
   * Maximum file size in bytes. Default is 10MB.
   */
  @property({ type: Number, attribute: 'max-size' })
  public maxSize = 10485760;

  /**
   * Array of currently selected file names for duplicate checking.
   */
  @property({ attribute: false })
  public selectedFiles: string[] = [];

  @state()
  private _isDragOver = false;

  @query('input[type="file"]')
  private _fileInput!: HTMLInputElement;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dragover', this._onDragOver);
    this.addEventListener('dragleave', this._onDragLeave);
    this.addEventListener('drop', this._onDrop);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('dragover', this._onDragOver);
    this.removeEventListener('dragleave', this._onDragLeave);
    this.removeEventListener('drop', this._onDrop);
  }

  private _handleButtonClick(): void {
    if (this.disabled) {
      return;
    }
    this._fileInput.click();
  }

  private async _handleFileChange(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files && files.length > 0) {
      await this.#processFiles(Array.from(files));
      input.value = '';
    }
  }

  private _onDragOver = (event: DragEvent): void => {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this._isDragOver = true;
  };

  private _onDragLeave = (event: DragEvent): void => {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    // Only set to false if we're leaving the component entirely
    const rect = this.getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this._isDragOver = false;
    }
  };

  private _onDrop = async (event: DragEvent): Promise<void> => {
    if (this.disabled) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this._isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      await this.#processFiles(Array.from(files));
    }
  };

  async #processFiles(files: File[]): Promise<void> {
    const filesToProcess = this.multiple ? files : [files[0]];

    for (const file of filesToProcess) {
      if (!this.#validateFile(file)) {
        continue;
      }

      this.#emitFileChangeEvent(file);
    }
  }

  #validateFile(file: File): boolean {
    const isDuplicate = this.selectedFiles.some(name => name === file.name && this.selectedFiles.filter(n => n === file.name).length > 0);

    if (isDuplicate) {
      this.#emitError('duplicate', `File "${file.name}" is already selected`, file.name);
      return false;
    }

    if (file.size > this.maxSize) {
      const maxSizeMB = (this.maxSize / (1024 * 1024)).toFixed(1);
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      this.#emitError('size', `File "${file.name}" (${fileSizeMB}MB) exceeds maximum size of ${maxSizeMB}MB`, file.name);
      return false;
    }

    return true;
  }

  #emitFileChangeEvent(file: File): void {
    this.dispatchEvent(
      new CustomEvent<ForgeAiFilePickerChangeEventData>('forge-ai-file-picker-change', {
        detail: {
          file,
          timestamp: Date.now()
        },
        bubbles: true,
        composed: true
      })
    );
  }

  #emitError(type: ForgeAiFilePickerErrorEventData['type'], message: string, filename: string): void {
    this.dispatchEvent(
      new CustomEvent<ForgeAiFilePickerErrorEventData>('forge-ai-file-picker-error', {
        detail: {
          type,
          message,
          filename
        },
        bubbles: true,
        composed: true
      })
    );
  }

  get #buttonContent(): TemplateResult {
    if (this.variant === 'icon-button') {
      return html`<slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="forge-icon custom-icon" aria-hidden="true">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" />
        </svg>
      </slot>`;
    }

    return html`<slot>Choose File</slot>`;
  }

  get #fileInput(): TemplateResult {
    return html`
      <input
        type="file"
        ?multiple=${this.multiple}
        accept=${ifDefined(this.accept || undefined)}
        @change=${this._handleFileChange}
        hidden
        tabindex="-1"
        aria-hidden="true" />
    `;
  }

  get #button(): TemplateResult {
    const buttonClasses = {
      'forge-icon-button--medium': true,
      'forge-button': this.variant === 'button',
      'forge-icon-button': this.variant === 'icon-button',
      'ai-file-picker--drag-over': this._isDragOver
    };

    return html`
      <button
        id="file-picker-btn"
        class=${classMap(buttonClasses)}
        type="button"
        ?disabled=${this.disabled}
        @click=${this._handleButtonClick}
        aria-label="Select file to upload">
        ${this.#buttonContent}
      </button>
      ${this.variant === 'icon-button' ? html`<forge-ai-tooltip for="file-picker-btn" placement="top">Add file(s)</forge-ai-tooltip>` : ''}
    `;
  }

  public override render(): TemplateResult {
    return html` <div class="ai-file-picker">${this.#fileInput} ${this.#button}</div> `;
  }
}
