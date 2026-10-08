import { consume } from '@lit/context';
import { IconRegistry } from '@tylertech/forge';
import { tylIconRedo, tylIconUndo } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context.js';
import { IRichTextEditorFeature } from './rich-text-editor-feature.js';
import { FEATURE_EXTENSIONS } from '../extensions/feature-extensions.js';
import { featureHostStyles } from './core/feature-styles.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

import './core/rte-tool-button.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-undo-redo': RteUndoRedoComponent;
  }
}

export const RTE_UNDO_REDO_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rte-undo-redo';

/**
 * @tag forge-rte-undo-redo
 *
 * @summary
 * Provides undo and redo buttons for the rich text editor history management.
 *
 * @description
 * The undo/redo feature component renders two toolbar buttons that allow users to undo or redo
 * changes to the editor content. The buttons are automatically disabled when there is no history
 * to undo or redo. The feature announces actions to screen readers for accessibility. Keyboard
 * shortcuts Control+Z (undo) and Control+Shift+Z (redo) are supported through TipTap.
 *
 * @dependency forge-rte-tool-button
 *
 * @property {string} [undoLabel='Undo'] - The accessible label for the undo button.
 * @property {string} [redoLabel='Redo'] - The accessible label for the redo button.
 *
 * @attribute {string} undo-label - The accessible label for the undo button.
 * @attribute {string} redo-label - The accessible label for the redo button.
 */
@customElement(RTE_UNDO_REDO_TAG_NAME)
export class RteUndoRedoComponent extends LitElement implements IRichTextEditorFeature {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RTE_UNDO_REDO_TAG_NAME;

  static {
    IconRegistry.define([tylIconUndo, tylIconRedo]);
  }

  public static override styles = featureHostStyles;

  /**
   * The accessible label for the undo button.
   * @default 'Undo'
   * @attribute undo-label
   */
  @property({ type: String, attribute: 'undo-label' })
  public undoLabel = 'Undo';

  /**
   * The accessible label for the redo button.
   * @default 'Redo'
   * @attribute redo-label
   */
  @property({ type: String, attribute: 'redo-label' })
  public redoLabel = 'Redo';

  public readonly extensions = FEATURE_EXTENSIONS['undo-redo'];

  @state()
  @consume({ context: editorContext, subscribe: true })
  private readonly _editorContext!: EditorContext;

  public firstUpdated(_changedProperties: PropertyValues<this>): void {
    this._editorContext?.registerFeature(this);
  }

  public override render(): TemplateResult {
    return html`
      <forge-rte-tool-button
        no-toggle
        @forge-rte-tool-toggle=${this.#undo}
        label=${this.undoLabel}
        icon=${tylIconUndo.name}
        keyboard-shortcut="Control+Z"
        .controlsElement=${this._editorContext.controlsElement}
        ?disabled=${!this._editorContext.isEditable() || !this.#canUndo()}></forge-rte-tool-button>
      <forge-rte-tool-button
        no-toggle
        @forge-rte-tool-toggle=${this.#redo}
        label=${this.redoLabel}
        icon=${tylIconRedo.name}
        keyboard-shortcut="Control+Shift+Z"
        .controlsElement=${this._editorContext.controlsElement}
        ?disabled=${!this._editorContext.isEditable() || !this.#canRedo()}></forge-rte-tool-button>
    `;
  }

  #canUndo(): boolean {
    const editor = this._editorContext.editor;
    return !!editor && !editor.isDestroyed && !!editor.can().undo();
  }

  #canRedo(): boolean {
    const editor = this._editorContext.editor;
    return !!editor && !editor.isDestroyed && !!editor.can().redo();
  }

  // Both commands return focus to the editor, like every other feature. That keeps focus off the
  // button, so the button disabling itself after the last step can never strand focus on body.
  #undo(): void {
    try {
      const success = this._editorContext.editor?.chain().focus().undo().run();

      if (success) {
        this._editorContext.announce('Undo');
      } else {
        console.warn('[RTE UndoRedo] Undo command execution failed');
      }
    } catch (error) {
      console.error('[RTE UndoRedo] Error executing undo:', error);
    }
  }

  #redo(): void {
    try {
      const success = this._editorContext.editor?.chain().focus().redo().run();

      if (success) {
        this._editorContext.announce('Redo');
      } else {
        console.warn('[RTE UndoRedo] Redo command execution failed');
      }
    } catch (error) {
      console.error('[RTE UndoRedo] Error executing redo:', error);
    }
  }
}
