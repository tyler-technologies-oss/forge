import { consume } from '@lit/context';
import { defineIconButtonComponent } from '@tylertech/forge';
import { html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import { featureHostStyles } from './feature-styles.js';
import { IRteToolbarFocus, rteToolbarFocusContext } from './toolbar-focus.js';
import { CUSTOM_ELEMENT_NAME_PROPERTY } from '@tylertech/forge-core';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-tool-button': RteToolButtonComponent;
  }

  interface HTMLElementEventMap {
    'forge-rte-tool-toggle': CustomEvent<boolean>;
  }
}

export const RTE_TOOL_BUTTON_TAG_NAME: keyof HTMLElementTagNameMap = 'forge-rte-tool-button';

/**
 * @tag forge-rte-tool-button
 *
 * @summary
 * An internal toolbar button component used by rich text editor feature components.
 *
 * @description
 * This is an internal component that provides a consistent button implementation for all rich
 * text editor formatting features. It wraps the Forge icon button component and provides
 * standardized behavior for keyboard shortcuts, ARIA attributes, active states, and event
 * handling. This component is not intended to be used directly by consumers - instead use
 * the feature components like forge-rte-bold, forge-rte-italic, etc.
 *
 * @dependency forge-icon-button
 * @dependency forge-icon
 *
 * @property {string} [label='Tool'] - The accessible label for the button.
 * @property {string} [icon] - The icon name from Tyler Icons to display.
 * @property {boolean} [disabled=false] - Whether the button is disabled.
 * @property {boolean} [active=false] - Whether the button is in an active/pressed state.
 * @property {string} [keyboardShortcut] - The keyboard shortcut for this tool (e.g., "Control+B").
 * @property {boolean} [noToggle=false] - Renders a momentary action button with no pressed state, for tools such as undo.
 *
 * @attribute {string} label - The accessible label for the button.
 * @attribute {string} icon - The icon name to display.
 * @attribute {boolean} disabled - Whether the button is disabled.
 * @attribute {boolean} active - Whether the button is in active state.
 * @attribute {string} keyboard-shortcut - The keyboard shortcut for this tool.
 * @attribute {boolean} no-toggle - Renders a momentary action button with no pressed state.
 *
 * @event {CustomEvent<boolean>} forge-rte-tool-toggle - Fired when the button is clicked or activated. The detail contains the requested toggle state, and is always `false` with `no-toggle`.
 */
@customElement(RTE_TOOL_BUTTON_TAG_NAME)
export class RteToolButtonComponent extends LitElement {
  /** @deprecated Used for compatibility with legacy Forge @customElement decorator. */
  public static [CUSTOM_ELEMENT_NAME_PROPERTY] = RTE_TOOL_BUTTON_TAG_NAME;

  static {
    defineIconButtonComponent();
  }

  public static override styles = featureHostStyles;

  /** The label for the button */
  @property()
  public label = 'Tool';

  /** The icon name. */
  @property()
  public icon: string | undefined;

  /** The disabled state of the button. */
  @property({ type: Boolean })
  public disabled = false;

  /** The active state of the button. */
  @property({ type: Boolean })
  public active = false;

  /** The keyboard shortcut for this tool (e.g., "Control+B" for bold). */
  @property({ attribute: 'keyboard-shortcut' })
  public keyboardShortcut: string | undefined;

  /** Renders a momentary action button with no pressed state, for tools such as undo. */
  @property({ type: Boolean, attribute: 'no-toggle' })
  public noToggle = false;

  /**
   * The element this button controls, surfaced to assistive technology through
   * `ariaControlsElements` rather than `aria-controls`.
   *
   * An IDREF cannot cross a shadow boundary, so the editable element - which lives in
   * `forge-rich-text-content`'s shadow root - cannot be named by id from here. Element references
   * can cross a boundary, but only into the same tree or an ancestor tree, so this is the editor
   * element rather than the editable element itself. Features pass it from the editor context.
   */
  @property({ attribute: false })
  public controlsElement: HTMLElement | null = null;

  @query('forge-icon-button')
  private readonly _iconButton!: HTMLElement | null;

  @state()
  @consume({ context: rteToolbarFocusContext, subscribe: true })
  private readonly _toolbarFocus?: IRteToolbarFocus;

  public override connectedCallback(): void {
    super.connectedCallback();
    this._toolbarFocus?.requestSync();
  }

  public override disconnectedCallback(): void {
    const toolbarFocus = this._toolbarFocus;
    super.disconnectedCallback();
    toolbarFocus?.requestSync();
  }

  public override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      this._toolbarFocus?.requestSync();
    }
    if (!changedProperties.has('controlsElement') || !this._iconButton) {
      return;
    }
    // Feature-detected: unsupported engines simply keep no controls relationship, which is the
    // state this replaced. Assigning the property is preferred over the attribute because the
    // attribute form cannot express a cross-root reference at all.
    //
    // Chrome reflects this by writing an *empty* `aria-controls` attribute. That is expected and
    // is not a stale IDREF - it references nothing and axe reports no violation - so do not be
    // alarmed by `aria-controls=""` in the inspector.
    if ('ariaControlsElements' in this._iconButton) {
      (this._iconButton as unknown as { ariaControlsElements: Element[] | null }).ariaControlsElements = this.controlsElement ? [this.controlsElement] : null;
    }
  }

  public override render(): TemplateResult {
    return html`
      <forge-icon-button
        shape="squared"
        density="medium"
        ?toggle=${!this.noToggle}
        ?pressed=${!this.noToggle && this.active}
        @forge-icon-button-toggle=${this._toggle}
        @click=${this.#handleClick}
        @pointerdown=${this.#handlePointerDown}
        @keydown=${this.#handleKeydown}
        ?disabled=${this.disabled}
        tabindex=${this.disabled ? nothing : live(this.#tabIndex)}
        aria-label=${this.label}
        aria-keyshortcuts=${this.keyboardShortcut || ''}>
        <forge-icon .name=${this.icon}></forge-icon>
        <forge-icon slot="on" .name=${this.icon}></forge-icon>
      </forge-icon-button>
    `;
  }

  /**
   * Inside an editor toolbar only the toolbar's current tab stop is tabbable. `live` matters: forge's
   * button removes its tabindex when disabled and restores `0` when re-enabled, behind this
   * element's back, and `live` re-applies the intended value on the next render.
   */
  get #tabIndex(): string {
    return !this._toolbarFocus || this._toolbarFocus.isTabStop(this) ? '0' : '-1';
  }

  /** Moves focus to the button, which lives in this element's shadow root. */
  public override focus(options?: FocusOptions): void {
    this._iconButton?.focus(options);
  }

  private async _toggle(evt: CustomEvent<boolean>): Promise<void> {
    evt.preventDefault();
    this.dispatchEvent(new CustomEvent('forge-rte-tool-toggle', { detail: evt.detail }));
  }

  #handleClick(): void {
    // In toggle mode the icon button reports activation through its own toggle event instead.
    if (this.noToggle) {
      this.dispatchEvent(new CustomEvent('forge-rte-tool-toggle', { detail: false }));
    }
  }

  #handlePointerDown(evt: PointerEvent | KeyboardEvent): void {
    evt.preventDefault();
  }

  #handleKeydown(evt: KeyboardEvent): void {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.preventDefault();
      (evt.target as HTMLElement).click();
    }
  }
}
