import { consume } from '@lit/context';
import { Paragraph } from '@tiptap/extension-paragraph';
import { TextAlign } from '@tiptap/extension-text-align';
import { IconRegistry } from '@tylertech/forge';
import {
  tylIconFormatAlignCenter,
  tylIconFormatAlignJustify,
  tylIconFormatAlignLeft,
  tylIconFormatAlignRight
} from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';

import './core/rich-text-feature-button';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-align': RichTextFeatureAlignComponent;
  }
}

export const RichTextFeatureAlignComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-align';

/**
 * @tag forge-rte-align
 *
 * @summary
 * Provides text alignment buttons (left, center, right, justify) for the rich text editor.
 *
 * @description
 * The alignment feature component renders four toolbar buttons that allow users to change the
 * horizontal alignment of text. Each button shows an active state when the cursor is positioned
 * within text with that alignment. Alignment can be applied to paragraphs and headings. The
 * feature announces state changes to screen readers for accessibility.
 *
 * @property {string} [leftLabel='Align Left'] - The accessible label for the left align button.
 * @property {string} [centerLabel='Align Center'] - The accessible label for the center align button.
 * @property {string} [rightLabel='Align Right'] - The accessible label for the right align button.
 * @property {string} [justifyLabel='Justify'] - The accessible label for the justify button.
 *
 * @attribute {string} left-label - The accessible label for the left align button.
 * @attribute {string} center-label - The accessible label for the center align button.
 * @attribute {string} right-label - The accessible label for the right align button.
 * @attribute {string} justify-label - The accessible label for the justify button.
 */
@customElement(RichTextFeatureAlignComponentTagName)
export class RichTextFeatureAlignComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define([
      tylIconFormatAlignLeft,
      tylIconFormatAlignCenter,
      tylIconFormatAlignRight,
      tylIconFormatAlignJustify
    ]);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible labels for the left align button.
   * @default 'Align Left'
   * @attribute left-label
   */
  @property({ type: String, attribute: 'left-label' })
  public leftLabel = 'Align Left';

  /**
   * The accessible labels for the center align button.
   * @default 'Align Center'
   * @attribute center-label
   */
  @property({ type: String, attribute: 'center-label' })
  public centerLabel = 'Align Center';

  /**
   * The accessible labels for the right align button.
   * @default 'Align Right'
   * @attribute right-label
   */
  @property({ type: String, attribute: 'right-label' })
  public rightLabel = 'Align Right';

  /**
   * The accessible labels for the justify align button.
   * @default 'Justify'
   * @attribute justify-label
   */
  @property({ type: String, attribute: 'justify-label' })
  public justifyLabel = 'Justify';

  public readonly extensions = [
    TextAlign.configure({
      types: ['heading', Paragraph.name]
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
        @forge-rte-tool-toggle=${() => this._toggle('left')}
        label=${this.leftLabel}
        icon=${tylIconFormatAlignLeft.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({ textAlign: 'left' })}></forge-rte-tool-button>
      <forge-rte-tool-button
        @forge-rte-tool-toggle=${() => this._toggle('center')}
        label=${this.centerLabel}
        icon=${tylIconFormatAlignCenter.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({ textAlign: 'center' })}></forge-rte-tool-button>
      <forge-rte-tool-button
        @forge-rte-tool-toggle=${() => this._toggle('right')}
        label=${this.rightLabel}
        icon=${tylIconFormatAlignRight.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({ textAlign: 'right' })}></forge-rte-tool-button>
      <forge-rte-tool-button
        @forge-rte-tool-toggle=${() => this._toggle('justify')}
        label=${this.justifyLabel}
        icon=${tylIconFormatAlignJustify.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive({ textAlign: 'justify' })}></forge-rte-tool-button>
    `;
  }

  private async _toggle(which: 'left' | 'center' | 'right' | 'justify'): Promise<void> {
    try {
      const wasActive = this._editorContext.isActive({ textAlign: which });
      const success = this._editorContext.editor?.chain().focus().toggleTextAlign(which).run();

      if (success && !wasActive) {
        const alignmentLabels = {
          left: 'Left aligned',
          center: 'Center aligned',
          right: 'Right aligned',
          justify: 'Justified'
        };
        this._editorContext.announce(alignmentLabels[which]);
      } else if (!success) {
        console.warn(`[RTE Align] Command execution failed for ${which}`);
      }
    } catch (error) {
      console.error(`[RTE Align] Error toggling ${which} alignment:`, error);
    }
  }
}
