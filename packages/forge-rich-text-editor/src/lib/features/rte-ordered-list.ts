import { consume } from '@lit/context';
import { ListItem, OrderedList } from '@tiptap/extension-list';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFormatListNumbered } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';

import './core/rich-text-feature-button';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-ordered-list': RteOrderedListComponent;
  }
}

export const RteOrderedListComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-ordered-list';

/**
 * @tag forge-rte-ordered-list
 *
 * @summary
 * Provides a numbered (ordered) list button for the rich text editor.
 *
 * @description
 * The ordered list feature component renders a toolbar button that allows users to create or
 * remove numbered (ordered) lists. The button shows an active state when the cursor is
 * positioned within an ordered list. Clicking an active button removes the list formatting,
 * converting items back to paragraphs. The feature announces state changes to screen readers
 * for accessibility.
 *
 * @property {string} [label='Ordered List'] - The accessible label for the ordered list button.
 *
 * @attribute {string} label - The accessible label for the ordered list button.
 */
@customElement(RteOrderedListComponentTagName)
export class RteOrderedListComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define(tylIconFormatListNumbered);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the button.
   * @default 'Ordered List'
   * @attribute
   */
  @property({ type: String })
  public label = 'Ordered List';

  public readonly extensions = [OrderedList, ListItem];

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
        icon=${tylIconFormatListNumbered.name}
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(OrderedList.name)}></forge-rte-tool-button>
    `;
  }

  private _toggle(_evt: CustomEvent<boolean>): void {
    try {
      const wasActive = this._editorContext.isActive(OrderedList.name);
      const success = this._editorContext.editor?.chain().focus().toggleOrderedList().run();

      if (success) {
        const message = wasActive ? 'List removed' : 'Numbered list';
        this._editorContext.announce(message);
      } else {
        console.warn('[RTE OrderedList] Command execution failed');
      }
    } catch (error) {
      console.error('[RTE OrderedList] Error toggling ordered list:', error);
    }
  }
}
