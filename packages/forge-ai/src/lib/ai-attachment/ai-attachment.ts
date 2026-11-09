import { LitElement, TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import '../ai-spinner/index.js';
import '../core/tooltip/tooltip.js';
import styles from './ai-attachment.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-attachment': AiAttachmentComponent;
  }

  interface HTMLElementEventMap {
    'forge-ai-attachment-remove': CustomEvent<ForgeAiAttachmentRemoveEventData>;
  }
}

export interface ForgeAiAttachmentRemoveEventData {
  filename: string;
}

export const AiAttachmentComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-attachment';

/**
 * @tag forge-ai-attachment
 *
 * @summary Displays file attachment information with removal capability.
 *
 * @description
 * A component for displaying file attachments in AI chat interfaces. Shows file metadata
 * including name, size, and file icon.
 *
 * @event {CustomEvent<ForgeAiAttachmentRemoveEventData>} forge-ai-attachment-remove - Fired when the remove button is clicked
 *
 * @cssproperty --forge-ai-attachment-background - Background color of the attachment
 * @cssproperty --forge-ai-attachment-border-color - Border color of the attachment
 * @cssproperty --forge-ai-attachment-padding - Padding inside the attachment
 * @cssproperty --forge-ai-attachment-gap - Gap between elements
 * @cssproperty --forge-ai-attachment-progress-color - Color of the upload progress indicator
 */
@customElement(AiAttachmentComponentTagName)
export class AiAttachmentComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  @property()
  public filename = '';

  @property({ type: Number })
  public size = 0;

  @property({ type: Boolean })
  public removable = false;

  /** Whether the file is uploading. Dims the attachment and shows a spinner and, when `progress` is set, a progress bar. */
  @property({ type: Boolean })
  public uploading = false;

  /** Upload progress from 0 to 100. Rendered as a progress bar while `uploading`. */
  @property({ type: Number })
  public progress?: number;

  get #attachmentId(): string {
    return `attachment-${this.filename.replace(/[^a-zA-Z0-9]/g, '-')}`;
  }

  #handleRemove(): void {
    this.dispatchEvent(
      new CustomEvent<ForgeAiAttachmentRemoveEventData>('forge-ai-attachment-remove', {
        detail: { filename: this.filename },
        bubbles: true,
        composed: true
      })
    );
  }

  get #iconContent(): TemplateResult | typeof nothing {
    if (this.uploading) {
      return html`<forge-ai-spinner size="small"></forge-ai-spinner>`;
    }
    return html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="file-icon" aria-hidden="true">
      <path d="M13 9h5.5L13 3.5zM6 2h8l6 6v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H6v2zm3-4v-2H6v2z" />
    </svg>`;
  }

  get #progressBar(): TemplateResult | typeof nothing {
    if (!this.uploading || this.progress === undefined || Number.isNaN(this.progress)) {
      return nothing;
    }

    const value = Math.min(100, Math.max(0, this.progress));

    return html`
      <div
        class="progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${value}
        aria-label="Uploading ${this.filename}"
        style=${styleMap({ '--_progress': `${value}%` })}>
        <div class="progress-fill"></div>
      </div>
    `;
  }

  get #removeButton(): TemplateResult | typeof nothing {
    if (!this.removable) {
      return nothing;
    }

    const label = this.uploading ? `Cancel upload of ${this.filename}` : `Remove ${this.filename}`;

    return html`
      <button type="button" class="remove-button forge-icon-button forge-icon-button--small" @click=${this.#handleRemove} aria-label="${label}">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M12.854 3.146a.5.5 0 0 1 0 .708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 1 1 .708-.708L8 7.293l4.146-4.147a.5.5 0 0 1 .708 0z"
            fill="currentColor" />
        </svg>
      </button>
    `;
  }

  get #formattedSize(): string {
    if (this.size < 1024) {
      return `${this.size} bytes`;
    }

    const kb = this.size / 1024;
    if (kb < 1024) {
      return `${Math.round(kb)} KB`;
    }

    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
  }

  public override render(): TemplateResult {
    const classes = {
      attachment: true,
      uploading: this.uploading
    };

    return html`
      <div id=${this.#attachmentId} class=${classMap(classes)} role="group" aria-label="File attachment: ${this.filename}">
        <div class="attachment-icon">${this.#iconContent}</div>
        <div class="attachment-info">
          <div class="attachment-filename">${this.filename}</div>
          <div class="attachment-size">${this.#formattedSize}</div>
        </div>
        ${this.#removeButton} ${this.#progressBar}
      </div>
    `;
  }
}
