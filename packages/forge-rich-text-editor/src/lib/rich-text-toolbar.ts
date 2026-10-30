import { consume, provide } from '@lit/context';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';
import { html, LitElement, PropertyValues, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorContext, EditorContext } from './editor-context.js';
import { RteToolbarFocus, rteToolbarFocusContext } from './features/core/toolbar-focus.js';

import styles from './rich-text-toolbar.scss';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rich-text-toolbar': RichTextToolbarComponent;
  }
}

export const RICH_TEXT_TOOLBAR_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rich-text-toolbar';

/**
 * @tag forge-rich-text-toolbar
 *
 * @summary
 * Groups rich text editor tools into an accessible toolbar with a single tab stop.
 *
 * @description
 * Wraps `forge-rte-*` feature elements in a toolbar that follows the WAI-ARIA toolbar pattern. The
 * toolbar is one tab stop: Tab enters it on the last button used, ArrowLeft and ArrowRight move
 * between buttons, and Home and End jump to the first and last. Disabled buttons are skipped.
 *
 * `forge-rich-text-editor` renders one of these around its slotted features. Use it directly in a
 * composed layout built from `forge-rich-text-context`, where it also supplies the `toolbar` role
 * and accessible name a plain container would not have. Several toolbars in one layout are each
 * their own tab stop.
 *
 * @slot - Feature components, such as `forge-rte-standard-tools`, `forge-rte-link` and `forge-rte-divider`.
 *
 * @property {string} [label='Rich text formatting toolbar'] - The accessible name of the toolbar.
 *
 * @attribute {string} label - The accessible name of the toolbar.
 *
 * @cssproperty --forge-rich-text-toolbar-readonly-opacity - The opacity of the toolbar when the editor
 * is readonly. Falls back to `--forge-rich-text-editor-disabled-opacity`.
 */
@customElement(RICH_TEXT_TOOLBAR_TAG_NAME)
export class RichTextToolbarComponent extends LitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RICH_TEXT_TOOLBAR_TAG_NAME;

  public static override styles = unsafeCSS(styles);

  /** The accessible name of the toolbar. */
  @property()
  public label = 'Rich text formatting toolbar';

  @provide({ context: rteToolbarFocusContext })
  private readonly _toolbarFocus = new RteToolbarFocus();

  @state()
  @consume({ context: editorContext, subscribe: true })
  private readonly _editorContext?: EditorContext;

  public override connectedCallback(): void {
    super.connectedCallback();
    // The role lives on the host so that assistive technology sees the slotted buttons as the
    // toolbar's own children, wherever the element is placed.
    this.setAttribute('role', 'toolbar');
    this.setAttribute('aria-orientation', 'horizontal');
    this.addEventListener('focusin', this.#handleFocusIn);
    this.addEventListener('keydown', this.#handleKeydown);
  }

  public override disconnectedCallback(): void {
    this.removeEventListener('focusin', this.#handleFocusIn);
    this.removeEventListener('keydown', this.#handleKeydown);
    super.disconnectedCallback();
  }

  /**
   * Mirrors the editor's disabled and readonly state onto the host, like `forge-rich-text-content`,
   * so the readonly dimming applies wherever the toolbar is placed. Both come from the surrounding
   * context rather than being settable.
   */
  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    this.toggleAttribute('disabled', this._editorContext?.disabled ?? false);
    this.toggleAttribute('readonly', this._editorContext?.readOnly ?? false);
  }

  public override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._toolbarFocus.attach(this);
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('label')) {
      this.setAttribute('aria-label', this.label);
    }
    // The toolbar controls the editor, expressed as an element reference because `aria-controls`
    // cannot cross a shadow boundary. See rte-tool-button for why the target is the editor rather
    // than the editable element.
    if ('ariaControlsElements' in this) {
      const target = this._editorContext?.controlsElement;
      (this as unknown as { ariaControlsElements: Element[] | null }).ariaControlsElements = target ? [target] : null;
    }
  }

  public override render(): TemplateResult {
    return html`<slot @slotchange=${() => this._toolbarFocus.requestSync()}></slot>`;
  }

  #handleFocusIn = (evt: FocusEvent): void => this._toolbarFocus.handleFocusIn(evt);
  #handleKeydown = (evt: KeyboardEvent): void => this._toolbarFocus.handleKeydown(evt);
}
