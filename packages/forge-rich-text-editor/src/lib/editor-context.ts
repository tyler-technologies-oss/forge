import { createContext } from '@lit/context';
import { Editor } from '@tiptap/core';
import type { DocumentType, NodeType, TextType } from '@tiptap/core';
import { IRichTextEditorFeature } from './features/rich-text-editor-feature.js';

/**
 * Rich text content in TipTap's ProseMirror JSON format - the same shape the editor's `change`
 * event emits and `toJSON()` returns.
 */
export type RichTextDocument = DocumentType<
  // Document attributes (TipTap internal format - schema-dependent)
  Record<string, any> | undefined,
  // Node types array (TipTap internal format - extension-dependent)
  NodeType<string, undefined | Record<string, any>, any, (NodeType | TextType)[]>[]
>;

/**
 * Content accepted by the editor: either an HTML string or a ProseMirror document.
 *
 * Both are sanitized before reaching TipTap - HTML through `sanitizeHTML`, documents through
 * `sanitizeJSON`. Note that the matching `content` ATTRIBUTE is necessarily HTML-only, since an
 * attribute cannot carry an object; pass a document through the property instead.
 */
export type RichTextEditorContent = string | RichTextDocument;

/**
 * Detail object for the 'change' event.
 * Contains the editor content in ProseMirror JSON format.
 */
export interface RichTextEditorChangeEventDetail {
  /** The editor content in ProseMirror JSON format (TipTap's internal representation) */
  json: Record<string, unknown>;
}

/**
 * Detail object for the 'validation' event.
 * Contains validation status and any error messages.
 */
export interface RichTextEditorValidationEventDetail {
  /** Whether the content passes all validation rules */
  isValid: boolean;
  /** Array of validation error messages (empty if valid) */
  errors: string[];
}

/**
 * Detail object for the 'initialization-error' event.
 * Contains information about editor initialization failures.
 */
export interface RichTextEditorInitializationErrorEventDetail {
  /** The error message describing what went wrong */
  error: string;
}

/**
 * Detail object for the 'error' event.
 * Contains information about non-fatal runtime errors.
 */
export interface RichTextEditorErrorEventDetail {
  /** The context in which the error occurred (e.g., 'transaction', 'content-update') */
  context: string;
  /** The error message */
  error: string;
}

/**
 * The shape of the editor context that will be provided to sub-components.
 */
export interface EditorContext {
  /** The TipTap editor instance */
  readonly editor: Editor | null;

  /** Whether the editor is disabled */
  readonly disabled: boolean;

  /** Whether the editor is read-only */
  readonly readOnly: boolean;

  /** Determines if a feature is active. */
  isActive(name: string, attributes?: Record<string, unknown>): boolean;
  isActive(attributes: Record<string, unknown>): boolean;

  /** Whether the editor is editable. */
  isEditable(): boolean;

  /** The text content of the editor */
  content: string;

  /** Sets the element to instantiate the editor against. */
  setEditorElement: (element: HTMLElement) => void;

  /** Register a new feature (extension) with the editor */
  registerFeature: (feature: IRichTextEditorFeature) => void;

  /** Announces a message to screen readers via ARIA live region */
  announce: (message: string) => void;

  /**
   * The element tool buttons should point `aria-controls` at, via `ariaControlsElements`.
   *
   * It is the outermost host of whichever element provides this context - `forge-rich-text-editor`
   * in the wrapped layout, the `forge-rich-text-context` element itself when composed - rather than
   * the editable element, which is unreachable. Element references are dropped unless the target is
   * in the same tree as the referring element or in one of its ancestor trees, and the editable
   * element sits in `forge-rich-text-content`'s shadow root, a sibling branch to the toolbar's.
   */
  readonly controlsElement: HTMLElement | null;
}

/**
 * Type guard to check if the editor is initialized and ready to use.
 *
 * @param editor - The editor instance to check
 * @returns true if the editor is initialized and not null
 */
export function isEditorInitialized(editor: Editor | null | undefined): editor is Editor {
  return editor !== null && editor !== undefined;
}

/**
 * Type guard to check if the editor context is in an editable state.
 *
 * @param context - The editor context to check
 * @returns true if the editor is initialized, not disabled, and not readonly
 */
export function isEditorEditable(context: EditorContext): boolean {
  return isEditorInitialized(context.editor) && !context.disabled && !context.readOnly;
}

/**
 * The Lit context that will be provided by the Rich Text Editor component
 * and consumed by sub-components
 */
export const editorContext = createContext<EditorContext>('forge-rich-text-editor-context');
