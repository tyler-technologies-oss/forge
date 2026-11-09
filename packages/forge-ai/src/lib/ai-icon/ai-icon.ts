import { LitElement, PropertyValues, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import { toggleState } from '../utils/dom.js';
import '../ai-gradient-container/ai-gradient-container.js';

import styles from './ai-icon.scss?inline';

declare global {
  interface HTMLElementTagNameMap {
    'forge-ai-icon': AiIconComponent;
  }
}

export const AiIconComponentTagName: keyof HTMLElementTagNameMap = 'forge-ai-icon';

/**
 * @tag forge-ai-icon
 *
 * @cssproperty --forge-ai-icon-color - The fill color of the icon. Defaults to the theme tertiary color.
 * @cssproperty --forge-ai-chatbot-icon-color - Deprecated. Fallback for `--forge-ai-icon-color`.
 *
 * @state no-border - The icon is displayed without a border.
 * @state border - The icon is displayed with a border.
 */
@customElement(AiIconComponentTagName)
export class AiIconComponent extends LitElement {
  public static override styles = unsafeCSS(styles);

  /** Whether to display the icon with an outline */
  @property({ type: Boolean })
  public outline = false;

  readonly #internals: ElementInternals;

  constructor() {
    super();
    this.#internals = this.attachInternals();
    this.#setCssState();
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('outline')) {
      this.#setCssState();
    }
  }

  readonly #svg = html`
    <svg width="24" height="24" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9.375 10.625L15 12.5L9.375 14.375L7.5 20L5.625 14.375L0 12.5L5.625 10.625L7.5 5L9.375 10.625ZM16.25 3.75L20 5L16.25 6.25L15 10L13.75 6.25L10 5L13.75 3.75L15 0L16.25 3.75Z" />
    </svg>
  `;

  #setCssState(): void {
    toggleState(this.#internals, 'outline', this.outline);
  }

  public override render(): TemplateResult {
    return when(
      this.outline,
      () => html`<forge-ai-gradient-container variant="high">${this.#svg}</forge-ai-gradient-container>`,
      () => this.#svg
    );
  }
}
