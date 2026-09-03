import { RichTextEditorComponent, RichTextEditorComponentTagName } from './rich-text-editor';
import { RichTextRendererComponent, RichTextRendererComponentTagName } from './rich-text-renderer';
import { tryDefine } from '@tylertech/forge-core';

export * from './rich-text-editor';
export * from './rich-text-renderer';
export * from './editor-context';

export function defineRichTextEditorComponent(): void {
  tryDefine(RichTextEditorComponentTagName, RichTextEditorComponent);
}

export function defineRichTextRendererComponent(): void {
  tryDefine(RichTextRendererComponentTagName, RichTextRendererComponent);
}
