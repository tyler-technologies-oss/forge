import { consume } from '@lit/context';
import { Bold } from '@tiptap/extension-bold';
import { IconRegistry } from '@tylertech/forge';
import { tylIconFormatBold } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { editorContext, EditorContext } from '../editor-context.js';
import { IRichTextEditorFeature } from './rich-text-editor-feature.js';
import { featureHostStyles } from './core/feature-styles.js';

import './core/rte-tool-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-bold': RteBoldComponent;
  }
}

export const RTE_BOLD_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rte-bold';

/**
 * @tag forge-rte-bold
 *
 * @summary
 * Provides a bold text formatting button for the rich text editor.
 *
 * @description
 * The bold feature component renders a toolbar button that allows users to apply or remove
 * bold formatting to selected text. The button shows an active state when the cursor is
 * positioned within bold text. Keyboard shortcut Control+B is supported. The feature
 * announces state changes to screen readers for accessibility.
 *
 * @dependency forge-rte-tool-button
 *
 * @property {string} [label='Bold'] - The accessible label for the bold button.
 *
 * @attribute {string} label - The accessible label for the bold button.
 */
@customElement(RTE_BOLD_TAG_NAME)
export class RteBoldComponent extends LitElement implements IRichTextEditorFeature {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RTE_BOLD_TAG_NAME;

  static {
    IconRegistry.define(tylIconFormatBold);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the button.
   * @default 'Bold'
   * @attribute
   */
  @property({ type: String })
  public label = 'Bold';

  public readonly extensions = [Bold];

  @state()
  @consume({ context: editorContext, subscribe: true })
  private readonly _editorContext!: EditorContext;

  public firstUpdated(_changedProperties: PropertyValues<this>): void {
    this._editorContext?.registerFeature(this);
  }

  public override render(): TemplateResult {
    return html`
      <forge-rte-tool-button
        .controlsElement=${this._editorContext.controlsElement}
        @forge-rte-tool-toggle=${this._toggle}
        label=${this.label}
        icon=${tylIconFormatBold.name}
        keyboard-shortcut="Control+B"
        ?disabled=${!this._editorContext.isEditable()}
        ?active=${this._editorContext.isActive(Bold.name)}></forge-rte-tool-button>
    `;
  }

  private async _toggle(_evt: CustomEvent): Promise<void> {
    try {
      const wasActive = this._editorContext.isActive(Bold.name);
      const success = this._editorContext.editor?.chain().focus().toggleBold().run();

      if (success) {
        // Announce state change to screen readers
        const message = wasActive ? 'Bold removed' : 'Bold applied';
        this._editorContext.announce(message);
      } else {
        console.warn('[RTE Bold] Command execution failed');
      }
    } catch (error) {
      console.error('[RTE Bold] Error toggling bold:', error);
    }
  }
}
