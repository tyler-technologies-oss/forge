import { consume } from '@lit/context';
import Underline from '@tiptap/extension-underline';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFormatUnderlined } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';

import './core/rich-text-feature-button';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-underline': RteUnderlineComponent;
  }
}

export const RteUnderlineComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-underline';

/**
 * @tag forge-rte-underline
 *
 * @summary
 * Provides an underline text formatting button for the rich text editor.
 *
 * @description
 * The underline feature component renders a toolbar button that allows users to apply or remove
 * underline formatting to selected text. The button shows an active state when the cursor is
 * positioned within underlined text. Keyboard shortcut Control+U is supported. The feature
 * announces state changes to screen readers for accessibility.
 *
 * @property {string} [label='Underline'] - The accessible label for the underline button.
 *
 * @attribute {string} label - The accessible label for the underline button.
 */
@customElement(RteUnderlineComponentTagName)
export class RteUnderlineComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define(tylIconFormatUnderlined);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the button.
   * @default 'Underline'
   * @attribute
   */
  @property({ type: String })
  public label = 'Underline';

  public readonly extensions = [Underline];

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
        icon=${tylIconFormatUnderlined.name}
        keyboard-shortcut="Control+U"
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Underline.name)}></forge-rte-tool-button>
    `;
  }

  private _toggle(_evt: CustomEvent<boolean>): void {
    try {
      const wasActive = this._editorContext.isActive(Underline.name);
      const success = this._editorContext.editor?.chain().focus().toggleUnderline().run();

      if (success) {
        const message = wasActive ? 'Underline removed' : 'Underline applied';
        this._editorContext.announce(message);
      } else {
        console.warn('[RTE Underline] Command execution failed');
      }
    } catch (error) {
      console.error('[RTE Underline] Error toggling underline:', error);
    }
  }
}
