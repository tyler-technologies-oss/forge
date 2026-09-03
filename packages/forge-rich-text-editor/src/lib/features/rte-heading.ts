import { consume } from '@lit/context';
import { Heading } from '@tiptap/extension-heading';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFormatHeader1, tylIconFormatHeader2, tylIconFormatHeader3 } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';

import './core/rich-text-feature-button';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-heading': RichTextFeatureHeadingComponent;
  }
}

export const RichTextFeatureHeadingComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-heading';

/**
 * @tag forge-rte-heading
 *
 * @summary
 * Provides heading formatting buttons (H1, H2, H3) for the rich text editor.
 *
 * @description
 * The heading feature component renders three buttons that allow users to format text as
 * heading levels 1, 2, or 3. Each button shows an active state when the cursor is positioned
 * within a heading of that level. Clicking an active heading button converts the text back
 * to a normal paragraph.
 *
 * @property {string} [h1Label='Heading 1'] - The accessible label for the heading 1 button.
 * @property {string} [h2Label='Heading 2'] - The accessible label for the heading 2 button.
 * @property {string} [h3Label='Heading 3'] - The accessible label for the heading 3 button.
 *
 * @attribute {string} h1-label - The accessible label for the heading 1 button.
 * @attribute {string} h2-label - The accessible label for the heading 2 button.
 * @attribute {string} h3-label - The accessible label for the heading 3 button.
 */
@customElement(RichTextFeatureHeadingComponentTagName)
export class RichTextFeatureHeadingComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define([tylIconFormatHeader1, tylIconFormatHeader2, tylIconFormatHeader3]);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the heading 1 button.
   * @default 'Heading 1'
   * @attribute h1-label
   */
  @property({ type: String, attribute: 'h1-label' })
  public h1Label = 'Heading 1';

  /**
   * The accessible label for the heading 2 button.
   * @default 'Heading 2'
   * @attribute h2-label
   */
  @property({ type: String, attribute: 'h2-label' })
  public h2Label = 'Heading 2';

  /**
   * The accessible label for the heading 3 button.
   * @default 'Heading 3'
   * @attribute h3-label
   */
  @property({ type: String, attribute: 'h3-label' })
  public h3Label = 'Heading 3';

  public readonly extensions = [
    Heading.configure({
      levels: [1, 2, 3]
    })
  ];

  @state()
  @consume({ context: editorContext, subscribe: true })
  private readonly _editorContext!: EditorContext;

  public firstUpdated(_changedProperties: PropertyValues<this>): void {
    this._editorContext?.registerFeature(this);
  }

  public override render(): TemplateResult {
    return html`
      <forge-rte-tool-button
        @forge-rte-tool-toggle=${() => this._toggle(1)}
        label=${this.h1Label}
        icon=${tylIconFormatHeader1.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive('heading', { level: 1 })}></forge-rte-tool-button>
      <forge-rte-tool-button
        @forge-rte-tool-toggle=${() => this._toggle(2)}
        label=${this.h2Label}
        icon=${tylIconFormatHeader2.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive('heading', { level: 2 })}></forge-rte-tool-button>
      <forge-rte-tool-button
        @forge-rte-tool-toggle=${() => this._toggle(3)}
        label=${this.h3Label}
        icon=${tylIconFormatHeader3.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive('heading', { level: 3 })}></forge-rte-tool-button>
    `;
  }

  private async _toggle(level: 1 | 2 | 3): Promise<void> {
    try {
      const wasActive = this._editorContext.isActive('heading', { level });
      const success = this._editorContext.editor?.chain().focus().toggleHeading({ level }).run();

      if (success) {
        const message = wasActive ? 'Paragraph style' : `Heading ${level}`;
        this._editorContext.announce(message);
      } else {
        console.warn(`[RTE Heading] Command execution failed for level ${level}`);
      }
    } catch (error) {
      console.error(`[RTE Heading] Error toggling heading ${level}:`, error);
    }
  }
}
