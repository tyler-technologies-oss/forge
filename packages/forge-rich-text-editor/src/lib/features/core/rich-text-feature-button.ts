import { defineIconButtonComponent } from '@tylertech/forge';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { featureHostStyles } from './feature-styles';

declare global {
  interface HTMLElementTagNameMap {
    'forge-rte-tool-button': RteToolButtonComponent;
  }

  interface HTMLElementEventMap {
    'forge-rich-text-feature-button': CustomEvent<boolean>;
  }
}

export const RteToolButtonComponentTagName: keyof HTMLElementTagNameMap = 'forge-rte-tool-button';

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
 * @property {string} [label='Tool'] - The accessible label for the button.
 * @property {string} [icon] - The icon name from Tyler Icons to display.
 * @property {boolean} [disabled=false] - Whether the button is disabled.
 * @property {boolean} [active=false] - Whether the button is in an active/pressed state.
 * @property {string} [keyboardShortcut] - The keyboard shortcut for this tool (e.g., "Control+B").
 *
 * @attribute {string} label - The accessible label for the button.
 * @attribute {string} icon - The icon name to display.
 * @attribute {boolean} disabled - Whether the button is disabled.
 * @attribute {boolean} active - Whether the button is in active state.
 * @attribute {string} keyboard-shortcut - The keyboard shortcut for this tool.
 *
 * @event {CustomEvent<boolean>} forge-rte-tool-toggle - Fired when the button is clicked or activated. The detail contains the toggle state.
 */
@customElement(RteToolButtonComponentTagName)
export class RteToolButtonComponent extends LitElement {
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

  public override render(): TemplateResult {
    return html`
      <forge-icon-button
        shape="squared"
        density="medium"
        toggle
        ?pressed=${this.active}
        @forge-icon-button-toggle=${this._toggle}
        @pointerdown=${this.#handlePointerDown}
        @keydown=${this.#handleKeydown}
        ?disabled=${this.disabled}
        aria-label=${this.label}
        aria-keyshortcuts=${this.keyboardShortcut || ''}
        aria-controls="forge-rte-content">
        <forge-icon .name=${this.icon}></forge-icon>
        <forge-icon slot="on" .name=${this.icon}></forge-icon>
      </forge-icon-button>
    `;
  }

  private async _toggle(evt: CustomEvent<boolean>): Promise<void> {
    evt.preventDefault();
    this.dispatchEvent(new CustomEvent('forge-rte-tool-toggle', { detail: evt.detail }));
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
