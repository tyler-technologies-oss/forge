import { createContext } from '@lit/context';
import { Editor } from '@tiptap/core';
import { RichTextEditorFeature } from './features/rich-text-editor-feature';

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
  registerFeature: (feature: RichTextEditorFeature) => void;

  /** Announces a message to screen readers via ARIA live region */
  announce: (message: string) => void;
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
