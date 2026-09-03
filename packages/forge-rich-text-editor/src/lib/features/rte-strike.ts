import { consume } from '@lit/context';
import { Strike } from '@tiptap/extension-strike';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFormatStrikethrough } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';

import './core/rich-text-feature-button';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-strike': RichTextFeatureStrikeComponent;
  }
}

export const RichTextFeatureStrikeComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-strike';

/**
 * @tag forge-rte-strike
 *
 * @summary
 * Provides a strikethrough text formatting button for the rich text editor.
 *
 * @description
 * The strikethrough feature component renders a toolbar button that allows users to apply or
 * remove strikethrough formatting to selected text. The button shows an active state when the
 * cursor is positioned within strikethrough text. The feature announces state changes to screen
 * readers for accessibility.
 *
 * @property {string} [label='Strikethrough'] - The accessible label for the strikethrough button.
 *
 * @attribute {string} label - The accessible label for the strikethrough button.
 */
@customElement(RichTextFeatureStrikeComponentTagName)
export class RichTextFeatureStrikeComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define(tylIconFormatStrikethrough);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the button.
   * @default 'Strikethrough'
   * @attribute
   */
  @property({ type: String })
  public label = 'Strikethrough';

  public readonly extensions = [Strike];

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
        icon=${tylIconFormatStrikethrough.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Strike.name)}></forge-rte-tool-button>
    `;
  }

  private async _toggle(_evt: CustomEvent): Promise<void> {
    try {
      const wasActive = this._editorContext.isActive(Strike.name);
      const success = this._editorContext.editor?.chain().focus().toggleStrike().run();

      if (success) {
        const message = wasActive ? 'Strikethrough removed' : 'Strikethrough applied';
        this._editorContext.announce(message);
      } else {
        console.warn('[RTE Strike] Command execution failed');
      }
    } catch (error) {
      console.error('[RTE Strike] Error toggling strike:', error);
    }
  }
}
