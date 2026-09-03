import { type AnyExtension, DocumentType, Editor as TipTapEditor, NodeType, TextType } from '@tiptap/core';
import { Document } from '@tiptap/extension-document';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import { html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import styles from './rich-text-renderer.scss?inline';
import { sanitizeJSON } from './extensions/sanitize-utils';

/**
 * Type representing rich text content in TipTap's ProseMirror JSON format.
 * This is a complex generic type from TipTap that represents the document structure.
 * The `any` types here are TipTap's internal representation and cannot be avoided
 * without importing the entire TipTap schema system.
 *
 * This format is produced by the editor's `toJSON()` method and can be consumed
 * by this renderer component for read-only display.
 */
export type RichTextRendererContent = DocumentType<
  // Document attributes (TipTap internal format - schema-dependent)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any> | undefined,
  // Node types array (TipTap internal format - extension-dependent)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  NodeType<string, undefined | Record<string, any>, any, (NodeType | TextType)[]>[]
>;

declare global {
  interface HTMLElementTagNameMap {
    'forge-rich-text-renderer': RichTextRendererComponent;
  }
}

export const RichTextRendererComponentTagName: keyof HTMLElementTagNameMap = 'forge-rich-text-renderer';

// Default extensions for the renderer - matches all editor features
const DEFAULT_EXTENSIONS: AnyExtension[] = [
  Document,
  Paragraph,
  Text,
  Bold,
  Italic,
  Underline,
  Strike,
  Code,
  BulletList,
  OrderedList,
  ListItem,
  Heading.configure({ levels: [1, 2, 3] }),
  Link.configure({
    openOnClick: true,
    HTMLAttributes: {
      target: '_blank',
      rel: 'noopener noreferrer nofollow'
    }
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph']
  })
];

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
 */
@customElement(RichTextRendererComponentTagName)
export class RichTextRendererComponent extends LitElement {
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
          extensions: DEFAULT_EXTENSIONS,
          editable: false,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
