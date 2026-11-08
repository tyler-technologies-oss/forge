import { toggleState } from '../utils/dom.js';
import { LitElement, TemplateResult, html, unsafeCSS, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ai-icon/index.js';

import styles from './ai-icon-button.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-icon-button': AiIconButtonComponent;
  }
}

export const AiIconButtonComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-icon-button';

/**
 * @tag forge-ai-icon-button
 */
@customElement(AiIconButtonComponentTagName)
export class AiIconButtonComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** Whether the button is disabled */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#setCssState();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('disabled')) {
      this.#setCssState();
    }
  }

  #setCssState(): void {
    toggleState(this.#internals, 'disabled', this.disabled);
  }

  public override render(): TemplateResult {
    return html`
      <button aria-label="AI Icon Button" class="forge-icon-button forge-icon-button--medium ai-icon-button" .disabled=${this.disabled}>
        <forge-ai-icon></forge-ai-icon>
      </button>
    `;
  }
}
