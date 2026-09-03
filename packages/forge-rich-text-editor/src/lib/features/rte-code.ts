import { consume } from '@lit/context';
import { Code } from '@tiptap/extension-code';
import { IconRegistry } from '@tylertech/forge';
import { tylIconCode } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';

import './core/rich-text-feature-button';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-code': RichTextFeatureCodeComponent;
  }
}

export const RichTextFeatureCodeComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-code';

/**
 * @tag forge-rte-code
 *
 * @summary
 * Provides an inline code formatting button for the rich text editor.
 *
 * @description
 * The code feature component renders a toolbar button that allows users to apply or remove
 * inline code formatting to selected text. The button shows an active state when the cursor is
 * positioned within code text. This creates monospaced inline code, not code blocks. The feature
 * announces state changes to screen readers for accessibility.
 *
 * @property {string} [label='Code'] - The accessible label for the code button.
 *
 * @attribute {string} label - The accessible label for the code button.
 */
@customElement(RichTextFeatureCodeComponentTagName)
export class RichTextFeatureCodeComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define(tylIconCode);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the button.
   * @default 'Code'
   * @attribute
   */
  @property({ type: String })
  public label = Code.name;

  public readonly extensions = [Code];

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
        icon=${tylIconCode.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Code.name)}></forge-rte-tool-button>
    `;
  }

  private async _toggle(_evt: CustomEvent): Promise<void> {
    try {
      const wasActive = this._editorContext.isActive(Code.name);
      const success = this._editorContext.editor?.chain().focus().toggleCode().run();

      if (success) {
        const message = wasActive ? 'Code removed' : 'Code applied';
        this._editorContext.announce(message);
      } else {
        console.warn('[RTE Code] Command execution failed');
      }
    } catch (error) {
      console.error('[RTE Code] Error toggling code:', error);
    }
  }
}
