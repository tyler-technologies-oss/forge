import { consume } from '@lit/context';
import { defineIconButtonComponent, IconRegistry } from '@tylertech/forge';
import { UndoRedo } from '@tiptap/extensions';
import { tylIconRedo, tylIconUndo } from '@tylertech/tyler-icons';
import { html, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from '../editor-context';
import { RichTextEditorFeature } from './rich-text-editor-feature';
import { featureHostStyles } from './core/feature-styles';
import { createRef, ref } from 'lit/directives/ref.js';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-undo-redo': RichTextFeatureUndoRedoComponent;
  }
}

export const RichTextFeatureUndoRedoComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-undo-redo';

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
 * @property {string} [undoLabel='Undo'] - The accessible label for the undo button.
 * @property {string} [redoLabel='Redo'] - The accessible label for the redo button.
 *
 * @attribute {string} undo-label - The accessible label for the undo button.
 * @attribute {string} redo-label - The accessible label for the redo button.
 */
@customElement(RichTextFeatureUndoRedoComponentTagName)
export class RichTextFeatureUndoRedoComponent extends LitElement implements RichTextEditorFeature {
  static {
    IconRegistry.define([tylIconUndo, tylIconRedo]);
    defineIconButtonComponent();
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

  public readonly extensions = [UndoRedo];

  @state()
  @consume({ context: editorContext, subscribe: true })
  private readonly _editorContext!: EditorContext;

  public firstUpdated(_changedProperties: PropertyValues<this>): void {
    this._editorContext?.registerFeature(this);
  }

  #undoButtonRef = createRef<HTMLButtonElement>();
  #redoButtonRef = createRef<HTMLButtonElement>();

  public override render(): TemplateResult {
    return html`
      <forge-icon-button
        ${ref(this.#undoButtonRef)}
        shape="squared"
        density="medium"
        @click=${this.#undo}
        @keydown=${this.#handleKeydown}
        ?disabled=${this._editorContext.isEditable() && !this.#canUndo()}
        aria-label=${this.undoLabel}>
        <forge-icon .name=${tylIconUndo.name}></forge-icon>
      </forge-icon-button>
      <forge-icon-button
        ${ref(this.#redoButtonRef)}
        shape="squared"
        density="medium"
        @click=${this.#redo}
        @keydown=${this.#handleKeydown}
        ?disabled=${this._editorContext.isEditable() && !this.#canRedo()}
        aria-label=${this.redoLabel}>
        <forge-icon .name=${tylIconRedo.name}></forge-icon>
      </forge-icon-button>
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

  #handleKeydown(evt: KeyboardEvent): void {
    if (evt.key === 'Enter') {
      (evt.target as HTMLElement).click();
    }
  }

  async #undo(): Promise<void> {
    try {
      const success = this._editorContext.editor?.chain().undo().run();

      if (success) {
        this._editorContext.announce('Undo');

        await this.updateComplete;

        if (!this.#canUndo()) {
          if (this.#canRedo()) {
            this.#redoButtonRef.value?.focus();
          } else {
            this._editorContext.editor?.chain().focus().run();
          }
        }
      } else {
        console.warn('[RTE UndoRedo] Undo command execution failed');
      }
    } catch (error) {
      console.error('[RTE UndoRedo] Error executing undo:', error);
    }
  }

  async #redo(): Promise<void> {
    try {
      const success = this._editorContext.editor?.chain().redo().run();

      if (success) {
        this._editorContext.announce('Redo');

        await this.updateComplete;

        if (!this.#canRedo()) {
          if (this.#canUndo()) {
            this.#undoButtonRef.value?.focus();
          } else {
            this._editorContext.editor?.chain().focus().run();
          }
        }
      } else {
        console.warn('[RTE UndoRedo] Redo command execution failed');
      }
    } catch (error) {
      console.error('[RTE UndoRedo] Error executing redo:', error);
    }
  }
}
