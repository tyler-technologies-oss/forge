import { defineCustomElement } from '@tylertech/forge-core';

import { RichTextContentComponent } from './rich-text-content.js';
import { RichTextContextComponent } from './rich-text-context.js';
import { RichTextEditorComponent } from './rich-text-editor.js';
import { RichTextRendererComponent } from './rich-text-renderer.js';

export * from './rich-text-editor.js';
export * from './rich-text-renderer.js';
export * from './rich-text-content.js';
export * from './rich-text-context.js';
export * from './editor-context.js';

export function defineRichTextEditorComponent(): void {
  defineCustomElement(RichTextEditorComponent);
}

export function defineRichTextRendererComponent(): void {
  defineCustomElement(RichTextRendererComponent);
}

export function defineRichTextContentComponent(): void {
  defineCustomElement(RichTextContentComponent);
}

export function defineRichTextContextComponent(): void {
  defineCustomElement(RichTextContextComponent);
}

/**
 * Registers the rich text editor components with the browser. Feature components are registered
 * separately via `defineRteFeatureComponents` so that consumers only pay for the tools they use.
 */
export function defineRichTextEditorComponents(): void {
  defineRichTextEditorComponent();
  defineRichTextRendererComponent();
  defineRichTextContentComponent();
  defineRichTextContextComponent();
}
