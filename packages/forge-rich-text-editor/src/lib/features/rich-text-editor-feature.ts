import { type AnyExtension } from '@tiptap/core';

export interface RichTextEditorFeature {
  readonly extensions: AnyExtension[];
  requestUpdate(): void;
}
