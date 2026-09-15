import { provide } from '@lit/context';
import { CUSTOM_ELEMENT_NAME_PROPERTY, LiveAnnouncer } from '@tylertech/forge-core';
import { type AnyExtension, type Content, Editor as TipTapEditor } from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Document } from '@tiptap/extension-document';
import { Text } from '@tiptap/extension-text';
import { Paragraph } from '@tiptap/extension-paragraph';
import CharacterCount from '@tiptap/extension-character-count';
import { CharacterLimit, countCharacters } from './extensions/character-limit.js';
import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import styles from './rich-text-context.scss';
import { when } from 'lit/directives/when.js';
import {
  editorContext,
  EditorContext,
  RichTextEditorChangeEventDetail,
  RichTextEditorContent,
  RichTextEditorValidationEventDetail,
  RichTextEditorInitializationErrorEventDetail,
  RichTextEditorErrorEventDetail
} from './editor-context.js';
import { IRichTextEditorFeature } from './features/rich-text-editor-feature.js';
import { PasteHandler } from './extensions/paste-handler.js';
import { MarkdownSerializer } from './extensions/markdown-serializer.js';
import { sanitizeHTML, sanitizeJSON } from './extensions/sanitize-utils.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rich-text-context': RichTextContextComponent;
  }
}

export const RICH_TEXT_CONTEXT_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rich-text-context';

const DEFAULT_EXTENSIONS: AnyExtension[] = [Document, Text, Paragraph];

/**
 * @tag forge-rich-text-context
 *
 * @summary
 * Provides the editor context for composed rich text editor layouts where toolbar and content are separated.
 *
 * @description
 * This component provides the context for the rich text editor and all auxiliary components.
 * It initializes the TipTap editor instance and provides methods to set the editor element and register features.
 * Use this component when you need to separate the toolbar from the content area, such as for fixed toolbars
 * or multi-column layouts. For simple inline editor usage, use forge-rich-text-editor instead.
 *
 * @slot - The default slot for toolbar components and forge-rich-text-content.
 *
 * @property {string} [editorId='editor'] - The ID of the element to instantiate the editor against.
 * @property {RichTextEditorContent} [content=''] - The content of the editor, as an HTML string or a ProseMirror document. Both are sanitized.
 * @property {boolean} [disabled=false] - Whether the editor is disabled.
 * @property {boolean} [readOnly=false] - Whether the editor is in readonly mode.
 * @property {number} [maxLength=0] - Maximum character length allowed. 0 means no limit.
 * @property {string} [errorMessage=''] - Error message to display when validation fails.
 * @property {boolean} [showCharacterCount=false] - Whether to show character count below the editor.
 * @property {boolean} [showWordCount=false] - Whether to show word count below the editor.
 * @property {boolean} [allowPasteFormatting=true] - Whether to allow pasted content to retain formatting. When false, all pasted content is treated as plain text.
 * @property {boolean} [allowPasteImages=false] - Whether to allow images to be pasted into the editor.
 *
 * @attribute {string} editor-id - The ID of the element to instantiate the editor against.
 * @attribute {string} content - The HTML content of the editor. Pass a ProseMirror document through the property instead; an attribute cannot carry an object.
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
 * @event {CustomEvent<RichTextEditorErrorEventDetail>} error - Fired when a non-fatal error occurs during editor operation. The detail contains context and error message. A `context` of `Invalid document content` means a ProseMirror document was rejected by the schema and discarded.
 *
 * @method toJSON() - Returns the editor content as JSON in ProseMirror format. Returns undefined if the editor is not initialized.
 * @method toHTML() - Returns the editor content as an HTML string. Returns an empty string if the editor is not initialized.
 * @method toMarkdown() - Returns the editor content as a Markdown string. Returns an empty string if the editor is not initialized.
 * @method isInitialized - Getter that returns whether the editor has been successfully initialized.
 * @method initializationError - Getter that returns the initialization error message, if any.
 */
@customElement(RICH_TEXT_CONTEXT_TAG_NAME)
export class RichTextContextComponent extends LitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RICH_TEXT_CONTEXT_TAG_NAME;

  public static override styles = unsafeCSS(styles);

  /** The ID of the element to instantiate the editor against. */
  @property({ attribute: 'editor-id' })
  public editorId = 'editor';

  /** The content of the editor, as an HTML string or a ProseMirror document. */
  @property()
  public content: RichTextEditorContent = '';

  /** Whether the editor is disabled. */
  @property({ type: Boolean })
  public disabled = false;

  /** Whether the editor is in readonly mode. */
  @property({ type: Boolean, attribute: 'readonly' })
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

  /** The TipTap editor instance */
  @state()
  private _editor: TipTapEditor | undefined = undefined;

  /** Current character count */
  @state()
  private _characterCount = 0;

  /** Current word count */
  @state()
  private _wordCount = 0;

  /** Whether the content is valid */
  @state()
  private _isValid = true;

  /** Validation error messages */
  @state()
  private _validationErrors: string[] = [];

  /** Initialization error state */
  @state()
  private _initializationError: string | null = null;

  #featureInstances: Set<IRichTextEditorFeature> = new Set();
  #initFrame: number | undefined;
  #editorElement: HTMLElement | undefined;

  /**
   * Sets the editor element that the editor will be initialized against.
   *
   * Initialization cannot occur until this element is set, as the editor needs a DOM element to attach to.
   *
   * @param element The element to set as the editor element.
   */
  #setEditorElement(element: HTMLElement): void {
    this.#editorElement = element;

    // Trigger init whenever the editor element becomes available (with or without features).
    if (!this._editor) {
      if (this.#initFrame) {
        window.cancelAnimationFrame(this.#initFrame);
      }
      this.#initFrame = window.requestAnimationFrame(() => this.#initEditor());
    }
  }

  #announce(message: string): void {
    LiveAnnouncer.instance.announce(message, 'polite');
  }

  /**
   * Registers a feature instance with the editor context.
   *
   * We use a requestAnimationFrame to ensure that the editor is initialized after all features have been registered.
   * This prevents issues with the editor not being ready when features try to access it, as well as avoiding
   * multiple initializations of the editor.
   *
   * @param instance The feature instance to register.
   */
  #registerFeature(instance: IRichTextEditorFeature): void {
    this.#featureInstances.add(instance);

    if (this.#initFrame) {
      window.cancelAnimationFrame(this.#initFrame);
      this.#initFrame = undefined;
    }

    this.#initFrame = window.requestAnimationFrame(() => this.#initEditor());
  }

  /** Provide the editor context to child components. */
  @provide({ context: editorContext })
  public editorContext: EditorContext = {
    editor: null,
    disabled: false,
    readOnly: false,
    content: '',
    isActive(identifier: string | Record<string, unknown>, attributes?: Record<string, unknown>) {
      return this.editor?.isActive(identifier as any, attributes as any) ?? false;
    },
    isEditable() {
      return !this.disabled && !this.readOnly && !!this.editor;
    },
    setEditorElement: this.#setEditorElement.bind(this),
    registerFeature: this.#registerFeature.bind(this),
    announce: this.#announce.bind(this)
  };

  public override disconnectedCallback(): void {
    // Cancel any pending initialization frame
    if (this.#initFrame) {
      window.cancelAnimationFrame(this.#initFrame);
      this.#initFrame = undefined;
    }

    this.#destroyEditor();
    super.disconnectedCallback();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (this.hasUpdated && changedProperties.has('content')) {
      try {
        const sanitized = this.#sanitizeContent(this.content) as Content;
        this.#reportUnparsableDocument(sanitized);
        this.editorContext.editor?.commands.setContent(sanitized);
      } catch (error) {
        this.#handleEditorError('Failed to set content', error);
      }
    }

    // Enforcement reads maxLength through a resolver, so a change takes effect without recreating
    // the editor. Validation still has to be re-run, or the error state lags a commit behind.
    if (this.hasUpdated && changedProperties.has('maxLength')) {
      this._characterCount = this._editor ? countCharacters(this._editor.state.doc) : 0;
      this.#validateContent();
    }

    if (changedProperties.has('disabled') || changedProperties.has('readOnly')) {
      try {
        this.editorContext.editor?.setEditable(!this.disabled && !this.readOnly);
        this.editorContext = {
          ...this.editorContext,
          disabled: this.disabled,
          readOnly: this.readOnly
        };

        // Announce state changes to screen readers
        if (this.hasUpdated && changedProperties.has('disabled')) {
          this.#announce(this.disabled ? 'Editor disabled' : 'Editor enabled');
        }
        if (this.hasUpdated && changedProperties.has('readOnly')) {
          this.#announce(this.readOnly ? 'Editor read-only' : 'Editor editable');
        }
      } catch (error) {
        this.#handleEditorError('Failed to update editor state', error);
      }
    }
  }

  public override render(): TemplateResult {
    // If initialization failed, show error message
    if (this._initializationError) {
      return this.#renderInitializationError();
    }

    return html`
      <slot></slot>
      ${when(this.showCharacterCount || this.showWordCount || !this._isValid, () => this.#renderFooter())}
    `;
  }

  #renderInitializationError(): TemplateResult {
    return html`
      <div class="editor-initialization-error" role="alert" aria-live="assertive">
        <p class="editor-initialization-error__title">Editor Initialization Failed</p>
        <p class="editor-initialization-error__message">The rich text editor could not be initialized. Please refresh the page to try again.</p>
        <p class="editor-initialization-error__details">${this._initializationError}</p>
      </div>
    `;
  }

  #renderFooter(): TemplateResult {
    return html`
      <div class="editor-footer">
        ${when(!this._isValid, () => this.#renderErrors())} ${when(this.showCharacterCount || this.showWordCount, () => this.#renderCounts())}
      </div>
    `;
  }

  #renderErrors(): TemplateResult {
    return html` <div class="editor-error" role="alert" aria-live="polite">${this.errorMessage || this._validationErrors[0] || 'Validation error'}</div> `;
  }

  #renderCounts(): TemplateResult {
    const counts: string[] = [];

    if (this.showCharacterCount) {
      const charText = this.maxLength > 0 ? `${this._characterCount} / ${this.maxLength} characters` : `${this._characterCount} characters`;
      counts.push(charText);
    }

    if (this.showWordCount) {
      counts.push(`${this._wordCount} words`);
    }

    return html`<div class="editor-counts" aria-live="polite" aria-atomic="true">${counts.join(' • ')}</div>`;
  }

  #validateContent(): void {
    try {
      const errors: string[] = [];
      let isValid = true;

      // Check max length
      if (this.maxLength > 0 && this._characterCount > this.maxLength) {
        isValid = false;
        errors.push(`Content exceeds maximum length of ${this.maxLength} characters`);
      }

      // Update validation state
      const hasChanged = this._isValid !== isValid;
      this._isValid = isValid;
      this._validationErrors = errors;

      // Dispatch validation event if state changed
      if (hasChanged) {
        this.dispatchEvent(
          new CustomEvent<RichTextEditorValidationEventDetail>('validation', {
            detail: {
              isValid,
              errors
            },
            bubbles: true,
            composed: true
          })
        );
      }
    } catch (error) {
      console.error('[RichTextEditor] Validation error:', error);
    }
  }

  /**
   * Returns the editor content as JSON. Returns undefined if editor is not initialized or if an error occurs.
   */
  public toJSON(): object | undefined {
    try {
      return this._editor?.getJSON();
    } catch (error) {
      this.#handleEditorError('Failed to get JSON content', error);
      return undefined;
    }
  }

  /**
   * Returns the editor content as HTML. Returns empty string if editor is not initialized or if an error occurs.
   * The output is sanitized to prevent XSS attacks.
   */
  public toHTML(): string {
    try {
      const htmlContent = this._editor?.getHTML() ?? '';
      return this.#sanitizeOutputHTML(htmlContent);
    } catch (error) {
      this.#handleEditorError('Failed to get HTML content', error);
      return '';
    }
  }

  /**
   * Returns the editor content as Markdown. Returns empty string if editor is not initialized or if an error occurs.
   */
  public toMarkdown(): string {
    try {
      const json = this._editor?.getJSON();
      if (!json) {
        return '';
      }
      return MarkdownSerializer.serialize(json);
    } catch (error) {
      this.#handleEditorError('Failed to get Markdown content', error);
      return '';
    }
  }

  /**
   * Returns whether the editor has been successfully initialized.
   */
  public get isInitialized(): boolean {
    return !!this._editor && !this._initializationError;
  }

  /**
   * Returns the initialization error message, if any.
   */
  public get initializationError(): string | null {
    return this._initializationError;
  }

  #initEditor(): void {
    try {
      if (this._editor) {
        return;
      }

      this.#destroyEditor();

      // Clear any previous initialization errors
      this._initializationError = null;

      // Features can contain duplicate extensions. Make sure to filter out any duplicates
      const featureExtensions = Array.from(this.#featureInstances).flatMap(feature => feature.extensions);

      // CharacterCount supplies the word count. The character limit is enforced by CharacterLimit
      // instead, because CharacterCount's own counter joins blocks with nothing and so never sees
      // a paragraph break - a document at the limit could still grow through Enter.
      const characterCountExtension = CharacterCount.configure({});
      const characterLimitExtension = CharacterLimit.configure({ getLimit: () => this.maxLength });

      // Add PasteHandler extension
      const pasteHandlerExtension = PasteHandler.configure({
        allowPasteFormatting: this.allowPasteFormatting,
        allowPasteImages: this.allowPasteImages
      });

      const extensions = [...DEFAULT_EXTENSIONS, characterCountExtension, characterLimitExtension, pasteHandlerExtension, ...featureExtensions].filter(
        (ext, index, self) => self.findIndex(e => e.name === ext.name) === index
      );

      if (!this.#editorElement) {
        // Content component hasn't called setEditorElement yet — it will re-trigger init when ready.
        return;
      }

      const initialContent = this.#sanitizeContent(this.content) as Content;

      this._editor = new TipTapEditor({
        element: this.#editorElement,
        extensions,
        content: initialContent,
        // TipTap builds its own contenteditable element inside the one it is handed, and that inner
        // element is the real textbox - focusable, and what assistive technology lands on. Naming
        // only the container left it unnamed, which axe reports as aria-input-field-name.
        editorProps: {
          attributes: {
            'aria-label': 'Rich text editor content',
            'aria-multiline': 'true'
          }
        },
        editable: !(this.editorContext.disabled || this.editorContext.readOnly),
        injectCSS: false,
        onTransaction: () => {
          try {
            this.#featureInstances.forEach(feature => feature.requestUpdate());
          } catch (error) {
            this.#handleEditorError('Transaction update failed', error);
          }
        },
        coreExtensionOptions: {
          clipboardTextSerializer: {
            blockSeparator: '\n'
          }
        },
        onUpdate: ({ editor }) => {
          try {
            const json = editor.getJSON();

            // Update character and word counts
            const charCountStorage = editor.storage.characterCount;
            this._characterCount = countCharacters(editor.state.doc);
            this._wordCount = charCountStorage?.words?.() ?? 0;

            // Perform validation
            this.#validateContent();

            this.dispatchEvent(
              new CustomEvent<RichTextEditorChangeEventDetail>('change', {
                detail: { json },
                bubbles: true,
                composed: true
              })
            );
          } catch (error) {
            this.#handleEditorError('Content update failed', error);
          }
        }
      });

      this.#reportUnparsableDocument(initialContent);

      this.editorContext = {
        ...this.editorContext,
        editor: this._editor
      };

      // Initialize counts
      const storage = this._editor.storage.characterCount;
      this._characterCount = countCharacters(this._editor.state.doc);
      this._wordCount = storage?.words?.() ?? 0;

      // Initial validation
      this.#validateContent();

      // Dispatch initialization success event
      this.dispatchEvent(
        new CustomEvent('initialized', {
          bubbles: true,
          composed: true
        })
      );
    } catch (error) {
      this.#handleInitializationError(error);
    }
  }

  /**
   * Handles initialization errors by setting error state and dispatching error event.
   */
  #handleInitializationError(error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';

    this._initializationError = errorMessage;

    // Always log initialization errors (critical for debugging and security)
    console.error('[RichTextEditor] Initialization failed:', error);

    this.dispatchEvent(
      new CustomEvent<RichTextEditorInitializationErrorEventDetail>('initialization-error', {
        detail: { error: errorMessage },
        bubbles: true,
        composed: true
      })
    );
  }

  /**
   * Handles runtime editor errors (non-fatal).
   */
  #handleEditorError(context: string, error: unknown): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Always log errors (important for debugging and security)
    console.error(`[RichTextEditor] ${context}:`, error);

    this.dispatchEvent(
      new CustomEvent<RichTextEditorErrorEventDetail>('error', {
        detail: { context, error: errorMessage },
        bubbles: true,
        composed: true
      })
    );
  }

  #destroyEditor(): void {
    this._editor?.destroy();
    this._editor = undefined;
  }

  /**
   * Sanitizes HTML output by ensuring all text content is properly escaped.
   * Prevents XSS attacks where malicious content is injected via setContent().
   */
  #sanitizeOutputHTML(htmlContent: string): string {
    if (!htmlContent) {
      return '';
    }

    const temp = document.createElement('div');
    temp.innerHTML = htmlContent;

    // Remove any remaining dangerous elements that might have been created
    const dangerousElements = ['script', 'iframe', 'object', 'embed', 'style'];
    dangerousElements.forEach(tag => {
      temp.querySelectorAll(tag).forEach(el => el.remove());
    });

    // Remove event handler attributes
    temp.querySelectorAll('*').forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
    });

    return temp.innerHTML;
  }

  /**
   * Sanitizes content before passing to TipTap editor.
   * Handles both HTML strings and ProseMirror JSON objects.
   */
  /**
   * Reports a ProseMirror document the schema cannot parse, which TipTap otherwise only logs as a
   * warning of its own.
   *
   * Document input is all-or-nothing: a mark or node the editor has no extension for makes
   * ProseMirror reject the whole document, so the content is silently discarded. HTML input is
   * lenient by comparison - it drops the unsupported formatting and keeps the text - which is why
   * only documents are checked here. TipTap's `enableContentCheck` would cover both, but it reports
   * the benign HTML case as an error too, and that noise would teach consumers to ignore the event.
   *
   * This only reports; the content is still handed to TipTap so the existing behavior is unchanged.
   */
  #reportUnparsableDocument(content: unknown): void {
    const schema = this._editor?.schema;
    if (!schema || !content || typeof content !== 'object') {
      return;
    }

    try {
      ProseMirrorNode.fromJSON(schema, content);
    } catch (error) {
      this.#handleEditorError('Invalid document content', error);
    }
  }

  #sanitizeContent(content: string | object): string | object | unknown {
    if (typeof content === 'string') {
      return sanitizeHTML(content, this.allowPasteImages);
    }

    if (typeof content === 'object' && content !== null) {
      return sanitizeJSON(content);
    }

    return '';
  }
}
