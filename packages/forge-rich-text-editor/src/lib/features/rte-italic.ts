import { consume } from '@lit/context';
import Italic from '@tiptap/extension-italic';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFormatItalic } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { editorContext, EditorContext } from '../editor-context.js';
import { IRichTextEditorFeature } from './rich-text-editor-feature.js';
import { featureHostStyles } from './core/feature-styles.js';

import './core/rte-tool-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-italic': RteItalicComponent;
  }
}

export const RTE_ITALIC_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rte-italic';

/**
 * @tag forge-rte-italic
 *
 * @summary
 * Provides an italic text formatting button for the rich text editor.
 *
 * @description
 * The italic feature component renders a toolbar button that allows users to apply or remove
 * italic formatting to selected text. The button shows an active state when the cursor is
 * positioned within italic text. Keyboard shortcut Control+I is supported. The feature
 * announces state changes to screen readers for accessibility.
 *
 * @property {string} [label='Italic'] - The accessible label for the italic button.
 *
 * @attribute {string} label - The accessible label for the italic button.
 */
@customElement(RTE_ITALIC_TAG_NAME)
export class RteItalicComponent extends LitElement implements IRichTextEditorFeature {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RTE_ITALIC_TAG_NAME;

  static {
    IconRegistry.define(tylIconFormatItalic);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the button.
   * @default 'Italic'
   * @attribute
   */
  @property({ type: String })
  public label = 'Italic';

  public readonly extensions = [Italic];

  @state()
  @consume({ context: editorContext, subscribe: true })
  private readonly _editorContext!: EditorContext;

  public firstUpdated(_changedProperties: PropertyValues<this>): void {
    this._editorContext?.registerFeature(this);
  }

  public override render(): TemplateResult {
    return html`
      <forge-rte-tool-button
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${tylIconFormatItalic.name}
        keyboard-shortcut="Control+I"
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Italic.name)}></forge-rte-tool-button>
    `;
  }

  private _toggle(_evt: CustomEvent<boolean>): void {
    try {
      const wasActive = this._editorContext.isActive(Italic.name);
      const success = this._editorContext.editor?.chain().focus().toggleItalic().run();

      if (success) {
        const message = wasActive ? 'Italic removed' : 'Italic applied';
        this._editorContext.announce(message);
      } else {
        console.warn('[RTE Italic] Command execution failed');
      }
    } catch (error) {
      console.error('[RTE Italic] Error toggling italic:', error);
    }
  }
}
