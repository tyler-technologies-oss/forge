import { consume } from '@lit/context';
import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { editorContext, EditorContext } from './editor-context.js';

import styles from './rich-text-content.scss';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rich-text-content': RichTextContentComponent;
  }
}

export const RICH_TEXT_CONTENT_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rich-text-content';

/**
 * @tag forge-rich-text-content
 *
 * @summary
 * Renders the editable content area for composed rich text editor layouts.
 *
 * @description
 * This component is responsible for rendering the content area of the rich text editor.
 * It provides the editor element reference to the editor context and must be used within
 * a forge-rich-text-context component. Use this when you need to separate the toolbar from
 * the content area in your layout.
 *
 * @dependency forge-focus-indicator
 *
 * @cssproperty --forge-rich-text-content-disabled-opacity - The opacity of the content area when
 * the surrounding editor is disabled.
 */
@customElement(RICH_TEXT_CONTENT_TAG_NAME)
export class RichTextContentComponent extends LitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RICH_TEXT_CONTENT_TAG_NAME;

  public static override styles = unsafeCSS(styles);

  @state()
  @consume({ context: editorContext, subscribe: true })
  private readonly _editorContext!: EditorContext;

  readonly #editorElementRef = createRef<HTMLElement>();

  public firstUpdated(_changedProperties: PropertyValues<this>): void {
    const element = this.#editorElementRef.value;
    if (!element) {
      console.error('[RichTextContent] Editor element ref failed to attach');
      return;
    }
    this._editorContext.setEditorElement(element as HTMLElement);
  }

  /**
   * Mirrors the context's disabled and readonly state onto the host as attributes so the
   * `:host([disabled])` and `:host([readonly])` rules can match. Both are driven entirely by the
   * surrounding context rather than being settable, so they are reflected here instead of being
   * declared as properties - setting them directly would be overwritten on the next update.
   */
  public override willUpdate(): void {
    this.toggleAttribute('disabled', this._editorContext?.disabled ?? false);
    this.toggleAttribute('readonly', this._editorContext?.readOnly ?? false);
  }

  public override render(): TemplateResult {
    const isReadonly = this._editorContext?.readOnly ?? false;
    const isDisabled = this._editorContext?.disabled ?? false;

    return html`
      <div class="editor-content-wrapper">
        <div
          ${ref(this.#editorElementRef)}
          id="forge-rte-content"
          class="editor-content"
          role="textbox"
          aria-label="Rich text editor content"
          aria-multiline="true"
          aria-readonly=${isReadonly ? 'true' : 'false'}
          aria-disabled=${isDisabled ? 'true' : 'false'}></div>
        <forge-focus-indicator inward></forge-focus-indicator>
      </div>
    `;
  }
}
