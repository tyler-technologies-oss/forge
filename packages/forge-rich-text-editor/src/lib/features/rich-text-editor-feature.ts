import { type AnyExtension } from '@tiptap/core';

export interface IRichTextEditorFeature {
  readonly extensions: AnyExtension[];
  requestUpdate(): void;
}
