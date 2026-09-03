import { RichTextEditorComponent, RichTextEditorComponentTagName } from './rich-text-editor.js';
import { RichTextRendererComponent, RichTextRendererComponentTagName } from './rich-text-renderer.js';
import { tryDefine } from '@tylertech/forge-core';

export * from './rich-text-editor.js';
export * from './rich-text-renderer.js';
export * from './editor-context.js';

export function defineRichTextEditorComponent(): void {
  tryDefine(RichTextEditorComponentTagName, RichTextEditorComponent);
}

export function defineRichTextRendererComponent(): void {
  tryDefine(RichTextRendererComponentTagName, RichTextRendererComponent);
}
