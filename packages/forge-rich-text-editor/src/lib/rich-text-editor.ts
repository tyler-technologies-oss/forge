import { html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ContextRoot } from '@lit/context';

import './rich-text-context';
import './rich-text-content';
import type { RichTextContextComponent } from './rich-text-context';

import styles from './rich-text-editor.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rich-text-editor': RichTextEditorComponent;
  }
}

export const RichTextEditorComponentTagName: keyof HTMLElementTagNameMap = 'forge-rich-text-editor';

/**
 * @tag forge-rich-text-editor
 *
 * @summary
 * A rich text editor component powered by TipTap that provides a flexible, component-based
 * architecture for composing editing features.
 *
 * @description
 * The Rich Text Editor component provides a powerful and accessible rich text editing experience.
 * It includes a toolbar for formatting options and a content area for editing text. Features are
 * added as child components, allowing you to compose exactly the functionality your application needs.
 *
 * @slot - The default slot is reserved for feature components (toolbar buttons like forge-rte-standard-tools, forge-rte-code, forge-rte-link, etc.).
 *
 * @property {string} [content=''] - The HTML content of the editor.
 * @property {boolean} [disabled=false] - Whether the editor is disabled.
 * @property {boolean} [readOnly=false] - Whether the editor is in readonly mode.
 * @property {number} [maxLength=0] - Maximum character length allowed. 0 means no limit.
 * @property {string} [errorMessage=''] - Error message to display when validation fails.
 * @property {boolean} [showCharacterCount=false] - Whether to show character count below the editor.
 * @property {boolean} [showWordCount=false] - Whether to show word count below the editor.
 * @property {boolean} [allowPasteFormatting=true] - Whether to allow pasted content to retain formatting. When false, all pasted content is treated as plain text.
 * @property {boolean} [allowPasteImages=false] - Whether to allow images to be pasted into the editor.
 *
 * @attribute {string} content - The HTML content of the editor.
 * @attribute {boolean} disabled - Whether the editor is disabled.
 * @attribute {boolean} readonly - Whether the editor is in readonly mode.
 * @attribute {number} max-length - Maximum character length allowed. 0 means no limit.
 * @attribute {string} error-message - Error message to display when validation fails.
 * @attribute {boolean} show-character-count - Whether to show character count below the editor.
 * @attribute {boolean} show-word-count - Whether to show word count below the editor.
 * @attribute {boolean} allow-paste-formatting - Whether to allow pasted content to retain formatting.
 * @attribute {boolean} allow-paste-images - Whether to allow images to be pasted into the editor.
 *
 * @event {CustomEvent<RichTextEditorChangeEventDetail>} change - Fired when the content of the editor changes. The detail contains the editor content in ProseMirror JSON format.
 * @event {CustomEvent<RichTextEditorValidationEventDetail>} validation - Fired when validation state changes. The detail contains validation status and error messages.
 * @event {CustomEvent<void>} initialized - Fired when the editor has been successfully initialized.
 * @event {CustomEvent<RichTextEditorInitializationErrorEventDetail>} initialization-error - Fired when editor initialization fails. The detail contains the error message.
 * @event {CustomEvent<RichTextEditorErrorEventDetail>} error - Fired when a non-fatal error occurs during editor operation. The detail contains context and error message.
 *
 * @method toJSON() - Returns the editor content as JSON in ProseMirror format. Returns undefined if the editor is not initialized.
 * @method toHTML() - Returns the editor content as an HTML string. Returns an empty string if the editor is not initialized.
 * @method toMarkdown() - Returns the editor content as a Markdown string. Returns an empty string if the editor is not initialized.
 * @method isInitialized - Getter that returns whether the editor has been successfully initialized.
 * @method initializationError - Getter that returns the initialization error message, if any.
 */
@customElement(RichTextEditorComponentTagName)
export class RichTextEditorComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** The content of the editor. */
  @property()
  public content = '';

  /** Whether the editor is disabled. */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /** Whether the editor is in readonly mode. */
  @property({ type: Boolean, attribute: 'readonly', reflect: true })
  public readOnly = false;

  /** Maximum character length allowed. 0 means no limit. */
  @property({ type: Number, attribute: 'max-length' })
  public maxLength = 0;

  /** Error message to display when validation fails. */
  @property({ attribute: 'error-message' })
  public errorMessage = '';

  /** Whether to show character count below the editor. */
  @property({ type: Boolean, attribute: 'show-character-count' })
  public showCharacterCount = false;

  /** Whether to show word count below the editor. */
  @property({ type: Boolean, attribute: 'show-word-count' })
  public showWordCount = false;

  /** Whether to allow pasted content to retain formatting. When false, all pasted content is treated as plain text. */
  @property({ type: Boolean, attribute: 'allow-paste-formatting' })
  public allowPasteFormatting = true;

  /** Whether to allow images to be pasted into the editor. */
  @property({ type: Boolean, attribute: 'allow-paste-images' })
  public allowPasteImages = false;

  constructor() {
    super();
    const contextRoot = new ContextRoot();
    contextRoot.attach(this);
  }

  public override render(): TemplateResult {
    return html`
      <forge-rich-text-context
        .readOnly=${this.readOnly}
        .disabled=${this.disabled}
        .content=${this.content}
        .maxLength=${this.maxLength}
        .errorMessage=${this.errorMessage}
        .showCharacterCount=${this.showCharacterCount}
        .showWordCount=${this.showWordCount}
        .allowPasteFormatting=${this.allowPasteFormatting}
        .allowPasteImages=${this.allowPasteImages}>
        <div class="forge-rich-text-editor">
          <div
            class="editor-toolbar"
            role="toolbar"
            aria-label="Rich text formatting toolbar"
            aria-controls="forge-rte-content"
            aria-orientation="horizontal">
            <slot></slot>
          </div>
          <forge-rich-text-content></forge-rich-text-content>
        </div>
      </forge-rich-text-context>
    `;
  }

  get #contextElement(): RichTextContextComponent | null {
    return (this.shadowRoot?.querySelector('forge-rich-text-context') as RichTextContextComponent) ?? null;
  }

  /**
   * Returns the editor content as JSON in ProseMirror format.
   * Returns undefined if the editor is not initialized or if an error occurs.
   *
   * @returns The editor content as a JSON object, or undefined if unavailable.
   */
  public toJSON(): object | undefined {
    return this.#contextElement?.toJSON();
  }

  /**
   * Returns the editor content as an HTML string.
   * Returns an empty string if the editor is not initialized or if an error occurs.
   *
   * @returns The editor content as HTML.
   */
  public toHTML(): string {
    return this.#contextElement?.toHTML() ?? '';
  }

  /**
   * Returns the editor content as a Markdown string.
   * Returns an empty string if the editor is not initialized or if an error occurs.
   *
   * @returns The editor content as Markdown.
   */
  public toMarkdown(): string {
    return this.#contextElement?.toMarkdown() ?? '';
  }

  /**
   * Returns whether the editor has been successfully initialized.
   *
   * @returns True if the editor is initialized, false otherwise.
   */
  public get isInitialized(): boolean {
    return this.#contextElement?.isInitialized ?? false;
  }

  /**
   * Returns the initialization error message, if any.
   *
   * @returns The initialization error message, or null if no error occurred.
   */
  public get initializationError(): string | null {
    return this.#contextElement?.initializationError ?? null;
  }
}
