import { toggleState } from '../utils/dom.js';
import { LitElement, TemplateResult, html, unsafeCSS, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ai-icon';
import '../ai-gradient-container/ai-gradient-container';

import styles from './ai-fab.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-fab': AiFabComponent;
  }
}

export const AiFabComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-fab';

/**
 * @tag forge-ai-fab
 *
 * @cssproperty --forge-fab-background - The background color. Defaults to the gradient container background color.
 * @cssproperty --forge-fab-text-color - The color of the text. Only applies when in the extended state.
 * @cssproperty --forge-fab-outline-color - The color of the outline. Defaults to the gradient container high state.
 *
 * @slot - Default slot for button content
 * @slot icon - Slot for the icon
 */
@customElement(AiFabComponentTagName)
export class AiFabComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** Whether the button is disabled */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /** Whether the button is extended */
  @property({ type: Boolean, reflect: true })
  public extended = false;

  /** Accessible label for the button, announced by screen readers. */
  @property({ type: String })
  public label = 'Launch chatbot';

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#setCssState();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled') || changedProperties.has('extended')) {
      this.#setCssState();
    }
  }

  #setCssState(): void {
    toggleState(this.#internals, 'disabled', this.disabled);
    toggleState(this.#internals, 'extended', this.extended);
  }

  public override render(): TemplateResult {
    return html`
      <forge-ai-gradient-container variant=${this.disabled ? 'disabled' : 'high'}>
        <button aria-label=${this.label} class="forge-fab ai-fab ${this.extended ? 'forge-fab--small forge-fab--extended' : ''}" .disabled=${this.disabled}>
          <slot name="icon">
            <forge-ai-icon></forge-ai-icon>
          </slot>
          ${this.extended ? html`<slot></slot>` : ''}
        </button>
      </forge-ai-gradient-container>
    `;
  }
}
