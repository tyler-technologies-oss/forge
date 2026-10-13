import { type AnyExtension, Editor as TipTapEditor } from '@tiptap/core';
import type { RichTextDocument } from './editor-context.js';
import Link from '@tiptap/extension-link';
import { html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import styles from './rich-text-renderer.scss';
import { sanitizeJSON } from './extensions/sanitize-utils.js';
import { getFeatureExtensions, type RichTextFeature } from './extensions/feature-extensions.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

/**
 * Type representing rich text content in TipTap's ProseMirror JSON format.
 * This is a complex generic type from TipTap that represents the document structure.
 * The `any` types here are TipTap's internal representation and cannot be avoided
 * without importing the entire TipTap schema system.
 *
 * This format is produced by the editor's `toJSON()` method and can be consumed
 * by this renderer component for read-only display.
 */
export type RichTextRendererContent = RichTextDocument;

declare global {
  interface HTMLElementTagNameMap {
    'forge-rich-text-renderer': RichTextRendererComponent;
  }
}

export const RICH_TEXT_RENDERER_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rich-text-renderer';

const RENDERER_FEATURES: RichTextFeature[] = ['bold', 'italic', 'underline', 'strike', 'code', 'bullet-list', 'ordered-list', 'heading', 'link', 'align'];

// Every feature that affects display, with links clickable since there is no editing to get in the way.
const RENDERER_EXTENSIONS: AnyExtension[] = getFeatureExtensions(RENDERER_FEATURES).map(ext =>
  ext.name === Link.name ? (ext as typeof Link).configure({ openOnClick: true }) : ext
);

/**
 * @tag forge-rich-text-renderer
 *
 * @summary
 * Renders rich text content in a read-only format for display purposes.
 *
 * @description
 * This component is responsible for rendering rich text content in a read-only mode. It accepts
 * content in ProseMirror JSON format (the same format produced by the editor's change event) and
 * displays it with proper formatting. Use this component to display rich text content that was
 * created with the forge-rich-text-editor component.
 *
 * The renderer supports all formatting features available in the editor:
 * - Text formatting (bold, italic, underline, strikethrough, code)
 * - Headings (H1, H2, H3)
 * - Lists (bulleted, numbered)
 * - Text alignment (left, center, right, justify)
 * - Links (clickable with security attributes)
 *
 * The host element receives `role="article"` unless a `role` is already set, so consumers can
 * provide a meaningful accessible name via `aria-label` or `aria-labelledby`. This matters when
 * more than one renderer appears on a page.
 *
 * @property {RichTextRendererContent} content - The content to render in ProseMirror JSON format.
 * Must be set as a property; it is not settable via attribute.
 *
 * @cssproperty --forge-rich-text-renderer-padding - The padding around the rendered content.
 */
@customElement(RICH_TEXT_RENDERER_TAG_NAME)
export class RichTextRendererComponent extends LitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RICH_TEXT_RENDERER_TAG_NAME;

  public static override styles = unsafeCSS(styles);

  @property({ attribute: false })
  public content?: RichTextRendererContent;

  @query('.renderer-content', true)
  private _contentElement!: HTMLElement;

  private _editor?: TipTapEditor;

  public override connectedCallback(): void {
    super.connectedCallback();

    // Applied to the host so consumers can label it with aria-label/aria-labelledby.
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'article');
    }

    this._initializeEditor();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroyEditor();
  }

  public override willUpdate(changedProperties: Map<string | symbol, unknown>): void {
    if (changedProperties.has('content') && this._editor) {
      this._updateContent();
    }
  }

  private _initializeEditor(): void {
    // Wait for first render to get the content element
    this.updateComplete.then(() => {
      try {
        const initialContent = this.content ? this.#sanitizeContent(this.content) : undefined;
        this._editor = new TipTapEditor({
          element: this._contentElement,
          extensions: RENDERER_EXTENSIONS,
          editable: false,
          // ProseMirror marks its element `role="textbox"` even when it is not editable, which left
          // the renderer advertising an unnamed text input - axe reports it as
          // aria-input-field-name. This is display surface, not a form field, and the host already
          // carries `role="article"` with the consumer's label, so the inner element should carry
          // no role of its own. A named read-only textbox also passes axe, but it would repeat one
          // fixed name inside every renderer and present display content as a form field. Its
          // children keep their own semantics.
          editorProps: {
            attributes: {
              role: 'presentation'
            }
          },

          content: initialContent as any
        });
      } catch (error) {
        console.error('[RichTextRenderer] Failed to initialize editor:', error);
      }
    });
  }

  private _destroyEditor(): void {
    if (this._editor) {
      this._editor.destroy();
      this._editor = undefined;
    }
  }

  private _updateContent(): void {
    if (!this._editor) {
      return;
    }

    try {
      if (this.content) {
        const sanitized = this.#sanitizeContent(this.content);

        this._editor.commands.setContent(sanitized as any);
      } else {
        this._editor.commands.clearContent();
      }
    } catch (error) {
      console.error('[RichTextRenderer] Failed to update content:', error);
    }
  }

  #sanitizeContent(content: unknown): unknown {
    try {
      return sanitizeJSON(content);
    } catch (error) {
      console.error('[RichTextRenderer] Content sanitization failed:', error);
      return { type: 'doc', content: [] };
    }
  }

  public override render(): TemplateResult {
    return html` <div class="renderer-content"></div> `;
  }
}
