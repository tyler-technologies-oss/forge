import { consume } from '@lit/context';
import { BulletList, ListItem } from '@tiptap/extension-list';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFormatListBulleted } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';

import './core/rich-text-feature-button';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-bullet-list': RteBulletListComponent;
  }
}

export const RteBulletListComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-bullet-list';

/**
 * @tag forge-rte-bullet-list
 *
 * @summary
 * Provides a bulleted (unordered) list button for the rich text editor.
 *
 * @description
 * The bullet list feature component renders a toolbar button that allows users to create or
 * remove bulleted (unordered) lists. The button shows an active state when the cursor is
 * positioned within a bullet list. Clicking an active button removes the list formatting,
 * converting items back to paragraphs. The feature announces state changes to screen readers
 * for accessibility.
 *
 * @property {string} [label='Bullet List'] - The accessible label for the bullet list button.
 *
 * @attribute {string} label - The accessible label for the bullet list button.
 */
@customElement(RteBulletListComponentTagName)
export class RteBulletListComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define(tylIconFormatListBulleted);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the button.
   * @default 'Bullet List'
   * @attribute
   */
  @property({ type: String })
  public label = 'Bullet List';

  public readonly extensions = [BulletList, ListItem];

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
        icon=${tylIconFormatListBulleted.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(BulletList.name)}></forge-rte-tool-button>
    `;
  }

  private _toggle(_evt: CustomEvent<boolean>): void {
    try {
      const wasActive = this._editorContext.isActive(BulletList.name);
      const success = this._editorContext.editor?.chain().focus().toggleBulletList().run();

      if (success) {
        const message = wasActive ? 'List removed' : 'Bullet list';
        this._editorContext.announce(message);
      } else {
        console.warn('[RTE BulletList] Command execution failed');
      }
    } catch (error) {
      console.error('[RTE BulletList] Error toggling bullet list:', error);
    }
  }
}
