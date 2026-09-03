import { RichTextEditorComponent, RICH_TEXT_EDITOR_TAG_NAME } from './rich-text-editor.js';
import { RichTextRendererComponent, RICH_TEXT_RENDERER_TAG_NAME } from './rich-text-renderer.js';
import { tryDefine } from '@tylertech/forge-core';

export * from './rich-text-editor.js';
export * from './rich-text-renderer.js';
export * from './editor-context.js';

export function defineRichTextEditorComponent(): void {
  tryDefine(RICH_TEXT_EDITOR_TAG_NAME, RichTextEditorComponent);
}

export function defineRichTextRendererComponent(): void {
  tryDefine(RICH_TEXT_RENDERER_TAG_NAME, RichTextRendererComponent);
}
